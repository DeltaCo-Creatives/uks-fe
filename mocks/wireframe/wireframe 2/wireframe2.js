/**
 * WIREFRAME 2 INTERACTIVE ENGINE
 * Multi-Page Omni-Navigation, Contextual Sub-Pill Scrolling, and Interactive Wireframe Components
 */

document.addEventListener('DOMContentLoaded', () => {
  initViewportControls();
  initPageNavigation();
  initFlyoutMenu();
  initPillarInteractions();
  initComponentTabs();
});

/* --- 1. Viewport Device Controls --- */
function setDevice(device) {
  document.body.className = `device-${device}`;
  
  document.querySelectorAll('.wf-tool-btn[data-device]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-device') === device);
  });

  const label = document.getElementById('viewport-label');
  if (label) {
    const dimensions = {
      desktop: '1440 × 900 (Desktop)',
      tablet: '768 × 1024 (Tablet)',
      mobile: '375 × 812 (Mobile iPhone)',
      fluid: '100% Fluid Responsive'
    };
    label.innerText = dimensions[device] || device;
  }
}

function toggleBlueprint() {
  document.body.classList.toggle('mode-blueprint');
  const btn = document.getElementById('btn-blueprint');
  if (btn) {
    const isBlueprint = document.body.classList.contains('mode-blueprint');
    btn.innerHTML = isBlueprint ? '<i class="fa-solid fa-sun"></i> Light Frame' : '<i class="fa-solid fa-draw-polygon"></i> Blueprint';
  }
}

function initViewportControls() {
  window.setDevice = setDevice;
  window.toggleBlueprint = toggleBlueprint;
}

/* --- 2. Complete Navigation Route Definitions --- */
const PAGE_ROUTES = {
  beranda: {
    title: 'Beranda',
    path: 'Beranda',
    subpills: [
      { label: 'Hero Stage', target: 'sec-home-hero' },
      { label: 'Metrik Nasional', target: 'sec-home-stats' },
      { label: 'Trias UKS Bento', target: 'sec-home-trias' },
      { label: 'Program Prioritas', target: 'sec-home-programs' },
      { label: 'Rak Buku', target: 'sec-home-books' },
      { label: 'Warta Berita', target: 'sec-home-news' },
      { label: 'Mitra Marquee', target: 'sec-home-partners' }
    ]
  },
  uksm: {
    title: 'UKS/M & Trias',
    path: 'UKS/M  ➔  Landasan, Trias & Struktur',
    subpills: [
      { label: 'Deskripsi & Sasaran', target: 'sec-uksm-sasaran' },
      { label: '3 Pilar Trias Detail', target: 'sec-uksm-trias-detail' },
      { label: 'Tim Pembina & Pelaksana', target: 'sec-uksm-struktur' },
      { label: 'Stratifikasi 4 Strata', target: 'sec-uksm-stratifikasi' },
      { label: 'Gerakan Sekolah Sehat (5 Sehat)', target: 'sec-uksm-gss' }
    ]
  },
  program: {
    title: 'Program',
    path: 'Program  ➔  Prioritas Nasional',
    subpills: [
      { label: 'Makan Bergizi Gratis (MBG)', target: 'sec-prog-mbg' },
      { label: 'Cek Kesehatan Gratis (CKG)', target: 'sec-prog-ckg' },
      { label: '7KAIH Karakter Hebat', target: 'sec-prog-7kaih' },
      { label: 'Lomba Semarak SAIH 2025', target: 'sec-prog-saih' },
      { label: 'Gala Kreasi Video', target: 'sec-prog-gala' },
      { label: 'Dokter Kecil & KKR', target: 'sec-prog-dokcil' }
    ]
  },
  mitra: {
    title: 'Kemitraan',
    path: 'Mitra  ➔  Kolaborasi Multipihak',
    subpills: [
      { label: 'Alur Kemitraan 3 Tahap', target: 'sec-mitra-alur' },
      { label: 'Formulir Pendaftaran Mitra', target: 'sec-mitra-form' },
      { label: 'Mitra Terverifikasi', target: 'sec-mitra-list' },
      { label: 'Bentuk Dukungan Sekolah', target: 'sec-mitra-support' }
    ]
  },
  informasi: {
    title: 'Informasi',
    path: 'Informasi  ➔  Warta, Praktik & Agenda',
    subpills: [
      { label: 'Warta Berita Terfilter', target: 'sec-info-berita' },
      { label: 'Praktik Baik Sekolah', target: 'sec-info-praktik' },
      { label: 'UPT BPMP Bercerita', target: 'sec-info-upt' },
      { label: 'Kalender Kegiatan 2026', target: 'sec-info-agenda' },
      { label: 'Aplikasi Ekosistem UKS', target: 'sec-info-apps' }
    ]
  },
  publikasi: {
    title: 'Publikasi',
    path: 'Publikasi  ➔  Perpustakaan & Regulasi',
    subpills: [
      { label: 'Buku Panduan (PDF)', target: 'sec-pub-books' },
      { label: 'Infografis & Poster A3', target: 'sec-pub-infografis' },
      { label: 'Video Sosialisasi & Animasi', target: 'sec-pub-video' },
      { label: 'SKB 4 Menteri & Produk Hukum', target: 'sec-pub-regulasi' }
    ]
  },
  kontak: {
    title: 'Kontak',
    path: 'Kontak  ➔  Sekretariat & Layanan Aduan',
    subpills: [
      { label: 'Alamat Kantor Senayan', target: 'sec-kontak-kantor' },
      { label: 'ULT Call Center 177', target: 'sec-kontak-helpdesk' },
      { label: 'Formulir Tiket Konsultasi', target: 'sec-kontak-form' },
      { label: 'Tanya Jawab (FAQ) BOS', target: 'sec-kontak-faq' }
    ]
  }
};

function navigateToPage(pageKey) {
  const config = PAGE_ROUTES[pageKey];
  if (!config) return;

  // 1. Update Tabs in Navbar
  document.querySelectorAll('.wf-page-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-target-view') === pageKey);
  });

  // 2. Switch Page View Panels
  document.querySelectorAll('.wf-view-panel').forEach(panel => {
    if (panel.id === `view-${pageKey}`) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  // 3. Update Breadcrumb & Sub-pills
  const breadcrumbEl = document.getElementById('route-breadcrumb');
  if (breadcrumbEl) {
    breadcrumbEl.innerHTML = `<span>PORTAL</span> <span>/</span> <span class="crumb-active">${config.path}</span>`;
  }

  const subPillsContainer = document.getElementById('route-subpills');
  if (subPillsContainer) {
    subPillsContainer.innerHTML = config.subpills.map((item, idx) => `
      <button class="wf-sub-pill ${idx === 0 ? 'active' : ''}" onclick="scrollToSubSection('${item.target}', this)">
        ${item.label}
      </button>
    `).join('');
  }

  // 4. Close Mega-Flyout if open
  document.querySelector('.wf-omni-island')?.classList.remove('flyout-open');

  // 5. Scroll device mockup to top
  const mockup = document.querySelector('.wf-device-mockup');
  if (mockup) {
    mockup.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function scrollToSubSection(targetId, pillElement) {
  document.querySelectorAll('.wf-sub-pill').forEach(p => p.classList.remove('active'));
  if (pillElement) pillElement.classList.add('active');

  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function initPageNavigation() {
  window.navigateToPage = navigateToPage;
  window.scrollToSubSection = scrollToSubSection;

  document.querySelectorAll('.wf-page-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target-view');
      navigateToPage(target);
    });
  });

  document.querySelectorAll('.wf-flyout-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-page');
      if (target) navigateToPage(target);
    });
  });

  // Default to 'beranda'
  navigateToPage('beranda');
}

/* --- 3. Flyout Menu Logic --- */
function initFlyoutMenu() {
  const island = document.querySelector('.wf-omni-island');
  const toggleBtn = document.getElementById('btn-toggle-flyout');

  if (toggleBtn && island) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      island.classList.toggle('flyout-open');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.wf-omni-island')) {
        island.classList.remove('flyout-open');
      }
    });
  }
}

/* --- 4. Trias Pillar Interactive Switcher in Beranda --- */
const PILLAR_DATA = [
  {
    title: 'Pendidikan Kesehatan',
    kicker: 'PILAR #1',
    desc: 'Literasi gizi (Isi Piringku), PHBS cuci tangan pakai sabun (CTPS), kespro & anemia remaja, pembiasaan 30 menit senam SKJ pagi, serta kader dokter kecil.',
    cards: [
      { name: 'Literasi Gizi', spec: 'Kurikulum Isi Piringku & Sayur Buah' },
      { name: 'PHBS & CTPS', spec: 'Cuci Tangan 6 Langkah Air Mengalir' },
      { name: 'Kespro & Anemia', spec: 'Tablet Tambah Darah Remaja Putri' },
      { name: 'Dokter Kecil', spec: 'Pembinaan Peer Educator Sebaya' }
    ]
  },
  {
    title: 'Pelayanan Kesehatan',
    kicker: 'PILAR #2',
    desc: 'Penjaringan fisik berkala (TB/BB, snellen chart mata, karies gigi), imunisasi rutin BIAS, suplementasi obat cacing, kesiapsiagaan ruang P3K & rujukan Puskesmas.',
    cards: [
      { name: 'Penjaringan Fisik', spec: 'Pemeriksaan TB/BB, Mata & Gigi' },
      { name: 'Imunisasi BIAS', spec: 'Campak, Rubela, DT, Td, HPV' },
      { name: 'P3K & P3P', spec: 'Obat Dasar & Pertolongan Darurat' },
      { name: 'Rujukan Faskes', spec: 'Integrasi Cepat dengan Puskesmas' }
    ]
  },
  {
    title: 'Lingkungan Sekolah Sehat',
    kicker: 'PILAR #3',
    desc: 'Sanitasi air bersih & toilet terpisah higienis, sertifikasi kantin sehat bebas 5P, kebun gizi sekolah, serta kawasan bebas rokok, napza, dan kekerasan (TPPK).',
    cards: [
      { name: 'Sanitasi Jamban', spec: 'Rasio Toilet 1:25 Putri & 1:40 Putra' },
      { name: 'Kantin Sehat', spec: 'Bebas 5P & Sertifikasi Higienis' },
      { name: 'Kebun TOGA Gizi', spec: 'Pemanfaatan Tanaman Obat & Sayur' },
      { name: 'Kawasan Bebas Rokok', spec: '100% Bebas Asap Rokok & Satgas TPPK' }
    ]
  }
];

function selectPillar(index, btnElement) {
  document.querySelectorAll('.wf-pillar-pill').forEach(b => b.classList.remove('active'));
  btnElement.classList.add('active');

  const p = PILLAR_DATA[index];
  const titleEl = document.getElementById('pillar-title');
  const descEl = document.getElementById('pillar-desc');
  const kickerEl = document.getElementById('pillar-kicker');
  const cardsContainer = document.getElementById('pillar-cards-container');

  if (titleEl) titleEl.innerText = p.title;
  if (descEl) descEl.innerText = p.desc;
  if (kickerEl) kickerEl.innerText = p.kicker;

  if (cardsContainer) {
    cardsContainer.innerHTML = p.cards.map((c, i) => `
      <div class="wf-box dashed" style="padding: 14px; min-height: 105px; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
        <span class="wf-tag-spec">KOMPONEN ${i + 1}</span>
        <div style="font-weight: 800; font-family: var(--font-mono); font-size: 13px;">[ ${c.name} ]</div>
        <div style="font-size: 10px; color: var(--wf-ink-muted); font-family: var(--font-mono);">${c.spec}</div>
        <div class="wf-line-skel w-75" style="margin-top: 6px;"></div>
      </div>
    `).join('');
  }
}

function initPillarInteractions() {
  window.selectPillar = selectPillar;
}

/* --- 5. Component Tab Switchers within UKS/M & Other Pages --- */
function switchTab(containerId, activeTabId, btn) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll('.tab-panel').forEach(p => {
    p.style.display = p.id === activeTabId ? 'block' : 'none';
  });

  const btnGroup = btn.closest('.tab-btn-group');
  if (btnGroup) {
    btnGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}

function initComponentTabs() {
  window.switchTab = switchTab;
}
