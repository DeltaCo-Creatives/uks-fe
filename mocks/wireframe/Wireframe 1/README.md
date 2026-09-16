# UKS Website Wireframe & Architecture Sandbox

Folder mandiri khusus untuk mockup wireframe situs UKS. Anda dapat mengeksplorasi, mengubah tata letak, dan mengembangkan modul baru secara terisolasi di dalam folder ini tanpa mempengaruhi kode aplikasi React utama di `src/`.

---

## 📁 Struktur File

* **`index.html`** — Halaman mockup wireframe lengkap dengan semua section (Navbar, Hero, Trias UKS, Program, Kabar Terbaru, Perpustakaan, Galeri, Footer).
* **`style.css`** — Desain token, grid blueprint, layout responsive, dan mode tema (Blueprint Dark / Sketch Light).
* **`wireframe.js`** — Interaksi pergantian device (Desktop, Tablet, Mobile), toggle tema, dan drawer spesifikasi.

---

## 🚀 Cara Membuka & Menjalankan

### Opsi 1: Lewat Browser Langsung (Offline / Bebas Build)
Cukup klik dua kali (double click) file **`index.html`** di Windows Explorer untuk membukanya di browser apa saja.

### Opsi 2: Lewat Vite Dev Server yang Sedang Berjalan
Buka URL berikut di browser Anda:
```
http://localhost:5173/wireframe/
```

---

## 🛠️ Fitur Interaktif pada Wireframe Ini

1. **Responsive Viewport Switcher**:
   - `🖥️ Desktop (1440px)`
   - `📱 Tablet (768px)`
   - `📲 Mobile (375px)`
   - `↔️ Fluid Full`
2. **Tema Visual Switcher**:
   - `Blueprint Mode` (Tekstur grid cyan-green)
   - `Sketch Mode` (Tampilan wireframe pensil/kertas bersih)
3. **Specs & Roadmap Drawer**:
   - Klik tombol **"Specs & Roadmap"** di pojok kanan atas untuk melihat daftar komponen, ukuran token, dan ide ekspansi selanjutnya.
