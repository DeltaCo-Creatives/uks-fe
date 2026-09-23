import { createCachedList } from './createCachedList';

/**
 * Agenda list for the page, fetched once and shared by every consumer.
 * The API already orders entries (upcoming/ongoing first, then past), so
 * consumers render the list as-is instead of re-sorting it.
 */
export const useAgendaList = createCachedList('/public/agenda');
