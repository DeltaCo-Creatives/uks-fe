import { appsList } from '../../data/portalData';
import SafeImage from '../SafeImage';

export default function AplikasiPanel() {
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '28px' }}>
        <span className="section-kicker">Direktori Aplikasi</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Aplikasi Digital Pendukung UKS/M
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Ekosistem perangkat lunak resmi dan terverifikasi guna memfasilitasi pencatatan kesehatan, skrining gizi, edukasi pubertas, dan konseling siswa.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '22px' }}>
        {appsList.map((app) => (
          <div
            key={app.id}
            className="stat-box"
            style={{
              alignItems: 'flex-start',
              textAlign: 'left',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-card)',
              border: '1.5px solid rgba(0,0,0,0.06)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: app.bgColor || 'var(--brand-light)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    flexShrink: 0
                  }}
                >
                  <SafeImage
                    src={app.icon}
                    alt={app.name}
                    fallbackType="logo"
                    icon="fa-solid fa-mobile-screen"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: app.color || 'var(--brand-primary)',
                      background: app.bgColor || 'var(--brand-light)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-pill)',
                      display: 'inline-block',
                      marginBottom: '4px'
                    }}
                  >
                    {app.badge}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {app.name}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {app.publisher}
                  </div>
                </div>
              </div>

              {app.tagline && (
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {app.tagline}
                </div>
              )}

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                {app.description}
              </p>
            </div>

            <div style={{ width: '100%', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {app.links.map((lnk, idx) => (
                <a
                  key={idx}
                  href={lnk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill primary"
                  style={{
                    fontSize: '12px',
                    padding: '8px 16px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <i className={lnk.icon || 'fa-solid fa-download'}></i>
                  <span>Buka {lnk.store}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '9px', opacity: 0.7 }}></i>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

