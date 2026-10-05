import { HOVER_CAPABLE_QUERY } from '../hooks/useHoverCapable';

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

  return base ? `${base}${extension}` : lastSegment;
}

/**
 * Click handler that really downloads a file hosted on another origin.
 *
 * The `download` attribute is ignored for cross-origin URLs (the files live on
 * blob storage, not on this site), so a plain `<a download>` just navigates to
 * the file. Phones then show a blank page or a PDF viewer instead of saving it.
 * Fetching the file and saving it from a same-origin blob URL forces the
 * download. This only runs on touch devices; on desktops the click is left
 * alone. The anchor keeps its own `href` and `download` for modified clicks,
 * and if the fetch fails (storage without CORS for this origin, offline) the
 * file opens in a new tab.
 *
 * @param {import('react').MouseEvent<HTMLAnchorElement>} event
 * @param {string} url
 * @param {string} [title] - file name without extension
 */
export async function downloadFile(event, url, title) {
  // Desktops already handle these links well (the browser opens the PDF in its own viewer), so they
  // keep the plain link. Only touch devices, where that ends in a blank page, get the forced download.
  if (window.matchMedia(HOVER_CAPABLE_QUERY).matches) return;

  // Let modified clicks (open in new tab, etc.) behave natively.
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  event.preventDefault();

  try {
    // no-cache: a copy cached earlier from a plain navigation lacks the CORS headers.
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Download responded with ${response.status}`);

    const objectUrl = URL.createObjectURL(await response.blob());
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = fileNameFor(url, title);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Safari needs the URL to outlive the click for a moment.
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
