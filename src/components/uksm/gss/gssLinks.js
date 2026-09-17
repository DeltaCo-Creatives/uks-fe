/** Labels a download link by where it lives, so rows say what opens before the click. */
export function linkKind(url) {
  if (!url) return { label: 'Tautan belum tersedia', icon: 'fa-solid fa-link-slash' };
  if (url.includes('drive.google.com')) return { label: 'Google Drive', icon: 'fa-brands fa-google-drive' };
  if (url.includes('youtu')) return { label: 'YouTube', icon: 'fa-brands fa-youtube' };
  if (url.toLowerCase().endsWith('.pdf')) return { label: 'PDF', icon: 'fa-solid fa-file-pdf' };
  return { label: 'Situs web', icon: 'fa-solid fa-globe' };
}

export const NEW_TAB_HINT = '(membuka tab baru)';
