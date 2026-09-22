import { Link } from 'react-router-dom';
import Hero from './Hero';
import Programs from './Programs';
import Books from './Books';
import Infografis from './Infografis';
import HomeStratifikasi from './HomeStratifikasi';

import { triasPillarsDetail } from '../data/portalData';
import { pathForView } from '../routes';

export default function BerandaView() {
  return (
    <div>
      {/* 1. Hero Stage */}
      <div id="sec-home-hero">
        <Hero />
      </div>

      {/* 3. Trias UKS Bento Showcase */}
      <section id="sec-home-trias" className="section" style={{ paddingBottom: '30px' }}>
        <div className="container">
          <div className="section-header" data-gsap="reveal">
            <div>
              <span className="section-kicker">3 Pilar Pelaksanaan</span>
              <h2 className="section-title">Trias UKS/M di Satuan Pendidikan</h2>
            </div>
            <Link
              className="btn-pill primary"
              to={pathForView('uksm-trias')}
              style={{ padding: '10px 22px', fontSize: '13px' }}
            >
              Jelajahi Trias UKS/M &rarr;
            </Link>
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
              <Link
                className="btn-pill secondary"
                to={pathForView('uksm-trias', 'sec-trias-pendidikan')}
                style={{ width: '100%', padding: '10px', fontSize: '12px' }}
              >
                Lihat 7 Sub-program &rarr;
              </Link>
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
              <Link
                className="btn-pill secondary"
                to={pathForView('uksm-trias', 'sec-trias-pelayanan')}
                style={{ width: '100%', padding: '10px', fontSize: '12px' }}
              >
                Lihat 4 Sub-program &rarr;
              </Link>
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
              <Link
                className="btn-pill secondary"
                to={pathForView('uksm-trias', 'sec-trias-lingkungan')}
                style={{ width: '100%', padding: '10px', fontSize: '12px' }}
              >
                Lihat 5 Sub-program &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3b. Stratifikasi UKS/M — 4 strata teaser */}
      <HomeStratifikasi />

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
