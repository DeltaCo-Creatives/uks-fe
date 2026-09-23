import { createCachedList } from './createCachedList';

/** Praktik Baik list for the page, fetched once and shared by every consumer. */
export const usePraktikBaikList = createCachedList('/public/praktik-baik');
