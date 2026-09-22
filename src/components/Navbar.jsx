import { useState, useEffect } from 'react';
import NavTautanDropdown from './NavTautanDropdown';
import { tautanGroups } from '../data/portalData';

export default function Navbar({ currentView, onNavigateView }) {
  const [scrolled, setScrolled] = useState(false);
  // Which single dropdown is open: null | 'uksm' | 'tautan'
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTautanOpen, setMobileTautanOpen] = useState(false);

  useEffect(() => {
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

  const isUksmActive = ['uksm-profil', 'uksm-trias', 'uksm-stratifikasi'].includes(currentView);

  const plainTabs = [
    { key: 'program', label: 'Program' },
    { key: 'mitra', label: 'Mitra' },
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

          {/* UKS/M Tab with 4-Cluster Dropdown */}
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
              <span>UKS/M</span>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: '9px', opacity: 0.7 }}></i>
            </a>

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
                      <p>Deskripsi, tujuan dan sasaran UKS/M, struktur Tim Pembina dan Tim Pelaksana, serta manajemen UKS/M.</p>
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
                      <p>3 pilar: (1) Pendidikan Kesehatan, (2) Pelayanan Kesehatan, dan (3) Pembinaan Lingkungan Sekolah Sehat.</p>
                    </div>
                    <div className="nav-cluster-btn" style={{ color: '#2563EB' }}>
                      <span>Buka Halaman Trias</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </div>
                  </div>

                  {/* Cluster 3: Stratifikasi */}
                  <div
                    className="nav-cluster-card"
                    onClick={(e) => handleNavClick(e, 'uksm-stratifikasi')}
                  >
                    <div>
                      <div className="nav-cluster-icon" style={{ background: '#EDE9FE', color: '#7C3AED' }}>
                        <i className="fa-solid fa-layer-group"></i>
                      </div>
                      <h4>3. Stratifikasi UKS/M</h4>
                      <p>4 strata satuan pendidikan: Dasar, Madya, Utama, dan Paripurna.</p>
                    </div>
                    <div className="nav-cluster-btn" style={{ color: '#7C3AED' }}>
                      <span>Buka Halaman Stratifikasi</span>
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

          {/* Tautan Outbound Dropdown (A1) */}
          <div
            className="nav-item-has-dropdown"
            onMouseEnter={() => setOpenMenu('tautan')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <a
              href="#tautan"
              onClick={(e) => {
                e.preventDefault();
                setOpenMenu(openMenu === 'tautan' ? null : 'tautan');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: openMenu === 'tautan' ? 800 : 600
              }}
            >
              <i className="fa-solid fa-link" style={{ fontSize: '11px', color: 'var(--brand-primary)' }}></i>
              <span>Tautan</span>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: '9px', opacity: 0.7 }}></i>
            </a>

            <NavTautanDropdown isOpen={openMenu === 'tautan'} onClose={() => setOpenMenu(null)} />
          </div>

          <a
            href="#kontak"
            className={currentView === 'kontak' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'kontak')}
            style={{ fontWeight: currentView === 'kontak' ? 800 : 600 }}
          >
            Kontak
          </a>
        </div>

        {/* Right Controls: Search & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Search Button (A2) */}
          <button
            onClick={(e) => handleNavClick(e, 'search')}
            className={`nav-search-btn ${currentView === 'search' ? 'active' : ''}`}
            aria-label="Pencarian Direktori UKS"
            title="Pencarian Direktori UKS/M"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
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
              {/* Mobile Search Item (A2) */}
              <a
                href="#pencarian"
                className={`nav-mobile-item ${currentView === 'search' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'search')}
                style={{
                  background: currentView === 'search' ? 'var(--brand-primary)' : 'var(--brand-light)',
                  color: currentView === 'search' ? '#FFFFFF' : 'var(--brand-primary)',
                  fontWeight: 800
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>Pencarian Direktori UKS</span>
              </a>

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
                <span>2. TRIAS UKS/M</span>
              </a>

              <a
                href="#stratifikasi"
                className={`nav-mobile-item indent ${currentView === 'uksm-stratifikasi' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'uksm-stratifikasi')}
              >
                <i className="fa-solid fa-layer-group"></i>
                <span>3. Stratifikasi UKS/M</span>
              </a>

              <div className="nav-mobile-divider"></div>

              <a
                href="#program"
                className={`nav-mobile-item ${currentView === 'program' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'program')}
              >
                <i className="fa-solid fa-bullhorn"></i>
                <span>Program Prioritas (MBG, CKG, ASRI)</span>
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

              {/* Collapsible Mobile Tautan (A1) */}
              <div
                className="nav-mobile-group-header"
                onClick={() => setMobileTautanOpen(!mobileTautanOpen)}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-link"></i>
                  <span>Tautan 4 Kementerian:</span>
                </span>
                <i className={`fa-solid fa-chevron-${mobileTautanOpen ? 'up' : 'down'}`} style={{ fontSize: '10px' }}></i>
              </div>

              {mobileTautanOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '8px' }}>
                  {tautanGroups.map((grp) => (
                    <div key={grp.group} style={{ marginBottom: '4px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand-primary)', padding: '4px 16px 2px' }}>
                        {grp.group}
                      </div>
                      {grp.links.map((lnk) => (
                        <a
                          key={lnk.url}
                          href={lnk.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nav-mobile-item indent"
                          style={{ fontSize: '12px', padding: '6px 16px 6px 28px', justifyContent: 'space-between' }}
                        >
                          <span>{lnk.label}</span>
                          <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '10px', opacity: 0.5 }}></i>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              <div className="nav-mobile-divider"></div>

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
                  onClick={(e) => handleNavClick(e, 'uksm-stratifikasi')}
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
