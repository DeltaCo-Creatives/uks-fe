import { useMemo } from 'react';
import { useUksmList } from '@/hooks/usePublicLists';
import { mapUksm, PILLAR_STYLE } from './mapUksm';

const triasComplete = ({ triasPillarsDetail }) =>
  Object.keys(PILLAR_STYLE).every((slug) => triasPillarsDetail[slug]?.items.length > 0);

// profilTriasPillars take their title and number from the Trias pillar rows, so those must exist too.
// The Struktur rows (pembina, pelaksana) are not required: ProfilStruktur hides a tab whose row is missing.
const profilComplete = (m) =>
  Boolean(
    m.profilDefinition && m.profilTriasPillars.length && m.profilTriasPillars.every((pillar) => pillar.title) &&
    m.profilGoal && m.profilTargets && m.profilManagementComponents.length && m.profilMonev
  );

/** A payload that breaks the mapper is treated as no data, so the pages show their error state instead of unmounting the app. */
function safeMap(data) {
  try {
    return mapUksm(data);
  } catch (err) {
    console.error('UKS/M data could not be mapped', err);
    return mapUksm([]);
  }
}

/**
 * UKS/M pages (Trias, Profil, Struktur) from /public/uksm, mapped to the shapes the components read.
 * The mapped object is memoized on the list data, so its fields keep their identity between renders.
 *
 * `triasReady` / `profilReady` are true only when every row that page dereferences is present, so a
 * page can show an error instead of crashing when the API answers 200 with missing rows. The two are
 * separate, and Profil does not wait for the Struktur rows: a Struktur row can be missing (its image
 * upload failed at seed time) while Trias and the rest of Profil are fine.
 *
 * `stratifikasiReady` is true with at least one jenjang row, not all five: the rows are seeded together
 * (no image upload to fail), and a missing one only drops its tab, as with Struktur. The page needs
 * none in particular because the explorer falls back to SD, else the first row.
 */
export function useUksm() {
  const { data, loading, retry } = useUksmList();
  const mapped = useMemo(() => {
    const result = safeMap(data);
    return {
      ...result,
      triasReady: triasComplete(result),
      profilReady: profilComplete(result),
      stratifikasiReady: result.stratifikasiJenjang.length > 0
    };
  }, [data]);
  return { ...mapped, loading, retry };
}
