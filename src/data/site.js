/**
 * SITE CHROME & EXTERNAL SERVICES DATA
 * Contact info, tautan links, applications directory, and ministry portals
 */

export const contactInfo = {
  address: 'Gedung E Lantai 17, Kompleks Kemendikdasmen, Jl. Jenderal Sudirman, Senayan, Jakarta 10270',
  email: 'uks.dikdasmen@kemdikbud.go.id',
  phone: '(021) 572-5034',
  ultPhone: '177',
  websiteUrl: 'https://uks.kemendikdasmen.go.id',
  operatingHours: 'Senin - Jumat, 08.00 - 16.00 WIB',
  copyrightYear: '2026'
};

export const tautanGroups = [
  {
    group: 'Kemenkes',
    title: 'Kementerian Kesehatan',
    icon: 'fa-solid fa-heart-pulse',
    links: [
      { label: 'Kementerian Kesehatan', url: 'https://kemkes.go.id' },
      { label: 'Ayo Sehat Kemenkes', url: 'https://ayosehat.kemkes.go.id' },
      { label: 'Perangkat Ajar Kesehatan', url: 'https://ayosehat.kemkes.go.id/perangkat-ajar-kesehatan' }
    ]
  },
  {
    group: 'Kemendikdasmen',
    title: 'Kementerian Pendidikan Dasar & Menengah',
    icon: 'fa-solid fa-graduation-cap',
    links: [
      { label: 'Ditjen PAUDDIKDASMEN', url: 'https://pdm.kemendikdasmen.go.id' },
      { label: 'Direktorat PAUD', url: 'https://paudpedia.kemendikdasmen.go.id' },
      { label: 'Direktorat SD', url: 'https://ditsd.kemendikdasmen.go.id' },
      { label: 'Direktorat SMP', url: 'https://ditsmp.kemendikdasmen.go.id' },
      { label: 'Direktorat SMA', url: 'https://sma.kemendikdasmen.go.id' }
    ]
  },
  {
    group: 'Kemenag',
    title: 'Kementerian Agama',
    icon: 'fa-solid fa-mosque',
    links: [
      { label: 'Direktorat KSKK Madrasah', url: 'https://pendis.kemenag.go.id/ditkskkmadrasah' },
      { label: 'Direktorat Pesantren', url: 'https://pendis.kemenag.go.id/ditpdpontren' }
    ]
  },
  {
    group: 'Kemendagri',
    title: 'Kementerian Dalam Negeri',
    icon: 'fa-solid fa-building-columns',
    links: [
      { label: 'Direktorat SUPD (Ditjen Bina Bangda)', url: 'https://bangda.kemendagri.go.id' }
    ]
  }
];

export const appsList = [
  {
    id: 'oky',
    name: 'Oky Period Tracker',
    publisher: 'UNICEF Indonesia',
    badge: 'KESEHATAN REMAJA',
    tagline: 'Aplikasi Edukasi Pubertas & Menstruasi Ramah Remaja',
    description: 'Aplikasi pelacak menstruasi pertama di dunia yang dirancang bersama anak perempuan untuk memantau siklus, edukasi kebersihan reproduksi, dan tips kesehatan emosional.',
    icon: 'Aset UKS/aplikasi/oky.png',
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
    icon: 'Aset UKS/aplikasi/satusehat.png',
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
    icon: 'Aset UKS/aplikasi/sijiwa.png',
    featuredOnHome: false,
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    links: [
      { store: 'Portal Layanan', url: 'https://kemkes.go.id', icon: 'fa-solid fa-globe' }
    ]
  }
];

/* Logo files don't exist yet — drop them in public/logo/<id>.png and set
   `logo` to the matching path (e.g. 'logo/kemendikdasmen.png'). Until then
   `logo: null` renders a named placeholder tile instead of a broken <img>. */
export const ministries = [
  {
    id: 'kemendikdasmen',
    name: 'Kementerian Pendidikan Dasar dan Menengah',
    short: 'Kemendikdasmen RI',
    unit: 'Sekretariat Utama',
    logo: null,
    url: 'https://www.kemendikdasmen.go.id'
  },
  {
    id: 'kemenkes',
    name: 'Kementerian Kesehatan',
    short: 'Kemenkes RI',
    unit: 'Dinkes & Puskesmas',
    logo: null,
    url: 'https://kemkes.go.id'
  },
  {
    id: 'kemenag',
    name: 'Kementerian Agama',
    short: 'Kemenag RI',
    unit: 'Madrasah & Ponpes',
    logo: null,
    url: 'https://kemenag.go.id'
  },
  {
    id: 'kemendagri',
    name: 'Kementerian Dalam Negeri',
    short: 'Kemendagri RI',
    unit: 'Pemda & TP UKS',
    logo: null,
    url: 'https://kemendagri.go.id'
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
