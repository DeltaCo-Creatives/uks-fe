# UKS/M Static Mocks (RAWs)

Koleksi mockup website statis berformat HTML5, CSS3, dan Vanilla JavaScript murni untuk portal **UKS/M (Usaha Kesehatan Sekolah / Madrasah)** Kementerian Pendidikan Dasar dan Menengah RI.

Direktori ini dibangun secara mandiri di bawah `/mocks/RAWs/` agar mudah dieksplorasi, diuji coba di peramban secara langsung (*double click* `index.html`), maupun disajikan melalui dev server.

---

## 🧭 Daftar Halaman & Struktur Navigasi

| Halaman | Berkas | Deskripsi & Konten Utama |
| :--- | :--- | :--- |
| **Beranda** | [`index.html`](file:///c:/Users/CalvinNurafidHerdyan/Documents/GitHub/uks-fe/mocks/RAWs/index.html) | Hero stage imersif, bar metrik nasional, overview Trias UKS (3 pilar), program unggulan MBG & CKG, modul buku resmi, warta berita, dan marquee mitra. |
| **Tentang UKS/M** | [`tentang-uks.html`](file:///c:/Users/CalvinNurafidHerdyan/Documents/GitHub/uks-fe/mocks/RAWs/tentang-uks.html) | Deskripsi umum, tujuan & sasaran (primer, sekunder, tersier), rincian 3 pilar Trias, struktur organisasi berjenjang (TP UKS Pusat s.d. Tim Pelaksana Sekolah), 4 strata UKS/M (Minimal s.d. Paripurna), dan Gerakan Sekolah Sehat (5 Sehat). |
| **Program** | [`program.html`](file:///c:/Users/CalvinNurafidHerdyan/Documents/GitHub/uks-fe/mocks/RAWs/program.html) | Program Makan Bergizi Gratis (MBG) & kurikulum karakter, Cek Kesehatan Gratis (CKG/penjaringan), 7 Kebiasaan Anak Indonesia Hebat (7KAIH), Lomba Semarak SAIH 2025, Gala Kreasi Video, dan Dokter Kecil / KKR. |
| **Mitra** | [`mitra.html`](file:///c:/Users/CalvinNurafidHerdyan/Documents/GitHub/uks-fe/mocks/RAWs/mitra.html) | Panduan kemitraan 3 tahap, formulir registrasi calon mitra online, showcase mitra resmi (Kemenkes, Kemenag, Kemendagri, UNICEF, WHO, BKKBN, BPOM, SEAMEO RECFON), dan bentuk dukungan sekolah. |
| **Informasi** | [`informasi.html`](file:///c:/Users/CalvinNurafidHerdyan/Documents/GitHub/uks-fe/mocks/RAWs/informasi.html) | Warta berita berfilter kategori (Gizi, Pelayanan, Lingkungan), kisah praktik baik sekolah model, catatan lapangan UPT BPMP/BBPMP, kalender kegiatan 2026, dan direktori aplikasi ekosistem digital UKS. |
| **Publikasi** | [`publikasi.html`](file:///c:/Users/CalvinNurafidHerdyan/Documents/GitHub/uks-fe/mocks/RAWs/publikasi.html) | Modul & buku panduan resmi siap unduh (PDF), infografis interaktif & poster cetak mading A3, video edukasi animasi, serta repositori produk hukum & SKB 4 Menteri 2014. |
| **Kontak** | [`kontak.html`](file:///c:/Users/CalvinNurafidHerdyan/Documents/GitHub/uks-fe/mocks/RAWs/kontak.html) | Alamat kantor Sekretariat Pembina UKS Pusat, ULT Call Center 177, formulir pengaduan / konsultasi sekolah sehat, dan tanya jawab (FAQ) seputar anggaran BOS serta sarana ruang UKS. |

---

## 🎨 Karakter Desain & UI Tokens

- **Aroma Desain**: *Tactile, dense, modern & playful*.
- **Warna Utama**: Hijau Kemendikdasmen (`#098C4C`), Aksen Emas Ceria (`#FFD23F`), Sage Halus (`#D2E8DA`), Latar Belakang Hangat (`#F4F5F4`).
- **Elemen Taktil**: Bentuk squircle (`border-radius: 20px - 36px`), bayangan lembut berlapis (`box-shadow`), floating pill navigation bar dengan efek *glassmorphism blur*.
- **Interaktivitas JavaScript (`raws.js`)**:
  - Auto-active highlighter menu navbar berdasarkan URL saat ini.
  - Menu drawer responsif untuk perangkat bergerak (*mobile*).
  - Modal pencarian cepat (`🔍`) dengan filter kata kunci populer.
  - Modal penampil pratinjau dokumen / buku panduan sebelum unduh.
  - Filter interaktif kategori berita & buku panduan jenjang.
  - Tab switcher struktur Tim Pembina vs Tim Pelaksana.

---

## 🚀 Cara Menjalankan

### Cara 1: Langsung di Browser (Tanpa Server)
Buka folder `mocks/RAWs/` di File Explorer, lalu klik dua kali pada `index.html`. Seluruh aset gambar, CSS, dan JS tertaut secara relatif.

### Cara 2: Melalui Vite Dev Server
Jika dev server sedang aktif di terminal (`npm run dev`), akses langsung melalui peramban:
- [http://localhost:5173/mocks/RAWs/index.html](http://localhost:5173/mocks/RAWs/index.html)
- [http://localhost:5173/mocks/wireframe/index.html](http://localhost:5173/mocks/wireframe/index.html)
