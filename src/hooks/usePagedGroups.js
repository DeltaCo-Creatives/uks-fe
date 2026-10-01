import { useState } from 'react';

export const PAGE_SIZE = 3;

/**
 * Client-side paging over the toolbar's `groups` (search, category and month
 * grouping all run on the full list, so the slice happens last).
 * `totalPages` is 0 when there is nothing to show. A page can
 * span several groups; each keeps its heading.
 *
 * `resetKey` identifies the current filters: when it changes, back to page 1.
 */
export function usePagedGroups(groups, resetKey, pageSize = PAGE_SIZE) {
  const [state, setState] = useState({ page: 1, key: resetKey });
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const totalPages = Math.ceil(total / pageSize);
  const page = Math.max(1, Math.min(state.key === resetKey ? state.page : 1, totalPages));

  let skip = (page - 1) * pageSize;
  let left = pageSize;
  const pagedGroups = [];
  for (const g of groups) {
    if (left <= 0) break;
    const items = g.items.slice(skip, skip + left);
    skip = Math.max(0, skip - g.items.length);
    if (items.length) {
      pagedGroups.push({ ...g, items });
      left -= items.length;
    }
  }

  return { pagedGroups, page, totalPages, setPage: (p) => setState({ page: p, key: resetKey }) };
}
