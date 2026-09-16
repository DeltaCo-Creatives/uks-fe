import { useState } from 'react';
import {
  triasPillarsDetail,
  strataLevels,
  gssFocusList,
  gssAdvocacyDocs
} from '../data/portalData';

export default function UksmClusters({ activeSubpage, onChangeView }) {
  // Profil state
  const [orgTab, setOrgTab] = useState('pembina');
  const [selectedStrata, setSelectedStrata] = useState('all');

  // GSS state
  const [advFilter, setAdvFilter] = useState('all');

  const filteredAdvDocs = advFilter === 'all'
    ? gssAdvocacyDocs
    : gssAdvocacyDocs.filter(d => d.category === advFilter);

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      
      {/* ============================================================
          THE 3-BAR SUBNAV SWITCHER (LOCKED-IN SYSTEM)
          ============================================================ */}
      <div className="subnav-3bar-wrapper" style={{ textAlign: 'center' }}>
        <div className="subnav-3bar">
          <button
            className={`subnav-pill ${activeSubpage === 'uksm-profil' ? 'active' : ''}`}
            onClick={() => onChangeView('uksm-profil')}
          >
            <i className="fa-solid fa-landmark"></i>
            <span>1. Profil &amp; Tata Kelola</span>
          </button>
          <button
            className={`subnav-pill ${activeSubpage === 'uksm-trias' ? 'active' : ''}`}
            onClick={() => onChangeView('uksm-trias')}
          >
            <i className="fa-solid fa-shield-heart"></i>
            <span>2. TRIAS UKS/M</span>
          </button>
          <button
            className={`subnav-pill ${activeSubpage === 'uksm-gss' ? 'active' : ''}`}
            onClick={() => onChangeView('uksm-gss')}
          >
            <i className="fa-solid fa-apple-whole"></i>
            <span>3. Sekolah Sehat (GSS)</span>
          </button>
        </div>
      </div>

      {/* ============================================================
          SUBPAGE 1: PROFIL & TATA KELOLA
          ============================================================ */}
      {activeSubpage === 'uksm-profil' && (
        <div>
          {/* Subpage Hero Banner */}
          <div className="subpage-hero-banner" data-gsap="reveal">
            <span className="subpage-hero-kicker">
              <i className="fa-solid fa-landmark"></i> Kluster 1 · Profil &amp; Tata Kelola
            </span>
            <h1 className="subpage-hero-title">
              Profil Lembaga &amp; Manajemen Tata Kelola UKS/M
            </h1>
            <p className="subpage-hero-desc">
              Pijakan filosofis SKB 4 Menteri, struktur tim pembina berjenjang dari pusat hingga satuan pendidikan, empat strata akreditasi kesiapan sekolah, dan siklus pengelolaan terpadu dana BOSP.
            </p>
          </div>

          {/* 1. Deskripsi & Dasar Hukum Bento */}
          <section id="sec-profil-deskripsi" className="section" style={{ paddingTop: '10px' }}>
            <div className="section-header" data-gsap="reveal">
              <div>
                <span className="section-kicker">Landasan Filosofis</span>
                <h2 className="section-title">Deskripsi &amp; Dasar Hukum SKB 4 Menteri</h2>
              </div>
            </div>

            <div className="about-bento-frame" data-gsap="reveal">
              <div className="about-grid">
                <div className="about-card">
                  <div>
                    <div className="program-icon" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                      <i className="fa-solid fa-scale-balanced"></i>
                    </div>
                    <h3>Sejarah &amp; Visi Bersama</h3>
                    <p style={{ lineHeight: 1.7 }}>
                      Usaha Kesehatan Sekolah/Madrasah (UKS/M) merupakan inisiatif nasional terpadu lintas 4 Kementerian (Kemendikdasmen, Kemenkes, Kemenag, Kemendagri) untuk mewujudkan generasi emas Indonesia yang sehat, berkarakter, cerdas, dan tangguh sejak usia dini.
                    </p>
                  </div>
                  <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>
                    Terbit pertama kali tahun 1980 dan disempurnakan melalui SKB 4 Menteri Nomor 6/X/PB/2014.
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="stat-box" style={{ padding: '20px' }}>
                    <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: 0 }}>DASAR HUKUM 1</span>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '8px 0 4px' }}>SKB 4 Menteri No. 6/X/PB/2014</h4>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Pedoman umum pembinaan, pengembangan, dan tata kerja kelembagaan UKS/M di seluruh tingkatan pemerintahan.</span>
                  </div>
                  <div className="stat-box" style={{ padding: '20px' }}>
                    <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: 0, background: '#DBEAFE', color: '#2563EB' }}>DASAR HUKUM 2</span>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '8px 0 4px' }}>UU Nomor 17 Tahun 2023 tentang Kesehatan</h4>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Mengatur kewajiban faskes Puskesmas melakukan pembinaan promotif dan preventif berkala di satuan pendidikan.</span>
                  </div>
                  <div className="stat-box" style={{ padding: '20px' }}>
                    <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: 0, background: '#FEF3C7', color: '#D97706' }}>DASAR HUKUM 3</span>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '8px 0 4px' }}>Permendikbud No. 63 Tahun 2022 (BOSP)</h4>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Memberikan legalitas pembiayaan sarpras UKS, obat P3K, dan pembinaan kader melalui komponen dana BOSP.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Tujuan & Sasaran Bento */}
          <section id="sec-profil-tujuan" className="section">
            <div className="section-header" data-gsap="reveal">
              <div>
                <span className="section-kicker">Arah &amp; Target</span>
                <h2 className="section-title">Tujuan &amp; Sasaran 3 Tingkat</h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div className="stat-box" style={{ borderLeft: '6px solid var(--brand-primary)' }}>
                <span className="section-kicker" style={{ alignSelf: 'flex-start', marginBottom: '8px' }}>TUJUAN UMUM</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>Peningkatan Mutu &amp; Prestasi Belajar</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  Meningkatkan mutu pendidikan dan prestasi belajar peserta didik dengan menanamkan perilaku hidup bersih dan sehat, memelihara kesehatan jasmani dan rohani, serta mewujudkan lingkungan belajar yang sehat, aman, dan nyaman.
                </p>
              </div>

              <div className="stat-box" style={{ borderLeft: '6px solid var(--brand-accent)' }}>
                <span className="section-kicker" style={{ alignSelf: 'flex-start', marginBottom: '8px', background: '#FEF3C7', color: '#D97706' }}>TUJUAN KHUSUS</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>Pembiasaan &amp; Daya Tangkal</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  Memupuk kebiasaan hidup sehat dan meningkatkan derajat kesehatan peserta didik mencakup penurunan angka kesakitan, pencegahan stunting, pemeliharaan sanitasi higienis, serta memiliki daya tangkal terhadap pengaruh rokok, narkoba, dan pornografi.
                </p>
              </div>
            </div>

            {/* Sasaran 3 Tingkat Cards */}
            <div id="sec-profil-sasaran" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div className="stat-box" style={{ padding: '24px' }}>
                <div className="program-icon" style={{ background: 'var(--brand-light)', color: 'var(--brand-primary)', marginBottom: '12px' }}>
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: '0 0 8px' }}>SASARAN 1 · PRIMER</span>
                <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px' }}>Peserta Didik</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Anak usia sekolah mulai jenjang PAUD, SD/MI, SMP/MTs, SMA/SMK/MA, hingga SLB di seluruh penjuru tanah air.
                </p>
              </div>

              <div className="stat-box" style={{ padding: '24px' }}>
                <div className="program-icon" style={{ background: '#DBEAFE', color: '#2563EB', marginBottom: '12px' }}>
                  <i className="fa-solid fa-chalkboard-user"></i>
                </div>
                <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: '0 0 8px', background: '#DBEAFE', color: '#2563EB' }}>SASARAN 2 · SEKUNDER</span>
                <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px' }}>Pembina &amp; Pendidik</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Kepala satuan pendidikan, guru pembina UKS, tenaga kesehatan Puskesmas, komite sekolah, dan tim kader Dokter Kecil/KKR.
                </p>
              </div>

              <div className="stat-box" style={{ padding: '24px' }}>
                <div className="program-icon" style={{ background: '#FEF3C7', color: '#D97706', marginBottom: '12px' }}>
                  <i className="fa-solid fa-tree"></i>
                </div>
                <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: '0 0 8px', background: '#FEF3C7', color: '#D97706' }}>SASARAN 3 · TERSIER</span>
                <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px' }}>Lingkungan Sekolah</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Pengelola kantin sekolah, orang tua/wali murid, kawasan sekitar sekolah, serta masyarakat luas pengguna sarana publik.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Struktur Organisasi Personel */}
          <section id="sec-profil-struktur" className="section">
            <div className="section-header" data-gsap="reveal">
              <div>
                <span className="section-kicker">Kelembagaan</span>
                <h2 className="section-title">Struktur Organisasi &amp; Personel Terstruktur</h2>
              </div>
              <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-card-alt)', padding: '6px', borderRadius: 'var(--radius-pill)' }}>
                <button
                  className={`subnav-pill ${orgTab === 'pembina' ? 'active' : ''}`}
                  onClick={() => setOrgTab('pembina')}
                >
                  Tim Pembina (Pusat - Daerah)
                </button>
                <button
                  className={`subnav-pill ${orgTab === 'pelaksana' ? 'active' : ''}`}
                  onClick={() => setOrgTab('pelaksana')}
                >
                  Tim Pelaksana (Sekolah)
                </button>
              </div>
            </div>

            <div className="about-bento-frame" data-gsap="reveal">
              {orgTab === 'pembina' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  <div className="stat-box">
                    <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: 0 }}>LEVEL 1 · NASIONAL</span>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, margin: '8px 0 6px' }}>TP UKS/M Pusat</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Menteri Pendidikan Dasar dan Menengah RI, Menteri Kesehatan, Menteri Agama, dan Menteri Dalam Negeri Republik Indonesia.
                    </p>
                  </div>
                  <div className="stat-box">
                    <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: 0, background: '#DBEAFE', color: '#2563EB' }}>LEVEL 2 · PROVINSI</span>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, margin: '8px 0 6px' }}>TP UKS/M Provinsi</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Gubernur, Kepala Dinas Pendidikan Provinsi, Kepala Kanwil Kemenag Provinsi, dan Kepala Dinas Kesehatan Provinsi.
                    </p>
                  </div>
                  <div className="stat-box">
                    <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: 0, background: '#FEF3C7', color: '#D97706' }}>LEVEL 3 · KAB/KOTA</span>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, margin: '8px 0 6px' }}>TP UKS/M Kab/Kota</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Bupati / Walikota, Kepala Dinas Pendidikan Kab/Kota, Kepala Kantor Kemenag Kab/Kota, dan Kepala Dinas Kesehatan.
                    </p>
                  </div>
                  <div className="stat-box">
                    <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: 0, background: '#D1FAE5', color: '#059669' }}>LEVEL 4 · KECAMATAN</span>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, margin: '8px 0 6px' }}>TP UKS/M Kecamatan</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Camat, Kepala Puskesmas Pembina Wilayah, Pengawas Satuan Pendidikan, dan Kepala KUA Kecamatan.
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  <div className="stat-box">
                    <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: 0 }}>PENANGGUNG JAWAB</span>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, margin: '8px 0 6px' }}>Kepala Satuan Pendidikan</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Menerbitkan SK Tim Pelaksana, mengesahkan Rencana Kegiatan UKS di RKAS, dan memfasilitasi kerja sama dengan Puskesmas.
                    </p>
                  </div>
                  <div className="stat-box">
                    <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: 0, background: '#DBEAFE', color: '#2563EB' }}>OPERASIONAL HARIAN</span>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, margin: '8px 0 6px' }}>Guru Pembina UKS</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Mengelola ruang UKS harian, mengoordinasikan jadwal piket Dokter Kecil, mencatat buku rujukan medis, dan membina kader.
                    </p>
                  </div>
                  <div className="stat-box">
                    <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: 0, background: '#FEF3C7', color: '#D97706' }}>DUKUNGAN WARGA</span>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, margin: '8px 0 6px' }}>Komite Sekolah &amp; Orang Tua</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Mendukung pengawasan mutu kantin higienis, penyediaan bekal sehat gizi seimbang, dan gotong royong sanitasi lingkungan.
                    </p>
                  </div>
                  <div className="stat-box">
                    <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: 0, background: '#D1FAE5', color: '#059669' }}>KADER SEBAYA</span>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, margin: '8px 0 6px' }}>Dokter Kecil &amp; KKR</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Peserta didik teladan yang dilatih melakukan penimbangan TB/BB, pertolongan pertama luka ringan, dan pengingat cuci tangan.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 4. Stratifikasi 4 Strata Interaktif */}
          <section id="sec-profil-stratifikasi" className="section">
            <div className="section-header" data-gsap="reveal">
              <div>
                <span className="section-kicker">Standar Kesiapan Satpen</span>
                <h2 className="section-title">Stratifikasi UKS/M (4 Strata Kesiapan)</h2>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  className={`subnav-pill ${selectedStrata === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedStrata('all')}
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                >
                  Semua Strata
                </button>
                {strataLevels.map(lvl => (
                  <button
                    key={lvl.key}
                    className={`subnav-pill ${selectedStrata === lvl.key ? 'active' : ''}`}
                    onClick={() => setSelectedStrata(lvl.key)}
                    style={{ padding: '8px 16px', fontSize: '12px' }}
                  >
                    {lvl.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {strataLevels.map(lvl => {
                const isMatch = selectedStrata === 'all' || selectedStrata === lvl.key;
                return (
                  <div
                    key={lvl.key}
                    className="stat-box"
                    style={{
                      borderTop: `6px solid ${lvl.color}`,
                      opacity: isMatch ? 1 : 0.35,
                      transform: isMatch ? 'translateY(0)' : 'scale(0.98)',
                      transition: 'var(--spring)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: '0 0 10px', color: lvl.color, background: lvl.bgColor }}>
                        {lvl.name.toUpperCase()}
                      </span>
                      <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>{lvl.name.replace(/^\d+\.\s*/, '')}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{lvl.subtitle}</p>
                      
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
                        {lvl.requirements.map((req, idx) => (
                          <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <i className="fa-solid fa-circle-check" style={{ color: lvl.color, marginTop: '4px', fontSize: '12px' }}></i>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Evaluation Rule Alert */}
            <div style={{
              background: 'var(--bg-card)',
              border: '2px solid var(--brand-accent)',
              borderRadius: 'var(--radius-xl)',
              padding: '20px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              marginTop: '24px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0
              }}>
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                <strong>Aturan Penilaian Resmi:</strong> Satuan pendidikan dinyatakan sah berada di suatu strata apabila telah memenuhi <strong>100% (seluruh) indikator</strong> pada tingkatan tersebut. Tidak ada sistem pembulatan parsial.
              </div>
            </div>
          </section>

          {/* 5. Siklus Manajemen Pembinaan */}
          <section id="sec-profil-manajemen" className="section">
            <div className="section-header" data-gsap="reveal">
              <div>
                <span className="section-kicker">Siklus Tata Kelola</span>
                <h2 className="section-title">Manajemen Pembinaan UKS/M di Satpen</h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div className="stat-box" style={{ padding: '28px' }}>
                <div className="program-icon" style={{ background: 'var(--brand-light)', color: 'var(--brand-primary)', marginBottom: '14px' }}>
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: '0 0 8px' }}>TAHAP 1</span>
                <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Perencanaan (RKT &amp; RKAS)</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  Penyusunan Rencana Kerja Tahunan UKS, penentuan skala prioritas sarpras, alokasi anggaran dana BOSP komponen pemeliharaan kesehatan, serta pengajuan proposal DAK Fisik ke dinas terkait.
                </p>
              </div>

              <div className="stat-box" style={{ padding: '28px' }}>
                <div className="program-icon" style={{ background: '#DBEAFE', color: '#2563EB', marginBottom: '14px' }}>
                  <i className="fa-solid fa-hand-holding-medical"></i>
                </div>
                <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: '0 0 8px', background: '#DBEAFE', color: '#2563EB' }}>TAHAP 2</span>
                <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Pelaksanaan &amp; SOP Harian</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  Operasional harian ruang periksa UKS, pembagian jadwal piket kader Dokter Kecil/KKR, koordinasi berkala dengan Puskesmas pembina, dan pembudayaan kebiasaan hidup bersih sehat di kelas.
                </p>
              </div>

              <div className="stat-box" style={{ padding: '28px' }}>
                <div className="program-icon" style={{ background: '#FEF3C7', color: '#D97706', marginBottom: '14px' }}>
                  <i className="fa-solid fa-clipboard-check"></i>
                </div>
                <span className="section-kicker" style={{ alignSelf: 'flex-start', margin: '0 0 8px', background: '#FEF3C7', color: '#D97706' }}>TAHAP 3</span>
                <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Monev &amp; Pelaporan</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  Inspeksi higienitas berkala sanitasi kantin, pengisian aplikasi Stratifikasi UKS/M secara mandiri, audit rekam medis siswa, serta penyampaian laporan semesteran ke TP UKS Kecamatan/Dinas.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ============================================================
          SUBPAGE 2: TRIAS UKS/M (16 INDIKATOR)
          ============================================================ */}
      {activeSubpage === 'uksm-trias' && (
        <div>
          {/* Subpage Hero Banner */}
          <div className="subpage-hero-banner" data-gsap="reveal">
            <span className="subpage-hero-kicker">
              <i className="fa-solid fa-shield-heart"></i> Kluster 2 · TRIAS UKS/M (16 Indikator)
            </span>
            <h1 className="subpage-hero-title">
              TRIAS UKS/M : 3 Pilar Pelaksanaan di Satuan Pendidikan
            </h1>
            <p className="subpage-hero-desc">
              Tiga pilar pokok yang menjadi ruh pembiasaan hidup sehat: (1) Pendidikan Kesehatan (7 indikator), (2) Pelayanan Kesehatan (4 indikator), dan (3) Pembinaan Lingkungan Sekolah Sehat (5 indikator).
            </p>
          </div>

          {/* Pilar 1: Pendidikan Kesehatan (7 Indikator) */}
          <section id="sec-trias-pendidikan" className="section" style={{ paddingTop: '10px' }}>
            <div className="section-header" data-gsap="reveal">
              <div>
                <span className="section-kicker">Pilar 1 · 7 Indikator</span>
                <h2 className="section-title">(1) Pendidikan Kesehatan</h2>
              </div>
            </div>

            <div className="about-bento-frame" data-gsap="reveal" style={{ marginBottom: '28px' }}>
              <div className="about-grid" style={{ gridTemplateColumns: '1fr', marginBottom: '20px' }}>
                <div className="about-card" style={{ padding: '28px 32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="program-icon" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', margin: 0 }}>
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '24px', margin: 0, color: 'white' }}>Pendidikan Kesehatan Terintegrasi</h3>
                      <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                        Membangun pengetahuan, afektif, dan keterampilan perilaku hidup sehat peserta didik sejak dini.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="indicator-bento-grid">
                {triasPillarsDetail.pendidikan.indicators.map(ind => (
                  <div key={ind.id} id={ind.id} className="indicator-card">
                    <div>
                      <span className="indicator-card-tag">{ind.tag}</span>
                      <h4>{ind.title}</h4>
                      <p>{ind.desc}</p>
                    </div>
                    <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '11px', fontWeight: 800, color: 'var(--brand-primary)' }}>
                      <i className="fa-solid fa-check-circle" style={{ marginRight: '4px' }}></i> Indikator Terverifikasi
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pilar 2: Pelayanan Kesehatan (4 Indikator) */}
          <section id="sec-trias-pelayanan" className="section">
            <div className="section-header" data-gsap="reveal">
              <div>
                <span className="section-kicker" style={{ background: '#DBEAFE', color: '#2563EB' }}>Pilar 2 · 4 Indikator</span>
                <h2 className="section-title">(2) Pelayanan Kesehatan</h2>
              </div>
            </div>

            <div className="about-bento-frame" data-gsap="reveal" style={{ marginBottom: '28px' }}>
              <div className="about-grid" style={{ gridTemplateColumns: '1fr', marginBottom: '20px' }}>
                <div className="about-card" style={{ background: '#1E40AF', padding: '28px 32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="program-icon" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', margin: 0 }}>
                      <i className="fa-solid fa-kit-medical"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '24px', margin: 0, color: 'white' }}>Pelayanan Preventif &amp; Kuratif Ringan</h3>
                      <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                        Pemeriksaan rutin bekerja sama dengan Puskesmas pembina untuk deteksi dini masalah kesehatan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="indicator-bento-grid">
                {triasPillarsDetail.pelayanan.indicators.map(ind => (
                  <div key={ind.id} id={ind.id} className="indicator-card">
                    <div>
                      <span className="indicator-card-tag" style={{ background: '#DBEAFE', color: '#2563EB' }}>{ind.tag}</span>
                      <h4>{ind.title}</h4>
                      <p>{ind.desc}</p>
                    </div>
                    <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '11px', fontWeight: 800, color: '#2563EB' }}>
                      <i className="fa-solid fa-check-circle" style={{ marginRight: '4px' }}></i> Indikator Terverifikasi
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pilar 3: Pembinaan Lingkungan (5 Indikator) */}
          <section id="sec-trias-lingkungan" className="section">
            <div className="section-header" data-gsap="reveal">
              <div>
                <span className="section-kicker" style={{ background: '#D1FAE5', color: '#059669' }}>Pilar 3 · 5 Indikator</span>
                <h2 className="section-title">(3) Pembinaan Lingkungan Sekolah Sehat</h2>
              </div>
            </div>

            <div className="about-bento-frame" data-gsap="reveal">
              <div className="about-grid" style={{ gridTemplateColumns: '1fr', marginBottom: '20px' }}>
                <div className="about-card" style={{ background: '#059669', padding: '28px 32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="program-icon" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', margin: 0 }}>
                      <i className="fa-solid fa-seedling"></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '24px', margin: 0, color: 'white' }}>Ekosistem Bersih, Hijau &amp; Aman</h3>
                      <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                        Menjaga sanitasi prima, kantin higienis, penghijauan, dan zona bebas rokok/napza 100%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="indicator-bento-grid">
                {triasPillarsDetail.lingkungan.indicators.map(ind => (
                  <div key={ind.id} id={ind.id} className="indicator-card">
                    <div>
                      <span className="indicator-card-tag" style={{ background: '#D1FAE5', color: '#059669' }}>{ind.tag}</span>
                      <h4>{ind.title}</h4>
                      <p>{ind.desc}</p>
                    </div>
                    <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '11px', fontWeight: 800, color: '#059669' }}>
                      <i className="fa-solid fa-check-circle" style={{ marginRight: '4px' }}></i> Indikator Terverifikasi
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ============================================================
          SUBPAGE 3: SEKOLAH SEHAT (GSS & 5 SEHAT)
          ============================================================ */}
      {activeSubpage === 'uksm-gss' && (
        <div>
          {/* Subpage Hero Banner */}
          <div className="subpage-hero-banner" data-gsap="reveal">
            <span className="subpage-hero-kicker">
              <i className="fa-solid fa-apple-whole"></i> Kluster 3 · Gerakan Sekolah Sehat (GSS)
            </span>
            <h1 className="subpage-hero-title">
              Gerakan Sekolah Sehat &amp; 5 Fokus Pembiasaan
            </h1>
            <p className="subpage-hero-desc">
              Gerakan pembudayaan kebiasaan hidup sehat berkesinambungan melalui 5 pilar (Bergizi, Fisik, Imunisasi, Jiwa, Lingkungan) yang didukung dengan materi advokasi resmi.
            </p>
          </div>

          {/* Konsep GSS Overview */}
          <section id="sec-gss-overview" className="section" style={{ paddingTop: '10px' }}>
            <div className="about-bento-frame" data-gsap="reveal">
              <div className="about-grid">
                <div className="about-card">
                  <div>
                    <div className="program-icon" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                      <i className="fa-solid fa-heart-pulse"></i>
                    </div>
                    <h3>Gerakan Pembudayaan Sehat Terpadu</h3>
                    <p style={{ lineHeight: 1.7 }}>
                      Gerakan Sekolah Sehat (GSS) berfokus pada perubahan perilaku nyata peserta didik dan warga sekolah melalui pembiasaan sederhana namun berdampak besar terhadap kebugaran fisik, daya tahan tubuh, kecerdasan emosional, dan prestasi akademik.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  <div className="stat-box">
                    <strong>5</strong>
                    <span>Pilar Fokus Pembiasaan Terpadu</span>
                  </div>
                  <div className="stat-box">
                    <strong>100%</strong>
                    <span>Satuan Pendidikan Terbina</span>
                  </div>
                  <div className="stat-box">
                    <strong>38</strong>
                    <span>Provinsi Bergerak Serentak</span>
                  </div>
                  <div className="stat-box">
                    <strong>Setiap Hari</strong>
                    <span>Pembiasaan di Sekolah</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5 Fokus Pembiasaan Cards */}
          <section id="sec-gss-5sehat" className="section">
            <div className="section-header" data-gsap="reveal">
              <div>
                <span className="section-kicker">Pembiasaan 5 Sehat</span>
                <h2 className="section-title">5 Fokus Gerakan Sekolah Sehat</h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {gssFocusList.map(item => (
                <div
                  key={item.id}
                  id={item.id}
                  className="stat-box"
                  style={{ borderLeft: `6px solid ${item.color}`, padding: '28px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div className="program-icon" style={{ background: item.bg, color: item.color, margin: 0 }}>
                      <i className={item.icon}></i>
                    </div>
                    <span className="section-kicker" style={{ margin: 0, background: item.bg, color: item.color }}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
                    {item.description}
                  </p>
                  <div style={{ background: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', padding: '12px', fontSize: '12px', color: 'var(--text-primary)' }}>
                    <strong>Aksi Sekolah:</strong> {item.action}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bahan Advokasi & Listing Unduhan */}
          <section id="sec-gss-advokasi" className="section">
            <div className="section-header" data-gsap="reveal">
              <div>
                <span className="section-kicker">Materi Sosialisasi</span>
                <h2 className="section-title">Bahan Advokasi &amp; Instrumen Resmi GSS</h2>
              </div>
              <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-card-alt)', padding: '6px', borderRadius: 'var(--radius-pill)' }}>
                <button
                  className={`subnav-pill ${advFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setAdvFilter('all')}
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                >
                  Semua
                </button>
                <button
                  className={`subnav-pill ${advFilter === 'buku' ? 'active' : ''}`}
                  onClick={() => setAdvFilter('buku')}
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                >
                  Buku &amp; Modul
                </button>
                <button
                  className={`subnav-pill ${advFilter === 'instrumen' ? 'active' : ''}`}
                  onClick={() => setAdvFilter('instrumen')}
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                >
                  Instrumen Excel
                </button>
                <button
                  className={`subnav-pill ${advFilter === 'poster' ? 'active' : ''}`}
                  onClick={() => setAdvFilter('poster')}
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                >
                  Poster
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredAdvDocs.map(doc => (
                <div key={doc.id} className="download-doc-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: doc.formatBg,
                      color: doc.formatColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '13px',
                      flexShrink: 0
                    }}>
                      {doc.format}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '4px' }}>{doc.title}</h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{doc.desc} · <strong>{doc.size}</strong></p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="section-kicker" style={{ margin: 0, padding: '4px 12px', fontSize: '11px' }}>
                      {doc.badge}
                    </span>
                    <a
                      href={doc.file}
                      download
                      className="btn-pill primary"
                      style={{ padding: '10px 22px', fontSize: '13px' }}
                      onClick={(e) => {
                        if (doc.file === '#') {
                          e.preventDefault();
                          alert(`Simulasi Unduh: ${doc.title} (${doc.format})`);
                        }
                      }}
                    >
                      <i className="fa-solid fa-download" style={{ marginRight: '6px' }}></i> Unduh
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

    </div>
  );
}
