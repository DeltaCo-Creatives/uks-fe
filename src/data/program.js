/**
 * PROGRAM PRIORITAS
 * Curated 2026-09-17 from the portal pages (DEV /mbg /ckg /7kaih /asri, PROD /gala-kreasi/*)
 * and official program sites. Verbatim extracts with URLs: docs/program/*.md.
 * Decisions and link checks: docs/program-curation.md.
 * `url: null` marks a link that did not resolve when checked; the UI labels it.
 */

const SRC = {
  devMbg: { label: 'Portal UKS: halaman MBG', url: 'https://portal-uks.demo.or.id/mbg' },
  perpres83: { label: 'JDIH BPK: Perpres No. 83 Tahun 2024', url: 'https://peraturan.bpk.go.id/Details/295857/perpres-no-83-tahun-2024' },
  bgnInklusif: { label: 'BGN: siaran pers sasaran MBG', url: 'https://www.bgn.go.id/news/siaran-pers/kepala-bgn-program-mbg-bersifat-inklusif-dan-jangkau-semua-kelompok-prioritas' },
  devCkg: { label: 'Portal UKS: halaman CKG', url: 'https://portal-uks.demo.or.id/ckg' },
  kmk770: { label: 'JDIH Kemenkes: KMK HK.01.07/Menkes/770/2025', url: 'https://jdih.kemkes.go.id/documents/keputusan-menteri-kesehatan-nomor-hk0107menkes7702025' },
  dev7kaih: { label: 'Portal UKS: halaman 7KAIH', url: 'https://portal-uks.demo.or.id/7kaih' },
  cerdas: { label: 'Cerdas Berkarakter Kemendikdasmen: Gerakan 7KAIH', url: 'https://cerdasberkarakter.kemendikdasmen.go.id/gerakan7kebiasaan/' },
  devAsri: { label: 'Portal UKS: halaman ASRI', url: 'https://portal-uks.demo.or.id/asri' },
  asriWorkshop: { label: 'Kemendikdasmen: Workshop Implementasi Gerakan ASRI (Juli 2026)', url: 'https://www.kemendikdasmen.go.id/berita/15766-wujudkan-ekosistem-sekolah-luhur-kemendikdasmen-selenggarakan-workshop-implementasi-gerakan-asri' },
  asriJumatBersih: { label: 'Kemendikdasmen: siaran pers Jumat Bersih (Maret 2026)', url: 'https://www.kemendikdasmen.go.id/siaran-pers/14859-menanamkan-kepedulian-lingkungan-sejak-dini-melalui-gerakan-asri-di-sekolah' },
  saih2025: { label: 'Portal UKS: Informasi Lomba SAIH 2025', url: 'https://uks.kemendikdasmen.go.id/gala-kreasi/informasi-lomba-saih-2025' },
  gala2024: { label: 'Portal UKS: Gala Kreasi Video 2024', url: 'https://uks.kemendikdasmen.go.id/gala-kreasi/gala-kreasi-2024' },
  gala2023: { label: 'Portal UKS: Gala Kreasi Video 2023', url: 'https://uks.kemendikdasmen.go.id/gala-kreasi/gala-kreasi-2023' },
  gitaAdhiGizi2026: { label: 'Informasi dan pendaftaran Gita Adhi Gizi 2026', url: 'https://s.id/gitaadhigizi2026' }
};

// Kemendikdasmen berita 15766, used as the page intro
export const programIntro = {
  text: 'Usaha Kesehatan Sekolah (UKS) direvitalisasi menjadi "rumah" bagi program-program prioritas Kemendikdasmen di tingkat satuan pendidikan.',
  source: SRC.asriWorkshop
};

export const priorityProgramsList = [
  {
    id: 'sec-prog-mbg',
    navLabel: 'MBG',
    title: 'Makan Bergizi Gratis (MBG)',
    icon: 'fa-solid fa-utensils',
    agency: 'Badan Gizi Nasional (BGN)',
    desc: 'Program nasional pemberian makanan bergizi secara gratis dan berkelanjutan kepada kelompok sasaran prioritas di seluruh Indonesia.',
    lead: 'Makan Bergizi Gratis (MBG) adalah program nasional pemberian makanan bergizi secara gratis dan berkelanjutan kepada kelompok sasaran prioritas di seluruh Indonesia, sebagai upaya pemerintah memenuhi kebutuhan gizi masyarakat sekaligus membangun fondasi generasi yang sehat dan berkualitas.',
    facts: [
      { label: 'Dasar hukum', value: 'Peraturan Presiden Nomor 83 Tahun 2024 tentang Badan Gizi Nasional' },
      { label: 'Koordinator', value: 'Badan Gizi Nasional (BGN)' },
      { label: 'Pelaksana', value: 'Satuan Pelayanan Pemenuhan Gizi (SPPG) di berbagai daerah, mengutamakan bahan pangan lokal' }
    ],
    image: null,
    sections: [
      {
        id: 'sasaran',
        type: 'audience',
        title: 'Siapa yang menerima',
        items: [
          { title: 'Peserta didik', image: 'program/mbg-peserta-didik.jpg' },
          { title: 'Anak-anak (balita)', image: 'program/mbg-anak-anak.jpg' },
          { title: 'Ibu hamil dan menyusui', image: 'program/mbg-ibu-hamil.jpg' }
        ],
        note: 'Menurut Pasal 5 ayat 1 Perpres 83/2024, peserta didik yang dimaksud mencakup jenjang PAUD, pendidikan dasar dan menengah di lingkungan pendidikan umum, kejuruan, pendidikan keagamaan, pendidikan khusus, layanan khusus, dan pendidikan pesantren.',
        noteSource: SRC.bgnInklusif
      },
      {
        id: 'dampak',
        type: 'outcomes',
        title: 'Dampak yang dituju',
        items: [
          { title: 'Status gizi baik', text: 'Setiap individu generasi mendatang memiliki status gizi optimal sebagai modal kesehatan dan kecerdasan.' },
          { title: 'Morbiditas dan mortalitas rendah', text: 'Angka kesakitan dan kematian menurun, terutama pada ibu, bayi, dan anak-anak.' },
          { title: 'Partisipasi sekolah tinggi', text: 'Anak-anak Indonesia dapat mengakses pendidikan dengan baik, didukung gizi yang memadai.' },
          { title: 'Biaya pengobatan turun', text: 'Generasi yang sehat menekan beban biaya pengobatan bagi keluarga dan negara.' },
          { title: 'PDB jangka panjang meningkat', text: 'Generasi sehat dan produktif berkontribusi pada pertumbuhan ekonomi yang berkelanjutan.' }
        ]
      },
      {
        id: 'rujukan',
        type: 'resources',
        title: 'Rujukan untuk sekolah',
        groups: [
          {
            title: 'Panduan dan regulasi',
            items: [
              { title: 'Pedoman Pendidikan Karakter dalam Makan Bergizi Gratis', meta: 'Buku panduan, Kemendikdasmen', kind: 'drive', url: 'https://s.id/pedomanmbg' },
              { title: 'Perpres No. 83 Tahun 2024 tentang Badan Gizi Nasional', meta: 'JDIH BPK', url: SRC.perpres83.url }
            ]
          },
          {
            title: 'Situs resmi',
            items: [
              { title: 'Badan Gizi Nasional', meta: 'bgn.go.id', url: 'https://bgn.go.id' },
              { title: 'Dasbor MBG Kemendikdasmen', meta: 'mbg.pdm.kemendikdasmen.go.id', url: null }
            ]
          }
        ]
      }
    ],
    sources: [SRC.devMbg, SRC.perpres83, SRC.bgnInklusif, SRC.cerdas]
  },
  {
    id: 'sec-prog-ckg',
    navLabel: 'CKG Sekolah',
    title: 'Cek Kesehatan Gratis (CKG) Sekolah',
    icon: 'fa-solid fa-stethoscope',
    agency: 'Kementerian Kesehatan, bersama Puskesmas dan sekolah',
    desc: 'Pemeriksaan kesehatan gratis untuk seluruh peserta didik kelas 1 sampai 12 atau sederajat, termasuk pesantren, setiap tahun ajaran baru.',
    lead: 'Cek Kesehatan Gratis (CKG) Sekolah adalah pemeriksaan kesehatan gratis dari pemerintah untuk seluruh peserta didik kelas 1 sampai 12 atau sederajat (termasuk pesantren), yang dilaksanakan setiap tahun ajaran baru. Tujuannya mendeteksi masalah kesehatan sejak dini, sebelum berkembang jadi lebih serius, supaya siswa-siswi bisa belajar dan tumbuh dengan lebih optimal.',
    facts: [
      { label: 'Kapan', value: 'Setiap tahun ajaran baru, mulai bulan Juli' },
      { label: 'Di mana', value: 'Di sekolah/madrasah/pesantren, oleh petugas Puskesmas bersama guru' },
      { label: 'Izin', value: 'Atas sepengetahuan dan izin orang tua/wali' },
      { label: 'Hasil', value: 'Dapat diakses melalui SATUSEHAT Mobile atau WhatsApp' },
      { label: 'Petunjuk teknis', value: 'KMK Nomor HK.01.07/Menkes/770/2025, ditetapkan 6 Agustus 2025' }
    ],
    image: null,
    sections: [
      {
        id: 'paket',
        type: 'table',
        title: 'Paket pemeriksaan per jenjang',
        intro: 'Jenis pemeriksaan disesuaikan dengan tahap tumbuh kembang peserta didik di tiap jenjang.',
        columns: ['Jenjang', 'Cakupan pemeriksaan'],
        rows: [
          { level: 'SD/MI/Pesantren', grades: 'Kelas 1 sampai 6', text: 'Status gizi, riwayat imunisasi (kelas 1), telinga, mata, gigi, kesehatan jiwa, tekanan darah, gula darah, TBC, Hepatitis B. Ditambah merokok, kebugaran, dan kesehatan reproduksi (kelas 4 sampai 6).' },
          { level: 'SMP/MTs/Pesantren', grades: 'Kelas 7 sampai 9', text: 'Semua pemeriksaan jenjang SD, ditambah anemia (kelas 7), talasemia, Hepatitis C, dan riwayat imunisasi HPV (kelas 9 putri).' },
          { level: 'SMA/SMK/MA/Pesantren', grades: 'Kelas 10 sampai 12', text: 'Sama seperti jenjang SMP, dengan pemeriksaan anemia untuk peserta didik putri kelas 10.' }
        ],
        note: 'Khusus daerah endemis, ada pemeriksaan tambahan seperti malaria, kusta, dan skabies sesuai kondisi wilayah masing-masing.'
      },
      {
        id: 'alur',
        type: 'timeline',
        title: 'Alur pelaksanaan',
        items: [
          { when: 'H-7', title: 'Koordinasi dan sosialisasi', text: 'Puskesmas berkoordinasi dengan sekolah, menyampaikan tata cara pendaftaran dan kuesioner skrining mandiri kepada peserta didik/orang tua.' },
          { when: 'H-2', title: 'Pengecekan kesiapan', text: 'Puskesmas mengecek jumlah pendaftar dan kelengkapan kuesioner, lalu menyiapkan alat kesehatan yang dibutuhkan.' },
          { when: 'Hari H', title: 'Pemeriksaan', text: 'Peserta didik mengikuti pemeriksaan sesuai paket jenjangnya. Tenaga kesehatan mencatat hasil secara real-time melalui SATUSEHAT IndonesiaKu.' },
          { when: 'Setelahnya', title: 'Hasil dan tindak lanjut', text: 'Hasil disampaikan langsung atau dikirim via WhatsApp/SATUSEHAT Mobile, lengkap dengan edukasi dan rujukan bila diperlukan.' }
        ]
      },
      {
        id: 'rujukan',
        type: 'resources',
        title: 'Rujukan',
        groups: [
          {
            title: 'Regulasi',
            items: [
              { title: 'Petunjuk Teknis Cek Kesehatan Gratis Sekolah', meta: 'KMK HK.01.07/Menkes/770/2025, JDIH Kemenkes', url: SRC.kmk770.url }
            ]
          },
          {
            title: 'Situs resmi',
            items: [
              { title: 'Ayo Sehat Kemenkes', meta: 'Informasi dan jadwal CKG', url: 'https://ayosehat.kemkes.go.id' },
              { title: 'Pendaftaran sekolah CKG', meta: 'ckg.kemkes.go.id', url: null }
            ]
          }
        ]
      }
    ],
    sources: [SRC.devCkg, SRC.kmk770]
  },
  {
    id: 'sec-prog-7kaih',
    navLabel: '7KAIH',
    title: 'Gerakan 7 Kebiasaan Anak Indonesia Hebat (7KAIH)',
    icon: 'fa-solid fa-sun',
    agency: 'Kemendikdasmen, Pusat Penguatan Karakter',
    desc: 'Gerakan penguatan karakter yang mengajak setiap anak Indonesia membiasakan tujuh kebiasaan baik setiap hari.',
    lead: 'Gerakan Tujuh Kebiasaan Anak Indonesia Hebat (7KAIH) adalah gerakan penguatan karakter yang mengajak setiap anak Indonesia membiasakan tujuh kebiasaan baik setiap hari.',
    facts: [
      { label: 'Dasar', value: 'Surat Edaran Bersama Mendikdasmen No. 1 Tahun 2025, Mendagri No. 800.2.1/225/SJ, dan Menag No. 1 Tahun 2025 tentang Penguatan Pendidikan Karakter melalui Pembiasaan di Satuan Pendidikan' },
      { label: 'Untuk', value: 'Anak, bersama keluarga, teman, dan sekolah' }
    ],
    image: null,
    sections: [
      {
        id: 'kebiasaan',
        type: 'habits',
        title: 'Tujuh kebiasaan',
        items: [
          { title: 'Bangun Pagi', image: 'program/7kaih-bangun-pagi.png', text: 'Mengajarkan nilai disiplin, keseimbangan, produktivitas, dan menghargai waktu.', url: 'https://cerdasberkarakter.kemendikdasmen.go.id/gerakan7kebiasaan-bangun-pagi/' },
          { title: 'Beribadah', image: 'program/7kaih-beribadah.png', text: 'Menyimpan makna spiritual dan moral yang membentuk kepribadian serta hubungan harmonis dengan Tuhan, alam, dan sesama.', url: 'https://cerdasberkarakter.kemendikdasmen.go.id/gerakan7kebiasaan-beribadah/' },
          { title: 'Berolahraga', image: 'program/7kaih-berolah-raga.png', text: 'Menjaga kesehatan fisik sekaligus membangun disiplin, keseimbangan, dan ketahanan mental.', url: 'https://cerdasberkarakter.kemendikdasmen.go.id/gerakan7kebiasaan-berolahraga' },
          { title: 'Makan Sehat dan Bergizi', image: 'program/7kaih-makan-sehat-bergizi.png', text: 'Memenuhi kebutuhan nutrisi tubuh dengan prinsip gizi seimbang.', url: 'https://cerdasberkarakter.kemendikdasmen.go.id/gerakan7kebiasaan-makan-sehat-dan-bergizi' },
          { title: 'Gemar Belajar', image: 'program/7kaih-gemar-belajar.png', text: 'Mengajak setiap anak untuk terus tumbuh dalam pemahaman, karakter, dan kearifan.', url: 'https://cerdasberkarakter.kemendikdasmen.go.id/gerakan7kebiasaan-gemar-belajar/' },
          { title: 'Bermasyarakat', image: 'program/7kaih-bermasyarakat.png', text: 'Mendorong setiap anak hidup bersama secara harmonis dan berkontribusi terhadap kesejahteraan bersama.', url: 'https://cerdasberkarakter.kemendikdasmen.go.id/gerakan7kebiasaan-bermasyarakat/' },
          { title: 'Tidur Cepat', image: 'program/7kaih-tidur-cepat.png', text: 'Berdampak pada kesehatan fisik, kesejahteraan mental, serta kehidupan spiritual dan sosial.', url: 'https://cerdasberkarakter.kemendikdasmen.go.id/gerakan7kebiasaan-tidur-cepat/' }
        ]
      },
      {
        id: 'urgensi',
        type: 'contrast',
        title: 'Mengapa gerakan ini ada',
        problem: {
          title: 'Tantangan',
          items: ['Perkembangan teknologi', 'Generasi instan', 'Penurunan karakter peserta didik', 'Kejahatan/kekerasan dalam dunia pendidikan', 'Menurunnya pemahaman terhadap budaya lokal', 'Problematika kesehatan fisik dan psikis: judi online, obesitas, adiktif gawai, kesehatan mental, pornografi, narkoba']
        },
        answer: {
          title: 'Yang ingin dibentuk',
          items: ['Sehat fisik, mental, dan spiritual', 'Cerdas dan kreatif', 'Peduli dan bertanggung jawab sosial']
        },
        outcome: 'Generasi Emas Indonesia Berkarakter'
      },
      {
        id: 'panduan',
        type: 'resources',
        title: 'Buku panduan',
        groups: [
          {
            title: 'Kiat Jitu 7KAIH untuk guru',
            variants: [
              { label: 'PAUD', kind: 'drive', url: 'https://s.id/kiatjitu7kaih-gurupaud' },
              { label: 'SD', kind: 'drive', url: 'https://s.id/kiatjitu7kaih-gurusd' },
              { label: 'SMP', kind: 'drive', url: 'https://s.id/kiatjitu7kaih-gurusmp' },
              { label: 'SMA', kind: 'drive', url: 'https://s.id/kiatjitu7kaih-gurusma' }
            ]
          },
          {
            title: 'Kiat Jitu 7KAIH untuk orang tua',
            variants: [
              { label: 'PAUD', kind: 'drive', url: 'https://s.id/kiatjitu7kaih-ortupaud' },
              { label: 'SD', kind: 'drive', url: 'https://s.id/kiatjitu7kaih-ortusd' },
              { label: 'SMP', kind: 'drive', url: 'https://s.id/kiatjitu7kaih-ortusmp' },
              { label: 'SMA', kind: 'drive', url: 'https://s.id/kiatjitu7kaih-ortusma' }
            ]
          },
          {
            title: 'Lainnya',
            items: [
              { title: 'Modul Penguatan 7KAIH dalam Kepramukaan', meta: 'Kemendikdasmen', kind: 'drive', url: 'https://s.id/modul7kaih-kepramukaan' },
              { title: 'Laman resmi Gerakan 7KAIH', meta: 'cerdasberkarakter.kemendikdasmen.go.id', url: SRC.cerdas.url },
              { title: 'Surat Edaran Bersama No. 1 Tahun 2025', meta: 'JDIH Kemendikdasmen', url: null }
            ]
          }
        ]
      }
    ],
    sources: [SRC.dev7kaih, SRC.cerdas]
  },
  {
    id: 'sec-prog-asri',
    navLabel: 'Sekolah ASRI',
    title: 'Gerakan Sekolah ASRI',
    icon: 'fa-solid fa-leaf',
    agency: 'Kemendikdasmen',
    desc: 'Gerakan Aman, Sehat, Resik, dan Indah yang mengajak seluruh warga sekolah menciptakan lingkungan belajar yang nyaman, bersih, hijau, dan aman.',
    lead: 'Gerakan Sekolah ASRI (Aman, Sehat, Resik, dan Indah) mengajak seluruh warga sekolah, yaitu murid, guru, tenaga kependidikan, hingga orang tua, untuk bersama-sama menciptakan lingkungan belajar yang nyaman, bersih, hijau, dan aman. Gerakan ini merupakan bagian dari pembinaan UKS/M.',
    facts: [
      { label: 'Digagas', value: 'Presiden Prabowo Subianto, pada Rapat Koordinasi Nasional Pemerintah Pusat dan Daerah Tahun 2026' },
      { label: 'Acuan', value: 'Empat pilar selaras dengan Permendikdasmen Nomor 6 Tahun 2026' },
      { label: 'Di sekolah', value: 'Terintegrasi dengan Trias UKS: pendidikan kesehatan, pelayanan kesehatan, pembinaan lingkungan sekolah sehat' }
    ],
    image: {
      src: 'program/asri-jumat-bersih.jpg',
      alt: 'Dua murid SD tersenyum di dekat wastafel cuci tangan di halaman sekolah',
      caption: 'Jumat Bersih di SD Negeri 01 Cibadak, Kabupaten Sukabumi, 6 Maret 2026.',
      credit: SRC.asriJumatBersih,
      width: 1200,
      height: 799
    },
    sections: [
      {
        id: 'pilar',
        type: 'pillars',
        title: 'Empat pilar ASRI',
        items: [
          { letter: 'A', title: 'Aman', subtitle: 'Budaya perlindungan menyeluruh', text: 'Jaminan kebebasan beribadah, infrastruktur fisik yang ramah disabilitas dan tanggap bencana, lingkungan bebas perundungan dan kekerasan, serta keadaban digital untuk melindungi murid dari ancaman siber dan judi online.' },
          { letter: 'S', title: 'Sehat', subtitle: 'Pendidikan dan pelayanan kesehatan terpadu', text: 'Pelayanan promotif-preventif melalui integrasi Makan Bergizi Gratis sebagai laboratorium gizi nyata, pemeriksaan kesehatan berkala, intervensi spesifik anemia (Aksi Bergizi), serta penegakan Kawasan Tanpa Rokok.' },
          { letter: 'R', title: 'Resik', subtitle: 'Pembinaan lingkungan fisik dan sanitasi', text: 'Manajemen air dan sanitasi yang ramah disabilitas, pengelolaan sampah terintegrasi berbasis prinsip 3R/7R, komposting, dan bank sampah sekolah.' },
          { letter: 'I', title: 'Indah', subtitle: 'Estetika lingkungan berkelanjutan', text: 'Penghijauan terencana lewat taman TOGA, program "Pohon Asuh" (Satu Siswa Satu Tanaman), tata letak kelas yang dinamis, serta budaya antre dan tertib.' }
        ],
        source: SRC.asriWorkshop
      },
      {
        id: 'contoh',
        type: 'example',
        title: 'Contoh di sekolah: Jumat Bersih',
        text: 'Kegiatan Jumat Bersih adalah bagian dari implementasi Gerakan ASRI. Siswa tidak hanya diajak menjaga kebersihan lingkungan sekolah, tetapi juga dilatih untuk bertanggung jawab terhadap lingkungan sekitar. Pembiasaan ini merupakan bagian penting dari upaya membangun karakter peserta didik.',
        source: SRC.asriJumatBersih,
        related: { label: 'Lihat Pembinaan Lingkungan Sekolah Sehat di Trias UKS/M', view: 'uksm-trias', section: 'sec-trias-lingkungan' }
      }
    ],
    sources: [SRC.devAsri, SRC.asriWorkshop, SRC.asriJumatBersih]
  },
  {
    id: 'sec-prog-prestasi',
    navLabel: 'Prestasi',
    title: 'Prestasi UKS/M',
    icon: 'fa-solid fa-trophy',
    agency: 'Ditjen PAUD, Pendidikan Dasar, dan Pendidikan Menengah, bersama BBPMP dan BPMP',
    desc: 'Kompetisi yang dijalankan lewat UKS/M untuk peserta didik, satuan pendidikan, pemerintah daerah, dan UPT, beserta pengumuman dan pemenangnya.',
    lead: 'Empat kompetisi yang dijalankan lewat UKS/M: Gita Adhi Gizi 2026 yang pendaftarannya masih dibuka, Semarak Anak Indonesia Hebat 2025, serta Gala Kreasi Video Gerakan Sekolah Sehat edisi 2024 dan 2023. Masing-masing memuat mekanisme lomba, pengumuman pemenang, dan daftar pemenangnya sejauh sudah diterbitkan.',
    facts: [
      { label: 'Dasar', value: 'Tindak lanjut Surat Edaran Bersama No. 1 Tahun 2025 tentang Penguatan Pendidikan Karakter melalui Pembiasaan di Satuan Pendidikan' },
      { label: 'Informasi daerah', value: 'BBPMP/BPMP di provinsi masing-masing' }
    ],
    image: {
      src: 'program/saih-2025-poster.jpg',
      alt: 'Poster Semarak Anak Indonesia Hebat dalam rangka Hari Pendidikan Nasional 2025 berisi lima lomba dan batas akhir 25 April 2025',
      caption: 'Poster resmi SAIH 2025.',
      credit: SRC.saih2025,
      width: 720,
      height: 1280
    },
    sections: [
      {
        id: 'kompetisi',
        type: 'prestasi',
        title: 'Kompetisi',
        items: [
          {
            id: 'gita-adhi-gizi-2026',
            year: '2026',
            title: 'Gita Adhi Gizi 2026: Lomba Edukasi Gizi',
            status: 'Pendaftaran dibuka 21 September sampai 20 Oktober 2026',
            faces: {
              mekanisme: {
                lead: 'Gita Adhi Gizi 2026 adalah Gerakan Integrasi Tata Kelola dan Apresiasi Edukasi Gizi, dengan Lomba Video Edukasi Gizi sebagai kegiatan utamanya. Berbeda dari lomba lain di halaman ini, pesertanya bukan satuan pendidikan, melainkan pemerintah daerah (provinsi, kabupaten, kota) serta UPT BBPMP dan BPMP. Temanya: Menguatkan Edukasi Gizi melalui Tata Kelola, Kolaborasi, dan Praktik Baik untuk Generasi Sehat.',
                flyers: {
                  caption: 'Dua halaman flyer resmi. Buka untuk ukuran penuh.',
                  credit: SRC.gitaAdhiGizi2026,
                  items: [
                    {
                      src: 'program/gita-adhi-gizi-2026-1.webp',
                      alt: 'Flyer Gita Adhi Gizi 2026 Lomba Edukasi Gizi: tema, peserta dari pemerintah daerah dan UPT BBPMP/BPMP, karya berupa video edukasi gizi, apresiasi untuk praktik baik tata kelola, dan kode QR pendaftaran ke s.id/gitaadhigizi2026.',
                      width: 1600,
                      height: 2000
                    },
                    {
                      src: 'program/gita-adhi-gizi-2026-2.webp',
                      alt: 'Flyer kategori Lomba Video Edukasi Gizi: Rumpun A untuk pemerintah daerah dan Rumpun B untuk UPT, masing-masing dengan dua tema, disertai linimasa dari kick-off 15 September 2026 sampai acara puncak apresiasi November 2026 dan dua nomor narahubung.',
                      width: 1600,
                      height: 2000
                    }
                  ]
                },
                facts: [
                  { label: 'Peserta', value: 'Pemerintah daerah (provinsi, kabupaten, kota) dan UPT BBPMP/BPMP' },
                  { label: 'Karya', value: 'Video edukasi gizi yang informatif, inspiratif, dan kreatif' },
                  { label: 'Apresiasi', value: 'Untuk praktik baik tata kelola dan edukasi gizi' },
                  { label: 'Tema Rumpun A', value: 'Inovasi tata kelola pembiayaan dan infrastruktur edukasi gizi, serta sinergi lintas sektor dan pemberdayaan catur pusat pendidikan' },
                  { label: 'Tema Rumpun B', value: 'Inovasi revitalisasi UKS dan TP-UKS, serta pendampingan teknis berkelanjutan edukasi gizi' },
                  { label: 'Linimasa', value: 'Kick-off dan sosialisasi 15 September 2026. Pendaftaran dan pengunggahan karya 21 September sampai 20 Oktober 2026. Verifikasi administrasi, seleksi, dan kurasi Oktober 2026. Penilaian substantif oleh Dewan Juri, rapat pleno penetapan pemenang, dan acara puncak apresiasi pada November 2026.' },
                  { label: 'Narahubung', value: 'Admin 1: 082278307443. Admin 2: 081573161981' }
                ],
                competitions: {
                  open: true,
                  note: 'Pendaftaran dan pengunggahan karya dibuka 21 September sampai 20 Oktober 2026, lewat formulir yang berbeda untuk tiap rumpun.',
                  items: [
                    { level: 'Rumpun A', title: 'Pendaftaran dan unggah karya Dinas Pendidikan', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfJmt1p1n4tZFRmR98zy-kUazpcLVKGQ7305h9ODbiBvehUlQ/viewform' },
                    { level: 'Rumpun B', title: 'Pendaftaran dan unggah video edukasi UPT BBPMP dan BPMP', url: 'https://forms.gle/CV5NAV4csdcFWg3z7' }
                  ],
                  guide: { title: 'Informasi lengkap dan pendaftaran', url: 'https://s.id/gitaadhigizi2026' }
                },
                downloads: {
                  groups: [
                    {
                      title: 'Unduh',
                      items: [
                        { title: 'Panduan Gita Adhi Gizi', kind: 'slides', url: 'https://docs.google.com/presentation/d/12hPWeqi9O3IgyejBFWQfkKmVOp7Ga1fjrLm4IwPF8qg/edit' },
                        { title: 'Surat Pernyataan Keaslian Karya, Etika, dan Izin Penggunaan Video Edukasi Gizi', kind: 'doc', url: 'https://docs.google.com/document/d/1KpT5YBMPalPDdLvQkNMP283cTXcGcZOT/edit' }
                      ]
                    }
                  ]
                }
              },
              pengumuman: {
                note: 'Pemenang dijadwalkan ditetapkan lewat rapat pleno pada November 2026, jadi belum ada pengumuman yang bisa ditampilkan. Dicek terakhir pada 22 September 2026.'
              },
              showcase: null
            }
          },
          {
            id: 'saih-2025',
            year: '2025',
            title: 'Semarak Anak Indonesia Hebat (SAIH) 2025',
            status: 'Pendaftaran ditutup 25 April 2025',
            faces: {
              mekanisme: {
                lead: 'Semarak Anak Indonesia Hebat (SAIH) 2025 diselenggarakan dalam rangka Hari Pendidikan Nasional 2025, sebagai bagian dari implementasi Gerakan 7 Kebiasaan Anak Indonesia Hebat. Sasarannya peserta didik semua jenjang (PAUD, SD, SMP, dan SMA) di seluruh Indonesia.',
                competitions: {
                  note: 'Batas akhir pendaftaran dan pengiriman materi: 25 April 2025 pukul 23.59 WIB. Pendaftaran edisi ini sudah ditutup.',
                  items: [
                    { level: 'Semua jenjang', title: 'Lomba Senam Anak Indonesia Hebat', url: 'https://s.id/InformasiLSAIH' },
                    { level: 'PAUD', title: 'Lomba Video Cerita Anak', url: null },
                    { level: 'SD', title: 'Lomba Potret Cerita', url: null },
                    { level: 'SMP', title: 'Lomba Video Cerita Pendek', url: 'https://s.id/ReelsvideoPendek7KAIHDitSMP_' },
                    { level: 'SMA', title: 'Lomba Video Cerita Pendek/Vlog', url: 'https://s.id/cerita7KAIH' }
                  ],
                  guide: { title: 'Surat edaran dan panduan lomba', url: 'https://drive.google.com/drive/u/0/folders/14aBSX1V5P9ZL1vHOEZwyao1UmUl2br_8' }
                }
              },
              pengumuman: {
                note: 'Pengumuman pemenang SAIH 2025 belum diterbitkan. Dicek terakhir pada 22 September 2026.'
              },
              showcase: null
            }
          },
          {
            id: 'gala-kreasi-2024',
            year: '2024',
            title: 'Gala Kreasi Video Gerakan Sekolah Sehat 2024',
            status: 'Arsip, pemenang sudah diumumkan',
            faces: {
              mekanisme: {
                lead: 'Gala Kreasi Video Gerakan Sekolah Sehat Tahun 2024 adalah ajang lomba video praktik baik implementasi sebagian atau seluruh fokus Gerakan Sekolah Sehat (5 sehat) di seluruh jenjang satuan pendidikan, bertema "Sekolah Sehat, Generasi Hebat". Penghargaan diberikan kepada satuan pendidikan berdasarkan hasil penilaian video yang menempati peringkat 1 sampai dengan 10 terbaik untuk setiap jenjang pendidikan.',
                tujuan: [
                  'Meningkatkan motivasi satuan pendidikan dalam melaksanakan implementasi atau mengaktivasi gerakan sekolah sehat (5 sehat) di satuannya.',
                  'Memberikan apresiasi kepada satuan pendidikan yang telah dapat melaksanakan implementasi atau mengaktivasi gerakan sekolah sehat (5 sehat) dengan baik di satuannya.',
                  'Memantik dan mengoptimalkan implementasi atau aktivasi pesan gerakan sekolah sehat.',
                  'Ajang berbagi praktik baik implementasi atau aktivasi gerakan sekolah sehat (5 sehat) antar satuan pendidikan.'
                ],
                facts: [
                  { label: 'Sasaran', value: 'PAUD (TK, KB, TPA, SPS), SD, SMP, SMA, SMK, SLB, SKB, dan PKBM, negeri maupun swasta' }
                ],
                downloads: {
                  groups: [
                    {
                      title: 'Unduh',
                      items: [
                        { title: 'Buku Petunjuk Pelaksanaan', meta: 'PDF', kind: 'pdf', url: 'https://uks.kemendikdasmen.go.id//storage/manajemen_uks/files/images/uPpuXgH6FalmAGQhTHwv6TGqfQI8ZJMXxk4fhdoM.pdf' }
                      ]
                    }
                  ]
                }
              },
              pengumuman: {
                groups: [
                  {
                    title: 'Pengumuman pemenang',
                    items: [
                      { title: 'Pengumuman Pemenang', meta: 'Instagram', kind: 'web', url: 'https://www.instagram.com/ditjen.paud.dikdasmen/p/C-hCBB3yrDz/' },
                      { title: 'Daftar Pemenang per Jenjang', meta: 'Dokumen', kind: 'drive', url: 'https://drive.google.com/file/d/1ArEK0wExN4D2b1bg9yU6xi8dWugMH3g0/view' },
                      { title: 'SK Pemenang Gala Kreasi Video GSS 2024', meta: 'PDF', kind: 'pdf', url: 'https://uks.kemendikdasmen.go.id/storage/manajemen_uks/files/produk_hukum/DXRUqW5K8kiaCOCm6aW29UNVK6uvVsQ3hSflYReR.pdf' }
                    ]
                  },
                  {
                    title: 'Dokumentasi apresiasi',
                    items: [
                      { title: 'Malam Apresiasi Gala Kreasi Video GSS 2024', meta: 'Instagram', kind: 'web', url: 'https://www.instagram.com/reel/C-mkY_PSqnK/' },
                      { title: 'Puncak Acara Gala Kreasi Video GSS 2024', meta: 'Instagram', kind: 'web', url: 'https://www.instagram.com/p/C-mKw1wp_Ec/' }
                    ]
                  }
                ],
                source: 'Siaran Pers No.365/sipers/A6/VIII/2024, Biro Kerja Sama dan Hubungan Masyarakat, Sekretariat Jenderal, Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi.'
              },
              showcase: {
                competitionId: 'gala-kreasi-2024',
                note: 'Kategori pada data sumber memakai tiga sebutan sekaligus ("Terbaik", "Peringkat", "Inspiratif") dan nomornya diulang dari 1 di setiap jenjang; keduanya ditampilkan apa adanya. Hanya 11 dari 114 pemenang mencantumkan tautan YouTube, sisanya media sosial. Sejumlah baris berbagi satu tautan yang sama, dan beberapa provinsi pada data sumber tidak akurat (misalnya SDN Kanyoran 2 di Kabupaten Kediri, Jawa Timur, tercatat sebagai Kalimantan Selatan); semua tidak dikoreksi di sini.'
              }
            }
          },
          {
            id: 'gala-kreasi-2023',
            year: '2023',
            title: 'Gala Kreasi Video Gerakan Sekolah Sehat 2023',
            status: 'Arsip',
            faces: {
              mekanisme: {
                lead: 'Gala Kreasi Video Gerakan Sekolah Sehat Tahun 2023 adalah ajang lomba video praktik baik implementasi sebagian atau seluruh fokus Gerakan Sekolah Sehat (3 sehat) di seluruh jenjang satuan pendidikan, bertema "Sekolah Sehat, Generasi Hebat". Penghargaan diberikan kepada satuan pendidikan berdasarkan hasil penilaian video yang menempati peringkat 1 sampai dengan 10 terbaik untuk setiap jenjang pendidikan.',
                facts: [
                  { label: 'Sasaran', value: 'PAUD (TK, KB, TPA, SPS), SD, SMP, SMA, SMK, SLB, SKB, dan PKBM, negeri maupun swasta' }
                ],
                downloads: {
                  groups: [
                    {
                      title: 'Unduh',
                      items: [
                        { title: 'Petunjuk Pelaksanaan Gala Kreasi Video KSS 2023', meta: 'Sumber lama (ditpsd.kemdikbud.go.id) sudah tidak aktif', kind: 'pdf', url: null }
                      ]
                    }
                  ]
                }
              },
              pengumuman: null,
              showcase: null
            }
          }
        ]
      }
    ],
    sources: [SRC.gitaAdhiGizi2026, SRC.saih2025, SRC.gala2024, SRC.gala2023]
  }
];
