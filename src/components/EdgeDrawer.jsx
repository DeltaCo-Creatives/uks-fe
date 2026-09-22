import { useState } from 'react';
import { pageNavigationConfigs } from '../data/portalData';

export default function EdgeDrawer({ currentView, activeSection, onNavigateSection }) {
  const [isPinned, setIsPinned] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const config = pageNavigationConfigs[currentView] || pageNavigationConfigs['beranda'];

  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  const handleItemClick = (e, targetId) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    if (!isPinned) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile & Touch Backdrop Overlay */}
      {(isOpen || isPinned) && (
        <div
          className="react-edge-backdrop"
          onClick={() => { setIsOpen(false); setIsPinned(false); }}
        />
      )}

      <div
        className={`react-edge-zone ${isOpen || isPinned ? 'is-open' : ''}`}
        onMouseEnter={() => !isPinned && setIsOpen(true)}
        onMouseLeave={() => !isPinned && setIsOpen(false)}
        style={{ zIndex: 10002 }}
      >
      {/* Edge Tab Handle; side follows .react-edge-handle (left on desktop, right on phones) */}
      <div
        className="react-edge-handle"
        onClick={() => setIsOpen(!isOpen)}
        title="Daftar Isi Halaman"
      >
        <i className="fa-solid fa-compass" style={{ color: 'var(--brand-accent)', fontSize: '15px' }}></i>
        <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em' }}>DAFTAR ISI</span>
      </div>

      {/* Frosted Glass Floating Drawer */}
      <div
        className={`react-edge-drawer ${isPinned ? 'pinned' : ''}`}
      >
        <div className="react-edge-header" style={{ background: 'transparent', padding: '18px 20px' }}>
          <div className="react-edge-header-title" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--brand-light)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}>
              <i className={config.icon}></i>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{config.drawerTitle}</span>
          </div>
          <div className="react-edge-header-btns">
            <button
              className={`react-edge-pin-btn ${isPinned ? 'active' : ''}`}
              onClick={togglePin}
              title={isPinned ? 'Lepas Pin Menu' : 'Kunci Menu Tetap Terbuka'}
              style={{ padding: '6px 12px', borderRadius: 'var(--radius-pill)', fontSize: '11px' }}
            >
              <i className="fa-solid fa-thumbtack"></i>
              <span>{isPinned ? 'Pinned' : 'Pin'}</span>
            </button>
            <button
              onClick={() => { setIsOpen(false); setIsPinned(false); }}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--bg-app)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}
              title="Tutup"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <div className="react-edge-content" style={{ padding: '8px 16px 16px' }}>
          {config.sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`react-edge-item ${isActive ? 'active' : ''}`}
                onClick={(e) => handleItemClick(e, sec.id)}
                style={{
                  borderRadius: 'var(--radius-pill)',
                  padding: '10px 16px',
                  fontSize: '13px',
                  fontWeight: isActive ? 800 : 600
                }}
              >
                <i className={sec.icon || 'fa-solid fa-circle-dot'} style={{ width: '16px', textAlign: 'center' }}></i>
                <span style={{ flexGrow: 1 }}>{sec.label}</span>
                {isActive && <i className="fa-solid fa-arrow-right" style={{ fontSize: '10px' }}></i>}
              </a>
            );
          })}
        </div>

        <div className="react-edge-footer" style={{ background: 'transparent', padding: '14px 20px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{config.footerText}</span>
          <span className="section-kicker" style={{ margin: 0, padding: '3px 10px', fontSize: '10px' }}>
            {config.badge}
          </span>
        </div>
      </div>
    </div>
  </>
);
}
