import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { gssFocusAreas } from '../../../data/portalData';
import { prefersReducedMotion } from '../../../hooks/useCollapse';
import GssFocusPanel from './GssFocusPanel';

const NEXT_KEYS = ['ArrowDown', 'ArrowRight'];
const PREV_KEYS = ['ArrowUp', 'ArrowLeft'];

/**
 * The 5 focus areas as ARIA tabs (roving tabindex, arrow/Home/End keys).
 * Switching fades the new panel's blocks in so the change reads as a change.
 */
export default function GssFocusTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const panelRef = useRef(null);
  const shownIndex = useRef(activeIndex);
  const focus = gssFocusAreas[activeIndex];

  useGSAP(() => {
    if (shownIndex.current === activeIndex) return;
    shownIndex.current = activeIndex;
    if (prefersReducedMotion()) return;
    gsap.from('.gss-panel-block', {
      opacity: 0,
      y: 10,
      duration: 0.35,
      ease: 'power2.out',
      stagger: 0.04,
      clearProps: 'opacity,transform'
    });
  }, { dependencies: [activeIndex], scope: panelRef });

  const selectTab = (index) => {
    const next = (index + gssFocusAreas.length) % gssFocusAreas.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event) => {
    if (NEXT_KEYS.includes(event.key)) selectTab(activeIndex + 1);
    else if (PREV_KEYS.includes(event.key)) selectTab(activeIndex - 1);
    else if (event.key === 'Home') selectTab(0);
    else if (event.key === 'End') selectTab(gssFocusAreas.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <div className="gss-focus-layout">
      <div className="gss-tablist" role="tablist" aria-label="Fokus Sekolah Sehat" aria-orientation="vertical" onKeyDown={handleKeyDown}>
        {gssFocusAreas.map((area, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={area.id}
              ref={(el) => { tabRefs.current[idx] = el; }}
              id={`gss-tab-${area.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="gss-focus-panel"
              tabIndex={isActive ? 0 : -1}
              className={`gss-tab ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <span className="gss-tab-icon" aria-hidden="true"><i className={area.icon}></i></span>
              <span className="gss-tab-text">
                <span className="gss-tab-title">{area.title}</span>
                <span className="gss-tab-meta">{area.activities.length} kegiatan</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        id="gss-focus-panel"
        role="tabpanel"
        aria-labelledby={`gss-tab-${focus.id}`}
        tabIndex={0}
        className="gss-panel"
      >
        <GssFocusPanel focus={focus} index={activeIndex} total={gssFocusAreas.length} />
      </div>
    </div>
  );
}
