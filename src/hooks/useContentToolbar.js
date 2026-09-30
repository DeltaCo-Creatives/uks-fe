import { useMemo, useState } from 'react';
import { parseIndonesianDate } from '../utils/dateID';

/**
 * Case-insensitive substring match of a query against an item's search fields.
 * An empty or whitespace query matches everything.
 *
 * @param {object} item
 * @param {(string | ((item: object) => string))[]} searchFields - keys, or functions returning the text to search
 * @param {string} query
 */
export function matchesQuery(item, searchFields, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = searchFields
    .map((field) => (typeof field === 'function' ? field(item) : item[field]) ?? '')
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
}

/**
 * Search + sort-by-date + group-by + date-range filtering shared by the
 * news-like content lists (Warta, UPT Bercerita, Praktik Baik) and Publikasi.
 *
 * @param {object} config
 * @param {object[]} config.items - source list
 * @param {string | null} [config.dateField] - key on each item holding an Indonesian date string; null disables date parsing, date-range filtering and sorting, so items keep the source order
 * @param {(string | ((item: object) => string))[]} config.searchFields - keys, or functions returning the text, searched against the query
 * @param {{key: string, label: string, getGroup: (item: object) => string}[]} [config.groupOptions]
 */
export function useContentToolbar({ items, dateField = 'date', searchFields, groupOptions = [] }) {
  const [query, setQuery] = useState('');
  const [sortDir, setSortDir] = useState('desc');
  const [groupKey, setGroupKey] = useState('none');
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const withDates = useMemo(
    () => items.map((item) => ({ item, parsedDate: dateField ? parseIndonesianDate(item[dateField]) : null })),
    [items, dateField]
  );

  const filtered = useMemo(() => {
    return withDates.filter(({ item, parsedDate }) => {
      if (!matchesQuery(item, searchFields, query)) return false;
      if (!dateField) return true;
      if (dateRange.start && (!parsedDate || parsedDate < dateRange.start)) return false;
      if (dateRange.end && (!parsedDate || parsedDate > dateRange.end)) return false;
      return true;
    });
  }, [withDates, query, searchFields, dateRange, dateField]);

  const sorted = useMemo(() => {
    if (!dateField) return filtered.map((entry) => entry.item);
    const copy = [...filtered];
    copy.sort((a, b) => {
      const timeA = a.parsedDate ? a.parsedDate.getTime() : 0;
      const timeB = b.parsedDate ? b.parsedDate.getTime() : 0;
      return sortDir === 'desc' ? timeB - timeA : timeA - timeB;
    });
    return copy.map((entry) => entry.item);
  }, [filtered, sortDir, dateField]);

  const activeGroupOption = groupOptions.find((g) => g.key === groupKey);

  const groups = useMemo(() => {
    if (!activeGroupOption) return [{ label: null, items: sorted }];
    const map = new Map();
    sorted.forEach((item) => {
      const label = activeGroupOption.getGroup(item) || 'Lainnya';
      if (!map.has(label)) map.set(label, []);
      map.get(label).push(item);
    });
    return Array.from(map.entries()).map(([label, groupItems]) => ({ label, items: groupItems }));
  }, [sorted, activeGroupOption]);

  const datesWithContent = useMemo(
    () => withDates.map((entry) => entry.parsedDate).filter(Boolean),
    [withDates]
  );

  return {
    query,
    setQuery,
    sortDir,
    setSortDir,
    groupKey,
    setGroupKey,
    dateRange,
    setDateRange,
    groups,
    resultCount: sorted.length,
    totalCount: items.length,
    datesWithContent
  };
}
