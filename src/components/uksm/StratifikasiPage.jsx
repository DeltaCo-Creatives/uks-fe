import {
  STRATIFIKASI_SOURCE,
  STRATIFIKASI_DASHBOARD_URL,
  stratifikasiIntro,
  stratifikasiGoals,
  stratifikasiScoring,
  stratifikasiIndicatorIntro,
  strataCategories,
  strataLevels
} from '../../data/portalData';
import ContentPlaceholder from '../ContentPlaceholder';
import StrataExplorer from './StrataExplorer';

/** Tujuan: the 4 goals as a compact icon list. */
function GoalsCard() {
  return (
    <div id="sec-strat-tujuan" className="strat-overview-card" data-gsap="reveal">
      <h3 className="strat-overview-title">
        <i className="fa-solid fa-bullseye" aria-hidden="true"></i> Tujuan Stratifikasi UKS
      </h3>
      <ul className="strat-goal-list">
        {stratifikasiGoals.map((goal) => (
          <li key={goal.id}>
            <span className="strat-goal-icon" aria-hidden="true"><i className={goal.icon}></i></span>
            <span>
              <strong>{goal.title}</strong>
              <span>{goal.description}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Cara Penilaian: the official rule, with the 4 areas that must all be met shown as chips. */
function ScoringCard() {
  return (
    <div id="sec-strat-penilaian" className="strat-overview-card strat-scoring-card" data-gsap="reveal">
      <h3 className="strat-overview-title">
        <i className="fa-solid fa-scale-balanced" aria-hidden="true"></i> {stratifikasiScoring.title}
      </h3>
      <p className="strat-scoring-rule">Satu strata tercapai jika <strong>semua indikator di 4 bidang ini terpenuhi</strong>:</p>
      <div className="strat-area-chips">
        {strataCategories.map((cat) => (
          <span key={cat.id} className="strat-area-chip">
            <i className={cat.icon} aria-hidden="true"></i> {cat.title}
          </span>
        ))}
      </div>
      <div className="strat-level-flow" aria-label="Urutan strata">
        {strataLevels.map((lvl, idx) => (
          <span key={lvl.key} className="strat-level-flow-item">
            <span style={{ color: lvl.color }}>{lvl.name}</span>
            {idx < strataLevels.length - 1 && <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>}
          </span>
        ))}
      </div>
      <p className="strat-scoring-official">{stratifikasiScoring.body}</p>
    </div>
  );
}

/**
 * UKS/M ▸ Stratifikasi UKS/M — dev's /stratifikasi-uks content: a short
 * overview (pengertian, tujuan, penilaian), the strata explorer (SD rubric),
 * then the external dashboard.
 */
export default function StratifikasiPage() {
  return (
    <div>
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-layer-group"></i> Kluster 3 · Stratifikasi UKS/M
        </span>
        <h1 className="subpage-hero-title">Stratifikasi UKS</h1>
        <p className="subpage-hero-desc">{stratifikasiIntro.body}</p>
        <a className="btn-pill strat-hero-cta" href={STRATIFIKASI_DASHBOARD_URL} target="_blank" rel="noopener noreferrer">
          Masuk ke Dasbor Stratifikasi UKS/M <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
      </div>

      <section id="sec-strat-pengertian" className="section strat-section" style={{ paddingTop: '10px' }}>
        <div className="section-header" data-gsap="reveal">
          <div>
            <span className="section-kicker">Sekilas</span>
            <h2 className="section-title">{stratifikasiIntro.title}</h2>
          </div>
        </div>
        <div className="strat-overview-grid">
          <ScoringCard />
          <GoalsCard />
        </div>
      </section>

      <section id="sec-strat-indikator" className="section strat-section">
        <div className="section-header" data-gsap="reveal">
          <div>
            <span className="section-kicker">Indikator · Jenjang SD</span>
            <h2 className="section-title">Indikator per Strata</h2>
            <p className="strat-section-desc">{stratifikasiIndicatorIntro} Pilih strata untuk melihat indikatornya.</p>
          </div>
        </div>

        <StrataExplorer />

        <div style={{ marginTop: '20px' }}>
          <ContentPlaceholder
            source={`${STRATIFIKASI_SOURCE} (CMS hanya punya rubrik SD)`}
            title="Indikator jenjang PAUD, SMP, dan SMA/SMK"
            note="Indikator di atas berlaku untuk jenjang SD. Indikator untuk jenjang lainnya akan ditambahkan."
          />
        </div>
      </section>

      <section className="section">
        <div className="strat-dashboard-cta" data-gsap="reveal">
          <span className="strat-dashboard-icon" aria-hidden="true"><i className="fa-solid fa-chart-column"></i></span>
          <div className="strat-dashboard-text">
            <h3>Dasbor Stratifikasi UKS/M</h3>
            <p>Penilaian strata sekolah/madrasah dilakukan melalui dasbor resmi Stratifikasi UKS/M.</p>
          </div>
          <a className="btn-pill primary strat-dashboard-btn" href={STRATIFIKASI_DASHBOARD_URL} target="_blank" rel="noopener noreferrer">
            Masuk ke Dasbor <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        </div>
      </section>
    </div>
  );
}
