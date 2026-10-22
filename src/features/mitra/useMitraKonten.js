import { useMemo } from 'react';
import { useUksmList } from '@/hooks/usePublicLists';

const isList = Array.isArray;

// A document counts only when every key its section dereferences is there, so a 200 with a broken row shows the error state instead of crashing.
const READY = {
  'mitra-hero': () => true, // the hero has no error state: the page falls back to its fixed h1
  'mitra-panduan': (d) =>
    isList(d.groups) && d.groups.every((g) => isList(g?.items)) && d.note && isList(d.rules?.items) && isList(d.benefits?.items),
  'mitra-kriteria': (d) =>
    isList(d.sectors) && d.sectors.every((s) => isList(s?.members) && isList(s?.requirements)) && d.registration,
  'mitra-kami': (d) => isList(d.fields?.items) && isList(d.supportTypes?.items)
};

/**
 * The four Kemitraan documents (`mitra-hero`, `mitra-panduan`, `mitra-kriteria`, `mitra-kami`) from the
 * shared /public/uksm list, which NavConfigProvider has already prefetched. A document that is missing or
 * unusable stays undefined; the section shows its own error state with `retry`.
 */
export function useMitraKonten() {
  const { data, loading, retry } = useUksmList();
  const docs = useMemo(() => {
    const docOf = (slug) => {
      const dokumen = (isList(data) ? data : []).find((row) => row?.kelompok === 'mitra' && row.slug === slug)?.dokumen;
      return dokumen && READY[slug](dokumen) ? dokumen : undefined;
    };
    return { hero: docOf('mitra-hero'), panduan: docOf('mitra-panduan'), kriteria: docOf('mitra-kriteria'), kami: docOf('mitra-kami') };
  }, [data]);
  return { ...docs, loading, retry };
}
