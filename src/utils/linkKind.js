const KIND = {
  drive: { label: 'Google Drive', icon: 'fa-brands fa-google-drive' },
  pdf: { label: 'PDF', icon: 'fa-solid fa-file-pdf' },
  doc: { label: 'Google Dokumen', icon: 'fa-solid fa-file-lines' },
  slides: { label: 'Google Slides', icon: 'fa-solid fa-file-powerpoint' },
  video: { label: 'Video', icon: 'fa-brands fa-youtube' },
  web: { label: 'Situs web', icon: 'fa-solid fa-globe' },
  missing: { label: 'Tautan belum tersedia', icon: 'fa-solid fa-link-slash' }
};

const DRIVE_FILE = /drive\.google\.com\/file\/d\/([\w-]+)/;
const YOUTUBE_ID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/;

/**
 * Labels a link by where it goes, so a resource row says whether it opens a
 * downloadable file or a web page before the click. Shortened links (s.id, etc.)
 * can't be sniffed from the URL, so callers pass `kind` for those once resolved.
 *
 * @param {string | null} url
 * @param {'drive' | 'pdf' | 'doc' | 'slides' | 'video' | 'web' | undefined} kind
 */
export function linkKind(url, kind) {
  if (kind) return KIND[kind] || KIND.web;
  if (!url) return KIND.missing;
  if (url.includes('drive.google.com')) return KIND.drive;
  if (YOUTUBE_ID.test(url)) return KIND.video;
  if (url.toLowerCase().endsWith('.pdf')) return KIND.pdf;
  return KIND.web;
}

/**
 * The URL that renders a document inside the page, or null when it has to be
 * opened in its own tab. Drive and YouTube publish embed paths; a PDF is framed
 * directly, though a host that sends X-Frame-Options will refuse it, which is
 * why every viewer also keeps an "open in a new tab" action.
 *
 * @param {string | null} url
 * @param {string | undefined} kind
 * @returns {string | null}
 */
export function embedUrl(url, kind) {
  if (!url) return null;

  const drive = url.match(DRIVE_FILE);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;

  const video = url.match(YOUTUBE_ID);
  if (video) return `https://www.youtube.com/embed/${video[1]}`;

  if (kind === 'pdf' || url.toLowerCase().endsWith('.pdf')) return `${url}#view=FitH`;

  return null;
}

export const NEW_TAB_HINT = '(membuka tab baru)';
