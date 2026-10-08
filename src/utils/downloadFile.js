import { HOVER_CAPABLE_QUERY } from '../hooks/useHoverCapable';
import { readWithProgress } from './readWithProgress';

const DONE_VISIBLE_MS = 6000;

/*
 * The one download in flight, shared with <DownloadToast /> through a tiny store so the
 * progress shows no matter which button started it:
 * null | { status: 'loading' | 'done' | 'error', name, url, loaded?, total? }
 */
let state = null;
let controller = null;
let hideTimer = null;
const listeners = new Set();

function setState(next) {
  state = next;
  listeners.forEach((listener) => listener());
}

export function subscribeDownload(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getDownloadState() {
  return state;
}

/** Stops the running download, if any, and clears the card. */
export function cancelDownload() {
  controller?.abort();
  controller = null;
  clearTimeout(hideTimer);
  setState(null);
}

/**
 * Builds a safe file name for a download: the human title when there is one,
 * with the extension taken from the URL, otherwise the last path segment.
 *
 * @param {string} url
 * @param {string | undefined} title
 */
function fileNameFor(url, title) {
  const path = url.split(/[?#]/)[0];
  const lastSegment = decodeURIComponent(path.split('/').pop() || 'unduhan');
  const extension = (lastSegment.match(/\.[a-z0-9]{2,5}$/i) || [''])[0];
  const base = (title || '').replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim();
  // A title that already ends in the extension (produk hukum names often include ".pdf") must not get it twice.
  const named = base.toLowerCase().endsWith(extension.toLowerCase()) ? base : `${base}${extension}`;

  return base ? named : lastSegment;
}

/**
 * Registers a download with the backend without following its redirect: the endpoint counts the hit
 * and then redirects to the file, which we already fetched from its direct link. Fire-and-forget.
 *
 * @param {string} countUrl
 */
function pingDownloadCount(countUrl) {
  fetch(countUrl, { mode: 'no-cors', redirect: 'manual', credentials: 'omit', keepalive: true }).catch(() => {});
}

/**
 * Click handler that really downloads a file hosted on another origin.
 *
 * The `download` attribute is ignored for cross-origin URLs (the files live on
 * blob storage, not on this site), so a plain `<a download>` just navigates to
 * the file. Phones then show a blank page or a PDF viewer instead of saving it.
 * Fetching the file and saving it from a same-origin blob URL forces the
 * download. This only runs on touch devices; on desktops the click is left
 * alone. The anchor keeps its own `href` and `download` for modified clicks.
 *
 * Progress is published to the store above, since a big file on a slow
 * connection otherwise looks like the tap did nothing. If the fetch fails
 * (storage without CORS for this origin, offline) the card offers the file in a
 * new tab; opening it automatically would be blocked as a popup by then.
 *
 * @param {import('react').MouseEvent<HTMLAnchorElement>} event
 * @param {string} url - where the file is fetched from (must be CORS-readable, so not a redirecting link)
 * @param {string} [title] - file name without extension
 * @param {string} [countUrl] - a counting endpoint to ping once the file is saved, when `url` is the
 *   direct link and the anchor's own href is the counting one (produk hukum)
 */
export async function downloadFile(event, url, title, countUrl) {
  // Desktops already handle these links well (the browser opens the PDF in its own viewer), so they
  // keep the plain link. Only touch devices, where that ends in a blank page, get the forced download.
  if (window.matchMedia(HOVER_CAPABLE_QUERY).matches) return;

  // Let modified clicks (open in new tab, etc.) behave natively.
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  event.preventDefault();

  // A new tap replaces whatever was running.
  controller?.abort();
  clearTimeout(hideTimer);
  const current = new AbortController();
  controller = current;

  const name = fileNameFor(url, title);
  setState({ status: 'loading', name, url, loaded: 0, total: 0 });

  try {
    // no-cache: a copy cached earlier from a plain navigation lacks the CORS headers.
    const response = await fetch(url, { cache: 'no-cache', signal: current.signal });
    if (!response.ok) throw new Error(`Download responded with ${response.status}`);
    // A redirecting link (produk hukum /unduh) has no extension in the request URL, only in the final one.
    const finalName = fileNameFor(response.url || url, title);

    const chunks = await readWithProgress(response, ({ loaded, total }) => {
      setState({ status: 'loading', name, url, loaded, total });
    });

    const objectUrl = URL.createObjectURL(new Blob(chunks, { type: response.headers.get('content-type') || '' }));
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = finalName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Safari needs the URL to outlive the click for a moment.
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);

    if (countUrl) pingDownloadCount(countUrl);

    setState({ status: 'done', name: finalName, url });
    hideTimer = setTimeout(() => {
      if (state?.status === 'done') setState(null);
    }, DONE_VISIBLE_MS);
  } catch {
    // Cancelled or replaced by a newer tap: whoever aborted already owns the card.
    if (current.signal.aborted) return;
    setState({ status: 'error', name, url });
  } finally {
    if (controller === current) controller = null;
  }
}
