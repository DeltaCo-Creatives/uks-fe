import { useAplikasiList } from '@/hooks/usePublicLists';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import SafeImage from '@/components/SafeImage';
import { PANEL_HEAD_STACKED, PANEL_TITLE, PANEL_DESC, GRID } from '../styles';

export default function AplikasiPanel() {
  const { data: apps, loading, error, retry } = useAplikasiList();

  return (
    <div className="about-bento-frame">
      <div className={PANEL_HEAD_STACKED}>
        <span className="section-kicker">Direktori Aplikasi</span>
        <h2 className={PANEL_TITLE}>Aplikasi Digital Pendukung UKS/M</h2>
        <p className={PANEL_DESC}>
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
          <div className={GRID}>
            {apps.map((app) => (
              <article
                key={app.id}
                className="flex flex-col justify-between rounded-card border-[1.5px] border-rule-soft bg-card p-6 shadow-raised max-[768px]:p-[18px]"
              >
                <div>
                  <div className="mb-4 flex items-center gap-3.5">
                    <div className="size-[60px] flex-none overflow-hidden rounded-[14px] bg-brand-light max-[768px]:size-[52px]" style={{ background: app.warnaLatar || 'var(--brand-light)' }}>
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
                          className="mb-1 inline-block rounded-[999px] px-2 py-[3px] text-[10px] font-extrabold"
                          style={{ color: app.warna || 'var(--brand-deep)', background: app.warnaLatar || 'var(--brand-light)' }}
                        >
                          {app.badge}
                        </span>
                      )}
                      <h3 className="m-0 text-[17px] leading-[1.3] font-extrabold text-ink">{app.nama}</h3>
                      <div className="text-[12px] font-semibold text-ink-muted">{app.penerbit}</div>
                    </div>
                  </div>

                  {app.tagline && <div className="mb-2 text-[13px] font-bold text-ink">{app.tagline}</div>}

                  <p className="mb-[18px] text-[13px] leading-[1.6] text-ink-muted">{app.deskripsi}</p>
                </div>

                <div className="flex w-full flex-wrap gap-2.5 border-t border-rule-soft pt-4">
                  {(app.tautan || []).map((lnk, idx) => (
                    <a
                      key={idx}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill primary min-h-[44px] no-underline max-[768px]:flex-[1_1_auto] max-[768px]:justify-center"
                    >
                      <i className={lnk.ikon || 'fa-solid fa-download'} aria-hidden="true"></i>
                      <span>Buka {lnk.store}</span>
                      <span className="sr-only">(membuka tab baru)</span>
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

