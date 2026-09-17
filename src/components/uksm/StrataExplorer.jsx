import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../hooks/useCollapse';
import { strataCategories, strataLevels } from '../../data/portalData';
import StrataCategoryCard from './StrataCategoryCard';

const countIndicators = (strata) => Object.values(strata.requirementsSD).reduce((sum, list) => sum + list.length, 0);

/** The 4 strata as a rising ladder of buttons; the selected one drives the panel below. */
function StrataLadder({ selectedKey, onSelect }) {
  return (
    <div className="strat-ladder" role="group" aria-label="Pilih strata">
      {strataLevels.map((strata, idx) => {
        const isActive = strata.key === selectedKey;
        const count = countIndicators(strata);
        return (
          <button
            key={strata.key}
            type="button"
            className={`strat-step ${isActive ? 'is-active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onSelect(strata.key)}
            style={{ '--strata-color': strata.color, '--strata-bg': strata.bgColor, '--step-rise': `${idx * 16}px` }}
          >
            <span className="strat-step-code">Strata {strata.code}</span>
            <span className="strat-step-name">{strata.name}</span>
            <span className="strat-step-count">{idx === 0 ? `${count} indikator` : `+${count} indikator`}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * UKS/M ▸ Stratifikasi ▸ Indikator: pick a strata, see only what it adds,
 * grouped by the 4 indicator areas.
 */
export default function StrataExplorer() {
  const [selectedKey, setSelectedKey] = useState(strataLevels[0].key);
  const index = strataLevels.findIndex((s) => s.key === selectedKey);
  const strata = strataLevels[index];
  const previous = strataLevels[index - 1];
  const next = strataLevels[index + 1];
  const count = countIndicators(strata);
  const panelRef = useRef(null);
  const shownKey = useRef(selectedKey);

  // Soft fade-up of the new strata's content; the first render and reduced-motion users get none.
  useGSAP(() => {
    if (shownKey.current === selectedKey) return;
    shownKey.current = selectedKey;
    if (prefersReducedMotion()) return;
    gsap.from('.strat-panel-head, .strat-category-card', {
      opacity: 0,
      y: 12,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.05,
      clearProps: 'opacity,transform'
    });
  }, { dependencies: [selectedKey], scope: panelRef });

  return (
    <div className="strat-explorer">
      <StrataLadder selectedKey={selectedKey} onSelect={setSelectedKey} />

      <div ref={panelRef} className="strat-panel" style={{ borderTopColor: strata.color }} aria-live="polite">
        <div className="strat-panel-head">
          <div>
            <span className="indicator-card-tag" style={{ background: strata.bgColor, color: strata.color }}>
              STRATA {strata.code} · TINGKAT {index + 1} DARI {strataLevels.length}
            </span>
            <h3 className="strat-panel-title">{strata.name}</h3>
            <p className="strat-panel-desc">
              {previous
                ? <>Sekolah sudah memenuhi <strong>seluruh indikator strata {previous.name}</strong>, ditambah {count} indikator berikut.</>
                : <>Sekolah memenuhi seluruh {count} indikator berikut.</>}
            </p>
          </div>
        </div>

        <div className="strat-category-grid" key={strata.key}>
          {strataCategories.map((category, idx) => (
            <StrataCategoryCard
              key={category.id}
              category={category}
              index={idx}
              requirements={strata.requirementsSD[category.id]}
              strata={strata}
            />
          ))}
        </div>

        {next && (
          <button type="button" className="btn-pill secondary strat-next-btn" onClick={() => setSelectedKey(next.key)}>
            Lanjut ke strata {next.name} <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        )}
      </div>
    </div>
  );
}
