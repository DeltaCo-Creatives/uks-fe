import { useMemo } from 'react';
import { usePengaturanSettings, useFooterTautanList } from '@/hooks/usePublicLists';
import { buildFooterConfig } from './resolveFooter';

/** Props for every footer column: `{ brand, kontak, navigasi, statistik, bottom }`, each with `status` ('loading' | 'ready' | 'fallback') and, for columns, `visible`. */
export function useFooterConfig() {
  const { data: settings, loading: settingsLoading } = usePengaturanSettings();
  const { data: links, loading: linksLoading } = useFooterTautanList();

  return useMemo(
    () => buildFooterConfig({ settings, settingsLoading, links, linksLoading }),
    [settings, settingsLoading, links, linksLoading]
  );
}
