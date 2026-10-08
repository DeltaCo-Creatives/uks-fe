import DOMPurify from 'dompurify';

/**
 * Second line of defence for CMS rich text rendered with dangerouslySetInnerHTML.
 * The API already sanitizes it (HtmlSanitizerService); this mirrors that allowlist
 * in the browser so one server-side slip can't run script on the portal: only
 * YouTube embed iframes survive, and links opening a new tab get rel=noopener.
 */

const YOUTUBE_EMBED = /^https:\/\/(?:www\.)?(?:youtube\.com|youtube-nocookie\.com)\/embed\/[\w-]+(?:\?[^\s"'<>]*)?$/;

DOMPurify.addHook('uponSanitizeElement', (node, data) => {
  if (data.tagName === 'iframe' && !YOUTUBE_EMBED.test(node.getAttribute('src') || '')) {
    node.parentNode?.removeChild(node);
  }
});

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

/**
 * @param {string | null | undefined} html
 * @returns {string}
 */
export function sanitizeHtml(html) {
  return DOMPurify.sanitize(html ?? '', {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['target', 'allowfullscreen', 'frameborder']
  });
}
