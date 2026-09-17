/**
 * Stand-in for copy that has to come from the dev site. Visible in every
 * build so it can't be mistaken for final content; dev builds also show
 * where the real text lives.
 *
 * @param {{
 *   title: string,
 *   note: string,
 *   source: string,
 *   children?: import('react').ReactNode
 * }} props
 */
export default function ContentPlaceholder({ title, note, source, children }) {
  return (
    <div
      data-gsap="reveal"
      style={{
        border: '2px dashed rgba(9, 140, 76, 0.3)',
        borderRadius: 'var(--radius-xl)',
        background: 'rgba(9, 140, 76, 0.04)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <i className="fa-regular fa-file-lines" style={{ color: 'var(--brand-primary)', fontSize: '18px' }}></i>
        <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>Konten {title} menyusul</strong>
        {import.meta.env.DEV && <TodoTag source={source} />}
      </div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{note}</p>
      {children}
    </div>
  );
}

/**
 * Dev-only marker for a single missing value inside otherwise real content.
 *
 * @param {{ source: string }} props
 */
export function TodoTag({ source }) {
  return (
    <span style={{
      fontSize: '10px',
      fontFamily: 'monospace',
      background: 'rgba(0, 0, 0, 0.6)',
      color: '#FFFFFF',
      padding: '2px 8px',
      borderRadius: '4px'
    }}>
      TODO(content) · {source}
    </span>
  );
}
