import { bestPracticesList } from '../../data/portalData';

export default function PraktikPanel() {
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Inspirasi Dari Sekolah</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Praktik Baik Pembiasaan Trias &amp; 5 Sehat
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Inovasi mandiri yang berhasil diterapkan di berbagai jenjang sekolah dasar dan menengah sebagai rujukan replikasi nasional.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
        {bestPracticesList.map((bp, i) => (
          <div key={i} className="stat-box" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '26px' }}>
            <div style={{ fontSize: '32px', marginBottom: '14px' }}>{bp.icon}</div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand-primary)', background: 'var(--brand-light)', padding: '4px 10px', borderRadius: 'var(--radius-pill)', marginBottom: '10px', display: 'inline-block' }}>
              {bp.level}
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>{bp.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{bp.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

