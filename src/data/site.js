/**
 * SITE CHROME & EXTERNAL SERVICES DATA
 * Contact info, applications directory, and FAQs. Ministry portals and
 * their linked groups now come from the API (see src/hooks/usePublicLists.js).
 */

// Curated hero slide list. Each entry is either a { slug } reference resolved
// against the berita API list, or a standalone slide with its own
// id/image/category/title/excerpt.
export const heroSlides = [
  { slug: 'hari-anak-nasional-2026-kembali-bermain-kurangi-gawai' },
  { slug: 'kemendikdasmen-bagikan-30-laptop-guru-miangas' },
  { slug: 'semarak-lomba-kemerdekaan-budaya-sehat-pendidikan-bermutu' },
  { slug: 'kemendikdasmen-perkuat-uks-sekolah-sehat-berkarakter' },
  {
    id: 'rakor-upt-edukasi-gizi-2026',
    image: '/Aset UKS/hero/rakor-upt-edukasi-gizi-2026.jpg',
    category: 'Agenda',
    date: '21 Agustus 2026',
    title: 'Rapat Koordinasi UPT Implementasi Edukasi Gizi Perkuat Sinergi Pendampingan di Satuan Pendidikan',
    excerpt: 'Direktorat SMP mempertemukan penanggung jawab Makan Bergizi Gratis dari 34 UPT BBPMP/BPMP se-Indonesia untuk menyamakan langkah pendampingan edukasi gizi di satuan pendidikan.'
  },
  {
    id: 'perkemahan-anak-indonesia-hebat-smp-2026',
    image: '/Aset UKS/hero/perkemahan-anak-indonesia-hebat-smp-2026.jpg',
    category: 'Agenda',
    date: '2 September 2026',
    title: 'Perkemahan Anak Indonesia Hebat Jenjang Sekolah Menengah Pertama Tahun 2026',
    excerpt: 'Kemendikdasmen menggelar perkemahan lima hari di Camp Hulu Cai, Bogor, yang diikuti 407 murid SMP dari berbagai daerah, dengan tema Tunas Aman, Sekolah Nyaman.'
  }
];

export const contactInfo = {
  address: 'Gedung E Lantai 17, Kompleks Kemendikdasmen, Jl. Jenderal Sudirman, Senayan, Jakarta 10270',
  email: 'uks.dikdasmen@kemdikbud.go.id',
  phone: '(021) 572-5034',
  ultPhone: '177',
  websiteUrl: 'https://uks.kemendikdasmen.go.id',
  operatingHours: 'Senin - Jumat, 08.00 - 16.00 WIB',
  copyrightYear: '2026'
};

export const appsList = [
  {
    id: 'oky',
    name: 'Oky Period Tracker',
    publisher: 'UNICEF Indonesia',
    badge: 'KESEHATAN REMAJA',
    tagline: 'Aplikasi Edukasi Pubertas & Menstruasi Ramah Remaja',
    description: 'Aplikasi pelacak menstruasi pertama di dunia yang dirancang bersama anak perempuan untuk memantau siklus, edukasi kebersihan reproduksi, dan tips kesehatan emosional.',
    icon: '/Aset UKS/aplikasi/oky.png',
    featuredOnHome: true,
    color: '#BE185D',
    bgColor: '#FCE7F3',
    links: [
      { store: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.oky.id', icon: 'fa-brands fa-google-play' }
    ]
  },
  {
    id: 'satusehat',
    name: 'SATUSEHAT Mobile',
    publisher: 'Kementerian Kesehatan RI',
    badge: 'REKAM KESEHATAN',
    tagline: 'Platform Resmi Catatan Imunisasi & Skrining Siswa',
    description: 'Aplikasi kesehatan resmi Kemenkes RI untuk menyimpan sertifikat imunisasi anak sekolah (BIAS), rekam medis digital, dan skrining berkala terintegrasi fasilitas kesehatan.',
    icon: '/Aset UKS/aplikasi/satusehat.png',
    featuredOnHome: true,
    color: '#0369A1',
    bgColor: '#E0F2FE',
    links: [
      { store: 'Google Play', url: 'https://play.google.com/store/apps/details?id=dto.kemkes.satusehat', icon: 'fa-brands fa-google-play' },
      { store: 'Portal Web', url: 'https://satusehat.kemkes.go.id/', icon: 'fa-solid fa-globe' }
    ]
  },
  {
    id: 'sijiwa',
    name: 'SIJIWA (Sistem Informasi Jiwa)',
    publisher: 'Garuda Teknologi Indonesia',
    badge: 'KESEHATAN MENTAL',
    tagline: 'Sistem Deteksi Dini & Konseling Ramah Anak',
    description: 'Sistem informasi kesehatan jiwa anak sekolah untuk memfasilitasi guru BK dan wali kelas dalam melakukan skrining awal kesejahteraan mental dan psikososial peserta didik.',
    icon: '/Aset UKS/aplikasi/sijiwa.png',
    featuredOnHome: false,
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    links: [
      { store: 'Portal Layanan', url: 'https://kemkes.go.id', icon: 'fa-solid fa-globe' }
    ]
  }
];

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
