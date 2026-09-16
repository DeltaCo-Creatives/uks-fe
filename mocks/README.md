# UKS/M Mockups & Wireframes Directory (`/mocks/`)

Direktori ini mengorganisasikan seluruh mockup statis, wireframe interaktif, dan aset Figma untuk proyek portal **UKS/M (Usaha Kesehatan Sekolah / Madrasah)** Kementerian Pendidikan Dasar dan Menengah RI.

---

## 📁 Struktur Direktori

```
mocks/
├── RAWs/                     # Mockup statis multi-halaman dengan layout modern, dense & playful
│   ├── index.html            # Beranda (Hero imersif, Trias UKS, Program MBG/CKG, Buku Resmi, Berita)
│   ├── tentang-uks.html      # Deskripsi, Sasaran, Trias 3 Pilar, Struktur Organisasi & Stratifikasi
│   ├── program.html          # Makan Bergizi Gratis (MBG), Cek Kesehatan, 7KAIH, SAIH, Dokter Kecil
│   ├── mitra.html            # Panduan Kemitraan, Formulir Pendaftaran Mitra, Showcase Mitra
│   ├── informasi.html        # Berita Terkini, Praktik Baik Satuan Pendidikan, UPT Bercerita, Agenda
│   ├── publikasi.html        # Buku Panduan (PDF Asli), Infografis, Video Edukasi, SKB 4 Menteri
│   ├── kontak.html           # Kontak Sekretariat UKS Pusat, ULT Call Center 177, FAQ, Formulir Aduan
│   ├── raws.css              # Design system lengkap: tokens, squircle, floating pill navbar
│   ├── raws.js               # Mesin interaktivitas (Pencarian modal, reader modal, tab filter)
│   └── README.md             # Dokumentasi lengkap RAWs
│
├── figma/                    # Berkas siap impor langsung ke Figma
│   ├── figma_wireframe_kit.svg # Vector Artboard Desktop (1440px), Mobile (375px), & Design Tokens
│   ├── tokens.json           # Standar Tokens Studio / Figma Variables (Warna, Radius, Shadow)
│   └── README.md             # Panduan impor drag-and-drop ke Figma
│
├── wireframe/                # Wireframe interaktif & architectural layout inspector
│   ├── index.html            # Viewport switcher (Desktop 1440px, Tablet 768px, Mobile 375px)
│   ├── style.css             # Wireframe stylesheet
│   └── README.md             # Dokumentasi wireframe
│
└── claude-wireframe/         # Arsip wireframe blueprint alternatif
```

---

## 🌐 Akses Cepat di Browser

Bila Vite dev server sedang aktif (`npm run dev`), Anda dapat membuka tautan berikut:
- **RAWs Portal Beranda**: [http://localhost:5173/mocks/RAWs/index.html](http://localhost:5173/mocks/RAWs/index.html)
- **RAWs Tentang UKS**: [http://localhost:5173/mocks/RAWs/tentang-uks.html](http://localhost:5173/mocks/RAWs/tentang-uks.html)
- **RAWs Program Unggulan**: [http://localhost:5173/mocks/RAWs/program.html](http://localhost:5173/mocks/RAWs/program.html)
- **RAWs Publikasi & Buku**: [http://localhost:5173/mocks/RAWs/publikasi.html](http://localhost:5173/mocks/RAWs/publikasi.html)
- **Interactive Wireframe Viewer**: [http://localhost:5173/mocks/wireframe/index.html](http://localhost:5173/mocks/wireframe/index.html)
- **Figma SVG Kit**: Buka berkas [`mocks/figma/figma_wireframe_kit.svg`](file:///c:/Users/CalvinNurafidHerdyan/Documents/GitHub/uks-fe/mocks/figma/figma_wireframe_kit.svg) lalu tarik langsung (*drag & drop*) ke Figma.
