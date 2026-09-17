# Implementation plan — pages and sections missing from DEV

**Scope:** the 15 items in [`curation-vs-dev-sitemap.md` §A](./curation-vs-dev-sitemap.md#a-missing-entirely--in-dev-nothing-here), all absent from this project.
**Reference:** [`sitemap-dev-uks.MD`](./sitemap-dev-uks.MD) (`portal-uks.demo.or.id`)
**Out of scope:** §B (thin sections), §C (extras to keep/cut), §D1 (adding a router). Each needs its own call.

---

## 0. Before starting

### Decision gate

11 of the 15 items exist on **both** DEV and PROD, so they're needed whichever site ends up as the reference. 4 exist **only on DEV** and depend on the open DEV-vs-PROD question (see curation doc §E):

| Needed either way (build now) | DEV-only (wait for the decision) |
|---|---|
| A1 Tautan · A2 Pencarian · A5 Aktivitas Mitra · A6 Dukungan Mitra · A7 UPT Bercerita · A8 Aplikasi · A9 Home Aplikasi · A11 Home Video · A13 Home Mitra logos · A14 Berita detail · A15 Footer contact | A3 ASRI · A4 Tentang Mitra UKS/M · A10 Home Tautan Terkait · A12 Home Stratifikasi |

The phases below put the DEV-only items last (Phase 4).

### Content sourcing

The sitemap describes each page but **doesn't hold its copy**. Every item below needs real text, links and images pulled from `portal-uks.demo.or.id`. Where this plan gives example content, it's quoted from the sitemap. Anything else is marked `TODO(content)`. Don't fill gaps with invented figures or orgs. The project already has unverified numbers (Metrik Nasional), so don't add more.

Every file and data field needed, with the **exact filename** to save each asset under, is in the [Content & asset manifest](#content--asset-manifest) at the end.

### Don't copy DEV's bugs

Three dev issues touch items in this plan. Build the fixed version:

| Dev issue | Affects | Do this instead |
|---|---|---|
| #3 footer `href=" https://…"` (leading space) | A15 | trimmed URL |
| #4 partner logos served from the prod asset host | A13 | download into `public/`, reference locally |
| #6 breadcrumb "UK/M" on `/mitra-uks` | A4 | "UKS/M" |

**Correction (2026-09-17):** the sitemap's issue #5 is **not a bug**. `com.telkom.tracencare` is the Play Store listing for **SATUSEHAT Mobile**: PeduliLindungi was renamed to SATUSEHAT Mobile, and the package id stayed the same. The listing title was checked live on 2026-09-17. Dev's SATUSEHAT link is correct, so use it as-is.

---

## 1. How to add things in this codebase

No router. Everything hangs off three patterns; new work should follow them rather than invent new ones.

**Views** — `App.jsx` renders one view per `currentView` string. A new view needs: a key in `pageNavigationConfigs` (`src/data/portalData.js`), a branch in the view switcher in `App.jsx`, and a way to reach it (`onNavigateView(key, sectionId?)`).

**Lobby tabs** — `MitraView`, `InformasiView`, `PublikasiView`, `ProgramView` build their tabs from `pageNavigationConfigs.<view>.sections` and pick a panel from a `<view>Panels` map keyed by section id. Adding a tab = one entry in `sections` + one component in the panels map. `EdgeDrawer` and the scroll-spy read the same `sections` array, so they update for free.

**Homepage sections** — `BerandaView` stacks sections wrapped in `id="sec-home-*"`. Add the id to `pageNavigationConfigs.beranda.sections` too so scroll-spy sees it.

### File-size constraints

| File | Now | After this plan (est.) | Action |
|---|---|---|---|
| `src/data/portalData.js` | 631 lines | ~1,000+ | **Split first** (Phase 0) |
| `src/components/MitraView.jsx` | 264 | ~450 | Move panels to `src/components/mitra/` |
| `src/components/InformasiView.jsx` | 228 | ~400 | Move panels to `src/components/informasi/` |
| `src/components/Navbar.jsx` | 329 | ~430 | Extract `NavTautanDropdown.jsx` |

---

## Phase 0 — Groundwork (no visible change)

**0.1 Split `portalData.js`** by domain, keep `portalData.js` as a re-export barrel so existing imports don't break:

```text
src/data/
  portalData.js        ← re-exports everything below
  navigation.js        ← pageNavigationConfigs
  uksm.js              ← trias, strata, gss
  program.js
  mitra.js
  informasi.js
  publikasi.js
  site.js              ← NEW: contactInfo, tautanGroups, ministryLinks, appsList
```

**0.2 Hoist local data** that new sections need to share:
- `videoList` from `PublikasiView.jsx:6` → `publikasi.js` (A11 reuses it)
- `nationalAgendas` from `InformasiView.jsx:6` → `informasi.js` (consistency)

**0.3 One contact source.** The two existing email addresses disagree:

| Source | Email |
|---|---|
| DEV footer | `uks.dikdasmen@kemdikbud.go.id` |
| `KontakView.jsx:72` | `uks@kemendikdasmen.go.id` |

Create `contactInfo` in `site.js` and point both `KontakView` and the new footer (A15) at it. **`TODO(decision)`: which address is current.**

**0.4 `SafeImage` component.** Data entries will point at manifest paths before the files exist. Add `src/components/SafeImage.jsx`: an `<img>` that falls back on `onError` to a neutral placeholder (logos show the name as text, photos show a tinted block). In dev (`import.meta.env.DEV`) the placeholder also prints the expected path. That way a misnamed file is obvious straight away, and work doesn't wait on assets.

**Done when:** `npm run build` passes, the app renders identically, neither `videoList` nor `nationalAgendas` is declared inside `src/components/`, and a `SafeImage` with a bad `src` shows the expected path in dev.

---

## Phase 1 — Site-wide chrome

### A1 · Tautan menu

**Dev:** 7th nav item, 4 dropdown groups, 11 external links. Desktop: hover dropdown with nested flyouts. Mobile: in the hamburger menu.

**Data** (`site.js` → `tautanGroups`):

| Group | Label | URL |
|---|---|---|
| Kemenkes | Kementerian Kesehatan | `https://kemkes.go.id` |
| | Ayo Sehat Kemenkes | `https://ayosehat.kemkes.go.id` |
| | Perangkat Ajar Kesehatan | `https://ayosehat.kemkes.go.id/perangkat-ajar-kesehatan` |
| Kemendikdasmen | Ditjen PAUDDIKDASMEN | `https://pdm.kemendikdasmen.go.id` |
| | Direktorat PAUD | `https://paudpedia.kemendikdasmen.go.id` |
| | Direktorat SD | `https://ditsd.kemendikdasmen.go.id` |
| | Direktorat SMP | `https://ditsmp.kemendikdasmen.go.id` |
| | Direktorat SMA | `https://sma.kemendikdasmen.go.id` |
| Kemenag | Direktorat KSKK | `https://pendis.kemenag.go.id/ditkskkmadrasah` |
| | Direktorat Pesantren | `https://pendis.kemenag.go.id/ditpdpontren` |
| Kemendagri | Direktorat SUPD | `https://bangda.kemendagri.go.id` |

Protocol and `www.` aren't recorded in the sitemap — confirm each URL resolves before shipping.

**Build:**
- New `src/components/NavTautanDropdown.jsx`. Reuse the existing `nav-item-has-dropdown` + `openMenu` pattern from the UKS/M dropdown (`openMenu === 'tautan'`).
- 4 group columns in one panel beat nested flyouts: no hover-path problems and nothing to redo for touch.
- Mobile: add a `nav-mobile-group-header` "Tautan" + 4 collapsible groups in `Navbar.jsx`'s mobile list.
- All links: `target="_blank" rel="noopener noreferrer"` + an external-link icon.

**Watch:** the pill navbar is already full at desktop width. Check 1025–1280px after adding Tautan **and** the A2 search icon. If it overflows, the likely fix is shortening "UKS/M (3 Pilar)" to dev's plain "UKS/M".

**Done when:** all 11 links open in a new tab and resolve; the dropdown works by hover and by keyboard (Tab/Enter/Esc); the mobile menu shows all 4 groups; no horizontal overflow at 1025px.

---

### A2 · Pencarian (search)

**Dev:** 🔍 icon in the header on every page → `/pencarian`, with a search box, empty state "Mulai Pencarian — ketik kata kunci…", and 4 suggestion chips: *Kesehatan Siswa, UKS Mandiri, Gizi Sekolah, Cuci Tangan*.

**Build:**
- **Icon:** `.nav-search-btn` already exists in `index.css:260` but nothing uses it. Add the button to the navbar's right controls and to the mobile menu.
- **View:** new `search` view → `src/components/SearchView.jsx`, registered in `pageNavigationConfigs` and `App.jsx`.
- **Index:** there's no backend, so search client-side. Build a flat index once (`useMemo`) from the data modules: news, books, programs, trias indicators, strata, praktik baik, agenda, regulations, videos, plus A5–A8 data as it lands. Each entry: `{ title, excerpt, typeLabel, viewKey, sectionId }`.
- **Matching:** case-insensitive and accent-insensitive (`normalize('NFD')`) match on title + excerpt. Group results by type. No library needed at this data size.
- **States:** empty (dev copy + 4 chips, which fill the query when clicked) · results · no results.
- **Result click** → `onNavigateView(viewKey, sectionId)`.

**Done when:** each of the 4 chips returns at least 1 result; "gizi" finds both news and books; a result click lands on the right view and section; Esc/back clears.

---

### A15 · Footer contact block

**Dev footer:** address, email, phone, official website link.

**Build:** add a contact column to `Footer.jsx` from `contactInfo` (Phase 0.3): address, `mailto:` email, `tel:` phone, and the website link, **trimmed** (dev bug #3). Keep the existing "Peta Navigasi" column.

**Done when:** email and phone links are clickable; the footer and Kontak page show the same values from the same constant; the grid still stacks cleanly at 375px.

---

## Phase 2 — Mitra and Informasi sub-pages

### A5 · Aktivitas Mitra

**Dev `/aktifitas-mitra`:** filterable, sortable feed of partner collaboration news. Example: *"Kemendikbudristek RI, WVI, dan Sun Life Indonesia Kolaborasi…"*

**Build:**
- New tab `sec-mitra-aktivitas` in `pageNavigationConfigs.mitra.sections`, panel `src/components/mitra/AktivitasPanel.jsx`.
- Data `mitraActivities` in `mitra.js`: `{ id, title, partner, date, excerpt, image }`. `TODO(content)`: real entries.
- Filter by partner + sort newest/oldest, reusing the `subnav-pill` buttons that the Berita filter already uses.

**Done when:** filter and sort both work and combine; the empty-filter state shows a message instead of a blank.

### A6 · Dukungan Mitra

**Dev `/mitra/dukungan-mitra`:** table with columns **Nama Mitra / Periode / Bentuk Dukungan**. Example: *UNICEF Nutrition Section, Mar–Nov 2025*.

**Build:**
- Tab `sec-mitra-dukungan`, panel `mitra/DukunganPanel.jsx`.
- Data `mitraSupport` in `mitra.js`: `{ partner, period, support }`. `TODO(content)`.
- A real `<table>` on desktop; below 640px, render each row as a stacked card so nothing needs horizontal scroll.

**Done when:** the table has a `<caption>` and `<th scope="col">`; no horizontal scroll at 375px.

### A7 · UPT Bercerita

**Dev `/informasi/upt-bercerita`:** storytelling feed from regional units (UPT), filterable by category **7KAIH / CKG / MBG / UKS**. Examples: MBG rollout stories from *Tanjungpinang, Pangandaran, Jakarta Selatan*.

**Build:**
- Tab `sec-info-upt` in `pageNavigationConfigs.informasi.sections`, panel `informasi/UptBerceritaPanel.jsx`.
- Data `uptStories` in `informasi.js`: `{ id, title, region, category, date, excerpt, image }`. `TODO(content)`.
- Category pills, same pattern as Berita.
- Tab order: match dev → Berita, Praktik Baik, **UPT Bercerita**, Agenda, **Aplikasi**.

**Done when:** all 4 categories filter correctly; the region shows on every card.

### A8 · Aplikasi

**Dev `/informasi/aplikasi`:** app directory with 2 entries:

| App | Publisher | Link |
|---|---|---|
| SIJIWA (mental-health information system) | Garuda Teknologi Indonesia | `TODO(content)` |
| Oky Period Tracker | UNICEF | Play Store `com.oky.id` |

**Build:**
- Tab `sec-info-aplikasi`, panel `informasi/AplikasiPanel.jsx`.
- Data `appsList` in `site.js`: `{ id, name, publisher, description, icon, links: [{ store, url }] }`. A9 shares it.
- Link straight to the store listing. Not a QR image (that's the prod bug).

**Done when:** each card has name, publisher, description and a working store link.

### A14 · Berita detail pages

**Dev:** `/halaman/berita/{slug}`. Reached from the 4 homepage news cards and the hero's "Pelajari Selengkapnya" button. Today the project opens a modal (`InformasiView.jsx:86`).

**Build (without a router):**
- New view `berita-detail` → `src/components/BeritaDetailView.jsx`.
- App state: `selectedArticleId`. Reuse `handleNavigateView`'s second argument, or add a third `params` argument. Pick one and use it everywhere.
- Extend `realNewsList` with `slug` and `body` (array of paragraphs). `TODO(content)`.
- Breadcrumb: `App.jsx` only renders 2 levels (`Beranda / title`). Extend it to `Beranda / Informasi / Berita / {title}` with each level clickable.
- Entry points: Informasi news cards (replace the modal), homepage news cards, hero slides.
- Bottom: "Berita Lainnya" (3 other articles) + back to list.

**Done when:** all 3 entry points open the right article; the breadcrumb goes back correctly; the modal code is removed, not left dead.

**Note:** without URLs, browser back won't return from an article. That's D1 (no router), deliberately out of scope here.

---

## Phase 3 — Homepage sections

Dev homepage order, with this plan's items in **bold**:

> Hero → Trias → *(A12 Stratifikasi)* → Berita → Program Prioritas → Modul → Infografis → **A11 Video** → *(A10 Tautan Terkait)* → **A9 Aplikasi** → **A13 Mitra** → Footer

The project's current order differs (it has Stats and GSS sections, and no Stratifikasi). Place new sections in dev's relative order; reordering existing sections is a §C decision.

### A11 · Home Video

**Dev:** 4 latest video cards → YouTube, plus "Temukan Video Lainnya" → Video library.

**Build:**
- `src/components/HomeVideo.jsx`, wrapped in `id="sec-home-video"`.
- Read the first 4 of `videoList` (hoisted in Phase 0.2). Today it has **3** entries with no YouTube URLs (§B7), so add a `youtubeUrl` field and a 4th entry. `TODO(content)`.
- Cards open YouTube in a new tab. The CTA → `onNavigateView('publikasi', 'sec-pub-video')`.

**Done when:** 4 cards, each opening a real YouTube URL; the CTA lands on the Video tab.

### A9 · Home Aplikasi

**Dev:** OKY → Play Store `com.oky.id`; SATUSEHAT → Play Store `com.telkom.tracencare` (correct, see the correction above).

**Build:**
- `src/components/HomeAplikasi.jsx`, `id="sec-home-aplikasi"`, reading `appsList` from A8.

**Content conflict:** dev's app page (A8) lists **SIJIWA + Oky**, but dev's homepage lists **OKY + SATUSEHAT**. Recommend one list, with a `featuredOnHome: true` flag per entry. `TODO(decision)`: is SATUSEHAT in the list at all? If yes, its package is `com.telkom.tracencare`.

**Done when:** every store link opens the correct app listing.

### A13 · Home Mitra logo grid

**Dev:** "Mitra UKS", ~20 partner logos, clickable. Several partners have no URL.

**Today:** `Infografis.jsx` shows a two-row marquee of `defaultScreenshots` with `alt="Partner N"`. Those are UI screenshots, not partner logos.

**Build:**
- `src/components/HomeMitraGrid.jsx`, `id="sec-home-mitra"`.
- Data `partnerLogos` in `mitra.js`: `{ name, logo, url | null }`.
- Assets: local files in `public/Aset UKS/mitra/`, **not** hot-linked (bug #4). Filenames are in the manifest.
- `url === null` → render `<div>`, not a dead `<a>`.
- `alt` = partner name.
- Remove the screenshot marquee from `Infografis.jsx`. Its only job was standing in for this.
- "Lihat Semua Mitra" → `onNavigateView('mitra', 'sec-mitra-katalog')`.

**Done when:** the logos are real, local, and named in `alt`; logos without a URL aren't focusable links; the marquee is gone.

---

## Phase 4 — DEV-only items (⏸ wait for the DEV-vs-PROD decision)

Specced so they're ready to go. Don't start these until the decision is made.

### A3 · ASRI

**Dev `/asri`:** Gerakan Sekolah ASRI — *Aman, Sehat, Resik, Indah* — a campaign for school environments. Dev-only; prod has no ASRI anywhere.

**Build:** add to `priorityProgramsList` with `id: 'sec-prog-asri'` and a matching `pageNavigationConfigs.program.sections` entry. `ProgramView` merges `priorityProgramsList` automatically (`ProgramView.jsx:72`). The sitemap only has a one-line summary, so the whole body is `TODO(content)`.

### A4 · Tentang Mitra UKS/M

**Dev `/mitra-uks`:** bidang usaha mitra (partner industry sectors), bentuk dukungan mitra (support types), partnership overview. It's the **first** item in dev's Mitra menu.

**Build:** panel `mitra/TentangPanel.jsx`, tab `sec-mitra-tentang` placed **first** in `sections`. That makes it the default Mitra tab, because `MitraView` defaults to `mitraTabs[0]`. Heading/breadcrumb reads **UKS/M** (bug #6). `TODO(content)`.

### A12 · Home Stratifikasi section — ✅ done 2026-09-17 (`HomeStratifikasi.jsx`)

**Dev:** 4 strata boxes (Minimal → Standar → Optimal → Paripurna) + "Lihat Detail".

**Build:** `src/components/HomeStratifikasi.jsx`, `id="sec-home-stratifikasi"`, placed right after Trias. The data already exists (`strataLevels`), so this is layout only. "Lihat Detail" → `onNavigateView('uksm-stratifikasi')`. Stratifikasi now has its own page (UKS/M ▸ 3. Stratifikasi UKS/M), matching dev's `/stratifikasi-uks`.

### A10 · Home Tautan Terkait

**Dev:** 4 ministry logos → `kemendagri.go.id`, `kemenag.go.id`, `kemkes.go.id`, `kemendikdasmen.go.id`.

**Build:** `src/components/HomeTautanTerkait.jsx`, `id="sec-home-tautan"`, data `ministryLinks` in `site.js`. There are no ministry logo files in `public/` yet. Filenames are in the manifest.

---

## Summary

| Phase | Items | Size | Blocked on |
|---|---|---|---|
| 0 Groundwork | data split, hoist, `contactInfo` | S | email decision (0.3) |
| 1 Chrome | A1 Tautan, A2 Pencarian, A15 Footer | M | — |
| 2 Sub-pages | A5, A6, A7, A8, A14 | L | content |
| 3 Homepage | A11, A9, A13 | M | content, logos, SATUSEHAT decision |
| 4 DEV-only | A3, A4, A12, A10 | M | **DEV-vs-PROD decision** + content |

A12 is the only item that needs no new content: `strataLevels` already exists, so it's layout only once unblocked.

### Open items

| # | Type | Question |
|---|---|---|
| 1 | decision | DEV or PROD as the reference? Unblocks Phase 4. |
| 2 | decision | Which contact email is current? (0.3) |
| 3 | decision | Is SATUSEHAT on the app list? Its package is `com.telkom.tracencare`. (A9) |
| 4 | content | Text and data for A1, A3–A8, A10, A11, A13–A15. See [manifest → Text and data](#text-and-data) |
| 5 | assets | ~45 files. See [manifest → Files](#files) |

---

## Content & asset manifest

The checklist of everything that has to come from `portal-uks.demo.or.id` or the team. Filenames are fixed here: save each file under exactly this name and the code will pick it up.

### Naming rules

1. **Root:** `public/Aset UKS/` (the existing asset folder, which the code already uses). New files go into the subfolders below, never loose in the root.
2. **Lowercase kebab-case, ASCII only, no spaces.** `save-the-children.svg`, not `Save The Children.SVG`.
3. **Named things use their slug.** A partner or ministry file is named after it: `unicef.svg`, `kemenkes.svg`.
4. **List items use a 2-digit number** that matches the data entry's `id`: `aktivitas-mitra-03.jpg` ↔ `id: 3`.
5. **Lowercase extension, in the format listed.** If you only have a PNG where an SVG is listed, save it as `.png` and change the extension in the data file. Don't rename the format.
6. **Existing files stay put.** The files already in the `Aset UKS/` root (`beritagambar1.png`, `bertaigambar2.png`, …) are referenced by current code. Renaming them is a separate cleanup.

### Formats

| Kind | Format | Minimum size |
|---|---|---|
| Logo (partner, ministry) | SVG; else PNG with transparent background | 400px wide |
| App icon | PNG, square | 512 × 512 |
| Photo (card, article) | JPG | 1600 × 900 (16:9) |

### Folder map

```text
public/Aset UKS/
  kementerian/       A10 (A1 may reuse)
  mitra/             A13
  aktivitas-mitra/   A5
  upt-bercerita/     A7
  aplikasi/          A8, A9
  berita/            A14
  program/           A3
```

### Files

| ☐ | Item | Path under `public/Aset UKS/` | Source / note |
|---|---|---|---|
| ☐ | A10 | `kementerian/kemendikdasmen.svg` | official logo |
| ☐ | A10 | `kementerian/kemenkes.svg` | official logo |
| ☐ | A10 | `kementerian/kemenag.svg` | official logo |
| ☐ | A10 | `kementerian/kemendagri.svg` | official logo |
| ☐ | A13 | `mitra/unicef.svg` | named in dev Mitra 2025 |
| ☐ | A13 | `mitra/save-the-children.svg` | named in dev Mitra 2025 |
| ☐ | A13 | `mitra/aia.svg` | named in dev Mitra 2025 |
| ☐ | A13 | `mitra/kao.svg` | named in dev Mitra 2025 |
| ☐ | A13 | `mitra/danone.svg` | named in dev Mitra 2025 |
| ☐ | A13 | `mitra/bgn.svg` | Badan Gizi Nasional, dev Mitra 2025 |
| ☐ | A13 | `mitra/bpom.svg` | named in dev Mitra 2025 |
| ☐ | A13 | `mitra/upi.svg` | Universitas Pendidikan Indonesia, dev Mitra 2025 |
| ☐ | A13 | `mitra/<slug>.svg` × ~12 | rest of dev's ~20-logo grid. The sitemap doesn't name them: pull the list from dev, add rows here, then name the files |
| ☐ | A5 | `aktivitas-mitra/aktivitas-mitra-01.jpg` … `-06.jpg` | 6 photos, one per activity post |
| ☐ | A7 | `upt-bercerita/upt-bercerita-01.jpg` … `-08.jpg` | 8 photos, one per story |
| ☐ | A8/A9 | `aplikasi/sijiwa.png` | app icon |
| ☐ | A8/A9 | `aplikasi/oky.png` | app icon |
| ☐ | A8/A9 | `aplikasi/satusehat.png` | **only if** SATUSEHAT stays (open item 3) |
| ☐ | A14 | `berita/berita-01.jpg` … `-04.jpg` | 4 article photos. The 3 current news images can be copied in as `01`–`03` |
| ☐ | A3 | `program/asri.jpg` | ASRI banner (⏸ Phase 4) |

**No files needed:** A1, A2, A4, A6, A12, A15. **A11** uses YouTube's own thumbnails (`https://img.youtube.com/vi/<video-id>/hqdefault.jpg`), so it only needs the URLs.

**Total:** 4 ministry logos, ~20 partner logos, 18 photos, 2–3 app icons, 1 banner → **~45 files**.

### Text and data

These go into `src/data/`, not `public/`. The 6 / 8 / 8 counts for A5, A6 and A7 are the minimums I picked for the mockup, enough for filter and sort to mean something. They aren't dev's real counts.

| ☐ | Item | Content | Count | Fields | Data file → export |
|---|---|---|---|---|---|
| ☐ | A1 | Tautan links, each confirmed to resolve | 11 | `label`, `url` | `site.js` → `tautanGroups` |
| ☐ | A15 | Contact details | 1 | `address`, `email`, `phone`, `websiteUrl` | `site.js` → `contactInfo` |
| ☐ | A5 | Partner activity posts | 6 | `id`, `title`, `partner`, `date`, `excerpt`, `image` | `mitra.js` → `mitraActivities` |
| ☐ | A6 | Partner support rows | 8 | `partner`, `period`, `support` | `mitra.js` → `mitraSupport` |
| ☐ | A7 | UPT stories, 2 per category (7KAIH, CKG, MBG, UKS) | 8 | `id`, `title`, `region`, `category`, `date`, `excerpt`, `image` | `informasi.js` → `uptStories` |
| ☐ | A8/A9 | Apps | 2–3 | `id`, `name`, `publisher`, `description`, `icon`, `links[{store, url}]`, `featuredOnHome` | `site.js` → `appsList` |
| ☐ | A11 | Videos | 4 | `title`, `channel`, `duration`, `youtubeUrl` | `publikasi.js` → `videoList` |
| ☐ | A13 | Partner list | ~20 | `name`, `logo`, `url` (or `null`) | `mitra.js` → `partnerLogos` |
| ☐ | A14 | Full articles | 4 | `id`, `slug`, `title`, `date`, `category`, `excerpt`, `body[]`, `image` | `informasi.js` → `realNewsList` |
| ☐ | A3 | ASRI program page (⏸) | 1 | `kicker`, `agency`, `desc`, `pillars[]`, `links[]`, `image` | `program.js` → `priorityProgramsList` |
| ☐ | A4 | Tentang Mitra UKS/M (⏸) | 1 | `intro`, `bidangUsaha[]`, `bentukDukungan[]` | `mitra.js` → `mitraAbout` |
| ☐ | A10 | Ministry links (⏸) | 4 | `name`, `logo`, `url` | `site.js` → `ministryLinks` |

**A12** needs nothing new: `strataLevels` already exists.
