# Curation — this project vs. Sitemap [DEV]

**Source of truth:** [`docs/sitemap-dev-uks.MD`](./sitemap-dev-uks.MD) (`portal-uks.demo.or.id`, the V2 redesign)
**Audited:** `src/` on branch `rama/feat/curation-mockup-site`
**Method:** every dev nav destination and homepage section from the sitemap, checked against the views, sections and data in `src/App.jsx`, `src/components/*`, `src/data/portalData.js`.

## How the project is built today

No router. `App.jsx` switches on a `currentView` string; `EdgeDrawer` scrolls to `id`s inside the active view. Nine views total:

| View key | Rendered by | Sections |
|---|---|---|
| `beranda` | `BerandaView` | hero, stats, trias, programs, gss, news, books, gallery |
| `uksm-profil` | `UksmClusters` | deskripsi, tujuan, sasaran, struktur, stratifikasi, manajemen |
| `uksm-trias` | `UksmClusters` | pendidikan (7), pelayanan (4), lingkungan (5) |
| `uksm-gss` | `UksmClusters` | overview, 5 sehat, advokasi |
| `program` | `ProgramView` | MBG, CKG, 7KAIH, SAIH, Dokcil, Sarpras |
| `mitra` | `MitraView` | alur, form, katalog, testimoni |
| `informasi` | `InformasiView` | berita, praktik baik, agenda |
| `publikasi` | `PublikasiView` | books, infografis, video, regulasi |
| `kontak` | `KontakView` | alamat, helpdesk, tiket, FAQ |

Dev's 4 UKS/M pages are consolidated into 3 cluster pages here; Program/Mitra/Informasi/Publikasi are single-page "lobbies" with tab sections instead of one page per item. That consolidation is deliberate (`Navbar.jsx` comments say so) and matches dev's own flatten-the-nav philosophy — it is **not** counted as a miss below. What *is* counted is content that exists in dev and has no home here at all.

---

## A. Missing entirely — in dev, nothing here

| # | Dev destination | Status here | Notes |
|---|---|---|---|
| A1 | **Tautan menu** (7th nav item: Kemenkes / Kemendikdasmen / Kemenag / Kemendagri, 11 external links) | ❌ absent from navbar, mobile menu, and footer | Whole top-level menu missing |
| A2 | **`/pencarian`** + search icon in header | ❌ no search anywhere in `src/` | Dev has it on every page |
| A3 | **`/asri`** — Gerakan Sekolah ASRI | ❌ | `ProgramView` has MBG, CKG, 7KAIH, SAIH, Dokcil, Sarpras — no ASRI. ASRI is a **dev-only** program (not on prod), so it can only come from this sitemap |
| A4 | **`/mitra-uks`** — Tentang Mitra UKS/M (bidang usaha, bentuk dukungan) | ❌ | `MitraView` has no overview section |
| A5 | **`/aktifitas-mitra`** — Aktivitas Mitra news feed | ❌ | |
| A6 | **`/mitra/dukungan-mitra`** — table Nama Mitra / Periode / Bentuk Dukungan | ❌ | |
| A7 | **`/informasi/upt-bercerita`** — UPT Bercerita | ❌ | `InformasiView` has berita / praktik baik / agenda only |
| A8 | **`/informasi/aplikasi`** — app directory (SIJIWA, Oky) | ❌ | |
| A9 | **Homepage → Aplikasi section** (OKY, SATUSEHAT cards) | ❌ | |
| A10 | **Homepage → Tautan Terkait** (4 ministry logos) | ❌ | |
| A11 | **Homepage → Video section** (4 cards + "Temukan Video Lainnya") | ❌ on home | Video exists only inside Publikasi |
| A12 | **Homepage → Stratifikasi UKS/M** (4 strata boxes + "Lihat Detail") | ❌ on home | Strata data exists (`strataLevels`) but renders only inside `uksm-profil` |
| A13 | **Homepage → Mitra UKS logo grid** (~20 clickable partner logos) | ❌ | `Infografis.jsx` marquee uses `alt="Partner N"` but the images are UI screenshots, not partner logos |
| A14 | **`/halaman/berita/{slug}`** — article detail pages | ❌ | `InformasiView` expands an inline panel; no per-article destination |
| A15 | **Footer contact block** (address, email, phone) | ❌ | Footer is nav links + copyright only. Dev footer carries `uks.dikdasmen@kemdikbud.go.id` and the Senayan address |

## B. Present but thinner than dev

| # | Item | Dev | Here |
|---|---|---|---|
| B1 | Hero slider | 5 slides | 3 (driven by `realNewsList`, which has 3 entries) |
| B2 | Mitra Kami / Katalog | directory grouped by year — Mitra 2025 (~20), 2023–2024 (~25), 2022 (~7) | 6 partners, flat, no year grouping |
| B3 | Panduan Kemitraan | "Bentuk Kerja Sama" — sarpras, capacity building, publikasi/komunikasi | closest is "Alur Kemitraan 4 Tahap", a different thing (process flow, not support types) |
| B4 | Produk Hukum | filterable across 12 doc types (UU, PP, Perpres, Kepres, Inpres, Peraturan Bersama, Kepmen, Permen, Permenko, SE, SK, MOU) | 3 hardcoded docs, no filter |
| B5 | Buku Panduan | searchable library | 4 books, 4 category pills, no search box |
| B6 | Infografis | paginated gallery | 3 images + lightbox |
| B7 | Video | YouTube library, cards link out | 3 cards, thumbnails reuse news images, no YouTube URLs |
| B8 | Berita | filter by Pendidikan / UKS / Umum / GSS **+ sort by date** | filter by Kebijakan / Kegiatan / Inovasi GSS, no sort; 3 articles |
| B9 | Agenda | 17 events over 2 pages, filterable + sortable | 3 events, no filter/sort/pagination |
| B10 | Praktik Baik | filter by type (Video/Artikel) and category (7KAIH, MBG, PAUD, PMP, SD, SMK…) | 3 static cards, no filter |

## C. Here but not in dev — scope drift to confirm

These aren't bugs; they're content this project has that the dev source of truth doesn't. Flagging so you can decide keep vs. cut.

| # | Item | Where it comes from |
|---|---|---|
| C1 | **`uksm-gss` — Sekolah Sehat (GSS)**, one of the 3 top-level nav clusters | Prod-only. `comparison-sitemap.MD`: "Sekolah Sehat hub ❌ doesn't exist on dev at all" |
| C2 | **Homepage GSS section** (`sec-home-gss`, 5 fokus pembiasaan) | same — prod concept |
| C3 | **Program → SAIH & Gala Kreasi** | Prod-only (Gala Kreasi 2023/2024, Lomba SAIH 2025). Dev has no equivalent |
| C4 | **Program → Dokter Kecil & KKR** | In dev this is a Trias sub-indicator, not a standalone program |
| C5 | **Program → Standardisasi Sarpras UKS** | Not in dev or prod |
| C6 | **Mitra → Registrasi Mitra Baru** (form) | That's prod's "Pendaftaran Mitra" — and on prod it's an unbuilt placeholder stub. Not in dev |
| C7 | **Mitra → Testimoni Kolaborasi** | Not in dev or prod |
| C8 | **Homepage → Metrik Nasional** (534.120+ / 53,4 Juta / 514 / 14.280) | Dev serves a `stats` prop but the sitemap's homepage walkthrough lists no stats section. Numbers here look invented — needs verification against real figures before this ships anywhere public |
| C9 | **Kontak page** (alamat, helpdesk ULT 177, tiket form, FAQ) | Dev's `/kontak` is 💥 blank (the missing-component bug). This project is **ahead** of dev here — but that also means none of its content is verified against a real page |

## D. Structural

| # | Item |
|---|---|
| D1 | **No routing.** Dev exposes ~25 public URLs; this project has zero. No deep links, no browser back/forward, no shareable page addresses, no `/halaman/berita/{slug}`. If parity with dev's URL surface matters, this is the largest single gap |
| D2 | `Manajemen UKS/M` and `Stratifikasi UKS/M` are top-level pages in dev, sections of `uksm-profil` here — fine as consolidation, but they lose their own address. **Update 2026-09-17:** Stratifikasi is now its own view, `uksm-stratifikasi`, at UKS/M ▸ 3 (pengertian / tujuan / alat ukur as TODO placeholders, plus the 4 strata). Manajemen is still a Profil section |
| D3 | Label drift: navbar reads "UKS/M (3 Pilar)" and "Kemitraan" where dev reads "UKS/M" and "Mitra". The header "Stratifikasi" button routes to `uksm-profil`, not to a stratifikasi destination. **Update 2026-09-17:** labels now read "UKS/M" and "Mitra", and the Stratifikasi button opens the new page |

## E. Three-way check: project vs. DEV vs. PROD

Added after checking [`docs/sitemap-prod-uks.MD`](./sitemap-prod-uks.MD). Purpose: tell apart what the project is missing **no matter which site is the reference** from what depends on the DEV-vs-PROD decision.

Key: ✅ has it · ⚠️ partial/thin · ❌ missing · — not on that site · 🪧 stub · 💥 crashes · 🔗 external

### Navigation destinations

| Destination | DEV | PROD | Project | Project follows |
|---|---|---|---|---|
| Deskripsi / Tujuan / Sasaran | inside `/tentang-uks` | 3 separate pages | ✅ sections in `uksm-profil` | both |
| Struktur Organisasi (Tim Pembina / Tim Pelaksana) | inside `/tentang-uks` | 2 separate pages | ✅ 2 tabs in `uksm-profil` | both |
| Stratifikasi UKS/M | internal page | 🔗 `stratifikasiuks.org` | ✅ own page, UKS/M ▸ 3 (was a Profil section until 2026-09-17) | **DEV** |
| Manajemen UKS/M | page | page | ✅ section | both |
| Trias — 3 pillars | `/trias-uks`, **7 / 4 / 5** sub-programs (the sitemap's "7 / 5 / 5" is wrong, see [`trias-uks-content.MD`](./trias-uks-content.MD)) | 16 separate pages, **7 / 4 / 5** | ✅ `uksm-trias`: dev's full content as of 2026-09-17, shown with this project's tabs and panels; PHBS is a placeholder | **DEV** (content) |
| Sekolah Sehat hub (GSS + 5 Sehat + Bahan Advokasi) | — | ✅ 7 pages (hub URL itself ❌ 404) | ✅ `uksm-gss` | **PROD** |
| ↳ Gerakan Madrasah Sehat | — | 🔗 `madrasah.kemenag.go.id` | ❌ | — |
| ↳ Mitra Sekolah Sehat | — | ✅ page | ❌ | — |
| 7KAIH | `/7kaih` — 7 habits, 4 panduan PDFs, infografis, video, praktik baik | group — 🔗 Cerdas Berkarakter, Praktik Baik 7KAIH | ⚠️ tab with 7-habit list only | neither fully |
| SAIH 2025 / Gala Kreasi 2023–2024 | — | 6 pages (info, mekanisme, pemenang, video pemenang) | ⚠️ one summary tab, no winners / mechanics / videos | **PROD** (thin) |
| MBG | `/mbg` — Perpres 83/2024, BGN/SPPG | group — 🔗 Dasbor MBG, 🔗 BGN, Praktik Baik MBG | ⚠️ tab with Dasbor MBG + BGN links | **PROD** (links) |
| CKG | `/ckg` — real content | 🪧 "isi ckg dari paparan" | ✅ tab with real content | **DEV** (ahead of prod) |
| ASRI | `/asri` | — | ❌ | — |
| Program → Dokter Kecil & KKR | — (Trias sub-item) | — (Trias sub-page) | ✅ extra tab | neither |
| Program → Standardisasi Sarpras | — | — | ✅ extra tab | neither |
| Tentang Mitra UKS/M | page | — | ❌ | — |
| Panduan Kemitraan ("Bentuk Kerja Sama") | page | page | ⚠️ "Alur 4 Tahap" — different content | neither |
| Pendaftaran Mitra | — | 🪧 "sedang dikembangkan" | ✅ full form | **PROD** (built past the stub) |
| Mitra Kami (by year) | page | page | ⚠️ 6 partners, flat | both (thin) |
| **Aktivitas Mitra** | page | page | ❌ | — |
| **Dukungan Mitra** | page | page | ❌ | — |
| Testimoni Kolaborasi | — | — | ✅ extra | neither |
| Berita (+ detail pages) | page + `/{slug}` | page + `/{slug}` | ⚠️ list + inline panel | both (thin) |
| Praktik Baik (+ detail pages) | page | page + `/{slug}` | ⚠️ 3 static cards | both (thin) |
| **UPT Bercerita** | page | page + `/{slug}` | ❌ | — |
| Agenda | page | page | ⚠️ 3 events | both (thin) |
| **Aplikasi** (SIJIWA, Oky) | page | page | ❌ | — |
| Produk Hukum / Buku / Infografis / Video | 4 pages | 4 pages | ⚠️ 4 thin sections | both (thin) |
| **Tautan** (4 ministries, 11 links) | menu | menu, identical | ❌ | — |
| **Pencarian** | page + icon | page + icon | ❌ | — |
| Kontak | 💥 | 💥 | ✅ working page | neither (ahead of both) |
| FAQ | — | 💥 orphan `/faq` | ✅ section in Kontak | **PROD** (intent) |

### Homepage sections

| Section | DEV | PROD | Project |
|---|---|---|---|
| Hero | 5 slides, last one clickable | 4 decorative | ⚠️ 3 news slides (neither) |
| Trias 3 cards | ✅ | ✅ | ✅ |
| Program Prioritas | ✅ 4 cards | ✅ 3 links | ✅ |
| Berita | ✅ 4 | ✅ 4 | ✅ |
| Buku / Modul | ✅ 4 | ✅ 4 | ✅ |
| Infografis | ✅ 4 | ✅ 4 | ✅ |
| **Mitra logo grid** | ✅ ~20 | ✅ ~21 | ❌ screenshots, not logos |
| **Video** | ✅ 4 | ✅ 3 | ❌ |
| **Aplikasi** | ✅ OKY + SATUSEHAT | ✅ OKY | ❌ |
| **Footer contact** (address, email) | ✅ | ✅ | ❌ |
| Stratifikasi 4 strata | ✅ | — | ❌ |
| Tautan Terkait | ✅ | — | ❌ |
| Sekolah Sehat tabbed (5 foci) | — | ✅ | ✅ `sec-home-gss` |
| Praktik Baik Terupdate | — | ✅ 4 | ❌ |
| UPT Bercerita | — | ✅ 4 | ❌ |
| Dikembangkan oleh (4 logos) | — | ✅ | ❌ |
| Visitor-count widget (footer) | — | ✅ | ❌ |
| Metrik Nasional | — | — | ✅ extra |

### What this sorts into

**1 · Missing whichever site is the reference** — both DEV and PROD have it, project doesn't. Not blocked on any decision.
Tautan menu · Pencarian · Aktivitas Mitra · Dukungan Mitra · UPT Bercerita page · Aplikasi page · Berita detail pages · home Mitra logo grid · home Video · home Aplikasi · footer contact block.

**2 · Missing only if DEV is the reference**
ASRI · Tentang Mitra UKS/M · home Stratifikasi section · home Tautan Terkait.

**3 · Missing only if PROD is the reference**
Gerakan Madrasah Sehat link · Mitra Sekolah Sehat · Cerdas Berkarakter link · SAIH/Gala sub-content (mechanics, winners, winning videos) · Praktik Baik filtered to 7KAIH/MBG · Praktik Baik + UPT detail pages · home Praktik Baik · home UPT Bercerita · Dikembangkan oleh · visitor-count widget.

**4 · Kept or dropped depending on the reference** — present in the project because of PROD
Sekolah Sehat page + home section · SAIH tab · Pendaftaran Mitra form · Trias Pelayanan at 4 indicators (DEV says 5).

**5 · In neither site** — project invention, needs a keep/cut call regardless
Program → Dokter Kecil & KKR · Program → Sarpras · Mitra → Testimoni · home Metrik Nasional (figures unverified) · hero built from news items · Kontak content (ULT 177 helpdesk, tiket form).

### Reading of the result

The project is a **hybrid**: its UKS/M and Sekolah Sehat structure comes from PROD (as `menu-uksm-spec-mockup.md` instructed), while Stratifikasi-as-internal-page and real CKG content match DEV. Neither sitemap on its own explains the build.

## Open conflict

`menu-uksm-spec-mockup.md` at the repo root declares **PROD** the source of truth. The later brief declares **DEV**. Group 1 above (11 items) is safe to build either way; groups 2–4 wait on that call.
