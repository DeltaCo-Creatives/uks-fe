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
