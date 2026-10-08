import { apiPing } from './apiClient';

/** Counts one open of a publikasi popup (buku panduan or infografis). */
export function countPublikasiView(slug) {
  if (slug) apiPing(`/public/publikasi/${encodeURIComponent(slug)}/lihat`);
}

/** Counts one open of the "Baca Online" reader for a produk hukum. */
export function countProdukHukumView(slug) {
  if (slug) apiPing(`/public/produk-hukum/${encodeURIComponent(slug)}/lihat`);
}

/** Counts one download of a publikasi file (buku panduan or infografis). */
export function countPublikasiDownload(slug) {
  if (slug) apiPing(`/public/publikasi/${encodeURIComponent(slug)}/unduh`);
}
