import Hero from './Hero';
import Programs from './Programs';
import Books from './Books';
import Infografis from './Infografis';
import HomeStratifikasi from './HomeStratifikasi';
import { nationalMetrics, gssFocusAreas, triasPillarsDetail } from '../data/portalData';

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
              Jelajahi Trias UKS/M &rarr;
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
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand-primary)' }}>PILAR 1 · 7 SUB-PROGRAM</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '6px 0 10px' }}>Pendidikan Kesehatan</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {triasPillarsDetail.pendidikan.description}
                </p>
              </div>
              <button
                className="btn-pill secondary"
                onClick={() => onNavigateView('uksm-trias', 'sec-trias-pendidikan')}
                style={{ width: '100%', padding: '10px', fontSize: '12px' }}
              >
                Lihat 7 Sub-program &rarr;
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
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB' }}>PILAR 2 · 4 SUB-PROGRAM</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '6px 0 10px' }}>Pelayanan Kesehatan</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {triasPillarsDetail.pelayanan.description}
                </p>
              </div>
              <button
                className="btn-pill secondary"
                onClick={() => onNavigateView('uksm-trias', 'sec-trias-pelayanan')}
                style={{ width: '100%', padding: '10px', fontSize: '12px' }}
              >
                Lihat 4 Sub-program &rarr;
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
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669' }}>PILAR 3 · 5 SUB-PROGRAM</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '6px 0 10px' }}>Pembinaan Lingkungan Sekolah Sehat</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {triasPillarsDetail.lingkungan.description}
                </p>
              </div>
              <button
                className="btn-pill secondary"
                onClick={() => onNavigateView('uksm-trias', 'sec-trias-lingkungan')}
                style={{ width: '100%', padding: '10px', fontSize: '12px' }}
              >
                Lihat 5 Sub-program &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3b. Stratifikasi UKS/M — 4 strata teaser */}
      <HomeStratifikasi onNavigateView={onNavigateView} />

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
                  Sehat Bergizi, Sehat Fisik, Sehat Imunisasi, Sehat Jiwa, dan Sehat Lingkungan di satuan pendidikan.
                </p>
              </div>
              <button
                className="btn-pill primary"
                onClick={() => onNavigateView('uksm-gss')}
                style={{ padding: '10px 20px', fontSize: '12px' }}
              >
                Buka Halaman Sekolah Sehat
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '14px' }}>
              {gssFocusAreas.map((fok) => (
                <button
                  key={fok.id}
                  type="button"
                  className="home-gss-focus"
                  onClick={() => onNavigateView('uksm-gss', 'sec-gss-5sehat')}
                >
                  <i className={fok.icon} aria-hidden="true"></i>
                  <span className="home-gss-focus-title">{fok.title}</span>
                  <span className="home-gss-focus-count">{fok.activities.length} kegiatan</span>
                </button>
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
