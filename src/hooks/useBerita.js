import { listHookFor, submenuPath } from './createCachedList';
import { useSlugDetail } from './useSlugDetail';

/** Berita list of one submenu (all berita when `submenuId` is absent), cached per submenu. */
export const beritaHookFor = (submenuId) =>
  listHookFor(submenuPath('/public/berita', submenuId), { paginated: true });

/** Berita list for the page, fetched once and shared by every consumer. */
export const useBeritaList = beritaHookFor();

/** A single berita article by slug, including the full HTML `content`. */
export const useBerita = (slug) => useSlugDetail('/public/berita', slug);
