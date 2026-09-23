# CMS Portal UKS — Analisis Fase 0

Status: **Fase 0 disetujui 2026-09-23.** Fase 1 berjalan.
Tanggal: 2026-09-23

Repo:
- `uks-fe` — portal publik. React 19 + Vite 8, JS polos, CSS polos, `react-router-dom` v7. **Tidak ada HTTP client sama sekali** — seluruh konten hardcoded di `src/data/*.js`.
- `cms-uks-fe` — CMS admin. Kosong (hanya `.git`). Stack diusulkan di §4.
- `uks-be` — backend. Berisi template Clean Architecture "BaseProject": .NET 10, EF Core 10, **Npgsql**, CQRS tulis tangan, FluentValidation, Serilog, Scalar, JWT + permission.

Sumber yang **tidak** tersedia:
- `portal-uks-cms-analysis.md` — dirujuk di spek dan di halaman 1 `Portal Delta.pdf`, tidak ada di disk.
- `Portal Delta.pdf` — 24 halaman screenshot tanpa teks; dilewati atas instruksi.
- `full-site-uks-fe-2..5` — diabaikan atas instruksi.

Konsekuensi: untuk modul yang belum punya halaman di `uks-fe`, satu-satunya acuan adalah draft SQL + spek §7. Ditandai per modul di bawah.

---

## 1. Temuan pokok

**Draft SQL dan `uks-fe` menggambarkan dua hal berbeda.** `uks-fe` bukan portal yang datanya dipotong dari CMS lama — isinya kurasi manual hasil scrape PROD yang sengaja disederhanakan. `docs/kemitraan-curation.md` mencatat keputusan seperti "Aktivitas Mitra — Dropped from the page and the drawer" dan "Dukungan table: 8 invented rows with invented targets and 'Aktif Berjalan' statuses — removed as fictional".

Akibatnya, tiga hal berlaku di hampir semua modul:

1. **Hanya ada satu halaman detail di seluruh portal**: `/informasi/berita/:idOrSlug` (`src/App.jsx:176`). UPT Bercerita, Praktik Baik, Agenda, Publikasi, Produk Hukum, dan Aplikasi hanya punya list; kartunya `<article>` biasa, bukan `<Link>`. Modal/lightbox dipakai sebagai pengganti detail.
2. **Banyak field FE tidak ada di SQL**, dan sebaliknya banyak kolom SQL tidak dipakai FE.
3. **Sebagian field FE adalah bentuk tampilan, bukan data.** Agenda menyimpan `day: '24'` + `month: 'OKT'` terpisah (bukan tanggal), Buku menyimpan `pages: '114 Halaman'` dan `size: '8.5 MB'` sebagai string, Mitra menyimpan `funding: 'IDR 601.689.860'` sebagai teks.

### Aturan turunan yang saya pakai

Menerjemahkan §3 ke keputusan konkret:

- **Field FE = lantai minimum.** Semua field yang dirender `uks-fe` harus bisa dihasilkan API publik.
- **Draft SQL = strukturnya.** Nama tabel/kolom/relasi dipertahankan selama cukup.
- **Field turunan tampilan disimpan terstruktur, diformat di API publik.** `tanggal_mulai DATE` di DB → API mengembalikan `day: '24'`, `month: 'OKT'`. `ukuran_file BIGINT` (bytes) → API mengembalikan `size: '8.5 MB'`. Dengan begitu komponen `uks-fe` tidak berubah (§4) tanpa menaruh `'114 Halaman'` di kolom database.
- **Kolom SQL yang tidak dipakai FE maupun CMS tidak dihapus**, hanya ditandai (§7 di bawah).

---

## 2. Keputusan yang sudah disetujui

| Topik | Keputusan | Konsekuensi |
|---|---|---|
| DB engine | **SQL Server** | Tukar `Npgsql.EntityFrameworkCore.PostgreSQL` → `Microsoft.EntityFrameworkCore.SqlServer`; ganti Serilog sink Postgres; ubah `docker-compose.yml`; regenerate `InitialCreate`. |
| Primary key | **`Guid`** (ikut base class `Entity`) | `uniqueidentifier` di DB. `Repository<T>` + kedua interceptor sudah dibangun di atas ini. URL publik tetap pakai slug. |
| Naming | **snake_case** via convention di `OnModelCreating` | Entity C# PascalCase, nama DB snake_case. Berlaku global, jadi `Users`→`users`, `RolePermissions`→`role_permissions`. Aman karena belum ada data. |
| Soft delete | **`ISoftDelete` template apa adanya** | Tambah `is_deleted` + `deleted_by` di luar draft SQL. Interceptor + filter sudah jalan, nol kode baru. |
| antislop | **Selama pengerjaan** | `antislop` + `antislop-ui` + `antislop-copywriting` di-load sebelum menulis UI admin. |

### Terjemahan dialek MySQL → SQL Server

Ini **bukan** perubahan skema, hanya penyesuaian dialek. Dicatat terpisah sesuai §3.

| Draft SQL (MySQL) | SQL Server | Catatan |
|---|---|---|
| `INT UNSIGNED AUTO_INCREMENT PK` | `uniqueidentifier` | Sesuai keputusan PK Guid |
| `VARCHAR(n)` | `nvarchar(n)` | Teks Indonesia, panjang dipertahankan |
| `LONGTEXT` / `TEXT` | `nvarchar(max)` | |
| `ENUM('aktif','nonaktif')` | `nvarchar(20)` + `CHECK` | |
| `BOOLEAN` | `bit` | |
| `DATE` | `date` | Dipertahankan |
| `DATETIME` / `TIMESTAMP` | `datetimeoffset` | Template pakai `DateTimeOffset` |
| `DECIMAL(18,2)` | `decimal(18,2)` | |
| `TINYINT UNSIGNED` | `tinyint` | |
| `ON UPDATE CURRENT_TIMESTAMP` | — | Ditangani `AuditableEntityInterceptor` |

Kolom audit yang ditambahkan ke **semua** tabel konten oleh template (`IAuditableEntity`): `created_at datetimeoffset NOT NULL`, `created_by uniqueidentifier NULL`, `updated_at datetimeoffset NULL`, `updated_by uniqueidentifier NULL`. Draft SQL punya `created_at`/`updated_at` NOT NULL; `updated_at` jadi nullable mengikuti template.

### Keputusan atas pertanyaan Fase 0 (2026-09-23)

| # | Keputusan | Dampak |
|---|---|---|
| Q1 | Rich text: konten disimpan sebagai HTML (admin butuh urutan gambar/teks, bold, dll.). `BeritaDetailView` merender HTML tersanitasi. | `body[]` teks polos di FE diganti render HTML; desain tidak berubah. |
| Q2 | Praktik Baik: `level` digabung ke kategori (mis. "Praktik Baik PAUD"). | Tidak ada kolom `predikat`. `kategori_id` saja. |
| Q3 | Filter kategori Publikasi lewat `tag` / `publikasi_tag`. | — |
| Q4 | Tahun kohort Mitra diturunkan dari `tanggal_mulai_mou` / `tanggal_selesai_mou` lewat query. Satu mitra bisa muncul di lebih dari satu tahun. | Tidak ada kolom `tahun_kohort`. Detail tampilan tab masih dikonfirmasi. |
| Q5 | `publikasi.bidang_id` dibuang. | Kolom dihapus dari skema. |
| Q6 | Aktifitas Mitra dilewati. | Tabel `aktifitas_mitra` tidak dibuat. |
| Q7 | Tautan Umum dilewati. Prestasi: pemenang, mekanisme, dan pengumuman semuanya masuk CMS. | Skema Prestasi menunggu pengecekan draft SQL. |
| Q8 | `berita.slider` dibuang. Slider pakai tabel `slider` dengan `berita_id` nullable. | Kolom `berita.slider` dihapus. |
| Q9 | Rename `BaseProject` → `Uks`. | Dikerjakan di Fase 1. |
| Q10 | Konten statis Mitra tetap statis di `mitra.js`. | — |
| Q11 | UI `cms-uks-fe`: shadcn/ui + Tailwind (bukan Mantine). | — |
| Q12 | Tabel status per modul tetap terpisah. | — |
| Q13 | Mitra: pertahankan `is_aktif` dan soft delete. | — |
| Q14 | Penyimpanan file: Azure Blob Storage. | `IFileStorageService` implementasi Azure Blob. |
| Q15 | Satu role Admin dulu. | Seeder membuat role Admin dengan semua permission. |
| Q16 | Tidak ada migrasi data dari CMS lama. | Keputusan PK Guid + snake_case tetap. |
| Q17 | `portal-uks-cms-analysis.md` diterima. | CMS lama: Laravel + Filament, editor TipTap, PK UUID, soft delete. |

---

## 3. Matriks kebutuhan data per modul

Legenda status: **ada** = kolom SQL mencukupi · **+** = perlu ditambah · **≠** = bentuk berbeda, perlu keputusan · **CMS** = dipakai form CMS saja, tidak FE · **FE-only** = dipakai FE, belum ada di SQL

### 3.1 Berita — `src/data/informasi.js` (`realNewsList`, 4 record)

Halaman: list `BeritaPanel.jsx` · detail `BeritaDetailView.jsx` · hero `Hero.jsx` · beranda `Programs.jsx` · terkait (3 artikel) · `SearchView.jsx`
Route: `/informasi/berita` dan `/informasi/berita/:idOrSlug`
Filter: tab kategori (`categoryKey`: all/pendidikan/gss/uks) · cari `title`+`excerpt`+`category` · urut `date` · grup bulan/kategori · rentang tanggal · **tanpa pagination**

| Field FE | Format tampilan | Kolom SQL | Status |
|---|---|---|---|
| `id` | key + lookup | `id` | ada |
| `slug` | URL detail | — | **+** `slug nvarchar(255)` unique (§7.1 sudah antisipasi) |
| `title` | `<h1>`/`<h3>` | `judul` | ada |
| `excerpt` | teaser kartu + lead italic detail | — | **+** `excerpt nvarchar(500)` |
| `image` | `<SafeImage>` | `cover` | ada |
| `category` | pill `section-kicker` | `kategori_berita.kategori` | ada |
| `categoryKey` | nilai filter | `kategori_berita.slug` | ada |
| `date` | `'22 Juli 2026'` | `tanggal_publikasi` | ada (API format) |
| `sourceUrl` | tombol outbound | — | **+** `sumber_url nvarchar(500) null` |
| `author` | teks + ikon | — | **+** `penulis nvarchar(255) null` |
| `body[]` | **array paragraf teks polos** → `<p>` | `konten LONGTEXT` (HTML) | **≠** lihat catatan |
| — | — | `status_id` | CMS |
| — | — | `slider` | **tidak dipakai FE** — lihat §3.11 |

**Catatan `body` vs `konten`.** FE menyimpan array string teks polos dan merendernya sebagai `<p>` biasa — bukan `dangerouslySetInnerHTML`. Rich text editor CMS (§6) menghasilkan HTML dengan bold, link, gambar, tabel. Kalau API menurunkan HTML jadi teks polos, seluruh fitur rich text jadi percuma. Butuh keputusan (§8 Q1).

**Catatan `findArticle`.** `src/data/informasi.js:105` mengembalikan `realNewsList[0]` kalau tidak ketemu — tidak pernah 404. Saat disambung ke API ini harus jadi 404 sungguhan. Perubahan 1 baris di FE, tidak menyentuh desain.

### 3.2 UPT Bercerita — `src/data/informasi.js` (`uptStories`, 8 record)

Halaman: list `UptBerceritaPanel.jsx` saja. **Tidak ada detail** — kartu `<article>`, bukan `<Link>`.
Route: `/informasi/upt` (perhatikan: spek IA di `docs/sitemap-portal-uks.md` menulis `/informasi/upt-bercerita`)
Filter: tab kategori hardcoded `['all','7KAIH','CKG','MBG','UKS']` — **persis sama dengan seed SQL** · cari `title`+`excerpt`+`region`+`category` · grup bulan/kategori/**wilayah**

| Field FE | Kolom SQL | Status |
|---|---|---|
| `title` | `judul` | ada |
| `excerpt` | — | **+** `excerpt nvarchar(500)` |
| `image` | `cover` | ada |
| `category` | `kategori_upt_bercerita.nama` | ada |
| `date` | `tanggal_publikasi` | ada |
| `region` | — | **+** `wilayah nvarchar(255)` — dipakai di kartu (ikon lokasi) **dan** sebagai opsi grup "Wilayah" |
| — | `konten` | CMS (untuk detail page yang direncanakan `content-inventory.md` I-03) |
| — | `slug` | **+** `slug` — dibutuhkan detail page yang direncanakan |
| — | `slider` | tidak dipakai |

### 3.3 Praktik Baik — `src/data/informasi.js` (`bestPracticesList`, 3 record)

Halaman: list `PraktikPanel.jsx` saja. Tidak ada detail. **Tidak ada filter kategori** (`content-inventory.md` I-02 minta ditambah).
Route: `/informasi/praktik`

| Field FE | Format | Kolom SQL | Status |
|---|---|---|---|
| `title` | `<h3>` | `judul` | ada |
| `desc` | paragraf pendek | `konten` | **≠** `desc` bukan artikel. **+** `excerpt`; `konten` untuk detail nanti |
| `icon` | **class Font Awesome** `fa-solid fa-utensils` | — | **+** `ikon nvarchar(100) null` |
| `level` | badge `'SD Model Paripurna'` + grup "Jenjang" | `kategori_id` | ada — digabung ke `kategori_id` (Q2) |
| `date` | tanggal | `tanggal_publikasi` | ada — tapi FE menandai ini **placeholder**, bukan tanggal asli (`informasi.js:108-110`) |
| — | — | `cover` | **tidak dipakai FE** — kartu pakai ikon, bukan gambar |

**Catatan `cover`.** Kolom list CMS di spek §7.3 menampilkan "Gambar", tapi kartu FE sama sekali tidak punya gambar. Kolom dipertahankan, tapi API publik saat ini tidak akan memakainya.

### 3.4 Agenda — `src/data/informasi.js` (`nationalAgendas`, 3 record)

Halaman: list `AgendaPanel.jsx` saja. Tanpa detail, **tanpa filter/urut/cari/pagination apa pun** — `.map()` polos.
Route: `/informasi/agenda`
Catatan: `src/components/shared/DateRangeCalendar.jsx` ada di repo tapi **tidak di-import** oleh modul ini.

| Field FE | Format | Kolom SQL | Status |
|---|---|---|---|
| `day` | `'24'` | `tanggal_mulai` | **turunan** — API format |
| `month` | `'OKT'` | `tanggal_mulai` | **turunan** — API format |
| `title` | `<h3>` | `judul` | ada |
| `location` | + ikon lokasi | `lokasi` | ada |
| `organizer` | teks di atas judul | — | **+** `penyelenggara nvarchar(255)` |
| `status` | pill `'Pendaftaran Dibuka'` | — | **+** `status_pendaftaran nvarchar(100) null` |
| — | — | `slug`, `deskripsi`, `tanggal_selesai`, `kategori_id`, `tautan_daftar`, `terbit_pada` | CMS |
| — | — | `agenda_media` | CMS |

**Penting:** `status` di FE adalah status **pendaftaran event**, bukan status publikasi (Publis/Draf). Dua hal berbeda, jangan disatukan. Record FE tidak punya `id` sama sekali (React key pakai index array).

### 3.5 Publikasi — `src/data/publikasi.js`

Tiga bentuk data **berbeda total** di FE, satu tabel `publikasi` di SQL.

Halaman: `PublikasiView.jsx` (satu file, 4 panel inline) · beranda `Books.jsx` + `Infografis.jsx` (implementasi viewer terpisah, tidak reuse)
Route: `/publikasi/buku` · `/publikasi/infografis` · `/publikasi/video`. Tidak ada detail — modal/lightbox.

| | Buku (`realBooksList`, 5) | Infografis (`defaultInfografis`, 3) | Video (`videoList`, 4) |
|---|---|---|---|
| id | `id` number | **tidak ada** (key = `image`) | `id` string `'vid-1'` |
| gambar | `cover` | `image` | `thumb` |
| file | `pdf` | `image` itu sendiri | `youtubeUrl` |

| Field FE | Kolom SQL `publikasi` | Status |
|---|---|---|
| `title` | `judul` | ada |
| `cover`/`image`/`thumb` | `cover`, `thumbnail` | ada |
| `pdf` | `file_dokumen` | ada |
| `youtubeUrl` | `url_youtube` | ada (FE belum pakai — tombol play mati, tanpa `onClick`) |
| `year` | `tanggal_publikasi` | turunan `YEAR()` |
| `desc` | — | **+** `deskripsi nvarchar(max) null` — tabel `publikasi` **tidak punya kolom deskripsi sama sekali** |
| `pages` `'114 Halaman'` | — | **+** `jumlah_halaman int null` (API format) |
| `size` `'8.5 MB'` | — | **+** `ukuran_file bigint null` (bytes, diisi saat upload; API format) |
| `duration` `'03:45'` | — | **+** `durasi nvarchar(20) null` |
| `channel` `'Pusdatin Kemendikdasmen'` | `penerbit` | ada — semantik cocok |
| `category`/`categoryKey` | — | **≠** lihat catatan |
| — | `jenis_halaman_id` | ada — memisahkan Buku/Infografis/Video |
| — | `jenis_dokumen_id`, `jenjang_id`, `penulis`, `cover_link`, `thumbnail_link`, `file_link`, `link_eksternal`, `kode_embed_youtube` | CMS |
| — | `bidang_id`, `kode_jurnal` | dibuang (Q5) |

**Catatan kategori.** Filter pill Buku di FE adalah "Semua Koleksi / MBG & Gizi / Kesehatan Jiwa / Tata Kelola", dipetakan ke `categoryKey`. Ini kategori **topik**, sementara `jenis_dokumen` (Peraturan Pemerintah, dst.) dan `jenjang` (PAUD/SD/...) bukan topik. Tapi seed tabel `tag` di draft SQL persis topik: "MBG & Gizi Sekolah", "UKS & Sekolah Sehat", "Kesehatan Reproduksi & Penyakit Menular". **Keputusan:** filter pill FE dipetakan ke `tag` lewat `publikasi_tag` (Q3).

### 3.6 Produk Hukum — `src/data/publikasi.js` (`regulationsList`, 3 record)

Bukan modul tersendiri — panel keempat di dalam `PublikasiView.jsx`.
Route: `/publikasi/regulasi`. Tanpa filter/urut/cari/pagination.

| Field FE | Format | Kolom SQL | Status |
|---|---|---|---|
| `title` | `<h3>` | `nama_dokumen` | ada |
| `badge` | pill `'SKB 4 MENTERI'` | `jenis_dokumen.nama` | ada — **perlu seed `SKB 4 Menteri`**, belum ada di seed draft |
| `number` | `'Nomor 03/KB/2022, Nomor HK.01.08/...'` | — | **+** `nomor_dokumen nvarchar(500) null` |
| `size` | `'2.4 MB'` di label tombol | — | **+** `ukuran_file bigint null` |
| `file` | `href download` | `file_dokumen` | ada |
| `code` | React key saja, tidak dirender | — | tidak perlu |
| — | — | `jumlah_dilihat`, `jumlah_diunduh` | **nol hit di seluruh `src/`** — counter dipertahankan, FE belum menampilkannya |
| — | — | `tanggal_dokumen` | CMS (list CMS menampilkan Tahun) |

Ikon di FE **hardcoded** `fa-solid fa-scale-balanced` untuk semua record, tidak bergantung `badge`.

**Gap dari docs:** `content-inventory.md` U-01 mencatat daftar Produk Hukum yang sebenarnya berisi **18 item tersumber**, milik halaman GSS "Bahan Advokasi" (`/uksm/sekolah-sehat#bahan-advokasi`) yang **belum dibangun sama sekali** — tidak ada route `sekolah-sehat` di `App.jsx`. Yang ada sekarang hanya 3 item mock, dan ketiga `file`-nya menunjuk ke `buku1/2/3.pdf` (PDF buku yang di-relabel, bukan dokumen hukum asli).

### 3.7 Mitra — `src/data/mitra.js`

Satu halaman scroll `/mitra`, 4 seksi. **Tidak ada detail page** — nama mitra sengaja teks polos, bukan link (komentar kode `MitraKami.jsx:25`).

Empat bentuk data:
- `partnersByYear`: `[{id, label, partners: [string]}]` — **partner hanyalah string nama**, tanpa logo/url/kategori
- `partnerSupport`: `[{id, name, unit, period, collaboration[], activities[], activitiesOrdered, beneficiaries[], locations[], funding}]`
- `partnersWithoutRecord`: `[{name, note?}]`
- Konten statis: `kerjaSamaGroups`, `kerjaSamaRules`, `kerjaSamaBenefits`, `mitraSectors`, `mitraRegistration`, `mitraFields`, `mitraSupportTypes`

| Field FE | Kolom SQL | Status |
|---|---|---|
| nama partner | `mitra.nama` | ada |
| `label` tahun (`'2025'`, `'2023-2024'`, `'2022'`) | — | turunan dari tanggal MoU (Q4) |
| `unit` | `dukungan_mitra.unit_kerja` | ada |
| `period` `'Maret s.d. November 2025'` | `periode_mulai` + `periode_selesai` | turunan — API format |
| `collaboration[]` | `dukungan_mitra_bentuk_kolaborasi` | ada |
| `activities[]` | `dukungan_mitra_kegiatan` | ada |
| `activitiesOrdered` | — | **+** `kegiatan_berurutan bit` — mengontrol `<ol>` vs `<ul>` |
| `beneficiaries[]` | `penerima_manfaat TEXT` (tunggal) | **≠** FE array, dirender sebagai list → **+** tabel anak `dukungan_mitra_penerima_manfaat` |
| `locations[]` | `lokasi VARCHAR` (tunggal) | **≠** sama → **+** tabel anak `dukungan_mitra_lokasi` |
| `funding` `'IDR 601.689.860'` | `pembiayaan decimal(18,2)` + `mata_uang` | struktur SQL dipertahankan, API format ulang |
| `note` (partnersWithoutRecord) | — | **+** `mitra.catatan nvarchar(500) null` |
| urutan tampil | — | **+** `mitra.urutan int` (§7.7 mengantisipasi) |
| — | `logo`, `tipe_logo` | **FE tidak punya logo sama sekali** — sengaja dibuang (`kemitraan-curation.md:40`). `content-inventory.md` B-14 menandai logo grid sebagai "decide". Kolom dipertahankan. |
| — | `nama_lengkap`, `website`, `alamat`, `deskripsi`, `bidang_usaha`, `is_aktif` | CMS |

**Catatan `funding`.** FE sengaja **tidak** mem-parse nilai ini — komentar `MitraSupportRecord.jsx:17-18` menyebut nilainya campur IDR/USD dan "tidak untuk dibandingkan". Menyimpan `decimal` + `mata_uang` tetap benar; API memformat ulang jadi string identik. Tidak ada grafik/agregasi.

**Catatan tahun kohort.** `'2023-2024'` diturunkan dari `tanggal_mulai_mou`/`tanggal_selesai_mou` lewat query, bukan kolom tersimpan; satu mitra boleh muncul di lebih dari satu tahun (Q4).

**Konten statis.** `kerjaSamaGroups`, `mitraSectors`, `mitraRegistration`, dll. adalah isi halaman, bukan record CMS. Belum diputuskan apakah ikut di-CMS-kan (§8 Q10).

### 3.8 Aktifitas Mitra — **tidak ada di `uks-fe`**

Tidak ada komponen, route, maupun data file. `grep aktifitas|aktivitas mitra` di `src/` = nol hit. Dibuang **secara sengaja**: `content-inventory.md:166` M-06 disposisi "remove", alasan "Prod only listed the other 4 Mitra pages"; `kemitraan-curation.md:10` "PROD has no activity content".

Draft SQL punya tabel `aktifitas_mitra` lengkap.

**Keputusan:** dilewati (Q6).

### 3.9 Prestasi / Lomba — di bawah **Program**, bukan Informasi

Tidak ada `/informasi/prestasi`. Yang ada: seksi `sec-prog-prestasi` di `/program/prestasi`.
File: `PrestasiSection.jsx`, `PrestasiShowcase.jsx`, `PrestasiSlider.jsx`, `PrestasiSlide.jsx`

Struktur FE **sama sekali bukan pola artikel** yang diasumsikan spek §7.8:
- Lomba (`program.js`): `{id, year, title, status, faces: {mekanisme, pengumuman, showcase}}` — tiap `face` punya bentuk berbeda (`lead`, `flyers[]`, `tujuan`, `facts[]`, `competitions[]`, `downloads[]`, `note`, `groups`, `source`, `competitionId`)
- Pemenang (`prestasi.js`): `winnersByCompetition[competitionId]` → `{school, kabkota, provinsi, jenjang, kategori, youtube, social}`. 114 baris untuk `gala-kreasi-2024`; lomba lain `showcase: null`.
- Tab mekanisme/pengumuman/showcase murni `useState`, **tidak ada di URL**. Filter: satu `<select>` jenjang. Tanpa tanggal — pemenang tidak punya field tanggal sama sekali.
- `youtube`/`social` di-parse regex jadi iframe embed (`src/utils/prestasiEmbed.js`), mendukung YouTube Shorts, Instagram Reel, TikTok.

Usulan skema (butuh persetujuan, §8 Q7):
```
lomba            id, slug, judul, tahun, status, mekanisme_html, pengumuman_html,
                 urutan, is_deleted, deleted_at, deleted_by, <audit>
lomba_media      id, lomba_id FK, jenis ('flyer'|'unduhan'), url, label, urutan, <audit>
lomba_pemenang   id, lomba_id FK, sekolah, kabkota, provinsi, jenjang, kategori,
                 url_youtube, url_sosial, urutan, <audit>
```

**Rekomendasi saya: pisahkan biayanya.** `lomba_pemenang` jelas layak di-CMS-kan — 114 baris, berubah tiap tahun, bentuknya tabel datar. Sedangkan `faces` (mekanisme/pengumuman) sangat terstruktur dan bersarang; memaksanya jadi dua kolom HTML berarti `facts[]`, `groups`, `competitions[]` kehilangan struktur, dan `PrestasiSection.jsx` harus dirombak — itu melanggar §4. Usul: **pemenang masuk CMS, mekanisme/pengumuman tetap statis di `program.js` untuk sekarang.**

**Keputusan:** pemenang, mekanisme, dan pengumuman masuk CMS (Q7). Skema final menunggu pengecekan draft SQL.

### 3.10 Tautan — dua bentuk, keduanya tidak muat usulan §7.8

Spek §7.8 mengusulkan satu tabel `tautan` dengan `nama, url, logo/ikon, urutan, is_aktif`. Struktur FE butuh dua tingkat.

**(a) Dropdown "Tautan" di navbar** — `src/data/site.js` (`tautanGroups`), dirender `NavTautanDropdown.jsx`. Menu saja, tanpa halaman. 4 grup / 11 link.
`[{group, title, icon, links: [{label, url}]}]` — `title` ada di data tapi **tidak pernah dirender**.

**(b) "Kementerian Terkait" di halaman Kontak** — `src/data/site.js` (`ministries`), dirender `KontakView.jsx:90-118`. Logo wall 4 ubin.
`{id, name, short, unit, logo, url}` — `logo` **`null` untuk keempatnya**, fallback ke ikon placeholder. Ini gap B-15 di `content-inventory.md`.

Usulan skema (butuh persetujuan, §8 Q7):
```
tautan_grup   id, nama, judul, ikon, urutan, is_aktif, <audit>
tautan        id, grup_id FK, label, url, urutan, is_aktif, <audit>
kementerian   id, nama, nama_singkat, unit, logo, url, urutan, is_aktif, <audit>
```
Dipisah karena isinya memang beda: (a) daftar link teks bertingkat, (b) ubin logo dengan `unit`.

**"Tautan Umum" tidak punya padanan apa pun di `uks-fe`.** Perlu klarifikasi apa yang dimaksud (§8 Q7).

**Keputusan:** Tautan Umum dilewati (Q7). Tautan Kementerian tetap.

**Anchor menggantung:** `sec-home-tautan`, `sec-home-mitra`, `sec-home-aplikasi`, `sec-home-video` terdaftar di drawer navigasi (`navigation.js:22-25`) tapi **tidak ada elemennya di `BerandaView.jsx`** — kliknya tidak scroll ke mana pun. Tercatat di `sitemap-portal-uks.md:90`.

### 3.11 Slider — konflik tiga arah

| Sumber | Bentuk |
|---|---|
| Tabel `slider` (draft SQL) | `judul, gambar, urutan, is_aktif` — berdiri sendiri |
| Kolom `berita.slider` (draft SQL) | boolean; spek §7.1 minta endpoint `slider = true` |
| `heroSlides` (`src/data/site.js`) | **array campuran**: sebagian `{slug}` yang merujuk `realNewsList`, sebagian slide berdiri sendiri `{id, image, category, date, title, excerpt}` |

`Hero.jsx:96-121` memakai `id`, `image`, `title`, `excerpt`, dan `slug` (slug → tombol "Baca Selengkapnya"; slide tanpa slug tidak punya CTA). `category` dan `date` ada di data tapi tidak dirender.

Usulan: **buang `berita.slider`**, perluas tabel `slider`:
```
slider   id, judul, gambar, excerpt, berita_id FK null, urutan, is_aktif, <audit>
```
`berita_id` terisi → judul/gambar/excerpt diambil dari berita (persis perilaku `{slug}`). `berita_id` null → slide berdiri sendiri. Ini memodelkan `heroSlides` apa adanya.

**Keputusan:** `berita.slider` dibuang (Q8).

### 3.12 Aplikasi — `src/data/site.js` (`appsList`)

Halaman: `AplikasiPanel.jsx` di `/informasi/aplikasi`. Tanpa detail, tanpa filter.

| Field FE | Kolom SQL | Status |
|---|---|---|
| `name` | `nama` | ada |
| `publisher` | `penerbit` | ada |
| `description` | `deskripsi` | ada |
| `icon` | `logo` | ada |
| `featuredOnHome` | `tampil_beranda` | ada — **flag mati di FE**, tidak pernah dibaca komponen mana pun |
| `links[]` `[{store, url, icon}]` | `tautan_unduh` (tunggal) | **≠** FE multi-store → **+** tabel anak `aplikasi_tautan (aplikasi_id, store, url, ikon, urutan)` |
| `badge` `'KESEHATAN REMAJA'` | — | **+** `badge nvarchar(100) null` |
| `tagline` | — | **+** `tagline nvarchar(255) null` |
| `color`, `bgColor` | — | **+** `warna nvarchar(20)`, `warna_latar nvarchar(20)` — FE merender inline style per record |
| — | `qr_code` | **nol hit di seluruh `src/`** — dipertahankan sesuai spek |

---

## 4. Usulan setup

### 4.1 `uks-be` — diikuti apa adanya (tidak ada usulan)

Template sudah menetapkan konvensi. Semua ini dipakai tanpa perubahan:

- 4 project Clean Architecture, `.slnx`, Central Package Management (`Directory.Packages.props`)
- CQRS tulis tangan: `ICommand`/`ICommandHandler`/`IQuery`/`IQueryHandler`, auto-register lewat refleksi di `ApplicationServiceRegistration`
- Struktur folder `Features/<Modul>/{Commands|Queries}/<Operasi>/` — 3 file per operasi (Command/Handler/Validator)
- `Result` / `Result<T>`, `PagedResult<T>`
- `ValidationFilter` global + FluentValidation
- `GlobalExceptionHandler` + `ProblemDetails`
- `ApiController.HandleResult`, route `api/v{version:apiVersion}/[controller]`
- `[HasPermission("Modul.Aksi")]` + `PermissionAuthorizationPolicyProvider`
- `IFileStorageService` / `LocalFileStorageService`
- Serilog, Scalar (bukan Swashbuckle), API versioning, rate limiter
- `Entity` (Guid), `IAuditableEntity`, `ISoftDelete`, `AuditableEntityInterceptor`, `SoftDeleteInterceptor`
- Mapping DTO manual di handler (tidak ada Mapster/AutoMapper) — **tetap manual**
- Migration di `BaseProject.Infrastructure`, dijalankan dengan `--project BaseProject.Infrastructure --startup-project BaseProject.Api`

### 4.2 `uks-be` — yang perlu diubah/ditambah

| # | Perubahan | Alasan |
|---|---|---|
| 1 | Provider Npgsql → SqlServer; Serilog sink Postgres → MSSqlServer (atau Console+File saja); `docker-compose.yml` → mssql; regenerate `InitialCreate` | Keputusan §2 |
| 2 | Convention snake_case global di `OnModelCreating` (~20 baris, tanpa package baru) | Keputusan §2 |
| 3 | **Seeder** — template tidak punya sama sekali. Permission per modul, role Admin, user admin pertama, master data (kategori/status/jenis/jenjang/tag) | Tanpa ini tidak ada yang bisa login: semua endpoint butuh permission claim, jadi admin pertama harus di-INSERT manual ke DB |
| 4 | Query filter soft delete dipasang otomatis untuk semua `ISoftDelete` di `OnModelCreating` | Template memasangnya satu per satu di tiap `Configuration` — untuk ~15 entity CMS itu berulang dan mudah terlewat |
| 5 | CORS: ganti `AllowAnyOrigin()` dengan daftar origin dari config (`uks-fe` + `cms-uks-fe`) | Sekarang terbuka penuh |
| 6 | Connection string + `Jwt:SecretKey` pindah ke user-secrets; hapus dari `appsettings.json` | `appsettings.json` saat ini memuat kredensial plaintext dan JWT secret fallback hardcoded |
| 7 | `IRepository<T>.Query()` yang mengembalikan `IQueryable<T>` | `GetPagedAsync(page, size)` tidak mendukung filter/sort/search. Semua list CMS butuh ketiganya. Alternatifnya menulis metode repository per kombinasi filter |
| 8 | Tambah `Result.NotFound(...)` | `ApiController.HandleFailure` sekarang mendeteksi 404 lewat `error.Contains("does not exists.")` — rapuh. Perubahan kecil, bukan ganti sistem |
| 9 | Helper: slug generator + cek unik, upload (validasi tipe/ukuran), formatter ukuran file & tanggal Indonesia | Dibutuhkan lintas modul |
| 10 | **Package baru: `Ganss.Xss` (HtmlSanitizer)** | §6 mewajibkan sanitasi HTML rich text di backend. Tidak ada padanannya di .NET BCL. Satu-satunya dependency baru yang saya usulkan untuk backend |

**Verifikasi skema** (sesuai §5): setelah migration awal, jalankan `dotnet ef migrations script` dan bandingkan dengan draft SQL. Selisihnya harus sama persis dengan tabel §5 di bawah, ditambah terjemahan dialek §2.

**Rename `BaseProject`.** Repo di-clone langsung, bukan lewat `dotnet new`, jadi `sourceName` di `.template.config/template.json` belum berjalan. Butuh keputusan (§8 Q9).

### 4.3 `cms-uks-fe` — usulan stack (repo kosong)

`uks-fe` memakai React 19 + Vite + JS polos + CSS polos + tanpa state library. Itu cukup untuk portal statis, tidak cukup untuk CMS dengan form 20+ field, datagrid, dan upload.

| Kebutuhan | Usulan | Alasan |
|---|---|---|
| Build + framework | Vite + React 19 | Sama dengan `uks-fe` |
| Bahasa | **TypeScript** | Form CMS punya puluhan field dan DTO backend; tipe mencegah salah nama field. Repo berbeda, boleh beda dari `uks-fe` |
| Routing | `react-router-dom` v7 | Sama dengan `uks-fe` |
| Data fetching | TanStack Query | Cache + invalidasi setelah mutasi. Tidak ada padanannya di `uks-fe` karena statis |
| HTTP | axios | Interceptor untuk JWT + refresh |
| Form + validasi | React Hook Form + Zod | Validasi client sesuai §6 |
| UI + datagrid | **shadcn/ui + Tailwind** | Keputusan disetujui (Q11) |
| Rich text | **TipTap** | Memenuhi seluruh daftar §6: undo/redo, heading, list, link, gambar, video embed, alignment, line height, warna, highlight, tabel, fullscreen, mode source HTML |

---

## 5. Tabel Perubahan Skema

Terhadap draft SQL. Terjemahan dialek (§2) **tidak** termasuk di sini.

### 5.1 Berlaku untuk semua tabel

| Tabel | Kolom | Jenis | Alasan | Dampak |
|---|---|---|---|---|
| semua konten | `is_deleted bit`, `deleted_by uniqueidentifier null` | tambah | Keputusan §2 — pakai `ISoftDelete` template | 2 kolom di luar draft SQL per tabel; interceptor + filter gratis |
| semua | `created_by`, `updated_by uniqueidentifier null` | tambah | `IAuditableEntity` template | Audit siapa yang mengubah |
| semua | `updated_at` jadi nullable | ubah | Template: `UpdatedAt` = `DateTimeOffset?` | Draft SQL NOT NULL |

### 5.2 Per modul

| Tabel | Kolom | Jenis | Alasan (komponen `uks-fe`) | Dampak |
|---|---|---|---|---|
| `berita` | `slug nvarchar(255)` unique | tambah | `pathForArticle` (`routes.js:47`) membangun URL dari slug | Endpoint detail publik via slug |
| `berita` | `excerpt nvarchar(500)` | tambah | `BeritaPanel` kartu, `Hero.jsx` `<p>`, lead italic `BeritaDetailView` | Field wajib di form CMS |
| `berita` | `sumber_url nvarchar(500) null` | tambah | Tombol outbound `BeritaDetailView` | — |
| `berita` | `penulis nvarchar(255) null` | tambah | Baris penulis `BeritaDetailView` | — |
| `berita` | `slider` | hapus (Q8) | Tidak dipakai FE; hero pakai `heroSlides` terpisah | Lihat §3.11 |
| `upt_bercerita` | `slug nvarchar(255)` unique | tambah | Detail page direncanakan (`content-inventory.md` I-03) | — |
| `upt_bercerita` | `excerpt nvarchar(500)` | tambah | Teaser kartu `UptBerceritaPanel` | — |
| `upt_bercerita` | `wilayah nvarchar(255)` | tambah | Footer kartu (ikon lokasi) + opsi grup "Wilayah" + field pencarian | Field wajib di form CMS |
| `praktik_baik` | `excerpt nvarchar(500)` | tambah | `desc` di `PraktikPanel` bukan artikel | — |
| `praktik_baik` | `ikon nvarchar(100) null` | tambah | `<i className={bp.icon}>` — kartu pakai ikon FA, bukan gambar | — |
| `praktik_baik` | `cover` | **tandai** | FE tidak merender gambar sama sekali | Dipertahankan untuk kolom "Gambar" di list CMS |
| `agenda` | `penyelenggara nvarchar(255)` | tambah | Teks di atas judul, `AgendaPanel` | — |
| `agenda` | `status_pendaftaran nvarchar(100) null` | tambah | Pill `'Pendaftaran Dibuka'` — **bukan** status publikasi | Field terpisah di form CMS |
| `publikasi` | `deskripsi nvarchar(max) null` | tambah | `desc` di grid `/publikasi/buku` | Tabel `publikasi` tidak punya kolom deskripsi sama sekali |
| `publikasi` | `jumlah_halaman int null` | tambah | `'114 Halaman'` di kartu buku | API memformat |
| `publikasi` | `ukuran_file bigint null` | tambah | `'8.5 MB'` di kartu buku + `DocViewerModal` meta | Diisi saat upload |
| `publikasi` | `durasi nvarchar(20) null` | tambah | Badge `'03:45'` di kartu video | — |
| `publikasi` | `bidang_id`, `kode_jurnal` | hapus (Q5) | Nol hit di FE, tidak ada di form CMS | Kolom dihapus dari skema |
| `produk_hukum` | `nomor_dokumen nvarchar(500) null` | tambah | Paragraf nomor peraturan, `RegulasiPanel` | Field wajib di form CMS |
| `produk_hukum` | `ukuran_file bigint null` | tambah | Label tombol `'Unduh (2.4 MB)'` | — |
| `jenis_dokumen` | seed `SKB 4 Menteri` | tambah | `badge: 'SKB 4 MENTERI'` di FE | Seed |
| `mitra` | `urutan int` | tambah | FE menampilkan mitra dalam urutan array tetap | Admin bisa mengatur urutan |
| `mitra` | `catatan nvarchar(500) null` | tambah | `note` di `partnersWithoutRecord` | — |
| `dukungan_mitra` | `kegiatan_berurutan bit` | tambah | `activitiesOrdered` → `<ol>` vs `<ul>` | — |
| `dukungan_mitra` | `penerima_manfaat` → tabel anak | ubah | `beneficiaries[]` array dirender sebagai list | Konsisten dengan 2 tabel anak yang sudah ada |
| `dukungan_mitra` | `lokasi` → tabel anak | ubah | `locations[]` array | idem |
| `aplikasi` | `badge`, `tagline`, `warna`, `warna_latar` | tambah | Pill + tagline + inline style per kartu, `AplikasiPanel` | — |
| `aplikasi` | `tautan_unduh` → tabel `aplikasi_tautan` | ubah | `links[]` multi-store dengan label + ikon | Repeater di form CMS |
| `aplikasi` | `qr_code` | **tandai** | Nol hit di FE | Dipertahankan sesuai spek |
| `slider` | `excerpt`, `berita_id FK null` | tambah | `heroSlides` campuran referensi berita + slide mandiri | Menunggu Q8 |
| — | `lomba`, `lomba_media`, `lomba_pemenang` | tabel baru | §3.9 | Menunggu Q7 |
| — | `tautan_grup`, `tautan`, `kementerian` | tabel baru | §3.10 | Menunggu Q7 |

### 5.3 Kolom draft SQL yang tidak dipakai FE maupun CMS

Tidak dihapus, hanya ditandai (§3):

`publikasi.kode_jurnal` · `aplikasi.qr_code` · `produk_hukum.jumlah_dilihat` · `produk_hukum.jumlah_diunduh` · `upt_bercerita.slider` · `mitra.bidang_usaha` · `mitra.nama_lengkap` · `mitra.alamat`

Catatan: `jumlah_dilihat`/`jumlah_diunduh` dipakai spek §7.6 sebagai counter read-only yang bertambah lewat endpoint publik — jadi dipertahankan meski FE belum menampilkannya.

---

## 6. Rencana implementasi

**Fase 1 — Fondasi**
1. `uks-be`: tukar provider ke SQL Server, convention snake_case, base entity + filter soft delete otomatis, seeder (permission/role/admin/master), CORS, user-secrets, `IRepository.Query()`, `Result.NotFound`
2. `uks-be`: helper — slug generator + cek unik, upload service, HTML sanitizer (`Ganss.Xss`), formatter tanggal Indonesia & ukuran file
3. `cms-uks-fe`: scaffold + layout/sidebar + auth (login, simpan token, guard route)
4. `cms-uks-fe`: komponen reusable — halaman list (filter panel, chip filter aktif, search, toggle kolom, sort, pagination, bulk select), halaman form bertab, input slug otomatis, rich text editor, uploader + preview, toggle status, dialog konfirmasi hapus
5. CRUD generik tabel master

Gerbang: `dotnet build` lolos, migration terpasang di DB lokal, `dotnet ef migrations script` cocok dengan §5, build `cms-uks-fe` lolos.

**Fase 2 — Per modul**

Urutan: **Berita** → **berhenti untuk review** → UPT Bercerita → Praktik Baik → Agenda → Publikasi → Produk Hukum → Mitra → Aplikasi → Slider → Tautan → Prestasi (terakhir, lingkup menunggu Q7).

Per modul: entity + migration + seed master → API admin → UI admin → API publik → integrasi `uks-fe`.

**Catatan integrasi `uks-fe`.** Repo ini tidak punya HTTP client sama sekali. Fase 2 modul pertama harus menambahkan lapisan fetch minimal dan mengganti isi `src/data/*.js` dengan pemanggilan API — tanpa menyentuh komponen. Bentuk response API publik dibuat persis menyerupai struktur data yang ada sekarang (termasuk field turunan seperti `day`/`month`/`size`), supaya perubahan di komponen nol.

---

## 7. Yang perlu dikonfirmasi

| # | Pertanyaan | Rekomendasi saya | Jawaban |
|---|---|---|---|
| Q1 | **Berita `body` vs `konten`.** FE menyimpan array paragraf teks polos dan merender `<p>` biasa. Rich text editor CMS menghasilkan HTML. Kalau API menurunkan jadi teks polos, fitur rich text jadi percuma. | Ubah `BeritaDetailView` memakai HTML tersanitasi (perubahan render, **bukan** perubahan desain). Alternatif: terima kehilangan rich text. | Konten disimpan sebagai HTML; `BeritaDetailView` merender HTML tersanitasi. |
| Q2 | **Praktik Baik `level`.** `'SD Model Paripurna'` = jenjang + predikat. Seed `kategori_praktik_baik` hanya mencakup jenjang. | `kategori_id` untuk jenjang + kolom `predikat nvarchar(100) null`. Atau satu kolom `level` bebas kalau nilainya memang tidak terstruktur. | `level` digabung ke kategori (mis. "Praktik Baik PAUD"); tidak ada kolom `predikat`. |
| Q3 | **Filter kategori Publikasi.** Pill FE ("MBG & Gizi", "Kesehatan Jiwa", "Tata Kelola") adalah topik, tidak cocok dengan `jenis_dokumen` maupun `jenjang`. Seed tabel `tag` justru persis topik. | Petakan pill FE ke `tag` lewat `publikasi_tag`. | Filter kategori Publikasi lewat `tag` / `publikasi_tag`. |
| Q4 | **Tahun kohort Mitra.** `'2023-2024'` tidak bisa diturunkan dari tanggal MoU. Satu mitra bisa muncul di >1 tahun? | Kalau bisa: tabel M2M `mitra_kohort`. Kalau tidak: kolom `tahun_kohort nvarchar(20)`. Perlu jawaban Anda. | Tahun kohort diturunkan dari `tanggal_mulai_mou` / `tanggal_selesai_mou` lewat query; satu mitra bisa muncul di lebih dari satu tahun; tidak ada kolom `tahun_kohort`. |
| Q5 | **`bidang_id`** di `publikasi` merujuk tabel apa? Tidak ada tabel `bidang` di mana pun, dan nol hit di FE. | Buang, atau sebutkan tabel tujuannya. | `publikasi.bidang_id` dibuang. |
| Q6 | **Aktifitas Mitra** dibuang secara sengaja dari portal ("PROD has no activity content"). Draft SQL punya tabelnya. | Lewati modulnya. Kalau tetap dibuat, CMS-nya akan mengisi halaman yang belum ada. | Aktifitas Mitra dilewati; tabel `aktifitas_mitra` tidak dibuat. |
| Q7 | **Skema Prestasi/Lomba, Tautan Umum, Tautan Kementerian** — usulan saya di §3.9 dan §3.10. "Tautan Umum" tidak punya padanan apa pun di `uks-fe`; apa yang dimaksud? | Prestasi: pemenang masuk CMS, mekanisme/pengumuman tetap statis. Tautan: 3 tabel terpisah, bukan 1 tabel + kolom `jenis`. | Tautan Umum dilewati. Prestasi: pemenang, mekanisme, dan pengumuman semuanya masuk CMS; skema final menunggu pengecekan draft SQL. |
| Q8 | **Slider.** Tabel `slider` vs kolom `berita.slider` vs `heroSlides` campuran. | Satu tabel `slider` dengan `berita_id` nullable; buang `berita.slider`. | `berita.slider` dibuang. Slider pakai tabel `slider` dengan `berita_id` nullable. |
| Q9 | **Rename `BaseProject`?** Repo di-clone langsung, `sourceName` template belum berjalan. | Rename ke `Uks` sekarang, sebelum ada 15 modul yang menyebut namespace lama. | Rename `BaseProject` → `Uks`. Dikerjakan di Fase 1. |
| Q10 | **Konten statis Mitra** (`kerjaSamaGroups`, `mitraSectors`, `mitraRegistration`, dll.) ikut di-CMS-kan? | Jangan. Itu isi halaman yang hampir tidak berubah; biarkan di `mitra.js`. | Konten statis Mitra tetap statis di `mitra.js`. |
| Q11 | **UI library `cms-uks-fe`**: Mantine (usulan saya), shadcn/ui + Tailwind, Ant Design, atau MUI? Keputusan besar dan sulit dibalik. | Mantine — DataTable, form, modal, date picker, file input sudah termasuk. | UI `cms-uks-fe`: shadcn/ui + Tailwind (bukan Mantine). |
| Q12 | **Tabel status per modul** (`status_berita`, `status_upt_bercerita`, ...) isinya identik (Publis/Draf) dan tidak punya relasi lain. Tetap terpisah sesuai draft SQL, atau satu kolom `status`? | Tetap terpisah, sesuai §3 (jangan normalisasi ulang demi kerapian). Cukup sadar ini duplikasi. | Tabel status per modul tetap terpisah. |
| Q13 | **`is_aktif` vs `deleted_at`.** Mitra & Aktifitas Mitra pakai `is_aktif`, modul lain pakai soft delete. | Maknanya beda — "nonaktif" ≠ "dihapus". Pertahankan **keduanya** di Mitra: `ISoftDelete` untuk hapus, `is_aktif` untuk toggle tampil. | Mitra: pertahankan `is_aktif` dan soft delete. |
| Q14 | **`cover` vs `cover_link`** (dan pasangan thumbnail/file): upload lokal vs URL eksternal? Lalu file disimpan di mana? | `cover` = path hasil upload, `cover_link` = URL eksternal/override. Template hanya punya `LocalFileStorageService` (`wwwroot/uploads`) — cukup untuk dev. Untuk produksi perlu keputusan Anda. | Penyimpanan file: Azure Blob Storage. `IFileStorageService` implementasi Azure Blob. |
| Q15 | **Auth.** Template sudah punya JWT + permission per-modul (`"Modul.Aksi"`). Satu role Admin, atau permission dibedakan per modul? | Satu role Admin dulu; permission per modul sudah ada infrastrukturnya, bisa dipecah kapan saja tanpa ubah kode. | Satu role Admin dulu. Seeder membuat role Admin dengan semua permission. |
| Q16 | **Migrasi data dari CMS lama** diperlukan? | Kalau ya, keputusan naming snake_case & PK Guid perlu ditinjau ulang sekarang, bukan nanti. | Tidak ada migrasi data dari CMS lama. Keputusan PK Guid + snake_case tetap. |
| Q17 | **`portal-uks-cms-analysis.md`** dirujuk spek dan halaman 1 PDF, tidak ada di disk. Ada salinannya? | Kalau ada, kirimkan — kemungkinan memuat batasan yang belum saya lihat. | `portal-uks-cms-analysis.md` diterima. CMS lama: Laravel + Filament, editor TipTap, PK UUID, soft delete. |
