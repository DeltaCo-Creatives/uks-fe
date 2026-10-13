FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Built once for every environment: the URLs are container env vars, written to /env.js at start (runtime-env.sh).
# This placeholder only passes vite.config.js's URL check; the start-up script refuses to run without the real value.
RUN VITE_API_BASE_URL=https://runtime-env.invalid/api/v1 npm run build

FROM nginxinc/nginx-unprivileged:1.28-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY runtime-env.sh /docker-entrypoint.d/40-runtime-env.sh
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
