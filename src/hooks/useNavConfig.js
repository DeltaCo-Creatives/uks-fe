import { createContext, useContext } from 'react';
import { pageNavigationConfigs } from '@/data/portalData';

export const NavConfigContext = createContext(pageNavigationConfigs);

/** The page navigation configs, with API-driven tabs for Informasi, Publikasi and Program. */
export const useNavConfig = () => useContext(NavConfigContext);
