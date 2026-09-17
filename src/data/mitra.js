/**
 * Kemitraan UKS/M. Curated from PROD /mitra/panduan-kemitraan, /mitra/mitra-kami
 * and /mitra/dukungan-mitra (scraped 2026-09-17, verbatim copies in docs/kemitraan/).
 * Every edit against the source is listed in docs/kemitraan-curation.md.
 */

export const MITRA_SOURCE = {
  label: 'uks.kemendikdasmen.go.id/mitra',
  url: 'https://uks.kemendikdasmen.go.id/mitra/panduan-kemitraan'
};

export const mitraIntro = {
  title: 'Kemitraan UKS/M',
  lead: 'Bentuk kerja sama, ketentuan, dan kriteria bagi lembaga yang ingin mendukung Sekolah Sehat, beserta daftar mitra sejak 2022 dan dukungan yang sudah tercatat.'
};

/* ---------- Panduan Kemitraan ---------- */

export const kerjaSamaGroups = [
  {
    id: 'sarana',
    icon: 'fa-solid fa-school',
    title: 'Sarana dan prasarana',
    items: [
      'Pembangunan sarana/fasilitas terkait aktivitas Sekolah Sehat',
      'Penyediaan prasarana/perlengkapan/peralatan penunjang beragam aktivitas Sekolah Sehat'
    ]
  },
  {
    id: 'kapasitas',
    icon: 'fa-solid fa-chalkboard-user',
    title: 'Peningkatan kapasitas dan edukasi',
    items: [
      'Penyelenggaraan kegiatan peningkatan kapasitas SDM/kegiatan edukatif bagi peserta didik, pendidik, guru, tenaga kependidikan, dan orang tua di satuan pendidikan (sekolah)',
      'Penyediaan narasumber atau ahli dalam kegiatan peningkatan kapasitas SDM/kegiatan edukatif bagi peserta didik, pendidik, guru, tenaga kependidikan, dan orang tua di satuan pendidikan (sekolah)'
    ]
  },
  {
    id: 'kesehatan',
    icon: 'fa-solid fa-syringe',
    title: 'Layanan kesehatan peserta didik',
    items: [
      'Dukungan terhadap pelaksanaan percepatan dan perluasan program imunisasi bagi peserta didik pada satuan pendidikan',
      'Penyelenggaraan kegiatan edukasi atau bimbingan/konseling terkait kesehatan mental dan psikologis di satuan pendidikan'
    ]
  },
  {
    id: 'kampanye',
    icon: 'fa-solid fa-bullhorn',
    title: 'Kampanye, materi, dan penghargaan',
    items: [
      'Penyelenggaraan gerakan kreatif di daerah, media massa, dan media sosial, termasuk pelibatan pemengaruh (influencer)',
      'Pencetakan dan pendistribusian materi/pedoman Sekolah Sehat',
      'Pembuatan iklan layanan masyarakat atau materi sosialisasi Sekolah Sehat',
      'Penyelenggaraan dan/atau pemberian hadiah/penghargaan kompetisi terkait Sekolah Sehat'
    ]
  }
];

export const kerjaSamaNote =
  'Kemendikbudristek terbuka terhadap bentuk atau ide lain terkait aktivitas yang potensial diselenggarakan bersama dalam kerangka program Sekolah Sehat selama sesuai ketentuan.';

export const kerjaSamaRules = [
  'Mitra dapat mengolaborasikan atau mengikutsertakan program/proyek yang sedang atau sudah berjalan (ongoing atau existing) sebagai bagian dari Sekolah Sehat, namun tanpa menyebutkan merek produk atau layanan yang dikerjasamakan, sebagai bentuk komitmen untuk menjadikan kampanye ini sebuah gerakan bersama.',
  'Kegiatan/program yang dikerjasamakan tidak bersifat atau bertujuan komersial.',
  'Mitra tidak diperkenankan menjual produk/layanan yang dilakukan dalam kerangka Sekolah Sehat, baik di satuan pendidikan maupun lingkungan satuan pendidikan.',
  'Dalam hal mitra akan memberikan bingkisan atau donasi berbentuk produk atau materi/bahan edukasi ke satuan pendidikan, maka harus terlebih dahulu dikurasi dan mendapat persetujuan dari Kemendikbudristek.',
  'Produk yang diberikan bukan berupa rokok, alat kontrasepsi, minuman keras, dan/atau makanan yang tidak sesuai dengan pedoman gizi seimbang dan sehat (tidak tinggi lemak, garam, dan gula, maupun mengandung zat-zat yang membahayakan).',
  'Segala kerja sama yang dilakukan dengan Kemendikbudristek didasarkan pada sebuah Perjanjian Kerja Sama yang akan disusun bersama dan dikoordinasikan oleh Direktorat Jenderal PAUD dan Dikdasmen Kemendikbudristek.'
];

export const kerjaSamaBenefits = [
  'Pencantuman logo Kemendikbudristek dan logo mitra dalam materi/bahan pedoman maupun materi publikasi gerakan',
  'Penggunaan bahan/materi/produk/layanan yang dimiliki atau dikembangkan oleh mitra dalam kampanye di satuan pendidikan, selama sesuai ketentuan, telah dikurasi, dan mendapat persetujuan dari Kemendikbudristek',
  'Penetapan wilayah target/sasaran penerima program Sekolah Sehat dapat disesuaikan dengan wilayah atau area kerja maupun program yang dimiliki/direncanakan mitra',
  'Penyediaan narasumber dari pimpinan/pejabat Kemendikbudristek dalam kegiatan atau program yang dilakukan oleh mitra'
];

/* ---------- Kriteria Mitra ---------- */

export const mitraSectors = [
  {
    id: 'pemerintah',
    icon: 'fa-solid fa-landmark',
    title: 'Sektor pemerintah',
    members: [
      {
        label: 'Mitra Sektor Pemerintah',
        text: 'Kementerian, Lembaga Pemerintah, Pemerintah Daerah, Unit Pelaksana Teknis, dan institusi pemerintah lainnya, baik di pusat maupun daerah.'
      },
      {
        label: 'Mitra Pendukung Sektor Pemerintah',
        text: 'Pokja Bunda PAUD, Tim Penggerak Pemberdayaan dan Kesejahteraan Keluarga (PKK), Dharma Wanita Persatuan (DWP), dan lainnya.'
      }
    ],
    requirements: [
      'Memiliki program yang selaras dengan program Sekolah Sehat.',
      'Bersedia berbagi sumber daya dalam mendukung dan memperkuat program Sekolah Sehat.'
    ]
  },
  {
    id: 'non-pemerintah',
    icon: 'fa-solid fa-building',
    title: 'Sektor non-pemerintah',
    members: [
      {
        label: 'Mitra Sektor Non-Pemerintah',
        text: 'BUMN, Dunia Usaha dan Dunia Industri (DUDI), Lembaga/Organisasi Kemasyarakatan, Yayasan, maupun bentuk organisasi/komunitas lainnya.'
      }
    ],
    requirements: [
      'Memiliki ketertarikan di bidang pendidikan, khususnya program Sekolah Sehat.',
      'Diutamakan berbadan hukum (memiliki legalitas dokumen sesuai dengan ketentuan yang berlaku).',
      'Memiliki rekam jejak yang baik dan tidak pernah berhadapan atau bermasalah dengan hukum.',
      'Bersifat non-komersial dalam pelaksanaan sebagai Mitra Sekolah Sehat.',
      'Memiliki program yang relevan dengan pendanaan mandiri.'
    ]
  }
];

/**
 * PROD /mitra/pendaftaran-mitra is an unbuilt stub, and the registration short
 * link on /sekolah-sehat/mitra-sekolah-sehat (ringkas.kemdikbud.go.id) no longer
 * resolves. url stays null until the owner supplies a working form.
 */
export const mitraRegistration = {
  url: null,
  status: 'Formulir pendaftaran mitra belum tersedia secara daring.'
};

/* ---------- Mitra Kami ---------- */

export const mitraFields = ['Dunia Industri', 'Industri Pendidikan', 'Organisasi Masyarakat', 'Yayasan', 'Perusahaan Komunikasi', 'Badan PBB', 'dan lainnya'];

export const mitraSupportTypes = [
  'Pendampingan implementasi Penguatan Peran UKS atau Sekolah Sehat di satuan dampingan',
  'Pemberian bantuan sarana dan prasarana',
  'Dukungan untuk publikasi dan komunikasi',
  'Peningkatan kapasitas pendidik dan peserta didik'
];

export const partnersByYear = [
  {
    id: '2025',
    label: '2025',
    partners: [
      'UNICEF Indonesia',
      'Save The Children Indonesia',
      'AIA Financial',
      'Maleo Edukasi (educourse.id)',
      'KAO Indonesia',
      'Wardhana',
      'Wings Group',
      'Cisarua Mountain Dairy',
      'Mondelez Indonesia Trading',
      'Yayasan Sagasitas Indonesia',
      'Tanoto Foundation',
      'Danone Indonesia',
      'Float Oat Indonesia',
      'PT Bio Farma Indonesia',
      'Red Nose Foundation',
      'PT KPM Ikhlas Tegas Puas',
      'Badan Gizi Nasional (BGN)',
      'Badan Pengawas Obat dan Makanan (BPOM)',
      'Universitas Pendidikan Indonesia (UPI)',
      'Center of Excellence'
    ]
  },
  {
    id: '2023-2024',
    label: '2023 dan 2024',
    partners: [
      'AIA dan Bobo',
      'Yayasan Hidung Merah (Red Nose Foundation)',
      'Badan Pangan Nasional (Direktorat Kewaspadaan Pangan dan Gizi & Direktorat Penganekaragaman Konsumsi Pangan)',
      'LP Ma’arif',
      'Hisminu',
      'PT Nestle Indonesia',
      'PT Frisian Flag Indonesia',
      'PT Beta Moringa Indonesia',
      'PT Acer Indonesia',
      'PT Asaba',
      'PT Smart Consulting Indonesia',
      'PT Dwida Jaya Tama',
      'PT Bangga Teknologi Indonesia',
      'PT Prima Duta Nusantara',
      'PT Pameterindo Edukatama Aneka (Pamduta)',
      'Gamma Persada Group',
      'PT Tera Data Indonusa',
      'PT Haula Sejahtera',
      'PT Sentra Kriya Edukasi',
      'PT Macananjaya Cemerlang',
      'CV Wardhana',
      'CV Alkautsar Aflah Mandiri',
      'CV Orion',
      'CV Putra Putri',
      'PT Tribina Dinar Kencana (Inke Maris & Associates)',
      'Yayasan Wahana Visi Indonesia (WVI)',
      'Yayasan Sagasitas Indonesia',
      'PT Inovasi Desa Nusantara',
      'PT Trakindo Utama',
      'World Food Program'
    ]
  },
  {
    id: '2022',
    label: '2022',
    partners: [
      'PT Unilever Indonesia Tbk',
      'PT Investama dan PT Sarihusada Generasi Mahardhika (Danone)',
      'PT KAO',
      'PT Nutrifood',
      'PT Uni-Charm Indonesia Tbk dan PT Awina Sinergi International',
      'PT Maleo Edukasi Teknologi (Educourse.id)',
      'Yayasan Save The Children Indonesia'
    ]
  }
];

/* ---------- Dukungan Mitra ---------- */

/**
 * The 6 partners with filled-in records on /mitra/dukungan-mitra, in source
 * order. Fields a record lacks are omitted, never filled in.
 */
export const partnerSupport = [
  {
    id: 'unicef',
    name: 'UNICEF',
    unit: 'Section Nutrition',
    period: 'Maret s.d. November 2025',
    collaboration: [
      'Panduan Implementasi Program Makan Bergizi Gratis di Satuan Pendidikan',
      'Modul Pelatihan Implementasi Program Makan Bergizi Gratis di Satuan Pendidikan',
      'Modul Edukasi Gizi pada Program Makan Bergizi Gratis di Satuan Pendidikan'
    ],
    activities: ['Review', 'Penyusunan', 'Finalisasi', 'Peluncuran'],
    activitiesOrdered: true,
    beneficiaries: ['Satuan pendidikan seluruh jenjang'],
    locations: ['Jakarta'],
    funding: 'IDR 601.689.860'
  },
  {
    id: 'tanoto',
    name: 'Tanoto Foundation',
    period: 'Agustus 2025 s.d. Mei 2026',
    collaboration: ['Studi Evaluasi Implementasi Program Makan Bergizi Gratis'],
    activities: ['Penyusunan instrumen', 'Uji coba instrumen', 'Pengumpulan data lapangan'],
    activitiesOrdered: true,
    beneficiaries: ['PAUD', 'SD kelas 1–6', 'SMP kelas 7–9', 'SMA kelas 10–12'],
    locations: [
      'Riau (Kabupaten Siak, Kota Pekanbaru)',
      'Jawa Tengah (Kota Semarang, Kabupaten Kendal)',
      'Kalimantan Timur (Kota Balikpapan, Kabupaten Paser)',
      'Sumatera Utara (Kota Medan)',
      'Jambi (Kabupaten Tanjung Jabung Timur, Kota Jambi)'
    ],
    funding: 'IDR 599.870.000'
  },
  {
    id: 'save-the-children',
    name: 'Save the Children Indonesia',
    unit: 'Program We See Equal, Phase 4',
    period: 'Juli 2024 s.d. Juni 2026',
    collaboration: ['Budaya Sekolah Aman dan Nyaman'],
    activities: [
      'Pengembangan karakter positif bagi peserta didik melalui Modul Choice',
      'Edukasi bagi orang tua melalui Modul Pengasuhan',
      'Panduan pelaksanaan SOP Penanganan Kekerasan di satuan pendidikan yang merujuk pada juknis SOP Kemendikdasmen'
    ],
    activitiesOrdered: true,
    beneficiaries: [
      '576 SMP negeri dan swasta di Kabupaten Bandung dan Cianjur',
      '987 guru sudah dilatih Modul Choice dan Pengasuhan',
      '34 master trainer Modul Choice (pendidikan karakter untuk siswa)',
      '35 master trainer Modul Pengasuhan/parenting untuk orang tua siswa',
      'Training untuk buku panduan SOP penanganan kekerasan di satuan pendidikan sedang berjalan',
      '38.048 siswa di Kabupaten Bandung dan Cianjur menerima edukasi Modul Choice dalam pelaksanaan MPLS tahun 2025'
    ],
    locations: ['Kabupaten Bandung', 'Kabupaten Cianjur'],
    funding: 'USD 440.000'
  },
  {
    id: 'kao',
    name: 'KAO Indonesia',
    period: 'Januari s.d. Desember 2025',
    collaboration: ['Edukasi Anak KAO (Kreatif Aktif Optimis)'],
    activities: [
      'Edukasi Perilaku Hidup Bersih dan Sehat',
      'Pembiasaan 7 Kebiasaan Anak Indonesia Hebat',
      'Anak KAO BISA (Bijak Sampah): edukasi dan penyediaan fasilitas waste drop box point',
      'Kompetisi Duta Anak KAO: Sekolah Sehat 2025'
    ],
    activitiesOrdered: true,
    beneficiaries: [
      '10.781 peserta didik',
      '41 sekolah teredukasi: 19 sekolah setingkat SMP dan 22 sekolah setingkat SD',
      '9 sekolah berpartisipasi dalam program Duta Anak KAO',
      'Tingkat pemahaman siswa terhadap materi 80%, tertinggi pada 7 Kebiasaan Anak Indonesia Hebat (89%)'
    ],
    locations: [
      'Ring 1 Target Area (Jabodetabek, Cikarang, Karawang)',
      'Kota Yogyakarta (bersamaan dengan penyediaan akses air bersih dengan Gama Rain Filter System)',
      'Kabupaten Sentani, Papua',
      'Kabupaten Timor Tengah Selatan, NTT'
    ],
    funding: 'IDR 617.700.999'
  },
  {
    id: 'danone',
    name: 'Danone Indonesia',
    period: 'April s.d. Desember 2025',
    collaboration: ['Edukasi Pengelolaan Sampah'],
    activities: ['Edukasi Program Sampahku Tanggung Jawabku (SAMTAKU) secara daring'],
    activitiesOrdered: false,
    beneficiaries: [
      '1.000 satuan pendidikan jenjang SMP',
      'Sekitar 1,7 juta peserta didik teredukasi, dari target 2 juta peserta didik pada tahun 2025'
    ],
    locations: ['DKI Jakarta', 'Banten', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur'],
    funding: null
  },
  {
    id: 'maleo',
    name: 'Maleo Edukasi Teknologi',
    period: 'November 2025',
    collaboration: ['Online Exchange Program Indonesia–Korea'],
    activities: ['Bintang Sobat SMP (daring)'],
    activitiesOrdered: false,
    beneficiaries: ['37 Bintang Sobat SMP 2025'],
    locations: ['37 provinsi'],
    funding: 'IDR 10.000.000'
  }
];

/** Partners listed on /mitra/dukungan-mitra whose record reads "Belum ada data". */
export const partnersWithoutRecord = [
  { name: 'Cisarua Mountain Dairy' },
  { name: 'Wings Group' },
  { name: 'Mondelez Indonesia' },
  { name: 'AIA Financial' },
  { name: 'Yayasan Sagasitas Indonesia' },
  { name: 'Wardhana' },
  { name: 'Float Oat Indonesia' },
  { name: 'Bio Farma' },
  { name: 'Red Nose Foundation' },
  { name: 'Klinik Pendidikan MIPA' },
  { name: 'Universitas Pendidikan Indonesia (UPI)' },
  { name: 'Badan Gizi Nasional (BGN)', note: 'Mitra strategis pelaksanaan Program Prioritas Makan Bergizi Gratis (MBG)' },
  { name: 'BPOM' },
  { name: 'Center of Excellence' }
];
