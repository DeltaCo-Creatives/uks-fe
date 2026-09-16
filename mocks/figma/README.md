# UKS/M Figma Design Kit & Wireframe Assets

Direktori ini berisi berkas dan panduan siap impor ke **Figma** untuk desain website UKS/M Kemendikdasmen RI dengan sistem desain taktil (*tactile*), padat (*dense*), dan ceria (*playful*).

---

## 📦 Berkas yang Tersedia

1. **[`figma_wireframe_kit.svg`](file:///c:/Users/CalvinNurafidHerdyan/Documents/GitHub/uks-fe/mocks/figma/figma_wireframe_kit.svg)**
   - **Format**: Scalable Vector Graphics (SVG 1.1) dengan struktur `<g>` layer rapi.
   - **Artboard 1 - Desktop Wireframe (1440 × 2360 px)**:
     - Floating pill navbar (1200px) dengan menu dropdown dan tombol cepat.
     - Immersive hero banner dengan tombol aksi bertingkat (MBG, Buku, Trias).
     - National impact metrics pill bar (15.000+ Sekolah, 50.000+ Dokter Kecil, 38 Provinsi).
     - 3-kolom kartu pilar Trias UKS (Pendidikan, Pelayanan, Lingkungan Sehat).
     - 2-kolom bento grid program prioritas nasional (Makan Bergizi Gratis & Cek Kesehatan Gratis).
     - 4-kolom showcase buku panduan resmi (Keswa, MBG, Karakter, Manajemen).
     - Dark obsidian tactile footer dengan hierarki link terstruktur.
   - **Artboard 2 - Mobile Wireframe (375 × 1960 px)**:
     - Pill navbar mobile dengan pencarian & hamburger trigger.
     - Vertikal stacked hero, metrik 2x2 grid, dan kartu Trias responsif.
   - **Artboard 3 - UI Tokens & Components Kit**:
     - Swatch palet warna resmi (`#098C4C`, `#FFD23F`, `#D2E8DA`, `#111C16`, `#F4F5F4`).
     - Skala tipografi (*Plus Jakarta Sans* untuk Heading, *Inter* untuk Body).
     - Variasi tombol (Primary, Secondary, Accent, Dark) dan badge pil status.

2. **[`tokens.json`](file:///c:/Users/CalvinNurafidHerdyan/Documents/GitHub/uks-fe/mocks/figma/tokens.json)**
   - Format standar **Tokens Studio for Figma** (Figma Tokens Plugin) dan **Figma Variables**.
   - Menyimpan nilai presisi untuk warna (`color`), lengkungan squircle (`borderRadius`), tipografi (`fontFamilies`), dan bayangan taktil (`boxShadow`).

---

## 🛠️ Cara Impor ke Figma

### Opsi 1: Drag & Drop Langsung (Paling Cepat & Mudah)
1. Buka aplikasi **Figma** (Desktop App atau di browser).
2. Buat file baru atau buka *project* yang sedang Anda kerjakan.
3. Buka File Explorer di komputer Anda, arahkan ke folder:  
   `c:\Users\CalvinNurafidHerdyan\Documents\GitHub\uks-fe\mocks\figma\`
4. Tarik (*drag*) berkas **`figma_wireframe_kit.svg`** dan lepaskan (*drop*) langsung ke dalam canvas Figma.
5. Figma secara otomatis akan membedah berkas menjadi **vektor layer asli**, *frames*, teks yang dapat disunting (*editable text*), serta bentuk kotak *squircle* tanpa pecah resolusi (*lossless*).

### Opsi 2: Impor Desain Asli Langsung dari HTML (HTML to Design Plugin)
Jika Anda menggunakan plugin Figma populer seperti **HTML to Design** atau **Builder.io**:
1. Pastikan dev server lokal aktif (`npm run dev`).
2. Di Figma, jalankan plugin **HTML to Design**.
3. Masukkan URL mockup lokal:
   ```
   http://localhost:5173/mocks/RAWs/index.html
   ```
   Atau buka halaman lainnya seperti:
   - `http://localhost:5173/mocks/RAWs/tentang-uks.html`
   - `http://localhost:5173/mocks/RAWs/program.html`
   - `http://localhost:5173/mocks/RAWs/publikasi.html`
4. Pilih resolusi *Desktop (1440px)* atau *Mobile (375px)*, lalu klik **Import**. Seluruh layout HTML & CSS akan langsung terkonversi menjadi Auto-Layout Frame di Figma.

### Opsi 3: Impor Variabel dengan Tokens Studio
1. Pasang plugin **Tokens Studio for Figma**.
2. Buka tab **Settings** di plugin > **Load from file / Load Token JSON**.
3. Pilih berkas [`tokens.json`](file:///c:/Users/CalvinNurafidHerdyan/Documents/GitHub/uks-fe/mocks/figma/tokens.json).
4. Seluruh palet warna dan radius squircle UKS akan otomatis tersinkronisasi menjadi Figma Local Variables / Styles.
