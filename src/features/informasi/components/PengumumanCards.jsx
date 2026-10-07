import { Link } from 'react-router-dom';
import { pathForPengumuman } from '@/routes';
import { downloadFile } from '@/utils/downloadFile';
import { NEW_TAB_HINT } from '@/utils/linkKind';
import { countdownLabel, periodeLabel, canDaftar } from '@/utils/kesempatan';
import { CARD_PLAIN, CARD_META, CARD_DATE, CARD_TITLE, CARD_EXCERPT, CARD_FOOT, CARD_FOOT_ITEM } from '../styles';
import { PentingBadge, PinnedMarker, StatusBadge } from './PengumumanBadges';

const RINGKASAN = `mb-3 text-[13px] leading-[1.6] text-ink-muted ${CARD_EXCERPT}`;

function ReadMore({ item }) {
  return (
    <Link to={pathForPengumuman(item.slug, item.submenuSlug)} className={CARD_FOOT_ITEM}>
      Baca selengkapnya <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
    </Link>
  );
}

export function PengumumanCard({ item }) {
  return (
    <article className={CARD_PLAIN}>
      {item.isPinned && <PinnedMarker />}
      <div className={CARD_META}>
        <span className={CARD_DATE}>
          <i className="fa-regular fa-calendar" aria-hidden="true"></i> {item.tanggalTerbitLabel}
        </span>
        {item.isPenting && <PentingBadge />}
      </div>
      <h3 className={CARD_TITLE}>{item.judul}</h3>
      {item.ringkasan && <p className={RINGKASAN}>{item.ringkasan}</p>}
      <div className={CARD_FOOT}>
        <ReadMore item={item} />
        {item.lampiranUrl && (
          <a
            href={item.lampiranUrl}
            download
            className="inline-flex items-center gap-1.5 text-[12px] font-bold text-ink-muted hover:text-brand-deep"
            onClick={(e) => downloadFile(e, item.lampiranUrl, item.judul)}
          >
            <i className="fa-solid fa-download" aria-hidden="true"></i> Unduh lampiran
          </a>
        )}
      </div>
    </article>
  );
}

export function KesempatanCard({ item }) {
  const countdown = countdownLabel(item);
  return (
    <article className={CARD_PLAIN}>
      {item.isPinned && <PinnedMarker />}
      <div className={CARD_META}>
        <StatusBadge status={item.status} />
        {item.isPenting && <PentingBadge />}
      </div>
      <h3 className={CARD_TITLE}>{item.judul}</h3>
      {countdown && <p className="mb-1 text-[13px] font-extrabold text-ink">{countdown}</p>}
      <p className="mb-2 text-[12px] font-semibold text-ink-muted">
        <i className="fa-regular fa-calendar" aria-hidden="true"></i> {periodeLabel(item)}
      </p>
      {item.ringkasan && <p className={RINGKASAN}>{item.ringkasan}</p>}
      <div className={CARD_FOOT}>
        <ReadMore item={item} />
        {canDaftar(item) && (
          <a
            href={item.linkDaftar}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill primary no-underline"
            aria-label={`Daftar ${item.judul} ${NEW_TAB_HINT}`}
          >
            Daftar <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        )}
      </div>
    </article>
  );
}
