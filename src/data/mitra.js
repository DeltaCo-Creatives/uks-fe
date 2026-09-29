/**
 * Kemitraan UKS/M. Curated from PROD /mitra/panduan-kemitraan, /mitra/mitra-kami
 * and /mitra/dukungan-mitra (scraped 2026-09-17, verbatim copies in docs/kemitraan/).
 * Every edit against the source is listed in docs/kemitraan-curation.md.
 */

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

/* Mitra Kami cohorts (partnersByYear), Dukungan Mitra records (partnerSupport)
   and partners without a record yet (partnersWithoutRecord) now come from
   /public/mitra and /public/dukungan-mitra via src/hooks/usePublicLists.js. */
