/**
 * TRIAS UKS/M — 3 PILAR & 16 SUB-PROGRAM
 *
 * Verbatim from dev's /trias-uks (see docs/trias-uks-content.MD).
 * Each item is a title + description + an ordered list of optional
 * sections, because the field set genuinely varies per item on dev.
 *
 * Section types: 'text' (string) · 'bullets' (string[]) ·
 * 'numbered' (string[]) · 'links' ({ label, url | null }[])
 *
 * `placeholder: true` marks an item whose body still needs real copy.
 */

export const TRIAS_SOURCE = 'portal-uks.demo.or.id/trias-uks';

const SANITASI_WAKTU = 'Pembersihan dan desinfeksi dilakukan minimal 2 kali/hari; pembuangan sampah ke tempat sampah tertutup dan terpilah serta ke TPS dilakukan setiap hari; pelaksanaan reuse atau recycle dilaksanakan 1 kali/minggu atau sesuai kebutuhan.';

export const triasPillarsDetail = {
  pendidikan: {
    id: 'pendidikan',
    number: 1,
    title: 'Pendidikan Kesehatan',
    icon: 'fa-solid fa-graduation-cap',
    color: '#098C4C',
    bgBadge: '#D2E8DA',
    cardColor: '#098C4C',
    description: 'Pendidikan kesehatan di sekolah/madrasah dilaksanakan melalui berbagai kegiatan yang bertujuan meningkatkan pengetahuan, keterampilan, sikap, dan perilaku hidup sehat peserta didik melalui penerapan Trias UKS/M.',
    items: [
      {
        id: 'literasi-kesehatan',
        title: 'Literasi Kesehatan',
        description: 'Literasi merupakan kemampuan mengakses, memahami melalui berbagai aktivitas membaca, melihat, menyimak, menyampaikan dan mempraktekkan. Gerakan Literasi Sekolah (GLS) merupakan kegiatan partisipatif yang melibatkan peserta didik, guru, warga sekolah/madrasah dan pemangku kepentingan lainnya. Literasi dapat menggunakan berbagai materi termasuk kesehatan. Dalam rangka meningkatkan penerapan Trias UKS/M, literasi yang diselenggarakan di sekolah/madrasah diantaranya meliputi literasi kesehatan, yang diberikan dengan cara interaktif, menarik dan partisipatif. Contoh literasi kesehatan seperti diskusi dengan guru kelas, pembuatan proyek terkait kesehatan (misal video dan poster kesehatan atau melalui permainan bertema kesehatan). Kegiatan ini dilaksanakan dengan tujuan untuk memastikan pesan kunci kesehatan dapat tersampaikan dengan baik kepada peserta didik.',
        sections: [
          { label: 'Waktu', type: 'text', content: 'Literasi kesehatan dilakukan secara rutin dalam jam literasi minimal 1 minggu 1 kali selama 15 menit. Akan tetapi, waktu pelaksanaan literasi kesehatan dapat ditambah dan disesuaikan dengan kebijakan masing-masing sekolah/madrasah.' },
          { label: 'Tempat', type: 'text', content: 'Masing-masing kelas atau luar kelas.' },
          { label: 'Pelaksana', type: 'text', content: 'Guru kelas, guru mata pelajaran pada sesi literasi sekolah/madrasah, peserta didik.' },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Buku Rapor Kesehatanku seri Informasi Kesehatan, Buku Aksi Bergizi dan Buku/Media KIE kesehatan lainnya.',
              'Permainan-permainan bertema kesehatan.',
              'Aplikasi dan media KIE yang dikeluarkan Kementerian Kesehatan yang bisa diakses melalui www.kesga.kemkes.go.id, twitter/instagram/facebook Ditkesga, YouTube Direktorat Kesehatan Keluarga, www.kemkes.go.id, dan www.promkes.kemkes.go.id, dan lain-lain.'
            ]
          },
          {
            label: 'Langkah-langkah', type: 'numbered', content: [
              'Sekolah/madrasah mengalokasikan waktu dan jam literasi kesehatan minimal 1 (satu) kali seminggu.',
              'Guru UKS/M membuat jadwal literasi kesehatan berdasarkan topik-topik dalam Buku Rapor Kesehatan Seri Informasi Kesehatan atau materi kesehatan lainnya yang dibutuhkan. Topik literasi kesehatan juga dapat ditambahkan dengan topik kesehatan kekinian.'
            ]
          }
        ]
      },
      {
        // Dev shows the Sanitasi Sekolah text here (a known copy bug), so the
        // body stays a placeholder until PHBS's own copy is written.
        id: 'perilaku-hidup-bersih-dan-sehat',
        title: 'Perilaku Hidup Bersih dan Sehat',
        placeholder: true,
        description: null,
        sections: []
      },
      {
        id: 'pendidikan-gizi',
        title: 'Pendidikan Gizi',
        description: 'Pendidikan gizi merupakan upaya untuk mengubah sikap dan perilaku untuk mendukung pemenuhan gizi seimbang pada peserta didik. Pemenuhan gizi seimbang sangat penting dilakukan untuk meningkatkan pencapaian pertumbuhan dan perkembangan peserta didik yang optimal sehingga mereka dapat mengikuti proses pembelajaran secara lebih baik.',
        sections: [
          { label: 'Waktu', type: 'text', content: 'Kegiatan sarapan bersama dilaksanakan minimal satu kali dalam seminggu sebelum jam pelajaran pertama. Kegiatan ini dilaksanakan berurutan pada hari yang sama dengan kegiatan cuci tangan pakai sabun, pemberian tablet tambah darah bagi peserta didik puteri tingkat SMP/MTs dan SMA/SMK/MA dan sikat gigi bersama.' },
          { label: 'Tempat', type: 'text', content: 'Pendidikan gizi bisa dilaksanakan di kelas masing-masing atau di luar kelas yang kondusif untuk bisa melakukan sarapan bersama. Namun untuk pelaksanaan yang lebih tertib dan cepat (efisiensi waktu) disarankan untuk dilaksanakan di kelas masing-masing dengan pengawasan guru kelas.' },
          { label: 'Pelaksana', type: 'text', content: 'Guru kelas, kader kesehatan sekolah/madrasah, peserta didik.' },
          {
            label: 'Kegiatan', type: 'numbered', content: [
              'Pemahaman akan gizi seimbang atau Isi Piringku, termasuk contoh pada saat acara-acara yang diselenggarakan di sekolah (rapat komite sekolah, acara kesenian, ulang tahun sekolah, Hari Guru, dan sebagainya).',
              'Sarapan bersama dengan gizi seimbang. Umpan balik dari guru kelas terhadap sarapan bersama yang dibawa peserta didik.',
              'Konsumsi tablet tambah darah.',
              'Menghindari/meminimalisir makanan siap saji, makanan/minuman yang berpemanis, pengawet, kurang serat, tinggi gula, garam, dan lemak.',
              'Pendidikan gizi diberikan kepada petugas kantin, pedagang kaki lima, dan warung di sekitar sekolah untuk menghindari menjajakan makanan siap saji, makanan/minuman yang berpemanis, pengawet, kurang serat, tinggi gula, garam, dan lemak.',
              'Peserta didik diminta untuk membawa bekal dari rumah sesuai dengan prinsip Isi Piringku dan membawa air putih secukupnya. Sarapan bersama dilakukan sebelum atau sekitar pukul 07.00 pagi agar dapat mendukung proses pembelajaran. Aktivitas fisik diajarkan dan diaktifkan kepada semua peserta didik untuk mencegah dan meminimalisir kelebihan berat badan termasuk obesitas.'
            ]
          },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Bekal sarapan menu bergizi seimbang yang dibawa oleh masing-masing peserta didik dan makanan atau minuman pada acara sekolah.',
              'Sarana cuci tangan dengan sabun dan air mengalir.',
              'Materi edukasi gizi seperti modul Aksi Bergizi untuk fasilitator dan Buku Saku Aksi Bergizi untuk peserta didik, atau materi edukasi gizi lainnya yang dikeluarkan Kemenkes/sumber lainnya yang diakui kebenarannya (digital/bahan cetak).'
            ]
          },
          {
            label: 'Langkah-langkah', type: 'numbered', content: [
              'Orang tua/wali menyiapkan bekal sarapan dengan menu gizi seimbang untuk dibawa ke sekolah/madrasah sesuai dengan jadwal yang telah ditentukan.',
              'Peserta didik melaksanakan sarapan di kelas masing-masing didampingi oleh guru kelas. Pada saat pelaksanaan, guru meminta peserta didik untuk: 1) mencuci tangan dengan sabun dan air mengalir sebelum makan; 2) berdoa; 3) sarapan bersama dengan menu bergizi seimbang; 4) diakhiri minum tablet tambah darah khusus bagi remaja putri; 5) minum air putih; 6) membuang sampah pada tempatnya; 7) mencuci tangan dengan sabun dan air mengalir setelah sarapan.',
              'Pada saat peserta didik melaksanakan sarapan bersama, guru memantau menu makanan yang dibawa oleh peserta didik dan memastikan menu yang dibawa adalah menu gizi seimbang sesuai dengan ketentuan "Isi Piringku".',
              'Dalam memantau pelaksanaan sarapan bersama, guru kelas dapat dibantu oleh kader kesehatan sekolah/madrasah pokja gizi di masing-masing kelas.',
              'Guru menyampaikan pendidikan gizi kepada peserta didik sesuai topik yang ada di buku Aksi Bergizi, buku rapor seri informasi dan buku lainnya.'
            ]
          },
          {
            // Dev shows these two labels without URLs.
            label: 'Tautan Penting', type: 'links', content: [
              { label: 'Pendidikan untuk Anak (Nutrition Education for Children)', url: null },
              { label: 'Pendidikan untuk Orang Tua (Nutrition Education for Parents)', url: null }
            ]
          }
        ]
      },
      {
        id: 'pendidikan-kesehatan-reproduksi',
        title: 'Pendidikan Kesehatan Reproduksi',
        description: 'Kesehatan reproduksi adalah keadaan sehat secara fisik, mental dan sosial secara utuh, tidak semata-mata terbebas dari penyakit atau kecacatan yang berkaitan dengan sistem, fungsi dan proses reproduksi. Pendidikan kesehatan reproduksi di sekolah/madrasah sangat penting mengingat belum tersosialisasikannya secara menyeluruh cara perawatan kebersihan organ reproduksi, perilaku seksual pranikah, kehamilan anak yang berisiko dan masalah reproduksi pada peserta didik saat ini dan setelah dewasa. Pendidikan kesehatan reproduksi bagi anak usia sekolah lebih menekankan kepada proses pertumbuhan dan perkembangan untuk mencapai dewasa sehat dan mengasah kemampuan/daya tangkal peserta didik untuk menghindarkan diri dari perilaku berisiko atau pengaruh luar yang akan berdampak negatif bagi kesehatan mereka khususnya kesehatan reproduksi. Materi yang diberikan antara lain: konsep dasar pendidikan kesehatan reproduksi; nilai, norma, batasan diri dan hubungan dengan orang lain; pertumbuhan dan perkembangan peserta didik; masalah kesehatan reproduksi peserta didik; gender dan kekerasan; teknologi, informasi dan komunikasi; serta dukungan dan layanan masalah kesehatan reproduksi di sekolah.',
        sections: [
          { label: 'Waktu', type: 'text', content: 'Intrakurikuler: dilaksanakan sedikitnya 1 kali setiap minggu pada jam pelajaran Guru BK/Guru kelas atau terintegrasi pada mata pelajaran guru lainnya seperti IPA atau PJOK yang sesuai. Kokurikuler: dilaksanakan sedikitnya 1 kali setiap minggu. Ekstrakurikuler: dilaksanakan sedikitnya 1 kali setiap minggu melalui kegiatan secara interaktif/dalam bentuk permainan.' },
          { label: 'Pelaksana', type: 'text', content: 'Guru kelas, guru mata pelajaran IPA, PJOK, guru UKS/M, peserta didik.' },
          {
            label: 'Kegiatan', type: 'numbered', content: [
              'Pemberian materi kesehatan reproduksi kepada peserta didik disesuaikan dengan usia, tingkat pendidikan dan terintegrasi dengan mata pelajaran (diberikan dalam bentuk permainan dan diskusi kasus) secara intrakurikuler, kokurikuler dan ekstrakurikuler.'
            ]
          },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Buku-buku pedoman/panduan kesehatan reproduksi/rencana aksi guru.',
              'Video tutorial dan media KIE lainnya.'
            ]
          },
          {
            label: 'Langkah-langkah', type: 'numbered', content: [
              'Intrakurikuler: pendidikan kesehatan reproduksi diberikan melalui program Aksi Guru secara berjenjang dari Direktorat GTK (Guru & Tenaga Kependidikan) Kemendikbud.',
              'Kokurikuler: dilaksanakan seperti alur pemberian pelajaran melalui kokurikuler seperti biasanya.',
              'Ekstrakurikuler: dilaksanakan sedikitnya 1 kali setiap minggu dengan memberikan pemahaman dan keterampilan terkait kesehatan reproduksi. Guru menyampaikan pendidikan kesehatan reproduksi melalui diskusi, bermain peran, studi kasus dan permainan.'
            ]
          }
        ]
      },
      {
        id: 'pendidikan-karakter',
        title: 'Pendidikan Karakter',
        description: 'Pendidikan Keterampilan Hidup Sehat (PKHS) adalah kemampuan psikososial seseorang untuk memenuhi kebutuhan dan mengatasi masalah dalam kehidupan sehari-hari secara efektif. PKHS berperan besar dalam membantu peserta didik mengatasi masalah kesehatannya. Ada 10 keterampilan hidup sehat yang wajib diketahui dan dipraktikkan peserta didik dalam kehidupan sehari-hari, yaitu: empati; kesadaran diri; pengambilan keputusan; pemecahan masalah; berpikir kreatif; berpikir kritis; komunikasi efektif; hubungan interpersonal; mengendalikan emosi; dan mengatasi stres.',
        sections: [
          { label: 'Waktu', type: 'text', content: 'Intrakurikuler: dilaksanakan sedikitnya 1 kali setiap minggu pada jam pelajaran Guru BK/Guru kelas atau terintegrasi pada mata pelajaran guru lainnya yang sesuai. Kokurikuler: dilaksanakan sedikitnya 1 kali setiap minggu. Ekstrakurikuler: dilaksanakan sedikitnya 1 kali setiap minggu melalui kegiatan secara interaktif/dalam bentuk permainan.' },
          { label: 'Tempat', type: 'text', content: 'PKHS dilaksanakan di kelas atau di luar kelas yang kondusif untuk pelaksanaan PKHS.' },
          { label: 'Pelaksana', type: 'text', content: 'Guru kelas, guru mata pelajaran, guru UKS/M, peserta didik.' },
          {
            label: 'Kegiatan', type: 'numbered', content: [
              'Pendidikan keterampilan hidup sehat dilakukan dengan cara pemberian informasi dan keterampilan melalui metode-metode partisipatif yang dapat mendorong peserta didik memahami dan mempraktikkan keterampilan hidup sehat.',
              'PKHS dilaksanakan secara terintegrasi dengan mata pelajaran yang sesuai seperti pelajaran bimbingan dan konseling di tingkat SMP atau SMA atau sederajatnya, di setiap pelajaran tematik di tingkat PAUD (TK/RA/KB/BA/TPA/SPS) dan SD, atau sesi khusus guru kelas.',
              'PKHS juga dapat dilakukan terintegrasi, contohnya dengan pendidikan kesehatan reproduksi, pendidikan gizi dan PHBS, dan lain-lain.'
            ]
          },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Buku pedoman PKHS Kementerian Kesehatan.',
              'Buku Petunjuk Pelaksanaan Pelayanan Kesehatan Jiwa di Sekolah Kementerian Kesehatan.',
              'Buku Pendidikan Keterampilan Hidup Kementerian Pendidikan dan Kebudayaan.',
              'Beberapa media KIE dan video tutorial yang digunakan untuk mendukung pembelajaran terkait konten PKHS.'
            ]
          }
        ]
      },
      {
        id: 'pembiasaan-aktivitas-fisik',
        title: 'Pembiasaan Aktivitas Fisik',
        description: 'Pembiasaan aktivitas fisik merupakan pembiasaan kegiatan aktivitas fisik di sekolah untuk mendukung pencapaian pertumbuhan dan perkembangan yang optimal, menjaga kebugaran dan mencegah risiko terkena penyakit tidak menular.',
        sections: [
          { label: 'Waktu', type: 'text', content: 'Peregangan pada pergantian jam pelajaran atau pada saat peserta didik sudah mulai merasa bosan dan lelah di kelas, dilakukan minimal 1 kali per hari. Optimalisasi 4L dilaksanakan minimal 1 kali per hari pada jam istirahat untuk jenjang SD/MI. Optimalisasi olahraga dilaksanakan sesuai jam mata pelajaran olahraga di sekolah/madrasah. Ekstrakurikuler wajib olahraga/beladiri/kesenian dilaksanakan minimal satu kali per minggu.' },
          { label: 'Tempat', type: 'text', content: 'Kegiatan peregangan dilaksanakan di kelas. Kegiatan optimalisasi aktivitas fisik lainnya dilaksanakan di lapangan sekolah/madrasah atau di lingkungan sekolah/madrasah yang kondusif untuk pelaksanaan aktivitas fisik.' },
          { label: 'Pelaksana', type: 'text', content: 'Peserta didik, guru kelas, guru mata pelajaran, dan guru PJOK.' },
          {
            label: 'Kegiatan', type: 'numbered', content: [
              'Gerakan peregangan pada pergantian jam pelajaran.',
              'Optimalisasi 4 (empat) L (Lompat, Lari, Lempar, Loncat) pada jam istirahat khusus bagi peserta didik SD/MI.',
              'Ekstrakurikuler wajib olahraga/beladiri/kesenian bagi peserta didik SMP/MTs dan SMA/SMK/MA.',
              'Optimalisasi jam pelajaran olahraga.'
            ]
          },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Kreasi gerakan peregangan yang dapat dibuat oleh guru atau peserta didik misalnya gerak kapiten, gerak penguin, dan lain-lain. Kreasi gerakan peregangan dapat dilakukan dengan diiringi lagu melalui sound system atau dengan bernyanyi sendiri.',
              'Halaman sekolah/madrasah atau aula yang dapat digunakan sebagai tempat bermain/olahraga.',
              'Sarana dan prasarana olahraga.'
            ]
          },
          {
            label: 'Langkah-langkah', type: 'numbered', content: [
              'Guru dan peserta didik melakukan kreasi gerakan peregangan.',
              'Guru meminta peserta didik untuk memimpin peregangan secara bergantian ditandai dengan bunyi bel atau lonceng menandakan waktu pelaksanaan peregangan bersama.',
              'Sekolah/madrasah mendorong peserta didik untuk bermain dan berolahraga yang mengandung gerakan 4L saat jam istirahat.',
              'Sekolah/madrasah menginformasikan dan mendorong ekstrakurikuler olahraga/beladiri/kesenian sebagai ekstrakurikuler wajib.',
              'Guru PJOK mendorong peserta didik untuk melaksanakan olahraga secara optimal minimal pada jam pelajaran olahraga.',
              'Sekolah/madrasah menyediakan sarana dan prasarana untuk mendukung peningkatan olahraga berprestasi di sekolah/madrasah.'
            ]
          }
        ]
      },
      {
        id: 'dokter-kecil',
        title: 'Dokter Kecil',
        description: 'Dokter kecil adalah peserta didik yang memenuhi kriteria dan telah dilatih untuk ikut melaksanakan sebagian usaha pemeliharaan dan peningkatan kesehatan terhadap diri sendiri, teman, keluarga dan lingkungannya.',
        sections: [
          {
            label: 'Tugas', type: 'numbered', content: [
              'Menggerakkan dan membimbing teman menerapkan Trias UKS.',
              'Membantu petugas kesehatan dalam P3K dan P3P.',
              'Memperoleh pembekalan materi pelatihan.',
              'Pengamatan kebersihan.',
              'Pencatatan pelaporan.',
              'Membantu guru untuk hal-hal khusus.'
            ]
          }
        ]
      }
    ]
  },

  pelayanan: {
    id: 'pelayanan',
    number: 2,
    title: 'Pelayanan Kesehatan',
    icon: 'fa-solid fa-kit-medical',
    color: '#2563EB',
    bgBadge: '#DBEAFE',
    cardColor: '#1E40AF',
    description: 'Upaya promotif, preventif, kuratif, dan rehabilitatif untuk menjaga kesehatan warga sekolah, meliputi penjaringan kesehatan dan pemeriksaan berkala, imunisasi, pemberian obat cacing, serta P3K dan P3P.',
    items: [
      {
        id: 'penjaringan-kesehatan-dan-pemeriksaan-berkala',
        title: 'Penjaringan Kesehatan dan Pemeriksaan Berkala',
        description: 'Penjaringan kesehatan merupakan rangkaian pemeriksaan kesehatan (skrining) yang dilakukan pada seluruh peserta didik baru yaitu kelas 1 SD/MI, 7 SMP/MTs dan 10 SMA/SMK/MA (entry level), sedangkan pemeriksaan berkala adalah rangkaian pemeriksaan kesehatan (skrining) yang dilakukan pada seluruh peserta didik kelas 2-6 SD/MI, 8-9 SMP/MTs dan 11-12 SMA/SMK/MA. Pada masa pandemi, skrining sederhana dapat dilakukan langsung oleh peserta didik didampingi orang tua menggunakan formulir pemantauan kesehatan mandiri anak usia sekolah dan remaja pada masa pandemi COVID-19.',
        sections: [
          {
            label: 'Kegiatan', type: 'numbered', content: [
              'Pemeriksaan kesehatan menggunakan kuesioner. Kuesioner berisi pertanyaan mengenai riwayat kesehatan keluarga, diri, imunisasi dan perilaku terkait kesehatan lainnya. Kuesioner diisi oleh masing-masing peserta didik. Bagi peserta didik kelas 1-3 SD/MI atau peserta didik di SLB, pengisian kuesioner ini dapat dibantu oleh orang tua/wali/guru.',
              'Pemeriksaan kesehatan secara fisik oleh sekolah/madrasah (guru dan kader kesehatan sekolah) dan petugas Puskesmas. Pemeriksaan fisik yang dilakukan oleh sekolah/madrasah antara lain: pengukuran tinggi badan, berat badan, tekanan darah (menggunakan pengukur tekanan darah digital bila tersedia), pemeriksaan ketajaman penglihatan dan pemeriksaan kebersihan diri (kuku, rambut) serta pemeriksaan kebugaran jasmani. Sedangkan pemeriksaan fisik yang dilakukan oleh Puskesmas meliputi pemeriksaan klinis yang harus dilakukan tenaga kesehatan seperti pemeriksaan gigi dan mulut, pemeriksaan telinga, denyut jantung dan pernapasan dan lain-lain.'
            ]
          }
        ]
      },
      {
        id: 'imunisasi',
        title: 'Imunisasi',
        description: 'Imunisasi adalah upaya menimbulkan/meningkatkan kekebalan seseorang secara aktif terhadap suatu penyakit sehingga bila suatu saat terpajan dengan penyakit tersebut tidak akan sakit atau hanya mengalami sakit ringan. Anak usia 0-11 bulan mendapatkan imunisasi dasar lengkap, sedangkan anak usia 18 bulan mendapatkan imunisasi lanjutan. Anak usia sekolah dasar perlu mendapatkan imunisasi lanjutan untuk mempertahankan tingkat kekebalan dan untuk memperpanjang masa perlindungan anak. Adapun imunisasi yang diberikan kepada anak usia sekolah adalah imunisasi campak rubella, difteri, tetanus dan HPV (HPV baru diberikan di beberapa provinsi dan kabupaten/kota).',
        sections: [
          { label: 'Waktu', type: 'text', content: 'Bulan Imunisasi Anak Sekolah (BIAS) diintegrasikan dengan usaha kesehatan sekolah dilaksanakan setiap tahun pada bulan Agustus dan November.' },
          { label: 'Tempat', type: 'text', content: 'BIAS dilaksanakan di sekolah/madrasah. Apabila peserta didik berhalangan hadir saat pemberian imunisasi di sekolah/madrasah, maka imunisasi dapat diberikan di Puskesmas dengan surat pengantar dari sekolah/madrasah. Pada masa pandemi, BIAS dapat dipertimbangkan dilaksanakan di sekolah/madrasah, Puskesmas atau melalui Puskesmas keliling sesuai kebijakan pemerintah daerah setempat.' },
          { label: 'Pelaksana', type: 'text', content: 'Puskesmas dibantu oleh sekolah/madrasah atau guru dan orang tua peserta didik. Petugas Puskesmas memasukkan hasil imunisasi di kohort Anak Usia Sekolah dan Remaja.' },
          {
            label: 'Kegiatan', type: 'numbered', content: [
              'Program imunisasi lanjutan ini dinamakan Bulan Imunisasi Anak Sekolah (BIAS) yang ditujukan untuk peserta didik di jenjang SD/MI.'
            ]
          },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Sekolah/madrasah menyediakan daftar absensi peserta didik dan membantu menggerakkan peserta didik mendapatkan pelayanan esensial.',
              'Puskesmas menyediakan vaksin, Auto Disable Syringe (ADS), Safety Box, Vaccine Carrier, peralatan anafilaktik, dan dokumen pencatatan pelayanan imunisasi.'
            ]
          },
          {
            label: 'Langkah-langkah', type: 'numbered', content: [
              'Puskesmas berkoordinasi dengan sekolah/madrasah di wilayah kerjasanya menyepakati pelaksanaan jadwal imunisasi di masing-masing sekolah/madrasah.',
              'Puskesmas menghitung kebutuhan dan menyiapkan kebutuhan vaksin, ADS, Safety Box, peralatan anafilaktik dan lain-lain.',
              'Sekolah/madrasah memberikan surat pemberitahuan kepada orang tua peserta didik mengenai pemberian imunisasi/BIAS.',
              'Puskesmas memberikan penyuluhan kepada guru, orang tua dan peserta didik sebelum dan sesudah pelaksanaan imunisasi.',
              'Puskesmas melaksanakan kegiatan imunisasi dibantu dengan sekolah/madrasah.'
            ]
          }
        ]
      },
      {
        id: 'pemberian-obat-cacing',
        title: 'Pemberian Obat Cacing',
        description: 'Cacingan adalah penyakit yang disebabkan oleh infeksi cacing dalam tubuh manusia yang ditularkan melalui tanah. Pemberian Obat Pencegahan Secara Massal Cacingan (POPM Cacingan) merupakan pemberian obat cacing secara serentak kepada semua penduduk sasaran di wilayah berisiko cacingan sebagai bagian dari upaya pencegahan penularan cacingan.',
        sections: [
          { label: 'Waktu', type: 'text', content: 'POPM Cacingan dilaksanakan di kelas masing-masing dua kali dalam 1 (satu) tahun untuk daerah kabupaten/kota dengan prevalensi tinggi dan satu kali dalam 1 (satu) tahun untuk daerah kabupaten/kota dengan prevalensi sedang. Pemberian obat cacing diberikan pada peserta didik tingkat PAUD (TK/RA/KB/BA/TPA/SPS) dan SD/MI. Obat cacing diberikan sejak anak umur 1 tahun lanjut sampai umur 12 tahun. Pemberian 1 kali per tahun sesuai dosis.' },
          { label: 'Pelaksana', type: 'text', content: 'Puskesmas, guru UKS/M, kader kesehatan sekolah/madrasah, peserta didik.' },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Obat cacing.',
              'Buku Rapor Kesehatanku atau form pencatatan pemberian obat cacing yang disediakan oleh Puskesmas.',
              'Buku KIA atau lembar pencatatan pemberian obat cacing yang disediakan oleh Puskesmas.'
            ]
          },
          {
            label: 'Langkah-langkah', type: 'numbered', content: [
              'Petugas Puskesmas berkoordinasi dengan kepala sekolah/madrasah dan guru untuk menjadwalkan POPM Cacingan kepada peserta didik.',
              'Pada hari pelaksanaan POPM Cacingan, guru membantu petugas Puskesmas untuk mengatur peserta didik.',
              'Petugas Puskesmas melakukan pencatatan dan pelaporan.'
            ]
          }
        ]
      },
      {
        id: 'p3k-dan-p3p',
        title: 'P3K dan P3P',
        description: 'Pemberian P3K dan P3P dilakukan sebagai penanganan awal terhadap cedera atau kejadian sakit yang terjadi di sekolah/madrasah sebelum dilakukan pemeriksaan lebih lanjut di fasilitas kesehatan apabila masalah cedera/sakit belum terselesaikan. Kegiatan ini bertujuan untuk mencegah perburukan penyakit/cedera.',
        sections: [
          { label: 'Tempat', type: 'text', content: 'Ruang UKS/M atau lokasi kondusif lainnya di sekolah/madrasah.' },
          { label: 'Pelaksana', type: 'text', content: 'Guru UKS/M dan guru lainnya yang terlatih, pelatih PMR, PMR, kader kesehatan sekolah/madrasah terlatih lainnya.' },
          {
            label: 'Kegiatan', type: 'numbered', content: [
              'P3K — cedera seperti jatuh, luka, patah tulang dan lain-lain dapat saja terjadi di sekolah/madrasah apabila peserta didik tidak berhati-hati dalam beraktivitas. Penanganan P3K yang diberikan disesuaikan dengan jenis cedera yang terjadi. Penanganan diberikan oleh petugas terlatih.',
              'P3P — kejadian sakit juga bisa terjadi di sekolah/madrasah seperti demam, diare, sakit maag, nyeri haid, pingsan, sakit kepala dan lain-lain. Penanganan segera yang diberikan berupa pengobatan sederhana untuk mengatasi gejala awal yang ringan. Setelah mendapatkan pengobatan awal, peserta didik yang sakit diminta untuk beristirahat di ruang UKS/M. Apabila sakit masih berlanjut atau jenis sakit tidak ringan maka sekolah/madrasah harus menginformasikan kondisi tersebut ke orang tua, menyarankan dan merujuk peserta didik tersebut ke Puskesmas atau fasilitas kesehatan lainnya.'
            ]
          },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Peralatan P3K di ruang UKS/M sesuai Pedoman Tim Pembina UKS/M.',
              'Obat-obatan sederhana di ruang UKS/M sesuai Pedoman Tim Pembina UKS/M.'
            ]
          },
          {
            label: 'Langkah-langkah', type: 'numbered', content: [
              'Sekolah/madrasah mengidentifikasi kebutuhan dan menyediakan sarana prasarana (peralatan dan obat-obatan sederhana) untuk P3K dan P3P, berkoordinasi dengan Puskesmas untuk melatih guru UKS/M dan kader kesehatan sekolah/madrasah, berkoordinasi dengan pelatih PMR bila memiliki kegiatan ekstrakurikuler PMR, serta menyusun jadwal piket guru UKS/M dan kader kesehatan sekolah/madrasah atau PMR.',
              'Guru UKS/M, pelatih PMR dan PMR/kader kesehatan sekolah/madrasah memberikan P3K dan P3P pada saat yang diperlukan.',
              'Guru UKS/M dan kader kesehatan melakukan pencatatan pemberian P3K dan P3P dan memantau perkembangan kondisi peserta didik yang diberikan P3K atau P3P. Apabila sakit masih berlanjut atau jenis sakit tidak ringan, maka guru UKS/M harus menginformasikan kondisi tersebut ke orang tua, menyarankan dan merujuk peserta didik tersebut ke Puskesmas atau fasilitas kesehatan lainnya.'
            ]
          }
        ]
      }
    ]
  },

  lingkungan: {
    id: 'lingkungan',
    number: 3,
    title: 'Pembinaan Lingkungan Sekolah Sehat',
    icon: 'fa-solid fa-seedling',
    color: '#059669',
    bgBadge: '#D1FAE5',
    cardColor: '#059669',
    description: 'Upaya mewujudkan lingkungan sekolah/madrasah yang bersih, sehat, aman, dan nyaman melalui sanitasi sekolah, pembinaan kantin sehat, pemanfaatan pekarangan, pemberantasan sarang nyamuk, serta penerapan kawasan tanpa rokok, NAPZA, kekerasan, dan pornografi.',
    items: [
      {
        id: 'sanitasi-sekolah',
        title: 'Sanitasi Sekolah',
        description: 'Sanitasi merupakan pengendalian semua faktor lingkungan fisik manusia yang dapat menimbulkan akibat buruk terhadap kehidupan manusia, baik fisik maupun mental (WHO). Sarana prasarana sanitasi sekolah/madrasah yang diperlukan antara lain air bersih yang cukup, jamban sehat, sarana cuci tangan dengan sabun air mengalir, pembuangan limbah cair dan tempat sampah. Sanitasi berkaitan erat dengan pelaksanaan pembiasaan hidup bersih. Komponen sanitasi sekolah meliputi: ketersediaan sarana dan prasarana sanitasi sekolah; implementasi Perilaku Hidup Bersih dan Sehat; serta manajemen sanitasi sekolah.',
        sections: [
          { label: 'Waktu', type: 'text', content: SANITASI_WAKTU },
          { label: 'Tempat', type: 'text', content: 'Seluruh lingkungan sekolah/madrasah.' },
          { label: 'Pelaksana', type: 'text', content: 'Kepala sekolah/madrasah, guru dan wali kelas, peserta didik, orang tua/wali, masyarakat sekolah/madrasah lainnya dan masyarakat sekitar sekolah/madrasah termasuk sanitarian di Puskesmas.' },
          {
            label: 'Kegiatan', type: 'numbered', content: [
              'Pelaksanaan inspeksi kesehatan lingkungan sekolah/madrasah oleh Puskesmas dan pihak sekolah/madrasah.',
              'Penilaian mandiri kesehatan lingkungan dilakukan setiap bulan oleh sekolah/madrasah.',
              'Pembersihan dan desinfeksi ruang kelas, ruang guru, laboratorium, kantin dan semua ruangan yang terdapat di sekolah/madrasah setiap hari.',
              'Pembersihan dan desinfeksi sarana yang sering tersentuh dengan tangan seperti pegangan pintu, tombol lampu, meja/kursi setiap hari.',
              'Pembersihan sarana luar kelas seperti lapangan.',
              'Pembuangan sampah ke tempat sampah tertutup dan terpilah setiap hari.',
              'Pengumpulan sampah dari berbagai lokasi tempat sampah di sekolah/madrasah ke Tempat Pembuangan Sampah (TPS) sementara setiap hari atau kurang dari setiap hari apabila sampah sudah mencapai ¾ dari isi.',
              'Kerja bakti.',
              'Pelaksanaan 3R (reuse: menggunakan kembali, reduce: berupaya mengurangi sampah, recycle: mendaur ulang).'
            ]
          },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Surat edaran/peraturan penerapan dari sekolah/madrasah.',
              'Tempat sampah tertutup dan terpilah di setiap kelas. Tiap tempat sampah dilapisi plastik.',
              'Alat-alat kebersihan: sapu, plastik.',
              'Cairan pembersih/desinfektan.',
              'Tempat pembuangan sampah sementara terbuat dari bata atau drum yang disertai tutup.',
              'Lokasi pengumpulan sampah untuk digunakan kembali/Bank Sampah.',
              'Tempat pengolahan sampah/sarana pembuatan pupuk.'
            ]
          },
          {
            label: 'Langkah-langkah', type: 'numbered', content: [
              'Sekolah/madrasah bekerjasama dengan Puskesmas dan Dinas Kebersihan/Lingkungan Hidup mengorientasikan kegiatan sanitasi sekolah/madrasah dan pengelolaan sampah, pengenalan daur ulang sampah dan pembuatan pupuk.',
              'Sekolah/madrasah menunjuk guru yang akan menjadi pembimbing dalam pengelolaan dan daur ulang sampah hingga pembuatan pupuk.',
              'Guru membuat jadwal pelaksanaan pengelolaan sampah.',
              'Kader kesehatan sekolah/madrasah pokja sanitasi dan 3R membantu pelaksanaan pengawasan sanitasi, kerja bakti dan melaksanakan 3R.'
            ]
          }
        ]
      },
      {
        id: 'pembinaan-kantin-sehat',
        title: 'Pembinaan Kantin Sehat',
        description: 'Kantin sehat sekolah adalah tempat warga satuan pendidikan termasuk peserta didik dapat membeli makanan dan minuman yang sehat, baik makanan utama yang bergizi seimbang atau makanan selingan. Makanan sehat menunjang pencapaian dan pertumbuhan peserta didik yang optimal.',
        sections: [
          { label: 'Waktu', type: 'text', content: 'Berkesinambungan sepanjang waktu.' },
          { label: 'Tempat', type: 'text', content: 'Kantin sekolah/madrasah dan pedagang kaki lima di sekitarnya.' },
          { label: 'Pelaksana', type: 'text', content: 'Kepala sekolah/madrasah, guru UKS/M, Puskesmas, pengelola kantin, kader kesehatan sekolah/madrasah.' },
          { label: 'Sasaran', type: 'text', content: 'Pengelola kantin dan pedagang kaki lima serta peserta didik.' },
          {
            label: 'Kegiatan', type: 'numbered', content: [
              'Penyuluhan higiene sanitasi pangan untuk food handler (penjamah makanan di kantin) oleh sekolah/madrasah bekerjasama dengan Puskesmas, BPOM atau lembaga lainnya.',
              'Penyuluhan makanan bergizi seimbang untuk food handler dan pengelola kantin sekolah/madrasah.',
              'Pengawasan kantin sehat dan pengisian buku rapor kantin oleh sekolah/madrasah (kepala sekolah/madrasah, guru UKS/M).',
              'Inspeksi kantin sekolah/madrasah oleh Puskesmas.',
              'Pemberian stiker kepada kantin yang memenuhi syarat.',
              'Pemberdayaan kader kesehatan sekolah/madrasah untuk melakukan kegiatan peningkatan dan pengawasan kantin sehat di sekolah/madrasah.'
            ]
          },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Buku Rapor Penilaian Mandiri Kesehatan Lingkungan, tempat pengelolaan pangan kantin/pangan jajanan, stiker, APD (celemek, tutup kepala, sarung tangan dan masker).'
            ]
          },
          {
            label: 'Langkah-langkah', type: 'numbered', content: [
              'Sekolah/madrasah bekerjasama dengan Puskesmas dan BPOM mengadakan penyuluhan tentang higiene sanitasi pangan dan makanan jajanan sehat yang bergizi dan tidak mengandung bahan dan zat berbahaya.',
              'BPOM mengambil sampel makanan yang dijual untuk diteliti apakah mengandung zat berbahaya atau tidak.',
              'Kepala sekolah/madrasah, guru dan pembina UKS/M melakukan pembinaan keamanan pangan dan pengawasan secara berkala mengenai pengelolaan makanan dan jajanan sehat pada kantin dan pangan jajanan dengan menggunakan rapor penilaian mandiri kesehatan lingkungan.',
              'Kader kesehatan sekolah/madrasah sebagai detektif kantin melaporkan kepada guru atau kepala sekolah/madrasah jika di kantin terdapat makanan atau minuman yang kurang sehat (yaitu yang tinggi garam, gula dan lemak/menggunakan bahan dan zat berbahaya). Kader kesehatan sekolah/madrasah ikut menggerakkan peserta didik serta penjamah makanan untuk meningkatkan kebersihan, keamanan dan kualitas gizi dari makanan yang dijajakan di sekolah/madrasah.',
              'Pembinaan kantin juga dilakukan terhadap kemasan atau tempat penyajian makan yang digunakan yaitu dengan mengurangi penggunaan kemasan plastik dan styrofoam dan apabila memungkinkan dengan menggunakan alat makan yang bisa dicuci.',
              'Pembinaan penjamah makanan dilakukan terhadap tampilan fisik penjamah apakah bersih dan sehat, penggunaan celemek, alas kaki dan tutup kepala, perilaku cuci tangan sebelum menyentuh makanan, cara mengambil makanan dan perilaku lainnya seperti meludah, mengupil, menggaruk saat menyiapkan makanan.',
              'Pembinaan sarana dan prasarana dilakukan terhadap peralatan makan dan masak misalnya apakah peralatan berfungsi dengan baik, bagaimana proses pencucian peralatannya, bahan baku peralatan yang digunakan serta penggunaan bahan kimia pada kemasan makanan yang digunakan.',
              'Sekolah/madrasah bekerjasama dengan Dinkes atau BPOM untuk memberikan stiker kantin sehat setelah memenuhi daftar tilik.',
              'Pembinaan juga dilakukan pada pedagang kaki lima dan warung-warung di sekitar sekolah/madrasah.'
            ]
          }
        ]
      },
      {
        id: 'pemanfaatan-pekarangan-sekolah',
        title: 'Pemanfaatan Pekarangan Sekolah/Madrasah',
        description: 'Pekarangan sekolah/madrasah adalah tanah atau halaman di sekitar sekolah/madrasah yang dapat dimanfaatkan untuk menanam berbagai macam tanaman.',
        sections: [
          { label: 'Waktu', type: 'text', content: 'Berkesinambungan, dapat diintegrasikan dengan mata pelajaran terkait seperti IPA atau Pramuka.' },
          { label: 'Tempat', type: 'text', content: 'Pekarangan/halaman sekolah/madrasah.' },
          { label: 'Pelaksana', type: 'text', content: 'Seluruh warga sekolah/madrasah dan dinas terkait.' },
          { label: 'Sasaran', type: 'text', content: 'Peserta didik, guru dan warga sekolah/madrasah.' },
          {
            label: 'Kegiatan', type: 'numbered', content: [
              'Memanfaatkan halaman atau lahan sekolah/madrasah yang masih kosong untuk ditanami tanaman obat, sayuran, buah serta tanaman pengusir nyamuk.',
              'Memberi label pada tanaman sebagai sarana edukasi (nama latin tanaman, nama Indonesia, nama daerah serta manfaatnya).'
            ]
          },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Bibit sayur, bibit buah, pupuk, alat berkebun.',
              'Aneka sayuran: sayuran daun (bayam, kangkung, sawi, dan lain-lain), sayuran buah (cabai rawit, cabai keriting, tomat, terong, dan lain-lain), sayuran umbi (bawang merah, bawang putih, kentang, dan lain-lain) atau disesuaikan dengan kearifan lokal masing-masing.',
              'Tanaman obat: jenis temu-temuan/empon-empon (jahe, kunyit, kencur, temulawak, dan lain-lain), jenis daun (kelor, katuk, kumis kucing, lidah buaya, meniran, pegagan, seledri, dan lain-lain), jenis biji (jintan hitam, dan lain-lain), jenis buah (jeruk nipis, lemon, jambu biji, dan lain-lain), jenis batang (serai dapur, dan lain-lain), serta tanaman obat pengusir nyamuk (lavender, zodiac, marigold, serai wangi, kecombrang, rosemary, geranium, dan lain-lain) — disesuaikan dengan kearifan lokal masing-masing daerah.',
              'Kompos dan/atau pupuk organik.'
            ]
          },
          {
            label: 'Langkah-langkah', type: 'numbered', content: [
              'Setiap peserta didik pada saat memasuki tahun ajaran baru diwajibkan membawa satu bibit tanaman sayuran dan/atau tanaman obat kemudian ditanam di taman/kebun sekolah/madrasah. Penanaman tanaman juga bisa dilakukan dengan memanfaatkan botol/kaleng plastik sebagai wadah tanam terutama untuk sekolah/madrasah dengan lahan yang terbatas. Bila sekolah/madrasah memiliki sarana pengairan/dekat dari sumber air tawar, peserta didik diwajibkan untuk membawa benih ikan tawar yang akan dibudidayakan di empang/kolam/embung yang dimiliki oleh sekolah/madrasah.',
              'Setiap kelas memiliki kewajiban untuk membentuk taman kelas.',
              'Perawatan budidaya di taman/kebun/kolam dilakukan oleh peserta didik secara bergilir setiap minggunya, antara lain menyiram tanaman setiap hari, memberi pupuk atau kompos pada tanaman, dan memberi pakan bagi budidaya ikan tawar.',
              'Guru UKS/M melakukan pembinaan kepada kader kesehatan Pokja Toga sedikitnya 1 kali seminggu.',
              'Sekolah/madrasah dapat melakukan kemitraan dengan KLHK untuk pemanfaatan pekarangan sekolah/madrasah.'
            ]
          }
        ]
      },
      {
        id: 'pemberantasan-sarang-nyamuk',
        title: 'Pemberantasan Sarang Nyamuk',
        description: 'Pemberantasan sarang nyamuk (PSN) adalah tindakan pemberantasan sarang nyamuk melalui kegiatan menutup, menguras dan memanfaatkan barang bekas yang masih bernilai (yang dikenal dengan istilah 3M).',
        sections: [
          { label: 'Waktu', type: 'text', content: 'PSN di lingkungan sekolah/madrasah dilaksanakan minimal 1 kali dalam seminggu.' },
          { label: 'Pelaksana', type: 'text', content: 'Anak sekolah/madrasah, dipantau oleh Jumantik.' },
          { label: 'Sasaran', type: 'text', content: 'Tempat perkembangbiakan nyamuk.' },
          {
            label: 'Kegiatan', type: 'numbered', content: [
              'Kegiatan PSN anak sekolah/madrasah meliputi pengamatan jentik dan kegiatan 3M (menutup, menguras, memanfaatkan barang-barang bekas yang masih bernilai ekonomis) serta mencegah gigitan nyamuk. PSN 3M Plus merupakan kegiatan terencana secara terus-menerus dan berkesinambungan. Gerakan ini merupakan kegiatan yang paling efektif untuk mencegah terjadinya penyakit DBD serta mewujudkan kebersihan lingkungan dan perilaku hidup sehat.'
            ]
          },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Senter, meja jalan, formulir, gayung.'
            ]
          },
          {
            label: 'Langkah-langkah', type: 'numbered', content: [
              'Guru PJ mengajarkan kegiatan PSN 3M Plus kepada peserta didik.',
              'Setiap minggu peserta didik melakukan pemantauan jentik dan PSN 3M Plus di sekolah/madrasah dan rumah/tempat tinggalnya masing-masing serta melakukan pencatatan hari dan tanggal pelaksanaan, jenis tempat perkembangbiakan nyamuk, ada tidaknya jentik dan kegiatan PSN 3M Plus yang dilakukan.',
              'Pengamatan jentik dilakukan dengan mencari semua tempat perkembangbiakan jentik nyamuk di area sekolah/madrasah; setelah didapatkan, dilakukan penyenteran untuk mengetahui ada tidaknya jentik dan mencatat ada tidaknya jentik serta jenis kontainer yang diperiksa pada formulir pencatatan. Formulir pencatatan dilaporkan setiap minggu ke guru Penanggung Jawab (PJ) dan diparaf. Guru PJ memeriksa formulir tersebut; apabila dalam laporan ditemukan jentik maka guru wajib memberikan arahan kepada peserta didik.'
            ]
          }
        ]
      },
      {
        id: 'kawasan-tanpa-rokok-napza-kekerasan-pornografi',
        title: 'Kawasan Tanpa Rokok, NAPZA, Kekerasan dan Pornografi',
        description: 'Kawasan Tanpa Rokok di lingkungan sekolah adalah ruangan atau area yang dinyatakan dilarang untuk kegiatan merokok atau kegiatan memproduksi, menjual, dan/atau mempromosikan rokok. Kawasan Tanpa NAPZA adalah kawasan yang terbebas dari kegiatan penyalahgunaan NAPZA baik membawa, menggunakan atau mengedarkan NAPZA. Kawasan Tanpa Kekerasan adalah kawasan yang terbebas dari permasalahan kekerasan baik fisik, psikis maupun sosial termasuk masalah perundungan di sekolah. Kawasan Tanpa Pornografi dilakukan dengan memastikan tidak ada peserta didik maupun warga sekolah/madrasah lainnya yang menyediakan, mengakses, menyimpan dan mengedarkan gambar, sketsa, ilustrasi, foto, tulisan, suara, bunyi, gambar bergerak, animasi, kartun, percakapan, gerak tubuh, atau bentuk pesan lainnya melalui berbagai bentuk media komunikasi dan/atau pertunjukan di muka umum, yang memuat kecabulan atau eksploitasi seksual yang melanggar norma kesusilaan dalam masyarakat.',
        sections: [
          { label: 'Waktu', type: 'text', content: 'Penerapan KTR, KTN, KTK dan KTP di lingkungan sekolah/madrasah dilaksanakan sepanjang waktu.' },
          { label: 'Tempat', type: 'text', content: 'Seluruh lingkungan sekolah/madrasah.' },
          { label: 'Pelaksana', type: 'text', content: 'Kepala sekolah/madrasah, guru dan wali kelas, orang tua, peserta didik dan kader kesehatan sekolah/madrasah.' },
          { label: 'Sasaran', type: 'text', content: 'Kepala sekolah/madrasah, guru, tenaga kependidikan, peserta didik dan pihak lain di dalam lingkungan sekolah/madrasah serta satgas KTR, KTN, KTK dan KTP.' },
          {
            label: 'Kegiatan', type: 'numbered', content: [
              'Memasukkan larangan terkait rokok dan NAPZA dalam aturan tata tertib sekolah/madrasah.',
              'Melakukan penolakan terhadap penawaran iklan, promosi, pemberian sponsor, dan/atau kerja sama dalam bentuk apapun yang dilakukan oleh perusahaan rokok dan/atau organisasi yang menggunakan merek dagang, logo, semboyan, dan/atau warna yang dapat diasosiasikan sebagai ciri khas perusahaan rokok, untuk keperluan kegiatan kurikuler atau ekstrakurikuler yang dilaksanakan di dalam dan di luar sekolah/madrasah.',
              'Memberlakukan larangan pemasangan papan iklan, reklame, penyebaran pamflet, dan bentuk-bentuk iklan lainnya dari perusahaan atau yayasan rokok yang beredar atau dipasang di lingkungan sekolah/madrasah.',
              'Melarang penjualan rokok di kantin/warung sekolah/madrasah, koperasi atau bentuk penjualan lain di lingkungan sekolah/madrasah dan tidak ada asbak di ruang tamu atau ruang guru.',
              'Memasang tanda kawasan tanpa rokok dan NAPZA di lingkungan sekolah/madrasah.',
              'Membiasakan warga satuan pendidikan (guru, peserta didik, karyawan sekolah/madrasah lainnya termasuk satpam dan petugas kebersihan) melaksanakan senyum, sapa, salam, sopan dan santun setiap hari di dalam lingkungan sekolah/madrasah.',
              'Membiasakan membaca doa setiap mulai jam pelajaran sesuai dengan agama dan kepercayaannya.',
              'Mengembangkan kegiatan belajar mengajar yang aktif, interaktif, dan menyenangkan; menerapkan metode penghargaan dan hukuman (reward and punishment) yang mendidik dengan memperhatikan kesehatan fisik dan mental peserta didik; menyelenggarakan kegiatan keagamaan/ibadah; mengembangkan ekstrakurikuler yang menyenangkan seperti Pramuka dan PMR; mengembangkan kegiatan gotong royong dan setia kawan seperti piket kelas, jumat bersih, dan menengok teman yang sakit; menyelenggarakan lomba-lomba yang meningkatkan semangat, pengetahuan dan kerja sama peserta didik; memfasilitasi pelatihan bagi guru terutama guru BK untuk memberikan konseling; serta memberikan pengetahuan tambahan mengenai isu-isu kesehatan yang sedang tren misalnya perundungan, tawuran, seks berisiko dan NAPZA.',
              'Meningkatkan pengetahuan dan keterampilan peserta didik untuk menggunakan gawai dengan bijak.'
            ]
          },
          {
            label: 'Sarana', type: 'bullets', content: [
              'Surat edaran/peraturan penerapan KTR, KTN, KTK dan KTP di sekolah/madrasah serta spanduk/poster pemberitahuan penerapan KTR, KTN, KTK dan KTP di sekolah/madrasah.',
              'CCTV di tempat strategis di lingkungan sekolah.'
            ]
          },
          {
            label: 'Langkah-langkah', type: 'numbered', content: [
              'Pembuatan peraturan dari kepala sekolah/madrasah terkait penerapan KTR, KTN, KTK dan KTP di sekolah/madrasah.',
              'Sosialisasi kepada kepala sekolah/madrasah, guru, tenaga kependidikan, peserta didik, orang tua, seluruh warga sekolah/madrasah (termasuk pegawai warung/kantin di sekolah), dan RT/RW di sekitar sekolah/madrasah tentang KTR, KTN, KTK dan KTP.',
              'Pembentukan satuan tugas (satgas) termasuk peer educator di antara peserta didik yang akan melakukan pengawasan KTR, KTN, KTK dan KTP di lingkungan sekolah/madrasah.'
            ]
          }
        ]
      }
    ]
  }
};
