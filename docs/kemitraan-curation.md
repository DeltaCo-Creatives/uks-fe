# Kemitraan UKS/M: Curation Log

Source of truth: the PROD Mitra pages, scraped 2026-09-17 from the Inertia page data. The verbatim text is in [`kemitraan/`](./kemitraan/). The curated data is in `src/data/mitra.js` and the page is in `src/components/MitraView.jsx` and `src/components/mitra/`.

| PROD page | What it holds | Used |
|---|---|---|
| `/mitra/panduan-kemitraan` | Bentuk kerja sama (10), ketentuan (6), manfaat (4), kriteria mitra | Yes |
| `/mitra/pendaftaran-mitra` | Only "Halaman Pendaftaran Mitra sedang dikembangkan." | Status only |
| `/mitra/mitra-kami` | Bidang usaha, bentuk dukungan (4), partners for 2025 (20), 2023–2024 (30), 2022 (7), logo image | Yes, without the image |
| `/aktifitas-mitra` | A card list of the 4 pages above (Dukungan Mitra, Mitra Kami, Pendaftaran Mitra, Panduan Kemitraan). No activity news | No |
| `/mitra/dukungan-mitra` | Support table for the 20 partners of 2025; 6 have details | Yes |
| `/sekolah-sehat/mitra-sekolah-sehat` | Same text as Panduan Kemitraan, plus a dead registration link | Link checked only |

## Rules applied

1. **No new facts.** Every statement comes from the pages above. Edits are limited to typos, punctuation, and trimming repeated wording.
2. **Show things for what they are.** Partner names are plain text, not pills or links. Funding amounts are plain text, not bars: they use different currencies and are not a comparison.
3. **Empty stays visible.** The 14 partners without a support record are listed as such instead of being hidden or filled in.

## What was removed from the old Mitra page

Everything in the old page had no PROD source:

- **Testimonials** from "Dr. Sarah Smith (UNICEF)", "Budi Santoso (Danone)" and "Hj. Siti Rahmawati (SDN 2 Wonosobo)". These were fictional.
- **Aktivitas Mitra feed:** 6 invented news items with invented numbers (45 schools in NTT, 250 canteens, 50.000 pupils…).
- **Dukungan table:** 8 invented rows with invented targets and "Aktif Berjalan" statuses.
- **Katalog:** 6 partners with invented focus areas and reach ("Nasional · 3.500 Sekolah").
- **Alur Kemitraan 4 Tahap:** an invented procedure (proposal, verification, PKS, monev).
- **Registration form:** it could not submit anywhere, yet showed a fake success alert with registration number "#MITRA-2026-0812".
- **Tentang:** invented principles, bidang usaha cards and support cards.
- **Partner logo list** pointing at `Aset UKS/mitra/*.svg` files that don't exist.

## Content decisions

| Item | Decision | Why |
|---|---|---|
| Bentuk kerja sama (10 items, flat on PROD) | Grouped into 4 themes: sarana dan prasarana, kapasitas dan edukasi, layanan kesehatan, kampanye/materi/penghargaan | 10 long items are hard to scan; each item's wording is unchanged |
| Kriteria mitra | Each sector shows its members next to its own requirements | The source lists members (1–3) and requirements (a, b) apart; a applies to members 1–2, b to member 3 |
| Pendaftaran | Status text plus a button to the portal's Kontak page | PROD form is a stub, and `ringkas.kemdikbud.go.id/RegiscalonmitraKSS` does not resolve |
| Logo image (Mitra Kami, Mitra Sekolah Sehat) | Not used | A single base64 collage; its last 3 logos (Kemendagri, Kemenag, Kemenkes) are not partners in the list |
| Aktivitas Mitra | Dropped from the page and the drawer | PROD has no activity content |
| Tanoto Foundation, Kegiatan 1 "Pengembangan karakter positip bagi peserta didik melalui Modul Choice" | Dropped | Same line as Save the Children's Kegiatan 1; it does not fit an MBG evaluation study. See open items |
| KAO beneficiaries | "Jumlah pencapaian peserta didik sebanyak 10.781 siswa" shortened to "10.781 peserta didik", same for school counts | Repeated wording trimmed; numbers unchanged |
| Danone beneficiaries | "1.7 juta" written as "1,7 juta" | Indonesian decimal comma |
| BGN | Listed with its note "Mitra strategis pelaksanaan Program Prioritas MBG" | The only empty record with text instead of "Belum ada data" |
| Typos fixed | positip, Tanggungjawabku, Bangga Teknologi indonesia, "Riau ( Kabupaten", "PT." / "CV." | |

## Open items for content owners

1. **Ministry name.** The Panduan text says Kemendikbudristek and "Direktorat Jenderal PAUD dan Dikdasmen Kemendikbudristek". It is shown verbatim; confirm the current name for the PKS coordinator.
2. **"KSS" is never expanded** on PROD (probably Kemitraan Sekolah Sehat). It is not shown on this page, but the source uses it in Kriteria.
3. **Registration.** Supply a working form or an address for partnership requests. Setting `mitraRegistration.url` switches the button to the form.
4. **Tanoto Foundation activities.** Confirm whether "Modul Choice" belongs to Tanoto's record.
5. **KPM.** Mitra Kami lists "PT KPM Ikhlas Tegas Puas"; Dukungan Mitra lists "Klinik Pendidikan MIPA" in the same slot. Confirm they are the same partner and which name to use.
6. **KAO location "Kabupaten Sentani, Papua".** Sentani is in Kabupaten Jayapura. Shown verbatim.
7. **Dated records.** Save the Children's "training … sedang berjalan" and periods that ended in 2025–2026 have no update. The page shows periods only, never a status.
8. **Partner logos.** If logos are wanted, supply one file per partner with permission to use it.
