import { mitraSupport } from '../../data/portalData';

export default function DukunganPanel() {
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Rekapitulasi Kontribusi</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Bentuk Dukungan Nyata Lembaga Mitra
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Matriks komitmen kemitraan strategis dalam penyediaan sarana prasarana, peningkatan kapasitas kader, dan intervensi gizi anak sekolah.
        </p>
      </div>

      {/* Desktop & Tablet HTML Table (Hidden on small mobile) */}
      <div className="table-desktop-wrap" style={{ overflowX: 'auto', display: 'block' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '13px',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <caption style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', captionSide: 'bottom' }}>
            * Data diperbarui berkala oleh Sekretariat Pembina UKS/M Pusat berdasarkan MoU/PKS resmi yang berlaku.
          </caption>
          <thead>
            <tr style={{ background: 'var(--text-primary)', color: '#FFFFFF' }}>
              <th scope="col" style={{ padding: '14px 18px', fontWeight: 800, fontSize: '13px', borderTopLeftRadius: 'var(--radius-md)' }}>
                Nama Mitra / Lembaga
              </th>
              <th scope="col" style={{ padding: '14px 18px', fontWeight: 800, fontSize: '13px' }}>
                Periode Pelaksanaan
              </th>
              <th scope="col" style={{ padding: '14px 18px', fontWeight: 800, fontSize: '13px' }}>
                Bentuk Dukungan &amp; Intervensi
              </th>
              <th scope="col" style={{ padding: '14px 18px', fontWeight: 800, fontSize: '13px' }}>
                Sasaran Satpen
              </th>
              <th scope="col" style={{ padding: '14px 18px', fontWeight: 800, fontSize: '13px', borderTopRightRadius: 'var(--radius-md)' }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {mitraSupport.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                  background: idx % 2 === 0 ? '#FFFFFF' : 'var(--bg-app)',
                  transition: 'background 0.2s ease'
                }}
              >
                <td style={{ padding: '14px 18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-building-circle-check" style={{ color: 'var(--brand-primary)', fontSize: '14px' }}></i>
                    <span>{row.partner}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {row.period}
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {row.support}
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                  {row.target}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '11px',
                      fontWeight: 800,
                      background: row.status === 'Aktif Berjalan' ? 'var(--brand-light)' : '#E2E8F0',
                      color: row.status === 'Aktif Berjalan' ? 'var(--brand-primary)' : '#475569',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View (Rendered under 640px to eliminate horizontal scroll) */}
      <div className="table-mobile-cards" style={{ display: 'none', flexDirection: 'column', gap: '14px' }}>
        {mitraSupport.map((row, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              border: '1.5px solid rgba(0, 0, 0, 0.06)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-building-circle-check" style={{ color: 'var(--brand-primary)', fontSize: '16px' }}></i>
                <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  {row.partner}
                </h4>
              </div>
              <span
                style={{
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '10px',
                  fontWeight: 800,
                  background: row.status === 'Aktif Berjalan' ? 'var(--brand-light)' : '#E2E8F0',
                  color: row.status === 'Aktif Berjalan' ? 'var(--brand-primary)' : '#475569'
                }}
              >
                {row.status}
              </span>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>
                Bentuk Dukungan:
              </span>
              {row.support}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <span><i className="fa-regular fa-calendar" style={{ marginRight: '4px' }}></i> {row.period}</span>
              <span><i className="fa-solid fa-bullseye" style={{ marginRight: '4px', color: 'var(--brand-primary)' }}></i> {row.target}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .table-desktop-wrap { display: none !important; }
          .table-mobile-cards { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

