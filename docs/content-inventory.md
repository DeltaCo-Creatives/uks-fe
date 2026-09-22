# Content inventory: Portal UKS/M

**Status:** Source of truth for what content exists and what happens to it, as of 2026-09-17.
**Structure:** follows [sitemap-portal-uks.md](./sitemap-portal-uks.md). Each row's *New location* is a page and section in that sitemap.
**Evidence:** finding IDs such as `B1` or `S1` point to [content-curation-report.md](./content-curation-report.md), which checks this project's content against `docs/`.

## How to read this

**One row per content unit.** A unit is a page, section or list that is managed as one piece.

**Collections are one row.** Berita, praktik baik, UPT bercerita, agenda, books, infografis, videos and produk hukum each get a single row. Their individual items aren't inventoried here; they will come from the CMS.

**Source** says where the content on the site today comes from:

| Mark | Meaning |
|---|---|
| ✅ | Curated from a content file in `docs/` (prod or dev scrape) |
| 🟡 | Curated, with open owner items |
| 🔴 | Mock or unsourced. The structure stays, but the content is not truth |
| ⬜ | Not on the site yet |

**Action** is what the content needs before launch:

| Action | Meaning |
|---|---|
| **keep** | Sourced and in place. No work |
| **merge** | Several old pages are combined into one new location. Content already moved |
| **rewrite** | The slot stays; the content must be replaced with real content |
| **fix** | Content is right but has a specific defect (link, image, typo, label) |
| **add** | In a source, not on the site yet |
| **remove** | Not carried over. The old URL redirects to the nearest parent |
| **decide** | Blocked on a content owner decision |

**Old URL:** `prod` = uks.kemendikdasmen.go.id, `dev` = portal-uks.demo.or.id, `—` = site-only content.

---

## Global

| ID | Content | Type | Old URL | New location | Source | Action | Notes |
|---|---|---|---|---|---|---|---|
| G-01 | Header navigation | Nav | prod/dev header | Header | ✅ | keep | Two menu levels instead of prod's four |
| G-02 | Tautan menu (4 groups, 11 links) | Link list | prod/dev ▸ Tautan | Header ▸ Tautan | ✅ | fix | 2 labels differ from prod: "KSKK Madrasah", "SUPD (Ditjen Bina Bangda)" (L1) |
| G-03 | Pencarian | Page | prod/dev `/pencarian` | `/pencarian` | 🔴 | rewrite | Index includes mock lists; becomes real when I-01…U-04 are real |
| G-04 | Footer description and tagline | Copy | — | Footer | 🔴 | rewrite | "Portal Resmi… lintas 4 Kementerian", "Sinergi 4 Kementerian untuk Indonesia Emas 2045" (C1) |
| G-05 | Footer contact: email | Contact | prod footer mailto | Footer | ✅ | keep | uks.dikdasmen@kemdikbud.go.id |
| G-06 | Footer contact: address and phone | Contact | — | Footer | 🔴 | rewrite | No source (K1) |
| G-07 | Footer visitor counter | Widget | prod footer | — | ⬜ | decide | Prod shows Hari Ini / Minggu Ini / Bulan Ini / Total (C2) |
| G-08 | Footer link pauddikdasmen.kemdikbud.go.id | Link | prod footer | — | ⬜ | decide | Old domain (C2) |

## Beranda (`/`)

| ID | Content | Type | Old URL | New location | Source | Action | Notes |
|---|---|---|---|---|---|---|---|
| B-01 | Hero carousel | Section | prod `/` (4 decorative slides) · dev `/` (5 slides) | Beranda ▸ hero | 🔴 | rewrite | Built from mock news; CTA goes to `#berita`, not the article (B2) |
| B-02 | National stats strip | Section | — | Beranda ▸ stats | 🔴 | decide | 534.120+ / 53,4 Juta / 514 / 14.280, no source (B1) |
| B-03 | Trias UKS/M, 3 pillar cards | Section | prod/dev `/` | Beranda ▸ trias | ✅ | keep | Pillar texts from Trias |
| B-04 | Stratifikasi teaser, 4 strata | Section | dev `/` | Beranda ▸ stratifikasi | 🟡 | decide | Strata names (S1) |
| B-05 | Sekolah Sehat, 5 foci | Section | prod `/` (tabbed hub) | Beranda ▸ gss | ✅ | keep | |
| B-06 | Program Prioritas | Section | prod `/` (3 links) · dev `/` (4 broken links) | Beranda ▸ programs | ✅ | keep | 5 programs from Program data |
| B-07 | Berita terbaru | Collection | prod/dev `/` (4) | Beranda ▸ news | 🔴 | rewrite | Mock (I1) |
| B-08 | Praktik Baik terbaru | Collection | prod `/` (4) | — | ⬜ | add | (B3) |
| B-09 | UPT Bercerita terbaru | Collection | prod `/` (4) | — | ⬜ | add | (B3) |
| B-10 | Buku panduan terbaru | Collection | prod `/` (4) · dev "Modul Terbaru" | Beranda ▸ books | 🔴 | rewrite | Mock (U2) |
| B-11 | Infografis terbaru | Collection | prod/dev `/` (4) | Beranda ▸ gallery | 🔴 | rewrite | Mock 3 items plus a "Partner N" screenshot strip (B4) |
| B-12 | Video Sekolah Sehat | Collection | prod `/` (3) · dev `/` (4) | — | ⬜ | add | Drawer entry exists without a section (B3, B5) |
| B-13 | Aplikasi terkait | Section | prod `/` (OKY) · dev `/` (OKY, SATUSEHAT) | — | ⬜ | add | Depends on I-05 (B3) |
| B-14 | Mitra logo grid | Section | prod `/` (~21 logos) · dev `/` (~20) | — | ⬜ | decide | Needs one logo file per partner, with permission (M3) |
| B-15 | Ministry logos ("Dikembangkan oleh" / "Tautan Terkait") | Section | prod `/` (4, not clickable) · dev `/` (4 links) | — | ⬜ | add | Data exists: `ministryLinks` in `site.js` |
| B-16 | Beranda section drawer | Nav | — | Beranda drawer | ✅ | fix | 4 entries point to missing sections; order differs from page (B5) |

## UKS/M ▸ 1. Profil & Tata Kelola (`/uksm/profil`)

| ID | Content | Type | Old URL | New location | Source | Action | Notes |
|---|---|---|---|---|---|---|---|
| P-01 | Deskripsi Umum: definition, 3 Trias pillars, continuity | Page text | prod `/tentang-uks/deskripsi-umum` · dev `/tentang-uks` | Profil ▸ deskripsi | ✅ | merge | Continuity reworded as instructions (P1) |
| P-02 | Tujuan UKS/M | Page text | prod `/tentang-uks/tujuan` | Profil ▸ tujuan | 🟡 | decide | Two official wordings (Deskripsi Umum vs Tujuan page) (P2) |
| P-03 | Sasaran and stakeholders | Page text | prod `/tentang-uks/sasaran` | Profil ▸ sasaran | ✅ | merge | |
| P-04 | Tim Pembina: definition, 4 levels | Page text | prod `/tentang-uks/struktur-organisasi-tim-pembina` | Profil ▸ struktur (tab) | ✅ | merge | |
| P-05 | Tim Pembina org chart | Image | prod (image `wj8RI73K…png`) | Profil ▸ struktur (tab) | 🟡 | fix | Placeholder slot; image needs a corrected ministry name, "SMA/MA" and "Kantor Kemenag" (P2) |
| P-06 | Tim Pelaksana: definition, fungsi, 4 tugas | Page text | prod `/tentang-uks/struktur-organisasi-timpelaksana` | Profil ▸ struktur (tab) | ✅ | merge | |
| P-07 | Tim Pelaksana org chart | Image | prod (image `UW9rT7uQ…png`) | Profil ▸ struktur (tab) | 🟡 | fix | Placeholder slot; final image needed |
| P-08 | Manajemen UKS/M: 5 components, monitoring, evaluasi | Page text | prod `/program/manajemen-uks-m` · dev `/manajemen-uks` | Profil ▸ manajemen | ✅ | merge | "lampiran 8" monitoring form doesn't exist (P2) |
| P-09 | "TRIAS UKS/M :" nav item | Nav | prod UKS/M menu | — | — | remove | Duplicate of Deskripsi Umum |
| P-10 | Stock images (logo, "tujuan" icon, dartboard) | Image | prod Profil pages | — | — | remove | Decorative only |

## UKS/M ▸ 2. TRIAS UKS/M (`/uksm/trias`)

| ID | Content | Type | Old URL | New location | Source | Action | Notes |
|---|---|---|---|---|---|---|---|
| T-01 | Pillar overview pages | Page | prod `/program/pendidikan-kesehatan`, `/pelayanan-kesehatan`, `/pembinaan-lingkungan-sekolah-sehat` | Trias ▸ pillar intros | 🟡 | decide | Site uses dev's one-paragraph intros; prod's long-form overviews were never scraped into `docs/` |
| T-02 | Literasi Kesehatan | Sub-program | prod `/program/literasi-kesehatan` · dev `/trias-uks` | Trias ▸ pendidikan ▸ `literasi-kesehatan` | ✅ | merge | |
| T-03 | Perilaku Hidup Bersih dan Sehat | Sub-program | prod `/program/perilaku-hidup-bersih-dan-sehat` · dev `/trias-uks` | Trias ▸ pendidikan ▸ `perilaku-hidup-bersih-dan-sehat` | 🔴 | rewrite | Both sources reuse the Sanitasi article; own copy needed (T1) |
| T-04 | Pendidikan Gizi | Sub-program | prod `/program/…` · dev `/trias-uks` | Trias ▸ pendidikan ▸ `pendidikan-gizi` | 🟡 | fix | 2 "Tautan Penting" links have no URL (T2) |
| T-05 | Pendidikan Kesehatan Reproduksi | Sub-program | prod `/program/…` · dev `/trias-uks` | Trias ▸ pendidikan ▸ `pendidikan-kesehatan-reproduksi` | ✅ | merge | |
| T-06 | Pendidikan Karakter | Sub-program | prod `/program/…` · dev `/trias-uks` | Trias ▸ pendidikan ▸ `pendidikan-karakter` | ✅ | merge | |
| T-07 | Pembiasaan Aktivitas Fisik | Sub-program | prod `/program/…` · dev `/trias-uks` | Trias ▸ pendidikan ▸ `pembiasaan-aktivitas-fisik` | ✅ | merge | |
| T-08 | Dokter Kecil | Sub-program | prod `/program/…` · dev `/trias-uks` | Trias ▸ pendidikan ▸ `dokter-kecil` | ✅ | merge | |
| T-09 | Penjaringan Kesehatan dan Pemeriksaan Berkala | Sub-program | prod `/program/penjaringan-kesehatan-dan-pemeriksaan-berkala` · dev `/trias-uks` | Trias ▸ pelayanan ▸ `penjaringan-kesehatan-dan-pemeriksaan-berkala` | ✅ | merge | |
| T-10 | Imunisasi | Sub-program | prod `/program/…` · dev `/trias-uks` | Trias ▸ pelayanan ▸ `imunisasi` | ✅ | merge | |
| T-11 | Pemberian Obat Cacing | Sub-program | prod `/program/…` · dev `/trias-uks` | Trias ▸ pelayanan ▸ `pemberian-obat-cacing` | ✅ | merge | |
| T-12 | P3K dan P3P | Sub-program | prod `/program/…` · dev `/trias-uks` | Trias ▸ pelayanan ▸ `p3k-dan-p3p` | ✅ | merge | |
| T-13 | Sanitasi Sekolah | Sub-program | prod `/program/sanitasi-sekolah` · dev `/trias-uks` | Trias ▸ lingkungan ▸ `sanitasi-sekolah` | ✅ | merge | |
| T-14 | Pembinaan Kantin Sehat | Sub-program | prod `/program/…` · dev `/trias-uks` | Trias ▸ lingkungan ▸ `pembinaan-kantin-sehat` | ✅ | merge | |
| T-15 | Pemanfaatan Pekarangan Sekolah/Madrasah | Sub-program | prod `/program/…` · dev `/trias-uks` | Trias ▸ lingkungan ▸ `pemanfaatan-pekarangan-sekolah` | ✅ | merge | |
| T-16 | Pemberantasan Sarang Nyamuk | Sub-program | prod `/program/…` · dev `/trias-uks` | Trias ▸ lingkungan ▸ `pemberantasan-sarang-nyamuk` | ✅ | merge | |
| T-17 | Kawasan Tanpa Rokok, NAPZA, Kekerasan dan Pornografi | Sub-program | prod `/program/…` · dev `/trias-uks` | Trias ▸ lingkungan ▸ `kawasan-tanpa-rokok-napza-kekerasan-pornografi` | ✅ | merge | |

Prod slugs marked `/program/…` aren't recorded in `docs/`; confirm them before writing redirects.

## UKS/M ▸ 3. Stratifikasi UKS/M (`/uksm/stratifikasi`)

| ID | Content | Type | Old URL | New location | Source | Action | Notes |
|---|---|---|---|---|---|---|---|
| S-01 | Page and dashboard link | Page | prod nav → stratifikasiuks.org · dev `/stratifikasi-uks` | Stratifikasi (+ 🔗 dashboard CTA) | ✅ | keep | Prod had no internal page |
| S-02 | Apa itu, Tujuan (4), Cara Penilaian | Page text | dev `/stratifikasi-uks` | Stratifikasi ▸ pengertian, tujuan, penilaian | ✅ | keep | |
| S-03 | Indicator rubric, SD, 4 categories × 4 strata | Table | dev CMS "Stratifikasi UKS SD" (not rendered on dev) | Stratifikasi ▸ indikator | ✅ | keep | SD only; no source for other jenjang |
| S-04 | Strata names | Label | dev page "Dasar…"; dev CMS and homepage "Minimal, Standar, Optimal"; prod Deskripsi Umum "minimal, optimal, standar" | Stratifikasi, Profil, Beranda, nav, FAQ | 🟡 | decide | Three schemes in use (S1) |
| S-05 | Definisi, Maksud, Penilaian | Page text | dev CMS "Deskripsi" (not rendered on dev) | Stratifikasi ▸ penilaian | ⬜ | add | (S2) |
| S-06 | Per-strata calculation rule | Page text | dev CMS "Perhitungan Stratifikasi UKS/M" (not rendered) | Stratifikasi ▸ penilaian | ⬜ | add | (S2) |

## UKS/M ▸ 4. Sekolah Sehat (`/uksm/sekolah-sehat`)

| ID | Content | Type | Old URL | New location | Source | Action | Notes |
|---|---|---|---|---|---|---|---|
| SS-01 | Sekolah Sehat hub | Page | prod `/sekolah-sehat` (404) | GSS page | ✅ | fix | Old URL redirects here |
| SS-02 | Gerakan Madrasah Sehat | External link | prod Sekolah Sehat menu | GSS ▸ hero | ✅ | keep | madrasah.kemenag.go.id |
| SS-03 | Gerakan Sekolah Sehat: definition, 5 foci, manfaat, sasaran, videos | Page text | prod `/sekolah-sehat/gerakan-sekolah-sehat` | GSS ▸ konsep | ✅ | merge | "Column 2/4" leftovers removed |
| SS-04 | Sehat Bergizi | Page | prod `/sekolah-sehat/sehat-bergizi` | GSS ▸ 5 fokus ▸ `bergizi` | ✅ | merge | Video kept under its real title |
| SS-05 | Sehat Fisik | Page | prod `/sekolah-sehat/sehat-fisik` | GSS ▸ 5 fokus ▸ `fisik` | 🟡 | fix | TKSI link dead (G2) |
| SS-06 | Sehat Imunisasi | Page | prod `/sekolah-sehat/sehat-imunisasi` | GSS ▸ 5 fokus ▸ `imunisasi` | 🟡 | fix | Juknis BIAS is a private Drive file (G2) |
| SS-07 | Sehat Jiwa | Page | prod `/sekolah-sehat/sehat-jiwa` | GSS ▸ 5 fokus ▸ `jiwa` | 🟡 | fix | Video removed (wrong); AAP module and SIJIWA links missing (G2) |
| SS-08 | Sehat Lingkungan | Page | prod `/sekolah-sehat/sehat-lingkungan` | GSS ▸ 5 fokus ▸ `lingkungan` | 🟡 | fix | Video removed (wrong); toilet poster and leaflet links wrong (G2) |
| SS-09 | Produk hukum (18) | Collection | prod `/sekolah-sehat/bahan-advokasi` | GSS ▸ bahan advokasi | 🟡 | fix | 2 without a link (Permenkes 2269/2011, Perpres 67/2021) |
| SS-10 | Materi kampanye (20) | Collection | prod `/sekolah-sehat/bahan-advokasi` | GSS ▸ bahan advokasi | 🟡 | fix | 4 without a link (dead domain, private Drive) |
| SS-11 | Mitra Sekolah Sehat | Page | prod `/sekolah-sehat/mitra-sekolah-sehat` | Mitra ▸ panduan | ✅ | merge | Same text as Panduan Kemitraan; dead registration link dropped |

## Program (`/program`)

| ID | Content | Type | Old URL | New location | Source | Action | Notes |
|---|---|---|---|---|---|---|---|
| PR-01 | Makan Bergizi Gratis (MBG) | Program | prod Program ▸ MBG (external links only) · dev `/mbg` | Program ▸ `mbg` | 🟡 | fix | Dasbor MBG link returns 403 |
| PR-02 | Cek Kesehatan Gratis (CKG) Sekolah | Program | prod `/program/cek-kesehatan-gratis` (placeholder) · dev `/ckg` | Program ▸ `ckg` | 🟡 | add | Headline and "bagian dari CKG yang lebih luas" sentence missing (R3); ckg.kemkes.go.id not responding |
| PR-03 | Gerakan 7KAIH | Program | prod Program ▸ 7KAIH (external) · dev `/7kaih` | Program ▸ `7kaih` | 🟡 | add | Second intro paragraph, "Yuk, Praktikkan" CTA, portal panduan and posters missing (R3); SEB link returns 500 |
| PR-04 | Gerakan Sekolah ASRI | Program | dev `/asri` | Program ▸ `asri` | ✅ | keep | Dev-only program |
| PR-05 | SAIH 2025: informasi lomba | Program | prod `/gala-kreasi/informasi-lomba-saih-2025` | Program ▸ `prestasi` ▸ SAIH 2025 ▸ Mekanisme | 🟡 | fix | PAUD and SD contest links dead |
| PR-06 | SAIH 2025: pengumuman pemenang | Page | prod `/gala-kreasi/pengumuman-pemenang-2025` | Program ▸ `prestasi` ▸ SAIH 2025 ▸ Pengumuman | ✅ | keep | Renders as an empty state; prod still said "Konten belum tersedia" on 2026-09-22 |
| PR-07 | Gala Kreasi Video 2024 | Archive | prod `/gala-kreasi/gala-kreasi-2024` | Program ▸ `prestasi` ▸ Gala 2024 ▸ Mekanisme | 🟡 | add | 4 Tujuan Kegiatan now in; 2 of 3 downloads (panduan ppt, surat pernyataan, logos) still missing (R3) |
| PR-08 | Gala Kreasi 2024: pengumuman pemenang | Page | prod `/gala-kreasi/gala-kreasi-2024-pemenang` | Program ▸ `prestasi` ▸ Gala 2024 ▸ Pengumuman | ✅ | keep | Scraped 2026-09-22 into `docs/program/gala-2024-pemenang.md` (P1) |
| PR-09 | Gala Kreasi 2024: video pemenang | Page | prod `/gala-kreasi/gala-kreasi-2024-video-pemenang` | Program ▸ `prestasi` ▸ Gala 2024 ▸ Showcase pemenang | ✅ | keep | 114 winners scraped 2026-09-22 into `docs/program/gala-2024-pemenang.md` (P2) and `src/data/prestasi.js`; some prod provinces are wrong, left as-is |
| PR-10 | Gala Kreasi Video 2023 | Archive | prod `/gala-kreasi/gala-kreasi-2023` | Program ▸ `prestasi` ▸ Gala 2023 ▸ Mekanisme | 🟡 | fix | Juklak on a dead domain, shown as "tautan belum tersedia" |
| PR-11 | Praktik Baik 7KAIH / MBG | Filtered list | prod `/informasi/praktik-baik?kategori=15`, `=16` | Informasi ▸ praktik baik (filter) | ⬜ | add | Needs category filter (I2) |
| PR-12 | Program curation log | Doc | — | `docs/program-curation.md` | ⬜ | add | Referenced from `program.js`; file missing (R1) |
| PR-13 | Gita Adhi Gizi 2026: lomba edukasi gizi | Program | — (official flyer and links supplied by the owner, 2026-09-22) | Program ▸ `prestasi` ▸ Gita Adhi Gizi 2026 ▸ Mekanisme | 🟡 | add | First competition aimed at pemda and UPT, not satuan pendidikan. Flyers in `public/program/gita-adhi-gizi-2026-*.webp`; no `docs/` content file yet |
| PR-14 | Gita Adhi Gizi 2026: pengumuman pemenang | Page | — | Program ▸ `prestasi` ▸ Gita Adhi Gizi 2026 ▸ Pengumuman | ⬜ | add | Rapat pleno scheduled November 2026; renders as an empty state until then |

## Mitra (`/mitra`)

| ID | Content | Type | Old URL | New location | Source | Action | Notes |
|---|---|---|---|---|---|---|---|
| M-01 | Panduan Kemitraan: forms, rules, benefits | Page text | prod/dev `/mitra/panduan-kemitraan` | Mitra ▸ panduan | ✅ | merge | Ministry name "Kemendikbudristek" to confirm |
| M-02 | Kriteria mitra (3 sectors) | Page text | prod/dev `/mitra/panduan-kemitraan` | Mitra ▸ kriteria | ✅ | keep | "KSS" never expanded in source |
| M-03 | Pendaftaran Mitra | Page | prod `/mitra/pendaftaran-mitra` (placeholder) | Mitra ▸ kriteria | 🟡 | decide | Status text + Kontak button until a real form or address exists |
| M-04 | Mitra Kami: bidang usaha, bentuk dukungan, partners by year | Page text | prod `/mitra/mitra-kami` · dev `/mitra-uks` | Mitra ▸ mitra kami | ✅ | merge | KPM vs Klinik Pendidikan MIPA naming (M2) |
| M-05 | Dukungan Mitra 2025 | Table | prod/dev `/mitra/dukungan-mitra` | Mitra ▸ dukungan | 🟡 | decide | Tanoto "Modul Choice" line dropped (M2) |
| M-06 | Aktivitas Mitra | Page | prod/dev `/aktifitas-mitra` | — | — | remove | Prod only listed the other 4 Mitra pages |
| M-07 | Partner logo collage | Image | prod Mitra Kami, Mitra Sekolah Sehat | — | — | remove | One base64 collage, includes non-partners |

## Informasi (`/informasi`)

| ID | Content | Type | Old URL | New location | Source | Action | Notes |
|---|---|---|---|---|---|---|---|
| I-01 | Berita (list + detail) | Collection | prod/dev `/halaman/berita`, `/{slug}` | Informasi ▸ berita, `/informasi/berita/{slug}` | 🔴 | rewrite | 4 mock items (I1) |
| I-02 | Praktik Baik | Collection | prod/dev `/informasi/praktik-baik`, `/{slug}` | Informasi ▸ praktik baik | 🔴 | rewrite | 3 mock items; add category filter and detail page (I1, I2). One real item documented: ASRI Jumat Bersih |
| I-03 | UPT Bercerita | Collection | prod/dev `/informasi/upt-bercerita`, `/{slug}` | Informasi ▸ UPT bercerita | 🔴 | rewrite | 8 mock items; add detail page (I1) |
| I-04 | Agenda | Collection | prod/dev `/informasi/agenda` | Informasi ▸ agenda | 🔴 | rewrite | 3 mock items (I1) |
| I-05 | Aplikasi | Collection | prod/dev `/informasi/aplikasi` | Informasi ▸ aplikasi | 🔴 | decide | Prod: SIJIWA + Oky. Site adds SATUSEHAT; SIJIWA developer conflicts with GSS source; descriptions unsourced (I3) |

## Publikasi (`/publikasi`)

| ID | Content | Type | Old URL | New location | Source | Action | Notes |
|---|---|---|---|---|---|---|---|
| U-01 | Produk Hukum | Collection | prod/dev `/dokumen/produk-hukum` | Publikasi ▸ produk hukum | 🔴 | decide | 3 unsourced items; the sourced 18-item list is SS-09. Merge into one list? (U1) |
| U-02 | Buku Panduan | Collection | prod/dev `/dokumen/publikasi/buku-panduan` | Publikasi ▸ buku panduan | 🔴 | rewrite | 4 mock items. Sourced candidates: GSS buku saku, 7KAIH Kiat Jitu, Pedoman MBG (U2) |
| U-03 | Infografis | Collection | prod/dev `/dokumen/publikasi/infografis` | Publikasi ▸ infografis | 🔴 | rewrite | 3 mock items. Sourced candidates: GSS infografis, 7KAIH posters (U2) |
| U-04 | Video | Collection | prod/dev `/dokumen/publikasi/video` | Publikasi ▸ video | 🔴 | rewrite | 4 mock items. Sourced candidates: SKJ 2022, Gerak Lagu, ILM Sekolah Sehat, Imunisasi Lindungi Mimpi (U2) |

## Kontak (`/kontak`)

| ID | Content | Type | Old URL | New location | Source | Action | Notes |
|---|---|---|---|---|---|---|---|
| K-01 | Alamat and helpdesk | Contact | prod/dev `/kontak` (crashes) | Kontak ▸ alamat, helpdesk | 🔴 | rewrite | Address, phone, ULT 177 and hours have no source (K1) |
| K-02 | Formulir pertanyaan | Form | — | Kontak ▸ formulir | 🔴 | decide | Doesn't submit; fake ticket "#UKS-2026-9812" (K2) |
| K-03 | FAQ | Collection | prod `/faq` (crashes, unlinked) | Kontak ▸ FAQ | 🔴 | rewrite | 3 unsourced answers; Stratifikasi answer contradicts S-03 (K3) |

---

## Totals

| Action | Rows |
|---|---|
| keep | 11 |
| merge | 24 |
| rewrite | 17 |
| fix | 15 |
| add | 12 |
| remove | 5 |
| decide | 15 |
| **Total** | **99** |

## Decisions that unblock the most rows

1. **Strata names:** S-04, B-04, K-03.
2. **Real feeds for the mock collections:** I-01…I-04, U-02…U-04, B-01, B-07, B-10, B-11, G-03.
3. **One Produk Hukum list:** U-01, SS-09.
4. **Kontak content and form:** K-01…K-03, G-06.
5. **Capture the missing prod pages** (Gala 2024 pemenang and video pemenang, the Trias pillar overviews, the 12 unrecorded sub-program slugs): PR-08, PR-09, T-01, T-02…T-17 redirects.
