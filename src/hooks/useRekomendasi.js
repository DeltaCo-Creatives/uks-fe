import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/apiClient';

/** Fetches `path`, returning `select(data)` or `fallback` while loading / on any error. Never throws. */
function useSoftFetch(path, select, fallback) {
  const [value, setValue] = useState(fallback);
  useEffect(() => {
    setValue(fallback);
    if (!path) return undefined;
    const controller = new AbortController();
    apiFetch(path, { signal: controller.signal })
      .then((data) => setValue(select(data)))
      .catch(() => {});
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
  return value;
}

const slugsOf = (items) => (Array.isArray(items) ? items.map((i) => i.slug) : []);
const NONE = [];

/** Recommended slugs (best first) for an opened item; [] while loading or on error. */
export function useRekomendasi(tipe, slug) {
  const path = tipe && slug
    ? `/public/rekomendasi?tipe=${encodeURIComponent(tipe)}&slug=${encodeURIComponent(slug)}&limit=3`
    : null;
  return useSoftFetch(path, slugsOf, NONE);
}

/** Beranda berita trend: `{ aktif, slugs }`. Inactive on loading / error. */
export function useBerandaBeritaTren(submenuId) {
  const query = submenuId ? `&submenuId=${encodeURIComponent(submenuId)}` : '';
  const tren = useSoftFetch(`/public/rekomendasi/beranda-berita?limit=6${query}`,
    (d) => ({ aktif: !!d?.aktif, slugs: slugsOf(d?.items) }), null);
  return tren ?? { aktif: false, slugs: NONE };
}

/** Puts items whose slug is in `slugs` first (in that order), then the rest in their original order. */
export function orderBySlugs(items, slugs) {
  const rank = new Map(slugs.map((s, i) => [s, i]));
  const hit = items.filter((i) => rank.has(i.slug)).sort((a, b) => rank.get(a.slug) - rank.get(b.slug));
  return [...hit, ...items.filter((i) => !rank.has(i.slug))];
}
