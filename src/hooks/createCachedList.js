import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/apiClient';

/**
 * Builds a `useList()` hook for a public list endpoint: fetched once per page
 * load, cached at module scope, and shared by every consumer (BeritaPanel,
 * SearchView, Hero...) instead of once per mount.
 *
 * @param {string} path - appended to VITE_API_BASE_URL, e.g. "/public/berita"
 */
export function createCachedList(path) {
  let cachedList = null;
  let listRequest = null;

  function loadList() {
    if (cachedList) return Promise.resolve(cachedList);
    if (!listRequest) {
      listRequest = apiFetch(path)
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
