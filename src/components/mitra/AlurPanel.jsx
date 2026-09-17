export default function AlurPanel() {
  const steps = [
    { n: 1, badge: { bg: 'var(--brand-light)', color: 'var(--brand-primary)' }, title: 'Pengajuan Minat & Proposal', desc: 'Lembaga/perusahaan mengisi formulir registrasi kemitraan dan melampirkan usulan program dukungan bagi satuan pendidikan.' },
    { n: 2, badge: { bg: '#DBEAFE', color: '#2563EB' }, title: 'Verifikasi Tim Pembina', desc: 'Sekretariat Pembina UKS/M Pusat memverifikasi kelayakan teknis, etika perlindungan anak, dan keselarasan kurikulum.' },
    { n: 3, badge: { bg: '#FEF3C7', color: '#D97706' }, title: 'PKS / Nota Kesepahaman', desc: 'Penandatanganan Perjanjian Kerja Sama (PKS) resmi antara pimpinan mitra dan pejabat berwenang Kemendikdasmen.' },
    { n: 4, badge: { bg: '#D1FAE5', color: '#059669' }, title: 'Implementasi & Monev', desc: 'Penyaluran sarpras/pelatihan ke sekolah sasaran dan pelaporan berkala dampak kesehatan peserta didik.' }
  ];

  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Prosedur Kerja Sama</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          4 Tahap Alur Kemitraan Multipihak
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Seluruh program dukungan kemitraan mengedepankan prinsip transparansi, non-komersialisasi, keselarasan kurikulum, dan dampak nyata bagi kesehatan anak bangsa.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '18px' }}>
        {steps.map((s) => (
          <div key={s.n} className="stat-box" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: s.badge.bg, color: s.badge.color, padding: '4px 12px', borderRadius: 'var(--radius-pill)', fontSize: '11px', fontWeight: 800, marginBottom: '14px' }}>
              <i className={`fa-solid fa-${s.n}`}></i> TAHAP {['SATU', 'DUA', 'TIGA', 'EMPAT'][s.n - 1]}
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>{s.title}</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

