# Profil & Tata Kelola: Curation Log

Source of truth: the 6 PROD pages scraped on 2026-09-17. The verbatim text is in [`profil-tata-kelola/`](./profil-tata-kelola/) and the chart transcriptions are in [`profil-tata-kelola-content.MD`](./profil-tata-kelola-content.MD). The curated data is in `src/data/profil.js` and the page is in `src/components/uksm/profil/`.

## Rules applied

1. **No new facts.** Every statement on the page comes from the 6 pages. Wording is the source's own, with three kinds of edits:
   - typos are fixed;
   - long paragraphs are split or trimmed of repeated sentences;
   - one sentence is split at its own clauses (Tujuan).
2. **Cross-links point to existing portal pages only:** Trias UKS/M, Stratifikasi UKS/M and the GSS legal-document list.
3. **Org charts are image placeholders.** Owner decision, 2026-09-17. The two chart slots keep the PROD images' aspect ratio until the final images are supplied. Each placeholder shows "Gambar bagan menyusul" and a caption, plus a TODO tag in dev builds. The charts' contents stay transcribed in the content spec.
4. **Stock images are dropped** (dartboard, "tujuan" icon, UKS logo).
5. **Show things for what they are.**
   - Short static names and facts are plain text or ruled rows, never pills or filled bars, so they don't look clickable.
   - Nothing is drawn as a chart unless the source is comparing values.

## What was removed from the old Profil page

The previous hardcoded page had content with no source on PROD:

- **"Dasar Hukum" cards.**
  - "UU 17/2023 … Puskesmas" and "Permendikbud 63/2022 (BOSP)" have no source, and their descriptions were invented. Neither is on the PROD legal-document list.
  - The Peraturan Bersama 4 Menteri 2014 is real and is still reachable through the Kebijakan link.
- **"Sasaran 3 Tingkat"** (primer, sekunder, tersier). The Sasaran page has no tiers.
- **"Tujuan Umum / Tujuan Khusus".** The source has a single Tujuan. "Tujuan Khusus" (stunting, rokok, narkoba…) is not on PROD.
- **Tim Pembina member lists** (Menteri…, Gubernur + Kepala Dinas…). They did not match the chart.
- **Tim Pelaksana roles** (Guru Pembina "mencatat buku rujukan medis", Dokter Kecil "penimbangan TB/BB"…). These are not in the source.
- **The 3-stage "Siklus Manajemen"** (RKT/RKAS, SOP harian, Monev dengan aplikasi Stratifikasi). The source has 5 components.
- **The Navbar mega-menu blurb**, which cited "SKB 4 Menteri".

## Content decisions

| Item | Decision | Why |
|---|---|---|
| Tujuan (two wordings) | Use the **Tujuan page** sentence (pending owner confirmation) | It is the dedicated page. The differences are listed under Open items |
| Tujuan breakdown | "Yang ingin dicapai / Caranya / Hasilnya" | The same sentence cut at its own clauses; nothing added |
| Strata names | Shown as on Deskripsi Umum: minimal, optimal, standar, paripurna, in the source's order | Owner decision, 2026-09-17 |
| Pelayanan acronyms P3K, P3P, P3LP | Show the long forms under each name | The long forms are in the same source sentence |
| Tim Pembina levels | The 4 levels as a numbered list from the page text | Part of the page text, not only the chart |
| Kebijakan, "sudah dijabarkan pada bagian dasar hukum buku ini" | Link to the portal's legal-document list (GSS ▸ Bahan Advokasi) | That list is the portal's own "dasar hukum" section, curated from PROD |
| "lampiran 8" (monitoring form) | Dropped | The appendix doesn't exist on the site |
| 20 monitoring items | Grouped under the Trias pillars; the source numbering 1 to 20 is kept | Items 1–7, 8–14 and 15–19 are unbroken runs that match the pillar definitions on Deskripsi Umum and the sub-programs on the Trias page; item 20 is Manajemen |
| Evaluasi sources list | 5 sources; "menjadi tanggung jawab Tim Pembina UKS/M" shown as "Penanggung jawab" | That bullet on PROD is a statement, not a source |
| Evaluasi horizons | Three named periods as text: 6 bulan pelaksanaan, 1 tahun ajaran, 3 tahun pelaksanaan | They are separate target periods, not values to compare. Proportional bars (the first version) suggested a comparison or progress |
| Typos fixed | merupakan adalah, air besih, serti, indicator, keagiatan, Propinsi, ditunjukan, penanggungjawab | |

## Open items for content owners

1. **Strata names across the portal.** This page now uses minimal, optimal, standar, paripurna, but the Stratifikasi page still uses Dasar, Madya, Utama, Paripurna. The source order "minimal, optimal, standar" also puts optimal before standar.
2. **Which Tujuan sentence is official?**
   - **Deskripsi Umum:** "meningkatkan kesehatan, mutu pendidikan dan prestasi belajar peserta didik yang tercermin dalam kehidupan perilaku hidup bersih sehat (PHBS) dan lingkungan sekolah yang sehat sehingga memungkinkan peserta didik mengalami pertumbuhan dan perkembangan yang optimal."
   - **Tujuan page:** "meningkatkan mutu pendidikan dan prestasi belajar peserta didik dengan meningkatkan perilaku hidup bersih dan sehat serta menciptakan lingkungan pendidikan yang sehat, sehingga memungkinkan pertumbuhan dan perkembangan yang harmonis peserta didik."
   - **Differences:**
     - (a) Deskripsi Umum adds *kesehatan* as a goal.
     - (b) In Deskripsi Umum, PHBS and a healthy school are what the goal is *reflected in* ("tercermin dalam"); on the Tujuan page they are *the means* ("dengan meningkatkan … serta menciptakan").
     - (c) *lingkungan sekolah* vs *lingkungan pendidikan*.
     - (d) The outcome is *optimal* vs *harmonis*.
3. **Org chart images.** Supply the final Tim Pembina and Tim Pelaksana images. Before reusing the PROD Tim Pembina image, confirm three things it shows: the ministry name (Kemendikbudristek vs Kemendikdasmen), "SMA/MTs" (probably SMA/MA), and "Kanwil Kemenag" at Kab/Kota.
4. **Dasar hukum.** Is the GSS legal-document list the intended set for UKS/M as a whole?
5. **Manajemen monitoring form.** The source mentions a form ("lampiran 8") that isn't published anywhere.
