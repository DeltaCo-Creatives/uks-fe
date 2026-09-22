import { appsList } from '../../data/portalData';
import SafeImage from '../SafeImage';

export default function AplikasiPanel() {
  return (
    <div className="about-bento-frame">
      <div className="info-panel-head is-stacked">
        <span className="section-kicker">Direktori Aplikasi</span>
        <h2 className="info-panel-title">Aplikasi Digital Pendukung UKS/M</h2>
        <p className="info-panel-desc">
          Aplikasi resmi untuk pencatatan kesehatan, skrining gizi, edukasi pubertas, dan konseling siswa.
        </p>
      </div>

      <div className="info-grid">
        {appsList.map((app) => (
          <article key={app.id} className="info-app">
            <div>
              <div className="info-app-head">
                <div className="info-app-icon" style={{ background: app.bgColor || 'var(--brand-light)' }}>
                  <SafeImage
                    src={app.icon}
                    alt=""
                    fallbackType="logo"
                    icon="fa-solid fa-mobile-screen"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <span
                    className="info-app-badge"
                    style={{ color: app.color || 'var(--brand-deep)', background: app.bgColor || 'var(--brand-light)' }}
                  >
                    {app.badge}
                  </span>
                  <h3 className="info-app-name">{app.name}</h3>
                  <div className="info-app-publisher">{app.publisher}</div>
                </div>
              </div>

              {app.tagline && <div className="info-app-tagline">{app.tagline}</div>}

              <p className="info-app-desc">{app.description}</p>
            </div>

            <div className="info-app-links">
              {app.links.map((lnk, idx) => (
                <a
                  key={idx}
                  href={lnk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill primary info-app-link"
                >
                  <i className={lnk.icon || 'fa-solid fa-download'} aria-hidden="true"></i>
                  <span>Buka {lnk.store}</span>
                  <span className="info-sr-only">(membuka tab baru)</span>
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

