// Runtime settings. The container image rewrites this file at start (runtime-env.sh); SWA and `npm run dev`
// keep it empty, so src/utils/env.js falls back to the build-time VITE_* values.
window.__ENV__ = {};
