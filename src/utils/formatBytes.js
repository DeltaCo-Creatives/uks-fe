/** Megabytes with one decimal, matching how the site writes file sizes ("64.6 MB"). */
export function formatMB(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * "12.3 MB dari 64.6 MB · 19%", or just "12.3 MB" while the total is unknown.
 *
 * @param {number} loaded
 * @param {number} total
 */
export function progressText(loaded, total) {
  if (!total) return formatMB(loaded);
  const percent = Math.min(100, Math.round((loaded / total) * 100));
  return `${formatMB(loaded)} dari ${formatMB(total)} · ${percent}%`;
}
