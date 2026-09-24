import { createCachedList } from './createCachedList';

/** Praktik Baik list for the page, fetched once and shared by every consumer. */
export const usePraktikBaikList = createCachedList('/public/praktik-baik');

/** UPT Bercerita list for the page, fetched once and shared by every consumer. */
export const useUptStoriesList = createCachedList('/public/upt-bercerita');

/**
 * Agenda list for the page, fetched once and shared by every consumer.
 * The API already orders entries (upcoming/ongoing first, then past), so
 * consumers render the list as-is instead of re-sorting it.
 */
export const useAgendaList = createCachedList('/public/agenda');

/** Buku & pedoman list for the Publikasi page, fetched once and shared by every consumer. */
export const useBukuPanduanList = createCachedList('/public/publikasi?jenisHalaman=buku-panduan');

/** Infografis list for the Publikasi page, fetched once and shared by every consumer. */
export const useInfografisList = createCachedList('/public/publikasi?jenisHalaman=infografis');

/** Video list for the Publikasi page, fetched once and shared by every consumer. */
export const useVideoList = createCachedList('/public/publikasi?jenisHalaman=video');

/** Regulasi / produk hukum list, ordered by document date, newest first. */
export const useProdukHukumList = createCachedList('/public/produk-hukum');

/** Tautan lembaga groups for the navbar dropdown, fetched once and shared by every consumer. */
export const useTautanList = createCachedList('/public/tautan');

/** Kementerian terkait list for the Kontak page, fetched once and shared by every consumer. */
export const useKementerianList = createCachedList('/public/kementerian');
