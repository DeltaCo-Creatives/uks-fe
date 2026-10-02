import { useState } from 'react';
import ContentPlaceholder from '@/components/ContentPlaceholder';
import useCollapse from '@/hooks/useCollapse';
import TriasOfficialText from './TriasOfficialText';
import { TRIAS_SOURCE, triasItemSummaries } from '@/data/portalData';
import { FOCUS_RING } from '../styles';

const FALLBACK_SUMMARY = { icon: 'fa-solid fa-circle-info', short: '', summary: null, facts: [] };

function FactTiles({ facts, pillar }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
      {facts.map((fact) => (
        <div key={fact.label} className="flex items-center gap-3 rounded-soft px-4 py-3.5" style={{ background: pillar.bgBadge }}>
          <i className={`${fact.icon} w-[22px] shrink-0 text-center text-[18px]`} style={{ color: pillar.color }} aria-hidden="true"></i>
          <div>
            <span className="block text-[12px] font-extrabold tracking-[0.05em] uppercase" style={{ color: pillar.color }}>{fact.label}</span>
            <span className="block text-[14px] leading-[1.45] font-semibold text-ink">{fact.value}</span>
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
      className={`overflow-hidden rounded-card border-[1.5px] bg-card [transition:var(--ease)] hover:border-[var(--pillar-color)] ${isOpen ? 'border-[var(--pillar-color)] shadow-raised' : 'border-line'}`}
      style={{ '--pillar-color': pillar.color }}
    >
      <button
        type="button"
        className={`flex min-h-[84px] w-full cursor-pointer items-center gap-[18px] px-6 py-[18px] text-left text-ink max-[600px]:gap-3 max-[600px]:px-4 max-[600px]:py-3.5 ${FOCUS_RING}`}
        aria-expanded={isOpen} aria-controls={panelId} onClick={handleToggle}>
        <span className="flex size-12 shrink-0 items-center justify-center rounded-soft text-[20px] max-[600px]:size-[42px] max-[600px]:text-[18px]" style={{ background: pillar.bgBadge, color: pillar.color }} aria-hidden="true">
          <i className={info.icon}></i>
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="font-display text-[17px] leading-[1.35] font-extrabold max-[600px]:text-[16px]">
            <span className="mr-2.5 font-bold text-ink-muted">{String(index + 1).padStart(2, '0')}</span>
            {item.title}
          </span>
          {!isOpen && info.short && <span className="text-[14px] leading-[1.5] text-ink-muted">{info.short}</span>}
        </span>
        <i
          className={`fa-solid fa-chevron-down shrink-0 [transition:transform_0.3s_ease] ${isOpen ? 'text-[var(--pillar-color)] [transform:rotate(180deg)]' : 'text-ink-muted'}`}
          aria-hidden="true"
        ></i>
      </button>

      {panelMounted && (
        <div ref={panelRef}>
          <div id={panelId} role="region" aria-label={item.title} className="flex flex-col gap-[18px] pr-6 pb-6 pl-[90px] max-[600px]:px-4 max-[600px]:pb-5">
            {info.summary && <p className="text-[17px] leading-[1.7] text-ink">{info.summary}</p>}

            {item.placeholder && (
              <ContentPlaceholder
                source={TRIAS_SOURCE}
                title={item.title}
                note="Deskripsi, waktu, tempat, pelaksana, kegiatan, sarana, dan langkah-langkah untuk sub-program ini akan ditambahkan."
              />
            )}

            {info.facts.length > 0 && <FactTiles facts={info.facts} pillar={pillar} />}

            {hasFullText && (
              <div className="flex flex-col">
                <button
                  type="button"
                  className={`btn-pill secondary min-h-[44px] cursor-pointer self-start px-5! py-2.5! text-[14px]! ${FOCUS_RING}`}
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
