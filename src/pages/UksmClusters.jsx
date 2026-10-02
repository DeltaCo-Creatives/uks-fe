import { NavLink, Outlet } from 'react-router-dom';
import { pathForView } from '@/routes';

const CLUSTERS = [
  { view: 'uksm-profil', icon: 'fa-solid fa-landmark', label: '1. Profil & Tata Kelola' },
  { view: 'uksm-trias', icon: 'fa-solid fa-shield-heart', label: '2. TRIAS UKS/M' },
  { view: 'uksm-stratifikasi', icon: 'fa-solid fa-layer-group', label: '3. Stratifikasi UKS/M' }
];

export default function UksmClusters() {
  return (
    <div className="container pb-20">
      {/* The bar below is sticky, so it never leaves the screen; this 1px marker sits where it starts.
          Hidden together with the bar on phones, where there is nothing to watch. */}
      <div className="-mb-px h-px max-[768px]:hidden" data-page-nav aria-hidden="true" />
      {/* Dropped on phones: the hamburger menu and the Daftar Isi drawer already list these clusters.
          The ::before extends the fade up behind the fixed navbar so it reads as one continuous mask. */}
      <nav
        className="sticky top-[84px] z-[990] mb-6 bg-[linear-gradient(to_bottom,rgba(244,245,244,0.95),rgba(244,245,244,0))] pt-2.5 pb-4 text-center before:pointer-events-none before:absolute before:inset-x-0 before:-top-[84px] before:h-[84px] before:bg-[rgba(244,245,244,0.95)] before:content-[''] max-[768px]:hidden"
        aria-label="Kluster UKS/M"
      >
        <div className="inline-flex gap-2 rounded-[999px] border-[1.5px] border-line bg-[rgba(255,255,255,0.92)] p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-[16px]">
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
