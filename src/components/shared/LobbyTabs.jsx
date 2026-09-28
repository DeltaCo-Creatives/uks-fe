import { useEffect, useRef } from 'react';

/**
 * Section switcher for the Informasi, Publikasi and Program pages. Below a tablet the
 * tabs scroll in one row instead of wrapping, so five of them cost one band of
 * the screen rather than three.
 *
 * `pageNav` marks these tabs as the page's own top navigation, which the Daftar Isi handle watches.
 *
 * @param {{ tabs: {id: string, icon: string, label: string}[], activeId: string, onSelect: (id: string) => void, label: string, pageNav?: boolean }} props
 */
export default function LobbyTabs({ tabs, activeId, onSelect, label, pageNav = false }) {
  const activeRef = useRef(null);

  // The current tab can start out of frame on a phone; block:'nearest' keeps the page still.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [activeId]);

  return (
    <nav className="lobby-tabs" aria-label={label} data-gsap="reveal" data-page-nav={pageNav ? '' : undefined}>
      <div className="lobby-tabs-track">
        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              ref={isActive ? activeRef : null}
              type="button"
              className={`lobby-tab ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(tab.id)}
              aria-current={isActive ? 'true' : undefined}
            >
              <i className={tab.icon} aria-hidden="true"></i>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
