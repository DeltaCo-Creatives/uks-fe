import { useKementerianList } from '../hooks/usePublicLists';
import { NEW_TAB_HINT } from '../utils/linkKind';
import { packSpans, wideIndex } from './navKementerianLayout';

const STATES = {
  loading: { icon: 'fa-solid fa-circle-notch fa-spin', title: 'Memuat daftar kementerian...' },
  empty: {
    icon: 'fa-solid fa-building-columns',
    title: 'Belum ada kementerian terkait',
    text: 'Daftar tautan akan tampil di sini begitu tersedia.'
  },
  error: {
    icon: 'fa-solid fa-triangle-exclamation',
    title: 'Daftar kementerian tidak dapat dimuat',
    text: 'Terjadi gangguan saat mengambil data. Silakan coba lagi.'
  }
};

const normalize = (text) => String(text ?? '').toLowerCase().replace(/\s+/g, ' ').trim();

// Kemenkes and BGN list a link named after themselves, so the caption would only repeat it.
const showNama = (group) =>
  Boolean(group.nama) && !group.tautan.some((link) => normalize(link.label) === normalize(group.nama));

function statusOf(groups, loading, error) {
  if (groups.length > 0) return null;
  if (loading) return 'loading';
  return error ? 'error' : 'empty';
}

function PanelState({ status, onRetry }) {
  const { icon, title, text } = STATES[status];
  return (
    <div className="nav-kem-state" role="status">
      <i className={icon} aria-hidden="true"></i>
      <h4>{title}</h4>
      {text && <p>{text}</p>}
      {status === 'error' && (
        <button type="button" className="nav-kem-retry" onClick={onRetry}>
          Coba Lagi
        </button>
      )}
    </div>
  );
}

function KementerianCard({ group, span, solid, onClose }) {
  const headingId = `nav-kem-heading-${group.id}`;
  const columns = Math.min(span, group.tautan.length);

  return (
    <div className={`nav-kem-card${span > 1 ? ` span-${span}` : ''}`}>
      <div className="nav-kem-head">
        <span className={`nav-cluster-icon${solid ? ' is-solid' : ''}`} aria-hidden="true">
          <i className={group.ikon}></i>
        </span>
        <div className="nav-kem-id">
          <h4 id={headingId}>{group.singkatan}</h4>
          {showNama(group) && <p>{group.nama}</p>}
        </div>
      </div>

      <ul className={`nav-kem-links${columns > 1 ? ` cols-${columns}` : ''}`} aria-labelledby={headingId}>
        {group.tautan.map((link, index) => (
          <li key={`${index}-${link.label}`}>
            <a className="nav-kem-link" href={link.url} target="_blank" rel="noopener noreferrer" onClick={onClose}>
              <span className="nav-kem-label">{link.label}</span>
              <span className="sr-only"> {NEW_TAB_HINT}</span>
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NavKementerianDropdown({ isOpen, onClose, onRetry }) {
  const { data, loading, error, retry } = useKementerianList();
  const groups = (data ?? []).filter((ministry) => ministry.tautan.length > 0);
  const status = statusOf(groups, loading, error);

  const wide = wideIndex(groups.map((group) => group.tautan.length));
  const spans = packSpans(groups.map((_, index) => (index === wide ? 2 : 1)));

  // The Coba Lagi button is replaced by the loading block, so focus would drop to <body> without this.
  const handleRetry = () => {
    retry();
    onRetry?.();
  };

  return (
    <div
      id="nav-kementerian-panel"
      className={`nav-cluster-dropdown nav-kem-dropdown ${isOpen ? 'is-open' : ''}`}
    >
      <div className="nav-cluster-panel">
        <div className="nav-cluster-header">
          <h3 className="nav-cluster-title">
            <i className="fa-solid fa-link" aria-hidden="true"></i>
            <span>Kementerian Terkait &amp; Direktorat Pembina UKS/M</span>
          </h3>
          {groups.length > 0 && (
            <p className="nav-kem-note">
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              <span>Dibuka di tab baru</span>
            </p>
          )}
        </div>

        {status ? (
          <PanelState status={status} onRetry={handleRetry} />
        ) : (
          <div className="nav-kem-grid">
            {groups.map((group, index) => (
              <KementerianCard
                key={group.id}
                group={group}
                span={spans[index]}
                solid={index === wide}
                onClose={onClose}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
