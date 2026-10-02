import { useRef } from 'react';

const TAB = 'flex min-h-16 cursor-pointer items-center gap-3 rounded-card px-3 py-2.5 text-left [transition:background-color_0.2s_ease] max-[600px]:gap-2 max-[600px]:p-2';
const TAB_ICON = 'grid size-10 flex-none place-items-center rounded-soft text-[16px] max-[600px]:size-[34px] max-[600px]:text-[14px]';

const NEXT_KEYS = ['ArrowRight', 'ArrowDown'];
const PREV_KEYS = ['ArrowLeft', 'ArrowUp'];

/**
 * The five programs as ARIA tabs (roving tabindex, arrow keys, Home/End).
 *
 * @param {{
 *   programs: Array<{ id: string, navLabel: string, icon: string }>,
 *   activeId: string,
 *   onSelect: (id: string) => void,
 *   pickerRef: import('react').RefObject<HTMLDivElement>
 * }} props
 */
export default function ProgramPicker({ programs, activeId, onSelect, pickerRef }) {
  const tabRefs = useRef({});
  const activeIndex = programs.findIndex((p) => p.id === activeId);

  const selectIndex = (index) => {
    const next = programs[(index + programs.length) % programs.length];
    onSelect(next.id);
    tabRefs.current[next.id]?.focus();
  };

  const handleKeyDown = (event) => {
    if (NEXT_KEYS.includes(event.key)) selectIndex(activeIndex + 1);
    else if (PREV_KEYS.includes(event.key)) selectIndex(activeIndex - 1);
    else if (event.key === 'Home') selectIndex(0);
    else if (event.key === 'End') selectIndex(programs.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <div ref={pickerRef} className="mb-7 grid scroll-mt-24 grid-cols-5 gap-2 rounded-panel bg-card p-2 max-[1100px]:grid-cols-3 max-[600px]:grid-cols-2 max-[600px]:p-1.5" data-page-nav role="tablist" aria-label="Pilih program">
      {programs.map((program, idx) => {
        const selected = program.id === activeId;
        return (
          <button
            key={program.id}
            ref={(el) => { tabRefs.current[program.id] = el; }}
            id={`prog-tab-${program.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls="prog-panel"
            tabIndex={selected ? 0 : -1}
            className={`${TAB} ${selected ? 'bg-ink text-white' : 'bg-transparent text-ink hover:bg-card-alt'}`}
            onClick={() => onSelect(program.id)}
            onKeyDown={handleKeyDown}
          >
            <span className={`${TAB_ICON} ${selected ? 'bg-[rgba(255,255,255,0.12)] text-brand-accent' : 'bg-brand-light text-brand'}`} aria-hidden="true"><i className={program.icon}></i></span>
            <span className="flex min-w-0 flex-col">
              <span className={`text-[12px] font-extrabold ${selected ? 'text-[rgba(255,255,255,0.75)]' : 'text-brand-deep'}`} aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
              <span className="text-[14px] leading-[1.25] font-extrabold">{program.navLabel}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
