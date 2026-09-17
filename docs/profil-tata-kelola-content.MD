# Profil & Tata Kelola UKS/M: Content Specification

Scraped live from PROD `https://uks.kemendikdasmen.go.id` on 2026-09-17, via Inertia JSON (`X-Inertia: true`). Verbatim page text lives in [`docs/profil-tata-kelola/`](./profil-tata-kelola/), one file per page. The two org charts carry content that is not in the page text, so they are transcribed below.

## Pages

On PROD, these pages sit under the **UKS/M** nav group (the "Tentang UKS" pages plus the Manajemen program page). In this portal they all belong to **UKS/M ▸ 1. Profil & Tata Kelola** (`uksm-profil`).

| # | Title | URL | File | Component | Content |
|---|---|---|---|---|---|
| 1 | Deskripsi Umum | `/tentang-uks/deskripsi-umum` | [deskripsi-umum.md](./profil-tata-kelola/deskripsi-umum.md) | `TentangUKS/Show` | UKS/M definition, the 3 Trias pillars with activities, Tujuan (variant wording), stratifikasi as a strategy, continuity (Tim Pelaksana + RKAS, PHBS). 2 images: UKS logo, Trias diagram |
| 2 | Tujuan | `/tentang-uks/tujuan` | [tujuan.md](./profil-tata-kelola/tujuan.md) | `TentangUKS/Show` | One-sentence Tujuan. 1 image: stock "tujuan" icon |
| 3 | Sasaran | `/tentang-uks/sasaran` | [sasaran.md](./profil-tata-kelola/sasaran.md) | `TentangUKS/Show` | Main targets (peserta didik, pendidik, tenaga kependidikan, masyarakat sekolah) + 6 stakeholders. 1 image: stock dartboard |
| 4 | Struktur Organisasi Tim Pembina | `/tentang-uks/struktur-organisasi-tim-pembina` | [struktur-organisasi-tim-pembina.md](./profil-tata-kelola/struktur-organisasi-tim-pembina.md) | `TentangUKS/Show` | TP UKS/M definition, 4 government levels. 1 image: **org chart (content, transcribed below)** |
| 5 | Struktur Organisasi Tim Pelaksana | `/tentang-uks/struktur-organisasi-timpelaksana` | [struktur-organisasi-timpelaksana.md](./profil-tata-kelola/struktur-organisasi-timpelaksana.md) | `TentangUKS/Show` | Definition, Fungsi, 4 Tugas. 1 image: **org chart (content, transcribed below)** |
| 6 | Manajemen UKS/M | `/program/manajemen-uks-m` | [manajemen-uks-m.md](./profil-tata-kelola/manajemen-uks-m.md) | `Program/Show` | 5 management components; Monitoring (20 items) and Evaluasi (targets, sources, 3-stage process). 1 image: 5-component wheel |

## Image transcriptions

### Tim Pembina chart (`wj8RI73K…png`, 1010×814)

Levels run top to bottom, with solid arrows from each TP UKS/M to the next level down.

| Level | Keanggotaan | Ditetapkan oleh | Team |
|---|---|---|---|
| Pusat | Kementerian Pendidikan, Kebudayaan, Riset dan Teknologi · Kementerian Agama · Kementerian Dalam Negeri · Kementerian Kesehatan | (not shown) | TP UKS/M Pusat |
| Provinsi | SETDA · DISDIK · DINKES · KANWIL KEMENAG · BAPPEDA · OPD LAINNYA | GUBERNUR | TP UKS/M Provinsi |
| Kab/Kota | SETDA · DISDIK · DINKES · KANWIL KEMENAG · BAPPEDA · OPD LAINNYA | WALIKOTA/BUPATI | TP UKS/M Kabupaten/Kota |
| Kecamatan | SEKCAM · UNSUR DISDIK · KA PUSKESMAS · PENDAIS/ PPA KUA · KETUA TP PKK · INSTANSI LAINNYA | CAMAT | TP UKS/M Kecamatan |

Bottom row, the education units: Pendidikan Non Formal dan Informal · TK/RA · SD/MI · SMP/MTs · SMA/MTs · SMK/MAK · Satuan Pendidikan Khusus.

- Solid lines run from TP UKS/M Kecamatan to all 7 units.
- Dashed lines run from TP UKS/M Provinsi to SMA/MTs, SMK/MAK and Satuan Pendidikan Khusus.

### Tim Pelaksana chart (`UW9rT7uQ…png`, 555×578)

- **Pembina:** Lurah/Kepala Desa; Ketua Yayasan
- **Ketua:** Kepala Sekolah
- **Sekretaris I:** Guru Pembina UKS/M
- **Sekretaris II:** Ketua Komite Sekolah
- **Anggota:**
  - Unsur Komite Sekolah/Orang Tua
  - Unsur Petugas UKS/M dan Puskesmas
  - Unsur Guru
  - Unsur Peserta Didik
  - OSIS, Kader UKS, PKK Desa
  - Unsur yang dianggap perlu sesuai kebutuhan

### Other images

- **Trias diagram** (`uRNAybA2…png`): three triangles (Pendidikan Kesehatan, Pelayanan Kesehatan, Pembinaan Lingkungan Sekolah Sehat) around a centre labelled "Manajemen UKS". There is a "Praktik Baik UKS" button graphic that is not a link.
- **Manajemen wheel** (`oRCszRjp…jpeg`): "Manajemen UKS" hub with 5 spokes that repeat the 5 component names from the text.
- **Decorative only:** UKS logo (`psDNO65f…png`), "tujuan" icon (`vUzaaBGG…png`) and a stock dartboard photo (`9rLIf8nU…jpg`).

## 🚩 Flags

1. **Two different Tujuan sentences.**
   - Deskripsi Umum: "meningkatkan kesehatan, mutu pendidikan dan prestasi belajar … tercermin dalam … PHBS dan lingkungan sekolah yang sehat … pertumbuhan dan perkembangan yang optimal".
   - Tujuan page: "meningkatkan mutu pendidikan dan prestasi belajar … dengan meningkatkan PHBS serta menciptakan lingkungan pendidikan yang sehat … pertumbuhan dan perkembangan yang harmonis".
2. **Strata names conflict.** Deskripsi Umum lists strata "minimal, optimal, standar dan paripurna" (in that order). The portal's Stratifikasi data uses Dasar, Madya, Utama, Paripurna. This is the same conflict noted in `sekolah-sehat-curation.md`.
3. **Outdated ministry name.** The Tim Pembina chart says "Kementerian Pendidikan, Kebudayaan, Riset dan Teknologi"; the site itself is Kemendikdasmen.
4. **Chart typos.**
   - "SMA/MTs" should be SMA/MA (MTs is the junior level, already paired with SMP).
   - "KANWIL KEMENAG" is repeated at Kab/Kota level, where the office is the Kantor Kemenag Kab/Kota.
5. **Text copied from a guidebook.** The Manajemen page refers to "bagian dasar hukum buku ini" and "lampiran 8". Neither exists on the site.
6. **Mixed naming.** "UKS" and "UKS/M", and "Tim UKS Kecamatan" and "TP UKS/M Kecamatan", are used interchangeably.
7. **Typos.**
   - "merupakan adalah", "air besih", "serti", "indicator".
   - "keagiatan", "Propinsi", "ditunjukan", "penanggungjawab".
8. **Misused list markup.** In the Evaluasi sources list, the first source is a paragraph and the last bullet ("Evaluasi … menjadi tanggung jawab Tim Pembina UKS/M. Secara umum …") is a statement plus the lead-in to the next list, not a source.
9. **Headings misused for body text.** On the Tim Pelaksana page the definition is an `h2`, and "Fungsi" and "Tugas" are `h1`s.
10. **Stock images without content** (dartboard, "tujuan" icon) and **justified text** throughout.
