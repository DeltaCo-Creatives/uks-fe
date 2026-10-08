import { apiPing } from './apiClient';

/** Counts one open of a publikasi popup (buku panduan or infografis). */
export function countPublikasiView(slug) {
  if (slug) apiPing(`/public/publikasi/${encodeURIComponent(slug)}/lihat`);
}

/** Counts one download of a publikasi file (buku panduan or infografis). */
export function countPublikasiDownload(slug) {
  if (slug) apiPing(`/public/publikasi/${encodeURIComponent(slug)}/unduh`);
}
