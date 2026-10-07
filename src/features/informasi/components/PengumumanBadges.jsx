import { BADGE } from '../styles';

const STATUS = {
  'akan-dibuka': { label: 'Akan dibuka', tone: 'bg-card-alt text-ink' },
  dibuka: { label: 'Dibuka', tone: 'bg-brand-light text-brand-deep' },
  'segera-ditutup': { label: 'Segera ditutup', tone: 'bg-brand-accent text-ink' },
  ditutup: { label: 'Ditutup', tone: 'bg-app text-ink-muted' }
};

/** Kesempatan status pill; nothing for pengumuman (no status) or an unknown value. */
export function StatusBadge({ status }) {
  const entry = STATUS[status];
  return entry ? <span className={`${BADGE} ${entry.tone}`}>{entry.label}</span> : null;
}

export function PentingBadge() {
  return (
    <span className={`${BADGE} bg-brand-accent text-ink`}>
      <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i> Penting
    </span>
  );
}

export function PinnedMarker({ className = 'mb-2' }) {
  return (
    <span className={`${className} inline-flex items-center gap-1.5 text-[11px] font-extrabold text-brand-deep`}>
      <i className="fa-solid fa-thumbtack" aria-hidden="true"></i> Disematkan
    </span>
  );
}
