import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/apiClient';

/**
 * One public article by slug from `${basePath}/{slug}`, including the full
 * HTML `content`. A missing slug resolves to empty data instead of a request.
 *
 * @param {string} basePath - e.g. "/public/berita"
 * @param {string} [slug]
 */
export function useSlugDetail(basePath, slug) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!slug) {
      setState({ data: null, loading: false, error: null });
      return undefined;
    }

    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    apiFetch(`${basePath}/${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ data: null, loading: false, error });
      });

    return () => controller.abort();
  }, [basePath, slug, retryToken]);

  return { ...state, retry: () => setRetryToken((t) => t + 1) };
}
