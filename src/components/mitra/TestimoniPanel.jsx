export default function TestimoniPanel() {
  const testimonials = [
    {
      name: 'Dr. Sarah Smith',
      org: 'UNICEF Chief of Nutrition RI',
      quote: 'Kemitraan bersama Kemendikdasmen RI melalui platform UKS/M memberikan dampak luar biasa bagi percepatan penurunan anemia remaja putri dan pembiasaan air minum higienis di wilayah 3T.',
      badge: 'Organisasi Internasional'
    },
    {
      name: 'Budi Santoso',
      org: 'VP Sustainable Development Danone',
      quote: 'Melalui program intervensi hidrasi sehat dan kantin higienis, kami melihat langsung antusiasme para guru dan siswa membudayakan pola hidup sehat berkelanjutan setiap hari.',
      badge: 'Dunia Usaha / CSR'
    },
    {
      name: 'Hj. Siti Rahmawati, M.Pd.',
      org: 'Kepala SDN 2 Wonosobo',
      quote: 'Dukungan renovasi wastafel CTPS dan pelatihan penjamah kantin dari mitra CSR telah mengantarkan sekolah kami meraih predikat Strata Paripurna UKS Mandiri tingkat provinsi.',
      badge: 'Satuan Pendidikan Penerima'
    }
  ];

  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Suara Lapangan</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Testimoni Dampak Kolaborasi Multipihak
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Refleksi pengalaman dari para mitra donor, pelaksana teknis, serta kepala satuan pendidikan penerima manfaat program sekolah sehat.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="stat-box"
            style={{
              alignItems: 'flex-start',
              textAlign: 'left',
              padding: '26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '24px', color: 'var(--brand-primary)', marginBottom: '12px' }}>
                <i className="fa-solid fa-quote-left"></i>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '20px' }}>
                "{t.quote}"
              </p>
            </div>

            <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.06)', width: '100%' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 2px', color: 'var(--text-primary)' }}>
                {t.name}
              </h4>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                {t.org}
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, background: 'var(--brand-light)', color: 'var(--brand-primary)', padding: '2px 8px', borderRadius: 'var(--radius-pill)' }}>
                {t.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

