/**
 * WIREFRAME 3 INTERACTIVE ENGINE
 * 3-Cluster Pillar Dropdown, Dedicated UKS/M Sub-Pages & Universal Left-Edge Navigation Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initViewportControls();
  initPageNavigation();
  initClusterDropdown();
  initEdgeDrawerEngine();
  initOrganisasiTabs();
  initStrataInteractive();
  initAdvokasiFilter();
  initBookModal();
});

/* ============================================================
   1. VIEWPORT & BLUEPRINT CONTROLS
   ============================================================ */
function setDevice(device) {
  document.body.classList.remove('device-desktop', 'device-tablet', 'device-mobile', 'device-fluid');
  document.body.classList.add(`device-${device}`);

  document.querySelectorAll('.wf-tool-btn[data-device]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-device') === device);
  });

  const label = document.getElementById('viewport-label');
  if (label) {
    const dimensions = {
      desktop: '1440 × 900 (Desktop Blueprint)',
      tablet: '768 × 1024 (Tablet Wireframe)',
      mobile: '375 × 812 (Mobile Wireframe)',
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
    btn.innerHTML = isBlueprint 
      ? '<i class="fa-solid fa-sun"></i> Light Frame' 
      : '<i class="fa-solid fa-draw-polygon"></i> Blueprint Dark';
  }
}

function initViewportControls() {
  window.setDevice = setDevice;
  window.toggleBlueprint = toggleBlueprint;
}

/* ============================================================
   2. PAGE NAVIGATION & DEDICATED UKS/M SUB-PAGES
   ============================================================ */
const PAGE_CONFIGS = {
  beranda: {
    title: 'Beranda',
    path: 'PORTAL / BERANDA NASIONAL',
    parentTab: 'beranda',
    subpills: [
      { label: 'Hero Stage', target: 'sec-home-hero' },
      { label: 'Metrik Nasional', target: 'sec-home-stats' },
      { label: 'Trias UKS Bento', target: 'sec-home-trias' },
      { label: 'Fokus 5 Sehat', target: 'sec-home-gss' },
      { label: 'Warta Terkini', target: 'sec-home-news' },
      { label: 'Praktik Baik', target: 'sec-home-praktik' },
      { label: 'Rak Buku Digital', target: 'sec-home-books' },
      { label: 'Kemitraan', target: 'sec-home-partners' }
    ]
  },
  // Dedicated Page 1: Profil & Tata Kelola
  'uksm-profil': {
    title: 'Profil & Tata Kelola',
    path: 'PORTAL / UKS/M  ➔  1. PROFIL & TATA KELOLA',
    parentTab: 'uksm',
    subpills: [
      { label: 'Deskripsi Umum', target: 'sec-profil-deskripsi' },
      { label: 'Tujuan UKS', target: 'sec-profil-tujuan' },
      { label: 'Sasaran 3 Tingkat', target: 'sec-profil-sasaran' },
      { label: 'Struktur Personel', target: 'sec-profil-struktur' },
      { label: 'Stratifikasi 4 Strata', target: 'sec-profil-stratifikasi' },
      { label: 'Manajemen UKS/M', target: 'sec-profil-manajemen' }
    ]
  },
  // Dedicated Page 2: TRIAS UKS/M
  'uksm-trias': {
    title: 'TRIAS UKS/M',
    path: 'PORTAL / UKS/M  ➔  2. TRIAS UKS/M (3 PILAR · 16 INDIKATOR)',
    parentTab: 'uksm',
    subpills: [
      { label: '(1) Pendidikan Kesehatan (7 L3)', target: 'sec-trias-pendidikan' },
      { label: '(2) Pelayanan Kesehatan (4 L3)', target: 'sec-trias-pelayanan' },
      { label: '(3) Pembinaan Lingkungan (5 L3)', target: 'sec-trias-lingkungan' }
    ]
  },
  // Dedicated Page 3: Sekolah Sehat (GSS)
  'uksm-gss': {
    title: 'Sekolah Sehat (GSS)',
    path: 'PORTAL / UKS/M  ➔  3. SEKOLAH SEHAT (GSS & 5 SEHAT)',
    parentTab: 'uksm',
    subpills: [
      { label: 'Konsep GSS', target: 'sec-gss-overview' },
      { label: '5 Fokus Pembiasaan', target: 'sec-gss-5sehat' },
      { label: 'Bahan Advokasi (Unduhan)', target: 'sec-gss-advokasi' }
    ]
  },
  program: {
    title: 'Program',
    path: 'PORTAL / PROGRAM PRIORITAS',
    parentTab: 'program',
    subpills: [
      { label: '1. Makan Bergizi Gratis (MBG)', target: 'sec-prog-mbg' },
      { label: '2. Cek Kesehatan Gratis (CKG)', target: 'sec-prog-ckg' },
      { label: '3. 7KAIH Karakter Hebat', target: 'sec-prog-7kaih' },
      { label: '4. Semarak SAIH & Gala Kreasi', target: 'sec-prog-saih' },
      { label: '5. Dokter Kecil & KKR', target: 'sec-prog-dokcil' },
      { label: '6. Standar Sarpras UKS', target: 'sec-prog-sarpras' }
    ]
  },
  mitra: {
    title: 'Kemitraan',
    path: 'PORTAL / KEMITRAAN MULTIPIHAK',
    parentTab: 'mitra',
    subpills: [
      { label: 'Alur Kemitraan', target: 'sec-mitra-alur' },
      { label: 'Formulir Registrasi Mitra', target: 'sec-mitra-form' },
      { label: 'Katalog Lembaga Mitra', target: 'sec-mitra-list' }
    ]
  },
  informasi: {
    title: 'Informasi',
    path: 'PORTAL / INFORMASI & AGENDA',
    parentTab: 'informasi',
    subpills: [
      { label: 'Warta Terkini', target: 'sec-info-berita' },
      { label: 'Praktik Baik Sekolah', target: 'sec-info-praktik' },
      { label: 'Kalender Kegiatan 2026', target: 'sec-info-agenda' }
    ]
  },
  publikasi: {
    title: 'Publikasi',
    path: 'PORTAL / PUBLIKASI & REGULASI',
    parentTab: 'publikasi',
    subpills: [
      { label: 'Buku & Panduan Teknis', target: 'sec-pub-books' },
      { label: 'Infografis Edukasi', target: 'sec-pub-infografis' },
      { label: 'Video PHBS & Senam', target: 'sec-pub-video' },
      { label: 'Regulasi & SKB 4 Menteri', target: 'sec-pub-regulasi' }
    ]
  },
  kontak: {
    title: 'Kontak',
    path: 'PORTAL / KONTAK & SEKRETARIAT',
    parentTab: 'kontak',
    subpills: [
      { label: 'Alamat Sekretariat Pusat', target: 'sec-kontak-alamat' },
      { label: 'Helpdesk ULT 177', target: 'sec-kontak-helpdesk' },
      { label: 'Formulir Aduan / Tiket', target: 'sec-kontak-form' },
      { label: 'Tanya Jawab (FAQ)', target: 'sec-kontak-faq' }
    ]
  }
};

let currentActivePage = 'beranda';

function navigateToPage(pageKey, targetSectionId = null) {
  // Backwards compatibility alias for 'uksm'
  if (pageKey === 'uksm') {
    pageKey = 'uksm-profil';
  }

  const config = PAGE_CONFIGS[pageKey];
  if (!config) return;

  currentActivePage = pageKey;

  // 1. Update Tabs in Navbar
  document.querySelectorAll('.wf-page-tab').forEach(tab => {
    const tabTarget = tab.getAttribute('data-target-view');
    tab.classList.toggle('active', tabTarget === config.parentTab);
  });

  // 2. Switch Page View Panels
  document.querySelectorAll('.wf-view-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `view-${pageKey}`);
  });

  // 3. Update Sibling Subnav Pills
  document.querySelectorAll('.wf-subnav-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-subpage') === pageKey);
  });

  // 3b. Universal Left-Edge Drawer & Active Pane (Always visible across all 9 pages)
  const edgeZone = document.getElementById('unified-edge-zone');
  if (edgeZone) {
    edgeZone.classList.add('visible');

    // Switch active pane inside edge drawer
    document.querySelectorAll('.wf-edge-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `edge-pane-${pageKey}`);
    });

    // Update drawer header, icon, and badge for all 9 views
    const iconEl = document.getElementById('edge-drawer-icon');
    const titleEl = document.getElementById('edge-drawer-title');
    const badgeEl = document.getElementById('edge-drawer-badge-tag');
    const footerEl = document.getElementById('edge-drawer-footer-text');

    const DRAWER_HEADERS = {
      'beranda': {
        icon: 'fa-solid fa-house',
        color: 'var(--wf-accent)',
        title: 'BERANDA PORTAL',
        badge: 'PORTAL',
        badgeBg: 'var(--wf-surface-box)',
        badgeColor: 'var(--wf-ink-black)',
        footer: 'Ikhtisar Cepat Portal UKS/M'
      },
      'uksm-profil': {
        icon: 'fa-solid fa-landmark',
        color: 'var(--wf-accent)',
        title: 'NAVIGASI PROFIL',
        badge: 'PROFIL',
        badgeBg: '',
        badgeColor: '',
        footer: 'Struktur & Stratifikasi'
      },
      'uksm-trias': {
        icon: 'fa-solid fa-shield-heart',
        color: '#2563EB',
        title: 'NAVIGASI TRIAS',
        badge: 'TRIAS',
        badgeBg: '#DBEAFE',
        badgeColor: '#1E40AF',
        footer: '16 Indikator Terverifikasi'
      },
      'uksm-gss': {
        icon: 'fa-solid fa-apple-whole',
        color: '#D97706',
        title: 'NAVIGASI GSS',
        badge: 'GSS',
        badgeBg: '#FEF3C7',
        badgeColor: '#92400E',
        footer: '1-Page Layout + Anchors'
      },
      'program': {
        icon: 'fa-solid fa-bullhorn',
        color: 'var(--wf-accent)',
        title: 'PROGRAM PRIORITAS',
        badge: 'PROGRAM',
        badgeBg: '#DCFCE7',
        badgeColor: '#166534',
        footer: 'MBG · CKG · 7KAIH · SAIH'
      },
      'mitra': {
        icon: 'fa-solid fa-handshake-angle',
        color: '#7C3AED',
        title: 'KEMITRAAN BERSAMA',
        badge: 'MITRA',
        badgeBg: '#EDE9FE',
        badgeColor: '#5B21B6',
        footer: 'Alur Kerja Sama & Direktori'
      },
      'informasi': {
        icon: 'fa-solid fa-newspaper',
        color: '#2563EB',
        title: 'WARTA & AGENDA',
        badge: 'WARTA',
        badgeBg: '#DBEAFE',
        badgeColor: '#1E40AF',
        footer: 'Berita · Praktik · Agenda'
      },
      'publikasi': {
        icon: 'fa-solid fa-book-bookmark',
        color: 'var(--wf-accent)',
        title: 'PUSTAKA DIGITAL',
        badge: 'PUSTAKA',
        badgeBg: '#D1FAE5',
        badgeColor: '#065F46',
        footer: 'Buku · Infografis · Regulasi'
      },
      'kontak': {
        icon: 'fa-solid fa-headset',
        color: '#D97706',
        title: 'LAYANAN KONTAK',
        badge: 'KONTAK',
        badgeBg: '#FEF3C7',
        badgeColor: '#92400E',
        footer: 'Helpdesk 177 & Tiket Aduan'
      }
    };

    const dConf = DRAWER_HEADERS[pageKey] || DRAWER_HEADERS['beranda'];
    if (iconEl) {
      iconEl.className = dConf.icon;
      iconEl.style.color = dConf.color;
    }
    if (titleEl) titleEl.innerText = dConf.title;
    if (badgeEl) {
      badgeEl.innerText = dConf.badge;
      badgeEl.style.background = dConf.badgeBg;
      badgeEl.style.color = dConf.badgeColor;
    }
    if (footerEl) footerEl.innerText = dConf.footer;
  }

  // 4. Update Breadcrumb & Sub-pills
  const breadcrumbEl = document.getElementById('route-breadcrumb');
  if (breadcrumbEl) {
    breadcrumbEl.innerHTML = `<span class="crumb-active">${config.path}</span>`;
  }

  const subPillsContainer = document.getElementById('route-subpills');
  if (subPillsContainer) {
    subPillsContainer.innerHTML = config.subpills.map((item, idx) => `
      <button class="wf-sub-pill ${idx === 0 && !targetSectionId ? 'active' : ''}" 
              data-target="${item.target}" 
              onclick="scrollToSubSection('${item.target}', this)">
        ${item.label}
      </button>
    `).join('');
  }

  // 5. Close Cluster Dropdown
  closeClusterDropdown();

  // 6. Scroll to target section or top
  setTimeout(() => {
    if (targetSectionId) {
      const targetEl = document.getElementById(targetSectionId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelectorAll('.wf-sub-pill').forEach(pill => {
          pill.classList.toggle('active', pill.getAttribute('data-target') === targetSectionId);
        });
        document.querySelectorAll('.wf-edge-nav-item').forEach(item => {
          item.classList.toggle('active', item.getAttribute('data-target') === targetSectionId);
        });
        return;
      }
    }
    const stage = document.querySelector('.wf-device-mockup');
    if (stage) {
      stage.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 60);
}

function scrollToSubSection(targetId, pillElement) {
  document.querySelectorAll('.wf-sub-pill').forEach(p => p.classList.remove('active'));
  if (pillElement) pillElement.classList.add('active');

  document.querySelectorAll('.wf-edge-nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-target') === targetId);
  });

  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function initPageNavigation() {
  window.navigateToPage = navigateToPage;
  window.scrollToSubSection = scrollToSubSection;

  // Main navbar tabs
  document.querySelectorAll('.wf-page-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const target = tab.getAttribute('data-target-view');
      if (target === 'uksm') {
        e.stopPropagation();
        toggleClusterDropdown();
      } else {
        closeClusterDropdown();
        navigateToPage(target);
      }
    });
  });

  // Default to 'beranda'
  navigateToPage('beranda');
}

/* ============================================================
   3. 3-PILLAR CLUSTER DROPDOWN CONTROLLER
   ============================================================ */
function toggleClusterDropdown() {
  const island = document.querySelector('.wf-omni-island');
  if (island) {
    island.classList.toggle('mega-open');
  }
}

function closeClusterDropdown() {
  const island = document.querySelector('.wf-omni-island');
  if (island) {
    island.classList.remove('mega-open');
  }
}

function initClusterDropdown() {
  window.toggleClusterDropdown = toggleClusterDropdown;
  window.closeClusterDropdown = closeClusterDropdown;

  // Clicking cards inside 3-pillar cluster dropdown
  document.querySelectorAll('.wf-cluster-card[data-page-target]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = card.getAttribute('data-page-target');
      navigateToPage(targetPage);
    });
  });

  // Close dropdown on clicking outside
  document.addEventListener('click', (e) => {
    const island = document.querySelector('.wf-omni-island');
    if (island && !island.contains(e.target)) {
      closeClusterDropdown();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeClusterDropdown();
    }
  });
}

/* ============================================================
   4. LEFT-EDGE HOVER NAVIGATION DRAWER ENGINE
   ============================================================ */
function toggleDrawerPin(btnElement) {
  const drawer = btnElement.closest('.wf-edge-drawer');
  if (!drawer) return;

  const isPinned = drawer.classList.toggle('pinned');
  btnElement.classList.toggle('active', isPinned);
  btnElement.innerHTML = isPinned 
    ? '<i class="fa-solid fa-thumbtack"></i> Pinned' 
    : '<i class="fa-solid fa-thumbtack"></i> Pin Menu';
}

function closeDrawerExplicit(closeBtn) {
  const drawer = closeBtn.closest('.wf-edge-drawer');
  if (drawer) {
    drawer.classList.remove('pinned');
    drawer.classList.remove('open');
    const pinBtn = drawer.querySelector('.wf-pin-btn');
    if (pinBtn) {
      pinBtn.classList.remove('active');
      pinBtn.innerHTML = '<i class="fa-solid fa-thumbtack"></i> Pin Menu';
    }
  }
}

function initEdgeDrawerEngine() {
  window.toggleDrawerPin = toggleDrawerPin;
  window.closeDrawerExplicit = closeDrawerExplicit;

  // Handle click to toggle drawer
  document.querySelectorAll('.wf-edge-handle').forEach(handle => {
    handle.addEventListener('click', (e) => {
      e.stopPropagation();
      const zone = handle.closest('.wf-edge-nav-zone');
      const drawer = zone?.querySelector('.wf-edge-drawer');
      if (drawer) {
        drawer.classList.toggle('open');
      }
    });
  });

  // Drawer nav item click handler
  document.querySelectorAll('.wf-edge-nav-item[data-target]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      scrollToSubSection(targetId);

      // If drawer is not pinned, auto-hide on click
      const drawer = item.closest('.wf-edge-drawer');
      if (drawer && !drawer.classList.contains('pinned')) {
        drawer.classList.remove('open');
      }
    });
  });

  // Clicking outside drawer closes it if not pinned
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.wf-edge-nav-zone')) {
      document.querySelectorAll('.wf-edge-drawer:not(.pinned)').forEach(d => {
        d.classList.remove('open');
      });
    }
  });

  // Mousemove proximity detection on the mockup stage
  const stage = document.querySelector('.wf-device-mockup');
  if (stage) {
    stage.addEventListener('mousemove', (e) => {
      const edgeZone = document.getElementById('unified-edge-zone');
      if (!edgeZone || !edgeZone.classList.contains('visible')) return;

      const drawer = edgeZone.querySelector('.wf-edge-drawer');
      if (!drawer || drawer.classList.contains('pinned')) return;

      const rect = stage.getBoundingClientRect();
      const distFromLeft = e.clientX - rect.left;

      if (distFromLeft >= 0 && distFromLeft <= 38 && e.clientY >= 80 && e.clientY <= window.innerHeight - 30) {
        drawer.classList.add('open');
      } else if (distFromLeft > 330) {
        drawer.classList.remove('open');
      }
    });
  }

  // Active ScrollSpy: Track headings and highlight corresponding drawer link
  window.addEventListener('scroll', () => {
    const activePanel = document.querySelector('.wf-view-panel.active');
    if (!activePanel) return;

    const sections = activePanel.querySelectorAll('[id^="sec-"], [id^="item-"]');
    const scrollPos = window.scrollY + 200;

    let currentSectionId = null;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        currentSectionId = sec.id;
      }
    });

    if (currentSectionId) {
      const activePane = document.querySelector('.wf-edge-pane.active');
      if (activePane) {
        activePane.querySelectorAll('.wf-edge-nav-item').forEach(item => {
          item.classList.toggle('active', item.getAttribute('data-target') === currentSectionId);
        });
      }
      document.querySelectorAll('.wf-sub-pill').forEach(pill => {
        pill.classList.toggle('active', pill.getAttribute('data-target') === currentSectionId);
      });
    }
  });
}

/* ============================================================
   5. STRUKTUR ORGANISASI: PERSONEL TERSTRUKTUR TABS
   ============================================================ */
function switchOrganisasiTab(tabName) {
  document.querySelectorAll('.wf-org-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-org-tab') === tabName);
  });

  const pembinaGrid = document.getElementById('org-grid-pembina');
  const pelaksanaGrid = document.getElementById('org-grid-pelaksana');

  if (pembinaGrid && pelaksanaGrid) {
    if (tabName === 'pembina') {
      pembinaGrid.style.display = 'grid';
      pelaksanaGrid.style.display = 'none';
    } else {
      pembinaGrid.style.display = 'none';
      pelaksanaGrid.style.display = 'grid';
    }
  }
}

function initOrganisasiTabs() {
  window.switchOrganisasiTab = switchOrganisasiTab;
}

/* ============================================================
   6. STRATIFIKASI UKS/M 4-STRATA INTERACTIVE HIGHLIGHTER
   ============================================================ */
function selectStrata(strataKey) {
  document.querySelectorAll('.wf-strata-card').forEach(card => {
    if (strataKey === 'all' || card.getAttribute('data-strata') === strataKey) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.borderColor = 'var(--wf-ink-black)';
    } else {
      card.style.opacity = '0.4';
      card.style.transform = 'scale(0.98)';
      card.style.borderColor = 'var(--wf-line-solid)';
    }
  });

  document.querySelectorAll('.wf-strata-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-strata-filter') === strataKey);
  });
}

function initStrataInteractive() {
  window.selectStrata = selectStrata;
}

/* ============================================================
   7. BAHAN ADVOKASI GSS: SEARCH & CATEGORY FILTER
   ============================================================ */
function filterAdvokasi(category) {
  document.querySelectorAll('.wf-advokasi-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-advokasi-filter') === category);
  });

  document.querySelectorAll('.wf-download-item').forEach(item => {
    const itemCat = item.getAttribute('data-adv-cat');
    if (category === 'all' || itemCat === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function initAdvokasiFilter() {
  window.filterAdvokasi = filterAdvokasi;
}

/* ============================================================
   8. DIGITAL BOOK MODAL PREVIEW & DOWNLOAD
   ============================================================ */
function openBookModal(title, category, desc, fileUrl, coverUrl) {
  const overlay = document.getElementById('book-modal-overlay');
  if (!overlay) return;

  const titleEl = document.getElementById('modal-book-title');
  const catEl = document.getElementById('modal-book-category');
  const descEl = document.getElementById('modal-book-desc');
  const dlBtn = document.getElementById('modal-book-download');
  const coverBox = document.getElementById('modal-book-cover');

  if (titleEl) titleEl.innerText = title;
  if (catEl) catEl.innerText = category || 'BUKU RESMI UKS/M';
  if (descEl) descEl.innerText = desc || 'Panduan resmi Usaha Kesehatan Sekolah / Madrasah.';
  
  if (dlBtn) {
    dlBtn.href = fileUrl || '#';
    dlBtn.onclick = (e) => {
      if (!fileUrl || fileUrl === '#') {
        e.preventDefault();
        alert(`Simulasi Unduh: ${title} (PDF)`);
      }
    };
  }

  if (coverBox && coverUrl) {
    coverBox.innerHTML = `<img src="${coverUrl}" alt="Cover" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-xs);" onerror="this.parentElement.innerHTML='<i class=\'fa-solid fa-book-open\' style=\'font-size: 36px; color: var(--wf-accent);\'></i>'">`;
  } else if (coverBox) {
    coverBox.innerHTML = '<i class="fa-solid fa-book-open" style="font-size: 36px; color: var(--wf-accent);"></i>';
  }

  overlay.classList.add('open');
}

function closeBookModal(event) {
  if (event && event.target && event.target !== event.currentTarget) return;
  const overlay = document.getElementById('book-modal-overlay');
  if (overlay) overlay.classList.remove('open');
}

function initBookModal() {
  window.openBookModal = openBookModal;
  window.closeBookModal = closeBookModal;
  window.toggleFaq = toggleFaq;
  window.filterBerita = filterBerita;
  window.filterBuku = filterBuku;

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookModal(null);
    }
  });
}

/* ============================================================
   9. INTERACTIVE FAQ ACCORDION
   ============================================================ */
function toggleFaq(faqItem) {
  if (!faqItem) return;
  const isOpen = faqItem.classList.contains('open');
  const parent = faqItem.parentElement;
  if (parent) {
    parent.querySelectorAll('.wf-faq-item').forEach(item => item.classList.remove('open'));
  }
  if (!isOpen) {
    faqItem.classList.add('open');
  }
}

/* ============================================================
   10. WARTA & BERITA CATEGORY FILTER
   ============================================================ */
function filterBerita(category, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.wf-info-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
  }

  document.querySelectorAll('.wf-news-item').forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

/* ============================================================
   11. DIGITAL BOOK CATEGORY FILTER
   ============================================================ */
function filterBuku(category, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.wf-book-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
  }

  document.querySelectorAll('.wf-book-item').forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}
