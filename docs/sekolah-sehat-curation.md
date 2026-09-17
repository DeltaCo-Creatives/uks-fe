# Sekolah Sehat (GSS): curation log

This log records what changed between the scraped PROD pages ([`docs/sekolah-sehat/`](./sekolah-sehat/), the source of truth) and the curated data in `src/data/gss.js` and `src/data/gssAdvokasi.js`. Links were checked on 2026-09-17.

## Rules applied

- **No new facts.** Every sentence traces back to a scraped page. Wording changes are limited to typos, punctuation, and splitting long paragraphs.
- **No broken links.** A link that is dead, private, or points at the wrong file becomes `url: null`. The page lists the item as "belum tersedia" instead of linking somewhere wrong.
- **Dropped:** the CMS images, the "Column 2/4" placeholder text, and the 62 embedded base64 icons. Font Awesome icons replace the icons.

## Content fixes

| Page | Source | Curated |
|---|---|---|
| Gerakan Sekolah Sehat | "Column 2" / "Column 4" (7×) | Removed |
| Gerakan Sekolah Sehat | Focus links to `uks.kemdikbud.go.id` | Replaced by in-page tabs |
| Sehat Fisik | "resiko", "fleksibiltas", "Pelaksanaanya" | "risiko", "fleksibilitas", "Pelaksanaannya" |
| Sehat Imunisasi | "dalamBulan", "pelaksanakan" | Fixed |
| Sehat Jiwa | "Skrinning" | "Skrining" |
| Sehat Lingkungan | "CPTS", "Kerjabakti", "Reduce – Reuse- Recycle" | "CTPS", "Kerja bakti", "Reduce, Reuse, Recycle" |

## Videos (titles from YouTube oEmbed)

| Page | Label on source page | Actual video | Decision |
|---|---|---|---|
| Sehat Bergizi | Gizi Baikku, Cermin Masa Depanku | `DF-0fcEbqWs` "Happy Monday Episode 8: Tengok Isi Piringku" | Kept under its real title (matches the Isi Piringku topic) |
| Sehat Jiwa | Di Dalam Tubuh yang Sehat Terdapat Jiwa yang Kuat | same `DF-0fcEbqWs` | **Removed.** Needs the correct video |
| Sehat Lingkungan | Lestari Lingkungan Sehat dan Nyaman | same `DF-0fcEbqWs` | **Removed.** Needs the correct video |
| Sehat Fisik | Ayo Bergerak, Sehatkan Badan | `gl56oxJOWVo` "Gerak Lagu Sekolah Sehat" | Kept under its real title |
| Sehat Imunisasi | Ayo Imunisasi, Lindungi Mimpi | `b37DSZbalb4` "Imunisasi Lindungi Mimpi" | Kept |

## Links set to `null` (need an owner)

| Item | Problem |
|---|---|
| Sehat Fisik · Tes Kebugaran Siswa Indonesia | `tksi.kemdikbud.go.id` does not resolve |
| Sehat Imunisasi · Petunjuk Teknis BIAS | Drive file is private (401) |
| Sehat Jiwa · Modul Ayo Atasi Perundungan (AAP) | Link is the Poster Sehat Bergizi file |
| Sehat Jiwa · Aplikasi SIJIWA | Play Store listing is 404 |
| Sehat Lingkungan · Poster Prosedur Pembersihan Toilet | Old-domain infografis page does not resolve |
| Sehat Lingkungan · Leaflet Sehat Lingkungan | Link is the Leaflet Sehat Bergizi file |
| Produk hukum · Permenkes 2269/2011 (PHBS) | Reuses the Permenko PMK 1/2022 PDF |
| Produk hukum · Perpres 67/2021 (TBC) | No link in source |
| Materi kampanye · Paparan Sekolah Sehat, Siaran Pers | `ditpsd.kemdikbud.go.id` does not resolve |
| Materi kampanye · Juknis BIAS, Standing Banner Permainan Rakyat | Drive files are private (401) |

## Structure decisions

- **Sehat Jiwa download row:** the source mixed PAUD/SD/SMP/SMA links with two "UNDUH" buttons. The four per-level links are read as the PPKSP module (one file per level). The two "UNDUH" buttons belong to AAP and SIJIWA, both unresolved above.
- **Old numbers and copy:** the placeholder statistics ("100% Satuan Pendidikan Terbina", "38 Provinsi") and invented copy in `uksm.js` had no source and were removed.
