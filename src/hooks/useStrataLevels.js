import { useMemo } from 'react';
import { strataLevels } from '@/data/portalData';
import { usePengaturanSettings } from './usePublicLists';

const HEX = /^#[0-9A-Fa-f]{6}$/;

/** strataLevels with color/bgColor overridden by stratifikasi.<key>Warna / <key>Latar; invalid or empty values keep the static default. */
export function useStrataLevels() {
  const { data: settings } = usePengaturanSettings();
  return useMemo(() => {
    const pick = (key, fallback) => (HEX.test(settings?.[key]) ? settings[key] : fallback);
    return strataLevels.map((lvl) => ({
      ...lvl,
      color: pick(`stratifikasi.${lvl.key}Warna`, lvl.color),
      bgColor: pick(`stratifikasi.${lvl.key}Latar`, lvl.bgColor)
    }));
  }, [settings]);
}
