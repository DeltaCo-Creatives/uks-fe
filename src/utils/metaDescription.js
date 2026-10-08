const ENTITIES = { '&nbsp;': ' ', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&amp;': '&' };

/**
 * Plain-text <meta name="description"> value: HTML stripped, whitespace collapsed,
 * and cut on a word boundary so the result (with its ellipsis) stays within `max` characters.
 *
 * @param {string | null | undefined} html
 * @param {number} [max]
 * @returns {string} empty when there is nothing to show
 */
export function toMetaDescription(html, max = 160) {
  const text = String(html ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|lt|gt|quot|#39|amp);/g, (entity) => ENTITIES[entity])
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;

  const room = text.slice(0, max - 1);
  const end = text[max - 1] === ' ' ? room.length : room.lastIndexOf(' ');
  return `${(end > 0 ? room.slice(0, end) : room).replace(/[\s.,;:!?-]+$/, '')}…`;
}
