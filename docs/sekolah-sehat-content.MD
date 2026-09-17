# `/sekolah-sehat/*` — Content Specification

Scraped live from `https://uks.kemendikdasmen.go.id/sekolah-sehat/{slug}` (PROD) on 2026-09-17, via Inertia JSON (`X-Inertia: true`). Verbatim page content lives in [`docs/sekolah-sehat/`](./sekolah-sehat/), one file per page.

## Pages

The **Sekolah Sehat** menu has 8 entries. 7 are internal pages, all rendered by the same Inertia component `Program/Show`. Each page's entire body is a single CMS rich-text field, `props.program.konten`.

| # | Menu title | URL | File | Content |
|---|---|---|---|---|
| — | Gerakan Madrasah Sehat | `https://madrasah.kemenag.go.id/madrasahsehat/` | — | External link (Kemenag) |
| 1 | Gerakan Sekolah Sehat | `/sekolah-sehat/gerakan-sekolah-sehat` | [gerakan-sekolah-sehat.md](./sekolah-sehat/gerakan-sekolah-sehat.md) | Definition, 5 focus areas, manfaat, sasaran, 3 videos, mitra logo |
| 2 | Sehat Bergizi | `/sekolah-sehat/sehat-bergizi` | [sehat-bergizi.md](./sekolah-sehat/sehat-bergizi.md) | 4 kegiatan, Isi Piringku, 10 pedoman gizi seimbang, 4 komponen kantin sehat, 3 downloads |
| 3 | Sehat Fisik | `/sekolah-sehat/sehat-fisik` | [sehat-fisik.md](./sekolah-sehat/sehat-fisik.md) | 5 kegiatan, SKJ + its management (frekuensi/waktu/sarana/durasi/instruktur), 4L, peregangan, 4 downloads |
| 4 | Sehat Imunisasi | `/sekolah-sehat/sehat-imunisasi` | [sehat-imunisasi.md](./sekolah-sehat/sehat-imunisasi.md) | 3 kegiatan, BIAS, sasaran/jenis/jadwal, 5 downloads, 2 videos |
| 5 | Sehat Jiwa | `/sekolah-sehat/sehat-jiwa` | [sehat-jiwa.md](./sekolah-sehat/sehat-jiwa.md) | 5 kegiatan, sosialisasi topics, SIJIWA app, anti-bullying goals, 3 downloads |
| 6 | Sehat Lingkungan | `/sekolah-sehat/sehat-lingkungan` | [sehat-lingkungan.md](./sekolah-sehat/sehat-lingkungan.md) | 7 kegiatan, CTPS + 5 steps, 3R, 3 downloads |
| 7 | Bahan Advokasi GSS | `/sekolah-sehat/bahan-advokasi` | [bahan-advokasi.md](./sekolah-sehat/bahan-advokasi.md) | 18 produk hukum + 20 campaign materials (plain link lists) |

## Shared structure (the 5 "Sehat …" pages)

All five focus pages follow the same skeleton, so they can share one template:

1. **Intro**: title, a one-sentence goal ("Sehat X bertujuan untuk…"), a video thumbnail and link, and a hero illustration.
2. **"Kegiatan Sehat X terdiri dari:"**: 3–7 short activities, each with an icon.
3. **Topic deep-dives**: 1–4 blocks, each with an illustration, a heading, a paragraph and sometimes an icon list (e.g. Isi Piringku, SKJ, BIAS, SIJIWA, CTPS).
4. **"Alat Bantu Penerapan Sehat X"**: download cards (buku saku, poster, leaflet, modul) with **UNDUH** links.
5. Optional **Video** row.

## 🚩 Flags

1. **Base64 image bloat.** 61–86% of each focus page's HTML is inline base64 images (~326 KB across 6 pages). Most of it is the same few 128×128 icons pasted over and over (e.g. Gerakan Sekolah Sehat: 6 embeds, 1 unique image). A rebuild should use real icons (Font Awesome in this project).
2. **CMS placeholder text leaked.** Gerakan Sekolah Sehat renders the literal text "Column 2" / "Column 4" seven times (empty table/column cells).
3. **Links to the old domain.** 6 internal links point at `uks.kemdikbud.go.id` (the 5 focus-area links on Gerakan Sekolah Sehat, plus the Lingkungan poster).
4. **Wrong / reused videos.** Sehat Bergizi ("Gizi Baikku, Cermin Masa Depanku"), Sehat Jiwa ("Di Dalam Tubuh yang Sehat Terdapat Jiwa yang Kuat") and Sehat Lingkungan ("Lestari Lingkungan Sehat dan Nyaman") all link to the **same** video `DF-0fcEbqWs`. At most one of those titles can be right.
5. **Placeholder thumbnails.** Every "Alat Bantu" download card uses the same image (`ttJCZ9Gl…png`).
6. **Copy-pasted alt text.** Many unrelated illustrations have the alt "senam kesegaran jasmani" (sometimes "jasmine").
7. **Mismatched downloads.**
   - Sehat Lingkungan's "Poster Prosedur Pembersihan Toilet" links to the generic infografis page.
   - Bahan Advokasi items 3 and 4 (Permenko PMK 1/2022 and Permenkes 2269/2011) link to the **same PDF**.
   - Item 8 (Perpres 67/2021 TBC) has no link.
   - Sehat Jiwa's download row mixes per-jenjang PAUD/SD/SMP/SMA links with generic "UNDUH" links, so it's unclear which file belongs to which module.
8. **Small copy errors.**
   - "CPTS" should be "CTPS" (Sehat Lingkungan).
   - "Sehat imunisasi" has a lowercase *i* in its CMS title.
   - "dalamBulan" is missing a space.
   - Several pages have empty `###` headings.

## Mapping to this project

The `uksm-gss` view already exists in navigation (`src/data/navigation.js`), with Daftar Isi sections `sec-gss-overview`, `sec-gss-5sehat` and `sec-gss-advokasi`. Those three sections line up with pages 1, 2–6 and 7 above.
