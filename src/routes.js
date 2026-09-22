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

const slugById = {};
const idBySlug = {};
TAB_VIEWS.forEach((view) => {
  slugById[view] = {};
  idBySlug[view] = {};
  pageNavigationConfigs[view].sections.forEach((section) => {
    slugById[view][section.id] = section.slug;
    idBySlug[view][section.slug] = section.id;
  });
});

export const isTabView = (viewKey) => TAB_VIEWS.includes(viewKey);

export const defaultTabSlug = (viewKey) => pageNavigationConfigs[viewKey].sections[0].slug;

/** The section a tab slug names, or undefined when the slug is not one of ours. */
export const sectionIdFromSlug = (viewKey, slug) => idBySlug[viewKey]?.[slug];

export function pathForView(viewKey, sectionId = null) {
  const base = VIEW_PATHS[viewKey];
  if (!base) return '/';
  if (!sectionId) return base;
  if (isTabView(viewKey)) {
    const slug = slugById[viewKey][sectionId];
    return slug ? `${base}/${slug}` : base;
  }
  return `${base}#${sectionId}`;
}

export const pathForArticle = (idOrSlug) => `/informasi/berita/${idOrSlug}`;

// Longest first so /uksm/profil is matched before /uksm.
const VIEWS_BY_DEPTH = Object.entries(VIEW_PATHS)
  .filter(([, path]) => path !== '/')
  .sort((a, b) => b[1].length - a[1].length);

export function viewKeyFromPathname(pathname) {
  if (pathname === '/') return 'beranda';
  if (pathname.startsWith('/informasi/berita/')) return 'berita-detail';
  const match = VIEWS_BY_DEPTH.find(
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
