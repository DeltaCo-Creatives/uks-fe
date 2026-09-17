/**
 * PORTAL NAVIGATION ARCHITECTURE & CONFIGURATIONS
 */

export const pageNavigationConfigs = {
  beranda: {
    id: 'beranda',
    title: 'Beranda',
    path: 'PORTAL / BERANDA NASIONAL',
    icon: 'fa-solid fa-house',
    badge: 'PORTAL',
    drawerTitle: 'NAVIGASI BERANDA',
    footerText: 'Ikhtisar Gerakan Sekolah Sehat Nasional',
    sections: [
      { id: 'sec-home-hero', label: 'Hero Stage & Inisiatif', icon: 'fa-solid fa-flag' },
      { id: 'sec-home-stats', label: 'Metrik Nasional 4 Kementerian', icon: 'fa-solid fa-chart-simple' },
      { id: 'sec-home-trias', label: 'Trias UKS Bento Preview', icon: 'fa-solid fa-shield-heart' },
      { id: 'sec-home-stratifikasi', label: 'Stratifikasi UKS/M (4 Strata)', icon: 'fa-solid fa-layer-group' },
      { id: 'sec-home-programs', label: 'Program Unggulan Nasional', icon: 'fa-solid fa-bolt' },
      { id: 'sec-home-gss', label: '5 Fokus Pembiasaan (GSS)', icon: 'fa-solid fa-apple-whole' },
      { id: 'sec-home-news', label: 'Warta Terkini UKS/M', icon: 'fa-solid fa-newspaper' },
      { id: 'sec-home-books', label: 'Rak Buku Digital', icon: 'fa-solid fa-book-bookmark' },
      { id: 'sec-home-gallery', label: 'Visual Inspirasi', icon: 'fa-solid fa-images' },
      { id: 'sec-home-video', label: 'Video Pembiasaan Edukatif', icon: 'fa-solid fa-film' },
      { id: 'sec-home-tautan', label: 'Tautan Kementerian Pembina', icon: 'fa-solid fa-building-columns' },
      { id: 'sec-home-aplikasi', label: 'Aplikasi Terkait UKS/M', icon: 'fa-solid fa-mobile-screen' },
      { id: 'sec-home-mitra', label: 'Mitra Kolaborasi Nasional', icon: 'fa-solid fa-handshake' }
    ]
  },
  'uksm-profil': {
    id: 'uksm-profil',
    title: 'Profil & Tata Kelola',
    path: 'PORTAL / UKS/M ➔ 1. PROFIL & TATA KELOLA',
    icon: 'fa-solid fa-landmark',
    badge: 'PROFIL',
    drawerTitle: 'NAVIGASI PROFIL',
    footerText: 'Landasan Filosofis & Struktur Kelembagaan',
    sections: [
      { id: 'sec-profil-deskripsi', label: 'Deskripsi & Dasar Hukum', icon: 'fa-regular fa-file-lines' },
      { id: 'sec-profil-tujuan', label: 'Tujuan Umum & Khusus', icon: 'fa-solid fa-bullseye' },
      { id: 'sec-profil-sasaran', label: 'Sasaran 3 Tingkat', icon: 'fa-solid fa-users' },
      { id: 'sec-profil-struktur', label: 'Struktur Organisasi Personel', icon: 'fa-solid fa-sitemap' },
      { id: 'sec-profil-manajemen', label: 'Siklus Manajemen Pembinaan', icon: 'fa-solid fa-arrows-spin' }
    ]
  },
  'uksm-trias': {
    id: 'uksm-trias',
    title: 'TRIAS UKS/M',
    path: 'PORTAL / UKS/M ➔ 2. TRIAS UKS/M (3 PILAR)',
    icon: 'fa-solid fa-shield-heart',
    badge: 'TRIAS',
    drawerTitle: 'NAVIGASI TRIAS',
    footerText: '3 Pilar · 16 Sub-program',
    sections: [
      { id: 'sec-trias-pendidikan', label: '(1) Pendidikan Kesehatan', icon: 'fa-solid fa-graduation-cap' },
      { id: 'sec-trias-pelayanan', label: '(2) Pelayanan Kesehatan', icon: 'fa-solid fa-kit-medical' },
      { id: 'sec-trias-lingkungan', label: '(3) Pembinaan Lingkungan Sekolah Sehat', icon: 'fa-solid fa-seedling' }
    ]
  },
  'uksm-stratifikasi': {
    id: 'uksm-stratifikasi',
    title: 'Stratifikasi UKS/M',
    path: 'PORTAL / UKS/M ➔ 3. STRATIFIKASI UKS/M (4 STRATA KESIAPAN)',
    icon: 'fa-solid fa-layer-group',
    badge: 'STRATA',
    drawerTitle: 'NAVIGASI STRATIFIKASI',
    footerText: 'Dasar · Madya · Utama · Paripurna',
    sections: [
      { id: 'sec-strat-pengertian', label: 'Apa itu Stratifikasi UKS/M?', icon: 'fa-solid fa-circle-info' },
      { id: 'sec-strat-tujuan', label: 'Tujuan Stratifikasi UKS', icon: 'fa-solid fa-bullseye' },
      { id: 'sec-strat-penilaian', label: 'Cara Penilaian', icon: 'fa-solid fa-scale-balanced' },
      { id: 'sec-strat-indikator', label: 'Indikator', icon: 'fa-solid fa-layer-group' }
    ]
  },
  'uksm-gss': {
    id: 'uksm-gss',
    title: 'Sekolah Sehat (GSS)',
    path: 'PORTAL / UKS/M ➔ 4. SEKOLAH SEHAT (GSS & 5 SEHAT)',
    icon: 'fa-solid fa-apple-whole',
    badge: 'GSS',
    drawerTitle: 'NAVIGASI GSS',
    footerText: 'Pembudayaan 5 Sehat & Unduhan Advokasi',
    sections: [
      { id: 'sec-gss-overview', label: 'Konsep Gerakan Sekolah Sehat', icon: 'fa-solid fa-circle-info' },
      { id: 'sec-gss-5sehat', label: '5 Fokus Pembiasaan Terpadu', icon: 'fa-solid fa-apple-whole' },
      { id: 'sec-gss-advokasi', label: 'Bahan Advokasi & Listing Unduhan', icon: 'fa-solid fa-file-arrow-down' }
    ]
  },
  program: {
    id: 'program',
    title: 'Program',
    path: 'PORTAL / PROGRAM PRIORITAS',
    icon: 'fa-solid fa-bullhorn',
    badge: 'PROGRAM',
    drawerTitle: 'PROGRAM PRIORITAS',
    footerText: 'Inisiatif Transformasi Nasional 2026',
    sections: [
      { id: 'sec-prog-mbg', label: '1. Makan Bergizi Gratis (MBG)', icon: 'fa-solid fa-utensils' },
      { id: 'sec-prog-ckg', label: '2. Cek Kesehatan Gratis (CKG)', icon: 'fa-solid fa-stethoscope' },
      { id: 'sec-prog-7kaih', label: '3. 7KAIH Karakter Hebat', icon: 'fa-solid fa-medal' },
      { id: 'sec-prog-asri', label: '4. Gerakan Sekolah ASRI', icon: 'fa-solid fa-tree' },
      { id: 'sec-prog-saih', label: '5. Semarak SAIH & Gala Kreasi', icon: 'fa-solid fa-star' },
      { id: 'sec-prog-dokcil', label: '6. Dokter Kecil & KKR', icon: 'fa-solid fa-user-doctor' },
      { id: 'sec-prog-sarpras', label: '7. Standardisasi Sarpras UKS', icon: 'fa-solid fa-couch' }
    ]
  },
  mitra: {
    id: 'mitra',
    title: 'Kemitraan',
    path: 'PORTAL / KEMITRAAN MULTIPIHAK',
    icon: 'fa-solid fa-handshake-angle',
    badge: 'MITRA',
    drawerTitle: 'KEMITRAAN MULTIPIHAK',
    footerText: 'Kolaborasi CSR, NGO & Lembaga Internasional',
    sections: [
      { id: 'sec-mitra-tentang', label: 'Tentang Mitra UKS/M', icon: 'fa-solid fa-circle-info' },
      { id: 'sec-mitra-alur', label: 'Alur Kemitraan 4 Tahap', icon: 'fa-solid fa-route' },
      { id: 'sec-mitra-form', label: 'Registrasi Mitra Baru', icon: 'fa-solid fa-file-signature' },
      { id: 'sec-mitra-katalog', label: 'Katalog Lembaga Mitra', icon: 'fa-solid fa-building-flag' },
      { id: 'sec-mitra-aktivitas', label: 'Aktivitas Kolaborasi Mitra', icon: 'fa-solid fa-newspaper' },
      { id: 'sec-mitra-dukungan', label: 'Bentuk Dukungan Nyata', icon: 'fa-solid fa-table-list' },
      { id: 'sec-mitra-testimoni', label: 'Testimoni Kolaborasi', icon: 'fa-solid fa-quote-left' }
    ]
  },
  informasi: {
    id: 'informasi',
    title: 'Informasi',
    path: 'PORTAL / INFORMASI & AGENDA',
    icon: 'fa-solid fa-newspaper',
    badge: 'WARTA',
    drawerTitle: 'WARTA & AGENDA',
    footerText: 'Berita Terkini, Praktik Baik & Kalender 2026',
    sections: [
      { id: 'sec-info-berita', label: 'Warta Terkini UKS/M', icon: 'fa-solid fa-newspaper' },
      { id: 'sec-info-praktik', label: 'Praktik Baik Satpen', icon: 'fa-solid fa-award' },
      { id: 'sec-info-upt', label: 'UPT Bercerita', icon: 'fa-solid fa-book-open-reader' },
      { id: 'sec-info-agenda', label: 'Kalender Kegiatan 2026', icon: 'fa-solid fa-calendar-days' },
      { id: 'sec-info-aplikasi', label: 'Aplikasi Terkait', icon: 'fa-solid fa-mobile-screen-button' }
    ]
  },
  publikasi: {
    id: 'publikasi',
    title: 'Publikasi',
    path: 'PORTAL / PUBLIKASI & REGULASI',
    icon: 'fa-solid fa-book-bookmark',
    badge: 'PUSTAKA',
    drawerTitle: 'PUSTAKA DIGITAL',
    footerText: 'Buku, Media Visual & Produk Hukum SKB',
    sections: [
      { id: 'sec-pub-books', label: 'Buku Panduan & Juknis', icon: 'fa-solid fa-book' },
      { id: 'sec-pub-infografis', label: 'Infografis Edukasi', icon: 'fa-solid fa-chart-pie' },
      { id: 'sec-pub-video', label: 'Video Pembiasaan & Senam', icon: 'fa-solid fa-film' },
      { id: 'sec-pub-regulasi', label: 'Produk Hukum (SKB 4 Menteri)', icon: 'fa-solid fa-scale-balanced' }
    ]
  },
  kontak: {
    id: 'kontak',
    title: 'Kontak',
    path: 'PORTAL / KONTAK & SEKRETARIAT',
    icon: 'fa-solid fa-headset',
    badge: 'KONTAK',
    drawerTitle: 'LAYANAN KONTAK',
    footerText: 'Helpdesk ULT 177 & Tiket Aduan',
    sections: [
      { id: 'sec-kontak-alamat', label: 'Alamat Sekretariat Senayan', icon: 'fa-solid fa-location-dot' },
      { id: 'sec-kontak-helpdesk', label: 'Helpdesk ULT Kemendikdasmen', icon: 'fa-solid fa-headset' },
      { id: 'sec-kontak-tiket', label: 'Formulir Pengaduan / Tiket', icon: 'fa-solid fa-envelope-open-text' },
      { id: 'sec-kontak-faq', label: 'Tanya Jawab (FAQ)', icon: 'fa-solid fa-circle-question' }
    ]
  },
  search: {
    id: 'search',
    title: 'Pencarian',
    path: 'PORTAL / PENCARIAN',
    icon: 'fa-solid fa-magnifying-glass',
    badge: 'CARI',
    drawerTitle: 'PENCARIAN PORTAL',
    footerText: 'Temukan Warta, Modul, Program & Regulasi',
    sections: []
  },
  'berita-detail': {
    id: 'berita-detail',
    title: 'Detail Warta',
    path: 'PORTAL / INFORMASI / DETAIL WARTA',
    icon: 'fa-solid fa-newspaper',
    badge: 'WARTA',
    drawerTitle: 'NAVIGASI WARTA',
    footerText: 'Rilis Resmi Transformasi UKS/M',
    sections: []
  }
};

