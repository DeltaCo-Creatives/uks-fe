// Built-in footer, equal to the pre-CMS one: used for any key the API leaves out and as a whole when a request fails.
export const FOOTER_DEFAULTS = {
  'footer.deskripsi': 'Portal Resmi Usaha Kesehatan Sekolah / Madrasah (UKS/M) lintas 4 Kementerian: Kementerian Pendidikan Dasar dan Menengah, Kementerian Kesehatan, Kementerian Agama, dan Kementerian Dalam Negeri Republik Indonesia.',
  'footer.tampilkanDeskripsi': true,
  'footer.judulKontak': 'Sekretariat Pembina',
  'footer.tampilkanKontak': true,
  'footer.kontakAlamat': true,
  'footer.kontakEmail': true,
  'footer.kontakTelepon': true,
  'footer.kontakTeleponUlt': false,
  'footer.kontakJamOperasional': false,
  'footer.kontakWebsite': true,
  'footer.kontakPeta': false,
  'footer.instagramUrl': '',
  'footer.youtubeUrl': '',
  'footer.facebookUrl': '',
  'footer.xUrl': '',
  'footer.tiktokUrl': '',
  'footer.judulNavigasi': 'Peta Navigasi',
  'footer.tampilkanNavigasi': true,
  'footer.judulStatistik': 'Statistik Pengunjung',
  'footer.hakCipta': 'Kementerian Pendidikan Dasar dan Menengah RI · Sekretariat Pembina UKS/M Pusat.',
  'footer.slogan': 'Sinergi 4 Kementerian untuk Indonesia Emas 2045',
  // The statistics column keeps its own switch from the pengunjung module.
  'pengunjung.tampilkanStatistik': true
};

export const DEFAULT_LINKS = [
  { label: 'Beranda', jenis: 'Halaman', halaman: 'beranda' },
  { label: '1. Profil & Tata Kelola', jenis: 'Halaman', halaman: 'uksm-profil' },
  { label: '2. TRIAS UKS/M', jenis: 'Halaman', halaman: 'uksm-trias' },
  { label: '3. Stratifikasi UKS/M', jenis: 'Halaman', halaman: 'uksm-stratifikasi' },
  { label: 'Program Prioritas', jenis: 'Halaman', halaman: 'program' },
  { label: 'Kemitraan', jenis: 'Halaman', halaman: 'mitra' },
  { label: 'Informasi & Warta', jenis: 'Halaman', halaman: 'informasi' },
  { label: 'Publikasi & Buku', jenis: 'Halaman', halaman: 'publikasi' },
  { label: 'Kontak & Helpdesk', jenis: 'Halaman', halaman: 'kontak' }
];
