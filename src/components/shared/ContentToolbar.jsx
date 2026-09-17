import { useEffect, useRef, useState } from 'react';
import { formatDateID } from '../../utils/dateID';
import DateRangeCalendar from './DateRangeCalendar';

function rangeLabel(range) {
  if (!range.start && !range.end) return 'Tanggal';
  if (range.start && !range.end) return formatDateID(range.start);
  return `${formatDateID(range.start)} – ${formatDateID(range.end)}`;
}

/**
 * Search + sort + group-by + date-range toolbar shared by the portal's
 * news-like content lists. Pair with useContentToolbar for the filtering logic.
 */
export default function ContentToolbar({
  searchPlaceholder,
  query,
  onQueryChange,
  sortDir,
  onSortChange,
  groupOptions,
  groupKey,
  onGroupChange,
  dateRange,
  onDateRangeChange,
  markedDates,
  resultCount,
  totalCount
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarWrapRef = useRef(null);

  useEffect(() => {
    if (!calendarOpen) return undefined;

    const handlePointerDown = (e) => {
      if (calendarWrapRef.current && !calendarWrapRef.current.contains(e.target)) {
        setCalendarOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setCalendarOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [calendarOpen]);

  const hasDateFilter = Boolean(dateRange.start || dateRange.end);
  const hasAnyFilter = Boolean(query.trim()) || hasDateFilter;

  return (
    <div className="content-toolbar">
      <div className="content-toolbar-row">
        <div className="content-toolbar-search">
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
          />
          {query && (
            <button
              type="button"
              className="content-toolbar-clear"
              onClick={() => onQueryChange('')}
              aria-label="Hapus pencarian"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        <div className="content-toolbar-controls">
          {groupOptions.length > 0 && (
            <label className="content-toolbar-select">
              <span>Kelompokkan</span>
              <select value={groupKey} onChange={(e) => onGroupChange(e.target.value)}>
                <option value="none">Tidak dikelompokkan</option>
                {groupOptions.map((g) => (
                  <option key={g.key} value={g.key}>{g.label}</option>
                ))}
              </select>
            </label>
          )}

          <button
            type="button"
            className="content-toolbar-pill-btn"
            onClick={() => onSortChange(sortDir === 'desc' ? 'asc' : 'desc')}
            aria-label={sortDir === 'desc' ? 'Urutan: terbaru lebih dulu' : 'Urutan: terlama lebih dulu'}
          >
            <i className={sortDir === 'desc' ? 'fa-solid fa-arrow-down-wide-short' : 'fa-solid fa-arrow-up-wide-short'}></i>
            {sortDir === 'desc' ? 'Terbaru' : 'Terlama'}
          </button>

          <div className="content-toolbar-calendar-wrap" ref={calendarWrapRef}>
            <button
              type="button"
              className={`content-toolbar-pill-btn${hasDateFilter ? ' content-toolbar-pill-btn-active' : ''}`}
              onClick={() => setCalendarOpen((open) => !open)}
              aria-haspopup="dialog"
              aria-expanded={calendarOpen}
            >
              <i className="fa-regular fa-calendar"></i>
              {rangeLabel(dateRange)}
            </button>
            {calendarOpen && (
              <DateRangeCalendar
                range={dateRange}
                onChange={onDateRangeChange}
                markedDates={markedDates}
                onClose={() => setCalendarOpen(false)}
              />
            )}
          </div>
        </div>
      </div>

      {hasAnyFilter && (
        <p className="content-toolbar-summary">
          Menampilkan {resultCount} dari {totalCount} konten
          <button type="button" className="content-toolbar-reset" onClick={() => { onQueryChange(''); onDateRangeChange({ start: null, end: null }); }}>
            Hapus filter
          </button>
        </p>
      )}
    </div>
  );
}
