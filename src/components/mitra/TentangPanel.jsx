import { mitraAbout } from '../../data/portalData';

export default function TentangPanel() {
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '28px' }}>
        <span className="section-kicker">Ikhtisar Sinergi</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 12px', color: 'var(--text-primary)' }}>
          Tentang Kemitraan UKS/M Nasional
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '880px' }}>
          {mitraAbout.intro}
        </p>
      </div>

      {/* 4 Core Principles */}
      <div style={{ marginBottom: '36px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
          Prinsip Dasar Kerja Sama
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '16px' }}>
          {mitraAbout.principles.map((pr, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                border: '1.5px solid rgba(0,0,0,0.06)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--brand-light)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                  {i + 1}
                </span>
                <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  {pr.title}
                </h4>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {pr.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bidang Usaha Mitra */}
      <div style={{ marginBottom: '36px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
          Bidang Usaha Mitra
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '16px' }}>
          {mitraAbout.bidangUsaha.map((bu, i) => (
            <div
              key={i}
              className="stat-box"
              style={{ alignItems: 'flex-start', textAlign: 'left', padding: '22px' }}
            >
              <div className="program-icon" style={{ background: 'var(--brand-light)', color: 'var(--brand-primary)', marginBottom: '12px' }}>
                <i className={bu.icon}></i>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
                {bu.title}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {bu.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bentuk Dukungan Mitra */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
          Bentuk Dukungan Kerja Sama
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px' }}>
          {mitraAbout.bentukDukungan.map((bd, i) => (
            <div
              key={i}
              className="stat-box"
              style={{ alignItems: 'flex-start', textAlign: 'left', padding: '22px' }}
            >
              <div className="program-icon" style={{ background: '#DBEAFE', color: '#2563EB', marginBottom: '12px' }}>
                <i className={bd.icon}></i>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
                {bd.title}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {bd.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

