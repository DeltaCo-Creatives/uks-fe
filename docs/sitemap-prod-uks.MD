# Sitemap [PROD] — uks.kemendikdasmen.go.id (Portal UKS/M)

## How this was traced

Same method as the [DEV] sitemap, applied independently to the live production site — not copied from any prior mapping of it:

- **`<script data-page="app" type="application/json">`** — the Inertia page payload for `Home/Index` (note: **not** `Home/V2/Index` — prod runs the older, pre‑redesign homepage template), which carries the full `navItems` tree plus every homepage data prop (`sliderData`, `programCards`, `latestBerita`, `latestPraktikBaik`, `latestUptBercerita`, `sekolahSehatData`, `infografis`, `bukuPanduan`, `latestVideo`, `clients`, `stats`).
- **`const Ziggy = {...}`** — the route table: 154 named routes total, 49 of them public‑facing (the rest are `filament.*` / auth / admin).

Every internal URL in the nav tree (60 of them) was fetched live and checked for a non‑200 status. Every dropdown (desktop hover‑state, which on prod is **React state mounted on `mouseenter`**, not pure CSS `:hover` like the dev site — the panel doesn't even exist in the DOM until hovered) was forced open via a dispatched `mouseenter`/`mouseover` event and screenshotted against the `navItems` JSON. The mobile hamburger menu was opened and checked too. A sample of pages across every nav section was opened for real and read for content and console errors.

## Legend

| Symbol | Meaning |
|---|---|
| ✅ | Real internal page — loads, HTTP 200, content renders |
| 🔗 | External link (leaves the site) |
| ❌ | Broken — link target returns an error / not‑found |
| 💥 | Internal route that crashes at the front‑end (server returns 200, but the React page component is missing → blank white page + JS exception) |
| 🪧 | Published but the content is a placeholder / stub |
| ▾ | Menu‑label‑only — a dropdown header with no destination of its own (`url: null` in the nav data) |

## Notable issues

1. **💥 `/kontak` (the phone icon in the header, present on every page) is broken.** Identical failure mode to the dev site: HTTP 200, then `Uncaught (in promise) Error: Halaman tidak ditemukan: ./pages/Kontak/Index.tsx`, blank page. Same missing component, same bug, on the live public site.
2. **🪧 `/program/cek-kesehatan-gratis` is a raw placeholder.** Reachable from the header's Program menu (as a styled "button" nav item) *and* a homepage "Program Prioritas" link. Its entire body text is `"isi ckg dari paparan"` ("fill in CKG from the presentation slides") — a content note that was never replaced, live in production.
3. **🪧 `/mitra/pendaftaran-mitra` is also a raw placeholder.** Reachable from the header's Mitra menu. Its entire body text is `"Halaman Pendaftaran Mitra sedang dikembanggunakan."` (*"Partner Registration page is under development."*) — an admin's WIP note, shipped live.
4. **❌ The "Sekolah Sehat" nav item is broken as a direct link.** In the `navItems` data it's `type: "collapse"` *and* carries its own `url: "/sekolah-sehat"` — meaning it should work both as a dropdown trigger and as a clickable link to a hub page. But `/sekolah-sehat` itself 404s (a clean Laravel 404 page, not a JS crash). Only its children (`/sekolah-sehat/gerakan-sekolah-sehat`, `/sehat-bergizi`, etc.) work.
5. **The homepage's CKG card quietly routes around its own broken page.** The Program nav's "Cek Kesehatan Gratis" button goes to the placeholder stub (#2 above). But the *homepage's* "Program Prioritas" card for the same topic skips the internal site entirely and links straight to `https://drive.google.com/file/d/1KqGC4bZ-oDm8PimLmPpwK2Hro84WHEs1/view` — a Google Drive‑hosted PDF of an actual Kemenkes decree on CKG technical guidelines. It works, but it means the same topic has two different, inconsistent destinations depending on where you click from, and neither is a real landing page on the site itself.
6. **The OKY "Unduh Sekarang" button isn't a store link — it's an image.** It points to `/img/qr_oky_baru.jpeg`, a static 1160×1160 QR code. Clicking "Download Now" just opens a picture of a QR code in the browser instead of taking you to the Play/App Store (unlike the dev site, which links straight to the Play Store listing).
7. **"Stratifikasi UKS/M" leaves the site entirely.** In the header's UKS/M menu, this item's `url` is `https://stratifikasiuks.org/` — a completely separate external tool/domain, not a page on this site at all. (On dev, the equivalent item is a full internal page at `/stratifikasi-uks`.)
8. **The same 4 ministry logos are shown twice, inconsistently.** Government/agency logos appear once as clickable links (Kemendagri, Kemenag, Kemenkes — 3 of 4) mixed directly into the "Mitra Sekolah Sehat" partner‑logo grid, and *again* later in a separate "Dikembangkan oleh" ("Developed by") section as 4 plain `<img>` tags with no `<a>` wrapper at all — not even a broken link, just not clickable. Kemendikdasmen's own logo is only in the second, non‑clickable set.
9. **A redundant duplicate nav entry.** "TRIAS UKS/M :" appears as its own clickable item inside the UKS/M dropdown, but its `url` is identical to "Deskripsi Umum" directly above it (`/tentang-uks/deskripsi-umum`). It reads like a section‑divider label that got accidentally saved as a real, clickable menu item.
10. **Footnote — the bug in #1 isn't isolated to Kontak.** `/faq` exists in the route table but isn't linked from the nav or homepage anywhere. Out of curiosity it was checked anyway: same crash, `Halaman tidak ditemukan: ./pages/Faq/Index.tsx`. This suggests a small batch of page components (at least Kontak and Faq) never made it into the production build, not just one isolated miss.

Everything else — every other header‑nav destination (all 16 Trias‑pillar sub‑pages, the Sekolah Sehat sub‑pages, all 5 Gala Kreasi/SAIH pages, all Mitra/Informasi/Publikasi pages) — loaded cleanly with real content.

---

## 1. Header navigation tree

```mermaid
flowchart TD
    header(["Header (on every page)"])

    header --> beranda["✅ Beranda<br/>/"]
    header --> uksm["▾ UKS/M"]
    header --> program["▾ Program"]
    header --> mitra["▾ Mitra"]
    header --> informasi["▾ Informasi"]
    header --> publikasi["▾ Publikasi"]
    header --> tautan["▾ Tautan"]
    header --> search["✅ 🔍 search icon<br/>/pencarian"]
    header --> kontak["💥 Kontak (phone icon)<br/>/kontak<br/>(blank page — component missing)"]

    uksm --> deskripsi["✅ Deskripsi Umum<br/>/tentang-uks/deskripsi-umum"]
    uksm --> tujuan["✅ Tujuan<br/>/tentang-uks/tujuan"]
    uksm --> sasaran["✅ Sasaran<br/>/tentang-uks/sasaran"]
    uksm --> struktur["▾ Struktur Organisasi"]
    struktur --> timPembina["✅ Tim Pembina UKS/M<br/>/tentang-uks/struktur-organisasi-tim-pembina"]
    struktur --> timPelaksana["✅ Tim Pelaksana UKS/M di Sekolah/Madrasah<br/>/tentang-uks/struktur-organisasi-timpelaksana"]
    uksm --> stratifikasi["🔗 Stratifikasi UKS/M<br/>stratifikasiuks.org (leaves the site)"]
    uksm --> manajemen["✅ Manajemen UKS/M<br/>/program/manajemen-uks-m"]
    uksm --> triasLabel["✅ \"TRIAS UKS/M :\" (label)<br/>→ /tentang-uks/deskripsi-umum<br/>⚠️ duplicate of Deskripsi Umum above"]
    uksm --> pil1["▾ (1) Pendidikan Kesehatan"]
    pil1 --> p1a["✅ Literasi Kesehatan"]
    pil1 --> p1b["✅ Perilaku Hidup Bersih dan Sehat"]
    pil1 --> p1c["✅ Pendidikan Gizi"]
    pil1 --> p1d["✅ Pendidikan Kesehatan Reproduksi"]
    pil1 --> p1e["✅ Pendidikan Karakter"]
    pil1 --> p1f["✅ Pembiasaan Aktivitas Fisik"]
    pil1 --> p1g["✅ Dokter Kecil"]
    uksm --> pil2["▾ (2) Pelayanan Kesehatan"]
    pil2 --> p2a["✅ Penjaringan Kesehatan & Pemeriksaan Berkala"]
    pil2 --> p2b["✅ Imunisasi"]
    pil2 --> p2c["✅ Pemberian Obat Cacing"]
    pil2 --> p2d["✅ P3K dan P3P"]
    uksm --> pil3["▾ (3) Pembinaan Lingkungan Sekolah Sehat"]
    pil3 --> p3a["✅ Sanitasi Sekolah"]
    pil3 --> p3b["✅ Pembinaan Kantin Sehat"]
    pil3 --> p3c["✅ Pemanfaatan Pekarangan Sekolah"]
    pil3 --> p3d["✅ Pemberantasan Sarang Nyamuk"]
    pil3 --> p3e["✅ Kawasan Tanpa Rokok/NAPZA/Kekerasan/Pornografi"]
    uksm --> sekolahSehat["❌ Sekolah Sehat (header itself)<br/>/sekolah-sehat → 404"]
    sekolahSehat --> madrasahSehat["🔗 Gerakan Madrasah Sehat<br/>madrasah.kemenag.go.id"]
    sekolahSehat --> gss["✅ Gerakan Sekolah Sehat"]
    sekolahSehat --> ss1["✅ Sehat Bergizi"]
    sekolahSehat --> ss2["✅ Sehat Fisik"]
    sekolahSehat --> ss3["✅ Sehat Imunisasi"]
    sekolahSehat --> ss4["✅ Sehat Jiwa"]
    sekolahSehat --> ss5["✅ Sehat Lingkungan"]
    sekolahSehat --> ss6["✅ Bahan Advokasi GSS"]

    program --> g7kaih["▾ 7KAIH"]
    g7kaih --> cerdasBerkarakter["🔗 Cerdas Berkarakter<br/>cerdasberkarakter.kemendikdasmen.go.id"]
    g7kaih --> saih["▾ Lomba Semarak Anak Indonesia Hebat 2025"]
    saih --> saih1["✅ Informasi Umum"]
    saih --> saih2["✅ Pengumuman Pemenang 2025"]
    g7kaih --> gala24["▾ Gala Kreasi Video 2024"]
    gala24 --> g24a["✅ Mekanisme"]
    gala24 --> g24b["✅ Pengumuman Pemenang"]
    gala24 --> g24c["✅ Video Pemenang"]
    g7kaih --> gala23["✅ Gala Kreasi Video 2023"]
    g7kaih --> pb7kaih["✅ Praktik Baik 7KAIH<br/>(filtered Praktik Baik list)"]
    program --> gmbg["▾ MBG"]
    gmbg --> dasborMbg["🔗 Dasbor MBG<br/>mbg.pdm.kemendikdasmen.go.id"]
    gmbg --> bgn["🔗 Badan Gizi Nasional<br/>bgn.go.id"]
    gmbg --> pbMbg["✅ Praktik Baik MBG<br/>(filtered Praktik Baik list)"]
    program --> ckgBtn["🪧 Cek Kesehatan Gratis<br/>/program/cek-kesehatan-gratis<br/>(placeholder: \"isi ckg dari paparan\")"]

    mitra --> panduanKemitraan["✅ Panduan Kemitraan<br/>/mitra/panduan-kemitraan"]
    mitra --> pendaftaranMitra["🪧 Pendaftaran Mitra<br/>/mitra/pendaftaran-mitra<br/>(placeholder: \"sedang dikembangkan\")"]
    mitra --> mitraKami["✅ Mitra Kami<br/>/mitra/mitra-kami"]
    mitra --> aktivitasMitra["✅ Aktivitas Mitra<br/>/aktifitas-mitra"]
    mitra --> dukunganMitra["✅ Dukungan Mitra<br/>/mitra/dukungan-mitra"]

    informasi --> uptBercerita["✅ UPT Bercerita<br/>/informasi/upt-bercerita"]
    informasi --> berita["✅ Berita<br/>/halaman/berita"]
    informasi --> praktikBaik["✅ Praktik Baik<br/>/informasi/praktik-baik"]
    informasi --> agenda["✅ Agenda<br/>/informasi/agenda"]
    informasi --> aplikasi["✅ Aplikasi<br/>/informasi/aplikasi"]

    publikasi --> produkHukum["✅ Produk Hukum<br/>/dokumen/produk-hukum"]
    publikasi --> bukuPanduan["✅ Buku Panduan<br/>/dokumen/publikasi/buku-panduan"]
    publikasi --> infografis["✅ Infografis<br/>/dokumen/publikasi/infografis"]
    publikasi --> video["✅ Video<br/>/dokumen/publikasi/video"]

    tautan --> kemenkesGrp["▾ Kemenkes"]
    kemenkesGrp --> kk1["🔗 Kementerian Kesehatan"]
    kemenkesGrp --> kk2["🔗 Ayo Sehat Kemenkes"]
    kemenkesGrp --> kk3["🔗 Perangkat Ajar Kesehatan"]
    tautan --> kdmGrp["▾ Kemendikdasmen"]
    kdmGrp --> kdm1["🔗 Ditjen PAUDDIKDASMEN"]
    kdmGrp --> kdm2["🔗 Direktorat PAUD"]
    kdmGrp --> kdm3["🔗 Direktorat SD"]
    kdmGrp --> kdm4["🔗 Direktorat SMP"]
    kdmGrp --> kdm5["🔗 Direktorat SMA"]
    tautan --> kemenagGrp["▾ Kemenag"]
    kemenagGrp --> ka1["🔗 Direktorat KSKK"]
    kemenagGrp --> ka2["🔗 Direktorat Pesantren"]
    tautan --> kemendagriGrp["▾ Kemendagri"]
    kemendagriGrp --> kdg1["🔗 Direktorat SUPD"]

    classDef broken fill:#ffe0e0,stroke:#c0392b,stroke-width:2px,color:#7b241c;
    classDef stub fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#7a5c00;
    classDef ext fill:#eef3ff,stroke:#5470c4,color:#26418f;
    classDef label fill:#f4f4f4,stroke:#999,color:#555;

    class kontak,sekolahSehat broken;
    class ckgBtn,pendaftaranMitra stub;
    class stratifikasi,madrasahSehat,cerdasBerkarakter,dasborMbg,bgn,kk1,kk2,kk3,kdm1,kdm2,kdm3,kdm4,kdm5,ka1,ka2,kdg1 ext;
    class uksm,program,mitra,informasi,publikasi,tautan,struktur,pil1,pil2,pil3,g7kaih,saih,gala24,gmbg,kemenkesGrp,kdmGrp,kemenagGrp,kemendagriGrp label;
```

---

## 2. Homepage sections → destinations

Node IDs match diagram 1 where the destination is the *same page*, to show convergence between "reachable from the header nav" and "reachable from a homepage section."

```mermaid
flowchart TD
    home(["Homepage /"])

    home --> hdr["Header row"]
    hdr --> search2["✅ 🔍 search icon → /pencarian"]
    hdr --> kontak["💥 Kontak → /kontak (blank page)"]

    home --> hero["Hero carousel (4 slides)"]
    hero -. "no judul, no deskripsi, link_url is null on all 4" .-> heroNote["⚠️ purely decorative, no CTA at all"]

    home --> trias["\"TRIAS UKS/M\" section (3 cards)"]
    trias --> progPendidikan["✅ Pendidikan Kesehatan<br/>/program/pendidikan-kesehatan"]
    trias --> progPelayanan["✅ Pelayanan Kesehatan<br/>/program/pelayanan-kesehatan"]
    trias --> progLingkungan["✅ Pembinaan Lingkungan Sekolah Sehat<br/>/program/pembinaan-lingkungan-sekolah-sehat"]

    home --> progPrioritas["\"Program Prioritas\" section (3 links)"]
    progPrioritas --> extCerdas["🔗 7 Kebiasaan Anak Indonesia Hebat (7KAIH)<br/>cerdasberkarakter.kemendikdasmen.go.id"]
    progPrioritas --> extDasbor["🔗 Makan Bergizi Gratis (MBG)<br/>mbg.pdm.kemendikdasmen.go.id"]
    progPrioritas --> ckgDrive["🔗 Cek Kesehatan Gratis (CKG) Sekolah<br/>→ Google Drive PDF (Kemenkes decree)<br/>⚠️ bypasses the site's own (broken) CKG page"]

    home --> beritaSection["\"Berita Terupdate\" section (4 cards)"]
    beritaSection --> beritaDetail["✅ 4× article detail pages<br/>/halaman/berita/{slug}"]
    beritaSection --> berita["✅ \"Semua Berita\" → /halaman/berita"]

    home --> pbSection["\"Praktik Baik Terupdate\" section (4 cards)"]
    pbSection --> pbDetail["✅ 4× write-up pages<br/>/informasi/praktik-baik/{slug}"]
    pbSection --> praktikBaik["✅ \"Semua Praktik Baik\" → /informasi/praktik-baik"]

    home --> uptSection["\"UPT Bercerita\" section (4 cards)"]
    uptSection --> uptDetail["✅ 4× story pages<br/>/informasi/upt-bercerita/{slug}"]
    uptSection --> uptBercerita["✅ \"Semua UPT Bercerita\" → /informasi/upt-bercerita"]

    home --> sekolahSehatSection["\"Sekolah Sehat\" hub section<br/>(tabbed: Sehat Bergizi/Fisik/Imunisasi/Jiwa/Lingkungan)"]
    sekolahSehatSection --> gss["✅ \"Selengkapnya\" → /sekolah-sehat/gerakan-sekolah-sehat"]

    home --> mitraLogos["\"Mitra Sekolah Sehat\" partner-logo grid<br/>(~21 logos incl. 3 ministries)"]
    mitraLogos --> clientLinks["🔗 partner + 3 ministry websites"]
    mitraLogos --> mitraSekolahSehat["✅ \"Selengkapnya\" → /sekolah-sehat/mitra-sekolah-sehat"]

    home --> videoSection["\"Video Sekolah Sehat\" section (3 videos)"]
    videoSection --> videoDeco["⚠️ no visible links found on video cards themselves"]

    home --> infografisSection["\"Infografis\" section (4 posters)"]
    infografisSection --> infografisViewer["🪟 \"Perbesar\" → in-page viewer"]
    infografisSection --> infografis["✅ \"Semua Infografis\" → /dokumen/publikasi/infografis"]

    home --> bukuSection["\"Buku Panduan\" section (4 PDFs)"]
    bukuSection --> bukuActions["🪟 \"Lihat\"/\"Unduh\" → viewer / file download"]
    bukuSection --> bukuPanduan["✅ \"Semua Buku Panduan\" → /dokumen/publikasi/buku-panduan"]

    home --> aplikasiSection["\"Aplikasi Terkait UKS/M\" section (OKY only)"]
    aplikasiSection --> okyImg["🔗⚠️ \"Unduh Sekarang\" → /img/qr_oky_baru.jpeg<br/>(a QR-code image, not a store link)"]

    home --> dikembangkan["\"Dikembangkan oleh\" section (4 logos)"]
    dikembangkan --> dikembangkanNote["⚠️ plain &lt;img&gt;, no links at all<br/>(same 4 ministries as the Mitra grid above,<br/>shown again with zero interactivity)"]

    home --> footer["Footer"]
    footer --> footerLinks["🔗 pauddikdasmen.kemdikbud.go.id<br/>🔗 uks.kemendikdasmen.go.id (self)<br/>🔗 mailto:uks.dikdasmen@kemdikbud.go.id"]
    footer --> stats["📊 Live visitor-count widget<br/>(Hari Ini / Minggu Ini / Bulan Ini / Total)"]

    classDef broken fill:#ffe0e0,stroke:#c0392b,stroke-width:2px,color:#7b241c;
    classDef ext fill:#eef3ff,stroke:#5470c4,color:#26418f;
    classDef modal fill:#fff6da,stroke:#b8860b,color:#7a5c00;
    classDef warn fill:#fff6da,stroke:#b8860b,color:#7a5c00;

    class kontak broken;
    class search2,extCerdas,extDasbor,ckgDrive,clientLinks,okyImg,footerLinks ext;
    class infografisViewer,bukuActions modal;
    class heroNote,videoDeco,dikembangkanNote,okyImg warn;
```

---

## 3. What each page shows

### Homepage

| Page | What's on it |
|---|---|
| `/` — **Beranda** | Header (logo, search icon, 💥 Kontak/phone) → hero carousel (4 purely decorative slides) → **TRIAS UKS/M** 3 pillar cards → **Program Prioritas** (3 links, 2 external + 1 to a Google Drive PDF) → **Berita Terupdate** (4) → **Praktik Baik Terupdate** (4) → **UPT Bercerita** (4) → **Sekolah Sehat** tabbed hub (5 foci) → **Mitra Sekolah Sehat** logo grid (~21) → **Video Sekolah Sehat** (3) → **Infografis** (4) → **Buku Panduan** (4) → **Aplikasi Terkait UKS/M** (OKY only, QR-image "download") → **Dikembangkan oleh** (4 non-clickable ministry logos) → footer (contact, live visitor-count widget) |

### UKS/M

| Page | What's on it |
|---|---|
| `/tentang-uks/deskripsi-umum` | UKS/M's general description and the Trias UKS/M framework (3 pillars, summarized) |
| `/tentang-uks/tujuan` | UKS/M's stated goals — improving learning outcomes via PHBS and a healthy school environment |
| `/tentang-uks/sasaran` | Target beneficiaries of UKS/M |
| `/tentang-uks/struktur-organisasi-tim-pembina` | Explains Tim Pembina UKS/M (the coordinating body across Pusat/Provinsi/Kab-Kota/Kecamatan) |
| `/tentang-uks/struktur-organisasi-timpelaksana` | Explains Tim Pelaksana UKS/M di Sekolah/Madrasah (the school-level implementing team) |
| `/program/manajemen-uks-m` | The 5 components of Sekolah/Madrasah Sehat management: Kebijakan, Perencanaan & Penganggaran, Kegiatan Prioritas, SDM & Sasaran, Sumber Anggaran |
| `/program/literasi-kesehatan` … 6 more | 7 individual sub-program pages under Pendidikan Kesehatan (Literasi Kesehatan, PHBS, Pendidikan Gizi, Pendidikan Kesehatan Reproduksi, Pendidikan Karakter, Pembiasaan Aktivitas Fisik, Dokter Kecil) — each a focused explainer article |
| `/program/penjaringan-kesehatan-dan-pemeriksaan-berkala` … 3 more | 4 sub-program pages under Pelayanan Kesehatan (screening, Imunisasi, Pemberian Obat Cacing, P3K dan P3P) |
| `/program/sanitasi-sekolah` … 4 more | 5 sub-program pages under Pembinaan Lingkungan Sekolah Sehat (Sanitasi, Kantin Sehat, Pekarangan Sekolah, Pemberantasan Sarang Nyamuk, Kawasan Tanpa Rokok/NAPZA) |
| `/sekolah-sehat/gerakan-sekolah-sehat` | Explains the "Gerakan Sekolah Sehat" campaign and its 5 foci (Sehat Bergizi/Fisik/Imunisasi/Jiwa/Lingkungan) |
| `/sekolah-sehat/sehat-bergizi` … 4 more | 5 individual explainer pages, one per "Sehat" focus area |
| `/sekolah-sehat/bahan-advokasi` | Advocacy materials for the Gerakan Sekolah Sehat campaign |

### Program

| Page | What's on it |
|---|---|
| `/gala-kreasi/informasi-lomba-saih-2025` | General info for the "Lomba Semarak Anak Indonesia Hebat 2025" video competition |
| `/gala-kreasi/pengumuman-pemenang-2025` | Winner announcements for the 2025 competition |
| `/gala-kreasi/gala-kreasi-2024` | Mechanism/rules for the 2024 Gala Kreasi Video competition |
| `/gala-kreasi/gala-kreasi-2024-pemenang` | 2024 winner announcements |
| `/gala-kreasi/gala-kreasi-2024-video-pemenang` | 2024 winning videos |
| `/gala-kreasi/gala-kreasi-2023` | The 2023 Gala Kreasi Video Gerakan Sekolah Sehat competition ("Sekolah Sehat, Generasi Hebat") |
| `/informasi/praktik-baik?kategori=15/16` | Praktik Baik list pre-filtered to the 7KAIH or MBG category |
| `/program/cek-kesehatan-gratis` | 🪧 Nothing but the placeholder text "isi ckg dari paparan" |

### Mitra

| Page | What's on it |
|---|---|
| `/mitra/panduan-kemitraan` | Bentuk Kerja Sama — the same partnership-guide content as dev's `/mitra/panduan-kemitraan` |
| `/mitra/pendaftaran-mitra` | 🪧 Nothing but "Halaman Pendaftaran Mitra sedang dikembangkan." |
| `/mitra/mitra-kami` | Partner directory (same structure as dev: grouped by year) |
| `/aktifitas-mitra` | Filterable feed of partner collaboration news |
| `/mitra/dukungan-mitra` | Table of concrete partner contributions by name/period/form |
| `/sekolah-sehat/mitra-sekolah-sehat` | "Bentuk Kerja Sama" for Sekolah Sehat specifically — sarana/prasarana, capacity-building, etc. (a near-duplicate of `/mitra/panduan-kemitraan`'s content, under the Sekolah Sehat hub instead of Mitra) |

### Informasi

| Page | What's on it |
|---|---|
| `/halaman/berita` | News list, same format as dev |
| `/informasi/praktik-baik` | Good-practice stories list, filterable |
| `/informasi/upt-bercerita` | Regional-unit storytelling feed |
| `/informasi/agenda` | Event listing |
| `/informasi/aplikasi` | App directory: **SIJIWA** + **Oky Period Tracker**, same two apps as dev |

### Publikasi

| Page | What's on it |
|---|---|
| `/dokumen/produk-hukum` | Legal/regulatory document library |
| `/dokumen/publikasi/buku-panduan` | Downloadable PDF guide library |
| `/dokumen/publikasi/infografis` | Poster/infographic gallery |
| `/dokumen/publikasi/video` | YouTube video library |

### Tautan

All four sub-groups (Kemenkes, Kemendikdasmen, Kemenag, Kemendagri) are pure external-link lists, identical in content to the dev site.

### Search / Contact

| Page | What's on it |
|---|---|
| `/pencarian` | Search page |
| `/kontak` | 💥 **Nothing — blank page.** See Notable issue #1. |
| `/faq` | 💥 **Nothing — blank page.** Not linked anywhere, found only by checking the Ziggy route table. Same crash as Kontak. |

### Homepage-only destinations (not in any nav menu)

| Page | What's on it |
|---|---|
| `/program/pendidikan-kesehatan` | Long-form pillar overview (reached only via the homepage TRIAS UKS/M card) |
| `/program/pelayanan-kesehatan` | Long-form pillar overview |
| `/program/pembinaan-lingkungan-sekolah-sehat` | Long-form pillar overview |
