import { createCachedList } from './createCachedList';
import { useSlugDetail } from './useSlugDetail';

/** Hero slides for the home page, already ordered and filtered by the API. */
export const useHeroSlideList = createCachedList('/public/hero-slide');

/** Praktik Baik list for the page, fetched once and shared by every consumer. */
export const usePraktikBaikList = createCachedList('/public/praktik-baik', { paginated: true });

/** UPT Bercerita list for the page, fetched once and shared by every consumer. */
export const useUptStoriesList = createCachedList('/public/upt-bercerita', { paginated: true });

/** A single UPT Bercerita story by slug, including the full HTML `content`. */
export const useUptBercerita = (slug) => useSlugDetail('/public/upt-bercerita', slug);

/**
 * Agenda list for the page, fetched once and shared by every consumer.
 * The API already orders entries (upcoming/ongoing first, then past), so
 * consumers render the list as-is instead of re-sorting it.
 */
export const useAgendaList = createCachedList('/public/agenda', { paginated: true });

/** Buku & pedoman list for the Publikasi page, fetched once and shared by every consumer. */
export const useBukuPanduanList = createCachedList('/public/publikasi?jenisHalaman=buku-panduan', { paginated: true });

/** Infografis list for the Publikasi page, fetched once and shared by every consumer. */
export const useInfografisList = createCachedList('/public/publikasi?jenisHalaman=infografis', { paginated: true });

/** Video list for the Publikasi page, fetched once and shared by every consumer. */
export const useVideoList = createCachedList('/public/publikasi?jenisHalaman=video', { paginated: true });

/** Regulasi / produk hukum list, ordered by document date, newest first. */
export const useProdukHukumList = createCachedList('/public/produk-hukum');

/**
 * Kementerian terkait list, fetched once and shared by every consumer: the
 * Kontak page tiles and the navbar's Kementerian Terkait dropdown/mobile menu.
 */
export const useKementerianList = createCachedList('/public/kementerian');

/** Aplikasi terkait for the Informasi page and search, fetched once and shared by every consumer. */
export const useAplikasiList = createCachedList('/public/aplikasi');

/**
 * Mitra Kemitraan UKS/M: yearly cohorts (`kelompokTahun`) and partners with no
 * support record yet (`tanpaDukungan`), fetched once and shared by the Mitra
 * page and the Beranda partner-logo strip.
 */
export const useMitraList = createCachedList('/public/mitra');

/** Dukungan Mitra records for the Mitra page, fetched once and shared by every consumer. */
export const useDukunganMitraList = createCachedList('/public/dukungan-mitra', { paginated: true });

/** Prestasi competitions (Lomba), with nested winners, for the Program Prioritas Prestasi section. */
export const useLombaList = createCachedList('/public/lomba');

/** FAQ accordion for the Kontak page, active only, ordered by urutan then pertanyaan. */
export const useFaqList = createCachedList('/public/faq');

/** Program link groups (Tautan Program) for the Program Prioritas page's resource sections and 7KAIH habit cards. */
export const useProgramTautanList = createCachedList('/public/program-tautan');

/**
 * Site settings (Pengaturan Situs): a flat `{ "module.key": value }` object,
 * not a list, but `createCachedList` only ever passes the JSON through, so it
 * fits without a second cache helper.
 */
export const usePengaturanSettings = createCachedList('/public/pengaturan');
