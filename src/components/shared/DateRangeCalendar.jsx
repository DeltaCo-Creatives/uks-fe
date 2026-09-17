import { useState } from 'react';
import { MONTHS_ID_LIST, isSameDay } from '../../utils/dateID';

const WEEKDAYS_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function buildMonthGrid(viewYear, viewMonth) {
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const leadingBlanks = firstOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(viewYear, viewMonth, day));
  return cells;
}

/**
 * A single-month range picker: first click sets the start day, second click
 * sets the end (order-independent), a click after that starts a new range.
 * Days that have real content are marked with a dot.
 */
export default function DateRangeCalendar({ range, onChange, markedDates, onClose }) {
  const anchor = range.start || new Date();
  const [viewYear, setViewYear] = useState(anchor.getFullYear());
  const [viewMonth, setViewMonth] = useState(anchor.getMonth());

  const cells = buildMonthGrid(viewYear, viewMonth);

  const goToPrevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };
  const goToNextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  const handleDayClick = (day) => {
    const clicked = startOfDay(day);
    if (!range.start || (range.start && range.end)) {
      onChange({ start: clicked, end: null });
    } else if (clicked < range.start) {
      onChange({ start: clicked, end: range.start });
    } else {
      onChange({ start: range.start, end: clicked });
    }
  };

  const isMarked = (day) => markedDates.some((d) => isSameDay(d, day));
  const isInRange = (day) => range.start && range.end && day > range.start && day < range.end;
  const isEdge = (day) => (range.start && isSameDay(day, range.start)) || (range.end && isSameDay(day, range.end));

  return (
    <div className="date-range-popover" role="dialog" aria-label="Pilih rentang tanggal">
      <div className="date-range-header">
        <button type="button" className="date-range-nav" onClick={goToPrevMonth} aria-label="Bulan sebelumnya">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <span className="date-range-month-label">{MONTHS_ID_LIST[viewMonth]} {viewYear}</span>
        <button type="button" className="date-range-nav" onClick={goToNextMonth} aria-label="Bulan berikutnya">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div className="date-range-weekdays">
        {WEEKDAYS_ID.map((label) => <span key={label}>{label}</span>)}
      </div>

      <div className="date-range-grid">
        {cells.map((day, i) => {
          if (!day) return <span key={`blank-${i}`} className="date-cell date-cell-blank" />;
          const marked = isMarked(day);
          const edge = isEdge(day);
          const inRange = isInRange(day);
          return (
            <button
              key={day.toISOString()}
              type="button"
              className={`date-cell${edge ? ' date-cell-edge' : ''}${inRange ? ' date-cell-in-range' : ''}${marked ? ' date-cell-marked' : ''}`}
              onClick={() => handleDayClick(day)}
              aria-pressed={edge}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      <div className="date-range-footer">
        <button
          type="button"
          className="date-range-clear"
          onClick={() => onChange({ start: null, end: null })}
          disabled={!range.start && !range.end}
        >
          Bersihkan
        </button>
        <button type="button" className="date-range-apply" onClick={onClose}>
          Selesai
        </button>
      </div>
    </div>
  );
}
