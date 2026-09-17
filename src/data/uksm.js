/**
 * UKS/M PROFILE & GSS DATA (Trias lives in ./trias.js, strata in ./stratifikasi.js)
 */

export const nationalMetrics = [
  { value: '534.120+', label: 'Satuan Pendidikan Terbina', sub: 'PAUD, SD, SMP, SMA, SMK & SLB', color: '#098C4C' },
  { value: '53,4 Juta', label: 'Peserta Didik Sehat', sub: 'Penerima Manfaat Trias UKS', color: '#111C16' },
  { value: '514', label: 'Kab/Kota Terkoordinasi', sub: '38 Tim Pembina Provinsi', color: '#2563EB' },
  { value: '14.280', label: 'Strata Paripurna Mandiri', sub: 'Standar Sanitasi & PHBS Lengkap', color: '#D97706' }
];

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

