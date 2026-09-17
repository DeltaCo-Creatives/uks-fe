import { useState } from 'react';
import ContentPlaceholder from '../ContentPlaceholder';
import useCollapse from '../../hooks/useCollapse';
import TriasOfficialText from './TriasOfficialText';
import { TRIAS_SOURCE, triasItemSummaries } from '../../data/portalData';

const FALLBACK_SUMMARY = { icon: 'fa-solid fa-circle-info', short: '', summary: null, facts: [] };

function FactTiles({ facts, pillar }) {
  return (
    <div className="trias-facts">
      {facts.map((fact) => (
        <div key={fact.label} className="trias-fact" style={{ background: pillar.bgBadge }}>
          <i className={fact.icon} style={{ color: pillar.color }} aria-hidden="true"></i>
          <div>
            <span className="trias-fact-label" style={{ color: pillar.color }}>{fact.label}</span>
            <span className="trias-fact-value">{fact.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * One sub-program row: icon, number, title and a one-line summary. Opening it
 * shows a plain summary, key facts, and the full official text on request.
 *
 * @param {{ item: object, index: number, pillar: object, isOpen: boolean, onToggle: () => void }} props
 */
export default function TriasAccordionItem({ item, index, pillar, isOpen, onToggle }) {
  const [showFull, setShowFull] = useState(false);
  const info = triasItemSummaries[item.id] ?? FALLBACK_SUMMARY;
  const panelId = `trias-panel-${item.id}`;
  const hasFullText = Boolean(item.description) || item.sections.length > 0;
  const { ref: panelRef, mounted: panelMounted } = useCollapse(isOpen, { keepInView: true });
  const { ref: fullTextRef, mounted: fullTextMounted } = useCollapse(showFull);

  const handleToggle = () => {
    setShowFull(false);
    onToggle();
  };

  return (
    <div
      id={`trias-item-${item.id}`}
      className={`trias-accordion-item ${isOpen ? 'is-open' : ''}`}
      style={{ '--pillar-color': pillar.color }}
    >
      <button type="button" className="trias-accordion-trigger" aria-expanded={isOpen} aria-controls={panelId} onClick={handleToggle}>
        <span className="trias-accordion-icon" style={{ background: pillar.bgBadge, color: pillar.color }} aria-hidden="true">
          <i className={info.icon}></i>
        </span>
        <span className="trias-accordion-heading">
          <span className="trias-accordion-title">
            <span className="trias-accordion-num">{String(index + 1).padStart(2, '0')}</span>
            {item.title}
          </span>
          {!isOpen && info.short && <span className="trias-accordion-short">{info.short}</span>}
        </span>
        <i className="fa-solid fa-chevron-down trias-accordion-chevron" aria-hidden="true"></i>
      </button>

      {panelMounted && (
        <div ref={panelRef}>
          <div id={panelId} role="region" aria-label={item.title} className="trias-accordion-panel">
            {info.summary && <p className="trias-summary">{info.summary}</p>}

            {item.placeholder && (
              <ContentPlaceholder
                source={TRIAS_SOURCE}
                title={item.title}
                note="Deskripsi, waktu, tempat, pelaksana, kegiatan, sarana, dan langkah-langkah untuk sub-program ini akan ditambahkan."
              />
            )}

            {info.facts.length > 0 && <FactTiles facts={info.facts} pillar={pillar} />}

            {hasFullText && (
              <div className="trias-full">
                <button
                  type="button"
                  className="btn-pill secondary trias-full-toggle"
                  aria-expanded={showFull}
                  onClick={() => setShowFull((open) => !open)}
                  style={{ color: pillar.color }}
                >
                  {showFull ? 'Sembunyikan penjelasan lengkap' : 'Baca penjelasan lengkap'}
                  <i className={`fa-solid fa-chevron-${showFull ? 'up' : 'down'}`} aria-hidden="true"></i>
                </button>
                {fullTextMounted && (
                  <div ref={fullTextRef}>
                    <TriasOfficialText item={item} pillar={pillar} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
