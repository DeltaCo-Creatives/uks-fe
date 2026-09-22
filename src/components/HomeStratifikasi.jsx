import { Link } from 'react-router-dom';
import { strataLevels } from '../data/portalData';
import { pathForView } from '../routes';

/**
 * Beranda ▸ Stratifikasi UKS/M teaser — dev homepage's 4 strata boxes +
 * "Lihat Detail", both leading to UKS/M ▸ Stratifikasi UKS/M.
 */
export default function HomeStratifikasi() {
  return (
    <section id="sec-home-stratifikasi" className="section" style={{ paddingBottom: '30px' }}>
      <div className="container">
        <div className="section-header" data-gsap="reveal">
          <div>
            <span className="section-kicker">Standar Kesiapan Satpen</span>
            <h2 className="section-title">Stratifikasi UKS/M</h2>
          </div>
          <Link
            className="btn-pill primary"
            to={pathForView('uksm-stratifikasi')}
            style={{ padding: '10px 22px', fontSize: '13px' }}
          >
            Lihat Detail &rarr;
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '16px' }}>
          {strataLevels.map((lvl) => (
            <Link
              key={lvl.key}
              data-gsap="reveal"
              to={pathForView('uksm-stratifikasi', 'sec-strat-indikator')}
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                borderTop: `6px solid ${lvl.color}`,
                borderRight: '1.5px solid rgba(0,0,0,0.06)',
                borderBottom: '1.5px solid rgba(0,0,0,0.06)',
                borderLeft: '1.5px solid rgba(0,0,0,0.06)',
                boxShadow: 'var(--shadow-card)',
                padding: '24px',
                textAlign: 'left',
                cursor: 'pointer',
                font: 'inherit',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <span style={{
                alignSelf: 'flex-start',
                fontSize: '11px',
                fontWeight: 800,
                color: lvl.color,
                background: lvl.bgColor,
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)'
              }}>
                STRATA {lvl.code}
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                {lvl.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
