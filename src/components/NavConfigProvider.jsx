import { useEffect, useMemo, useState } from 'react';
import { pageNavigationConfigs } from '@/data/portalData';
import { useProgramList, useSubmenuList } from '@/hooks/usePublicLists';
import { NavConfigContext } from '@/hooks/useNavConfig';
import { TEMPLATE_PANELS } from '@/pages/templatePanels';
import { sectionIdForTab, setActiveConfigs } from '@/routes';
import { LoadingState } from './shared/AsyncState';

// After this, a hanging API stops blocking and the static tabs render; dynamic ones replace them on arrival.
const NAV_WAIT_MS = 4000;

// Static tabs only while a list failed or is pending; a loaded empty list means every tab is hidden.
const orFallback = (viewKey, sections, loaded) =>
  loaded ? sections : pageNavigationConfigs[viewKey].sections;

function submenuSections(viewKey, rows) {
  const panels = TEMPLATE_PANELS[viewKey];
  return (rows || [])
    .filter((row) => row.menu === viewKey && panels[row.template])
    .map((row) => ({
      id: sectionIdForTab(viewKey, row.slug),
      submenuId: row.id,
      slug: row.slug,
      label: row.label,
      icon: row.ikon,
      template: row.template
    }));
}

const programSections = (programs) =>
  (programs || []).map((program, index) => ({
    id: sectionIdForTab('program', program.slug),
    slug: program.slug,
    label: `${index + 1}. ${program.labelNav || program.judul}`,
    icon: program.ikon
  }));

function buildConfigs(submenus, programs) {
  const withSections = (viewKey, sections, loaded) => ({
    ...pageNavigationConfigs[viewKey],
    sections: orFallback(viewKey, sections, loaded)
  });
  return {
    ...pageNavigationConfigs,
    informasi: withSections('informasi', submenuSections('informasi', submenus), Array.isArray(submenus)),
    publikasi: withSections('publikasi', submenuSections('publikasi', submenus), Array.isArray(submenus)),
    program: withSections('program', programSections(programs), Array.isArray(programs))
  };
}

/** Holds its children until the submenu and program lists settle, so no route resolves against stale tabs. */
export default function NavConfigProvider({ children }) {
  const submenus = useSubmenuList();
  const programs = useProgramList();
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), NAV_WAIT_MS);
    return () => clearTimeout(timer);
  }, []);
  const settled = timedOut || (!submenus.loading && !programs.loading);

  const configs = useMemo(() => {
    const built = buildConfigs(submenus.data, programs.data);
    // ponytail: set during render (children's route helpers read it on first render); idempotent per memo.
    setActiveConfigs(built);
    return built;
  }, [submenus.data, programs.data]);

  if (!settled) {
    return (
      <div className="container py-24">
        <LoadingState label="Memuat portal..." />
      </div>
    );
  }

  return <NavConfigContext.Provider value={configs}>{children}</NavConfigContext.Provider>;
}
