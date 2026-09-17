import { useState } from 'react';
import useCollapse from '../../hooks/useCollapse';

const PREVIEW_COUNT = 4;

function ChecklistItems({ items, color, className = '' }) {
  return (
    <ul className={`strat-checklist ${className}`}>
      {items.map((req) => (
        <li key={req}>
          <i className="fa-solid fa-circle-check" style={{ color }} aria-hidden="true"></i>
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
    <div className="strat-category-card">
      <div className="strat-category-head">
        <span className="strat-category-icon" style={{ background: strata.bgColor, color: strata.color }} aria-hidden="true">
          <i className={category.icon}></i>
        </span>
        <h4 className="strat-category-title">{index + 1}. {category.title}</h4>
        <span className="strat-category-count" style={{ background: strata.bgColor, color: strata.color }}>
          {requirements.length}
        </span>
      </div>

      <div id={listId}>
        <ChecklistItems items={preview} color={strata.color} />
        {extraMounted && (
          <div ref={extraRef}>
            <ChecklistItems items={extra} color={strata.color} className="strat-checklist-extra" />
          </div>
        )}
      </div>

      {hiddenCount > 0 && (
        <button
          type="button"
          className="strat-more-btn"
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
