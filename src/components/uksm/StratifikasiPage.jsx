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

const cardStyle = {
  background: '#FFFFFF',
  borderRadius: 'var(--radius-lg)',
  padding: '22px',
  boxShadow: 'var(--shadow-card)'
};

const iconBadgeStyle = (color, bg) => ({
  width: '40px',
  height: '40px',
  borderRadius: 'var(--radius-md)',
  background: bg,
  color,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '17px',
  flexShrink: 0
});

function SectionHeader({ kicker, title }) {
  return (
    <div className="section-header" data-gsap="reveal">
      <div>
        <span className="section-kicker">{kicker}</span>
        <h2 className="section-title">{title}</h2>
      </div>
    </div>
  );
}

/** One strata: dev's sentence + the 4 categories, each with its SD requirements. */
function StrataBlock({ strata, previous }) {
  return (
    <div style={{ ...cardStyle, borderTop: `6px solid ${strata.color}`, padding: 'clamp(20px, 3vw, 28px)' }} data-gsap="reveal">
      <span className="indicator-card-tag" style={{ background: strata.bgColor, color: strata.color }}>
        STRATA {strata.code}
      </span>
      <h3 style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
        {strata.name}
      </h3>
      <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 18px' }}>
        Apabila sekolah telah memenuhi seluruh indikator {strata.name.toLowerCase()}:
        {previous && (
          <>
            {' '}
            <strong style={{ color: 'var(--text-primary)' }}>
              dipenuhinya strata {previous.name.toLowerCase()}, plus:
            </strong>
          </>
        )}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '14px', alignItems: 'start' }}>
        {strataCategories.map((cat, idx) => (
          <div key={cat.id} style={{ background: 'var(--bg-card-alt)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ ...iconBadgeStyle(strata.color, strata.bgColor), width: '30px', height: '30px', fontSize: '12px', borderRadius: '50%' }}>
                <i className={cat.icon}></i>
              </span>
              <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                {idx + 1}. {cat.title}
              </h4>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0, padding: 0 }}>
              {strata.requirementsSD[cat.id].map((req) => (
                <li key={req} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '13px', lineHeight: 1.55, color: 'var(--text-primary)' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: strata.color, marginTop: '4px', fontSize: '11px' }}></i>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * UKS/M ▸ Stratifikasi UKS/M — mirrors dev's /stratifikasi-uks page:
 * pengertian, tujuan, cara penilaian, indikator (4 strata), then the
 * external dashboard CTA. Indicator details are dev's SD rubric.
 */
export default function StratifikasiPage() {
  return (
    <div>
      {/* Subpage Hero Banner */}
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-layer-group"></i> Kluster 3 · Stratifikasi UKS/M
        </span>
        <h1 className="subpage-hero-title">Stratifikasi UKS</h1>
        <p className="subpage-hero-desc">
          {strataLevels.map((s) => s.name).join(' · ')}
        </p>
      </div>

      {/* 1. Pengertian */}
      <section id="sec-strat-pengertian" className="section" style={{ paddingTop: '10px' }}>
        <SectionHeader kicker="Pengertian" title={stratifikasiIntro.title} />
        <div className="about-card" data-gsap="reveal" style={{ ...cardStyle, display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <span style={iconBadgeStyle('var(--brand-primary)', 'var(--brand-light)')}>
            <i className="fa-solid fa-circle-info"></i>
          </span>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-primary)', margin: 0 }}>
            {stratifikasiIntro.body}
          </p>
        </div>
      </section>

      {/* 2. Tujuan */}
      <section id="sec-strat-tujuan" className="section">
        <SectionHeader kicker="Tujuan" title="Tujuan Stratifikasi UKS" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '16px' }}>
          {stratifikasiGoals.map((goal) => (
            <div key={goal.id} style={cardStyle} data-gsap="reveal">
              <span style={{ ...iconBadgeStyle('var(--brand-primary)', 'var(--brand-light)'), marginBottom: '14px' }}>
                <i className={goal.icon}></i>
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>{goal.title}</h3>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{goal.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Cara Penilaian */}
      <section id="sec-strat-penilaian" className="section">
        <SectionHeader kicker="Penilaian" title={stratifikasiScoring.title} />
        <div data-gsap="reveal" style={{
          ...cardStyle,
          border: '2px solid var(--brand-accent)',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start'
        }}>
          <span style={iconBadgeStyle('#D97706', '#FEF3C7')}>
            <i className="fa-solid fa-scale-balanced"></i>
          </span>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-primary)', margin: 0 }}>
            {stratifikasiScoring.body}
          </p>
        </div>
      </section>

      {/* 4. Indikator — 4 strata, SD rubric */}
      <section id="sec-strat-indikator" className="section">
        <div className="section-header" data-gsap="reveal">
          <div>
            <span className="section-kicker">Indikator · Jenjang SD</span>
            <h2 className="section-title">Indikator</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '8px 0 0' }}>
              {stratifikasiIndicatorIntro}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {strataLevels.map((strata, idx) => (
            <StrataBlock key={strata.key} strata={strata} previous={strataLevels[idx - 1]} />
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <ContentPlaceholder
            source={`${STRATIFIKASI_SOURCE} (CMS hanya punya rubrik SD)`}
            title="Indikator jenjang PAUD, SMP, dan SMA/SMK"
            note="Indikator di atas berlaku untuk jenjang SD. Indikator untuk jenjang lainnya akan ditambahkan."
          />
        </div>
      </section>

      {/* Closing CTA — external dashboard */}
      <section className="section">
        <div data-gsap="reveal" style={{
          ...cardStyle,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <span style={iconBadgeStyle('var(--brand-primary)', 'var(--brand-light)')}>
              <i className="fa-solid fa-chart-column"></i>
            </span>
            <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Dasbor Stratifikasi UKS/M
            </h3>
          </div>
          <a
            className="btn-pill primary"
            href={STRATIFIKASI_DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '10px 22px', fontSize: '13px', textDecoration: 'none' }}
          >
            Masuk ke Dasbor Stratifikasi UKS/M <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '11px', marginLeft: '6px' }}></i>
          </a>
        </div>
      </section>
    </div>
  );
}
