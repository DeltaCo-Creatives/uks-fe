/**
 * TRIAS UKS/M — PLAIN-LANGUAGE SUMMARIES
 *
 * Short, easy-to-read companions to the verbatim copy in trias.js, keyed by
 * the same pillar/item ids. Every fact here is condensed from that official
 * text; the full text stays one tap away on the page.
 *
 * item: { icon, short (one line, shown on the closed row),
 *         summary (1–2 sentences, null while the item is a placeholder),
 *         facts: { label, icon, value }[] }
 */

const FACT_ICONS = {
  Waktu: 'fa-regular fa-clock',
  Tempat: 'fa-solid fa-location-dot',
  Pelaksana: 'fa-solid fa-user-group',
  Sasaran: 'fa-solid fa-bullseye'
};

const facts = (entries) => entries.map(([label, value]) => ({ label, value, icon: FACT_ICONS[label] }));

export const triasPillarTaglines = {
  pendidikan: 'Mengajak siswa memahami dan membiasakan hidup sehat setiap hari.',
  pelayanan: 'Pemeriksaan, imunisasi, dan pertolongan pertama di sekolah.',
  lingkungan: 'Menjaga lingkungan sekolah tetap bersih, sehat, dan aman.'
};

export const triasItemSummaries = {
  'literasi-kesehatan': {
    icon: 'fa-solid fa-book-open',
    short: 'Belajar kesehatan lewat membaca, diskusi, dan proyek seru.',
    summary: 'Siswa belajar tentang kesehatan dengan cara yang menarik: membaca buku kesehatan, berdiskusi dengan guru, membuat poster atau video, dan bermain.',
    facts: facts([['Waktu', 'Min. 1× seminggu, 15 menit'], ['Tempat', 'Di kelas atau luar kelas'], ['Pelaksana', 'Guru kelas & siswa']])
  },
  'perilaku-hidup-bersih-dan-sehat': {
    icon: 'fa-solid fa-hand-sparkles',
    short: 'Kebiasaan hidup bersih dan sehat sehari-hari.',
    summary: null,
    facts: []
  },
  'pendidikan-gizi': {
    icon: 'fa-solid fa-apple-whole',
    short: 'Sarapan bersama dan belajar makan bergizi seimbang.',
    summary: 'Siswa belajar memilih makanan bergizi seimbang (Isi Piringku), sarapan bersama di sekolah, dan mengurangi jajanan tinggi gula, garam, dan lemak.',
    facts: facts([['Waktu', 'Min. 1× seminggu, sebelum jam pertama'], ['Tempat', 'Di kelas masing-masing'], ['Pelaksana', 'Guru kelas, kader kesehatan & siswa']])
  },
  'pendidikan-kesehatan-reproduksi': {
    icon: 'fa-solid fa-heart-pulse',
    short: 'Mengenal dan merawat kesehatan tubuh sesuai usia.',
    summary: 'Siswa mendapat pengetahuan kesehatan reproduksi yang sesuai usianya, misalnya cara merawat kebersihan diri dan menjaga diri.',
    facts: facts([['Waktu', 'Min. 1× seminggu'], ['Pelaksana', 'Guru kelas, guru IPA/PJOK & guru UKS/M']])
  },
  'pendidikan-karakter': {
    icon: 'fa-solid fa-face-smile',
    short: 'Melatih keterampilan hidup, seperti empati dan mengenal diri.',
    summary: 'Siswa dilatih 10 keterampilan hidup sehat, seperti empati dan kesadaran diri, agar mampu menghadapi masalah sehari-hari dengan baik.',
    facts: facts([['Waktu', 'Min. 1× seminggu'], ['Tempat', 'Di kelas atau luar kelas'], ['Pelaksana', 'Guru kelas, guru mapel & guru UKS/M']])
  },
  'pembiasaan-aktivitas-fisik': {
    icon: 'fa-solid fa-person-running',
    short: 'Rutin bergerak: peregangan, bermain, dan olahraga.',
    summary: 'Siswa dibiasakan aktif bergerak setiap hari: peregangan di sela pelajaran, serta lari, lompat, dan lempar saat istirahat agar tetap bugar.',
    facts: facts([['Waktu', 'Setiap hari, min. 1× peregangan'], ['Tempat', 'Di kelas & lapangan sekolah'], ['Pelaksana', 'Siswa, guru kelas & guru PJOK']])
  },
  'dokter-kecil': {
    icon: 'fa-solid fa-user-doctor',
    short: 'Siswa terlatih yang membantu menjaga kesehatan teman.',
    summary: 'Dokter kecil adalah siswa yang sudah dilatih untuk mengajak teman hidup sehat, membantu P3K, dan mengamati kebersihan sekolah.',
    facts: facts([['Pelaksana', 'Siswa terpilih yang sudah dilatih']])
  },
  'penjaringan-kesehatan-dan-pemeriksaan-berkala': {
    icon: 'fa-solid fa-clipboard-check',
    short: 'Pemeriksaan kesehatan untuk semua siswa.',
    summary: 'Siswa baru (kelas 1, 7, dan 10) diperiksa kesehatannya saat masuk sekolah. Siswa di kelas lainnya diperiksa secara berkala.',
    facts: facts([['Sasaran', 'Semua siswa, kelas 1–12']])
  },
  imunisasi: {
    icon: 'fa-solid fa-syringe',
    short: 'Imunisasi lanjutan di sekolah melalui BIAS.',
    summary: 'Puskesmas memberikan imunisasi lanjutan kepada siswa SD/MI di sekolah agar kebal terhadap penyakit. Program ini disebut BIAS.',
    facts: facts([['Waktu', 'Setiap Agustus & November'], ['Tempat', 'Di sekolah (atau Puskesmas)'], ['Pelaksana', 'Puskesmas, dibantu guru & orang tua']])
  },
  'pemberian-obat-cacing': {
    icon: 'fa-solid fa-capsules',
    short: 'Minum obat cacing bersama untuk mencegah cacingan.',
    summary: 'Siswa PAUD dan SD/MI minum obat cacing bersama di kelas untuk mencegah penyakit cacingan.',
    facts: facts([['Waktu', '1–2× setahun, sesuai daerah'], ['Tempat', 'Di kelas masing-masing'], ['Pelaksana', 'Puskesmas, guru UKS/M & kader']])
  },
  'p3k-dan-p3p': {
    icon: 'fa-solid fa-kit-medical',
    short: 'Pertolongan pertama saat siswa cedera atau sakit.',
    summary: 'Jika siswa jatuh, terluka, atau tiba-tiba sakit di sekolah, petugas terlatih memberi pertolongan pertama sebelum dibawa ke fasilitas kesehatan.',
    facts: facts([['Tempat', 'Ruang UKS/M'], ['Pelaksana', 'Guru terlatih, PMR & kader kesehatan']])
  },
  'sanitasi-sekolah': {
    icon: 'fa-solid fa-broom',
    short: 'Menjaga air, toilet, dan tempat sampah tetap bersih.',
    summary: 'Sekolah menyediakan air bersih, jamban sehat, tempat cuci tangan, dan tempat sampah, lalu membersihkannya secara rutin.',
    facts: facts([['Waktu', 'Bersih-bersih min. 2× sehari'], ['Tempat', 'Seluruh lingkungan sekolah'], ['Pelaksana', 'Seluruh warga sekolah']])
  },
  'pembinaan-kantin-sehat': {
    icon: 'fa-solid fa-store',
    short: 'Kantin yang menjual makanan dan minuman sehat.',
    summary: 'Kantin dan pedagang di sekitar sekolah dibina agar menjual makanan yang bergizi, bersih, dan aman.',
    facts: facts([['Waktu', 'Terus-menerus'], ['Tempat', 'Kantin & pedagang sekitar sekolah'], ['Pelaksana', 'Sekolah, Puskesmas & pengelola kantin']])
  },
  'pemanfaatan-pekarangan-sekolah': {
    icon: 'fa-solid fa-seedling',
    short: 'Menanam sayur, buah, dan tanaman obat di halaman sekolah.',
    summary: 'Halaman sekolah yang kosong ditanami sayur, buah, tanaman obat, dan tanaman pengusir nyamuk bersama siswa.',
    facts: facts([['Waktu', 'Terus-menerus, bisa lewat IPA/Pramuka'], ['Tempat', 'Halaman sekolah'], ['Pelaksana', 'Seluruh warga sekolah']])
  },
  'pemberantasan-sarang-nyamuk': {
    icon: 'fa-solid fa-mosquito',
    short: 'Mencegah nyamuk dengan 3M: menutup, menguras, memanfaatkan.',
    summary: 'Siswa memeriksa jentik nyamuk dan melakukan 3M (menutup, menguras, memanfaatkan barang bekas) agar sekolah bebas sarang nyamuk.',
    facts: facts([['Waktu', 'Min. 1× seminggu'], ['Pelaksana', 'Siswa, dipantau Jumantik']])
  },
  'kawasan-tanpa-rokok-napza-kekerasan-pornografi': {
    icon: 'fa-solid fa-ban-smoking',
    short: 'Sekolah bebas rokok, narkoba, kekerasan, dan pornografi.',
    summary: 'Sekolah menetapkan aturan agar seluruh lingkungannya bebas dari rokok, NAPZA (narkoba), kekerasan, dan pornografi.',
    facts: facts([['Waktu', 'Setiap saat'], ['Tempat', 'Seluruh lingkungan sekolah'], ['Pelaksana', 'Seluruh warga sekolah']])
  }
};
