/**
 * UKS MOCKS - Dynamic Interactivity Engine
 * Supports Navigation, Mobile Menu, Search Modal, Detail Preview Modal, and Tab Switching
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSearchModal();
  initDetailModal();
  initTabSwitchers();
  initFilterPills();
});

/* --- Navbar & Mobile Drawer --- */
function initNavbar() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .nav-dropdown a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // Mobile Drawer Toggle
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  let mobileDrawer = document.getElementById('mobile-drawer');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (!mobileDrawer) {
        createMobileDrawer();
        mobileDrawer = document.getElementById('mobile-drawer');
      }
      mobileDrawer.classList.toggle('active');
    });
  }

  // Scroll effect on navbar
  const navWrapper = document.querySelector('.nav-wrapper');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navWrapper?.classList.add('scrolled');
    } else {
      navWrapper?.classList.remove('scrolled');
    }
  });
}

function createMobileDrawer() {
  const drawer = document.createElement('div');
  drawer.id = 'mobile-drawer';
  drawer.style.cssText = `
    position: fixed; inset: 0; z-index: 99998;
    background: rgba(17, 28, 22, 0.95);
    backdrop-filter: blur(20px);
    display: flex; flex-direction: column;
    padding: 30px; color: white;
    transform: translateY(-100%);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  drawer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
      <div style="font-weight: 900; font-size: 22px; color: #098C4C;">UKS / M</div>
      <button id="close-drawer" style="background: rgba(255,255,255,0.1); color: white; border-radius: 50%; width: 40px; height: 40px; font-size: 20px;">✕</button>
    </div>
    <nav style="display: flex; flex-direction: column; gap: 16px; font-size: 18px; font-weight: 700;">
      <a href="index.html" style="color: white; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Beranda</a>
      <a href="tentang-uks.html" style="color: white; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Tentang UKS/M & Trias</a>
      <a href="program.html" style="color: white; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Program (MBG, CKG, 7KAIH)</a>
      <a href="mitra.html" style="color: white; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Kemitraan & Mitra Kami</a>
      <a href="informasi.html" style="color: white; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Informasi & Berita</a>
      <a href="publikasi.html" style="color: white; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Publikasi & Buku</a>
      <a href="kontak.html" style="color: white; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Kontak & Aduan</a>
    </nav>
    <div style="margin-top: auto; padding-top: 20px;">
      <a href="../wireframe/index.html" class="btn-pill secondary" style="width: 100%; text-align: center; display: block; padding: 12px; font-size: 14px;">📐 Lihat Wireframe Blueprint</a>
    </div>
  `;
  document.body.appendChild(drawer);

  drawer.querySelector('#close-drawer').addEventListener('click', () => {
    drawer.classList.remove('active');
  });

  const style = document.createElement('style');
  style.textContent = `
    #mobile-drawer.active { transform: translateY(0) !important; }
  `;
  document.head.appendChild(style);
}

/* --- Global Search Modal --- */
function initSearchModal() {
  const searchBtns = document.querySelectorAll('.btn-nav-search, [href="pencarian.html"], [data-search-trigger]');
  if (!searchBtns.length) return;

  let searchOverlay = document.getElementById('search-modal-overlay');
  if (!searchOverlay) {
    searchOverlay = document.createElement('div');
    searchOverlay.id = 'search-modal-overlay';
    searchOverlay.className = 'modal-overlay';
    searchOverlay.innerHTML = `
      <div class="modal-box" style="max-width: 600px;">
        <button class="modal-close-btn" id="close-search-modal">✕</button>
        <h3 style="font-size: 20px; font-weight: 800; margin-bottom: 16px;">🔍 Pencarian Portal UKS/M</h3>
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
          <input type="text" id="site-search-input" placeholder="Cari program, buku panduan, regulasi, berita..." 
                 style="flex: 1; padding: 12px 18px; border-radius: var(--radius-pill); border: 1.5px solid var(--border-light); font-size: 15px; outline: none; background: var(--bg-card-alt);" />
        </div>
        <div id="search-quick-tags" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
          <span style="font-size: 12px; color: var(--text-muted); line-height: 28px;">Kata Kunci Populer:</span>
          <button class="filter-pill active" data-search-term="Makan Bergizi Gratis">MBG</button>
          <button class="filter-pill" data-search-term="Cek Kesehatan">Cek Kesehatan Gratis</button>
          <button class="filter-pill" data-search-term="Trias UKS">Trias UKS</button>
          <button class="filter-pill" data-search-term="Dokter Kecil">Dokter Kecil</button>
          <button class="filter-pill" data-search-term="Kesehatan Jiwa">Kesehatan Jiwa</button>
        </div>
        <div id="search-results-box" style="display: flex; flex-direction: column; gap: 10px; max-height: 320px; overflow-y: auto;">
          <div style="padding: 12px; border-radius: var(--radius-sm); background: var(--bg-card-alt); font-size: 13px;">
            <span class="section-kicker" style="font-size: 10px; margin-bottom: 4px;">Program Prioritas</span>
            <div style="font-weight: 700; color: var(--text-primary);">Program Makan Bergizi Gratis (MBG) di Satuan Pendidikan</div>
            <p style="color: var(--text-secondary); margin-top: 2px;">Panduan implementasi dan pendidikan gizi bagi siswa jenjang PAUD-SMA/K.</p>
          </div>
          <div style="padding: 12px; border-radius: var(--radius-sm); background: var(--bg-card-alt); font-size: 13px;">
            <span class="section-kicker" style="font-size: 10px; margin-bottom: 4px;">Publikasi</span>
            <div style="font-weight: 700; color: var(--text-primary);">Buku Pedoman Kesehatan Jiwa di Satpen Jenjang SMP</div>
            <p style="color: var(--text-secondary); margin-top: 2px;">Pedoman deteksi dini dan pembinaan kesehatan mental di lingkungan sekolah.</p>
          </div>
          <div style="padding: 12px; border-radius: var(--radius-sm); background: var(--bg-card-alt); font-size: 13px;">
            <span class="section-kicker" style="font-size: 10px; margin-bottom: 4px;">Regulasi</span>
            <div style="font-weight: 700; color: var(--text-primary);">SKB 4 Menteri tentang Pembinaan dan Pengembangan UKS/M</div>
            <p style="color: var(--text-secondary); margin-top: 2px;">Landasan hukum kolaborasi Kemendikdasmen, Kemenkes, Kemenag, dan Kemendagri.</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(searchOverlay);

    const closeBtn = document.getElementById('close-search-modal');
    closeBtn.addEventListener('click', () => searchOverlay.classList.remove('active'));
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) searchOverlay.classList.remove('active');
    });

    const searchInput = document.getElementById('site-search-input');
    const tags = searchOverlay.querySelectorAll('[data-search-term]');
    tags.forEach(tag => {
      tag.addEventListener('click', () => {
        searchInput.value = tag.getAttribute('data-search-term');
        filterSearchResults(searchInput.value);
      });
    });

    searchInput.addEventListener('input', () => {
      filterSearchResults(searchInput.value);
    });
  }

  searchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      searchOverlay.classList.add('active');
      setTimeout(() => document.getElementById('site-search-input')?.focus(), 100);
    });
  });
}

function filterSearchResults(query) {
  const q = query.toLowerCase().trim();
  const results = document.querySelectorAll('#search-results-box > div');
  results.forEach(item => {
    const text = item.innerText.toLowerCase();
    if (!q || text.includes(q)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

/* --- Detail Preview Modal for Books, News, Programs --- */
function initDetailModal() {
  let modalOverlay = document.getElementById('detail-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'detail-modal-overlay';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-box" style="max-width: 680px;">
        <button class="modal-close-btn" id="close-detail-modal">✕</button>
        <div id="detail-modal-content"></div>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    const closeBtn = document.getElementById('close-detail-modal');
    closeBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-title]');
    if (trigger) {
      e.preventDefault();
      const title = trigger.getAttribute('data-modal-title') || 'Informasi UKS/M';
      const category = trigger.getAttribute('data-modal-category') || 'Publikasi';
      const desc = trigger.getAttribute('data-modal-desc') || 'Dokumen panduan resmi Kementerian Pendidikan Dasar dan Menengah.';
      const img = trigger.getAttribute('data-modal-img') || '';
      const fileUrl = trigger.getAttribute('data-modal-file') || '#';

      const contentBox = document.getElementById('detail-modal-content');
      contentBox.innerHTML = `
        <span class="section-kicker" style="margin-bottom: 8px;">${category}</span>
        <h2 style="font-size: 24px; font-weight: 800; line-height: 1.25; margin-bottom: 14px;">${title}</h2>
        ${img ? `<div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 16px; max-height: 280px; background: #000;"><img src="${img}" style="width: 100%; height: 100%; object-fit: contain;" alt="${title}"/></div>` : ''}
        <p style="color: var(--text-secondary); line-height: 1.65; margin-bottom: 24px; font-size: 15px;">${desc}</p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="${fileUrl}" target="_blank" class="btn-pill primary">📥 Unduh Dokumen (PDF)</a>
          <button class="btn-pill secondary" onclick="document.getElementById('detail-modal-overlay').classList.remove('active')">Tutup Pratinjau</button>
        </div>
      `;
      modalOverlay.classList.add('active');
    }
  });
}

/* --- Tab Switchers --- */
function initTabSwitchers() {
  const tabGroups = document.querySelectorAll('[data-tabs-group]');
  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('[data-tab-target]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab-target');
        
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const parentContainer = group.closest('.tabs-parent') || document;
        const panels = parentContainer.querySelectorAll('[data-tab-panel]');
        panels.forEach(panel => {
          if (panel.getAttribute('data-tab-panel') === targetId) {
            panel.style.display = 'block';
          } else {
            panel.style.display = 'none';
          }
        });
      });
    });
  });
}

/* --- Filter Pills --- */
function initFilterPills() {
  const filterContainers = document.querySelectorAll('[data-filter-container]');
  filterContainers.forEach(container => {
    const pills = container.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const category = pill.getAttribute('data-filter') || 'all';
        const targetGrid = document.querySelector(pill.getAttribute('data-target-grid') || '.filterable-grid');
        if (!targetGrid) return;

        const cards = targetGrid.querySelectorAll('[data-category]');
        cards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category || cardCat.includes(category)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });
}
