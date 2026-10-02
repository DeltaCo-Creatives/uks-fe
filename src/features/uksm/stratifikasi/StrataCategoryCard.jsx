import { useState } from 'react';
import useCollapse from '@/hooks/useCollapse';

import { FOCUS_RING } from '../styles';

const PREVIEW_COUNT = 4;

function ChecklistItems({ items, color, className = '' }) {
  return (
    <ul className={`m-0 flex list-none flex-col gap-2.5 p-0 ${className}`}>
      {items.map((req) => (
        <li key={req} className="flex items-start gap-2.5 text-[15px] leading-[1.6] text-ink">
          <i className="fa-solid fa-circle-check mt-[5px] shrink-0 text-[13px]" style={{ color }} aria-hidden="true"></i>
          <span>{req}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * One indicator area (e.g. Pelayanan kesehatan) for the selected strata:
 * a checklist that shows the first few items and expands on request.
 *
 * @param {{ category: object, index: number, requirements: string[], strata: object }} props
 */
export default function StrataCategoryCard({ category, index, requirements, strata }) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = requirements.length - PREVIEW_COUNT;
  const preview = requirements.slice(0, PREVIEW_COUNT);
  const extra = requirements.slice(PREVIEW_COUNT);
  const { ref: extraRef, mounted: extraMounted } = useCollapse(expanded);
  const listId = `strat-list-${strata.key}-${category.id}`;

  return (
    <div className="strat-category-card flex flex-col gap-3.5 rounded-soft bg-card-alt px-5 py-[18px]">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-[50%] text-[15px]" style={{ background: strata.bgColor, color: strata.color }} aria-hidden="true">
          <i className={category.icon}></i>
        </span>
        <h4 className="m-0 flex-1 text-[16px] leading-[1.35] font-extrabold">{index + 1}. {category.title}</h4>
        <span className="min-w-[30px] rounded-[999px] px-2.5 py-[3px] text-center text-[13px] font-extrabold" style={{ background: strata.bgColor, color: strata.color }}>
          {requirements.length}
        </span>
      </div>

      <div id={listId}>
        <ChecklistItems items={preview} color={strata.color} />
        {extraMounted && (
          <div ref={extraRef}>
            <ChecklistItems items={extra} color={strata.color} className="pt-2.5" />
          </div>
        )}
      </div>

      {hiddenCount > 0 && (
        <button
          type="button"
          className={`inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 self-start px-1 text-[14px] font-bold text-ink ${FOCUS_RING}`}
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? 'Tampilkan lebih sedikit' : `Tampilkan ${hiddenCount} lainnya`}
          <i className={`fa-solid fa-chevron-${expanded ? 'up' : 'down'}`} style={{ color: strata.color }} aria-hidden="true"></i>
        </button>
      )}
    </div>
  );
}
