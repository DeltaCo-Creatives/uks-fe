/**
 * GERAKAN SEKOLAH SEHAT (GSS)
 *
 * Curated from the PROD pages scraped into docs/sekolah-sehat/ (source of
 * truth). Text is the CMS copy with typos fixed; nothing is added. Decisions
 * and open questions are logged in docs/sekolah-sehat-curation.md.
 *
 * `url: null` means the source link is dead, private, or points at the wrong
 * file: the page shows the item without a link instead of a broken one.
 */

export const GSS_SOURCE = 'uks.kemendikdasmen.go.id/sekolah-sehat';

export const GSS_MADRASAH_URL = 'https://madrasah.kemenag.go.id/madrasahsehat/';

/** YouTube videos, titles verified via YouTube oEmbed. */
const video = (id, title, channel) => ({
  id,
  title,
  channel,
  url: `https://www.youtube.com/watch?v=${id}`,
  thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
});

export const gssIntro = {
  title: 'Gerakan Sekolah Sehat',
  definition: 'Gerakan Sekolah Sehat merupakan segala upaya yang dilakukan secara bersama-sama dan terus menerus oleh semua pihak, mulai dari pemerintah pusat sampai ke pemerintah daerah, para mitra, satuan pendidikan, masyarakat, dan pemangku kepentingan lainnya tentang pentingnya penerapan Sekolah Sehat dengan berfokus pada Sehat Bergizi, Sehat Fisik, Sehat Imunisasi, Sehat Jiwa, dan Sehat Lingkungan di satuan pendidikan.'
};

export const gssBenefits = [
  { id: 'peserta-didik', audience: 'Peserta Didik', icon: 'fa-solid fa-children', text: 'Pembudayaan Sehat Bergizi, Sehat Fisik, dan Sehat Imunisasi agar status kesehatan meningkat dan dapat mengikuti proses pembelajaran dengan baik.' },
  { id: 'ptk', audience: 'Pendidik dan Tenaga Kependidikan', icon: 'fa-solid fa-chalkboard-user', text: 'Peningkatan kesehatan agar dapat melaksanakan tugas dan fungsinya dengan baik.' },
  { id: 'orang-tua', audience: 'Orang Tua dan Masyarakat', icon: 'fa-solid fa-people-roof', text: 'Berperan dalam usaha peningkatan derajat/status kesehatan peserta didik, baik di sekolah maupun di rumah.' }
];

export const gssTargets = [
  { id: 'pemda', icon: 'fa-solid fa-landmark', text: 'Pemerintah Provinsi/Kabupaten/Kota.' },
  { id: 'satpen', icon: 'fa-solid fa-school', text: 'Sekolah/Satuan Pendidikan di semua jalur, jenjang, dan jenis pendidikan (PAUD, SD/MI/Sederajat, SMP/MTs/Sederajat, SMA/SMK/MA/MAK/Sederajat, SLB, SKB, dan PKBM).' },
  { id: 'warga', icon: 'fa-solid fa-users', text: 'Peserta Didik, Pendidik dan Tenaga Kependidikan, Komite Sekolah, Orang Tua, dan Masyarakat.' }
];

export const gssVideos = [
  video('p3bck1lxCkU', 'Peluncuran Revitalisasi UKS melalui Sekolah Sehat', 'KEMDIKDASMEN'),
  video('Cbqg3RnW0ss', 'Sekolah Sehat', 'KEMDIKDASMEN'),
  video('9lAjEaElFow', 'Ibu Iriana Jokowi Bermain Permainan Rakyat Bersama Anak-Anak, Bandar Lampung, 8 Maret 2023', 'Sekretariat Presiden')
];

/**
 * The 5 focus areas. `summary` is the one-line goal from the GSS overview
 * page; `goal` is the opening sentence of the focus page itself.
 *
 * Topic block types: 'text' (paragraphs) · 'list' (items, `ordered` for
 * steps) · 'facts' (label/value pairs).
 */
export const gssFocusAreas = [
  {
    id: 'bergizi',
    title: 'Sehat Bergizi',
    icon: 'fa-solid fa-bowl-food',
    summary: 'Meningkatkan derajat kesehatan peserta didik melalui penerapan pola makan yang tepat dan konsumsi makanan bergizi.',
    goal: 'Sehat Bergizi bertujuan untuk meningkatkan derajat kesehatan peserta didik melalui penerapan pola makan yang tepat dan konsumsi makanan bergizi.',
    videos: [video('DF-0fcEbqWs', 'Happy Monday Episode 8: Tengok Isi Piringku', 'Direktorat Sekolah Dasar')],
    activities: [
      { text: 'Pembiasaan minum air putih yang cukup, minimal 2 gelas sehari selama berkegiatan di sekolah.' },
      { text: 'Peningkatan pemahaman dan pembiasaan konsumsi makanan bergizi seimbang, terutama protein tinggi, buah, dan sayuran melalui sarapan/makan bersama minimal 1 kali seminggu.' },
      { text: 'Menghindari/meminimalisasi konsumsi makanan cepat saji; makanan/minuman berpemanis, berpengawet, kurang serat, tinggi gula, garam, dan lemak.' },
      { text: 'Pembiasaan konsumsi Tablet Tambah Darah bagi remaja putri SMP/sederajat dan SMA/sederajat minimal 1 kali setiap minggu.' }
    ],
    topics: [
      {
        id: 'isi-piringku',
        type: 'text',
        title: 'Isi Piringku',
        paragraphs: [
          'Isi Piringku merupakan pedoman yang disusun oleh Kementerian Kesehatan untuk mengampanyekan konsumsi makanan yang sesuai dengan pedoman gizi seimbang. Dalam satu piring setiap kali makan, setengah piring diisi dengan sayur dan buah, sedangkan setengah lainnya diisi dengan makanan pokok dan lauk pauk.',
          'Selain itu, Isi Piringku juga memuat ajakan untuk mengonsumsi 8 gelas air setiap hari, melakukan aktivitas fisik 30 menit setiap hari, dan mencuci tangan dengan air dan sabun sebelum dan setelah makan.'
        ]
      },
      {
        id: 'pedoman-gizi',
        type: 'list',
        title: 'Sepuluh Pedoman Gizi Seimbang',
        ordered: true,
        items: [
          { text: 'Biasakan mengonsumsi aneka ragam makanan pokok.' },
          { text: 'Batasi konsumsi panganan manis, asin, dan berlemak.' },
          { text: 'Lakukan aktivitas fisik yang cukup dan pertahankan berat badan ideal.' },
          { text: 'Biasakan mengonsumsi lauk pauk yang mengandung protein tinggi.' },
          { text: 'Cuci tangan pakai sabun dengan air mengalir.' },
          { text: 'Biasakan sarapan pagi.' },
          { text: 'Biasakan minum air putih yang cukup dan aman.' },
          { text: 'Banyak makan buah dan sayur.' },
          { text: 'Biasakan membaca label pada kemasan pangan.' },
          { text: 'Syukuri dan nikmati aneka ragam makanan.' }
        ]
      },
      {
        id: 'kantin-sehat',
        type: 'list',
        title: 'Empat Komponen Kantin dan Jajanan Sehat di Sekolah',
        intro: 'Untuk menjamin penyelenggaraan kantin dan jajanan sehat di sekolah, komponen berikut perlu diperhatikan:',
        items: [
          { label: 'Komitmen dan Manajemen Sekolah', text: 'Termasuk monitoring/supervisi dan evaluasi diri penyelenggaraan kantin dan jajanan sehat di sekolah.' },
          { label: 'Sumber Daya Manusia', text: 'Mempunyai pengetahuan dan keterampilan dalam mengelola kantin dan jajanan sehat di sekolah.' },
          { label: 'Sarana dan Prasarana', text: 'Kebersihan peralatan dan lingkungan.' },
          { label: 'Mutu Pangan', text: 'Aman, sehat, dan bergizi.' }
        ]
      }
    ],
    tools: [
      { title: 'Buku Saku Gizi Seimbang dan Kantin/Jajanan Sehat di Sekolah Dasar', url: 'https://is3.cloudhost.id/storagedirectus1/manajemen_uks/files/publikasi/L4H44OkNQw3Oal3CXziuAuHDgoGZuTIQ3UogIaNT.pdf' },
      { title: 'Poster Sehat Bergizi', url: 'https://drive.google.com/file/d/1x3_NMNXdC_6a690be197NWgO1e8nurt4/view' },
      { title: 'Leaflet Sehat Bergizi', url: 'https://drive.google.com/file/d/1y4efWw89JPyv85Hld_XB8smlwGg1f90p/view' }
    ]
  },
  {
    id: 'fisik',
    title: 'Sehat Fisik',
    icon: 'fa-solid fa-person-running',
    summary: 'Meningkatkan kualitas kesehatan fisik seluruh ekosistem atau warga sekolah/satuan pendidikan.',
    goal: 'Untuk mengurangi risiko obesitas dan meningkatkan kesehatan peserta didik, pembiasaan aktivitas fisik perlu dilakukan.',
    videos: [video('gl56oxJOWVo', 'Gerak Lagu Sekolah Sehat', 'Direktorat Sekolah Dasar')],
    activities: [
      { text: 'Pembiasaan peregangan, minimal 1 kali selama pembelajaran, misalnya Gerak Lagu Sekolah Sehat.' },
      { text: 'Pembiasaan senam dan/atau kegiatan sejenis, minimal 1 kali seminggu.' },
      { text: 'Pembiasaan permainan rakyat dan olahraga tradisional.' },
      { text: 'Pembiasaan jalan kaki.' },
      { text: 'Pelaksanaan Tes Kebugaran Siswa Indonesia (TKSI).' }
    ],
    topics: [
      {
        id: 'skj',
        type: 'text',
        title: 'Pembiasaan Aktivitas Fisik melalui Senam Kesegaran Jasmani (SKJ)',
        paragraphs: [
          'SKJ merupakan bentuk senam massal dengan rangkaian gerak tertentu dan diiringi musik, yang berguna meningkatkan kebugaran jasmani peserta didik.',
          'Selain itu, senam kesegaran jasmani merupakan media untuk mendorong perkembangan keterampilan motorik, kemampuan fisik, pengetahuan, penalaran, penghayatan nilai (sikap, mental, emosional, spiritual, sosial), dan pembiasaan pola hidup sehat yang bermuara untuk merangsang pertumbuhan serta perkembangan yang seimbang. Pelaksanaannya juga dapat dilakukan secara massal, mudah, dan tidak memerlukan waktu yang lama.'
        ]
      },
      {
        id: 'manajemen-skj',
        type: 'facts',
        title: 'Manajemen Pelaksanaan SKJ',
        items: [
          { label: 'Frekuensi', icon: 'fa-solid fa-repeat', value: 'Sekali seminggu.' },
          { label: 'Waktu', icon: 'fa-regular fa-clock', value: 'Pagi hari sebelum kegiatan belajar mengajar; hari pelaksanaannya ditentukan oleh sekolah.' },
          { label: 'Durasi', icon: 'fa-solid fa-stopwatch', value: '10 s.d. 15 menit.' },
          { label: 'Sarana', icon: 'fa-solid fa-music', value: 'Halaman sekolah/lapangan/aula, pemutar musik, laptop, LCD, dan layar proyektor.' },
          { label: 'Instruktur', icon: 'fa-solid fa-user-group', value: 'Guru Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK) dan peserta didik yang sudah terampil atau dapat meniru gerakan pada tampilan layar proyektor.' }
        ]
      },
      {
        id: 'optimalisasi-4l',
        type: 'text',
        title: 'Optimalisasi 4L (Lari, Lompat, Loncat, Lempar) melalui Permainan Rakyat dan Olahraga Tradisional',
        paragraphs: [
          'Permainan rakyat dan olahraga tradisional merupakan warisan kebudayaan nenek moyang bangsa Indonesia yang tumbuh dan berkembang dalam komunitas masyarakat, diwariskan dan dimainkan dari generasi ke generasi.',
          'Penerapan permainan rakyat dan olahraga tradisional saat jam istirahat di sekolah merupakan salah satu upaya untuk melestarikan kekayaan budaya bangsa Indonesia melalui pendidikan dan menumbuhkan kembali karakter budaya bangsa. Selain itu, permainan rakyat dan olahraga tradisional dapat menjadi wadah dalam mengembangkan kemampuan motorik dan kebugaran jasmani peserta didik.'
        ]
      },
      {
        id: 'peregangan',
        type: 'text',
        title: 'Gerakan Peregangan pada Pergantian Jam Pelajaran',
        paragraphs: [
          'Gerakan peregangan adalah gerakan yang dilakukan untuk meningkatkan fleksibilitas otot atau jangkauan gerak sendi. Gerakan ini sangat berguna bagi peserta didik ketika mereka akan melakukan aktivitas fisik dan juga dapat melemaskan kembali bagian tubuh yang kaku setelah beraktivitas.',
          'Gerakan peregangan dapat dilakukan bersama-sama di dalam kelas sesaat sebelum memulai kegiatan pembelajaran, ketika pergantian jam pelajaran, atau saat istirahat.'
        ]
      }
    ],
    tools: [
      { title: 'Buku Saku Gerak Ragaku di Sekolah', url: 'https://drive.google.com/file/d/111Vwr0_RfervHeA2PBFqDgWpdNbf-Rol/view?usp=sharing' },
      { title: 'Poster Sehat Fisik', url: 'https://drive.google.com/file/d/1e3y7p6p8pJ0Wy_sCgjzSLZraaoY4x_tB/view?usp=sharing' },
      { title: 'Leaflet Sehat Fisik', url: 'https://drive.google.com/file/d/1eRBEUjU9s47-ZBZoymJdREb5a9C4E8Mm/view?usp=sharing' },
      // tksi.kemdikbud.go.id no longer resolves (checked 2026-09-17).
      { title: 'Tes Kebugaran Siswa Indonesia (TKSI)', url: null }
    ]
  },
  {
    id: 'imunisasi',
    title: 'Sehat Imunisasi',
    icon: 'fa-solid fa-syringe',
    summary: 'Meningkatkan capaian imunisasi peserta didik agar mendapatkan imunisasi dasar lengkap.',
    goal: 'Sehat Imunisasi bertujuan untuk meningkatkan capaian imunisasi peserta didik untuk mendapatkan imunisasi dasar lengkap.',
    videos: [
      video('b37DSZbalb4', 'Imunisasi Lindungi Mimpi', 'Direktorat Sekolah Dasar'),
      video('5hAgyVUAe7I', 'Bulan Imunisasi Anak Sekolah (BIAS)', 'Direktorat Sekolah Dasar')
    ],
    activities: [
      { label: 'Pemetaan Status Imunisasi', text: 'Pemetaan dilakukan dengan cara memeriksa riwayat imunisasi peserta didik berdasarkan catatan riwayat imunisasi yang dikeluarkan oleh puskesmas atau fasilitas kesehatan lainnya. Pemetaan dapat juga dilakukan dengan meminta informasi dari orang tua/wali tentang riwayat imunisasi peserta didik.' },
      { label: 'Pemberian Rekomendasi', text: 'Sekolah atau satuan pendidikan menyampaikan informasi dan rekomendasi kepada orang tua atau wali tentang peserta didik yang belum mendapatkan imunisasi lengkap agar melengkapi imunisasinya.' },
      { label: 'Pelaksanaan Imunisasi Lengkap dalam Bulan Imunisasi Anak Sekolah (BIAS)', text: 'Sekolah atau satuan pendidikan bekerja sama dengan puskesmas atau fasilitas pelayanan kesehatan setempat untuk memberikan fasilitasi atau mendukung pelaksanaan imunisasi di Bulan Imunisasi Anak Sekolah (BIAS) pada bulan Agustus dan November.' }
    ],
    topics: [
      {
        id: 'bias',
        type: 'facts',
        title: 'Bulan Imunisasi Anak Sekolah (BIAS)',
        intro: 'Bulan Imunisasi Anak Sekolah adalah kegiatan nasional berupa pemberian imunisasi pada anak usia SD/MI/bentuk lain yang sederajat, dilaksanakan dua kali setahun:',
        items: [
          { label: 'Agustus', icon: 'fa-regular fa-calendar', value: 'Imunisasi Campak Rubela dan HPV.' },
          { label: 'November', icon: 'fa-regular fa-calendar', value: 'Imunisasi DT dan Td.' }
        ]
      },
      {
        id: 'sasaran-bias',
        type: 'text',
        title: 'Sasaran, Jenis, dan Jadwal Pemberian Imunisasi',
        paragraphs: [
          'Sasaran BIAS adalah peserta didik kelas 1, 2, 5, dan 6 SD/MI/bentuk lain yang sederajat dan anak usia sekolah yang tidak sekolah.',
          'Jenis imunisasi yang diberikan pada pelaksanaan BIAS bertujuan untuk mencegah penyakit Campak, Rubela, Difteri, Tetanus Neonatorum, dan kanker leher rahim yang merupakan masalah kesehatan di Indonesia dan dapat menyebabkan disabilitas dan kematian.',
          'Setiap anak usia sekolah harus dipastikan memiliki riwayat imunisasi rutin lengkap, tidak hanya imunisasi pada saat bayi dan di bawah usia dua tahun, tetapi juga dilengkapi dengan imunisasi lanjutan pada anak usia sekolah tingkat dasar.'
        ]
      }
    ],
    tools: [
      // Drive file is private (HTTP 401, checked 2026-09-17).
      { title: 'Petunjuk Teknis BIAS', url: null },
      { title: 'Komik BIAS', url: 'https://drive.google.com/file/d/1PaSDbNYyERXOWtwAjPbBnxXJ-wTYWe1t/view?usp=sharing' },
      { title: 'Surat Keputusan Bersama terkait Penyelenggaraan Peningkatan Status Kesehatan Peserta Didik', url: 'https://drive.google.com/file/d/1dZYXFGOiulz1SGugKj3UO4E8Qy4_82hr/view?usp=sharing' },
      { title: 'Poster Sehat Imunisasi', url: 'https://drive.google.com/file/d/1ToqVG_nTxJMMwyBz4Uad0NGE_Z699u00/view?usp=sharing' },
      { title: 'Leaflet Sehat Imunisasi', url: 'https://drive.google.com/file/d/1z5mbEois0XzOpqmIQF33Tox85Y7tEknt/view?usp=sharing' }
    ]
  },
  {
    id: 'jiwa',
    title: 'Sehat Jiwa',
    icon: 'fa-solid fa-hand-holding-heart',
    summary: 'Meningkatkan perkembangan peserta didik, baik secara fisik, mental, spiritual, dan sosial sehingga mampu menyadari kemampuan sendiri dan dapat mengatasi tekanan.',
    goal: 'Sehat Jiwa bertujuan untuk meningkatkan perkembangan kesehatan fisik, mental, spiritual, dan sosial sehingga mampu menyadari kemampuan sendiri, mengatasi tekanan, bekerja/belajar secara optimal, dan memberikan kontribusi untuk komunitasnya.',
    // Source linked a different focus area's video; left out until the right one is known.
    videos: [],
    activities: [
      { text: 'Sosialisasi Pencegahan dan Penanganan Kekerasan di Satuan Pendidikan, salah satunya pada saat pelaksanaan Masa Pengenalan Lingkungan Sekolah (MPLS).' },
      { text: 'Sosialisasi kesehatan jiwa minimal satu kali dalam satu semester.' },
      { text: 'Pelaksanaan doa bersama sebelum dan sesudah pembelajaran.' },
      { text: 'Peningkatan pemahaman dan kapasitas pendidik terkait kesehatan jiwa.' },
      { text: 'Pelaksanaan skrining kesehatan jiwa peserta didik melalui koordinasi dan kerja sama dengan Puskesmas.' }
    ],
    topics: [
      {
        id: 'sosialisasi-jiwa',
        type: 'list',
        title: 'Sosialisasi Kesehatan Jiwa di Lingkungan Sekolah',
        intro: 'Sosialisasi dilakukan bersama tenaga kesehatan dari Dinas Kesehatan, Puskesmas, atau narasumber lain, minimal 1 kali dalam 1 semester. Topik yang bisa dipilih:',
        items: [
          { text: 'Mengenali dan mengatur emosi, perilaku, dan keterampilan psikososial.' },
          { text: 'Pencegahan peredaran dan penggunaan Narkotika, Psikotropika, dan Zat Adiktif lainnya (NAPZA).' },
          { text: 'Pemanfaatan internet/media sosial secara sehat dan bijaksana.' }
        ]
      },
      {
        id: 'sijiwa',
        type: 'text',
        title: 'Aplikasi SIJIWA untuk Skrining Kesehatan Jiwa Peserta Didik',
        paragraphs: [
          'Skrining kesehatan jiwa dilakukan untuk mengetahui masalah kesehatan jiwa yang dialami peserta didik, agar mempermudah konseling dan penanganan lanjutan, dengan menggunakan aplikasi Sistem Informasi Jiwa (SIJIWA) yang dikembangkan oleh Kementerian Kesehatan.',
          'Pengisian aplikasi dapat dilakukan oleh masing-masing peserta didik atau bersama-sama dengan dipandu oleh satuan pendidikan yang bekerja sama dengan Puskesmas setempat. Informasi terkait aplikasi ini dan cara pengisiannya dapat ditanyakan ke Puskesmas setempat.'
        ]
      },
      {
        id: 'cegah-bullying',
        type: 'list',
        title: 'Ayo, Cegah Bullying di Sekolah!',
        intro: 'Upaya pencegahan dan penanganan kekerasan di lingkungan satuan pendidikan bertujuan agar warga sekolah:',
        items: [
          { text: 'Mencegah terjadinya kekerasan di lingkungan satuan pendidikan.' },
          { text: 'Melaporkan kekerasan yang dialami dan/atau diketahuinya.' },
          { text: 'Mampu mencari dan mendapatkan bantuan ketika mengalami kekerasan.' },
          { text: 'Segera mendapatkan penanganan dan bantuan yang menyeluruh jika mengalami kekerasan.' }
        ]
      }
    ],
    tools: [
      {
        title: 'Modul Pencegahan dan Penanganan Kekerasan di Satuan Pendidikan (PPKSP)',
        url: null,
        variants: [
          { label: 'PAUD', url: 'https://drive.google.com/file/d/1zmbUcn17p9Ulm3_4CmVojONdxdGWCA8B/view' },
          { label: 'SD', url: 'https://drive.google.com/file/d/1jYZBf064d-Voj6-HK9PHnXGcn6yDYPof/view' },
          { label: 'SMP', url: 'https://drive.google.com/file/d/18j8p1APYb8E-s82FEYBruhY4IycDhh-m/view' },
          { label: 'SMA/SMK', url: 'https://drive.google.com/file/d/1cfeh36SLUdtorHoksx8jbBMwP30zvQLr/view' }
        ]
      },
      // Source link is the Poster Sehat Bergizi file.
      { title: 'Modul Ayo Atasi Perundungan (AAP)', url: null },
      // Play Store listing returns 404 (checked 2026-09-17).
      { title: 'Aplikasi SIJIWA', url: null }
    ]
  },
  {
    id: 'lingkungan',
    title: 'Sehat Lingkungan',
    icon: 'fa-solid fa-leaf',
    summary: 'Meningkatkan kondisi satuan pendidikan yang dapat mendukung tumbuh kembang peserta didik secara optimal dan membentuk Perilaku Hidup Bersih dan Sehat (PHBS).',
    goal: 'Lingkungan sekolah sehat dapat mendukung tumbuh kembang peserta didik secara optimal serta membentuk perilaku hidup bersih dan sehat dan terhindar dari pengaruh negatif.',
    // Source linked a different focus area's video; left out until the right one is known.
    videos: [],
    activities: [
      { text: 'Pembiasaan Cuci Tangan Pakai Sabun (CTPS) dengan air mengalir.' },
      { text: 'Pembiasaan buang sampah ke tempat sampah tertutup dan terpilah.' },
      { text: 'Kerja bakti kebersihan sekolah dan/atau penghijauan sekolah minimal sebulan sekali.' },
      { text: 'Penerapan Kawasan Tanpa Rokok/Vaping di lingkungan sekolah.' },
      { text: 'Penyediaan dan pemeliharaan toilet agar berfungsi dengan baik dan bersih serta terpisah antara toilet laki-laki dan perempuan.' },
      { text: 'Penyediaan Kantin Sehat.' },
      { text: 'Pengaturan ruangan yang memiliki penghawaan dan pencahayaan alami.' }
    ],
    topics: [
      {
        id: 'ctps',
        type: 'list',
        title: 'Langkah Cuci Tangan Pakai Sabun (CTPS) yang Benar',
        intro: 'CTPS dilakukan sebelum masuk kelas, sebelum makan, sebelum dan setelah menggunakan toilet, setelah menggunakan fasilitas bersama, dan lain-lain.',
        ordered: true,
        items: [
          { text: 'Membasahi kedua tangan dengan air bersih yang mengalir.' },
          { text: 'Menggosokkan sabun pada kedua telapak tangan sampai berbusa, lalu menggosok kedua punggung tangan, jari jemari, dan kedua jempol sampai semua permukaan kena busa sabun.' },
          { text: 'Membersihkan ujung-ujung jari dan sela-sela di bawah kuku.' },
          { text: 'Membilas dengan air bersih sambil menggosok-gosok kedua tangan sampai sisa sabun hilang.' },
          { text: 'Mengeringkan kedua tangan dengan kain, handuk bersih, atau kertas tisu, atau mengibas-ibaskan kedua tangan sampai kering.' }
        ]
      },
      {
        id: 'prinsip-3r',
        type: 'list',
        title: 'Bijak Mengelola Sampah dengan Prinsip 3R',
        intro: 'Sampah di satuan pendidikan dipilah menjadi organik, anorganik, dan residu, lalu dikelola dengan prinsip Reduce, Reuse, Recycle.',
        items: [
          { label: 'Reduce (Mengurangi)', text: 'Mengurangi produksi limbah dengan mengurangi penggunaan barang-barang sekali pakai atau mengambil langkah-langkah untuk mengurangi konsumsi sumber daya alam.' },
          { label: 'Reuse (Menggunakan Ulang)', text: 'Menggunakan kembali barang-barang atau bahan-bahan yang masih dapat digunakan setelah pemakaian awalnya.' },
          { label: 'Recycle (Mendaur Ulang)', text: 'Proses mengubah bahan-bahan bekas menjadi bahan baru yang dapat digunakan kembali.' }
        ]
      }
    ],
    tools: [
      { title: 'Buku Saku Kantin dan Jajanan Sehat di Sekolah', url: 'https://is3.cloudhost.id/storagedirectus1/manajemen_uks/files/publikasi/L4H44OkNQw3Oal3CXziuAuHDgoGZuTIQ3UogIaNT.pdf' },
      // Source link points at an old-domain infografis index that no longer resolves.
      { title: 'Poster Prosedur Pembersihan Toilet', url: null },
      // Source link is the Leaflet Sehat Bergizi file.
      { title: 'Leaflet Sehat Lingkungan', url: null }
    ]
  }
];
