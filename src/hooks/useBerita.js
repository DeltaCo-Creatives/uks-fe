import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/apiClient';
import { createCachedList } from './createCachedList';

/** Berita list for the page, fetched once and shared by every consumer. */
export const useBeritaList = createCachedList('/public/berita');

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
