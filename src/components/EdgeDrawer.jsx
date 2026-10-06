import { useEffect, useId, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNavConfig } from '@/hooks/useNavConfig';
import { isTabView, pathForView } from '../routes';
import { useHoverCapable } from '../hooks/useHoverCapable';
import { usePageNavVisible } from '../hooks/usePageNavVisible';
import { useScrollLock } from '../hooks/useScrollLock';

// Grace period so a small slip of the cursor does not slam the drawer shut.
const CLOSE_DELAY_MS = 120;

export default function EdgeDrawer({ viewKey, activeSection }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const hoverCapable = useHoverCapable();
  // The handle only earns its place once the page's own top buttons have scrolled out of sight.
  const navVisible = usePageNavVisible(pathname);
  const panelId = useId();
  const closeTimer = useRef(null);
  const handleRef = useRef(null);
  const panelRef = useRef(null);
  const openedByKeyboard = useRef(false);

  const configs = useNavConfig();
  const config = configs[viewKey] || configs['beranda'];
  const tabbed = isTabView(viewKey);
  const open = isOpen && !navVisible;

  // Cursor devices dim the page and freeze it while the drawer is open; touch devices do neither.
  useScrollLock(open && hoverCapable);

  const cancelClose = () => clearTimeout(closeTimer.current);
  const openDrawer = () => {
    cancelClose();
    openedByKeyboard.current = false;
    setIsOpen(true);
  };
  const closeDrawer = () => {
    cancelClose();
    openedByKeyboard.current = false;
    // Focus inside a panel that is about to go inert would fall back to <body>.
    if (panelRef.current?.contains(document.activeElement)) handleRef.current?.focus({ preventScroll: true });
    setIsOpen(false);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setIsOpen(false), CLOSE_DELAY_MS);
  };

  // A new page, or the top buttons coming back into view, starts the drawer closed.
  // Adjusted during render, the way React recommends, instead of in an effect.
  const resetKey = `${pathname}|${navVisible}`;
  const [seenResetKey, setSeenResetKey] = useState(resetKey);
  if (seenResetKey !== resetKey) {
    setSeenResetKey(resetKey);
    setIsOpen(false);
  }

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return undefined;

    if (openedByKeyboard.current) {
      panelRef.current?.querySelector('.react-edge-item')?.focus({ preventScroll: true });
      openedByKeyboard.current = false;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const handleHandleClick = (event) => {
    // detail is 0 for a keyboard-triggered click.
    const byKeyboard = event.detail === 0;
    if (hoverCapable && !byKeyboard) {
      // Hovering already opened it, so a mouse click must not toggle it shut again.
      openDrawer();
    } else if (open) {
      closeDrawer();
    } else {
      openDrawer();
      openedByKeyboard.current = byKeyboard;
    }
  };

  const handleItemClick = (e, targetId) => {
    // Ctrl/Cmd/Shift/middle-click open the link the browser's own way.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    closeDrawer();
    if (tabbed) {
      navigate(pathForView(viewKey, targetId));
    } else {
      // Next frame: on cursor devices the scroll lock is released by then, so the smooth scroll is not cut short.
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      // Replace, so a jump between sections of one page does not fill the back
      // stack the way a jump between pages does.
      navigate(`${pathname}#${targetId}`, { replace: true });
    }
  };

  return (
    <>
      {open && (
        <div
          className={`react-edge-backdrop ${hoverCapable ? 'is-dimmed' : ''}`}
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      <div
        className={`react-edge-zone ${open ? 'is-open' : ''}`}
        data-input={hoverCapable ? 'mouse' : 'touch'}
        onMouseEnter={hoverCapable ? openDrawer : undefined}
        onMouseLeave={hoverCapable ? closeSoon : undefined}
        // Tabbing out of the drawer must not leave it open, dimmed and locking the page behind.
        onBlur={(e) => {
          if (open && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) closeDrawer();
        }}
        style={{ zIndex: 10002 }}
      >
        {/* Edge Tab Handle; side follows .react-edge-handle (left on desktop, right on phones) */}
        <button
          type="button"
          ref={handleRef}
          className={`react-edge-handle ${navVisible ? 'is-hidden' : ''}`}
          onClick={handleHandleClick}
          aria-expanded={open}
          aria-controls={panelId}
          inert={navVisible}
          title="Daftar Isi Halaman"
        >
          <i className="fa-solid fa-compass" aria-hidden="true" style={{ color: 'var(--brand-accent)', fontSize: '15px' }}></i>
          <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em' }}>DAFTAR ISI</span>
        </button>

        {/* Frosted Glass Floating Drawer */}
        <nav
          id={panelId}
          ref={panelRef}
          className="react-edge-drawer"
          aria-label={config.drawerTitle}
          inert={!open}
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
                <i className={config.icon} aria-hidden="true"></i>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{config.drawerTitle}</span>
            </div>
            <div className="react-edge-header-btns">
              <button
                type="button"
                className="react-edge-close"
                onClick={closeDrawer}
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
                aria-label="Tutup daftar isi"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          <div className="react-edge-content" style={{ padding: '8px 16px 16px' }}>
            {config.sections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={tabbed ? pathForView(viewKey, sec.id) : `#${sec.id}`}
                  className={`react-edge-item ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => handleItemClick(e, sec.id)}
                  style={{
                    borderRadius: 'var(--radius-pill)',
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontWeight: isActive ? 800 : 600
                  }}
                >
                  <i className={sec.icon || 'fa-solid fa-circle-dot'} aria-hidden="true" style={{ width: '16px', textAlign: 'center' }}></i>
                  <span style={{ flexGrow: 1 }}>{sec.label}</span>
                  {isActive && <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: '10px' }}></i>}
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
        </nav>
      </div>
    </>
  );
}
