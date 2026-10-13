FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Built once for every environment: the URLs are container env vars, written to /env.js at start (runtime-env.sh).
# This placeholder only passes vite.config.js's URL check; the start-up script refuses to run without the real value.
RUN VITE_API_BASE_URL=https://runtime-env.invalid/api/v1 npm run build

# Infisical CLI for infisical-entrypoint.sh: the official static release binary, pinned and checksum-verified.
# ponytail: amd64 only; arm64 nodes need the linux_arm64 asset and its hash from the release's checksums.txt.
FROM node:22-alpine AS infisical
ARG INFISICAL_VERSION=0.43.143
ARG INFISICAL_SHA256=ce02c84be4164d8386c7534f93ce5b5467cf48b31b15e35e372f9979f3086308
RUN wget -qO /tmp/cli.tgz "https://github.com/Infisical/cli/releases/download/v${INFISICAL_VERSION}/cli_${INFISICAL_VERSION}_linux_amd64.tar.gz" \
  && echo "${INFISICAL_SHA256}  /tmp/cli.tgz" | sha256sum -c - \
  && tar -xzf /tmp/cli.tgz -C /usr/local/bin infisical

FROM nginxinc/nginx-unprivileged:1.28-alpine
COPY --from=infisical /usr/local/bin/infisical /usr/local/bin/infisical
COPY infisical-entrypoint.sh /usr/local/bin/infisical-entrypoint.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY runtime-env.sh /docker-entrypoint.d/40-runtime-env.sh
COPY --from=build /app/dist /usr/share/nginx/html
ENV INFISICAL_DISABLE_UPDATE_CHECK=1
EXPOSE 8080
# Wraps the image's own entrypoint, so Infisical values are in the env before runtime-env.sh runs.
ENTRYPOINT ["/usr/local/bin/infisical-entrypoint.sh", "/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
