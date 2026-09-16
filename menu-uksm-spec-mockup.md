# Spesifikasi Menu UKS/M — Portal UKS/M (VERSI MOCKUP, PROD-ONLY)

**Source of truth:** https://uks.kemendikdasmen.go.id/ (PRODUCTION)
**Cakupan:** Struktur navigasi menu "UKS/M" beserta seluruh submenu dan sub-submenu-nya (3 level).
**Tahap:** Pembuatan mockup/desain. Belum masuk System Design / ERD / database.
**Tujuan dokumen:** Acuan tim desain untuk merancang navigasi dan memetakan halaman yang perlu dibuat. Ditulis agar bisa dibaca desainer dan AI lain tanpa perlu melihat gambar.

> **⚠️ Catatan sumber:** dokumen ini hanya memuat materi dari production. Desain dari vendor sebelumnya tidak dijadikan acuan (pertimbangan hak cipta). Halaman yang belum ada di prod ditandai eksplisit sebagai "perlu dirancang baru".

> **Catatan metodologi:** disusun dari screenshot dropdown menu production. Beberapa daftar submenu **terpotong di tepi screenshot** — ditandai ⚠️. Verifikasi ulang langsung di situs sebelum dianggap final.

---

## 1. Ringkasan

Menu UKS/M adalah menu **paling dalam** di seluruh navbar — mencapai **3 level hierarki**, sementara menu lain hanya 1–2 level. Menu ini sendirian menyumbang **lebih dari separuh** total halaman portal.

| Menu | Kedalaman | Perkiraan jumlah halaman |
|---|---|---|
| **UKS/M** | **3 level** | **± 26** |
| Program | 1 level | 4 (akan berubah) |
| Mitra | 1 level | 5 |
| Informasi | 1 level | 5 |
| Publikasi | 1 level | 4 |
| Tautan | 2 level | 4 + sub-item per kementerian |

**Implikasi untuk mockup:** dropdown UKS/M jauh lebih kompleks dari menu lain. Perlu perlakuan desain khusus — dropdown 3 level dengan expand ke samping kemungkinan bermasalah di layar kecil dan di perangkat sentuh.

---

## 2. Struktur Lengkap

```
UKS/M
├── Deskripsi Umum                                    [L1 · halaman]
├── Tujuan                                            [L1 · halaman]
├── Sasaran                                           [L1 · halaman]
├── Struktur Organisasi                          ›    [L1 · punya submenu]
│   ├── Tim Pembina UKS/M                             [L2 · halaman]
│   └── Tim Pelaksana UKS/M di Sekolah/Madrasah       [L2 · halaman]
├── Stratifikasi UKS/M                           ↗    [L1 · lihat §4]
├── Manajemen UKS/M                                   [L1 · halaman]
│
├── TRIAS UKS/M :                                     [L1 · LABEL GRUP, bukan link]
│   ├── (1) Pendidikan Kesehatan                 ›    [L2 · punya submenu]
│   │   ├── Literasi Kesehatan                        [L3]
│   │   ├── Perilaku Hidup Bersih dan Sehat           [L3]
│   │   ├── Pendidikan Gizi                           [L3]
│   │   ├── Pendidikan Kesehatan Reproduksi           [L3]
│   │   ├── Pendidikan Karakter                       [L3]
│   │   ├── Pembiasaan Aktivitas Fisik                [L3]
│   │   └── Dokter Kecil                              [L3] ⚠️ mungkin ada lanjutan
│   │
│   ├── (2) Pelayanan Kesehatan                  ›    [L2 · punya submenu]
│   │   ├── Penjaringan Kesehatan dan Pemeriksaan Berkala  [L3]
│   │   ├── Imunisasi                                 [L3]
│   │   ├── Pemberian Obat Cacing                     [L3]
│   │   └── P3K dan P3P                               [L3]
│   │
│   └── (3) Pembinaan Lingkungan Sekolah Sehat   ›    [L2 · punya submenu]
│       ├── Sanitasi Sekolah                          [L3]
│       ├── Pembinaan Kantin Sehat                    [L3]
│       ├── Pemanfaatan Pekarangan Sekolah            [L3]
│       ├── Pemberantasan Sarang Nyamuk               [L3]
│       └── Kawasan Tanpa Rokok, Napza, Kekerasan dan Pornografi  [L3] ⚠️ mungkin ada lanjutan
│
└── Sekolah Sehat                                ›    [L1 · punya submenu]
    ├── Gerakan Madrasah Sehat                   ↗    [L2 · EXTERNAL LINK]
    ├── Gerakan Sekolah Sehat                         [L2 · halaman]
    ├── Sehat Bergizi                                 [L2 · halaman]
    ├── Sehat Fisik                                   [L2 · halaman]
    ├── Sehat Imunisasi                               [L2 · halaman]
    ├── Sehat Jiwa                                    [L2 · halaman]
    ├── Sehat Lingkungan                              [L2 · halaman]
    └── Bahan Advokasi GSS                            [L2 · halaman]
```

**Legenda:** `›` = punya submenu (expand ke samping) · `↗` = external/outbound link · `L1/L2/L3` = level hierarki

---

## 3. Rincian Per Item

### 3.1 Item Sederhana (L1, tanpa submenu)

| Item | Perkiraan isi |
|---|---|
| **Deskripsi Umum** | Penjelasan umum apa itu UKS/M |
| **Tujuan** | Tujuan penyelenggaraan UKS/M |
| **Sasaran** | Sasaran/target penerima manfaat |
| **Manajemen UKS/M** | Tata kelola/pengelolaan UKS/M |

Keempatnya kemungkinan halaman konten teks biasa.
⚠️ **Belum diverifikasi** — isi aktual belum pernah dibuka. Ada kemungkinan salah satunya lebih kompleks (mis. Manajemen UKS/M berisi tabel atau diagram).

### 3.2 Struktur Organisasi (2 submenu)

| Submenu | Perkiraan isi |
|---|---|
| **Tim Pembina UKS/M** | Struktur tim pembina (kemungkinan bertingkat: pusat/provinsi/kab-kota) |
| **Tim Pelaksana UKS/M di Sekolah/Madrasah** | Struktur tim pelaksana di satuan pendidikan |

⚠️ **Pertanyaan desain penting:** apakah halaman ini menampilkan **daftar nama & jabatan** (butuh komponen tabel/kartu personel) atau hanya **gambar bagan organisasi** (cukup satu gambar besar)? Dua kemungkinan ini menghasilkan mockup yang sangat berbeda.

### 3.3 TRIAS UKS/M (label grup + 3 submenu)

Teks **"TRIAS UKS/M :"** di dropdown adalah **label pemisah grup**, bukan item yang bisa diklik. Di bawahnya 3 item bernomor, masing-masing punya panah `›`.

**Relasi dengan Beranda:** ketiga item ini sama persis dengan 3 kartu di section "TRIAS UKS/M" di beranda, yang masing-masing punya tombol "Selengkapnya" — kemungkinan mengarah ke halaman L2 ini.

⚠️ **Belum diverifikasi:** apakah item L2 punya halaman ringkasan sendiri, atau hanya wadah dropdown yang tidak bisa diklik. Menentukan perlu tidaknya 3 halaman tambahan.

**(1) Pendidikan Kesehatan — 7 sub-item**
Literasi Kesehatan · Perilaku Hidup Bersih dan Sehat · Pendidikan Gizi · Pendidikan Kesehatan Reproduksi · Pendidikan Karakter · Pembiasaan Aktivitas Fisik · Dokter Kecil
⚠️ "Dokter Kecil" ada di tepi bawah screenshot — daftar mungkin berlanjut.

**(2) Pelayanan Kesehatan — 4 sub-item**
Penjaringan Kesehatan dan Pemeriksaan Berkala · Imunisasi · Pemberian Obat Cacing · P3K dan P3P
Daftar terlihat lengkap (ada ruang kosong setelah item terakhir).

**(3) Pembinaan Lingkungan Sekolah Sehat — 5 sub-item**
Sanitasi Sekolah · Pembinaan Kantin Sehat · Pemanfaatan Pekarangan Sekolah · Pemberantasan Sarang Nyamuk · Kawasan Tanpa Rokok, Napza, Kekerasan dan Pornografi
⚠️ Item terakhir ada di tepi bawah screenshot — daftar mungkin berlanjut.

### 3.4 Sekolah Sehat (8 submenu)

| # | Item | Sifat |
|---|---|---|
| 1 | Gerakan Madrasah Sehat | 🔗 **External link (↗)** — kemungkinan milik Kemenag, di luar cakupan |
| 2 | Gerakan Sekolah Sehat | Internal |
| 3 | Sehat Bergizi | Internal |
| 4 | Sehat Fisik | Internal |
| 5 | Sehat Imunisasi | Internal |
| 6 | Sehat Jiwa | Internal |
| 7 | Sehat Lingkungan | Internal |
| 8 | Bahan Advokasi GSS | Internal |

**✅ Dikonfirmasi client:** di beranda, section "Fokus Sekolah Sehat" menampilkan 5 item (Sehat Bergizi, Fisik, Imunisasi, Jiwa, Lingkungan) — kelimanya **mengarah ke halaman "Gerakan Sekolah Sehat" yang sama**, bukan 5 halaman terpisah. Kemungkinan anchor/scroll-to-section.

⚠️ **Inkonsistensi yang berdampak ke jumlah halaman:** di menu, kelima item itu terdaftar sebagai entri terpisah. Dua kemungkinan:
- (a) entri menu juga anchor ke halaman yang sama → cukup **1 halaman**
- (b) entri menu punya halaman sendiri, hanya beranda yang mengarahkan semuanya ke satu tempat → **5–7 halaman**

Selisihnya besar. **Client sudah menyatakan struktur ini perlu diperbaiki ke depan**, tapi untuk mockup tahap ini dicatat apa adanya.

---

## 4. Stratifikasi UKS/M — PERLU DIRANCANG BARU

Item ini punya perlakuan berbeda — ditandai **ikon external link (↗)** di dropdown.

**Status:**
- Stratifikasi UKS/M punya **sistem/dashboard penilaian sendiri di luar portal** (tempat sekolah mengisi data dan melihat strata). Sistem ini **di luar cakupan** rebuild — hanya ditautkan keluar.
- Portal baru akan punya **1 halaman deskriptif internal** yang menjelaskan Stratifikasi UKS/M.
- ⚠️ **Halaman deskriptif itu belum ada di production.** Ini **scope pengembangan baru**, dan **desainnya harus dibuat dari nol** — materi vendor sebelumnya tidak dijadikan acuan.

**Fakta domain yang perlu disampaikan halaman ini:**

| Aspek | Isi |
|---|---|
| Definisi | Alat bantu untuk mengetahui capaian dan kekurangan satuan pendidikan dalam penyelenggaraan UKS/M |
| Tingkatan (4 strata, berurutan) | **Minimal** → **Standar** → **Optimal** → **Paripurna** |
| Fungsi | Alat ukur pelaksanaan Trias UKS · dasar strategi peningkatan mutu · bagian sistem monitoring & evaluasi · dasar penyusunan rekomendasi tindak lanjut |
| Aturan penilaian | Sekolah/madrasah harus memenuhi **seluruh** indikator pada satu kelompok strata untuk dinyatakan berada di strata tersebut |
| Kategori indikator (4, berlaku di semua strata) | 1. Pendidikan kesehatan · 2. Pelayanan kesehatan · 3. Pembinaan lingkungan sehat di sekolah sehat · 4. Manajemen UKS/M |
| Tautan keluar | Dashboard Stratifikasi UKS/M (sistem penilaian, di luar portal) |

**Yang perlu diputuskan tim desain & client:**
- Menampilkan **rincian indikator** tiap strata, atau cukup nama kategori? (Rincian = butuh data yang belum tersedia.)
- Memvisualkan 4 strata sebagai **kategori setara** atau sebagai **jenjang/progres bertahap**? Ini memengaruhi pesan yang diterima sekolah.
- Seberapa menonjol tautan ke dashboard eksternal, mengingat itu tujuan akhir sebagian besar pengunjung halaman ini.

---

## 5. Catatan Desain Navigasi

| Aspek | Observasi & implikasi |
|---|---|
| **Kedalaman 3 level** | Dropdown expand ke samping. Di layar sempit dan perangkat sentuh, pola ini rawan bermasalah — perlu solusi alternatif (accordion, drawer, atau mega menu). |
| **Label grup non-clickable** | "TRIAS UKS/M :" perlu gaya visual berbeda dari item biasa supaya jelas tidak bisa diklik. |
| **Item bernomor** | "(1)", "(2)", "(3)" pada TRIAS — penomoran eksplisit di label, bukan sekadar urutan. |
| **Penanda external link** | Ikon ↗ dipakai konsisten pada Stratifikasi UKS/M dan Gerakan Madrasah Sehat. Pertahankan penanda ini di desain baru agar pengguna tahu akan keluar dari portal. |
| **Highlight item aktif** | Item yang sedang di-hover/aktif diberi latar hijau muda dengan sudut membulat. |
| **Panjang label** | Beberapa label sangat panjang ("Kawasan Tanpa Rokok, Napza, Kekerasan dan Pornografi", "Tim Pelaksana UKS/M di Sekolah/Madrasah") — desain dropdown harus menampung teks 2 baris tanpa rusak. |

---

## 6. Yang Belum Terpetakan

Semua halaman di menu UKS/M **belum pernah dibuka isinya** kecuali struktur menunya. Prioritas untuk di-screenshot:

1. **Gerakan Sekolah Sehat** — tujuan 5 item Fokus dari beranda; menentukan 1 halaman vs 5+ halaman
2. **Struktur Organisasi** (Tim Pembina & Tim Pelaksana) — daftar personel atau bagan gambar?
3. **Satu halaman L3 mana saja** (mis. Literasi Kesehatan) — untuk mengetahui pola halaman konten terdalam
4. **Satu halaman L2 TRIAS** (mis. Pendidikan Kesehatan) — apakah punya halaman ringkasan sendiri
5. **Bahan Advokasi GSS** — halaman konten biasa atau kumpulan file unduhan?
6. **Deskripsi Umum / Tujuan / Sasaran / Manajemen UKS/M** — konfirmasi apakah benar halaman teks sederhana

---

## 7. Pertanyaan Terbuka

**Berdampak ke jumlah halaman (prioritas tinggi):**
1. Gerakan Sekolah Sehat — 1 halaman dengan anchor, atau 5+ halaman terpisah?
2. Item L2 TRIAS — punya halaman ringkasan sendiri, atau murni wadah dropdown?

**Berdampak ke komponen desain (prioritas tinggi):**
3. Struktur Organisasi — daftar personel terstruktur atau gambar bagan?
4. Bahan Advokasi GSS — konten teks atau listing dokumen unduhan?

**Verifikasi kelengkapan (prioritas sedang):**
5. Submenu Pendidikan Kesehatan — benar berhenti di "Dokter Kecil"?
6. Submenu Pembinaan Lingkungan — benar berhenti di "Kawasan Tanpa Rokok, Napza, Kekerasan dan Pornografi"?

**Keputusan produk (perlu dibahas dengan client):**
7. Apakah struktur 3 level ini **dipertahankan** di portal baru, atau termasuk yang ingin disederhanakan? Ini keputusan client, bukan keputusan vendor — tapi perlu diangkat karena berdampak besar ke desain navigasi dan jumlah halaman.

---

*Dokumen ini berpasangan dengan "Spesifikasi Beranda — Portal UKS/M (Versi Mockup, Prod-Only)". Keduanya bersumber dari production.*
