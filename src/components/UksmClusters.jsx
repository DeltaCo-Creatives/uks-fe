import ProfilPage from './uksm/profil/ProfilPage';
import TriasPage from './uksm/TriasPage';
import StratifikasiPage from './uksm/StratifikasiPage';
import GssPage from './uksm/gss/GssPage';

export default function UksmClusters({ activeSubpage, onChangeView }) {
  return (
    <div className="container" style={{ paddingBottom: '80px' }}>

      {/* ============================================================
          THE 3-BAR SUBNAV SWITCHER (LOCKED-IN SYSTEM)
          ============================================================ */}
      <div className="subnav-3bar-wrapper" style={{ textAlign: 'center' }}>
        <div className="subnav-3bar">
          <button
            className={`subnav-pill ${activeSubpage === 'uksm-profil' ? 'active' : ''}`}
            onClick={() => onChangeView('uksm-profil')}
          >
            <i className="fa-solid fa-landmark"></i>
            <span>1. Profil &amp; Tata Kelola</span>
          </button>
          <button
            className={`subnav-pill ${activeSubpage === 'uksm-trias' ? 'active' : ''}`}
            onClick={() => onChangeView('uksm-trias')}
          >
            <i className="fa-solid fa-shield-heart"></i>
            <span>2. TRIAS UKS/M</span>
          </button>
          <button
            className={`subnav-pill ${activeSubpage === 'uksm-stratifikasi' ? 'active' : ''}`}
            onClick={() => onChangeView('uksm-stratifikasi')}
          >
            <i className="fa-solid fa-layer-group"></i>
            <span>3. Stratifikasi UKS/M</span>
          </button>
          <button
            className={`subnav-pill ${activeSubpage === 'uksm-gss' ? 'active' : ''}`}
            onClick={() => onChangeView('uksm-gss')}
          >
            <i className="fa-solid fa-apple-whole"></i>
            <span>4. Sekolah Sehat (GSS)</span>
          </button>
        </div>
      </div>

      {/* ============================================================
          SUBPAGE 1: PROFIL & TATA KELOLA
          ============================================================ */}
      {activeSubpage === 'uksm-profil' && <ProfilPage onNavigate={onChangeView} />}

      {/* ============================================================
          SUBPAGE 2: TRIAS UKS/M (3 PILAR · 16 SUB-PROGRAM)
          ============================================================ */}
      {activeSubpage === 'uksm-trias' && <TriasPage />}

      {/* ============================================================
          SUBPAGE 3: STRATIFIKASI UKS/M (4 STRATA)
          ============================================================ */}
      {activeSubpage === 'uksm-stratifikasi' && (
        <StratifikasiPage />
      )}

      {/* ============================================================
          SUBPAGE 4: SEKOLAH SEHAT (GSS & 5 SEHAT)
          ============================================================ */}
      {activeSubpage === 'uksm-gss' && <GssPage />}

    </div>
  );
}
