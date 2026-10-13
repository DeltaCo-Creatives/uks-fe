/**
 * A VITE_* setting. The container's /env.js (written at start, see runtime-env.sh) wins over the
 * build-time value, so one image serves every environment; SWA and local dev keep the build-time one.
 *
 * @param {'VITE_API_BASE_URL' | 'VITE_SITE_URL'} name
 */
export const env = (name) => window.__ENV__?.[name] || import.meta.env[name];
