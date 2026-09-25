import { apiPing } from './apiClient';

/** Counts one open of a publikasi popup (buku panduan or infografis). */
export function countPublikasiView(slug) {
  if (slug) apiPing(`/public/publikasi/${encodeURIComponent(slug)}/lihat`);
}
