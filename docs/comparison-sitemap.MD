# Portal UKS/M — Dev vs. Prod comparison

Companion to [Sitemap \[DEV\]](https://claude.ai/artifact/NYG3EvQwwr41vna6y6FRic) and [Sitemap \[PROD\]](https://claude.ai/artifact/FKbNL8ygr96H3z293Uii1K). Both were traced with the same method (live Inertia page‑state JSON + Ziggy route table + forced‑open dropdowns + live HTTP checks), so the differences below are real, not artifacts of different note‑taking.

## The headline: these are two different generations of the same app

The Inertia `component` name on the homepage gives it away: dev renders `Home/V2/Index`, prod renders `Home/Index`. **Prod is the live, original site. Dev is an in‑progress V2 redesign** sitting on a separate domain (`portal-uks.demo.or.id`) — same Laravel backend, same content database, a leaner rebuilt front end. That explains most of what follows: dev consolidates prod's sprawling nav into fewer, cleaner pages, but is also younger and carries fresh, unfinished‑redesign bugs that prod doesn't have — while prod carries its own years of accumulated legacy debt (placeholder stubs, an orphaned dead link, deeply nested menus) that a rebuild would naturally clean up.

| | DEV (`portal-uks.demo.or.id`) | PROD (`uks.kemendikdasmen.go.id`) |
|---|---|---|
| Homepage component | `Home/V2/Index` | `Home/Index` |
| Total Ziggy routes | 185 | 154 |
| Public‑facing routes | ~70 (incl. orphaned `-v1` duplicates) | 49 |
| Header nav top‑level items | 7 (+ search, + Kontak) | 7 (+ search, + Kontak) |
| Deepest nav nesting | 2 levels (Tautan → ministry → link) | 3 levels (UKS/M → pillar → sub‑program; 7KAIH → Gala Kreasi → year) |
| Issues found | 8 | 10 |

## Navigation: menu‑by‑menu

| Menu | DEV | PROD | Verdict |
|---|---|---|---|
| **Beranda** | `/` | `/` | Same |
| **UKS/M** | 4 flat items: Tentang, Trias, Manajemen, Stratifikasi — all internal pages | 12+ items, 3 levels deep: Deskripsi Umum / Tujuan / Sasaran / Struktur Organisasi (2 children) / **Stratifikasi → external `stratifikasiuks.org`** / Manajemen / a redundant "TRIAS UKS/M :" label / 3 numbered pillar dropdowns (16 sub‑pages total) / Sekolah Sehat hub (7 children) | **Restructured.** Dev flattens what prod spreads across ~20 pages into a 4‑item menu backed by 3 long single‑page overviews (`/trias-uks`, etc). Prod's Stratifikasi is a whole separate external product; dev's is a real page on‑site. |
| **Program** | 4 flat items: 7KAIH, MBG, CKG, ASRI — each a clean dedicated overview page | 2 groups (7KAIH: 5 children incl. Gala Kreasi/SAIH pages; MBG: 3 children) + a placeholder‑stub CKG button. **No ASRI anywhere.** | **Restructured + regressed.** Dev's 4 clean topic pages don't exist on prod in that form — prod instead exposes competition sub‑pages (Gala Kreasi 2023/2024, Lomba SAIH 2025) that dev has no equivalent of at all. ASRI is dev‑only. |
| **Mitra** | Tentang Mitra UKS/M, Panduan Kemitraan, Mitra Kami, Aktivitas Mitra, Dukungan Mitra | Panduan Kemitraan, **Pendaftaran Mitra (placeholder stub)**, Mitra Kami, Aktivitas Mitra, Dukungan Mitra | **One item swapped.** Prod's first slot is "Pendaftaran Mitra" (unbuilt) where dev has a working "Tentang Mitra UKS/M" overview instead. |
| **Informasi** | Berita, Praktik Baik, UPT Bercerita, Agenda, Aplikasi | UPT Bercerita, Berita, Praktik Baik, Agenda, Aplikasi | Same 5 destinations, different menu order only. |
| **Publikasi** | Produk Hukum, Buku Panduan, Infografis, Video | Identical | Same |
| **Tautan** | Kemenkes / Kemendikdasmen / Kemenag / Kemendagri, same sub‑links | Identical | Same |
| **Search icon** | `/pencarian` | `/pencarian` | Same |
| **Kontak** | 💥 Broken on both | 💥 Broken on both | **Same bug**, byte‑identical error: `Halaman tidak ditemukan: ./pages/Kontak/Index.tsx`. This shipped on both builds. |

## Homepage: section‑by‑section

| Section | DEV | PROD |
|---|---|---|
| Hero | 5 slides — 4 decorative banners + 1 real news slide with a working CTA | 4 slides — all 4 purely decorative, no title/desc/CTA on any of them |
| Trias UKS/M cards | ✅ present (3 cards) | ✅ present (3 cards, same 3 pillar pages) |
| Stratifikasi section | ✅ present (4 strata boxes) | ❌ **not on the homepage at all** |
| Program Prioritas | 4 cards, **all 4 broken** (external 404s to `kemendikdasmen.go.id/{slug}`) | 3 links: 2 external (7KAIH, MBG — both resolve fine) + 1 to a Google Drive PDF for CKG |
| Berita | ✅ 4 cards + "lainnya" link | ✅ 4 cards + "Semua Berita" link |
| Praktik Baik | ❌ not its own homepage section | ✅ "Praktik Baik Terupdate" — 4 cards + link |
| UPT Bercerita | ❌ not its own homepage section | ✅ 4 cards + link |
| Sekolah Sehat hub | ❌ doesn't exist on dev at all | ✅ tabbed section (5 foci) |
| Partner logos | "Mitra UKS" grid, ~20 logos, all clickable | "Mitra Sekolah Sehat" grid, ~21 logos (incl. 3 of 4 ministries) |
| Government logos | Inside the same Mitra grid, clickable | **Shown twice**: 3 clickable inside the Mitra grid, then all 4 again as non‑clickable `<img>` in a separate "Dikembangkan oleh" section |
| Modul/Buku Panduan | "Modul Terbaru" — 4 cards, PDF viewer modal | "Buku Panduan" — 4 cards, same Lihat/Unduh pattern |
| Infografis | ✅ 4 posters, modal viewer | ✅ 4 posters, modal viewer |
| Video | "Video" — 4 items, link to YouTube | "Video Sekolah Sehat" — 3 items, no outbound link found on the cards |
| Aplikasi | OKY + **mismatched "SATUSEHAT"** (links to the old TraceCare Play Store package) | OKY only. Download button is a **static QR‑code image**, not a store link |
| Footer | Contact block, malformed website href (leading space) | Contact block + a **live visitor‑count widget** (Hari Ini/Minggu Ini/Bulan Ini/Total) that dev doesn't have |

## Issues: shared vs. unique

**Shared (fix once, fixes both):**
- 💥 `/kontak` blank‑page crash — identical error, present on both builds.

**Only on DEV (redesign‑introduced):**
- Homepage "Program Prioritas" cards: all 4 link to a broken external domain, even though the header's own Program menu has working internal pages for the same 4 topics.
- "SATUSEHAT" app card actually links to the old PeduliLindungi/TraceCare Play Store package.
- Malformed footer website `href` (leading space).
- Cross‑domain partner‑logo images (pointing at the prod asset host instead of the demo domain).
- Breadcrumb typo "UK/M" on the Mitra page.
- Hero slider mixes 4 dead slides with 1 live one, no visual cue which is which.
- A full parallel set of orphaned `-v1` legacy routes still registered server‑side.

**Only on PROD (legacy debt):**
- 🪧 `/program/cek-kesehatan-gratis` — raw placeholder text, "isi ckg dari paparan."
- 🪧 `/mitra/pendaftaran-mitra` — raw placeholder text, "Halaman Pendaftaran Mitra sedang dikembangkan."
- ❌ `/sekolah-sehat` (the nav header's own link) 404s, even though its 7 children all work.
- The homepage's CKG card silently reroutes around the broken internal CKG page to an external Google Drive PDF instead — masking #1 above rather than fixing it.
- OKY "Unduh Sekarang" opens a QR‑code image instead of a store link.
- "Stratifikasi UKS/M" sends visitors to a completely separate external domain (`stratifikasiuks.org`) instead of a page on the site.
- Same 4 ministry logos shown twice with inconsistent link behavior (3 clickable in one section, all 4 non‑clickable in another).
- A redundant duplicate nav entry ("TRIAS UKS/M :") pointing at the same URL as the item above it.
- `/faq`, though orphaned and unlinked, has the identical missing‑component crash as Kontak — suggesting the build‑omission bug isn't isolated to one page.

## Bottom line

If the goal is deciding what the V2 redesign (dev) needs before it can replace prod: it already **structurally simplifies** a genuinely sprawling nav (prod's UKS/M and Program menus alone account for ~35 of prod's ~49 public routes) without losing any topic — every prod pillar/program topic has a corresponding dev page, just consolidated. What it's missing before parity: a Praktik Baik / UPT Bercerita / Sekolah Sehat presence on its own homepage (prod has all three, dev has neither), and it needs its own two homegrown bugs (Program Prioritas' broken external links, the SATUSEHAT mismatch) fixed — bugs prod doesn't have. Both builds share the one bug most worth fixing first: `/kontak`, the one link that's on every single page of both sites.
