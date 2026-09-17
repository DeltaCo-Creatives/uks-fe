/**
 * UKS/M ▸ PROFIL & TATA KELOLA
 * Curated from PROD uks.kemendikdasmen.go.id (scraped 2026-09-17):
 *   /tentang-uks/deskripsi-umum, /tujuan, /sasaran,
 *   /struktur-organisasi-tim-pembina, /struktur-organisasi-timpelaksana,
 *   /program/manajemen-uks-m
 * Verbatim text: docs/profil-tata-kelola/. Decisions: docs/profil-tata-kelola-curation.md.
 * Wording is the source's; only typos are fixed and long paragraphs split.
 */

export const PROFIL_SOURCE = 'https://uks.kemendikdasmen.go.id/tentang-uks/deskripsi-umum';

// Deskripsi Umum, first paragraph
export const profilDefinition =
  'Usaha Kesehatan Sekolah/Madrasah (UKS/M) adalah kegiatan yang dilakukan untuk meningkatkan kesehatan anak usia sekolah pada setiap jalur, jenis, dan jenjang pendidikan.';

// Deskripsi Umum, "Trias UKS/M yakni". `triasSection` points at the Trias page.
export const profilTriasPillars = [
  {
    id: 'pendidikan',
    number: 1,
    title: 'Pendidikan Kesehatan',
    icon: 'fa-solid fa-graduation-cap',
    triasSection: 'sec-trias-pendidikan',
    definition:
      'Kegiatan yang ditujukan untuk meningkatkan pengetahuan, sikap, dan perilaku serta keterampilan hidup sehat. Tujuannya adalah membentuk individu dengan gaya hidup yang lebih sehat.',
    groups: [
      {
        label: 'Dilakukan melalui',
        items: [
          { name: 'Intrakurikuler', note: 'terintegrasi dalam pelajaran' },
          { name: 'Ekstrakurikuler', note: 'kegiatan tambahan di luar jam pelajaran, seperti klub' },
          { name: 'Kokurikuler', note: 'kegiatan yang melengkapi kurikulum inti' }
        ]
      }
    ]
  },
  {
    id: 'pelayanan',
    number: 2,
    title: 'Pelayanan Kesehatan',
    icon: 'fa-solid fa-kit-medical',
    triasSection: 'sec-trias-pelayanan',
    definition:
      'Setiap upaya yang diselenggarakan sendiri atau secara bersama-sama untuk memelihara dan meningkatkan kesehatan melalui upaya promotif, preventif, kuratif, dan rehabilitatif.',
    groups: [
      {
        label: 'Dilakukan melalui',
        items: [
          { name: 'Skrining kesehatan' },
          { name: 'Suplementasi', note: 'Vitamin A, Tablet Tambah Darah' },
          { name: 'P3K', note: 'Pertolongan Pertama pada Kecelakaan' },
          { name: 'P3P', note: 'Pertolongan Pertama pada Penyakit' },
          { name: 'P3LP', note: 'Pertolongan Pertama pada Luka Psikologis' },
          { name: 'Imunisasi' },
          { name: 'Konseling' },
          { name: 'Rujukan' }
        ]
      }
    ]
  },
  {
    id: 'lingkungan',
    number: 3,
    title: 'Pembinaan Lingkungan Sekolah Sehat',
    icon: 'fa-solid fa-seedling',
    triasSection: 'sec-trias-lingkungan',
    definition:
      'Usaha untuk menciptakan kondisi lingkungan sekolah yang sehat secara fisik, sosial, dan emosional sehingga mendukung proses pendidikan mencapai hasil yang optimal.',
    groups: [
      {
        label: 'Sarana prasarana',
        items: [{ name: 'Air bersih' }, { name: 'Toilet' }, { name: 'Sarana CTPS' }, { name: 'Tempat sampah' }]
      },
      {
        label: 'Kegiatan pembinaan',
        items: [{ name: 'Kantin' }, { name: 'Pengelolaan sampah' }, { name: 'Pemanfaatan pekarangan sekolah' }]
      }
    ]
  }
];

// Deskripsi Umum, last two paragraphs: what keeps the programme running
export const profilContinuity = [
  {
    id: 'strata',
    // Strata names as listed on Deskripsi Umum (owner decision, 2026-09-17)
    text: 'Tinjau indikator stratifikasi UKS/M (minimal, optimal, standar, dan paripurna) pada pendidikan kesehatan, pelayanan kesehatan, pembinaan lingkungan sekolah sehat, dan manajemen UKS/M. Hasilnya menjadi rekomendasi perbaikan dan dasar perencanaan sekolah.',
    link: { label: 'Buka Stratifikasi UKS/M', view: 'uksm-stratifikasi', section: 'sec-strat-pengertian' }
  },
  {
    id: 'tim',
    text: 'Bentuk Tim Pelaksana UKS dan masukkan rencana kerja UKS/M sebagai bagian dari RKAS, supaya program berkelanjutan setiap tahun.',
    link: { label: 'Lihat susunan Tim Pelaksana', orgTab: 'pelaksana' }
  },
  {
    id: 'phbs',
    text: 'Terapkan PHBS dalam kehidupan sehari-hari di sekolah/madrasah. UKS/M berperan strategis dalam pencegahan wabah dan penularan penyakit.'
  }
];

// Tujuan page (the Deskripsi Umum variant is logged in the curation doc)
export const profilGoal = {
  sentence:
    'Tujuan UKS/M yaitu untuk meningkatkan mutu pendidikan dan prestasi belajar peserta didik dengan meningkatkan perilaku hidup bersih dan sehat serta menciptakan lingkungan pendidikan yang sehat, sehingga memungkinkan pertumbuhan dan perkembangan yang harmonis peserta didik.',
  // The same sentence, split at its own clauses and ordered by its logic:
  // "dengan" (the means) -> the goal -> "sehingga" (the outcome)
  parts: [
    { id: 'cara', label: 'Caranya', icon: 'fa-solid fa-hands-bubbles', text: 'Meningkatkan perilaku hidup bersih dan sehat, serta menciptakan lingkungan pendidikan yang sehat.' },
    { id: 'tujuan', label: 'Yang ingin dicapai', icon: 'fa-solid fa-graduation-cap', text: 'Mutu pendidikan dan prestasi belajar peserta didik meningkat.' },
    { id: 'hasil', label: 'Hasilnya', icon: 'fa-solid fa-child-reaching', text: 'Peserta didik tumbuh dan berkembang secara harmonis.' }
  ]
};

// Sasaran page
export const profilTargets = {
  intro:
    'UKS adalah usaha kesehatan di dalam dan di sekitar lingkungan sekolah, untuk meningkatkan kemampuan hidup sehat agar peserta didik dapat belajar, tumbuh, dan berkembang secara harmonis dan optimal.',
  main: [
    { id: 'peserta-didik', label: 'Peserta didik', icon: 'fa-solid fa-children' },
    { id: 'pendidik', label: 'Pendidik', icon: 'fa-solid fa-chalkboard-user' },
    { id: 'tendik', label: 'Tenaga kependidikan', icon: 'fa-solid fa-id-badge' },
    { id: 'masyarakat', label: 'Masyarakat sekolah lainnya', icon: 'fa-solid fa-people-roof' }
  ],
  stakeholders: ['Kepala Sekolah', 'GTK', 'Peserta Didik', 'Komite Sekolah', 'Masyarakat Setempat', 'Puskesmas']
};

// Org charts are images on PROD and are shown as placeholders here until the final
// images are supplied. Their contents are transcribed in docs/profil-tata-kelola-content.MD.
// width/height: the PROD image size, used to reserve the slot's aspect ratio.

// Struktur Organisasi Tim Pembina page
export const profilPembina = {
  definition:
    'Tim Pembina UKS/M (TP UKS/M) adalah organisasi yang menangani UKS/M di tingkat pusat, provinsi, kabupaten/kota, dan kecamatan. Tim ini dibentuk pada setiap jenjang pemerintahan untuk melaksanakan pembinaan dan pengembangan UKS secara terpadu dan terkoordinasi.',
  levels: ['Tim Pembina UKS Tingkat Pusat', 'Tim Pembina UKS Tingkat Provinsi', 'Tim Pembina UKS Tingkat Kabupaten/Kota', 'Tim Pembina UKS Tingkat Kecamatan'],
  chart: {
    title: 'Bagan Struktur Organisasi Tim Pembina UKS/M',
    source: 'PROD /tentang-uks/struktur-organisasi-tim-pembina (wj8RI73K…png)',
    width: 1010,
    height: 814
  }
};

// Struktur Organisasi Tim Pelaksana page
export const profilPelaksana = {
  definition: 'Tim Pelaksana UKS/M adalah organisasi yang melaksanakan UKS/M dan berkedudukan di sekolah.',
  function:
    'Tim Pelaksana UKS di sekolah dan perguruan agama berfungsi sebagai penanggung jawab dan pelaksana program UKS berdasarkan prioritas kebutuhan dan kebijakan yang ditetapkan oleh TP UKS Kabupaten/Kota.',
  duties: [
    'Melaksanakan tiga program pokok UKS (Pendidikan Kesehatan, Pelayanan Kesehatan, dan Pembinaan Lingkungan Sekolah Sehat) yang telah ditetapkan oleh Tim Pembina UKS.',
    'Menjalin kerja sama dengan orang tua/komite sekolah, instansi lain, dan masyarakat dalam pelaksanaan kegiatan UKS.',
    'Menyusun program, melaksanakan penilaian/evaluasi, dan menyampaikan laporan kepada Tim UKS Kecamatan.',
    'Melaksanakan ketatausahaan Tim Pelaksana UKS di sekolah.'
  ],
  chart: {
    title: 'Bagan Struktur Organisasi Tim Pelaksana UKS/M di Sekolah/Madrasah',
    source: 'PROD /tentang-uks/struktur-organisasi-timpelaksana (UW9rT7uQ…png)',
    width: 555,
    height: 578
  }
};

// Manajemen UKS/M page
export const profilManagementIntro =
  'Manajemen Sekolah/Madrasah Sehat adalah kegiatan-kegiatan yang berhubungan dengan tata kelola pelaksanaan Trias UKS/M. Ada 5 komponennya.';

export const profilManagementComponents = [
  {
    id: 'kebijakan',
    number: 1,
    title: 'Kebijakan',
    text: 'Payung kebijakan diperlukan sebagai rujukan agar Trias UKS/M dilaksanakan secara konsisten, sistematis, dan berkelanjutan. Kebijakan di tingkat daerah mengatur lebih spesifik pelaksanaan Trias UKS/M di Sekolah/Madrasah Sehat, termasuk penganggaran serta peran dan fungsi masing-masing pihak.',
    facts: [],
    // "Kebijakan di tingkat pusat sudah dijabarkan pada bagian dasar hukum": the portal's legal-document list
    link: { label: 'Lihat dasar hukum tingkat pusat', view: 'uksm-gss', section: 'sec-gss-advokasi' }
  },
  {
    id: 'perencanaan',
    number: 2,
    title: 'Perencanaan dan Penganggaran',
    text: 'Perencanaan dan penganggaran merupakan indikator minimal pelaksanaan Sekolah/Madrasah Sehat. Tim Pembina UKS/M bersama sekolah/madrasah merencanakan kegiatan berdasarkan hasil asesmen. Dokumen rencana kerja memuat kegiatan prioritas, waktu pelaksanaan, sumber daya manusia, sasaran, dan anggaran.',
    facts: [
      { label: 'Terintegrasi dengan', value: 'RKS (Rencana Kerja Sekolah)' },
      { label: 'Sumber dana', value: 'APBN, APBD, dan sumber lain yang tidak mengikat' }
    ]
  },
  {
    id: 'koordinasi',
    number: 3,
    title: 'Koordinasi',
    text: 'Koordinasi dilakukan untuk menyinkronkan perencanaan, pelaksanaan, monitoring, dan evaluasi Sekolah/Madrasah Sehat, mulai dari tingkat pusat, provinsi, kabupaten/kota, kecamatan, sampai satuan pendidikan.',
    facts: [
      { label: 'Frekuensi', value: 'Minimal 3 bulan sekali' },
      { label: 'Melibatkan', value: 'Tim Pembina UKS/M dan pihak lain yang berkontribusi' }
    ]
  },
  {
    id: 'kapasitas',
    number: 4,
    title: 'Peningkatan Kapasitas',
    text: 'Pelatihan tentang tata kelola Sekolah/Madrasah Sehat dan kegiatan Trias UKS/M. Tata kelola UKS/M yang paripurna ditunjukkan antara lain dengan terlatihnya semua guru tentang UKS/M. Orientasi Sekolah/Madrasah Sehat dilakukan setelah Tim Pembina UKS/M bersama sekolah/madrasah melakukan asesmen status kesehatan sekolah/madrasah dan peserta didik.',
    facts: [
      { label: 'Bekal sekolah', value: 'Buku panduan, KIE, dan sarana prasarana lainnya' }
    ]
  }
];

// Component 5, Monitoring dan Evaluasi
export const profilMonev = {
  number: 5,
  title: 'Monitoring dan Evaluasi',
  intro:
    'Strata UKS/M adalah acuan utama monitoring dan evaluasi. Hasilnya dipakai untuk mengukur capaian, tantangan, dan keberhasilan, agar sekolah/madrasah dapat mencapai strata paripurna.',
  monitoring: {
    definition:
      'Mengumpulkan dan menganalisis data pelaksanaan secara rutin untuk memastikan program berada di jalur yang tepat: apakah sumber daya memadai, kegiatan terlaksana, dan hasil tercapai. Monitoring juga mengungkap tantangan, potensi masalah, dan pembelajaran program.',
    facts: [
      { id: 'siapa', icon: 'fa-solid fa-user-check', label: 'Oleh', value: 'Tim Pembina UKS/M tingkat kecamatan' },
      { id: 'kepada', icon: 'fa-solid fa-school', label: 'Kepada', value: 'Tim Pelaksana UKS/M di sekolah/madrasah, termasuk kepala sekolah/madrasah dan guru UKS/M' },
      { id: 'kapan', icon: 'fa-regular fa-calendar', label: 'Kapan', value: 'Setiap bulan' },
      { id: 'cara', icon: 'fa-regular fa-pen-to-square', label: 'Caranya', value: 'Mengisi form monitoring secara deskriptif' }
    ],
    // The source's 20 numbered items, in order. Grouped by Trias pillar; the runs match the
    // pillar definitions on Deskripsi Umum and the sub-programs on the Trias page.
    groups: [
      {
        id: 'pendidikan',
        title: 'Pendidikan Kesehatan',
        items: ['Literasi kesehatan', 'Pendidikan gizi', 'Perilaku hidup bersih dan sehat', 'Pembiasaan aktivitas fisik', 'Pendidikan kesehatan reproduksi', 'Pendidikan keterampilan hidup sehat', 'Pembinaan kader kesehatan remaja']
      },
      {
        id: 'pelayanan',
        title: 'Pelayanan Kesehatan',
        items: ['Pemeriksaan kesehatan', 'Imunisasi', 'Pemberian suplementasi vitamin A', 'Pemberian tablet tambah darah', 'Pemberian obat cacing', 'P3K dan P3P', 'Konseling']
      },
      {
        id: 'lingkungan',
        title: 'Pembinaan Lingkungan Sekolah Sehat',
        items: ['Pemeliharaan sanitasi sekolah dan pengelolaan sampah', 'Pembinaan kantin sehat', 'Pemanfaatan pekarangan sekolah/madrasah', 'Pemberantasan sarang nyamuk', 'Penerapan KTR, KTN, KTK, KTP']
      },
      {
        id: 'manajemen',
        title: 'Manajemen',
        items: ['Manajemen UKS/M']
      }
    ]
  },
  evaluation: {
    definition:
      'Penilaian sistematis untuk melihat pencapaian Sekolah/Madrasah Sehat, sejauh mana Trias UKS/M dilaksanakan, serta permasalahan, solusi, dan rencana tindak lanjutnya. Evaluasi memakai data monitoring, bisa kuantitatif maupun kualitatif, dan menjadi umpan balik untuk penyempurnaan.',
    owner: 'Tim Pembina UKS/M',
    audience: 'Peserta didik, kepala sekolah/madrasah, guru, Puskesmas, dan Tim Pembina UKS/M.',
    horizonsLead: 'Evaluasi disusun dengan target pencapaian untuk tiga jangka waktu:',
    horizons: [
      { id: 'pendek', label: 'Jangka pendek', value: '6 bulan pelaksanaan' },
      { id: 'menengah', label: 'Jangka menengah', value: '1 tahun ajaran' },
      { id: 'panjang', label: 'Jangka panjang', value: '3 tahun pelaksanaan' }
    ],
    sources: [
      'Hasil pengisian instrumen monitoring penerapan Sekolah/Madrasah Sehat.',
      'Hasil penjaringan kesehatan, pemeriksaan berkala, dan tindak lanjutnya oleh Puskesmas dan sekolah/madrasah.',
      'Hasil penilaian stratifikasi UKS/M setelah kegiatan Sekolah/Madrasah Sehat.',
      'Integrasi kegiatan UKS/M dengan kegiatan belajar mengajar dan kegiatan sehari-hari di sekolah.',
      'Analisis asesmen awal dan akhir dari hasil stratifikasi UKS/M, penjaringan kesehatan dan pemeriksaan berkala, serta penilaian pengetahuan, sikap, dan perilaku.'
    ],
    stages: [
      {
        id: 'perencanaan',
        title: 'Perencanaan',
        text: 'Diawali asesmen awal, lalu menetapkan tujuan, indikator, dan target indikator. Tim evaluasi menyiapkan metode, alat evaluasi, jadwal, dan petugas.'
      },
      {
        id: 'pelaksanaan',
        title: 'Pelaksanaan',
        text: 'Tim mengumpulkan data kuantitatif dan kualitatif, menganalisisnya, lalu menyusun laporan evaluasi. Bisa diawali dengan mempelajari hasil monitoring rutin, supaya hasil monitoring berlanjut ke evaluasi.'
      },
      {
        id: 'tindak-lanjut',
        title: 'Tindak lanjut',
        text: 'Hasil evaluasi disampaikan kepada pihak terkait:',
        points: [
          'Tertulis (laporan) dan lisan (presentasi dan diskusi), sebagai acuan Tim Pembina UKS/M dan satuan pendidikan untuk meningkatkan kualitas.',
          'Lisan saat kunjungan, lalu ditindaklanjuti tertulis sebagai umpan balik, termasuk memilah mana tugas sekolah/madrasah dan mana wewenang pemangku kepentingan terkait.'
        ]
      }
    ]
  }
};
