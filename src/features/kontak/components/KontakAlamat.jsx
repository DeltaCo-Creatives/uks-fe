import { useKementerianList } from '@/hooks/usePublicLists';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { SECTION, SECTION_HEAD, SECTION_TITLE } from '../styles';

// Three cards, each a real definition list (label + value), not a stat tile.
const CARD = 'rounded-panel bg-card p-[26px] shadow-raised';
const CARD_ICON = 'mb-3.5 flex size-12 items-center justify-center rounded-card text-[19px]';
const CARD_TITLE = 'mb-3.5 text-[17px] font-extrabold text-ink';
const FIELDS = 'm-0 grid gap-3.5';
const FIELD = 'grid gap-[3px]';
const DT = 'text-[12px] font-bold tracking-[0.04em] text-ink-muted uppercase';
const DD = 'm-0 text-[14px] leading-[1.6] text-ink';
// Values are short inline text, so the 44px target grows the tap area with padding rather than the
// line height, to avoid a lopsided-looking row.
const LINK = '-my-[11px] inline-flex min-h-[44px] items-center py-[11px] font-bold text-brand no-underline hover:underline focus-visible:rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

/** Sekretariat address, helpdesk channels, and the related ministries. */
export default function KontakAlamat({ settings }) {
  const { data: ministries, loading, error, retry } = useKementerianList();
  const address = settings?.['kontak.address'];
  const email = settings?.['kontak.email'];
  const phone = settings?.['kontak.phone'];
  const ultPhone = settings?.['kontak.ultPhone'];
  const operatingHours = settings?.['kontak.operatingHours'];

  return (
    <section id="sec-kontak-alamat" className={SECTION} data-gsap="reveal">
      <div className="about-bento-frame">
        <div className={SECTION_HEAD}>
          <span className="section-kicker">Pusat Komunikasi</span>
          <h2 className={SECTION_TITLE}>
            Sekretariat &amp; Layanan Kontak
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">

          <div className={CARD}>
            <div className={`${CARD_ICON} bg-brand-light text-brand`}>
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <h4 className={CARD_TITLE}>Alamat Sekretariat Pusat</h4>
            <dl className={FIELDS}>
              <div className={FIELD}>
                <dt className={DT}>Instansi</dt>
                <dd className={DD}>Sekretariat Pembina UKS/M Pusat, Kementerian Pendidikan Dasar dan Menengah RI</dd>
              </div>
              {address && (
                <div className={FIELD}>
                  <dt className={DT}>Alamat</dt>
                  {/* The UA sheet italicises <address> itself, so it needs not-italic of its own. */}
                  <dd className={DD}><address className="not-italic">{address}</address></dd>
                </div>
              )}
            </dl>
          </div>

          <div id="sec-kontak-helpdesk" className={CARD}>
            <div className={`${CARD_ICON} bg-[#DBEAFE] text-[#2563EB]`}>
              <i className="fa-solid fa-headset"></i>
            </div>
            <h4 className={CARD_TITLE}>Helpdesk &amp; Call Center</h4>
            <dl className={FIELDS}>
              {ultPhone && (
                <div className={FIELD}>
                  <dt className={DT}>Call Center ULT Kemendikdasmen</dt>
                  <dd className={DD}><a className={LINK} href={`tel:${ultPhone}`}>{ultPhone}</a></dd>
                </div>
              )}
              {phone && (
                <div className={FIELD}>
                  <dt className={DT}>Hotline Khusus UKS/M</dt>
                  <dd className={DD}><a className={LINK} href={`tel:${phone}`}>{phone}</a></dd>
                </div>
              )}
              {email && (
                <div className={FIELD}>
                  <dt className={DT}>Email</dt>
                  <dd className={DD}><a className={LINK} href={`mailto:${email}`}>{email}</a></dd>
                </div>
              )}
              {operatingHours && (
                <div className={FIELD}>
                  <dt className={DT}>Jam Layanan</dt>
                  <dd className={DD}>{operatingHours}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className={CARD}>
            <div className={`${CARD_ICON} bg-[#FEF3C7] text-[#D97706]`}>
              <i className="fa-solid fa-building-columns"></i>
            </div>
            <h4 className={CARD_TITLE}>Kementerian Terkait</h4>

            {loading && <LoadingState label="Memuat daftar kementerian..." />}

            {!loading && error && (
              <ErrorState
                title="Daftar kementerian tidak dapat dimuat"
                text="Terjadi gangguan saat mengambil data kementerian. Silakan coba lagi."
                retry={retry}
              />
            )}

            {!loading && !error && (
              (ministries?.length ?? 0) === 0 ? (
                <EmptyState
                  icon="fa-solid fa-building-columns"
                  title="Belum ada kementerian terkait"
                  text="Daftar kementerian mitra akan tampil di sini begitu tersedia."
                />
              ) : (
                // One per row on a phone, and the tile turns on its side: stacked, the tiles ran
                // longer than the two cards above them put together.
                <div className="grid grid-cols-2 gap-2.5 max-[420px]:grid-cols-[minmax(0,1fr)]">
                  {ministries.map((ministry) => (
                    <a
                      key={ministry.id}
                      className="flex min-h-[44px] flex-col items-start gap-2.5 rounded-card border-[1.5px] border-[rgba(17,28,22,0.1)] p-3.5 text-ink no-underline [transition:var(--spring)] hover:border-brand hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand max-[420px]:flex-row max-[420px]:items-center max-[420px]:gap-3"
                      href={ministry.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {ministry.logoUrl ? (
                        <img className="size-8 object-contain" src={ministry.logoUrl} alt={`Logo ${ministry.nama}`} />
                      ) : (
                        <span className="flex size-8 items-center justify-center rounded-soft bg-card-alt text-[14px] text-ink-muted" aria-hidden="true">
                          <i className="fa-solid fa-building-columns"></i>
                        </span>
                      )}
                      <span>
                        <span className="block text-[13px] leading-[1.3] font-extrabold">{ministry.singkatan}</span>
                        {ministry.unit && (
                          <span className="mt-0.5 block text-[12px] font-semibold text-ink-muted">{ministry.unit}</span>
                        )}
                      </span>
                    </a>
                  ))}
                </div>
              )
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
