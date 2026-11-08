# Mock API: uploaded videos and UKS/M paragraph alignment

A zero-dependency Node 20+ stand-in for uks-be, so the CMS (5174) and the site (5173) can be clicked through without a database.

    node mocks/video-trias/mock-api.mjs        # http://localhost:5103/api/v1 (MOCK_PORT overrides the port)

Point both apps at it (`VITE_API_BASE_URL=http://localhost:5103/api/v1`). Data lives in memory and resets on restart.

## What it serves

- CMS sign-in: any email and password work; the user holds every permission.
- `POST /admin/uploads` (multipart `kind`, `file`) for `cover`, `logo`, `dokumen`, `panduan` and `video` (.mp4/.webm, 100 MB). Files are served from `GET /__files/{path}` with Range support.
- Publikasi: admin list, detail, create, update, delete, restore, bulk delete, slug check, plus the lookups the form uses (submenu options, jenis dokumen, jenjang, status, tag). The video submenu id is `3f6b2d10-7a41-4c8e-9b05-1e2a4d6c8f08`, with two published YouTube items. The video template rule and its messages follow the shared contract.
- `GET /public/publikasi?submenuId=<video id>` returns `videoUrl`, `youtubeUrl`, `embedUrl` and `thumb`. Other submenus go to the dev API.
- UKS/M: admin list, detail and update (409 on a stale `updatedAt`, "Perataan teks tidak valid." on a bad `align`), and `GET /public/uksm`. Rows are seeded from the dev API at start, or from `uks-be/.../SeedData/uksm/uksm.json` when it is offline.
- Site settings: `GET/PUT /SystemSettings/module/{module}` (kontak, tautan, stratifikasi, pengunjung, tampilan) keep values in memory; `tampilan.jarakHurufJudul` and `tampilan.jarakKataJudul` accept rapat, sedang, lega or empty, else 400 "Pilihan jarak huruf judul tidak valid." / "Pilihan jarak antar kata judul tidak valid.". `GET /public/pengaturan` is the dev API's map with the saved keys laid over it (only the saved keys if the dev API is down).
- Every other `GET /api/v1/public/*` is forwarded to the dev API (10 s timeout, 502 JSON on failure). Public POST counters answer 204 and are not forwarded. Anything else answers 404 `{"message":"Not handled by the mock API"}`.

It listens on 127.0.0.1 only.
