import { useRef, useState } from 'react';
import { mitraFields, mitraSupportTypes, partnersByYear } from '../../data/portalData';

const NEXT_KEYS = ['ArrowRight', 'ArrowDown'];
const PREV_KEYS = ['ArrowLeft', 'ArrowUp'];

/**
 * Partner directory by cohort year as ARIA tabs (roving tabindex, arrow/Home/End).
 * Names are plain text in columns: they are not links, so nothing looks clickable.
 */
export default function MitraKami() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const cohort = partnersByYear[activeIndex];

  const selectTab = (index) => {
    const next = (index + partnersByYear.length) % partnersByYear.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event) => {
    if (NEXT_KEYS.includes(event.key)) selectTab(activeIndex + 1);
    else if (PREV_KEYS.includes(event.key)) selectTab(activeIndex - 1);
    else if (event.key === 'Home') selectTab(0);
    else if (event.key === 'End') selectTab(partnersByYear.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <section id="sec-mitra-kami" className="section mitra-section">
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Mitra Kami</span>
          <h2 className="section-title">Lembaga yang sudah bermitra</h2>
        </div>
      </div>

      <div className="mitra-about-grid" data-gsap="reveal">
        <div>
          <h3 className="mitra-mini-label">Bidang usaha mitra</h3>
          <ul className="mitra-inline-list">
            {mitraFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mitra-mini-label">Bentuk dukungan mitra</h3>
          <ol className="mitra-compact-num">
            {mitraSupportTypes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mitra-card mitra-directory" data-gsap="reveal">
        <div className="mitra-year-tabs" role="tablist" aria-label="Tahun kemitraan" onKeyDown={handleKeyDown}>
          {partnersByYear.map((year, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={year.id}
                ref={(el) => { tabRefs.current[idx] = el; }}
                id={`mitra-year-tab-${year.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="mitra-year-panel"
                tabIndex={isActive ? 0 : -1}
                className={`mitra-year-tab ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                <span className="mitra-year-label">Mitra {year.label}</span>
                <span className="mitra-year-meta">{year.partners.length} lembaga</span>
              </button>
            );
          })}
        </div>

        <div
          id="mitra-year-panel"
          role="tabpanel"
          aria-labelledby={`mitra-year-tab-${cohort.id}`}
          tabIndex={0}
          className="mitra-year-panel"
        >
          {cohort.partners.length === 0 ? (
            <p className="mitra-empty">Belum ada data mitra untuk tahun ini.</p>
          ) : (
            <ol className="mitra-partner-list">
              {cohort.partners.map((name, idx) => (
                <li key={name}>
                  <span className="mitra-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                  <span>{name}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
