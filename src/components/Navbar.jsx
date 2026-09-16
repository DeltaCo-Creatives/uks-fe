import { useState, useEffect } from 'react';

export default function Navbar({ currentView, onNavigateView }) {
  const [scrolled, setScrolled] = useState(false);
  // Which single dropdown is open: null | 'uksm' | 'program' | 'mitra' | 'informasi' | 'publikasi'
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // On Beranda the hero is ~viewport-height, so the floating pill nav must
    // wait until most of it has scrolled past — otherwise it hovers directly
    // over the hero title/copy for the entire first screen of scrolling.
    // Subpages have no comparable hero, so they can switch almost immediately.
    const handleScroll = () => {
      const threshold = currentView === 'beranda' ? window.innerHeight * 0.55 : 40;
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, viewKey, sectionId = null) => {
    e.preventDefault();
    setOpenMenu(null);
    setMobileMenuOpen(false);
    onNavigateView(viewKey, sectionId);
  };

  const isUksmActive = ['uksm-profil', 'uksm-trias', 'uksm-gss'].includes(currentView);

  // Program / Kemitraan / Informasi / Publikasi are single-page "lobbies" —
  // picking a topic happens inside the page itself (tab buttons + one big
  // display panel), so the navbar just links straight there. Only UKS/M
  // still needs a dropdown here, since it's genuinely 3 separate pages.
  const plainTabs = [
    { key: 'program', label: 'Program' },
    { key: 'mitra', label: 'Kemitraan' },
    { key: 'informasi', label: 'Informasi' },
    { key: 'publikasi', label: 'Publikasi' }
  ];

  return (
    <div className={`nav-dynamic-wrapper ${scrolled ? 'is-scrolled' : 'is-top'}`}>
      <nav className="nav-dynamic-bar">
        {/* Brand Icon */}
        <a
          href="#beranda"
          className="brand-icon-nav"
          onClick={(e) => handleNavClick(e, 'beranda')}
          title="UKS Indonesia"
        >
          <img src={scrolled ? "Aset UKS/UKS-03.png" : "Aset UKS/UKS-02.png"} alt="UKS Logo" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="nav-links-nav">
          <a
            href="#beranda"
            className={currentView === 'beranda' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'beranda')}
            style={{ fontWeight: currentView === 'beranda' ? 800 : 600 }}
          >
            Beranda
          </a>

          {/* UKS/M Tab with 3-Cluster Dropdown */}
          <div
            className="nav-item-has-dropdown"
            onMouseEnter={() => setOpenMenu('uksm')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <a
              href="#uksm"
              className={isUksmActive ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setOpenMenu(openMenu === 'uksm' ? null : 'uksm');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: isUksmActive ? 800 : 600
              }}
            >
              <i className="fa-solid fa-layer-group" style={{ fontSize: '11px', color: 'var(--brand-primary)' }}></i>
              <span>UKS/M (3 Pilar)</span>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: '9px', opacity: 0.7 }}></i>
            </a>

            {/* 3-Cluster Mega Dropdown Menu — the visible card is a nested
                panel so the outer .nav-cluster-dropdown can extend, invisibly,
                all the way up to the trigger with no dead hover gap. */}
            <div className={`nav-cluster-dropdown ${openMenu === 'uksm' ? 'is-open' : ''}`}>
              <div className="nav-cluster-panel">
                <div className="nav-cluster-header">
                  <div className="nav-cluster-title">
                    <i className="fa-solid fa-table-cells-large" style={{ color: 'var(--brand-primary)' }}></i>
                    <span>Peta 3 Kluster UKS/M (Masing-Masing Memiliki Halaman &amp; Navigasi Mandiri)</span>
                  </div>
                  <span style={{ fontSize: '10px', background: 'var(--brand-light)', color: 'var(--brand-primary)', padding: '3px 8px', borderRadius: '999px', fontWeight: 800 }}>
                    3 DEDICATED PAGES
                  </span>
                </div>

                <div className="nav-cluster-grid">
                  {/* Cluster 1: Profil */}
                  <div
                    className="nav-cluster-card"
                    onClick={(e) => handleNavClick(e, 'uksm-profil')}
                  >
                    <div>
                      <div className="nav-cluster-icon" style={{ background: '#D2E8DA', color: '#098C4C' }}>
                        <i className="fa-solid fa-landmark"></i>
                      </div>
                      <h4>1. Profil &amp; Tata Kelola</h4>
                      <p>Landasan filosofis SKB 4 Menteri, bagan personel terstruktur, matriks 4 strata kesiapan, dan manajemen UKS.</p>
                    </div>
                    <div className="nav-cluster-btn">
                      <span>Buka Halaman Profil</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </div>
                  </div>

                  {/* Cluster 2: Trias */}
                  <div
                    className="nav-cluster-card"
                    onClick={(e) => handleNavClick(e, 'uksm-trias')}
                  >
                    <div>
                      <div className="nav-cluster-icon" style={{ background: '#DBEAFE', color: '#2563EB' }}>
                        <i className="fa-solid fa-shield-heart"></i>
                      </div>
                      <h4>2. TRIAS UKS/M</h4>
                      <p>3 Pilar pokok di satuan pendidikan: (1) Pendidikan Kesehatan (7 L3), (2) Pelayanan (4 L3), dan (3) Lingkungan (5 L3).</p>
                    </div>
                    <div className="nav-cluster-btn" style={{ color: '#2563EB' }}>
                      <span>Buka Halaman Trias</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </div>
                  </div>

                  {/* Cluster 3: GSS */}
                  <div
                    className="nav-cluster-card"
                    onClick={(e) => handleNavClick(e, 'uksm-gss')}
                  >
                    <div>
                      <div className="nav-cluster-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
                        <i className="fa-solid fa-apple-whole"></i>
                      </div>
                      <h4>3. Sekolah Sehat (GSS)</h4>
                      <p>Gerakan Sekolah Sehat dengan 5 fokus pembiasaan (Bergizi, Fisik, Imunisasi, Jiwa, Lingkungan) serta listing unduhan.</p>
                    </div>
                    <div className="nav-cluster-btn" style={{ color: '#D97706' }}>
                      <span>Buka Halaman GSS</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {plainTabs.map(({ key, label }) => (
            <a
              key={key}
              href={`#${key}`}
              className={currentView === key ? 'active' : ''}
              onClick={(e) => handleNavClick(e, key)}
              style={{ fontWeight: currentView === key ? 800 : 600 }}
            >
              {label}
            </a>
          ))}

          <a
            href="#kontak"
            className={currentView === 'kontak' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'kontak')}
            style={{ fontWeight: currentView === 'kontak' ? 800 : 600 }}
          >
            Kontak
          </a>
        </div>

        {/* Right Controls: Stratifikasi & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={(e) => handleNavClick(e, 'uksm-profil')}
            className="btn-pill primary nav-strat-desktop"
            style={{ padding: '8px 16px', fontSize: '12px' }}
          >
            <i className="fa-solid fa-layer-group" style={{ marginRight: '6px' }}></i> Stratifikasi
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <i className={mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </button>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="nav-mobile-menu">
            <div className="nav-mobile-list">
              <a
                href="#beranda"
                className={`nav-mobile-item ${currentView === 'beranda' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'beranda')}
              >
                <i className="fa-solid fa-house"></i>
                <span>Beranda Nasional</span>
              </a>

              <div className="nav-mobile-group-header">
                <i className="fa-solid fa-layer-group"></i>
                <span>UKS/M (3 Kluster Pilar):</span>
              </div>
              
              <a
                href="#profil"
                className={`nav-mobile-item indent ${currentView === 'uksm-profil' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'uksm-profil')}
              >
                <i className="fa-solid fa-landmark"></i>
                <span>1. Profil &amp; Tata Kelola</span>
              </a>

              <a
                href="#trias"
                className={`nav-mobile-item indent ${currentView === 'uksm-trias' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'uksm-trias')}
              >
                <i className="fa-solid fa-shield-heart"></i>
                <span>2. TRIAS UKS/M (16 Indikator)</span>
              </a>

              <a
                href="#gss"
                className={`nav-mobile-item indent ${currentView === 'uksm-gss' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'uksm-gss')}
              >
                <i className="fa-solid fa-apple-whole"></i>
                <span>3. Sekolah Sehat (GSS)</span>
              </a>

              <div className="nav-mobile-divider"></div>

              <a
                href="#program"
                className={`nav-mobile-item ${currentView === 'program' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'program')}
              >
                <i className="fa-solid fa-bullhorn"></i>
                <span>Program Prioritas (MBG, CKG)</span>
              </a>

              <a
                href="#mitra"
                className={`nav-mobile-item ${currentView === 'mitra' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'mitra')}
              >
                <i className="fa-solid fa-handshake"></i>
                <span>Kolaborasi Kemitraan</span>
              </a>

              <a
                href="#informasi"
                className={`nav-mobile-item ${currentView === 'informasi' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'informasi')}
              >
                <i className="fa-solid fa-newspaper"></i>
                <span>Warta &amp; Informasi Terkini</span>
              </a>

              <a
                href="#publikasi"
                className={`nav-mobile-item ${currentView === 'publikasi' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'publikasi')}
              >
                <i className="fa-solid fa-book-bookmark"></i>
                <span>Pustaka Digital &amp; Modul</span>
              </a>

              <a
                href="#kontak"
                className={`nav-mobile-item ${currentView === 'kontak' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'kontak')}
              >
                <i className="fa-solid fa-headset"></i>
                <span>Layanan Kontak &amp; Helpdesk</span>
              </a>

              <div style={{ padding: '12px 16px 4px' }}>
                <button
                  onClick={(e) => handleNavClick(e, 'uksm-profil')}
                  className="btn-massive"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '14px', padding: '12px' }}
                >
                  <i className="fa-solid fa-layer-group"></i>
                  <span>Akses Stratifikasi UKS</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
