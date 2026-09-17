# `/trias-uks` — Content Specification

Scraped live from `https://portal-uks.demo.or.id/trias-uks` (the DEV/V2 build). This is the full, verbatim content behind that page, plus the underlying content model — useful as both a seed-content source and a schema reference for rebuilding this page for real.

## Important: this content is hardcoded, not CMS-driven

Checked the page's Inertia `data-page` JSON directly — the props are just the standard boilerplate (`navItems`, `appConfig`, etc.). **There is no `trias` or `content` data prop at all.** Every pillar, every sub-program, every field below is baked directly into the `TriasUKS/Index` React component as static JSX. If the real rebuild wants this page's content to be editable from the CMS, it needs a new database-backed content model — this page currently isn't an example of one to copy from, just a source of the *words* to migrate in.

## Page structure

`Trias UKS` = 3 pillar sections, each with an intro paragraph and a numbered accordion of sub-programs (single-open — clicking one closes whichever was open in that pillar):

- **(1) Pendidikan Kesehatan** — 7 sub-programs
- **(2) Pelayanan Kesehatan** — 4 sub-programs
- **(3) Pembinaan Lingkungan Sekolah Sehat** — 5 sub-programs

## Content model (per sub-program item)

Each accordion item is a `judul` (title) + `deskripsi` (intro paragraph) plus an **inconsistent subset** of these optional fields — no single item has all of them, and the set genuinely varies per item (this inconsistency is real, observed directly, not a scraping artifact):

| Field | Type | Appears in |
|---|---|---|
| `judul` | string | all 16 |
| `deskripsi` | rich text (1 paragraph) | all 16 |
| `waktu` | string | 12 of 16 |
| `tempat` | string | 11 of 16 |
| `pelaksana` | string | 15 of 16 |
| `sasaran` | string | 4 of 16 (only in later Pembinaan Lingkungan items) |
| `kegiatan` | numbered list | 11 of 16 |
| `sarana` | bulleted list | 12 of 16 |
| `langkah_langkah` | numbered list | 12 of 16 |
| `tugas` | numbered list | 1 of 16 — **replaces** kegiatan/sarana/langkah entirely (Dokter Kecil only) |
| `tautan_penting` | link list | 1 of 16 (Pendidikan Gizi only — 2 external links) |

**Implication for the data model:** don't hardcode a fixed field set per pillar. The safest schema is a title + description + an ordered list of optional labeled sections (each with a type: paragraph / bulleted list / numbered list / link list), so an editor can add or omit `Waktu`/`Tempat`/`Sasaran`/etc. per item, and so an item like Dokter Kecil (which swaps the whole back half for a `Tugas` list) doesn't need special-casing in code — it's just "this item happens to have a section called Tugas instead of Kegiatan."

---

## (1) Pendidikan Kesehatan

> Pendidikan kesehatan di sekolah/madrasah dilaksanakan melalui berbagai kegiatan yang bertujuan meningkatkan pengetahuan, keterampilan, sikap, dan perilaku hidup sehat peserta didik melalui penerapan Trias UKS/M.

### 01. Literasi Kesehatan

Literasi merupakan kemampuan mengakses, memahami melalui berbagai aktivitas membaca, melihat, menyimak, menyampaikan dan mempraktekkan. Gerakan Literasi Sekolah (GLS) merupakan kegiatan partisipatif yang melibatkan peserta didik, guru, warga sekolah/madrasah dan pemangku kepentingan lainnya. Literasi dapat menggunakan berbagai materi termasuk kesehatan. Dalam rangka meningkatkan penerapan Trias UKS/M, literasi yang diselenggarakan di sekolah/madrasah diantaranya meliputi literasi kesehatan, yang diberikan dengan cara interaktif, menarik dan partisipatif. Contoh literasi kesehatan seperti diskusi dengan guru kelas, pembuatan proyek terkait kesehatan (misal video dan poster kesehatan atau melalui permainan bertema kesehatan). Kegiatan ini dilaksanakan dengan tujuan untuk memastikan pesan kunci kesehatan dapat tersampaikan dengan baik kepada peserta didik.

**Waktu:** Literasi kesehatan dilakukan secara rutin dalam jam literasi minimal 1 minggu 1 kali selama 15 menit. Akan tetapi, waktu pelaksanaan literasi kesehatan dapat ditambah dan disesuaikan dengan kebijakan masing-masing sekolah/madrasah.

**Tempat:** Masing-masing kelas atau luar kelas.

**Pelaksana:** Guru kelas, guru mata pelajaran pada sesi literasi sekolah/madrasah, peserta didik.

**Sarana**
- Buku Rapor Kesehatanku seri Informasi Kesehatan, Buku Aksi Bergizi dan Buku/Media KIE kesehatan lainnya.
- Permainan-permainan bertema kesehatan.
- Aplikasi dan media KIE yang dikeluarkan Kementerian Kesehatan yang bisa diakses melalui www.kesga.kemkes.go.id, twitter/instagram/facebook Ditkesga, YouTube Direktorat Kesehatan Keluarga, www.kemkes.go.id, dan www.promkes.kemkes.go.id, dan lain-lain.

**Langkah-langkah**
1. Sekolah/madrasah mengalokasikan waktu dan jam literasi kesehatan minimal 1 (satu) kali seminggu.
2. Guru UKS/M membuat jadwal literasi kesehatan berdasarkan topik-topik dalam Buku Rapor Kesehatan Seri Informasi Kesehatan atau materi kesehatan lainnya yang dibutuhkan. Topik literasi kesehatan juga dapat ditambahkan dengan topik kesehatan kekinian.

### 02. Perilaku Hidup Bersih dan Sehat

Sanitasi merupakan pengendalian semua faktor lingkungan fisik manusia yang dapat menimbulkan akibat buruk terhadap kehidupan manusia, baik fisik maupun mental (WHO). Sarana prasarana sanitasi sekolah/madrasah yang diperlukan antara lain air bersih yang cukup, jamban sehat, sarana cuci tangan dengan sabun air mengalir, pembuangan limbah cair dan tempat sampah. Sanitasi berkaitan erat dengan pelaksanaan pembiasaan hidup bersih (Perilaku Hidup Bersih dan Sehat).

> ⚠️ Note: on prod, this exact same paragraph is the body of the *separate* "Sanitasi Sekolah" page (`/program/sanitasi-sekolah`), and prod's dedicated PHBS page (`/program/perilaku-hidup-bersih-dan-sehat`) wrongly shares it too — see the [Sitemap \[PROD\]](https://claude.ai/artifact/FKbNL8ygr96H3z293Uii1K) notable issues. Dev's version isn't "wrong" the same way since dev has no separate PHBS page to conflict with, but the real rebuild should write PHBS's *own* description, not reuse Sanitasi's.

**Waktu:** Pembersihan dan desinfeksi dilakukan minimal 2 kali/hari; pembuangan sampah ke tempat sampah tertutup dan terpilah serta ke TPS dilakukan setiap hari; pelaksanaan reuse atau recycle dilaksanakan 1 kali/minggu atau sesuai kebutuhan.

**Tempat:** Seluruh lingkungan sekolah/madrasah.

**Pelaksana:** Kepala sekolah/madrasah, guru dan wali kelas, peserta didik, orang tua/wali, masyarakat sekolah/madrasah lainnya dan masyarakat sekitar sekolah/madrasah termasuk sanitarian di Puskesmas.

**Kegiatan**
1. Pelaksanaan inspeksi kesehatan lingkungan sekolah/madrasah oleh Puskesmas dan pihak sekolah/madrasah.
2. Penilaian mandiri kesehatan lingkungan dilakukan setiap bulan oleh sekolah/madrasah.
3. Pembersihan dan desinfeksi ruang kelas, ruang guru, laboratorium, kantin dan semua ruangan yang terdapat di sekolah/madrasah setiap hari.
4. Pembersihan dan desinfeksi sarana yang sering tersentuh dengan tangan seperti pegangan pintu, tombol lampu, meja/kursi setiap hari.
5. Pembersihan sarana luar kelas seperti lapangan.
6. Pembuangan sampah ke tempat sampah tertutup dan terpilah setiap hari.
7. Pengumpulan sampah dari berbagai lokasi tempat sampah di sekolah/madrasah ke Tempat Pembuangan Sampah (TPS) sementara setiap hari atau kurang dari setiap hari apabila sampah sudah mencapai ¾ dari isi.
8. Kerja bakti.
9. Pelaksanaan 3R (reuse: menggunakan kembali, reduce: berupaya mengurangi sampah, recycle: mendaur ulang).

**Sarana**
- Surat edaran/peraturan penerapan dari sekolah/madrasah.
- Tempat sampah tertutup dan terpilah di setiap kelas. Tiap tempat sampah dilapisi plastik.
- Alat-alat kebersihan: sapu, plastik.
- Cairan pembersih/desinfektan.
- Tempat pembuangan sampah sementara terbuat dari bata atau drum yang disertai tutup.
- Lokasi pengumpulan sampah untuk digunakan kembali/Bank Sampah.
- Tempat pengolahan sampah/sarana pembuatan pupuk.

**Langkah-langkah**
1. Sekolah/madrasah bekerjasama dengan Puskesmas dan Dinas Kebersihan/Lingkungan Hidup mengorientasikan kegiatan sanitasi sekolah/madrasah dan pengelolaan sampah, pengenalan daur ulang sampah dan pembuatan pupuk.
2. Sekolah/madrasah menunjuk guru yang akan menjadi pembimbing dalam pengelolaan dan daur ulang sampah hingga pembuatan pupuk.
3. Guru membuat jadwal pelaksanaan pengelolaan sampah.
4. Kader kesehatan sekolah/madrasah pokja sanitasi dan 3R membantu pelaksanaan pengawasan sanitasi, kerja bakti dan melaksanakan 3R.

### 03. Pendidikan Gizi

Pendidikan gizi merupakan upaya untuk mengubah sikap dan perilaku untuk mendukung pemenuhan gizi seimbang pada peserta didik. Pemenuhan gizi seimbang sangat penting dilakukan untuk meningkatkan pencapaian pertumbuhan dan perkembangan peserta didik yang optimal sehingga mereka dapat mengikuti proses pembelajaran secara lebih baik.

**Waktu:** Kegiatan sarapan bersama dilaksanakan minimal satu kali dalam seminggu sebelum jam pelajaran pertama. Kegiatan ini dilaksanakan berurutan pada hari yang sama dengan kegiatan cuci tangan pakai sabun, pemberian tablet tambah darah bagi peserta didik puteri tingkat SMP/MTs dan SMA/SMK/MA dan sikat gigi bersama.

**Tempat:** Pendidikan gizi bisa dilaksanakan di kelas masing-masing atau di luar kelas yang kondusif untuk bisa melakukan sarapan bersama. Namun untuk pelaksanaan yang lebih tertib dan cepat (efisiensi waktu) disarankan untuk dilaksanakan di kelas masing-masing dengan pengawasan guru kelas.

**Pelaksana:** Guru kelas, kader kesehatan sekolah/madrasah, peserta didik.

**Kegiatan**
1. Pemahaman akan gizi seimbang atau Isi Piringku, termasuk contoh pada saat acara-acara yang diselenggarakan di sekolah (rapat komite sekolah, acara kesenian, ulang tahun sekolah, Hari Guru, dan sebagainya).
2. Sarapan bersama dengan gizi seimbang. Umpan balik dari guru kelas terhadap sarapan bersama yang dibawa peserta didik.
3. Konsumsi tablet tambah darah.
4. Menghindari/meminimalisir makanan siap saji, makanan/minuman yang berpemanis, pengawet, kurang serat, tinggi gula, garam, dan lemak.
5. Pendidikan gizi diberikan kepada petugas kantin, pedagang kaki lima, dan warung di sekitar sekolah untuk menghindari menjajakan makanan siap saji, makanan/minuman yang berpemanis, pengawet, kurang serat, tinggi gula, garam, dan lemak.
6. Peserta didik diminta untuk membawa bekal dari rumah sesuai dengan prinsip Isi Piringku dan membawa air putih secukupnya. Sarapan bersama dilakukan sebelum atau sekitar pukul 07.00 pagi agar dapat mendukung proses pembelajaran. Aktivitas fisik diajarkan dan diaktifkan kepada semua peserta didik untuk mencegah dan meminimalisir kelebihan berat badan termasuk obesitas.

**Sarana**
- Bekal sarapan menu bergizi seimbang yang dibawa oleh masing-masing peserta didik dan makanan atau minuman pada acara sekolah.
- Sarana cuci tangan dengan sabun dan air mengalir.
- Materi edukasi gizi seperti modul Aksi Bergizi untuk fasilitator dan Buku Saku Aksi Bergizi untuk peserta didik, atau materi edukasi gizi lainnya yang dikeluarkan Kemenkes/sumber lainnya yang diakui kebenarannya (digital/bahan cetak).

**Langkah-langkah**
1. Orang tua/wali menyiapkan bekal sarapan dengan menu gizi seimbang untuk dibawa ke sekolah/madrasah sesuai dengan jadwal yang telah ditentukan.
2. Peserta didik melaksanakan sarapan di kelas masing-masing didampingi oleh guru kelas. Pada saat pelaksanaan, guru meminta peserta didik untuk: 1) mencuci tangan dengan sabun dan air mengalir sebelum makan; 2) berdoa; 3) sarapan bersama dengan menu bergizi seimbang; 4) diakhiri minum tablet tambah darah khusus bagi remaja putri; 5) minum air putih; 6) membuang sampah pada tempatnya; 7) mencuci tangan dengan sabun dan air mengalir setelah sarapan.
3. Pada saat peserta didik melaksanakan sarapan bersama, guru memantau menu makanan yang dibawa oleh peserta didik dan memastikan menu yang dibawa adalah menu gizi seimbang sesuai dengan ketentuan "Isi Piringku".
4. Dalam memantau pelaksanaan sarapan bersama, guru kelas dapat dibantu oleh kader kesehatan sekolah/madrasah pokja gizi di masing-masing kelas.
5. Guru menyampaikan pendidikan gizi kepada peserta didik sesuai topik yang ada di buku Aksi Bergizi, buku rapor seri informasi dan buku lainnya.

**Tautan Penting**
- Pendidikan untuk Anak (Nutrition Education for Children)
- Pendidikan untuk Orang Tua (Nutrition Education for Parents)

*(This is the only item on the whole page with a "Tautan Penting" section — the two link labels shown above have no visible URL in the DEV build; if migrating, confirm what these should actually link to.)*

### 04. Pendidikan Kesehatan Reproduksi

Kesehatan reproduksi adalah keadaan sehat secara fisik, mental dan sosial secara utuh, tidak semata-mata terbebas dari penyakit atau kecacatan yang berkaitan dengan sistem, fungsi dan proses reproduksi. Pendidikan kesehatan reproduksi di sekolah/madrasah sangat penting mengingat belum tersosialisasikannya secara menyeluruh cara perawatan kebersihan organ reproduksi, perilaku seksual pranikah, kehamilan anak yang berisiko dan masalah reproduksi pada peserta didik saat ini dan setelah dewasa. Pendidikan kesehatan reproduksi bagi anak usia sekolah lebih menekankan kepada proses pertumbuhan dan perkembangan untuk mencapai dewasa sehat dan mengasah kemampuan/daya tangkal peserta didik untuk menghindarkan diri dari perilaku berisiko atau pengaruh luar yang akan berdampak negatif bagi kesehatan mereka khususnya kesehatan reproduksi. Materi yang diberikan antara lain: konsep dasar pendidikan kesehatan reproduksi; nilai, norma, batasan diri dan hubungan dengan orang lain; pertumbuhan dan perkembangan peserta didik; masalah kesehatan reproduksi peserta didik; gender dan kekerasan; teknologi, informasi dan komunikasi; serta dukungan dan layanan masalah kesehatan reproduksi di sekolah.

**Waktu:** Intrakurikuler: dilaksanakan sedikitnya 1 kali setiap minggu pada jam pelajaran Guru BK/Guru kelas atau terintegrasi pada mata pelajaran guru lainnya seperti IPA atau PJOK yang sesuai. Kokurikuler: dilaksanakan sedikitnya 1 kali setiap minggu. Ekstrakurikuler: dilaksanakan sedikitnya 1 kali setiap minggu melalui kegiatan secara interaktif/dalam bentuk permainan.

*(No "Tempat" field on this item.)*

**Pelaksana:** Guru kelas, guru mata pelajaran IPA, PJOK, guru UKS/M, peserta didik.

**Kegiatan**
1. Pemberian materi kesehatan reproduksi kepada peserta didik disesuaikan dengan usia, tingkat pendidikan dan terintegrasi dengan mata pelajaran (diberikan dalam bentuk permainan dan diskusi kasus) secara intrakurikuler, kokurikuler dan ekstrakurikuler.

**Sarana**
- Buku-buku pedoman/panduan kesehatan reproduksi/rencana aksi guru.
- Video tutorial dan media KIE lainnya.

**Langkah-langkah**
1. Intrakurikuler: pendidikan kesehatan reproduksi diberikan melalui program Aksi Guru secara berjenjang dari Direktorat GTK (Guru & Tenaga Kependidikan) Kemendikbud.
2. Kokurikuler: dilaksanakan seperti alur pemberian pelajaran melalui kokurikuler seperti biasanya.
3. Ekstrakurikuler: dilaksanakan sedikitnya 1 kali setiap minggu dengan memberikan pemahaman dan keterampilan terkait kesehatan reproduksi. Guru menyampaikan pendidikan kesehatan reproduksi melalui diskusi, bermain peran, studi kasus dan permainan.

### 05. Pendidikan Karakter

Pendidikan Keterampilan Hidup Sehat (PKHS) adalah kemampuan psikososial seseorang untuk memenuhi kebutuhan dan mengatasi masalah dalam kehidupan sehari-hari secara efektif. PKHS berperan besar dalam membantu peserta didik mengatasi masalah kesehatannya. Ada 10 keterampilan hidup sehat yang wajib diketahui dan dipraktikkan peserta didik dalam kehidupan sehari-hari, yaitu: empati; kesadaran diri; pengambilan keputusan; pemecahan masalah; berpikir kreatif; berpikir kritis; komunikasi efektif; hubungan interpersonal; mengendalikan emosi; dan mengatasi stres.

**Waktu:** Intrakurikuler: dilaksanakan sedikitnya 1 kali setiap minggu pada jam pelajaran Guru BK/Guru kelas atau terintegrasi pada mata pelajaran guru lainnya yang sesuai. Kokurikuler: dilaksanakan sedikitnya 1 kali setiap minggu. Ekstrakurikuler: dilaksanakan sedikitnya 1 kali setiap minggu melalui kegiatan secara interaktif/dalam bentuk permainan.

**Tempat:** PKHS dilaksanakan di kelas atau di luar kelas yang kondusif untuk pelaksanaan PKHS.

**Pelaksana:** Guru kelas, guru mata pelajaran, guru UKS/M, peserta didik.

**Kegiatan**
1. Pendidikan keterampilan hidup sehat dilakukan dengan cara pemberian informasi dan keterampilan melalui metode-metode partisipatif yang dapat mendorong peserta didik memahami dan mempraktikkan keterampilan hidup sehat.
2. PKHS dilaksanakan secara terintegrasi dengan mata pelajaran yang sesuai seperti pelajaran bimbingan dan konseling di tingkat SMP atau SMA atau sederajatnya, di setiap pelajaran tematik di tingkat PAUD (TK/RA/KB/BA/TPA/SPS) dan SD, atau sesi khusus guru kelas.
3. PKHS juga dapat dilakukan terintegrasi, contohnya dengan pendidikan kesehatan reproduksi, pendidikan gizi dan PHBS, dan lain-lain.

**Sarana**
- Buku pedoman PKHS Kementerian Kesehatan.
- Buku Petunjuk Pelaksanaan Pelayanan Kesehatan Jiwa di Sekolah Kementerian Kesehatan.
- Buku Pendidikan Keterampilan Hidup Kementerian Pendidikan dan Kebudayaan.
- Beberapa media KIE dan video tutorial yang digunakan untuk mendukung pembelajaran terkait konten PKHS.

*(No "Langkah-langkah" section on this item — Kegiatan and Sarana are the last two sections.)*

### 06. Pembiasaan Aktivitas Fisik

Pembiasaan aktivitas fisik merupakan pembiasaan kegiatan aktivitas fisik di sekolah untuk mendukung pencapaian pertumbuhan dan perkembangan yang optimal, menjaga kebugaran dan mencegah risiko terkena penyakit tidak menular.

**Waktu:** Peregangan pada pergantian jam pelajaran atau pada saat peserta didik sudah mulai merasa bosan dan lelah di kelas, dilakukan minimal 1 kali per hari. Optimalisasi 4L dilaksanakan minimal 1 kali per hari pada jam istirahat untuk jenjang SD/MI. Optimalisasi olahraga dilaksanakan sesuai jam mata pelajaran olahraga di sekolah/madrasah. Ekstrakurikuler wajib olahraga/beladiri/kesenian dilaksanakan minimal satu kali per minggu.

**Tempat:** Kegiatan peregangan dilaksanakan di kelas. Kegiatan optimalisasi aktivitas fisik lainnya dilaksanakan di lapangan sekolah/madrasah atau di lingkungan sekolah/madrasah yang kondusif untuk pelaksanaan aktivitas fisik.

**Pelaksana:** Peserta didik, guru kelas, guru mata pelajaran, dan guru PJOK.

**Kegiatan**
1. Gerakan peregangan pada pergantian jam pelajaran.
2. Optimalisasi 4 (empat) L (Lompat, Lari, Lempar, Loncat) pada jam istirahat khusus bagi peserta didik SD/MI.
3. Ekstrakurikuler wajib olahraga/beladiri/kesenian bagi peserta didik SMP/MTs dan SMA/SMK/MA.
4. Optimalisasi jam pelajaran olahraga.

**Sarana**
- Kreasi gerakan peregangan yang dapat dibuat oleh guru atau peserta didik misalnya gerak kapiten, gerak penguin, dan lain-lain. Kreasi gerakan peregangan dapat dilakukan dengan diiringi lagu melalui sound system atau dengan bernyanyi sendiri.
- Halaman sekolah/madrasah atau aula yang dapat digunakan sebagai tempat bermain/olahraga.
- Sarana dan prasarana olahraga.

**Langkah-langkah**
1. Guru dan peserta didik melakukan kreasi gerakan peregangan.
2. Guru meminta peserta didik untuk memimpin peregangan secara bergantian ditandai dengan bunyi bel atau lonceng menandakan waktu pelaksanaan peregangan bersama.
3. Sekolah/madrasah mendorong peserta didik untuk bermain dan berolahraga yang mengandung gerakan 4L saat jam istirahat.
4. Sekolah/madrasah menginformasikan dan mendorong ekstrakurikuler olahraga/beladiri/kesenian sebagai ekstrakurikuler wajib.
5. Guru PJOK mendorong peserta didik untuk melaksanakan olahraga secara optimal minimal pada jam pelajaran olahraga.
6. Sekolah/madrasah menyediakan sarana dan prasarana untuk mendukung peningkatan olahraga berprestasi di sekolah/madrasah.

### 07. Dokter Kecil

Dokter kecil adalah peserta didik yang memenuhi kriteria dan telah dilatih untuk ikut melaksanakan sebagian usaha pemeliharaan dan peningkatan kesehatan terhadap diri sendiri, teman, keluarga dan lingkungannya.

*(This item has no Waktu/Tempat/Pelaksana/Sasaran/Kegiatan/Sarana/Langkah — it's the shortest item on the page and swaps the whole back half for a single "Tugas" list.)*

**Tugas**
1. Menggerakkan dan membimbing teman menerapkan Trias UKS.
2. Membantu petugas kesehatan dalam P3K dan P3P.
3. Memperoleh pembekalan materi pelatihan.
4. Pengamatan kebersihan.
5. Pencatatan pelaporan.
6. Membantu guru untuk hal-hal khusus.

---

## (2) Pelayanan Kesehatan

> Upaya promotif, preventif, kuratif, dan rehabilitatif untuk menjaga kesehatan warga sekolah, meliputi penjaringan kesehatan dan pemeriksaan berkala, imunisasi, pemberian obat cacing, serta P3K dan P3P.

### 01. Penjaringan Kesehatan dan Pemeriksaan Berkala

Penjaringan kesehatan merupakan rangkaian pemeriksaan kesehatan (skrining) yang dilakukan pada seluruh peserta didik baru yaitu kelas 1 SD/MI, 7 SMP/MTs dan 10 SMA/SMK/MA (entry level), sedangkan pemeriksaan berkala adalah rangkaian pemeriksaan kesehatan (skrining) yang dilakukan pada seluruh peserta didik kelas 2-6 SD/MI, 8-9 SMP/MTs dan 11-12 SMA/SMK/MA. Pada masa pandemi, skrining sederhana dapat dilakukan langsung oleh peserta didik didampingi orang tua menggunakan formulir pemantauan kesehatan mandiri anak usia sekolah dan remaja pada masa pandemi COVID-19.

*(This is the shortest of the "normal" items — only Kegiatan, no Waktu/Tempat/Pelaksana/Sarana/Langkah.)*

**Kegiatan**
1. Pemeriksaan kesehatan menggunakan kuesioner. Kuesioner berisi pertanyaan mengenai riwayat kesehatan keluarga, diri, imunisasi dan perilaku terkait kesehatan lainnya. Kuesioner diisi oleh masing-masing peserta didik. Bagi peserta didik kelas 1-3 SD/MI atau peserta didik di SLB, pengisian kuesioner ini dapat dibantu oleh orang tua/wali/guru.
2. Pemeriksaan kesehatan secara fisik oleh sekolah/madrasah (guru dan kader kesehatan sekolah) dan petugas Puskesmas. Pemeriksaan fisik yang dilakukan oleh sekolah/madrasah antara lain: pengukuran tinggi badan, berat badan, tekanan darah (menggunakan pengukur tekanan darah digital bila tersedia), pemeriksaan ketajaman penglihatan dan pemeriksaan kebersihan diri (kuku, rambut) serta pemeriksaan kebugaran jasmani. Sedangkan pemeriksaan fisik yang dilakukan oleh Puskesmas meliputi pemeriksaan klinis yang harus dilakukan tenaga kesehatan seperti pemeriksaan gigi dan mulut, pemeriksaan telinga, denyut jantung dan pernapasan dan lain-lain.

### 02. Imunisasi

Imunisasi adalah upaya menimbulkan/meningkatkan kekebalan seseorang secara aktif terhadap suatu penyakit sehingga bila suatu saat terpajan dengan penyakit tersebut tidak akan sakit atau hanya mengalami sakit ringan. Anak usia 0-11 bulan mendapatkan imunisasi dasar lengkap, sedangkan anak usia 18 bulan mendapatkan imunisasi lanjutan. Anak usia sekolah dasar perlu mendapatkan imunisasi lanjutan untuk mempertahankan tingkat kekebalan dan untuk memperpanjang masa perlindungan anak. Adapun imunisasi yang diberikan kepada anak usia sekolah adalah imunisasi campak rubella, difteri, tetanus dan HPV (HPV baru diberikan di beberapa provinsi dan kabupaten/kota).

**Waktu:** Bulan Imunisasi Anak Sekolah (BIAS) diintegrasikan dengan usaha kesehatan sekolah dilaksanakan setiap tahun pada bulan Agustus dan November.

**Tempat:** BIAS dilaksanakan di sekolah/madrasah. Apabila peserta didik berhalangan hadir saat pemberian imunisasi di sekolah/madrasah, maka imunisasi dapat diberikan di Puskesmas dengan surat pengantar dari sekolah/madrasah. Pada masa pandemi, BIAS dapat dipertimbangkan dilaksanakan di sekolah/madrasah, Puskesmas atau melalui Puskesmas keliling sesuai kebijakan pemerintah daerah setempat.

**Pelaksana:** Puskesmas dibantu oleh sekolah/madrasah atau guru dan orang tua peserta didik. Petugas Puskesmas memasukkan hasil imunisasi di kohort Anak Usia Sekolah dan Remaja.

**Kegiatan**
1. Program imunisasi lanjutan ini dinamakan Bulan Imunisasi Anak Sekolah (BIAS) yang ditujukan untuk peserta didik di jenjang SD/MI.

**Sarana**
- Sekolah/madrasah menyediakan daftar absensi peserta didik dan membantu menggerakkan peserta didik mendapatkan pelayanan esensial.
- Puskesmas menyediakan vaksin, Auto Disable Syringe (ADS), Safety Box, Vaccine Carrier, peralatan anafilaktik, dan dokumen pencatatan pelayanan imunisasi.

**Langkah-langkah**
1. Puskesmas berkoordinasi dengan sekolah/madrasah di wilayah kerjasanya menyepakati pelaksanaan jadwal imunisasi di masing-masing sekolah/madrasah.
2. Puskesmas menghitung kebutuhan dan menyiapkan kebutuhan vaksin, ADS, Safety Box, peralatan anafilaktik dan lain-lain.
3. Sekolah/madrasah memberikan surat pemberitahuan kepada orang tua peserta didik mengenai pemberian imunisasi/BIAS.
4. Puskesmas memberikan penyuluhan kepada guru, orang tua dan peserta didik sebelum dan sesudah pelaksanaan imunisasi.
5. Puskesmas melaksanakan kegiatan imunisasi dibantu dengan sekolah/madrasah.

### 03. Pemberian Obat Cacing

Cacingan adalah penyakit yang disebabkan oleh infeksi cacing dalam tubuh manusia yang ditularkan melalui tanah. Pemberian Obat Pencegahan Secara Massal Cacingan (POPM Cacingan) merupakan pemberian obat cacing secara serentak kepada semua penduduk sasaran di wilayah berisiko cacingan sebagai bagian dari upaya pencegahan penularan cacingan.

**Waktu:** POPM Cacingan dilaksanakan di kelas masing-masing dua kali dalam 1 (satu) tahun untuk daerah kabupaten/kota dengan prevalensi tinggi dan satu kali dalam 1 (satu) tahun untuk daerah kabupaten/kota dengan prevalensi sedang. Pemberian obat cacing diberikan pada peserta didik tingkat PAUD (TK/RA/KB/BA/TPA/SPS) dan SD/MI. Obat cacing diberikan sejak anak umur 1 tahun lanjut sampai umur 12 tahun. Pemberian 1 kali per tahun sesuai dosis.

*(No "Tempat" field.)*

**Pelaksana:** Puskesmas, guru UKS/M, kader kesehatan sekolah/madrasah, peserta didik.

*(No "Kegiatan" field — goes straight from Pelaksana to Sarana.)*

**Sarana**
- Obat cacing.
- Buku Rapor Kesehatanku atau form pencatatan pemberian obat cacing yang disediakan oleh Puskesmas.
- Buku KIA atau lembar pencatatan pemberian obat cacing yang disediakan oleh Puskesmas.

**Langkah-langkah**
1. Petugas Puskesmas berkoordinasi dengan kepala sekolah/madrasah dan guru untuk menjadwalkan POPM Cacingan kepada peserta didik.
2. Pada hari pelaksanaan POPM Cacingan, guru membantu petugas Puskesmas untuk mengatur peserta didik.
3. Petugas Puskesmas melakukan pencatatan dan pelaporan.

### 04. P3K dan P3P

Pemberian P3K dan P3P dilakukan sebagai penanganan awal terhadap cedera atau kejadian sakit yang terjadi di sekolah/madrasah sebelum dilakukan pemeriksaan lebih lanjut di fasilitas kesehatan apabila masalah cedera/sakit belum terselesaikan. Kegiatan ini bertujuan untuk mencegah perburukan penyakit/cedera.

*(No "Waktu" field.)*

**Tempat:** Ruang UKS/M atau lokasi kondusif lainnya di sekolah/madrasah.

**Pelaksana:** Guru UKS/M dan guru lainnya yang terlatih, pelatih PMR, PMR, kader kesehatan sekolah/madrasah terlatih lainnya.

**Kegiatan**
1. P3K — cedera seperti jatuh, luka, patah tulang dan lain-lain dapat saja terjadi di sekolah/madrasah apabila peserta didik tidak berhati-hati dalam beraktivitas. Penanganan P3K yang diberikan disesuaikan dengan jenis cedera yang terjadi. Penanganan diberikan oleh petugas terlatih.
2. P3P — kejadian sakit juga bisa terjadi di sekolah/madrasah seperti demam, diare, sakit maag, nyeri haid, pingsan, sakit kepala dan lain-lain. Penanganan segera yang diberikan berupa pengobatan sederhana untuk mengatasi gejala awal yang ringan. Setelah mendapatkan pengobatan awal, peserta didik yang sakit diminta untuk beristirahat di ruang UKS/M. Apabila sakit masih berlanjut atau jenis sakit tidak ringan maka sekolah/madrasah harus menginformasikan kondisi tersebut ke orang tua, menyarankan dan merujuk peserta didik tersebut ke Puskesmas atau fasilitas kesehatan lainnya.

**Sarana**
- Peralatan P3K di ruang UKS/M sesuai Pedoman Tim Pembina UKS/M.
- Obat-obatan sederhana di ruang UKS/M sesuai Pedoman Tim Pembina UKS/M.

**Langkah-langkah**
1. Sekolah/madrasah mengidentifikasi kebutuhan dan menyediakan sarana prasarana (peralatan dan obat-obatan sederhana) untuk P3K dan P3P, berkoordinasi dengan Puskesmas untuk melatih guru UKS/M dan kader kesehatan sekolah/madrasah, berkoordinasi dengan pelatih PMR bila memiliki kegiatan ekstrakurikuler PMR, serta menyusun jadwal piket guru UKS/M dan kader kesehatan sekolah/madrasah atau PMR.
2. Guru UKS/M, pelatih PMR dan PMR/kader kesehatan sekolah/madrasah memberikan P3K dan P3P pada saat yang diperlukan.
3. Guru UKS/M dan kader kesehatan melakukan pencatatan pemberian P3K dan P3P dan memantau perkembangan kondisi peserta didik yang diberikan P3K atau P3P. Apabila sakit masih berlanjut atau jenis sakit tidak ringan, maka guru UKS/M harus menginformasikan kondisi tersebut ke orang tua, menyarankan dan merujuk peserta didik tersebut ke Puskesmas atau fasilitas kesehatan lainnya.

---

## (3) Pembinaan Lingkungan Sekolah Sehat

> Upaya mewujudkan lingkungan sekolah/madrasah yang bersih, sehat, aman, dan nyaman melalui sanitasi sekolah, pembinaan kantin sehat, pemanfaatan pekarangan, pemberantasan sarang nyamuk, serta penerapan kawasan tanpa rokok, NAPZA, kekerasan, dan pornografi.

### 01. Sanitasi Sekolah

Sanitasi merupakan pengendalian semua faktor lingkungan fisik manusia yang dapat menimbulkan akibat buruk terhadap kehidupan manusia, baik fisik maupun mental (WHO). Sarana prasarana sanitasi sekolah/madrasah yang diperlukan antara lain air bersih yang cukup, jamban sehat, sarana cuci tangan dengan sabun air mengalir, pembuangan limbah cair dan tempat sampah. Sanitasi berkaitan erat dengan pelaksanaan pembiasaan hidup bersih. Komponen sanitasi sekolah meliputi: ketersediaan sarana dan prasarana sanitasi sekolah; implementasi Perilaku Hidup Bersih dan Sehat; serta manajemen sanitasi sekolah.

**Waktu:** Pembersihan dan desinfeksi dilakukan minimal 2 kali/hari; pembuangan sampah ke tempat sampah tertutup dan terpilah serta ke TPS dilakukan setiap hari; pelaksanaan reuse atau recycle dilaksanakan 1 kali/minggu atau sesuai kebutuhan.

**Tempat:** Seluruh lingkungan sekolah/madrasah.

**Pelaksana:** Kepala sekolah/madrasah, guru dan wali kelas, peserta didik, orang tua/wali, masyarakat sekolah/madrasah lainnya dan masyarakat sekitar sekolah/madrasah termasuk sanitarian di Puskesmas.

**Kegiatan**
1. Pelaksanaan inspeksi kesehatan lingkungan sekolah/madrasah oleh Puskesmas dan pihak sekolah/madrasah.
2. Penilaian mandiri kesehatan lingkungan dilakukan setiap bulan oleh sekolah/madrasah.
3. Pembersihan dan desinfeksi ruang kelas, ruang guru, laboratorium, kantin dan semua ruangan yang terdapat di sekolah/madrasah setiap hari.
4. Pembersihan dan desinfeksi sarana yang sering tersentuh dengan tangan seperti pegangan pintu, tombol lampu, meja/kursi setiap hari.
5. Pembersihan sarana luar kelas seperti lapangan.
6. Pembuangan sampah ke tempat sampah tertutup dan terpilah setiap hari.
7. Pengumpulan sampah dari berbagai lokasi tempat sampah di sekolah/madrasah ke Tempat Pembuangan Sampah (TPS) sementara setiap hari atau kurang dari setiap hari apabila sampah sudah mencapai ¾ dari isi.
8. Kerja bakti.
9. Pelaksanaan 3R (reuse: menggunakan kembali, reduce: berupaya mengurangi sampah, recycle: mendaur ulang).

**Sarana**
- Surat edaran/peraturan penerapan dari sekolah/madrasah.
- Tempat sampah tertutup dan terpilah di setiap kelas. Tiap tempat sampah dilapisi plastik.
- Alat-alat kebersihan: sapu, plastik.
- Cairan pembersih/desinfektan.
- Tempat pembuangan sampah sementara terbuat dari bata atau drum yang disertai tutup.
- Lokasi pengumpulan sampah untuk digunakan kembali/Bank Sampah.
- Tempat pengolahan sampah/sarana pembuatan pupuk.

**Langkah-langkah**
1. Sekolah/madrasah bekerjasama dengan Puskesmas dan Dinas Kebersihan/Lingkungan Hidup mengorientasikan kegiatan sanitasi sekolah/madrasah dan pengelolaan sampah, pengenalan daur ulang sampah dan pembuatan pupuk.
2. Sekolah/madrasah menunjuk guru yang akan menjadi pembimbing dalam pengelolaan dan daur ulang sampah hingga pembuatan pupuk.
3. Guru membuat jadwal pelaksanaan pengelolaan sampah.
4. Kader kesehatan sekolah/madrasah pokja sanitasi dan 3R membantu pelaksanaan pengawasan sanitasi, kerja bakti dan melaksanakan 3R.

### 02. Pembinaan Kantin Sehat

Kantin sehat sekolah adalah tempat warga satuan pendidikan termasuk peserta didik dapat membeli makanan dan minuman yang sehat, baik makanan utama yang bergizi seimbang atau makanan selingan. Makanan sehat menunjang pencapaian dan pertumbuhan peserta didik yang optimal.

**Waktu:** Berkesinambungan sepanjang waktu.

**Tempat:** Kantin sekolah/madrasah dan pedagang kaki lima di sekitarnya.

**Pelaksana:** Kepala sekolah/madrasah, guru UKS/M, Puskesmas, pengelola kantin, kader kesehatan sekolah/madrasah.

**Sasaran:** Pengelola kantin dan pedagang kaki lima serta peserta didik.

**Kegiatan**
1. Penyuluhan higiene sanitasi pangan untuk food handler (penjamah makanan di kantin) oleh sekolah/madrasah bekerjasama dengan Puskesmas, BPOM atau lembaga lainnya.
2. Penyuluhan makanan bergizi seimbang untuk food handler dan pengelola kantin sekolah/madrasah.
3. Pengawasan kantin sehat dan pengisian buku rapor kantin oleh sekolah/madrasah (kepala sekolah/madrasah, guru UKS/M).
4. Inspeksi kantin sekolah/madrasah oleh Puskesmas.
5. Pemberian stiker kepada kantin yang memenuhi syarat.
6. Pemberdayaan kader kesehatan sekolah/madrasah untuk melakukan kegiatan peningkatan dan pengawasan kantin sehat di sekolah/madrasah.

**Sarana**
- Buku Rapor Penilaian Mandiri Kesehatan Lingkungan, tempat pengelolaan pangan kantin/pangan jajanan, stiker, APD (celemek, tutup kepala, sarung tangan dan masker).

**Langkah-langkah**
1. Sekolah/madrasah bekerjasama dengan Puskesmas dan BPOM mengadakan penyuluhan tentang higiene sanitasi pangan dan makanan jajanan sehat yang bergizi dan tidak mengandung bahan dan zat berbahaya.
2. BPOM mengambil sampel makanan yang dijual untuk diteliti apakah mengandung zat berbahaya atau tidak.
3. Kepala sekolah/madrasah, guru dan pembina UKS/M melakukan pembinaan keamanan pangan dan pengawasan secara berkala mengenai pengelolaan makanan dan jajanan sehat pada kantin dan pangan jajanan dengan menggunakan rapor penilaian mandiri kesehatan lingkungan.
4. Kader kesehatan sekolah/madrasah sebagai detektif kantin melaporkan kepada guru atau kepala sekolah/madrasah jika di kantin terdapat makanan atau minuman yang kurang sehat (yaitu yang tinggi garam, gula dan lemak/menggunakan bahan dan zat berbahaya). Kader kesehatan sekolah/madrasah ikut menggerakkan peserta didik serta penjamah makanan untuk meningkatkan kebersihan, keamanan dan kualitas gizi dari makanan yang dijajakan di sekolah/madrasah.
5. Pembinaan kantin juga dilakukan terhadap kemasan atau tempat penyajian makan yang digunakan yaitu dengan mengurangi penggunaan kemasan plastik dan styrofoam dan apabila memungkinkan dengan menggunakan alat makan yang bisa dicuci.
6. Pembinaan penjamah makanan dilakukan terhadap tampilan fisik penjamah apakah bersih dan sehat, penggunaan celemek, alas kaki dan tutup kepala, perilaku cuci tangan sebelum menyentuh makanan, cara mengambil makanan dan perilaku lainnya seperti meludah, mengupil, menggaruk saat menyiapkan makanan.
7. Pembinaan sarana dan prasarana dilakukan terhadap peralatan makan dan masak misalnya apakah peralatan berfungsi dengan baik, bagaimana proses pencucian peralatannya, bahan baku peralatan yang digunakan serta penggunaan bahan kimia pada kemasan makanan yang digunakan.
8. Sekolah/madrasah bekerjasama dengan Dinkes atau BPOM untuk memberikan stiker kantin sehat setelah memenuhi daftar tilik.
9. Pembinaan juga dilakukan pada pedagang kaki lima dan warung-warung di sekitar sekolah/madrasah.

### 03. Pemanfaatan Pekarangan Sekolah/Madrasah

Pekarangan sekolah/madrasah adalah tanah atau halaman di sekitar sekolah/madrasah yang dapat dimanfaatkan untuk menanam berbagai macam tanaman.

**Waktu:** Berkesinambungan, dapat diintegrasikan dengan mata pelajaran terkait seperti IPA atau Pramuka.

**Tempat:** Pekarangan/halaman sekolah/madrasah.

**Pelaksana:** Seluruh warga sekolah/madrasah dan dinas terkait.

**Sasaran:** Peserta didik, guru dan warga sekolah/madrasah.

**Kegiatan**
1. Memanfaatkan halaman atau lahan sekolah/madrasah yang masih kosong untuk ditanami tanaman obat, sayuran, buah serta tanaman pengusir nyamuk.
2. Memberi label pada tanaman sebagai sarana edukasi (nama latin tanaman, nama Indonesia, nama daerah serta manfaatnya).

**Sarana**
- Bibit sayur, bibit buah, pupuk, alat berkebun.
- Aneka sayuran: sayuran daun (bayam, kangkung, sawi, dan lain-lain), sayuran buah (cabai rawit, cabai keriting, tomat, terong, dan lain-lain), sayuran umbi (bawang merah, bawang putih, kentang, dan lain-lain) atau disesuaikan dengan kearifan lokal masing-masing.
- Tanaman obat: jenis temu-temuan/empon-empon (jahe, kunyit, kencur, temulawak, dan lain-lain), jenis daun (kelor, katuk, kumis kucing, lidah buaya, meniran, pegagan, seledri, dan lain-lain), jenis biji (jintan hitam, dan lain-lain), jenis buah (jeruk nipis, lemon, jambu biji, dan lain-lain), jenis batang (serai dapur, dan lain-lain), serta tanaman obat pengusir nyamuk (lavender, zodiac, marigold, serai wangi, kecombrang, rosemary, geranium, dan lain-lain) — disesuaikan dengan kearifan lokal masing-masing daerah.
- Kompos dan/atau pupuk organik.

**Langkah-langkah**
1. Setiap peserta didik pada saat memasuki tahun ajaran baru diwajibkan membawa satu bibit tanaman sayuran dan/atau tanaman obat kemudian ditanam di taman/kebun sekolah/madrasah. Penanaman tanaman juga bisa dilakukan dengan memanfaatkan botol/kaleng plastik sebagai wadah tanam terutama untuk sekolah/madrasah dengan lahan yang terbatas. Bila sekolah/madrasah memiliki sarana pengairan/dekat dari sumber air tawar, peserta didik diwajibkan untuk membawa benih ikan tawar yang akan dibudidayakan di empang/kolam/embung yang dimiliki oleh sekolah/madrasah.
2. Setiap kelas memiliki kewajiban untuk membentuk taman kelas.
3. Perawatan budidaya di taman/kebun/kolam dilakukan oleh peserta didik secara bergilir setiap minggunya, antara lain menyiram tanaman setiap hari, memberi pupuk atau kompos pada tanaman, dan memberi pakan bagi budidaya ikan tawar.
4. Guru UKS/M melakukan pembinaan kepada kader kesehatan Pokja Toga sedikitnya 1 kali seminggu.
5. Sekolah/madrasah dapat melakukan kemitraan dengan KLHK untuk pemanfaatan pekarangan sekolah/madrasah.

### 04. Pemberantasan Sarang Nyamuk

Pemberantasan sarang nyamuk (PSN) adalah tindakan pemberantasan sarang nyamuk melalui kegiatan menutup, menguras dan memanfaatkan barang bekas yang masih bernilai (yang dikenal dengan istilah 3M).

**Waktu:** PSN di lingkungan sekolah/madrasah dilaksanakan minimal 1 kali dalam seminggu.

*(No "Tempat" field.)*

**Pelaksana:** Anak sekolah/madrasah, dipantau oleh Jumantik.

**Sasaran:** Tempat perkembangbiakan nyamuk.

**Kegiatan**
1. Kegiatan PSN anak sekolah/madrasah meliputi pengamatan jentik dan kegiatan 3M (menutup, menguras, memanfaatkan barang-barang bekas yang masih bernilai ekonomis) serta mencegah gigitan nyamuk. PSN 3M Plus merupakan kegiatan terencana secara terus-menerus dan berkesinambungan. Gerakan ini merupakan kegiatan yang paling efektif untuk mencegah terjadinya penyakit DBD serta mewujudkan kebersihan lingkungan dan perilaku hidup sehat.

**Sarana**
- Senter, meja jalan, formulir, gayung.

**Langkah-langkah**
1. Guru PJ mengajarkan kegiatan PSN 3M Plus kepada peserta didik.
2. Setiap minggu peserta didik melakukan pemantauan jentik dan PSN 3M Plus di sekolah/madrasah dan rumah/tempat tinggalnya masing-masing serta melakukan pencatatan hari dan tanggal pelaksanaan, jenis tempat perkembangbiakan nyamuk, ada tidaknya jentik dan kegiatan PSN 3M Plus yang dilakukan.
3. Pengamatan jentik dilakukan dengan mencari semua tempat perkembangbiakan jentik nyamuk di area sekolah/madrasah; setelah didapatkan, dilakukan penyenteran untuk mengetahui ada tidaknya jentik dan mencatat ada tidaknya jentik serta jenis kontainer yang diperiksa pada formulir pencatatan. Formulir pencatatan dilaporkan setiap minggu ke guru Penanggung Jawab (PJ) dan diparaf. Guru PJ memeriksa formulir tersebut; apabila dalam laporan ditemukan jentik maka guru wajib memberikan arahan kepada peserta didik.

### 05. Kawasan Tanpa Rokok, NAPZA, Kekerasan dan Pornografi

Kawasan Tanpa Rokok di lingkungan sekolah adalah ruangan atau area yang dinyatakan dilarang untuk kegiatan merokok atau kegiatan memproduksi, menjual, dan/atau mempromosikan rokok. Kawasan Tanpa NAPZA adalah kawasan yang terbebas dari kegiatan penyalahgunaan NAPZA baik membawa, menggunakan atau mengedarkan NAPZA. Kawasan Tanpa Kekerasan adalah kawasan yang terbebas dari permasalahan kekerasan baik fisik, psikis maupun sosial termasuk masalah perundungan di sekolah. Kawasan Tanpa Pornografi dilakukan dengan memastikan tidak ada peserta didik maupun warga sekolah/madrasah lainnya yang menyediakan, mengakses, menyimpan dan mengedarkan gambar, sketsa, ilustrasi, foto, tulisan, suara, bunyi, gambar bergerak, animasi, kartun, percakapan, gerak tubuh, atau bentuk pesan lainnya melalui berbagai bentuk media komunikasi dan/atau pertunjukan di muka umum, yang memuat kecabulan atau eksploitasi seksual yang melanggar norma kesusilaan dalam masyarakat.

**Waktu:** Penerapan KTR, KTN, KTK dan KTP di lingkungan sekolah/madrasah dilaksanakan sepanjang waktu.

**Tempat:** Seluruh lingkungan sekolah/madrasah.

**Pelaksana:** Kepala sekolah/madrasah, guru dan wali kelas, orang tua, peserta didik dan kader kesehatan sekolah/madrasah.

**Sasaran:** Kepala sekolah/madrasah, guru, tenaga kependidikan, peserta didik dan pihak lain di dalam lingkungan sekolah/madrasah serta satgas KTR, KTN, KTK dan KTP.

**Kegiatan**
1. Memasukkan larangan terkait rokok dan NAPZA dalam aturan tata tertib sekolah/madrasah.
2. Melakukan penolakan terhadap penawaran iklan, promosi, pemberian sponsor, dan/atau kerja sama dalam bentuk apapun yang dilakukan oleh perusahaan rokok dan/atau organisasi yang menggunakan merek dagang, logo, semboyan, dan/atau warna yang dapat diasosiasikan sebagai ciri khas perusahaan rokok, untuk keperluan kegiatan kurikuler atau ekstrakurikuler yang dilaksanakan di dalam dan di luar sekolah/madrasah.
3. Memberlakukan larangan pemasangan papan iklan, reklame, penyebaran pamflet, dan bentuk-bentuk iklan lainnya dari perusahaan atau yayasan rokok yang beredar atau dipasang di lingkungan sekolah/madrasah.
4. Melarang penjualan rokok di kantin/warung sekolah/madrasah, koperasi atau bentuk penjualan lain di lingkungan sekolah/madrasah dan tidak ada asbak di ruang tamu atau ruang guru.
5. Memasang tanda kawasan tanpa rokok dan NAPZA di lingkungan sekolah/madrasah.
6. Membiasakan warga satuan pendidikan (guru, peserta didik, karyawan sekolah/madrasah lainnya termasuk satpam dan petugas kebersihan) melaksanakan senyum, sapa, salam, sopan dan santun setiap hari di dalam lingkungan sekolah/madrasah.
7. Membiasakan membaca doa setiap mulai jam pelajaran sesuai dengan agama dan kepercayaannya.
8. Mengembangkan kegiatan belajar mengajar yang aktif, interaktif, dan menyenangkan; menerapkan metode penghargaan dan hukuman (reward and punishment) yang mendidik dengan memperhatikan kesehatan fisik dan mental peserta didik; menyelenggarakan kegiatan keagamaan/ibadah; mengembangkan ekstrakurikuler yang menyenangkan seperti Pramuka dan PMR; mengembangkan kegiatan gotong royong dan setia kawan seperti piket kelas, jumat bersih, dan menengok teman yang sakit; menyelenggarakan lomba-lomba yang meningkatkan semangat, pengetahuan dan kerja sama peserta didik; memfasilitasi pelatihan bagi guru terutama guru BK untuk memberikan konseling; serta memberikan pengetahuan tambahan mengenai isu-isu kesehatan yang sedang tren misalnya perundungan, tawuran, seks berisiko dan NAPZA.
9. Meningkatkan pengetahuan dan keterampilan peserta didik untuk menggunakan gawai dengan bijak.

**Sarana**
- Surat edaran/peraturan penerapan KTR, KTN, KTK dan KTP di sekolah/madrasah serta spanduk/poster pemberitahuan penerapan KTR, KTN, KTK dan KTP di sekolah/madrasah.
- CCTV di tempat strategis di lingkungan sekolah.

**Langkah-langkah**
1. Pembuatan peraturan dari kepala sekolah/madrasah terkait penerapan KTR, KTN, KTK dan KTP di sekolah/madrasah.
2. Sosialisasi kepada kepala sekolah/madrasah, guru, tenaga kependidikan, peserta didik, orang tua, seluruh warga sekolah/madrasah (termasuk pegawai warung/kantin di sekolah), dan RT/RW di sekitar sekolah/madrasah tentang KTR, KTN, KTK dan KTP.
3. Pembentukan satuan tugas (satgas) termasuk peer educator di antara peserta didik yang akan melakukan pengawasan KTR, KTN, KTK dan KTP di lingkungan sekolah/madrasah.

---

## Summary for the implementation plan

- **16 sub-program items total** (7 + 4 + 5), each needs: title, description, and a flexible ordered list of optional sections (see the field table above) — not a fixed column set.
- **One item (Dokter Kecil) breaks the pattern entirely** — plan for a content type that can be "just a list," not force every item through Waktu/Tempat/Pelaksana/Sasaran/Kegiatan/Sarana/Langkah.
- **One item (Pendidikan Gizi) has external links** — the only one; if that's worth keeping, the schema needs an optional link-list section type.
- **Content overlaps with prod's per-topic pages**, but isn't copy-paste identical — e.g. dev's "02 Perilaku Hidup Bersih dan Sehat" text is the Sanitasi article (matching prod's actual bug), so **this dev copy should not be the source of truth for what PHBS's real content should say** — that still needs to be written fresh, on both sites.
