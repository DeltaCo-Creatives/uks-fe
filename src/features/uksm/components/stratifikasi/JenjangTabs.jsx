import { useRef } from 'react';
import { FOCUS_DARK } from '../profil/styles';

const TAB = `min-h-12 cursor-pointer rounded-soft px-3 py-2.5 text-center text-[15px] font-extrabold [transition:background-color_0.2s_ease] max-[600px]:px-1 max-[600px]:text-[14px] ${FOCUS_DARK}`;
const TAB_IDLE = 'bg-transparent text-ink hover:bg-card-alt';
const TAB_ACTIVE = 'bg-ink text-white';

/**
 * The jenjang as ARIA tabs (roving tabindex, arrow keys, Home/End) over the panel they switch,
 * which is passed as children.
 *
 * @param {{ jenjang: Array<{ slug: string, label: string }>, activeSlug: string, onSelect: (slug: string) => void, children: import('react').ReactNode }} props
 */
export default function JenjangTabs({ jenjang, activeSlug, onSelect, children }) {
  const tabRefs = useRef({});
  const activeIndex = jenjang.findIndex((row) => row.slug === activeSlug);

  const selectIndex = (index) => {
    const next = jenjang[(index + jenjang.length) % jenjang.length];
    onSelect(next.slug);
    tabRefs.current[next.slug]?.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') selectIndex(activeIndex + 1);
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') selectIndex(activeIndex - 1);
    else if (event.key === 'Home') selectIndex(0);
    else if (event.key === 'End') selectIndex(jenjang.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <>
      <div className="mb-4 grid auto-cols-fr grid-flow-col gap-1.5 rounded-card bg-card p-1.5" role="tablist" aria-label="Pilih jenjang">
        {jenjang.map((row) => {
          const selected = row.slug === activeSlug;
          return (
            <button
              key={row.slug}
              ref={(el) => { tabRefs.current[row.slug] = el; }}
              id={`strat-tab-${row.slug}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="strat-jenjang-panel"
              tabIndex={selected ? 0 : -1}
              className={`${TAB} ${selected ? TAB_ACTIVE : TAB_IDLE}`}
              onClick={() => onSelect(row.slug)}
              onKeyDown={handleKeyDown}
            >
              {row.label}
            </button>
          );
        })}
      </div>

      <div id="strat-jenjang-panel" role="tabpanel" aria-labelledby={`strat-tab-${activeSlug}`}>
        {children}
      </div>
    </>
  );
}
