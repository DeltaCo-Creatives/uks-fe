# Content curation report: portal vs. `docs/`

**Audited:** `src/` on branch `rama/feat/curation-mockup-site`, 2026-09-17.
**Report only.** Nothing in `src/` was changed.

## Ground truth used

1. **Per-page content files win:** `profil-tata-kelola/`, `trias-uks-content.MD`, `stratifikasi-uks-content.MD`, `sekolah-sehat/`, `kemitraan/`, `program/`, plus their `*-content.MD` and `*-curation.md` logs.
2. **For pages with no content file:** `sitemap-prod-uks.MD` (the live site).
3. **Lists are checked as a whole, not item by item.** This covers berita, praktik baik, UPT bercerita, agenda, buku, infografis, video and produk hukum. The report asks whether the list exists, whether its shape matches, and whether it has any source.
4. **Content with no source in `docs/` is flagged, not marked for removal.**

## Method

- **Sections with a content file:** a script took every prose line of the doc (paragraphs, list items, `**Field:**` values) and searched for it in all of `src/`, with punctuation and case normalized. Every miss was then checked by hand. Most were one of three things: editorial notes in the doc, image markers, or text the curation log says was deliberately trimmed.
- **Sections without a content file:** the data and components were read and compared with the page table and nav tree in the prod sitemap.

## Legend

| Mark | Meaning |
|---|---|
| 🔴 | Shown on the site with **no source** in `docs/`, or **contradicts** a source |
| 🟠 | In the source, **missing** from the site |
| 🟡 | Present, but naming, wording or structure **differs** from the source |
| ⚪ | Note / open item already logged elsewhere |

---

## Summary

| Section | Ground truth | Coverage | Top issue |
|---|---|---|---|
| Beranda | prod sitemap §2 | Partial | 🔴 National stats strip and hero slides have no source; 6 prod sections missing |
| UKS/M ▸ Profil & Tata Kelola | `profil-tata-kelola/` | ✅ Full | 🟡 Open owner decisions (Tujuan wording, chart images) |
| UKS/M ▸ Trias | `trias-uks-content.MD` | ✅ Verbatim (218 of 219 content lines) | ⚪ PHBS body is still a placeholder, as the doc asks |
| UKS/M ▸ Stratifikasi | `stratifikasi-uks-content.MD` | ✅ Rubric verbatim | 🟡 Three different strata-name schemes across the portal |
| UKS/M ▸ Sekolah Sehat (GSS) | `sekolah-sehat/` | ✅ Full | ⚪ Null links and removed videos waiting on owners |
| Program | `program/` | ✅ Mostly | 🟡 Referenced `docs/program-curation.md` does not exist; some source text omitted |
| Mitra | `kemitraan/` | ✅ Full | ⚪ Tanoto "Modul Choice" line dropped (open item) |
| Informasi | prod sitemap | Structure ✅ · items 🔴 | 🔴 All items are mock data; Aplikasi conflicts with the GSS source |
| Publikasi | prod sitemap | Structure ✅ · items 🔴 | 🔴 Mock lists; a second, unsourced produk hukum list |
| Tautan | prod sitemap | ✅ 4 groups · 11 links | 🟡 Two labels differ slightly |
| Kontak / FAQ | prod sitemap (both pages crash on prod) | None | 🔴 Whole page has no source, including a fake ticket confirmation |
| Footer / Navbar | prod sitemap §2 | Partial | 🔴 Footer tagline and address have no source |

---

## 1. Beranda

Source: prod sitemap §2. There is no content file. Code: [BerandaView.jsx](../src/components/BerandaView.jsx).

| # | Finding |
|---|---|
| B1 🔴 | **National stats strip has no source.** `nationalMetrics` in [uksm.js](../src/data/uksm.js) shows 534.120+ satuan pendidikan, 53,4 juta peserta didik, 514 kab/kota and 14.280 paripurna. Prod's homepage has no stats strip; its only numbers are the footer visitor counter. `sekolah-sehat-curation.md` records removing similar unsourced stats from `uksm.js`, but these four remain. |
| B2 🔴 | **Hero shows mock news.** [Hero.jsx](../src/components/Hero.jsx) builds its slides from `realNewsList` (see I1). Prod's hero is 4 decorative slides with no title, text or link. Each slide's "Baca Selengkapnya" button goes to `#berita`, not to the article. |
| B3 🟠 | **Prod homepage sections with no counterpart:** Praktik Baik Terupdate (4), UPT Bercerita (4), Mitra Sekolah Sehat logo grid, Video Sekolah Sehat (3), Aplikasi Terkait UKS/M (OKY), and "Dikembangkan oleh" (4 ministry logos). |
| B4 🟡 | **Sections that exist but differ from prod.** <br>• Program Prioritas: prod has 3 links (7KAIH, MBG, CKG). The site has a 5-card marquee that adds ASRI and SAIH, all from sourced `program.js`. <br>• Infografis: prod has 4 posters. The site shows 3 plus a "Partner N" screenshot strip with no source. <br>• Buku Panduan: prod has 4. <br>• The Stratifikasi teaser comes from dev's homepage, not prod's. |
| B5 🟡 | **Drawer entries point at missing sections.** In [navigation.js](../src/data/navigation.js), the `beranda` drawer lists `sec-home-video`, `sec-home-tautan`, `sec-home-aplikasi` and `sec-home-mitra`, none of which BerandaView renders. The drawer also puts Program before GSS, the reverse of the page. |

## 2. UKS/M ▸ Profil & Tata Kelola

Source: `profil-tata-kelola/` (6 pages). Code: [profil.js](../src/data/profil.js).

All 6 pages are represented, and the removals listed in `profil-tata-kelola-curation.md` were carried out.

| # | Finding |
|---|---|
| P1 🟡 | **Three sentences reworded as instructions.** The "Supaya UKS/M berjalan setiap tahun" list (`profilContinuity`) turns them into commands: "Tinjau…", "Bentuk…", "Terapkan…". The source says "sekolah harus memperhatikan…" and "sekolah harus membentuk…". The meaning is unchanged, but this goes past the log's own rule (typos, splits and trims only). |
| P2 ⚪ | **Owner decisions still open** (from the curation log): <br>• which Tujuan sentence is official <br>• strata names (see S1) <br>• org chart images; both charts are still placeholders <br>• the Manajemen text's reference to "lampiran 8" |
| P3 ⚪ | **Stale code comment.** [ProfilStruktur.jsx](../src/components/uksm/profil/ProfilStruktur.jsx) says the charts are "rebuilt as HTML from the PROD chart images", but they are image placeholders. |

## 3. UKS/M ▸ Trias

Source: `trias-uks-content.MD`, scraped from dev. Code: [trias.js](../src/data/trias.js).

**218 of 219 content lines are verbatim.** All 16 sub-programs are present, including Dokter Kecil's Tugas list and Pendidikan Gizi's Tautan Penting. The one miss is PHBS's description, which is left out on purpose (T1). The script's other misses are the doc's own editorial notes.

| # | Finding |
|---|---|
| T1 ⚪ | **PHBS body is a placeholder.** It is marked `placeholder: true`, which is correct: the doc says dev's PHBS text is really the Sanitasi article, and PHBS needs its own copy. **Still needs to be written.** |
| T2 ⚪ | **Gizi links have no URLs.** Pendidikan Gizi's 2 "Tautan Penting" links are `url: null`, as in the source. **Still needs owner URLs.** |

## 4. UKS/M ▸ Stratifikasi

Source: `stratifikasi-uks-content.MD`, from dev. Code: [stratifikasi.js](../src/data/stratifikasi.js).

The intro, the 4 Tujuan cards, Cara Penilaian and the full SD rubric (4 categories × 4 strata) are verbatim. The page labels the rubric "Jenjang SD".

| # | Finding |
|---|---|
| S1 🟡 | **The portal uses three different strata-name schemes.** <br>• Stratifikasi page, nav drawer footer and homepage teaser: **Dasar · Madya · Utama · Paripurna** <br>• Profil page: **minimal, optimal, standar, paripurna** (prod Deskripsi Umum's wording and order) <br>• The stratifikasi doc (Flag 3) recommends **Minimal · Standar · Optimal · Paripurna**: it appears in all 4 CMS records, in the rubric's column headers and on dev's homepage, against 1 source for Dasar/Madya <br>**Needs one decision, applied everywhere.** |
| S2 🟠 | **Source text not shown.** <br>• CMS "Deskripsi": *Definisi* (who assesses: sekolah and Puskesmas, Tim Pembina Kab/Kota), *Maksud*, and *Penilaian*, which says the assessment is absolute: every indicator must be met <br>• CMS "Perhitungan": the per-strata rule <br>All of this is sourced text that fits the page's "Cara Penilaian" section. |
| S3 ⚪ | **Rubric is SD only.** SMP, SMA and PAUD rubrics don't exist in the source. |

## 5. UKS/M ▸ Sekolah Sehat (GSS)

Source: `sekolah-sehat/` (7 pages). Code: [gss.js](../src/data/gss.js), [gssAdvokasi.js](../src/data/gssAdvokasi.js).

Every text block was found; the few script misses were icon markers or slightly reworded lines. The lists are complete: 18 produk hukum and 20 campaign materials, in source order. The Gerakan Madrasah Sehat external link is in the GSS hero.

| # | Finding |
|---|---|
| G1 🟡 | **Some sentences reworded beyond typo fixes.** Examples: <br>• "Dalam rangka menjamin…" became "Untuk menjamin…" <br>• the 3R intro is condensed <br>• "Jika ada yang mengalami Kekerasan bisa segera…" became "Segera mendapatkan penanganan… jika mengalami kekerasan" <br>The meaning is unchanged. The curation log's rule says "typos, punctuation, splitting". |
| G2 ⚪ | **Owner items from `sekolah-sehat-curation.md` are still open:** <br>• 10 `url: null` links <br>• the Sehat Jiwa and Sehat Lingkungan videos, removed because they were wrong |

## 6. Program

Source: `program/` (mbg, ckg, 7kaih, asri, saih-gala-kreasi). Code: [program.js](../src/data/program.js).

All 5 programs are present. The facts, tables, timeline, pillars and links match the extracts. Links the docs record as dead are `url: null`: Dasbor MBG, ckg.kemkes.go.id, the SEB JDIH page, the PAUD and SD SAIH links, and the Gala 2023 juklak. ASRI is dev-only but has a content file, so it stays.

| # | Finding |
|---|---|
| R1 🟡 | **Missing curation log.** The `program.js` header says decisions and link checks are in `docs/program-curation.md`, which **does not exist**. Unlike every other section, Program has no curation log. |
| R2 🟡 | **Condensed, not verbatim.** Examples: <br>• The 7KAIH habit texts are shortened. Bangun Pagi drops "…yang berkontribusi pada kualitas hidup yang lebih baik"; Beribadah drops "Bukan sekadar ritual"; Berolahraga's text is rewritten. <br>• The CKG lead drops "Bukan hal yang perlu ditakuti…". <br>No facts change. |
| R3 🟠 | **Source text omitted.** <br>• **CKG:** the headline "Sekolah Mulai, Cek Kesehatan Gratis Jangan Terlewat!", and "Program ini bagian dari Cek Kesehatan Gratis (CKG) yang lebih luas… periksa hari ini, sehat di masa depan." <br>• **7KAIH:** the second intro paragraph (its content is partly in "Mengapa gerakan ini ada"), the "Yuk, Praktikkan 7KAIH!" call to action, the 4 portal Panduan (Orang Tua, SMA/SMK, PAUD, SD) and the 4 Poster 7KAIH infografis. <br>• **Gala Kreasi 2024:** the 4 "Tujuan Kegiatan", and the Panduan (ppt), Surat Pernyataan and Logo downloads. The doc gives no URLs for the last three. |
| R4 🟠 | **Prod Program menu items with no counterpart:** <br>• Praktik Baik 7KAIH and Praktik Baik MBG (the Praktik Baik list filtered by category; see I2) <br>• Gala Kreasi 2024 Pengumuman Pemenang and Video Pemenang (both load on prod, but `docs/` has no content for them) |

## 7. Mitra

Source: `kemitraan/` (5 pages). Code: [mitra.js](../src/data/mitra.js).

All text found. The 20 / 30 / 7 partner lists and the 6 support records are present, as are the status-only pendaftaran and the removals listed in `kemitraan-curation.md`.

| # | Finding |
|---|---|
| M1 ⚪ | **Aktivitas Mitra left out on purpose.** The prod page has no activity content; this is consistent with the log. |
| M2 ⚪ | **Two owner questions from the log:** <br>• Tanoto Foundation's "Modul Choice" line was dropped <br>• KPM vs Klinik Pendidikan MIPA naming <br>Both still need confirmation. |
| M3 🟠 | **Homepage logo grid missing.** Prod shows the "Mitra Sekolah Sehat" logo grid on the homepage (B3). The site has no partner logos anywhere; the log wants one logo file per partner first. |

## 8. Informasi

Source: prod sitemap (Berita, Praktik Baik, UPT Bercerita, Agenda, Aplikasi). Code: [informasi.js](../src/data/informasi.js), [site.js](../src/data/site.js).

Structure ✅: all 5 prod pages exist as panels.

| # | Finding |
|---|---|
| I1 🔴 | **All items are mock data with no source in `docs/`.** Not compared item by item, as instructed, but the whole class is unsourced: <br>• 4 berita, e.g. "Peluncuran Standardisasi Ruang UKS Ramah Anak 2026" <br>• 3 praktik baik (SDN 1 Wonosobo, SMPN 4 Singaraja, SMAN 2 Padang) <br>• 3 agenda <br>• 8 UPT stories with specific figures (120 sekolah, 300 sekolah, 80 madrasah) <br>They need replacing with real CMS or prod content. One real item is already documented: the ASRI "Jumat Bersih" Praktik Baik (`program/asri.md` S3). |
| I2 🟠 | **Praktik Baik has no category filter.** Prod's Program menu relies on it: Praktik Baik 7KAIH (`kategori=15`) and MBG (`kategori=16`). UPT Bercerita has categories; Praktik Baik doesn't. |
| I3 🔴 | **Aplikasi conflicts with sources.** <br>• Prod lists **SIJIWA and Oky** only. The site adds **SATUSEHAT Mobile**, which appears only on dev's homepage, where it linked the wrong Play Store package. <br>• The site credits SIJIWA to **"Garuda Teknologi Indonesia"** (from the dev sitemap). The prod GSS Sehat Jiwa content file says SIJIWA was **"dikembangkan oleh Kementerian Kesehatan"**. Content files win, so this is a contradiction. <br>• SIJIWA links to the generic kemkes.go.id, while the GSS log records its Play Store listing as 404. <br>• App descriptions have no source, e.g. Oky as "Aplikasi pelacak menstruasi pertama di dunia…". |

## 9. Publikasi

Source: prod sitemap (Produk Hukum, Buku Panduan, Infografis, Video). Code: [publikasi.js](../src/data/publikasi.js).

Structure ✅: 4 sections map to the 4 prod pages.

| # | Finding |
|---|---|
| U1 🔴 | **Two produk hukum lists, and only one is sourced.** Publikasi shows its own 3-item `regulationsList` with no source. The sourced 18-item legal list lives in GSS ▸ Bahan Advokasi, and Profil's "dasar hukum" link already points there. **Decide which list is the portal's Produk Hukum.** |
| U2 🔴 | **Books, infografis and videos are mock lists.** There are 4 books, 3 infografis and 4 videos, with invented titles such as "Tutorial SKJ & Peregangan Kelas 3 Menit". Not compared item by item. Sourced items already exist elsewhere in `docs/`: <br>• the GSS campaign materials (buku saku, infografis, leaflets) <br>• the 7KAIH Kiat Jitu books and Pedoman MBG <br>• real YouTube links (SKJ 2022, Gerak Lagu, ILM Sekolah Sehat, Imunisasi Lindungi Mimpi) |

## 10. Tautan

Source: prod sitemap §1. Code: `tautanGroups` in [site.js](../src/data/site.js).

✅ 4 groups with 11 links, matching prod's grouping and count.

| # | Finding |
|---|---|
| L1 🟡 | **Two labels differ from prod.** "Direktorat KSKK **Madrasah**" is "Direktorat KSKK" on prod; "Direktorat SUPD **(Ditjen Bina Bangda)**" is "Direktorat SUPD". The URLs for those two match the dev sitemap. `docs/` has no URLs for the other 9 links, so they couldn't be checked. |

## 11. Kontak and FAQ

Source: the prod sitemap, but prod's `/kontak` and `/faq` both **crash**, so there is no source content. Code: [KontakView.jsx](../src/components/KontakView.jsx), `contactInfo` and `faqsList` in [site.js](../src/data/site.js).

| # | Finding |
|---|---|
| K1 🔴 | **Contact details mostly have no source.** Unsourced: <br>• the address "Gedung E Lantai 17…" <br>• the phone number (021) 572-5034 <br>• "Call Center ULT 177" <br>• the service hours <br>Only the email (`uks.dikdasmen@kemdikbud.go.id`) is sourced, from prod's footer. |
| K2 🔴 | **Fake ticket confirmation.** The ticket form can't submit, yet shows a success alert with ticket number "#UKS-2026-9812". It is the same pattern already removed from Mitra (the fake "#MITRA-2026-0812"). |
| K3 🔴 | **FAQ contradicts a sourced page.** The 3 FAQ answers have no source. The "Stratifikasi Standar" answer (ruang UKS with a separate examination bed, running water, a canteen without sweetened food) **doesn't match** the sourced SD rubric's Standar indicators. It also calls the base tier "Minimal" while the Stratifikasi page says "Dasar". The BOSP answer makes funding claims with no source. |

## 12. Site chrome

| # | Finding |
|---|---|
| C1 🔴 | **Footer copy has no source.** [Footer.jsx](../src/components/Footer.jsx): <br>• "Portal Resmi… lintas 4 Kementerian" <br>• "Sinergi 4 Kementerian untuk Indonesia Emas 2045" <br>• "Sekretariat Pembina UKS/M Pusat" <br>• the address and phone from K1 |
| C2 🟠 | **Prod footer items with no counterpart:** the pauddikdasmen.kemdikbud.go.id link and the visitor-count widget. |
| C3 🟡 | **Stale mobile menu label.** It says "Program Prioritas (MBG, CKG, ASRI)" but the page has 5 programs, including 7KAIH and SAIH. |

---

## Decisions needed from content owners

Grouped so one answer closes several findings.

1. **Strata names** (S1, K3, P2). Pick one scheme and one order for the whole portal.
2. **Mock lists** (B2, I1, U2). Replace them with real CMS or prod content, or mark them clearly as sample data until the feed exists.
3. **Produk Hukum** (U1). Should the sourced 18-item GSS list be the portal-wide list?
4. **Kontak page** (K1–K3). Supply a real address, phones, hours and FAQ, or reduce the page to the sourced email. Remove or wire up the ticket form.
5. **Homepage stats** (B1). Supply real, dated figures with a source, or drop the strip.
6. **Aplikasi** (I3). Confirm who develops SIJIWA, whether SATUSEHAT belongs in the list, and a working link for each app.
7. **Program omissions** (R3, R4). Add the CKG and 7KAIH lines, the Gala 2024 Tujuan, and the Praktik Baik 7KAIH/MBG filters, or confirm they are intentionally out.

## Stale docs

- **`curation-vs-dev-sitemap.md` and `implementation-plan-missing-from-dev.md`** treat **dev** as the source of truth. They describe an older `src/`, with Dokcil and Sarpras programs and Mitra testimonials that no longer exist. Both are superseded by this report and the per-section curation logs.
- **`docs/program-curation.md`** is referenced from code but missing (R1).
