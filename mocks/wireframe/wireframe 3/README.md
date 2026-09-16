# Wireframe 3 — 3 Dedicated UKS/M Pages & Left-Edge Navigation Drawer

**Lokasi File:** `mocks/wireframe/wireframe 3/index.html`  
**Sumber Spesifikasi:** [`menu-uksm-spec-mockup.md`](../../../menu-uksm-spec-mockup.md) (Production https://uks.kemendikdasmen.go.id/)  
**Status Desain:** Wireframe Blueprint Komprehensif (Low-Fidelity Teknis, Dot-Grid Neutral, Emerald Accent)

---

## 1. Arsitektur Navigasi: 3 Kluster Dedikasi & Edge Hover Drawer

### Mengapa Bukan Mega-Sheet Raksasa 26 Item Sekaligus?
Menampilkan 26 item sekaligus dalam satu popover raksasa (*monolithic mega-sheet*) menimbulkan kebingungan visual (*cognitive overload*) dan membuat halaman terasa seperti tumpukan tak berujung.

### Solusi Desain yang Diimplementasikan:
1. **Dropdown Kompak 3 Kluster (Di Bawah Navbar `UKS/M ▾`)**:
   - Saat pengguna mengklik `UKS/M`, yang terbuka adalah pemilih ringkas 3 kartu:
     - 🏛️ **1. Profil & Tata Kelola** (6 sub-menu)
     - 🛡️ **2. TRIAS UKS/M** (16 indikator L3)
     - 🍏 **3. Sekolah Sehat (GSS)** (8 sub-menu)
   - Setiap kartu membawa pengguna ke halaman tersendiri (*dedicated view*).
2. **3 Halaman Dedikasi Terpisah**:
   - **Halaman 1: Profil & Tata Kelola** (`#view-uksm-profil`):
     Deskripsi Umum, Tujuan, Sasaran, Bagan Personel Terstruktur (Tim Pembina & Pelaksana Sekolah), Matriks Stratifikasi UKS/M 4 Strata [Scope Baru], dan Siklus Manajemen UKS.
   - **Halaman 2: TRIAS UKS/M** (`#view-uksm-trias`):
     Fokus mendalam pada 3 pilar: (1) Pendidikan Kesehatan (7 L3), (2) Pelayanan Kesehatan (4 L3), dan (3) Pembinaan Lingkungan (5 L3) dengan kartu indikator terinci.
   - **Halaman 3: Sekolah Sehat (GSS)** (`#view-uksm-gss`):
     Konsepsi GSS, alur 5 Sehat terpadu (Bergizi, Fisik, Imunisasi, Jiwa, Lingkungan), serta repositori dokumen unduhan Bahan Advokasi GSS.
3. **Left-Edge Hover Navigation Drawer ("Kotak Navigasi Tepi Kiri")**:
   - Di tepi kiri layar terdapat tab pegangan halus `[ ◨ DAFTAR ISI ]`.
   - Mengarahkan kursor (*hover*) ke tepi kiri layar akan memunculkan *drawer* navigasi daftar isi halaman secara mulus.
   - Di dalam *drawer*, pengguna dapat melompat ke sub-bagian mana saja dengan *smooth-scroll*.
   - Dilengkapi tombol **`[ 📌 Pin Menu ]`**: pengguna dapat mengunci *drawer* agar tetap terbuka di sisi kiri layar saat membaca, atau membiarkannya otomatis tersembunyi (*autohide*) saat mouse bergeser keluar.
   - Dilengkapi tombol navigasi cepat untuk berpindah antar-3 kluster UKS/M.
4. **Top Sibling Subnav Bar**:
   - Di bagian atas ketiga halaman UKS/M, tersedia *pill switcher* langsung:
     `[ 🏛️ 1. Profil & Tata Kelola ]  [ 🛡️ 2. TRIAS UKS/M ]  [ 🍏 3. Sekolah Sehat (GSS) ]`.

---

## 2. Resolusi Pertanyaan Terbuka (§7 Spec)

| # | Pertanyaan Terbuka dari Spec | Keputusan yang Diimplementasikan di Wireframe 3 |
|---|---|---|
| **Q1** | **Gerakan Sekolah Sehat (GSS)**: 1 halaman anchor vs 5+ halaman terpisah? | **Halaman Dedikasi GSS dengan Anchor 5 Sehat** (`#sec-gss-bergizi`, `#sec-gss-fisik`, `#sec-gss-imunisasi`, `#sec-gss-jiwa`, `#sec-gss-lingkungan`). Menghindari fragmentasi konten dan dapat dijelajahi via kotak navigasi kiri. |
| **Q2** | **Item L2 TRIAS**: Punya halaman ringkasan atau murni wadah dropdown? | **Halaman Dedikasi Mandiri untuk TRIAS** dengan 16 kartu indikator terinci (7 Pendidikan, 4 Pelayanan, 5 Lingkungan) berhenti di batas terverifikasi: Dokter Kecil & Kawasan Bebas Rokok/Napza/Kekerasan/Porno. |
| **Q3** | **Struktur Organisasi**: Personel terstruktur atau gambar bagan statis? | **Kartu Personel Terstruktur** dengan tab switcher interaktif antara: <br>• *Tim Pembina UKS/M* (Pusat, Provinsi, Kab/Kota, Kecamatan). <br>• *Tim Pelaksana Satuan Pendidikan* (Kepala Sekolah, Guru UKS, Medis Puskesmas, Komite, Kader Dokter Kecil). |
| **Q4** | **Bahan Advokasi GSS**: Konten teks biasa atau listing unduhan? | **Listing Dokumen Unduhan Terstruktur** dilengkapi badge format (`PDF`, `XLSX`, `ZIP`), besaran file (MB), ringkasan peruntukan, tombol unduh simulasi, dan filter kategori dokumen. |
| **§4** | **Stratifikasi UKS/M (Scope Baru)**: Bagaimana visualisasi & relasi dengan sistem luar? | **Matriks 4 Strata Kesiapan Bertahap** (Minimal → Standar → Optimal → Paripurna) dilengkapi callout aturan kelulusan 100% indikator pada 4 kategori serta tombol CTA eksternal ke `https://stratifikasiuks.org/` ↗. |

---

## 3. Fitur Interaktif Tambahan
1. **Device Viewport Switcher**: Toggle instan antara **Desktop (1440px)**, **Tablet (768px)**, **Mobile (375px)**, dan **Fluid (100%)**.
2. **Blueprint Mode**: Toggle satu klik antara *Light Frame Grid* dan *Blueprint Dark Technical Canvas* (`#0D1C13`).
3. **Drawer Pin State**: Klik `[ 📌 Pin Menu ]` untuk mempertahankan panel navigasi tetap terbuka di layar lebar.
