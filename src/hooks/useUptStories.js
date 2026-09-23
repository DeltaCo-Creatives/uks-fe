import { createCachedList } from './createCachedList';

/** UPT Bercerita list for the page, fetched once and shared by every consumer. */
export const useUptStoriesList = createCachedList('/public/upt-bercerita');
