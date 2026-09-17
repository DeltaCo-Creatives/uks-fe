import { useMemo, useState } from 'react';
import { parseIndonesianDate } from '../utils/dateID';

/**
 * Search + sort-by-date + group-by + date-range filtering shared by the
 * news-like content lists (Warta, UPT Bercerita, Praktik Baik).
 *
 * @param {object} config
 * @param {object[]} config.items - source list
 * @param {string} [config.dateField] - key on each item holding an Indonesian date string
 * @param {string[]} config.searchFields - keys searched against the query
 * @param {{key: string, label: string, getGroup: (item: object) => string}[]} [config.groupOptions]
 */
export function useContentToolbar({ items, dateField = 'date', searchFields, groupOptions = [] }) {
  const [query, setQuery] = useState('');
  const [sortDir, setSortDir] = useState('desc');
  const [groupKey, setGroupKey] = useState('none');
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const withDates = useMemo(
    () => items.map((item) => ({ item, parsedDate: parseIndonesianDate(item[dateField]) })),
    [items, dateField]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return withDates.filter(({ item, parsedDate }) => {
      if (q) {
        const haystack = searchFields.map((field) => item[field] ?? '').join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (dateRange.start && (!parsedDate || parsedDate < dateRange.start)) return false;
      if (dateRange.end && (!parsedDate || parsedDate > dateRange.end)) return false;
      return true;
    });
  }, [withDates, query, searchFields, dateRange]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const timeA = a.parsedDate ? a.parsedDate.getTime() : 0;
      const timeB = b.parsedDate ? b.parsedDate.getTime() : 0;
      return sortDir === 'desc' ? timeB - timeA : timeA - timeB;
    });
    return copy.map((entry) => entry.item);
  }, [filtered, sortDir]);

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
