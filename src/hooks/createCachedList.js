import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/apiClient';

/**
 * Builds a `useList()` hook for a public list endpoint: fetched once per page
 * load, cached at module scope, and shared by every consumer (BeritaPanel,
 * SearchView, Hero...) instead of once per mount.
 *
 * @param {string} path - appended to VITE_API_BASE_URL, e.g. "/public/berita"
 * @param {{ paginated?: boolean }} [options] - paginated endpoints answer with
 *   `{ items, hasNextPage, ... }` (max 50 per page); every page is fetched and
 *   flattened so consumers (search, home "latest N", calendar) still get the
 *   full array. A plain-array response (old API) passes through untouched.
 */
export function createCachedList(path, { paginated = false } = {}) {
  let cachedList = null;
  let listRequest = null;

  async function fetchAllPages() {
    const sep = path.includes('?') ? '&' : '?';
    const all = [];
    for (let page = 1; ; page++) {
      const data = await apiFetch(`${path}${sep}page=${page}&pageSize=50`);
      if (Array.isArray(data)) return data;
      all.push(...data.items);
      if (!data.hasNextPage) return all;
    }
  }

  function loadList() {
    if (cachedList) return Promise.resolve(cachedList);
    if (!listRequest) {
      listRequest = (paginated ? fetchAllPages() : apiFetch(path))
        .then((data) => { cachedList = data; return data; })
        .finally(() => { listRequest = null; });
    }
    return listRequest;
  }

  return function useList() {
    const [state, setState] = useState(() => ({
      data: cachedList,
      loading: !cachedList,
      error: null
    }));
    const [retryToken, setRetryToken] = useState(0);

    useEffect(() => {
      if (cachedList) {
        setState({ data: cachedList, loading: false, error: null });
        return undefined;
      }

      // The request itself is shared via loadList(); an unmounted consumer
      // only needs to stop setting its own state, not cancel the fetch for
      // the rest.
      let cancelled = false;
      setState((s) => ({ ...s, loading: true, error: null }));
      loadList()
        .then((data) => { if (!cancelled) setState({ data, loading: false, error: null }); })
        .catch((error) => { if (!cancelled) setState({ data: null, loading: false, error }); });

      return () => { cancelled = true; };
    }, [retryToken]);

    const retry = () => {
      cachedList = null;
      setRetryToken((t) => t + 1);
    };

    return { ...state, retry };
  };
}

const listHooks = new Map();

/** One cached list hook per path (never create one inside a render). A path always uses the same options. */
export function listHookFor(path, options) {
  if (!listHooks.has(path)) listHooks.set(path, createCachedList(path, options));
  return listHooks.get(path);
}

/** `path` filtered to one submenu; unchanged without an id. */
export const submenuPath = (path, submenuId) =>
  submenuId ? `${path}${path.includes('?') ? '&' : '?'}submenuId=${submenuId}` : path;
