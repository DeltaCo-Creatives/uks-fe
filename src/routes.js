/**
 * URL vocabulary for the portal.
 *
 * Data files (profil.js, program.js) point at destinations by view key and
 * section id rather than by URL, so path construction lives here instead of as
 * string literals spread across components.
 */

import { pageNavigationConfigs } from './data/navigation';

export const VIEW_PATHS = {
  beranda: '/',
  'uksm-profil': '/uksm/profil',
  'uksm-trias': '/uksm/trias',
  'uksm-stratifikasi': '/uksm/stratifikasi',
  program: '/program',
  mitra: '/mitra',
  informasi: '/informasi',
  publikasi: '/publikasi',
  kontak: '/kontak',
  search: '/search'
};

// Views whose sections swap the rendered panel, so each one earns its own URL.
// Everywhere else a section is just a scroll anchor on an already-rendered page.
const TAB_VIEWS = ['program', 'informasi', 'publikasi'];

export const isTabView = (viewKey) => TAB_VIEWS.includes(viewKey);

export const defaultTabSlug = (viewKey) => pageNavigationConfigs[viewKey].sections[0].slug;

/** The section a tab slug names, or undefined when the slug is not one of ours. */
export const sectionIdFromSlug = (viewKey, slug) =>
  isTabView(viewKey) ? pageNavigationConfigs[viewKey].sections.find((s) => s.slug === slug)?.id : undefined;

export function pathForView(viewKey, sectionId = null) {
  const base = VIEW_PATHS[viewKey];
  if (!base) return '/';
  if (!sectionId) return base;
  if (isTabView(viewKey)) {
    const slug = pageNavigationConfigs[viewKey].sections.find((s) => s.id === sectionId)?.slug;
    return slug ? `${base}/${slug}` : base;
  }
  return `${base}#${sectionId}`;
}

export const pathForArticle = (idOrSlug) => `/informasi/berita/${idOrSlug}`;

const SUBPAGE_PATHS = Object.entries(VIEW_PATHS).filter(([, path]) => path !== '/');

export function viewKeyFromPathname(pathname) {
  if (pathname === '/') return 'beranda';
  if (pathname.startsWith('/informasi/berita/')) return 'berita-detail';
  const match = SUBPAGE_PATHS.find(
    ([, path]) => pathname === path || pathname.startsWith(`${path}/`)
  );
  return match ? match[0] : null;
}

/** The section id a tab view's URL currently points at, or null elsewhere. */
export function tabSectionFromPathname(pathname) {
  const viewKey = viewKeyFromPathname(pathname);
  if (!isTabView(viewKey)) return null;
  return (
    sectionIdFromSlug(viewKey, pathname.split('/')[2]) ??
    pageNavigationConfigs[viewKey].sections[0].id
  );
}
