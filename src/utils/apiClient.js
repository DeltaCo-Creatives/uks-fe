/**
 * Minimal fetch wrapper for the public UKS API. Throws on network errors and
 * non-2xx responses, tagging the error with the HTTP status so callers can
 * tell a real failure from a 404.
 *
 * `cache: 'no-cache'` makes the browser revalidate instead of serving the API's
 * `max-age=60` copy, so a CMS edit shows up on the next load, not up to a
 * minute (and a few refreshes) later.
 *
 * @param {string} path - appended to VITE_API_BASE_URL, e.g. "/public/berita"
 * @param {RequestInit} [options]
 */
export async function apiFetch(path, options = {}) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}${path}`, { cache: 'no-cache', ...options });

  if (!response.ok) {
    const error = new Error(`${path} responded with ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

/**
 * Fire-and-forget POST for counters: never throws and never blocks the UI.
 * No body and no custom headers, so the browser sends it as a simple CORS request.
 *
 * @param {string} path - appended to VITE_API_BASE_URL
 */
export function apiPing(path) {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    fetch(`${baseUrl}${path}`, { method: 'POST', keepalive: true }).catch(() => {});
  } catch {
    // Counting must never affect the popup.
  }
}
