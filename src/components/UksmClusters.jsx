import ProfilPage from './uksm/profil/ProfilPage';
import TriasPage from './uksm/TriasPage';
import StratifikasiPage from './uksm/StratifikasiPage';

const CLUSTERS = [
  { key: 'uksm-profil', icon: 'fa-solid fa-landmark', label: '1. Profil & Tata Kelola' },
  { key: 'uksm-trias', icon: 'fa-solid fa-shield-heart', label: '2. TRIAS UKS/M' },
  { key: 'uksm-stratifikasi', icon: 'fa-solid fa-layer-group', label: '3. Stratifikasi UKS/M' }
];

export default function UksmClusters({ activeSubpage, onChangeView }) {
  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <nav className="subnav-3bar-wrapper" aria-label="Kluster UKS/M">
        <div className="subnav-3bar">
          {CLUSTERS.map((cluster) => {
            const isActive = activeSubpage === cluster.key;
            return (
              <button
                key={cluster.key}
                className={`subnav-pill ${isActive ? 'active' : ''}`}
                onClick={() => onChangeView(cluster.key)}
                aria-current={isActive ? 'page' : undefined}
              >
                <i className={cluster.icon} aria-hidden="true"></i>
                <span>{cluster.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {activeSubpage === 'uksm-profil' && <ProfilPage onNavigate={onChangeView} />}
      {activeSubpage === 'uksm-trias' && <TriasPage />}
      {activeSubpage === 'uksm-stratifikasi' && <StratifikasiPage />}
    </div>
  );
}
