import { createCachedList } from './createCachedList';

/** Buku & pedoman list for the Publikasi page, fetched once and shared by every consumer. */
export const useBukuPanduanList = createCachedList('/public/publikasi?jenisHalaman=buku-panduan');

/** Infografis list for the Publikasi page, fetched once and shared by every consumer. */
export const useInfografisList = createCachedList('/public/publikasi?jenisHalaman=infografis');

/** Video list for the Publikasi page, fetched once and shared by every consumer. */
export const useVideoList = createCachedList('/public/publikasi?jenisHalaman=video');

/** Regulasi / produk hukum list, ordered by document date, newest first. */
export const useProdukHukumList = createCachedList('/public/produk-hukum');
