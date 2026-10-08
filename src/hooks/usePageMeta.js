import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toMetaDescription } from '@/utils/metaDescription';

const SITE_NAME = 'UKS Indonesia';

// index.html carries the static title and description (the no-JS fallback); read them once, before any page overwrites them.
const DEFAULT_TITLE = document.title;
const DEFAULT_DESCRIPTION = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';

// Build-time public origin, the same value as the API's Portal:BaseUrl (the sitemap host), so previews and the
// default hostname canonicalise to it too. Unset or not absolute: whichever origin is serving the page.
const SITE_URL = import.meta.env.VITE_SITE_URL ?? '';
const CANONICAL_ORIGIN = /^https?:\/\//.test(SITE_URL) ? SITE_URL.replace(/\/+$/, '') : null;

/** Meta for a page that exists as a route but has nothing to show; shared so a parent page can defer to NotFoundView. */
export const NOT_FOUND_META = { title: 'Halaman Tidak Ditemukan', noindex: true };

/** The one <head> element matching `selector`, created with `attrs` when missing. */
function headElement(tag, selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    Object.entries(attrs).forEach(([name, value]) => el.setAttribute(name, value));
    document.head.appendChild(el);
  }
  return el;
}

/**
 * Per-page document title, description, canonical URL and robots hint, written straight into <head>.
 * Call it once per route-level page, before any early return. Falsy title/description fall back to
 * the index.html defaults; `noindex` adds <meta name="robots"> and its absence removes it again.
 * `path` is the page's own canonical pathname, for an item that is reachable at more than one URL; it defaults to the current one.
 *
 * @param {{ title?: string | null, description?: string | null, noindex?: boolean, path?: string }} meta
 */
export function usePageMeta({ title, description, noindex = false, path }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

    headElement('meta', 'meta[name="description"]', { name: 'description' })
      .setAttribute('content', toMetaDescription(description) || DEFAULT_DESCRIPTION);

    // Query and hash stay out, and /mitra/ and /mitra share one canonical.
    headElement('link', 'link[rel="canonical"]', { rel: 'canonical' })
      .setAttribute('href', (CANONICAL_ORIGIN ?? window.location.origin) + ((path ?? pathname).replace(/\/+$/, '') || '/'));

    if (noindex) headElement('meta', 'meta[name="robots"]', { name: 'robots' }).setAttribute('content', 'noindex');
    else document.head.querySelector('meta[name="robots"]')?.remove();
  }, [title, description, noindex, path, pathname]);
}
