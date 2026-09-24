import { useTautanList } from '../hooks/usePublicLists';

export default function NavTautanDropdown({ isOpen, onClose }) {
  // Every page mounts the navbar, so a loading/failed fetch must stay silent
  // here: the dropdown just renders with nothing in it, never an error state.
  const { data } = useTautanList();
  const groups = data ?? [];
  const totalLinks = groups.reduce((sum, group) => sum + group.tautan.length, 0);

  return (
    <div
      className={`nav-cluster-dropdown ${isOpen ? 'is-open' : ''}`}
      style={{ width: '840px' }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose?.();
      }}
    >
      <div className="nav-cluster-panel">
        <div className="nav-cluster-header">
          <div className="nav-cluster-title">
            <i className="fa-solid fa-link" style={{ color: 'var(--brand-primary)' }}></i>
            <span>Tautan Lembaga &amp; Direktorat Pembina UKS/M</span>
          </div>
          {groups.length > 0 && (
            <span style={{ fontSize: '10px', background: 'var(--brand-light)', color: 'var(--brand-primary)', padding: '3px 8px', borderRadius: '999px', fontWeight: 800 }}>
              {groups.length} KEMENTERIAN · {totalLinks} TAUTAN
            </span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
          {groups.map((group) => (
            <div
              key={group.id}
              style={{
                background: 'var(--bg-card-alt)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                border: '1px solid rgba(0, 0, 0, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '8px', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                <i className={group.ikon} style={{ color: 'var(--brand-primary)', fontSize: '14px' }}></i>
                <h4 style={{ fontSize: '13px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  {group.nama}
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {group.tautan.map((lnk) => (
                  <a
                    key={lnk.id}
                    href={lnk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onClose?.()}
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      padding: '4px 6px',
                      borderRadius: 'var(--radius-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '6px',
                      transition: 'var(--ease)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--brand-primary)';
                      e.currentTarget.style.background = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span style={{ lineHeight: 1.35 }}>{lnk.label}</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '9px', opacity: 0.6, flexShrink: 0 }}></i>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

