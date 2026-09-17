import { useRef } from 'react';

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
    <div ref={pickerRef} className="prog-picker" role="tablist" aria-label="Pilih program">
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
            className={`prog-tab ${selected ? 'is-active' : ''}`}
            onClick={() => onSelect(program.id)}
            onKeyDown={handleKeyDown}
          >
            <span className="prog-tab-icon" aria-hidden="true"><i className={program.icon}></i></span>
            <span className="prog-tab-text">
              <span className="prog-tab-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
              <span className="prog-tab-label">{program.navLabel}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
