/**
 * STRATIFIKASI UKS/M DATA
 * Source: portal-uks.demo.or.id/stratifikasi-uks (see docs/stratifikasi-uks-content.MD).
 * Page copy is dev's rendered text. The per-strata requirements come from dev's
 * CMS record "Stratifikasi UKS SD" (jenjang SD only), whose columns
 * Minimal/Standar/Optimal/Paripurna map 1:1 onto Dasar/Madya/Utama/Paripurna.
 */

export const STRATIFIKASI_SOURCE = 'portal-uks.demo.or.id/stratifikasi-uks';
export const STRATIFIKASI_DASHBOARD_URL = 'https://stratifikasiuks.org/';

export const stratifikasiIntro = {
  title: 'Apa itu Stratifikasi UKS/M?',
  body: 'Stratifikasi UKS/M adalah alat bantu untuk mengetahui apa yang sudah dicapai dan apa yang masih perlu dilakukan satuan pendidikan, agar dapat mencapai strata Dasar, Madya, Utama, hingga Paripurna.'
};

export const stratifikasiGoals = [
  { id: 'alat-ukur', title: 'Alat Ukur Trias UKS', description: 'Mengukur pelaksanaan tiga program pokok UKS di satuan pendidikan.', icon: 'fa-solid fa-ruler-combined' },
  { id: 'mutu', title: 'Strategi Peningkatan Mutu', description: 'Menjadi dasar perbaikan kualitas pelaksanaan UKS/M di sekolah.', icon: 'fa-solid fa-arrow-trend-up' },
  { id: 'monev', title: 'Sistem Monev', description: 'Bagian dari sistem monitoring dan evaluasi yang berkelanjutan.', icon: 'fa-solid fa-magnifying-glass-chart' },
  { id: 'rekomendasi', title: 'Alat Capaian & Rekomendasi', description: 'Dasar penyusunan rekomendasi tindak lanjut bagi sekolah.', icon: 'fa-solid fa-clipboard-check' }
];

export const stratifikasiScoring = {
  title: 'Cara Penilaian',
  body: 'Sekolah/madrasah harus memenuhi seluruh indikator (pendidikan kesehatan, pelayanan kesehatan, pembinaan lingkungan sekolah sehat dan manajemen UKS/M) pada kelompok stratifikasi UKS/M tertentu (dasar atau madya atau utama atau paripurna).'
};

export const stratifikasiIndicatorIntro = 'Sekolah harus memenuhi seluruh indikator berikut pada kelompok strata yang sama.';

/** Dev's 4 indicator categories, in page order. */
export const strataCategories = [
  { id: 'pendidikan', title: 'Pendidikan kesehatan', icon: 'fa-solid fa-graduation-cap' },
  { id: 'pelayanan', title: 'Pelayanan kesehatan', icon: 'fa-solid fa-kit-medical' },
  { id: 'lingkungan', title: 'Pembinaan lingkungan sehat di sekolah sehat', icon: 'fa-solid fa-seedling' },
  { id: 'manajemen', title: 'Manajemen UKS/M', icon: 'fa-solid fa-sitemap' }
];

/**
 * The 4 strata, lowest first. `requirementsSD[category]` lists only what this
 * strata adds; every strata above Dasar also requires the one before it.
 */
export const strataLevels = [
  {
    key: 'dasar',
    code: '01',
    name: 'Dasar',
    color: '#64748B',
    bgColor: '#F1F5F9',
    requirementsSD: {
      pendidikan: [
        'Adanya rencana pembelajaran tentang Pendidikan kesehatan',
        'Pendidikan kesehatan dilaksanakan secara kurikuler',
        'Pendidikan jasmani dilaksanakan secara kurikuler'
      ],
      pelayanan: [
        'Sekolah memfasilitasi puskesmas melaksanakan penjaringan kesehatan dan pemeriksaan berkala',
        'Sekolah membantu pelaksanaan imunisasi anak sekolah',
        'Sekolah memeriksa kebersihan diri peserta didik'
      ],
      lingkungan: [
        'Sekolah dengan sumber air layak, tersedia di lingkungan sekolah dan cukup',
        'Sekolah dengan tempat cuci tangan dengan sabun dan air mengalir',
        'Sekolah memiliki toilet dengan kondisi baik dan terpisah',
        'Sekolah memiliki saluran drainase',
        'Sekolah memiliki kantin',
        'Sekolah memiliki lahan/ruang terbuka hijau',
        'Sekolah memiliki tempat sampah yang tertutup',
        'Sekolah memiliki tempat pembuangan sampah sementara yang tertutup',
        'Ruang Kelas dalam keadaan bersih',
        'Sekolah melaksanakan pemberantasan sarang nyamuk',
        'Sekolah memiliki aturan KTR, KTN, KTK, KTP'
      ],
      manajemen: [
        'Buku pegangan kesehatan (Buku UKS/M, gizi seimbang, kespro, sanitasi, Napza dll)',
        'Ada penanggungjawab UKS',
        'Tersedia media KIE kesehatan (alat peraga, poster dll)',
        'Tersedia sarana prasarana olahraga',
        'Tersedia dana untuk kegiatan UKS dan pemeliharaan sanitasi sekolah',
        'Terdapat kemitraan dengan Puskesmas',
        'Terdapat perencanaan kegiatan UKS di Sekolah'
      ]
    }
  },
  {
    key: 'madya',
    code: '02',
    name: 'Madya',
    color: '#2563EB',
    bgColor: '#DBEAFE',
    requirementsSD: {
      pendidikan: [
        'Pendidikan jasmani dan kesehatan dilaksanakan secara ekstrakulikuler',
        'Sekolah melaksanakan literasi dengan materi kesehatan',
        'Sekolah melaksanakan pembinaan kader kesehatan',
        'Sekolah melaksanakan kegiatan CTPS bersama',
        'Sekolah melaksanakan sarapan bersama dengan gizi seimbang',
        'Sekolah melaksanakan kegiatan sikat gigi bersama'
      ],
      pelayanan: [
        'Sekolah melaksanakan pelayanan P3K dan P3P',
        'Sekolah melibatkan Puskesmas dalam penanganan rujukan jika diperlukan',
        'Sekolah memberikan obat cacing'
      ],
      lingkungan: [
        'Sekolah memiliki rasio toilet sesuai dengan standar Permendikbud 24/2007',
        'Sekolah memiliki tempat sampah yang terpilah',
        'Sekolah memiliki kantin sehat',
        'Sekolah menerapkan KTR'
      ],
      manajemen: [
        'Sekolah menggunakan buku rapor kesehatanku',
        'Sekolah melakukan konsultasi/koordinasi dengan Tim Pembina UKS',
        'Sekolah memiliki ruang UKS'
      ]
    }
  },
  {
    key: 'utama',
    code: '03',
    name: 'Utama',
    color: '#D97706',
    bgColor: '#FEF3C7',
    requirementsSD: {
      pendidikan: [
        'Sekolah melakukan peregangan di antara jam pelajaran',
        'Sekolah melakukan tes kebugaran',
        'Pendidikan kesehatan (kespro, napza, sanitasi, gizi) terintegrasi dengan mata pelajaran lain'
      ],
      pelayanan: [
        'Sekolah melaksanakan layanan konseling'
      ],
      lingkungan: [
        'Sekolah memanfaatkan pekarangan sekolah dengan menanam tanaman obat dan pangan',
        'Sekolah melakukan 3R (Reduce, reuse, recycle)',
        'Tersedia toilet MKM (Manajemen Kebersihan Menstruasi)'
      ],
      manajemen: [
        'Adanya kemitraan dengan instansi terkait',
        'Tersedia sarana dan prasarana sekolah aman bencana'
      ]
    }
  },
  {
    key: 'paripurna',
    code: '04',
    name: 'Paripurna',
    color: '#098C4C',
    bgColor: '#D2E8DA',
    requirementsSD: {
      pendidikan: [
        'Penerapan pendidikan karakter dan keterampilan hidup sehat',
        'Adanya forum komunikasi pendidik dan konselor sebaya',
        'Melibatkan orang tua dalam pendidikan kesehatan'
      ],
      pelayanan: [
        'Sekolah menindaklanjuti hasil penjaringan dan pemeriksaan berkala',
        'Menurunnya jumlah hari tidak masuk sekolah karena sakit',
        'Peserta didik memiliki status gizi baik'
      ],
      lingkungan: [
        'Air minum disediakan oleh sekolah',
        'Sekolah memiliki rasio toilet sesuai dengan standar Kepmenkes 1429/2006',
        'Kantin telah mendapatkan stiker tanda laik higiene sanitasi',
        'Tersedia toilet disabilitas',
        'Sekolah bekerja sama dengan puskesmas melakukan pemeriksaan kualitas udara dan skrining siswa perokok',
        'Sekolah bekerjasama dengan pihak lain untuk menyediakan bank sampah',
        'Sekolah melakukan kegiatan pengolahan tanaman obat dan pangan'
      ],
      manajemen: [
        'Sekolah melakukan pembinaan dan pengawasan',
        'Seluruh guru terorientasi UKS',
        'Sekolah menggunakan Rapor Kesehatan Lingkungan dan Kantin'
      ]
    }
  }
];
