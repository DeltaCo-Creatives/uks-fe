import { createCachedList } from './createCachedList';
import { useSlugDetail } from './useSlugDetail';

/** Berita list for the page, fetched once and shared by every consumer. */
export const useBeritaList = createCachedList('/public/berita', { paginated: true });

/** A single berita article by slug, including the full HTML `content`. */
export const useBerita = (slug) => useSlugDetail('/public/berita', slug);
