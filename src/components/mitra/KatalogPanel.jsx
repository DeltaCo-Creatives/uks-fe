import { activePartnersList } from '../../data/portalData';

export default function KatalogPanel() {
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Direktori Lembaga</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Katalog Mitra Kolaborasi Aktif
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Daftar mitra terverifikasi yang sedang menjalankan program pendampingan, intervensi fasilitas, dan kampanye kesehatan bersama Kemendikdasmen.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '16px' }}>
        {activePartnersList.map((mit, i) => (
          <div key={i} className="partner-card-bento">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--brand-light)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                <i className="fa-solid fa-building-circle-check"></i>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{mit.name}</h4>
                <span style={{ fontSize: '11px', color: 'var(--brand-primary)', fontWeight: 800 }}>MITRA TERVERIFIKASI</span>
              </div>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
              <strong>Fokus Dukungan:</strong><br />
              {mit.role}
            </div>
            <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '12px', color: 'var(--text-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fa-solid fa-location-dot" style={{ color: 'var(--brand-primary)' }}></i>
              <span>{mit.scope}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

