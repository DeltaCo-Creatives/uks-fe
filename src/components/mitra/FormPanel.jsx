import { useState } from 'react';

export default function FormPanel() {
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
          Lembaga swadaya masyarakat, yayasan nirlaba, BUMN, perbankan, dan perusahaan swasta dapat mengajukan inisiatif CSR untuk intervensi sarpras dan edukasi gizi.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div className="mockup-form-group">
            <label className="mockup-form-label">Nama Lembaga / Instansi / Perusahaan *</label>
            <input required type="text" className="mockup-input" placeholder="Contoh: PT Sehat Makmur Bersama" />
          </div>
          <div className="mockup-form-group">
            <label className="mockup-form-label">Jenis Badan Usaha / Organisasi *</label>
            <select required className="mockup-input" style={{ appearance: 'auto' }}>
              <option value="">Pilih Jenis Organisasi</option>
              <option value="swasta">Perusahaan Swasta / CSR</option>
              <option value="bumn">BUMN / BUMD</option>
              <option value="ngo">Lembaga Nirlaba / NGO Internasional</option>
              <option value="univ">Perguruan Tinggi / Akademisi</option>
              <option value="profesi">Organisasi Profesi Kesehatan</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div className="mockup-form-group">
            <label className="mockup-form-label">Nama Penanggung Jawab (PIC) *</label>
            <input required type="text" className="mockup-input" placeholder="Nama Lengkap & Gelar" />
          </div>
          <div className="mockup-form-group">
            <label className="mockup-form-label">Nomor Kontak WhatsApp Aktif *</label>
            <input required type="tel" className="mockup-input" placeholder="08xxxxxxxxxx" />
          </div>
        </div>

        <div className="mockup-form-group">
          <label className="mockup-form-label">Email Resmi Korespondensi *</label>
          <input required type="email" className="mockup-input" placeholder="csr@perusahaan.co.id" />
        </div>

        <div className="mockup-form-group">
          <label className="mockup-form-label">Fokus Pilar Intervensi yang Diusulkan *</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginTop: '6px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', background: 'var(--bg-app)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
              <input type="checkbox" name="focus" defaultChecked />
              <span>Gizi &amp; Sarapan Sehat (MBG)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', background: 'var(--bg-app)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
              <input type="checkbox" name="focus" />
              <span>Sanitasi, Air Bersih &amp; CTPS</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', background: 'var(--bg-app)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
              <input type="checkbox" name="focus" />
              <span>Kesehatan Reproduksi &amp; Jiwa</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', background: 'var(--bg-app)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
              <input type="checkbox" name="focus" />
              <span>Sarpras Kamar Mandi &amp; Ruang UKS</span>
            </label>
          </div>
        </div>

        <div className="mockup-form-group">
          <label className="mockup-form-label">Ringkasan Rencana Program &amp; Wilayah Sasaran *</label>
          <textarea required rows={4} className="mockup-textarea" placeholder="Jelaskan ringkas bentuk intervensi, target satuan pendidikan, serta estimasi periode pelaksanaan..."></textarea>
        </div>

        <div>
          <button type="submit" disabled={formSubmitted} className="btn-massive" style={{ padding: '16px 36px', fontSize: '15px' }}>
            <i className="fa-solid fa-paper-plane"></i>
            <span>{formSubmitted ? 'Memproses Pengajuan...' : 'Kirim Berkas Pendaftaran Kemitraan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

