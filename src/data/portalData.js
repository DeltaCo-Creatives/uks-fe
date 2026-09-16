/**
 * COMPLETE UKS/M PORTAL DATA STORE
 * Sourced directly from https://uks.kemendikdasmen.go.id/ & production assets
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
      { id: 'sec-home-programs', label: 'Program Unggulan Nasional', icon: 'fa-solid fa-bolt' },
      { id: 'sec-home-gss', label: '5 Fokus Pembiasaan (GSS)', icon: 'fa-solid fa-apple-whole' },
      { id: 'sec-home-news', label: 'Warta Terkini UKS/M', icon: 'fa-solid fa-newspaper' },
      { id: 'sec-home-books', label: 'Rak Buku Digital', icon: 'fa-solid fa-book-bookmark' },
      { id: 'sec-home-gallery', label: 'Visual Inspirasi & Mitra', icon: 'fa-solid fa-images' }
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
      { id: 'sec-profil-stratifikasi', label: 'Stratifikasi UKS/M (4 Strata)', icon: 'fa-solid fa-layer-group' },
      { id: 'sec-profil-manajemen', label: 'Siklus Manajemen Pembinaan', icon: 'fa-solid fa-arrows-spin' }
    ]
  },
  'uksm-trias': {
    id: 'uksm-trias',
    title: 'TRIAS UKS/M',
    path: 'PORTAL / UKS/M ➔ 2. TRIAS UKS/M (3 PILAR · 16 INDIKATOR)',
    icon: 'fa-solid fa-shield-heart',
    badge: 'TRIAS',
    drawerTitle: 'NAVIGASI TRIAS',
    footerText: '16 Indikator Resmi SKB 4 Menteri',
    sections: [
      { id: 'sec-trias-pendidikan', label: '(1) Pendidikan Kesehatan (7 Indikator)', icon: 'fa-solid fa-graduation-cap' },
      { id: 'sec-trias-pelayanan', label: '(2) Pelayanan Kesehatan (4 Indikator)', icon: 'fa-solid fa-kit-medical' },
      { id: 'sec-trias-lingkungan', label: '(3) Pembinaan Lingkungan (5 Indikator)', icon: 'fa-solid fa-seedling' }
    ]
  },
  'uksm-gss': {
    id: 'uksm-gss',
    title: 'Sekolah Sehat (GSS)',
    path: 'PORTAL / UKS/M ➔ 3. SEKOLAH SEHAT (GSS & 5 SEHAT)',
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
      { id: 'sec-prog-saih', label: '4. Semarak SAIH & Gala Kreasi', icon: 'fa-solid fa-star' },
      { id: 'sec-prog-dokcil', label: '5. Dokter Kecil & KKR', icon: 'fa-solid fa-user-doctor' },
      { id: 'sec-prog-sarpras', label: '6. Standardisasi Sarpras UKS', icon: 'fa-solid fa-couch' }
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
      { id: 'sec-mitra-alur', label: 'Alur Kemitraan 4 Tahap', icon: 'fa-solid fa-route' },
      { id: 'sec-mitra-form', label: 'Registrasi Mitra Baru', icon: 'fa-solid fa-file-signature' },
      { id: 'sec-mitra-katalog', label: 'Katalog Lembaga Mitra Aktif', icon: 'fa-solid fa-building-flag' },
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
      { id: 'sec-info-praktik', label: 'Praktik Baik Satuan Pendidikan', icon: 'fa-solid fa-award' },
      { id: 'sec-info-agenda', label: 'Kalender Kegiatan 2026', icon: 'fa-solid fa-calendar-days' }
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
  }
};

/* ============================================================
   NATIONAL METRICS
   ============================================================ */
export const nationalMetrics = [
  { value: '534.120+', label: 'Satuan Pendidikan Terbina', sub: 'PAUD, SD, SMP, SMA, SMK & SLB', color: '#098C4C' },
  { value: '53,4 Juta', label: 'Peserta Didik Sehat', sub: 'Penerima Manfaat Trias UKS', color: '#111C16' },
  { value: '514', label: 'Kab/Kota Terkoordinasi', sub: '38 Tim Pembina Provinsi', color: '#2563EB' },
  { value: '14.280', label: 'Strata Paripurna Mandiri', sub: 'Standar Sanitasi & PHBS Lengkap', color: '#D97706' }
];

/* ============================================================
   TRIAS UKS/M — 3 PILAR & 16 INDIKATOR RESMI
   ============================================================ */
export const triasPillarsDetail = {
  pendidikan: {
    id: 'pendidikan',
    title: 'Pendidikan Kesehatan',
    kicker: 'Pilar 1 · 7 Indikator Resmi',
    icon: 'fa-solid fa-graduation-cap',
    color: '#098C4C',
    bgBadge: '#D2E8DA',
    description: 'Membangun pengetahuan, sikap, dan keterampilan perilaku hidup sehat peserta didik sejak dini melalui pembelajaran intrakurikuler dan ekstrakurikuler.',
    indicators: [
      { id: 'item-trias-literasi', tag: 'L3 · 1/7', title: 'Literasi Kesehatan', desc: 'Penyediaan bahan bacaan gizi seimbang, modul kesehatan reproduksi, dan mading kesehatan sekolah.' },
      { id: 'item-trias-phbs', tag: 'L3 · 2/7', title: 'PHBS Sekolah', desc: 'Pembiasaan Cuci Tangan Pakai Sabun (CTPS), penggunaan alas kaki bersih, dan memotong kuku berkala.' },
      { id: 'item-trias-gizi', tag: 'L3 · 3/7', title: 'Pendidikan Gizi Seimbang', desc: 'Edukasi pedoman Isi Piringku, pembatasan konsumsi gula-garam-lemak, dan sarapan sehat bersama.' },
      { id: 'item-trias-kespro', tag: 'L3 · 4/7', title: 'Kesehatan Reproduksi', desc: 'Edukasi pubertas ramah anak, kebersihan organ reproduksi, dan pencegahan anemia remaja putri.' },
      { id: 'item-trias-karakter', tag: 'L3 · 5/7', title: 'Pendidikan Karakter', desc: 'Internalisasi 7 Kebiasaan Anak Indonesia Hebat (7KAIH), disiplin tidur, dan etika saling menghargai.' },
      { id: 'item-trias-fisik', tag: 'L3 · 6/7', title: 'Pembiasaan Aktivitas Fisik', desc: 'Peregangan tubuh di sela pergantian jam pelajaran (setiap 2 jam), jalan sehat, dan senam SKJ.' },
      { id: 'item-trias-dokcil', tag: 'L3 · 7/7 · VERIFIED', title: 'Dokter Kecil & KKR', desc: 'Pelatihan kader kesehatan remaja sebaya untuk membantu pertolongan pertama dan pencatatan KMS.' }
    ]
  },
  pelayanan: {
    id: 'pelayanan',
    title: 'Pelayanan Kesehatan',
    kicker: 'Pilar 2 · 4 Indikator Resmi',
    icon: 'fa-solid fa-kit-medical',
    color: '#2563EB',
    bgBadge: '#DBEAFE',
    description: 'Pelayanan kesehatan preventif dan kuratif ringan bekerja sama secara berkala dengan Puskesmas pembina wilayah.',
    indicators: [
      { id: 'item-trias-penjaringan', tag: 'L3 · 1/4', title: 'Penjaringan Berkala', desc: 'Skrining tajam penglihatan, pendengaran, kesehatan gigi dan mulut, serta pengukuran status TB/BB.' },
      { id: 'item-trias-imunisasi', tag: 'L3 · 2/4', title: 'Imunisasi (BIAS & HPV)', desc: 'Pemberian vaksin Campak-Rubella, DT, Td, serta vaksin Human Papillomavirus siswi SD/MI.' },
      { id: 'item-trias-cacing', tag: 'L3 · 3/4', title: 'Pemberian Obat Cacing & TTD', desc: 'Distribusi obat cacing 2x setahun serta Tablet Tambah Darah rutin bagi remaja putri pencegah anemia.' },
      { id: 'item-trias-p3k', tag: 'L3 · 4/4', title: 'P3K dan P3P Sekolah', desc: 'Kesiapan sarana penanganan darurat cedera fisik dan pertolongan pertama penyakit umum siswa.' }
    ]
  },
  lingkungan: {
    id: 'lingkungan',
    title: 'Pembinaan Lingkungan Sekolah Sehat',
    kicker: 'Pilar 3 · 5 Indikator Resmi',
    icon: 'fa-solid fa-seedling',
    color: '#059669',
    bgBadge: '#D1FAE5',
    description: 'Mewujudkan lingkungan fisik, sanitasi, dan sosial yang kondusif bagi tumbuh kembang fisik dan mental yang optimal.',
    indicators: [
      { id: 'item-trias-sanitasi', tag: 'L3 · 1/5', title: 'Sanitasi Jamban Berasio', desc: 'Ketersediaan jamban bersih terpisah gender (1:25 siswi, 1:40 siswa), air mengalir, dan sabun cuci tangan.' },
      { id: 'item-trias-kantin', tag: 'L3 · 2/5', title: 'Pembinaan Kantin Sehat', desc: 'Pemeriksaan berkala pengolahan makanan higienis, penjamah bersertifikat, dan bebas 5P kimiawi.' },
      { id: 'item-trias-pekarangan', tag: 'L3 · 3/5', title: 'Pekarangan Sekolah (TOGA)', desc: 'Penghijauan lingkungan, penanaman Tanaman Obat Keluarga, serta pemilahan sampah organik-anorganik.' },
      { id: 'item-trias-psn', tag: 'L3 · 4/5', title: 'Pemberantasan Sarang Nyamuk (PSN)', desc: 'Gerakan 3M Plus mingguan, pemantauan jentik mandiri oleh juru pemantau jentik (Jumantik) cilik.' },
      { id: 'item-trias-ktr', tag: 'L3 · 5/5 · VERIFIED', title: 'Kawasan Bebas Rokok & Napza', desc: 'Zona 100% bebas asap rokok, nihil perundungan fisik/verbal, dan perlindungan dari pornografi.' }
    ]
  }
};

/* ============================================================
   STRATIFIKASI UKS/M (4 STRATA)
   ============================================================ */
export const strataLevels = [
  {
    key: 'minimal',
    name: '1. Strata Minimal',
    subtitle: 'Pemenuhan sarpras dasar & pelayanan darurat',
    color: '#64748B',
    bgColor: '#F1F5F9',
    requirements: [
      'Pendidikan kesehatan terintegrasi jam olahraga / tematik.',
      'Tersedia tempat cuci tangan darurat & air bersih mengalir.',
      'Kotak P3K standar dengan obat luar dasar.',
      'SK Tim Pelaksana UKS sekolah diterbitkan.'
    ]
  },
  {
    key: 'standar',
    name: '2. Strata Standar',
    subtitle: 'Penjaringan rutin & ruang UKS mandiri',
    color: '#2563EB',
    bgColor: '#DBEAFE',
    requirements: [
      'Ruang UKS mandiri dengan tempat tidur periksa & KMS.',
      'Penjaringan kesehatan peserta didik minimal 1x per tahun.',
      'Kantin sekolah dipantau kebersihannya secara berkala.',
      'Pelaksanaan pembiasaan cuci tangan pakai sabun bersama.'
    ]
  },
  {
    key: 'optimal',
    name: '3. Strata Optimal',
    subtitle: 'Kader aktif & kantin sehat higienis',
    color: '#D97706',
    bgColor: '#FEF3C7',
    requirements: [
      'Dokter Kecil / KKR aktif minimal 10% dari total siswa.',
      'Kantin sehat teruji bebas bahan kimia berbahaya (formalin/boraks).',
      'Pekarangan sekolah dimanfaatkan untuk TOGA (tanaman obat).',
      'Pembiasaan aktivitas fisik senam berkala 2x seminggu.'
    ]
  },
  {
    key: 'paripurna',
    name: '4. Strata Paripurna ★',
    subtitle: 'Kawasan bebas rokok/napza & rekam medis digital',
    color: '#098C4C',
    bgColor: '#D2E8DA',
    requirements: [
      'Kawasan 100% Bebas Asap Rokok, Napza, dan Anti-Kekerasan.',
      'Rasio sanitasi jamban gender: 1:25 siswi dan 1:40 siswa.',
      'Integrasi rekam kesehatan digital terhubung Puskesmas wilayah.',
      'Kemandirian pembiasaan 5 Sehat GSS di seluruh warga sekolah.'
    ]
  }
];

/* ============================================================
   5 FOKUS PEMBIASAAN GSS
   ============================================================ */
export const gssFocusList = [
  {
    id: 'sec-gss-bergizi',
    title: '1. Sehat Bergizi',
    icon: 'fa-solid fa-apple-whole',
    color: '#098C4C',
    bg: '#D2E8DA',
    tag: 'GIZI & MBG',
    description: 'Penerapan pola makan gizi seimbang, pembiasaan sarapan sehat, minum air putih 2 liter per hari, dan pembatasan makanan instan berkadar gula-garam-lemak tinggi.',
    action: 'Sosialisasi Isi Piringku mingguan, makan bersama terjadwal, dan sertifikasi kantin sehat BPOM.'
  },
  {
    id: 'sec-gss-fisik',
    title: '2. Sehat Fisik',
    icon: 'fa-solid fa-person-running',
    color: '#2563EB',
    bg: '#DBEAFE',
    tag: 'AKTIVITAS GERAK',
    description: 'Mendorong aktivitas fisik teratur untuk meningkatkan kebugaran jasmani peserta didik, mencegah obesitas, serta meningkatkan fokus konsentrasi belajar.',
    action: 'Senam Kesegaran Jasmani (SKJ) 1x per minggu dan peregangan otot selama 3 menit setiap 2 jam pelajaran.'
  },
  {
    id: 'sec-gss-imunisasi',
    title: '3. Sehat Imunisasi',
    icon: 'fa-solid fa-syringe',
    color: '#7C3AED',
    bg: '#EDE9FE',
    tag: 'KEKEBALAN KELOMPOK',
    description: 'Mendukung tercapainya cakupan imunisasi dasar dan lanjutan secara lengkap guna menciptakan herd immunity dari penyakit yang dapat dicegah dengan imunisasi (PD3I).',
    action: 'Verifikasi status imunisasi pada PPDB, fasilitasi Bulan Imunisasi Anak Sekolah (BIAS), dan edukasi orang tua.'
  },
  {
    id: 'sec-gss-jiwa',
    title: '4. Sehat Jiwa',
    icon: 'fa-solid fa-brain',
    color: '#D97706',
    bg: '#FEF3C7',
    tag: 'MENTAL & ANTI-BULLYING',
    description: 'Menciptakan lingkungan belajar yang aman, suportif, dan menyenangkan untuk perkembangan kesehatan emosional peserta didik tanpa intimidasi.',
    action: 'Kebijakan nol toleransi perundungan, optimalisasi konseling Guru BK ramah anak, dan afirmasi positif.'
  },
  {
    id: 'sec-gss-lingkungan',
    title: '5. Sehat Lingkungan',
    icon: 'fa-solid fa-leaf',
    color: '#059669',
    bg: '#D1FAE5',
    tag: 'SANITASI & IKLIM',
    description: 'Mewujudkan satuan pendidikan yang bersih, hijau, ramah iklim, bebas sarang nyamuk, serta memiliki akses sanitasi dan air minum layak.',
    action: 'Pemilahan sampah organik & daur ulang, kampanye hemat air, dan inspeksi jentik nyamuk mingguan.'
  }
];

/* ============================================================
   BAHAN ADVOKASI GSS (LISTING UNDUHAN)
   ============================================================ */
export const gssAdvocacyDocs = [
  {
    id: 'doc-1',
    category: 'buku',
    format: 'PDF',
    formatColor: '#DC2626',
    formatBg: '#FEE2E2',
    size: '4.8 MB',
    title: 'Buku Saku Gerakan Sekolah Sehat (GSS) Edisi Revisi',
    desc: 'Pedoman teknis implementasi 5 Sehat bagi Kepala Satuan Pendidikan dan Tim Pembina UKS.',
    file: 'Aset UKS/buku1.pdf',
    badge: 'PEDOMAN RESMI'
  },
  {
    id: 'doc-2',
    category: 'buku',
    format: 'PDF',
    formatColor: '#DC2626',
    formatBg: '#FEE2E2',
    size: '8.2 MB',
    title: 'Modul Panduan Pembiasaan 5 Sehat di Satuan Pendidikan',
    desc: 'Silabus panduan praktis integrasi pembelajaran tematik dan jam ekstrakurikuler sekolah.',
    file: 'Aset UKS/buku2.pdf',
    badge: 'MODUL GURU'
  },
  {
    id: 'doc-3',
    category: 'instrumen',
    format: 'XLSX',
    formatColor: '#166534',
    formatBg: '#DCFCE7',
    size: '1.4 MB',
    title: 'Instrumen Monitoring & Evaluasi Kesiapan Stratifikasi UKS/M',
    desc: 'Lembar kerja verifikasi mandiri 4 kategori indikator sebelum disubmit ke portal pusat.',
    file: '#',
    badge: 'INSTRUMEN EXCEL'
  },
  {
    id: 'doc-4',
    category: 'poster',
    format: 'ZIP',
    formatColor: '#92400E',
    formatBg: '#FEF3C7',
    size: '18.5 MB',
    title: 'Paket Infografis & Poster Siap Cetak (A3) — Kampanye 5 Sehat',
    desc: '10 desain poster beresolusi tinggi untuk mading, dinding kantin, dan selasar ruang kelas.',
    file: '#',
    badge: 'MEDIA CETAK'
  },
  {
    id: 'doc-5',
    category: 'buku',
    format: 'PDF',
    formatColor: '#DC2626',
    formatBg: '#FEE2E2',
    size: '3.6 MB',
    title: 'Pedoman Penyelenggaraan Kantin Sehat dan Bergizi di Sekolah',
    desc: 'Standar higienitas, daftar bahan kimia terlarang, dan panduan menu sehat bersama BPOM.',
    file: 'Aset UKS/buku3.pdf',
    badge: 'STANDAR BPOM'
  }
];

/* ============================================================
   PROGRAM PRIORITAS 2026
   ============================================================ */
export const priorityProgramsList = [
  {
    id: 'sec-prog-mbg',
    title: 'Makan Bergizi Gratis (MBG)',
    kicker: 'Program Prioritas 1',
    agency: 'Badan Gizi Nasional (BGN) & Kemendikdasmen',
    desc: 'Pemenuhan nutrisi harian peserta didik guna mencetak generasi unggul, bebas stunting, serta pembiasaan adab makan santun dan cuci tangan sebelum makan.',
    pillars: [
      'Pemenuhan gizi seimbang harian (karbohidrat, protein hewani/nabati, serat sayur & buah).',
      'Pemberdayaan dapur satuan layanan gizi lokal dengan higienitas tersertifikasi.',
      'Edukasi adab makan, rasa syukur, dan kebersihan wadah pakai ulang (ompreng ramah lingkungan).'
    ],
    links: [
      { label: 'Portal Dasbor MBG', url: 'https://mbg.pdm.kemendikdasmen.go.id/portal' },
      { label: 'Badan Gizi Nasional', url: 'https://www.bgn.go.id/' }
    ],
    icon: 'fa-solid fa-utensils',
    image: 'Aset UKS/beritagambar1.png'
  },
  {
    id: 'sec-prog-ckg',
    title: 'Cek Kesehatan Gratis (CKG)',
    kicker: 'Program Prioritas 2',
    agency: 'Kementerian Kesehatan RI & Puskesmas Pembina',
    desc: 'Pemeriksaan kesehatan preventif berkala yang menyasar seluruh peserta didik pada awal tahun ajaran dan pertengahan semester.',
    pillars: [
      'Pemeriksaan tajam penglihatan (visus mata) dan pendengaran.',
      'Pemeriksaan karies gigi, kebersihan mulut, dan pengukuran tinggi/berat badan (IMT).',
      'Skrining anemia siswi melalui pengukuran hemoglobin dan pemberian Tablet Tambah Darah (TTD).'
    ],
    links: [
      { label: 'SatuSehat Kemenkes', url: 'https://satusehat.kemkes.go.id/' }
    ],
    icon: 'fa-solid fa-stethoscope',
    image: 'Aset UKS/bertaigambar2.png'
  },
  {
    id: 'sec-prog-7kaih',
    title: '7 Kebiasaan Anak Indonesia Hebat (7KAIH)',
    kicker: 'Program Prioritas 3',
    agency: 'Kemendikdasmen RI · Karakter Bangsa',
    desc: 'Tujuh kebiasaan harian yang dibangun bersama orang tua dan guru di satuan pendidikan untuk menumbuhkan karakter mulia dan disiplin hidup sehat.',
    pillars: [
      '1. Bangun pagi dan beribadah tepat waktu.',
      '2. Berolahraga dan bergerak aktif minimal 30 menit.',
      '3. Sarapan sehat bergizi seimbang.',
      '4. Gemar membaca dan belajar tekun.',
      '5. Bermasyarakat, gotong royong dan tolong menolong.',
      '6. Istirahat dan tidur cukup 8 jam per hari.',
      '7. Menjaga kebersihan diri serta lingkungan sekitar.'
    ],
    links: [],
    icon: 'fa-solid fa-medal',
    image: 'Aset UKS/gambar3.png'
  },
  {
    id: 'sec-prog-saih',
    title: 'Semarak Anak Indonesia Hebat (SAIH)',
    kicker: 'Program Prioritas 4',
    agency: 'Kemendikdasmen RI · Apresiasi Nasional',
    desc: 'Ajang apresiasi karya inovatif, mading kreasi, dan jambore dokter kecil tingkat nasional dalam menggemakan budaya sekolah sehat.',
    pillars: [
      'Gala Kreasi Video Gerakan 5 Sehat antarsekolah se-Indonesia.',
      'Lomba Mading Edukasi Gizi & Kantin Kejujuran.',
      'Forum Temu Kader Kesehatan Remaja Pembina Nasional.'
    ],
    links: [],
    icon: 'fa-solid fa-star',
    image: 'Aset UKS/Gambarberita3.png'
  }
];

/* ============================================================
   DIGITAL BOOKS (REAL DATA & REAL COVERS)
   ============================================================ */
export const realBooksList = [
  {
    id: 1,
    title: 'Buku Pedoman Kesehatan Jiwa di Satpen SMP',
    category: 'Modul Guru & Siswa SMP',
    categoryKey: 'modul',
    year: '2026',
    desc: 'Pedoman deteksi dini masalah emosional, penanganan perundungan, dan bimbingan konseling sebaya di lingkungan sekolah menengah pertama.',
    cover: 'Aset UKS/bukucover1.png',
    pdf: 'Aset UKS/buku1.pdf',
    pages: '114 Halaman',
    size: '8.5 MB'
  },
  {
    id: 2,
    title: 'Panduan Implementasi Program MBG di Satuan Pendidikan',
    category: 'Pedoman Satuan Pendidikan',
    categoryKey: 'mbg',
    year: '2026',
    desc: 'Petunjuk teknis higienitas distribusi makanan bergizi, tata kelola ompreng ramah lingkungan, serta SOP pengawasan bersama Puskesmas.',
    cover: 'Aset UKS/coverbuku2.png',
    pdf: 'Aset UKS/buku2.pdf',
    pages: '96 Halaman',
    size: '11.2 MB'
  },
  {
    id: 3,
    title: 'Buku Pedoman Pendidikan Karakter dalam MBG',
    category: 'Karakter & Adab Makan',
    categoryKey: 'karakter',
    year: '2026',
    desc: 'Pedoman mengintegrasikan adab makan bersyukur, saling berbagi, toleransi, dan tanggung jawab membersihkan meja makan bagi siswa.',
    cover: 'Aset UKS/coverbuku3.png',
    pdf: 'Aset UKS/Buku Pedoman Pendidikan Karakter dalam MBG-dikompresi.pdf',
    pages: '78 Halaman',
    size: '2.4 MB'
  },
  {
    id: 4,
    title: 'Buku Pedoman Manajemen Pembinaan UKS/M',
    category: 'Tata Kelola & SOP',
    categoryKey: 'manajemen',
    year: '2026',
    desc: 'Buku induk panduan bagi pemerintah daerah dan sekolah dalam merancang rencana kerja tahunan (RKT), alokasi dana BOS, dan sarpras UKS.',
    cover: 'Aset UKS/coverbuku4.png',
    pdf: 'Aset UKS/buku3.pdf',
    pages: '142 Halaman',
    size: '6.3 MB'
  }
];

/* ============================================================
   WARTA BERITA REAL
   ============================================================ */
export const realNewsList = [
  {
    id: 1,
    category: 'Kebijakan',
    categoryKey: 'kebijakan',
    date: '14 September 2026',
    title: 'Peluncuran Standardisasi Ruang UKS Ramah Anak 2026 di Seluruh Satpen',
    excerpt: 'Kementerian Pendidikan Dasar dan Menengah merilis petunjuk teknis fasilitas UKS modern yang ramah anak, terpisah gender, dan siap tanggap darurat.',
    image: 'Aset UKS/beritagambar1.png',
    views: '2.4k'
  },
  {
    id: 2,
    category: 'Kegiatan',
    categoryKey: 'kegiatan',
    date: '12 September 2026',
    title: 'Bulan Imunisasi Anak Sekolah (BIAS) Serentak Nasional Melibatkan 38 Provinsi',
    excerpt: 'Sinergi Kemendikdasmen dan Kemenkes memastikan seluruh siswa kelas 1, 2, dan 5 SD/MI mendapatkan vaksinasi campak-rubella dan HPV tepat waktu.',
    image: 'Aset UKS/bertaigambar2.png',
    views: '3.1k'
  },
  {
    id: 3,
    category: 'Inovasi GSS',
    categoryKey: 'sosialisasi',
    date: '10 September 2026',
    title: 'Inovasi Kantin Sehat Berkelanjutan Tanpa 5P di Satuan Pendidikan Percontohan',
    excerpt: 'Penguatan kemitraan dengan paguyuban orang tua untuk menghidangkan masakan tradisional bergizi tinggi bebas pengawet dan perasa sintetis.',
    image: 'Aset UKS/gambar3.png',
    views: '1.8k'
  }
];

/* ============================================================
   PRAKTIK BAIK SATUAN PENDIDIKAN
   ============================================================ */
export const bestPracticesList = [
  {
    icon: '🏆',
    level: 'SD Model Paripurna',
    title: 'SDN 1 Wonosobo: Kantin Kejujuran Bebas 5P',
    desc: 'Pemberdayaan paguyuban orang tua memasok menu tradisional lokal bernutrisi tinggi bebas 5P (pengawet, perasa, pemanis, pewarna sintetis, pengenyal).'
  },
  {
    icon: '💡',
    level: 'SMP Inovatif Sehat',
    title: 'SMPN 4 Singaraja: Aplikasi Pantau Kebugaran',
    desc: 'Digitalisasi kartu pantau fisik mandiri siswa untuk mencatat rekor peregangan kelas, hidrasi 2 liter air, dan waktu tidur teratur.'
  },
  {
    icon: '🌿',
    level: 'SMA Adiwiyata Mandiri',
    title: 'SMAN 2 Padang: Bank Sampah & Apotek TOGA',
    desc: 'Pengolahan kompos sisa makanan kantin menjadi pupuk organik kebun sayur sekolah dan budidaya tanaman obat keluarga.'
  }
];

/* ============================================================
   KATALOG MITRA MULTIPIHAK
   ============================================================ */
export const activePartnersList = [
  { name: 'Danone Indonesia', role: 'Air Bersih & Edukasi Hidrasi Sehat', scope: 'Nasional · 1.200 Sekolah' },
  { name: 'Unilever Indonesia', role: 'Kampanye Cuci Tangan Pakai Sabun (CTPS)', scope: 'Nasional · 3.500 Sekolah' },
  { name: 'UNICEF Indonesia', role: 'Sanitasi Total Berbasis Masyarakat (STBM) Sekolah', scope: 'Wilayah 3T' },
  { name: 'SEAMEO RECFON', role: 'Nutrition Goes to School (NGTS) & Modul Pangan', scope: 'Asia Tenggara & RI' },
  { name: 'BPOM RI', role: 'Sertifikasi Keamanan Pangan & Uji Sampel Kantin', scope: '38 Provinsi' },
  { name: 'Save the Children', role: 'Perlindungan Anak & Sekolah Ramah Iklim', scope: 'Nasional' }
];

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
export const faqsList = [
  {
    q: 'Apakah dana Bantuan Operasional Satuan Pendidikan (BOSP) dapat digunakan untuk UKS?',
    a: 'Ya, sesuai petunjuk teknis pengelolaan dana BOSP Kemendikdasmen, pembiayaan pengadaan obat-obatan P3K, alat ukur TB/BB, sabun cuci tangan, pemeliharaan sanitasi toilet, dan pembinaan kader UKS dapat dialokasikan melalui komponen pemeliharaan sarana dan pembinaan peserta didik.'
  },
  {
    q: 'Bagaimana cara satuan pendidikan mengajukan kerja sama (MOU) dengan Puskesmas?',
    a: 'Kepala Satuan Pendidikan mengirimkan surat permohonan Perjanjian Kerja Sama (PKS) pelaksanaan Trias UKS ke Puskesmas di wilayah kerja setempat, yang kemudian dikoordinasikan dengan Dinas Kesehatan dan Tim Pembina UKS Kecamatan.'
  },
  {
    q: 'Apa syarat minimum agar sekolah mencapai Stratifikasi Standar?',
    a: 'Sekolah harus memenuhi 100% indikator Strata Minimal terlebih dahulu, memiliki ruang UKS dengan tempat tidur periksa terpisah, air bersih mengalir, jadwal rutin penjaringan berkala bersama Puskesmas, serta kantin sekolah yang tidak menjual makanan berpemanis atau berpengawet sintetis berlebih.'
  }
];

/* ============================================================
   INFOGRAFIS ASSETS
   ============================================================ */
export const defaultInfografis = [
  { title: 'Informasi Kesehatan Sekolah', image: 'Aset UKS/infograsi1.png' },
  { title: 'Lingkungan Sekolah Sehat', image: 'Aset UKS/qtu5X5mZ0OG3FyNWd3ylbvUowy0kBlhOi6hAakTU.jpg' },
  { title: 'Edukasi Kesehatan Peserta Didik', image: 'Aset UKS/IoXWcqNbTfrFivbEdyumvg78d4dwkaLhY2ZPRbzW.jpg' }
];

export const defaultScreenshots = [
  'Aset UKS/Screenshot 2026-09-09 105341.png', 'Aset UKS/Screenshot 2026-09-09 105347.png',
  'Aset UKS/Screenshot 2026-09-09 105351.png', 'Aset UKS/Screenshot 2026-09-09 105355.png',
  'Aset UKS/Screenshot 2026-09-09 105400.png', 'Aset UKS/Screenshot 2026-09-09 105406.png',
  'Aset UKS/Screenshot 2026-09-09 105412.png', 'Aset UKS/Screenshot 2026-09-09 105418.png',
  'Aset UKS/Screenshot 2026-09-09 105423.png', 'Aset UKS/Screenshot 2026-09-09 105428.png',
  'Aset UKS/Screenshot 2026-09-09 105433.png', 'Aset UKS/Screenshot 2026-09-09 105500.png',
  'Aset UKS/Screenshot 2026-09-09 105505.png', 'Aset UKS/Screenshot 2026-09-09 105511.png'
];

