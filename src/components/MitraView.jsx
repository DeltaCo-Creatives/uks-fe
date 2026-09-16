import { useState } from 'react';
import { activePartnersList, pageNavigationConfigs } from '../data/portalData';

const mitraTabs = pageNavigationConfigs.mitra.sections;

function AlurPanel() {
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

function FormPanel() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      alert('Terima kasih! Permohonan kemitraan instansi Anda telah tersimpan di sistem Tim Pembina UKS/M Pusat. Nomor registrasi: #MITRA-2026-0812.');
      setFormSubmitted(false);
      e.target.reset();
    }, 400);
  };

  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Formulir Resmi</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Registrasi Kemitraan Sekolah Sehat 2026
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Silakan lengkapi formulir di bawah ini. Tim Sekretariat Pembina UKS/M Pusat akan meninjau usulan Anda dalam 3-5 hari kerja.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: 'clamp(24px, 4vw, 36px)', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="mockup-form-group">
            <label className="mockup-form-label">Nama Lembaga / Perusahaan *</label>
            <input type="text" required placeholder="Contoh: PT Bangun Generasi Bangsa / Yayasan Sehat Anak" className="mockup-input" />
          </div>
          <div className="mockup-form-group">
            <label className="mockup-form-label">Jenis Instansi *</label>
            <select required className="mockup-input" style={{ appearance: 'auto' }}>
              <option value="">-- Pilih Kategori Instansi --</option>
              <option value="bumn">BUMN / BUMD</option>
              <option value="swasta">Perusahaan Swasta (CSR)</option>
              <option value="lsm">LSM / Yayasan Nirlaba</option>
              <option value="profesi">Organisasi Profesi Kesehatan (IDI/PDGI/PERSAGI)</option>
              <option value="universitas">Perguruan Tinggi (Tri Dharma)</option>
              <option value="internasional">Lembaga Internasional / Bilateral</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="mockup-form-group">
            <label className="mockup-form-label">Nama Penanggung Jawab (PIC) *</label>
            <input type="text" required placeholder="Nama lengkap beserta gelar" className="mockup-input" />
          </div>
          <div className="mockup-form-group">
            <label className="mockup-form-label">Jabatan PIC *</label>
            <input type="text" required placeholder="Contoh: CSR Manager / Head of Sustainability" className="mockup-input" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="mockup-form-group">
            <label className="mockup-form-label">Email Resmi Instansi *</label>
            <input type="email" required placeholder="corporate.csr@perusahaan.co.id" className="mockup-input" />
          </div>
          <div className="mockup-form-group">
            <label className="mockup-form-label">Nomor Telepon / WhatsApp Aktif *</label>
            <input type="tel" required placeholder="Contoh: 081234567890" className="mockup-input" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="mockup-form-group">
            <label className="mockup-form-label">Fokus Dukungan Gerakan Sekolah Sehat *</label>
            <select required className="mockup-input" style={{ appearance: 'auto' }}>
              <option value="">-- Pilih Fokus 5 Sehat --</option>
              <option value="gizi">1. Sehat Gizi & Kantin Sehat</option>
              <option value="fisik">2. Sehat Fisik & Sarana Olahraga</option>
              <option value="imunisasi">3. Sehat Imunisasi & Skrining</option>
              <option value="jiwa">4. Sehat Jiwa & Anti-Bullying</option>
              <option value="lingkungan">5. Sehat Lingkungan & Sanitasi Air</option>
              <option value="sarpras">6. Sarpras Ruang UKS Standar</option>
            </select>
          </div>
          <div className="mockup-form-group">
            <label className="mockup-form-label">Cakupan Wilayah Sasaran *</label>
            <input type="text" required placeholder="Contoh: Nasional / Jawa Barat / Wilayah 3T Papua" className="mockup-input" />
          </div>
        </div>

        <div className="mockup-form-group">
          <label className="mockup-form-label">Ringkasan Usulan Inisiatif Kolaborasi *</label>
          <textarea rows={4} required placeholder="Jelaskan ringkas bentuk dukungan (misal: penyediaan 500 unit filter air siap minum, renovasi 50 ruang UKS, atau edukasi gizi seimbang)..." className="mockup-textarea" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button type="submit" disabled={formSubmitted} className="btn-massive" style={{ minWidth: '240px', justifyContent: 'center' }}>
            <i className="fa-solid fa-paper-plane"></i>
            <span>{formSubmitted ? 'Memproses Data...' : 'Ajukan Formulir Kemitraan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function KatalogPanel() {
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Gotong Royong Nyata</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Mitra Strategis &amp; Dunia Usaha Terdaftar
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Apresiasi kepada organisasi mitra dan korporasi yang telah aktif bersinergi bersama Tim Pembina UKS/M dalam mewujudkan ekosistem sekolah sehat.
        </p>
      </div>

      <div className="indicator-bento-grid">
        {activePartnersList.map((mitra, idx) => (
          <div key={idx} className="partner-card-bento">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div className="program-icon" style={{ background: 'var(--brand-light)', color: 'var(--brand-primary)', margin: 0 }}>
                  <i className="fa-solid fa-handshake"></i>
                </div>
                <span className="indicator-card-tag" style={{ margin: 0 }}>{mitra.scope}</span>
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>{mitra.name}</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{mitra.role}</p>
            </div>
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-primary)' }}>
                <i className="fa-solid fa-circle-check" style={{ marginRight: '6px' }}></i>
                Mitra Resmi Tersertifikasi
              </span>
              <i className="fa-solid fa-arrow-right" style={{ color: 'var(--text-secondary)', fontSize: '12px' }}></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimoniPanel() {
  const quotes = [
    { text: '"Integrasi program hidrasi sehat kami ke dalam Trias UKS Kemendikdasmen memberikan kepastian standar edukasi yang tepat sasaran dan berkelanjutan di ratusan sekolah dasar binaan."', initials: 'DI', color: 'var(--brand-primary)', name: 'Danone Indonesia', role: 'Mitra Pilar Sehat Gizi & Air Bersih' },
    { text: '"Melalui standardisasi Stratifikasi UKS, bantuan fasilitas cuci tangan dan sanitasi yang kami salurkan dapat terverifikasi secara terukur dalam capaian strata sekolah sehat."', initials: 'UI', color: '#2563EB', name: 'Unilever Indonesia', role: 'Mitra Pilar Cuci Tangan Pakai Sabun' }
  ];
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Kesan Kolaborasi</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Dampak Nyata di Mata Mitra
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {quotes.map((q, idx) => (
          <div key={idx} className="quote-bento-card">
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '16px' }}>{q.text}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: q.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                {q.initials}
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>{q.name}</h5>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{q.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mitraPanels = {
  'sec-mitra-alur': AlurPanel,
  'sec-mitra-form': FormPanel,
  'sec-mitra-katalog': KatalogPanel,
  'sec-mitra-testimoni': TestimoniPanel
};

export default function MitraView({ activeSection, onNavigateSection }) {
  const activeId = mitraTabs.some(t => t.id === activeSection) ? activeSection : mitraTabs[0].id;
  const Panel = mitraPanels[activeId];

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>

      {/* Subpage Hero Banner */}
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-handshake-angle"></i> Kemitraan Multipihak · Gotong Royong Nasional
        </span>
        <h1 className="subpage-hero-title">
          Kolaborasi Kemitraan Sekolah Sehat
        </h1>
        <p className="subpage-hero-desc">
          Membuka ruang sinergi bagi BUMN, sektor swasta melalui program CSR, organisasi profesi kesehatan, perguruan tinggi, LSM, dan lembaga multilateral dalam akselerasi pembiasaan 5 Sehat di 38 Provinsi.
        </p>
      </div>

      {/* LOBBY: pick a topic, the panel below shows it */}
      <div className="lobby-tabs" data-gsap="reveal">
        {mitraTabs.map((tab) => (
          <button
            key={tab.id}
            className={`lobby-tab ${activeId === tab.id ? 'active' : ''}`}
            onClick={() => onNavigateSection(tab.id)}
          >
            <i className={tab.icon}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* GIANT DISPLAY PANEL */}
      <div className="lobby-panel" data-gsap="reveal" key={activeId}>
        <Panel />
      </div>

    </div>
  );
}
