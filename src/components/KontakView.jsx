import { useState } from 'react';
import { faqsList, contactInfo } from '../data/portalData';
import { useKementerianList } from '../hooks/usePublicLists';
import { LoadingState, ErrorState, EmptyState } from './shared/AsyncState';
import './kontak/kontak.css';

export default function KontakView() {
  const [openFaq, setOpenFaq] = useState(0);
  const { data: ministries, loading: ministriesLoading, error: ministriesError, retry: retryMinistries } = useKementerianList();

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    alert('Pengaduan / pertanyaan Anda telah berhasil dikirim ke Helpdesk Sekretariat Pembina UKS/M Pusat. Nomor tiket layanan: #UKS-2026-9812.');
    e.target.reset();
  };

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      
      {/* Subpage Hero Banner */}
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-headset"></i> Layanan Terpadu &amp; Konsultasi · Sekretariat Pusat
        </span>
        <h1 className="subpage-hero-title">
          Sekretariat Bersama &amp; Layanan Bantuan UKS/M
        </h1>
        <p className="subpage-hero-desc">
          Saluran komunikasi resmi, pusat konsultasi implementasi Trias UKS, permohonan bimbingan teknis stratifikasi sekolah sehat, dan pengaduan layanan terpadu.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

        {/* 1. Alamat & Helpdesk */}
        <section id="sec-kontak-alamat" className="section" style={{ padding: 0 }} data-gsap="reveal">
          <div className="about-bento-frame">
            <div style={{ marginBottom: '24px' }}>
              <span className="section-kicker">Pusat Komunikasi</span>
              <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
                Sekretariat &amp; Layanan Kontak
              </h2>
            </div>

            <div className="kontak-card-grid">

              <div className="kontak-card">
                <div className="kontak-card-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <h4 className="kontak-card-title">Alamat Sekretariat Pusat</h4>
                <dl className="kontak-fields">
                  <div>
                    <dt>Instansi</dt>
                    <dd>Sekretariat Pembina UKS/M Pusat, Kementerian Pendidikan Dasar dan Menengah RI</dd>
                  </div>
                  <div>
                    <dt>Alamat</dt>
                    <dd><address>{contactInfo.address}</address></dd>
                  </div>
                </dl>
              </div>

              <div id="sec-kontak-helpdesk" className="kontak-card">
                <div className="kontak-card-icon" style={{ background: '#DBEAFE', color: '#2563EB' }}>
                  <i className="fa-solid fa-headset"></i>
                </div>
                <h4 className="kontak-card-title">Helpdesk &amp; Call Center</h4>
                <dl className="kontak-fields">
                  <div>
                    <dt>Call Center ULT Kemendikdasmen</dt>
                    <dd><a href={`tel:${contactInfo.ultPhone}`}>{contactInfo.ultPhone}</a></dd>
                  </div>
                  <div>
                    <dt>Hotline Khusus UKS/M</dt>
                    <dd><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></dd>
                  </div>
                  <div>
                    <dt>Jam Layanan</dt>
                    <dd>{contactInfo.operatingHours}</dd>
                  </div>
                </dl>
              </div>

              <div className="kontak-card">
                <div className="kontak-card-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <i className="fa-solid fa-building-columns"></i>
                </div>
                <h4 className="kontak-card-title">Kementerian Terkait</h4>

                {ministriesLoading && <LoadingState label="Memuat daftar kementerian..." />}

                {!ministriesLoading && ministriesError && (
                  <ErrorState
                    title="Daftar kementerian tidak dapat dimuat"
                    text="Terjadi gangguan saat mengambil data kementerian. Silakan coba lagi."
                    retry={retryMinistries}
                  />
                )}

                {!ministriesLoading && !ministriesError && (
                  (ministries?.length ?? 0) === 0 ? (
                    <EmptyState
                      icon="fa-solid fa-building-columns"
                      title="Belum ada kementerian terkait"
                      text="Daftar kementerian mitra akan tampil di sini begitu tersedia."
                    />
                  ) : (
                    <div className="kontak-ministry-grid">
                      {ministries.map((ministry) => (
                        <a
                          key={ministry.id}
                          className="kontak-ministry-tile"
                          href={ministry.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {ministry.logoUrl ? (
                            <img className="kontak-ministry-logo" src={ministry.logoUrl} alt={`Logo ${ministry.nama}`} />
                          ) : (
                            <span className="kontak-ministry-placeholder" aria-hidden="true">
                              <i className="fa-solid fa-building-columns"></i>
                            </span>
                          )}
                          <span>
                            <span className="kontak-ministry-short">{ministry.singkatan}</span>
                            {ministry.unit && (
                              <span className="kontak-ministry-unit">{ministry.unit}</span>
                            )}
                          </span>
                        </a>
                      ))}
                    </div>
                  )
                )}
              </div>

            </div>
          </div>
        </section>

        {/* 2. Formulir Layanan Bantuan / Tiket Konsultasi */}
        <section id="sec-kontak-tiket" className="section" style={{ padding: 0 }} data-gsap="reveal">
          <div className="about-bento-frame">
            <div style={{ marginBottom: '24px' }}>
              <span className="section-kicker">Layanan Konsultasi Daring</span>
              <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
                Kirim Pertanyaan / Tiket Bantuan Teknis
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
                Gunakan formulir ini untuk konsultasi pengisian instrumen stratifikasi, fasilitasi kerja sama Puskesmas, atau panduan modul 5 Sehat.
              </p>
            </div>

            <form onSubmit={handleTicketSubmit} style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(24px, 4vw, 36px)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div className="mockup-form-group">
                  <label className="mockup-form-label">Nama Lengkap Pemohon *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso, S.Pd."
                    className="mockup-input"
                  />
                </div>

                <div className="mockup-form-group">
                  <label className="mockup-form-label">Email Aktif *</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@sekolah.sch.id"
                    className="mockup-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div className="mockup-form-group">
                  <label className="mockup-form-label">Nama Satuan Pendidikan / Lembaga *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: SDN 01 Rawamangun / TP UKS Kec. Cibinong"
                    className="mockup-input"
                  />
                </div>

                <div className="mockup-form-group">
                  <label className="mockup-form-label">Kategori Layanan *</label>
                  <select required className="mockup-input" style={{ appearance: 'auto' }}>
                    <option value="">-- Pilih Topik Konsultasi --</option>
                    <option value="stratifikasi">Akreditasi &amp; Stratifikasi UKS/M</option>
                    <option value="bosp">Penggunaan Dana BOSP untuk UKS</option>
                    <option value="puskesmas">Koordinasi Penjaringan Puskesmas</option>
                    <option value="mbg">Integrasi Makan Bergizi Gratis (MBG)</option>
                    <option value="sarpras">Standardisasi Ruang UKS</option>
                    <option value="lainnya">Lain-lain</option>
                  </select>
                </div>
              </div>

              <div className="mockup-form-group">
                <label className="mockup-form-label">Rincian Pertanyaan / Pengaduan *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan detail kendala, pertanyaan, atau permohonan pendampingan sekolah Anda..."
                  className="mockup-textarea"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="submit"
                  className="btn-massive"
                  style={{ minWidth: '220px', justifyContent: 'center' }}
                >
                  <i className="fa-solid fa-paper-plane"></i>
                  <span>Kirim Tiket Bantuan</span>
                </button>
              </div>

            </form>
          </div>
        </section>

        {/* 3. Tanya Jawab Umum (FAQ) */}
        <section id="sec-kontak-faq" className="section" style={{ padding: 0 }} data-gsap="reveal">
          <div className="about-bento-frame">
            <div style={{ marginBottom: '24px' }}>
              <span className="section-kicker">Pertanyaan Populer</span>
              <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
                Tanya Jawab Seputar Usaha Kesehatan Sekolah
              </h2>
            </div>

            <div className="faq-accordion-list">
              {faqsList.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      className="faq-accordion-trigger"
                      onClick={() => toggleFaq(idx)}
                    >
                      <span>{faq.q}</span>
                      <i className="fa-solid fa-chevron-down faq-accordion-icon"></i>
                    </button>
                    <div className="faq-accordion-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Lokasi Map & Jam Kunjungan */}
        <section className="section" style={{ padding: 0 }} data-gsap="reveal">
          <div className="about-bento-frame">
            <div style={{
              background: 'var(--text-primary)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(28px, 4vw, 40px)',
              color: '#FFFFFF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px'
            }}>
              <div>
                <span className="subpage-hero-kicker">
                  <i className="fa-solid fa-map-location-dot"></i> Lokasi Sekretariat Pusat
                </span>
                <h3 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 800, color: '#FFFFFF', margin: '8px 0 10px' }}>
                  Kompleks Kemendikdasmen Senayan
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', maxWidth: '600px', lineHeight: 1.6 }}>
                  Kunjungan audiensi dan koordinasi tatap muka dilayani pada hari kerja (Senin - Jumat) dengan membuat janji temu melalui Helpdesk minimal H-3.
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Kementerian+Pendidikan+Dasar+dan+Menengah+Senayan+Jakarta"
                target="_blank"
                rel="noreferrer"
                className="btn-massive"
              >
                <i className="fa-solid fa-diamond-turn-right"></i>
                <span>Petunjuk Arah Google Maps</span>
              </a>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
