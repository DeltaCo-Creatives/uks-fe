import { useEffect, useId, useRef, useState } from 'react';
import './select-menu.css';

/**
 * Styled replacement for a native <select> (whose open list is drawn by the
 * browser and cannot be styled). Select-only combobox: focus stays on the
 * button; arrows, Home/End, Enter/Space and Escape work as on a native select.
 *
 * @param {{ value: string, label: string }[]} options
 */
export default function SelectMenu({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const id = useId();
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const show = () => { setActive(selectedIndex); setOpen(true); };
  const pick = (i) => { onChange(options[i].value); setOpen(false); };

  const onKeyDown = (e) => {
    const last = options.length - 1;
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'Tab') { setOpen(false); return; }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(e.key)) return;
    e.preventDefault();
    if (!open) { show(); return; }
    if (e.key === 'Enter' || e.key === ' ') pick(active);
    else if (e.key === 'ArrowDown') setActive((i) => Math.min(last, i + 1));
    else if (e.key === 'ArrowUp') setActive((i) => Math.max(0, i - 1));
    else if (e.key === 'Home') setActive(0);
    else setActive(last);
  };

  return (
    <div className="select-menu" ref={wrapRef}>
      <span className="select-menu-label" id={`${id}-label`}>{label}</span>
      <button
        type="button"
        className="select-menu-btn"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label ${id}-btn`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        id={`${id}-btn`}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
      >
        <span>{options[selectedIndex]?.label}</span>
        <i className="fa-solid fa-chevron-down select-menu-chevron" aria-hidden="true"></i>
      </button>

      {open && (
        <ul className="select-menu-list" role="listbox" id={`${id}-list`} aria-labelledby={`${id}-label`}>
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === selectedIndex}
              className={`select-menu-opt${i === active ? ' is-active' : ''}${i === selectedIndex ? ' is-selected' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(i)}
            >
              {o.label}
              {i === selectedIndex && <i className="fa-solid fa-check" aria-hidden="true"></i>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
