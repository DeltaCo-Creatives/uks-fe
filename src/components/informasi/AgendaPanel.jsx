import { nationalAgendas } from '../../data/portalData';

export default function AgendaPanel() {
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Kalender Kegiatan</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Agenda Transformasi UKS/M 2026
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Jadwal jambore dokter kecil, peringatan hari besar kesehatan, bimbingan teknis TP UKS provinsi, dan festival karya inovasi nasional.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {nationalAgendas.map((ev, i) => (
          <div key={i} className="download-doc-item" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                background: 'var(--brand-primary)', color: '#FFFFFF', padding: '10px 16px',
                borderRadius: 'var(--radius-md)', textAlign: 'center', minWidth: '70px', flexShrink: 0
              }}>
                <div style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1 }}>{ev.day}</div>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>{ev.month}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand-primary)', textTransform: 'uppercase' }}>
                  {ev.organizer}
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '4px 0 6px', color: 'var(--text-primary)' }}>
                  {ev.title}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fa-solid fa-location-dot" style={{ color: 'var(--brand-primary)' }}></i>
                  <span>{ev.location}</span>
                </div>
              </div>
            </div>
            <div style={{ alignSelf: 'center' }}>
              <span className="btn-pill secondary" style={{ fontSize: '12px', padding: '8px 16px', pointerEvents: 'none' }}>
                {ev.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

