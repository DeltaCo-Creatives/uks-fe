/**
 * Minimal fetch wrapper for the public UKS API. Throws on network errors and
 * non-2xx responses, tagging the error with the HTTP status so callers can
 * tell a real failure from a 404.
 *
 * @param {string} path - appended to VITE_API_BASE_URL, e.g. "/public/berita"
 * @param {RequestInit} [options]
 */
export async function apiFetch(path, options = {}) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}${path}`, options);

  if (!response.ok) {
    const error = new Error(`${path} responded with ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}
