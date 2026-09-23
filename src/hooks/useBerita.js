import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/apiClient';

// Shared across every useBeritaList() mount so the list is fetched once per
// page load, not once per consumer (BeritaPanel, Hero, Programs, Search...).
let cachedList = null;
let listRequest = null;

function loadList() {
  if (cachedList) return Promise.resolve(cachedList);
  if (!listRequest) {
    listRequest = apiFetch('/public/berita')
      .then((data) => { cachedList = data; return data; })
      .finally(() => { listRequest = null; });
  }
  return listRequest;
}

/** Berita list for the page, fetched once and shared by every consumer. */
export function useBeritaList() {
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

    // The request itself is shared via loadList(); an unmounted consumer only
    // needs to stop setting its own state, not cancel the fetch for the rest.
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
}

/** A single berita article by slug, including the full HTML `content`. */
export function useBerita(slug) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!slug) {
      setState({ data: null, loading: false, error: null });
      return undefined;
    }

    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    apiFetch(`/public/berita/${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ data: null, loading: false, error });
      });

    return () => controller.abort();
  }, [slug, retryToken]);

  return { ...state, retry: () => setRetryToken((t) => t + 1) };
}
