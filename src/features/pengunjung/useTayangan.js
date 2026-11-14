import { useEffect, useRef } from 'react';
import { countKonten } from '@/utils/counters';

// Sections whose bare path only redirects to a default tab, so only "section/tab" is a page of its own.
const SECTIONS_WITH_TAB = new Set(['uksm', 'program', 'informasi', 'publikasi']);
const SECTIONS_ALONE = new Set(['mitra', 'kontak']);

/**
 * The page key the API accepts for a pathname, or null when the path is not a countable page: a bare redirecting
 * section, a detail page (counted as an article instead) or an unknown route.
 *
 * @param {string} pathname
 * @returns {string | null} e.g. "beranda", "program/mbg", "informasi/berita"
 */
export function halamanKey(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return 'beranda';
  const [section, tab] = parts;
  if (parts.length === 1 && SECTIONS_ALONE.has(section)) return section;
  if (parts.length === 2 && SECTIONS_WITH_TAB.has(section)) return `${section}/${tab}`;
  return null;
}

/**
 * Counts one view each time `tipe`/`kunci` changes to a new value; null or empty values count nothing.
 * Never blocks or breaks the page: a failed request is ignored.
 *
 * @param {string | null | undefined} tipe
 * @param {string | null | undefined} kunci
 */
export function useTayangan(tipe, kunci) {
  const sent = useRef(null);

  useEffect(() => {
    if (!tipe || !kunci) {
      // Leaving a countable page must allow coming back to it to count again.
      sent.current = null;
      return;
    }
    const id = `${tipe}:${kunci}`;
    // StrictMode runs the effect twice with the same values; count once.
    if (sent.current === id) return;
    sent.current = id;
    countKonten(tipe, kunci);
  }, [tipe, kunci]);
}

/** Counts the portal page the pathname points at. Call it once, in the layout that stays mounted. */
export const useTayanganHalaman = (pathname) => useTayangan('halaman', halamanKey(pathname));
