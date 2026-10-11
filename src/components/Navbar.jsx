import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavBrand from './NavBrand';
import NavKementerianDropdown, { KementerianLink, PanelState } from './NavKementerianDropdown';
import NavSearchButton from './NavSearchButton';
import { useKementerianList } from '../hooks/usePublicLists';
import { pathForView, viewKeyFromPathname } from '../routes';

// Past this scroll distance the bar collapses into its pill; Beranda waits until its hero is mostly gone.
const scrollThreshold = (view) => (view === 'beranda' ? window.innerHeight * 0.55 : 40);

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentView = viewKeyFromPathname(pathname);

  // Starts from the real scroll position, so a page that opens already scrolled never plays the shrink.
  const [scrolled, setScrolled] = useState(() => window.scrollY > scrollThreshold(currentView));
  const searchButtonRef = useRef(null);
  const hamburgerRef = useRef(null);
  const kementerianHeaderRef = useRef(null);
  const triggerRefs = useRef({});
  // Which single dropdown is open: null | 'uksm' | 'kementerian'
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileKementerianOpen, setMobileKementerianOpen] = useState(false);
  // undefined: the first instansi (so it is open even when the list loads late); null: closed by the visitor.
  const [openInstansi, setOpenInstansi] = useState(undefined);
  // One load and retry state for the desktop panel and the drawer, so a retry in either updates both.
  const { data: kementerianData, loading: kementerianLoading, error: kementerianError, retry: retryKementerian } = useKementerianList();
  const kementerianGroups = (kementerianData ?? []).filter((ministry) => ministry.tautan.length > 0);
  const activeInstansi = openInstansi === undefined ? kementerianGroups[0]?.id : openInstansi;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > scrollThreshold(currentView));
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

  // Escape closes an open panel wherever focus is (WCAG 1.4.13); focus returns to the trigger only if it was inside the item.
  useEffect(() => {
    if (openMenu === null) return undefined;
    const handleEscape = (e) => {
      if (e.key !== 'Escape') return;
      const trigger = triggerRefs.current[openMenu];
      if (trigger?.parentElement.contains(document.activeElement)) trigger.focus();
      setOpenMenu(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [openMenu]);

  const closeMenus = () => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
  };

  const toggleMobileKementerian = () => {
    setOpenInstansi(undefined);
    setMobileKementerianOpen((open) => !open);
  };

  // The Coba Lagi button is replaced by the loading block, so focus would drop to <body> without this.
  const handleKementerianRetry = () => {
    retryKementerian();
    kementerianHeaderRef.current?.focus();
  };

  const handlePanelRetry = () => {
    retryKementerian();
    triggerRefs.current.kementerian?.focus();
  };

  const goTo = (viewKey) => {
    closeMenus();
    navigate(pathForView(viewKey));
  };

  // Hover has already opened the panel, so only a keyboard click (detail 0) toggles it shut.
  const handleTriggerClick = (name) => (e) => {
    setOpenMenu(e.detail === 0 && openMenu === name ? null : name);
  };

  // Pointer opens on hover; tabbing out closes. Escape is the window listener above.
  const dropdownItemProps = (name) => ({
    onMouseEnter: () => setOpenMenu(name),
    onMouseLeave: () => setOpenMenu(null),
    // A null relatedTarget is a click on non-focusable padding or a window blur; mouseleave covers the pointer.
    onBlur: (e) => {
      if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
        setOpenMenu((current) => (current === name ? null : current));
      }
    }
  });

  // On the nav so one handler covers both the hamburger and the drawer.
  const handleNavKeyDown = (e) => {
    if (e.key !== 'Escape' || !mobileMenuOpen) return;
    setMobileMenuOpen(false);
    hamburgerRef.current?.focus();
  };

  const isUksmActive = pathname.startsWith('/uksm');

  const plainTabs = [
    { key: 'program', label: 'Program' },
    { key: 'mitra', label: 'Mitra' },
    { key: 'informasi', label: 'Informasi' },
    { key: 'publikasi', label: 'Publikasi' }
  ];

  return (
    <div className={`nav-dynamic-wrapper ${scrolled ? 'is-scrolled' : 'is-top'}`}>
      <nav className="nav-dynamic-bar" onKeyDown={handleNavKeyDown}>
        {/* Brand Icon */}
        <NavBrand scrolled={scrolled} onClick={closeMenus} />

        {/* Desktop Navigation Links */}
        <div className="nav-links-nav">
          <Link
            to="/"
            className={currentView === 'beranda' ? 'active' : ''}
            onClick={closeMenus}
            style={{ fontWeight: currentView === 'beranda' ? 800 : 600 }}
          >
            Beranda
          </Link>

          {/* UKS/M Tab with 4-Cluster Dropdown */}
          <div className="nav-item-has-dropdown" {...dropdownItemProps('uksm')}>
            <button
              type="button"
              ref={(el) => { triggerRefs.current.uksm = el; }}
              className={isUksmActive ? 'active' : ''}
              aria-expanded={openMenu === 'uksm'}
              aria-controls="nav-uksm-panel"
              onClick={handleTriggerClick('uksm')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: isUksmActive ? 800 : 600
              }}
            >
              <i className="fa-solid fa-layer-group" aria-hidden="true" style={{ fontSize: '11px', color: 'var(--brand-primary)' }}></i>
              <span>UKS/M</span>
              <i className="fa-solid fa-chevron-down" aria-hidden="true" style={{ fontSize: '9px', opacity: 0.7 }}></i>
            </button>

            <div id="nav-uksm-panel" className={`nav-cluster-dropdown ${openMenu === 'uksm' ? 'is-open' : ''}`}>
              <div className="nav-cluster-panel">
                <div className="nav-cluster-header">
                  <div className="nav-cluster-title">
                    <i className="fa-solid fa-table-cells-large" style={{ color: 'var(--brand-primary)' }}></i>
                    <span>Peta 3 Kluster UKS/M</span>
                  </div>
                </div>

                <div className="nav-cluster-grid">
                  {/* Cluster 1: Profil */}
                  <Link
                    to={pathForView('uksm-profil')}
                    className="nav-cluster-card"
                    onClick={closeMenus}
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
                  </Link>

                  {/* Cluster 2: Trias */}
                  <Link
                    to={pathForView('uksm-trias')}
                    className="nav-cluster-card"
                    onClick={closeMenus}
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
                  </Link>

                  {/* Cluster 3: Stratifikasi */}
                  <Link
                    to={pathForView('uksm-stratifikasi')}
                    className="nav-cluster-card"
                    onClick={closeMenus}
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
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {plainTabs.map(({ key, label }) => (
            <Link
              key={key}
              to={pathForView(key)}
              className={currentView === key ? 'active' : ''}
              onClick={closeMenus}
              style={{ fontWeight: currentView === key ? 800 : 600 }}
            >
              {label}
            </Link>
          ))}

          {/* Kementerian Terkait Outbound Dropdown (A1) */}
          <div className="nav-item-has-dropdown" {...dropdownItemProps('kementerian')}>
            <button
              type="button"
              ref={(el) => { triggerRefs.current.kementerian = el; }}
              aria-expanded={openMenu === 'kementerian'}
              aria-controls="nav-kementerian-panel"
              onClick={handleTriggerClick('kementerian')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: openMenu === 'kementerian' ? 800 : 600
              }}
            >
              <i className="fa-solid fa-link" aria-hidden="true" style={{ fontSize: '11px', color: 'var(--brand-primary)' }}></i>
              <span>Kementerian Terkait</span>
              <i className="fa-solid fa-chevron-down" aria-hidden="true" style={{ fontSize: '9px', opacity: 0.7 }}></i>
            </button>

            <NavKementerianDropdown
              isOpen={openMenu === 'kementerian'}
              onClose={() => setOpenMenu(null)}
              groups={kementerianGroups}
              loading={kementerianLoading}
              error={kementerianError}
              onRetry={handlePanelRetry}
            />
          </div>

          <Link
            to={pathForView('kontak')}
            className={currentView === 'kontak' ? 'active' : ''}
            onClick={closeMenus}
            style={{ fontWeight: currentView === 'kontak' ? 800 : 600 }}
          >
            Kontak
          </Link>
        </div>

        {/* Right Controls: Search & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Search Button (A2) */}
          <NavSearchButton
            ref={searchButtonRef}
            active={currentView === 'search'}
            onClick={() => goTo('search')}
          />

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            ref={hamburgerRef}
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu navigasi"
            aria-expanded={mobileMenuOpen}
            aria-controls="nav-mobile-drawer"
          >
            <i className={mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden="true"></i>
          </button>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div id="nav-mobile-drawer" className="nav-mobile-menu">
            <div className="nav-mobile-list">
              {/* Mobile Search Item (A2); the drawer closes on tap, so the bar's search button plays the confirmation. */}
              <Link
                to={pathForView('search')}
                className={`nav-mobile-item ${currentView === 'search' ? 'active' : ''}`}
                onClick={() => {
                  closeMenus();
                  searchButtonRef.current?.confirm();
                }}
                style={{
                  background: currentView === 'search' ? 'var(--brand-deep)' : 'var(--brand-light)',
                  color: currentView === 'search' ? '#FFFFFF' : 'var(--brand-deep)',
                  fontWeight: 800
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>Pencarian Direktori UKS</span>
              </Link>

              <Link
                to="/"
                className={`nav-mobile-item ${currentView === 'beranda' ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fa-solid fa-house"></i>
                <span>Beranda Nasional</span>
              </Link>

              <div className="nav-mobile-group-header">
                <i className="fa-solid fa-layer-group"></i>
                <span>UKS/M (3 Kluster Pilar):</span>
              </div>

              <Link
                to={pathForView('uksm-profil')}
                className={`nav-mobile-item indent ${currentView === 'uksm-profil' ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fa-solid fa-landmark"></i>
                <span>1. Profil &amp; Tata Kelola</span>
              </Link>

              <Link
                to={pathForView('uksm-trias')}
                className={`nav-mobile-item indent ${currentView === 'uksm-trias' ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fa-solid fa-shield-heart"></i>
                <span>2. TRIAS UKS/M</span>
              </Link>

              <Link
                to={pathForView('uksm-stratifikasi')}
                className={`nav-mobile-item indent ${currentView === 'uksm-stratifikasi' ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fa-solid fa-layer-group"></i>
                <span>3. Stratifikasi UKS/M</span>
              </Link>

              <div className="nav-mobile-divider"></div>

              <Link
                to={pathForView('program')}
                className={`nav-mobile-item ${currentView === 'program' ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fa-solid fa-bullhorn"></i>
                <span>Program Prioritas (MBG, CKG, ASRI)</span>
              </Link>

              <Link
                to={pathForView('mitra')}
                className={`nav-mobile-item ${currentView === 'mitra' ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fa-solid fa-handshake"></i>
                <span>Kolaborasi Kemitraan</span>
              </Link>

              <Link
                to={pathForView('informasi')}
                className={`nav-mobile-item ${currentView === 'informasi' ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fa-solid fa-newspaper"></i>
                <span>Warta &amp; Informasi Terkini</span>
              </Link>

              <Link
                to={pathForView('publikasi')}
                className={`nav-mobile-item ${currentView === 'publikasi' ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fa-solid fa-book-bookmark"></i>
                <span>Pustaka Digital &amp; Modul</span>
              </Link>

              {/* Collapsible Mobile Kementerian Terkait (A1): one instansi open at a time */}
              <button
                type="button"
                ref={kementerianHeaderRef}
                className="nav-mobile-group-header"
                aria-expanded={mobileKementerianOpen}
                aria-controls="nav-mobile-kementerian"
                onClick={toggleMobileKementerian}
              >
                <i className="fa-solid fa-link" aria-hidden="true"></i>
                <span>Kementerian Terkait</span>
                <i className={`fa-solid fa-chevron-${mobileKementerianOpen ? 'up' : 'down'} nav-mobile-chevron`} aria-hidden="true"></i>
              </button>

              {mobileKementerianOpen && (
                <div id="nav-mobile-kementerian" className="nav-mobile-kem">
                  {kementerianGroups.length === 0 ? (
                    <PanelState loading={kementerianLoading} error={kementerianError} onRetry={handleKementerianRetry} />
                  ) : (
                    <div className="nav-mobile-kem-list">
                      {kementerianGroups.map((group) => {
                        const isOpen = group.id === activeInstansi;
                        const linksId = `nav-mobile-kem-${group.id}`;
                        return (
                          <div key={group.id} className="nav-mobile-kem-item">
                            <h4>
                              <button
                                type="button"
                                className="nav-mobile-kem-btn"
                                aria-expanded={isOpen}
                                aria-controls={linksId}
                                onClick={() => setOpenInstansi(isOpen ? null : group.id)}
                              >
                                <span className="nav-cluster-icon" aria-hidden="true">
                                  <i className={group.ikon}></i>
                                </span>
                                <span className="nav-mobile-kem-name">
                                  <span className="nav-mobile-kem-title">{group.singkatan}</span>
                                  <span className="nav-mobile-kem-count">{group.tautan.length} tautan</span>
                                </span>
                                <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} nav-mobile-chevron`} aria-hidden="true"></i>
                              </button>
                            </h4>

                            {isOpen && (
                              <ul id={linksId} className="nav-mobile-kem-links">
                                {group.tautan.map((link, index) => (
                                  <li key={`${index}-${link.label}`}>
                                    <KementerianLink link={link} onClick={closeMenus} />
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              <div className="nav-mobile-divider"></div>

              <Link
                to={pathForView('kontak')}
                className={`nav-mobile-item ${currentView === 'kontak' ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <i className="fa-solid fa-headset"></i>
                <span>Layanan Kontak &amp; Helpdesk</span>
              </Link>

              <div style={{ padding: '12px 16px 4px' }}>
                <button
                  onClick={() => goTo('uksm-stratifikasi')}
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
