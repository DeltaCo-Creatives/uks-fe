import { Link, useParams } from 'react-router-dom';
import { pathForTab } from '@/routes';
import { usePengumuman } from '@/hooks/usePublicLists';
import { useNavConfig } from '@/hooks/useNavConfig';
import { StatusBadge, PentingBadge, PinnedMarker } from '@/features/informasi/components/PengumumanBadges';
import { downloadFile } from '@/utils/downloadFile';
import { NEW_TAB_HINT } from '@/utils/linkKind';
import { countdownLabel, periodeLabel, canDaftar } from '@/utils/kesempatan';
import { LoadingState, ErrorState } from './shared/AsyncState';
import NotFoundView from './NotFoundView';
import './BeritaDetailView.css';

const PAGE = 'container max-w-[980px] px-5 pt-6 pb-20';
// "!" beats the unlayered .about-bento-frame background and padding.
const FRAME = 'about-bento-frame bg-card! p-[clamp(24px,4vw,44px)]!';
const SIDE_LINK = 'inline-flex items-center gap-2 text-[14px] font-bold text-brand-deep hover:underline';

/** Detail of a pengumuman or kesempatan: the same page for both, the extra facts show when the API sends them. */
export default function PengumumanDetailView() {
  const { itemSlug, submenuSlug } = useParams();
  const { data: item, loading, error, retry } = usePengumuman(itemSlug);
  const tabSlug = item?.submenuSlug ?? submenuSlug;
  const tabLabel = useNavConfig().informasi.sections.find((s) => s.slug === tabSlug)?.label;
  const back = (
    <Link to={pathForTab('informasi', tabSlug)} className="btn-pill secondary px-5 py-2.5">
      <i className="fa-solid fa-arrow-left" aria-hidden="true"></i> Kembali ke {tabLabel ?? 'Daftar'}
    </Link>
  );

  if (loading) return <div className={PAGE}><div className={FRAME}><LoadingState label="Memuat halaman..." /></div></div>;
  if (error?.status === 404) return <NotFoundView />;
  if (error) {
    return (
      <div className={PAGE}>
        <div className={FRAME}>
          <ErrorState title="Halaman tidak dapat dimuat" retry={retry} />
          <div className="mt-4 text-center">{back}</div>
        </div>
      </div>
    );
  }
  if (!item) return <NotFoundView />;

  const isKesempatan = item.template === 'kesempatan';
  const countdown = isKesempatan ? countdownLabel(item) : null;

  return (
    <div className={PAGE}>
      <article className={FRAME}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {item.isPinned && <PinnedMarker className="" />}
          <StatusBadge status={item.status} />
          {item.isPenting && <PentingBadge />}
          <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted">
            <i className="fa-regular fa-calendar" aria-hidden="true"></i>
            {isKesempatan ? periodeLabel(item) : item.tanggalTerbitLabel}
          </span>
        </div>

        <h1 className="mb-4 text-[clamp(24px,3.8vw,38px)] leading-[1.25] font-extrabold text-ink">{item.judul}</h1>

        {countdown && <p className="mb-4 text-[15px] font-extrabold text-ink">{countdown}</p>}
        {item.ringkasan && (
          <p className="mb-7 border-l-4 border-brand pl-5 text-[clamp(16px,1.8vw,18px)] leading-[1.7] font-semibold text-brand-deep italic">
            {item.ringkasan}
          </p>
        )}

        {/* Sanitized server-side, rendered as HTML like the berita body */}
        <div className="article-html-content text-[16px] leading-[1.85] text-ink" dangerouslySetInnerHTML={{ __html: item.isi }} />

        {(item.lampiranUrl || item.tautan || canDaftar(item)) && (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule-soft pt-6">
            {canDaftar(item) && (
              <a
                href={item.linkDaftar}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill primary px-6 py-3 no-underline"
                aria-label={`Daftar ${NEW_TAB_HINT}`}
              >
                Daftar <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            )}
            {item.lampiranUrl && (
              <a
                href={item.lampiranUrl}
                download
                className={SIDE_LINK}
                onClick={(e) => downloadFile(e, item.lampiranUrl, item.judul)}
              >
                <i className="fa-solid fa-download" aria-hidden="true"></i> Unduh lampiran
              </a>
            )}
            {item.tautan && (
              <a href={item.tautan} target="_blank" rel="noopener noreferrer" className={SIDE_LINK}>
                <i className="fa-solid fa-link" aria-hidden="true"></i> Buka tautan terkait
              </a>
            )}
          </div>
        )}

        <div className="mt-10 border-t border-rule-soft pt-6">{back}</div>
      </article>
    </div>
  );
}
