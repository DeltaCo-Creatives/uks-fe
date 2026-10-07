/**
 * URL vocabulary for the portal.
 *
 * Data files (profil.js, program.js) point at destinations by view key and
 * section id rather than by URL, so path construction lives here instead of as
 * string literals spread across components.
 */

import { pageNavigationConfigs } from './data/navigation';

// ponytail: mutable module state so the ~30 pathForView call sites stay plain
// functions. NavConfigProvider overwrites it with the API-built tabs before any
// route renders; upgrade path = make every caller read the NavConfigContext.
let activeConfigs = pageNavigationConfigs;

export const setActiveConfigs = (configs) => {
  activeConfigs = configs;
};

/** Derived scroll-anchor/section id of a tab: the same string the drawer and scroll-spy use. */
export const sectionIdForTab = (viewKey, slug) => `sec-${viewKey}-${slug}`;

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

// Undefined when the admin hid every tab of the view.
const defaultTabSlug = (viewKey) => activeConfigs[viewKey].sections[0]?.slug;

/** The default tab's path, or home when the view has no visible tab. */
export const defaultTabPath = (viewKey) => {
  const slug = defaultTabSlug(viewKey);
  return slug ? `/${viewKey}/${slug}` : '/';
};

/** The section a tab slug names, or undefined when the slug is not one of ours. */
export const sectionIdFromSlug = (viewKey, slug) =>
  isTabView(viewKey) ? activeConfigs[viewKey].sections.find((s) => s.slug === slug)?.id : undefined;

export function pathForView(viewKey, sectionId = null) {
  const base = VIEW_PATHS[viewKey];
  if (!base) return '/';
  if (!sectionId) return base;
  if (isTabView(viewKey)) {
    const slug = activeConfigs[viewKey].sections.find((s) => s.id === sectionId)?.slug;
    return slug ? `${base}/${slug}` : base;
  }
  return `${base}#${sectionId}`;
}

/** URL of a tab by its slug, without needing the section id. Preferred tab URL builder: `pathForTab(view, slug)`. */
export const pathForTab = (viewKey, slug) => `${VIEW_PATHS[viewKey]}/${slug}`;

/** Article detail URL. The seeded berita tab keeps its short path; any other artikel submenu uses its own slug. */
export const pathForArticle = (idOrSlug, submenuSlug) =>
  submenuSlug && submenuSlug !== 'berita'
    ? `/informasi/${submenuSlug}/${idOrSlug}`
    : `/informasi/berita/${idOrSlug}`;

/** Pengumuman / kesempatan detail URL, inside its own submenu tab. */
export const pathForPengumuman = (slug, submenuSlug) => `/informasi/${submenuSlug}/${slug}`;

/** Informasi submenu templates that have an item detail page, and the view key each one renders. */
export const DETAIL_VIEWS = {
  artikel: 'berita-detail',
  pengumuman: 'pengumuman-detail',
  kesempatan: 'pengumuman-detail'
};

export const pathForUptStory = (slug) => `/informasi/upt-bercerita/${slug}`;

export const pathForProgram = (slug) => `${VIEW_PATHS.program}/${slug}`;

const SUBPAGE_PATHS = Object.entries(VIEW_PATHS).filter(([, path]) => path !== '/');

export function viewKeyFromPathname(pathname) {
  if (pathname === '/') return 'beranda';
  if (pathname.startsWith('/informasi/berita/')) return 'berita-detail';
  if (pathname.startsWith('/informasi/upt-bercerita/')) return 'upt-detail';
  // /informasi/<submenuSlug>/<itemSlug> is a detail page only inside a submenu whose template has one.
  const itemTab = pathname.match(/^\/informasi\/([^/]+)\/[^/]+/)?.[1];
  const detailView = DETAIL_VIEWS[activeConfigs.informasi.sections.find((s) => s.slug === itemTab)?.template];
  if (detailView) return detailView;
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
    activeConfigs[viewKey].sections[0]?.id ??
    null
  );
}
