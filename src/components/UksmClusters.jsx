import { NavLink, Outlet } from 'react-router-dom';
import { pathForView } from '../routes';

const CLUSTERS = [
  { view: 'uksm-profil', icon: 'fa-solid fa-landmark', label: '1. Profil & Tata Kelola' },
  { view: 'uksm-trias', icon: 'fa-solid fa-shield-heart', label: '2. TRIAS UKS/M' },
  { view: 'uksm-stratifikasi', icon: 'fa-solid fa-layer-group', label: '3. Stratifikasi UKS/M' }
];

export default function UksmClusters() {
  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      {/* The bar below is sticky, so it never leaves the screen; this 1px marker sits where it starts.
          Hidden together with the bar on phones, where there is nothing to watch. */}
      <div className="subnav-3bar-sentinel" data-page-nav aria-hidden="true" style={{ height: 1, marginBottom: -1 }} />
      <nav className="subnav-3bar-wrapper" aria-label="Kluster UKS/M">
        <div className="subnav-3bar">
          {CLUSTERS.map((cluster) => (
            <NavLink
              key={cluster.view}
              to={pathForView(cluster.view)}
              className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
            >
              <i className={cluster.icon} aria-hidden="true"></i>
              <span>{cluster.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
