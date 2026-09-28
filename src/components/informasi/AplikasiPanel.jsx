import { useAplikasiList } from '../../hooks/usePublicLists';
import { LoadingState, ErrorState, EmptyState } from '../shared/AsyncState';
import SafeImage from '../SafeImage';

export default function AplikasiPanel() {
  const { data: apps, loading, error, retry } = useAplikasiList();

  return (
    <div className="about-bento-frame">
      <div className="info-panel-head is-stacked">
        <span className="section-kicker">Direktori Aplikasi</span>
        <h2 className="info-panel-title">Aplikasi Digital Pendukung UKS/M</h2>
        <p className="info-panel-desc">
          Aplikasi resmi untuk pencatatan kesehatan, skrining gizi, edukasi pubertas, dan konseling siswa.
        </p>
      </div>

      {loading && <LoadingState label="Memuat daftar aplikasi..." />}

      {!loading && error && (
        <ErrorState
          title="Daftar aplikasi tidak dapat dimuat"
          text="Terjadi gangguan saat mengambil data aplikasi. Silakan coba lagi."
          retry={retry}
        />
      )}

      {!loading && !error && (
        (apps?.length ?? 0) === 0 ? (
          <EmptyState
            icon="fa-solid fa-mobile-screen"
            title="Belum ada aplikasi terkait"
            text="Daftar aplikasi pendukung UKS/M akan tampil di sini begitu tersedia."
          />
        ) : (
          <div className="info-grid">
            {apps.map((app) => (
              <article key={app.id} className="info-app">
                <div>
                  <div className="info-app-head">
                    <div className="info-app-icon" style={{ background: app.warnaLatar || 'var(--brand-light)' }}>
                      <SafeImage
                        src={app.logoUrl}
                        alt=""
                        fallbackType="logo"
                        icon="fa-solid fa-mobile-screen"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      {app.badge && (
                        <span
                          className="info-app-badge"
                          style={{ color: app.warna || 'var(--brand-deep)', background: app.warnaLatar || 'var(--brand-light)' }}
                        >
                          {app.badge}
                        </span>
                      )}
                      <h3 className="info-app-name">{app.nama}</h3>
                      <div className="info-app-publisher">{app.penerbit}</div>
                    </div>
                  </div>

                  {app.tagline && <div className="info-app-tagline">{app.tagline}</div>}

                  <p className="info-app-desc">{app.deskripsi}</p>
                </div>

                <div className="info-app-links">
                  {(app.tautan || []).map((lnk, idx) => (
                    <a
                      key={idx}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill primary info-app-link"
                    >
                      <i className={lnk.ikon || 'fa-solid fa-download'} aria-hidden="true"></i>
                      <span>Buka {lnk.store}</span>
                      <span className="info-sr-only">(membuka tab baru)</span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )
      )}
    </div>
  );
}

