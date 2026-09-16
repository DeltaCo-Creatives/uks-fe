import Hero from './Hero';
import Programs from './Programs';
import Books from './Books';
import Infografis from './Infografis';
import { nationalMetrics, gssFocusList } from '../data/portalData';

export default function BerandaView({ onNavigateView }) {
  return (
    <div>
      {/* 1. Hero Stage */}
      <div id="sec-home-hero">
        <Hero />
      </div>

      {/* 2. Metrik Nasional 4 Kementerian */}
      <section id="sec-home-stats" className="section" style={{ paddingTop: '20px', paddingBottom: '30px' }}>
        <div className="container">
          <div style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(18px, 3vw, 28px)',
            border: '1.5px solid rgba(0,0,0,0.06)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '20px', textAlign: 'center' }}>
              {nationalMetrics.map((met, idx) => (
                <div key={idx} style={{ padding: '10px' }}>
                  <div style={{
                    fontSize: 'clamp(28px, 3.5vw, 38px)',
                    fontWeight: 800,
                    color: met.color,
                    lineHeight: 1.1,
                    fontFamily: '"Plus Jakarta Sans", sans-serif'
                  }}>
                    {met.value}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '6px' }}>
                    {met.label}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {met.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trias UKS Bento Showcase */}
      <section id="sec-home-trias" className="section" style={{ paddingBottom: '30px' }}>
        <div className="container">
          <div className="section-header" data-gsap="reveal">
            <div>
              <span className="section-kicker">3 Pilar Pelaksanaan</span>
              <h2 className="section-title">Trias UKS/M di Satuan Pendidikan</h2>
            </div>
            <button
              className="btn-pill primary"
              onClick={() => onNavigateView('uksm-trias')}
              style={{ padding: '10px 22px', fontSize: '13px' }}
            >
              Jelajahi 16 Indikator &rarr;
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
            {/* Bento Card 1: Pendidikan */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              border: '1.5px solid rgba(0,0,0,0.06)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--brand-light)',
                  color: 'var(--brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  marginBottom: '16px'
                }}>
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand-primary)' }}>PILAR 1 · 7 INDIKATOR</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '6px 0 10px' }}>Pendidikan Kesehatan</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Literasi kesehatan, PHBS, gizi seimbang, kespro, pendidikan karakter 7KAIH, aktivitas fisik, dan dokter kecil.
                </p>
              </div>
              <button
                className="btn-pill secondary"
                onClick={() => onNavigateView('uksm-trias')}
                style={{ width: '100%', padding: '10px', fontSize: '12px' }}
              >
                Buka Halaman Trias (7 Submenu) &rarr;
              </button>
            </div>

            {/* Bento Card 2: Pelayanan */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              border: '1.5px solid rgba(0,0,0,0.06)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: 'var(--radius-md)',
                  background: '#DBEAFE',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  marginBottom: '16px'
                }}>
                  <i className="fa-solid fa-kit-medical"></i>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB' }}>PILAR 2 · 4 INDIKATOR</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '6px 0 10px' }}>Pelayanan Kesehatan</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Penjaringan berkala siswa, imunisasi BIAS &amp; HPV, distribusi obat cacing &amp; TTD, dan penanganan P3K.
                </p>
              </div>
              <button
                className="btn-pill secondary"
                onClick={() => onNavigateView('uksm-trias')}
                style={{ width: '100%', padding: '10px', fontSize: '12px' }}
              >
                Buka Halaman Trias (4 Submenu) &rarr;
              </button>
            </div>

            {/* Bento Card 3: Lingkungan */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              border: '1.5px solid rgba(0,0,0,0.06)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: 'var(--radius-md)',
                  background: '#D1FAE5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  marginBottom: '16px'
                }}>
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669' }}>PILAR 3 · 5 INDIKATOR</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '6px 0 10px' }}>Pembinaan Lingkungan</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Sanitasi jamban terpisah gender, kantin higienis, apotek TOGA, PSN 3M, dan kawasan 100% bebas asap rokok/napza.
                </p>
              </div>
              <button
                className="btn-pill secondary"
                onClick={() => onNavigateView('uksm-trias')}
                style={{ width: '100%', padding: '10px', fontSize: '12px' }}
              >
                Buka Halaman Trias (5 Submenu) &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fokus 5 Sehat GSS Teaser */}
      <section id="sec-home-gss" className="section" style={{ paddingBottom: '30px' }}>
        <div className="container">
          <div style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '30px',
            border: '1.5px solid rgba(0,0,0,0.06)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
              <div>
                <span className="section-kicker" style={{ background: '#FEF3C7', color: '#D97706' }}>Gerakan Sekolah Sehat</span>
                <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0' }}>
                  5 Fokus Pembiasaan Sekolah Sehat (GSS)
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Seluruh 5 pilar terpadu dalam 1 halaman mandiri dengan kotak navigasi tepi kiri.
                </p>
              </div>
              <button
                className="btn-pill primary"
                onClick={() => onNavigateView('uksm-gss')}
                style={{ padding: '10px 20px', fontSize: '12px' }}
              >
                Buka Halaman GSS &amp; Unduhan &rarr;
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '14px' }}>
              {gssFocusList.map((fok) => (
                <div
                  key={fok.id}
                  onClick={() => onNavigateView('uksm-gss')}
                  style={{
                    background: 'var(--bg-card-alt)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'var(--spring)'
                  }}
                >
                  <div style={{ fontSize: '28px', color: fok.color, marginBottom: '8px' }}>
                    <i className={fok.icon}></i>
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>{fok.title}</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{fok.tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Program Unggulan Marquee & Kabar Terbaru */}
      <div id="sec-home-programs">
        <Programs />
      </div>

      {/* 6. Rak Perpustakaan Buku Digital */}
      <div id="sec-home-books">
        <Books />
      </div>

      {/* 7. Galeri Visual Inspirasi & Partner Marquee */}
      <div id="sec-home-gallery">
        <Infografis />
      </div>

    </div>
  );
}
