# uks-fe

Public portal for UKS Indonesia (React + Vite). All content comes from the UKS API.

## Getting started

```bash
npm ci
npm run dev
```

`npm run dev` reads the tracked `.env.development`, which points at a local API on `http://localhost:5103/api/v1`. The dev server runs on http://localhost:5173.

Other scripts: `npm run lint`, `npm run build`, `npm run preview`.

## Configuration

Both variables are read at build time and inlined into the JavaScript bundle, so each environment needs its own build. They are public values: never put a secret in a `VITE_` variable.

| Variable | Required | Meaning |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Yes | API base URL including `/api/v1`, e.g. `https://<api-host>/api/v1`. Must be an absolute `http(s)` URL or `vite build` fails. The API's CORS must allow the portal origin. Also the source of the `Sitemap:` line in the generated `robots.txt`. |
| `VITE_SITE_URL` | No | Public portal origin, e.g. `https://<portal-host>`; the same value as the API's `Portal:BaseUrl`. Used for canonical links. Falls back to the origin serving the page. |

Where to set them:

- GitHub Actions: repository *variables* (`vars.VITE_API_BASE_URL`, `vars.VITE_SITE_URL`), not secrets.
- Docker: `docker build --build-arg VITE_API_BASE_URL=... --build-arg VITE_SITE_URL=... .`
- Docker Compose: `cp .env.example .env`, edit `.env`, then `docker compose up --build` (serves on http://localhost:5173).

`.env.development` is only read by `npm run dev`; a build ignores it. Other `.env.*` files are git-ignored, except `.env.example` (template) and `.env.development`.

## Deploy (Azure Static Web Apps)

`.github/workflows/azure-static-web-apps.yml` builds and deploys on every push to `main` and on pull requests to `main`.

- Secret `AZURE_STATIC_WEB_APPS_API_TOKEN`: the deployment token of the Static Web App.
- Variable `VITE_API_BASE_URL`: passed to the build.
- The workflow currently passes only `VITE_API_BASE_URL`. When setting up the new repo, add `VITE_SITE_URL: ${{ vars.VITE_SITE_URL }}` next to it in the `env:` of the "Build And Deploy" step and set that repository variable.

## Search engines

Until launch the site sends `X-Robots-Tag: noindex, nofollow`, from `globalHeaders` in `public/staticwebapp.config.json` and from `security-headers.conf` (nginx image). `robots.txt` still says `Allow: /` so crawlers can fetch pages and see the header. At production launch, remove the header from both files.

## Security headers

The Content-Security-Policy is duplicated in `security-headers.conf` (nginx) and `public/staticwebapp.config.json` (Static Web Apps); keep the two in sync. `connect-src`, `img-src`, `media-src` and `frame-src` currently allow any `https:` origin. Once the final API, blob storage and CDN origins are known, narrow them to those origins in both files.

Also add the portal origin to the blob storage CORS rules: the PDF reader fetches files from the browser.
