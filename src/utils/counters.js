import { apiPing } from './apiClient';

/**
 * Counts one open of a publikasi (buku panduan, infografis, album or video). Besides the all-time counter on the
 * publikasi itself it also reports the view by day, which is what the CMS Dashboard filters by date range.
 */
export function countPublikasiView(slug) {
  if (!slug) return;
  apiPing(`/public/publikasi/${encodeURIComponent(slug)}/lihat`);
  countKonten('publikasi', slug);
}

/** Counts one open of the "Baca Online" reader for a produk hukum. */
export function countProdukHukumView(slug) {
  if (slug) apiPing(`/public/produk-hukum/${encodeURIComponent(slug)}/lihat`);
}

/** Counts one download of a publikasi file (buku panduan or infografis). */
export function countPublikasiDownload(slug) {
  if (slug) apiPing(`/public/publikasi/${encodeURIComponent(slug)}/unduh`);
}

/**
 * Counts one view of a page or article: `tipe` is "halaman", "berita", "upt-bercerita", "pengumuman" or "publikasi", `kunci` is
 * the page key (e.g. "program/mbg") or the article's slug. Every view counts; there is no once-per-day marker.
 */
export function countKonten(tipe, kunci) {
  if (tipe && kunci) {
    apiPing(`/public/kunjungan/konten?tipe=${encodeURIComponent(tipe)}&kunci=${encodeURIComponent(kunci)}`);
  }
}
