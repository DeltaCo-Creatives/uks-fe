import { useState } from 'react';
import { realNewsList, bestPracticesList, pageNavigationConfigs } from '../data/portalData';

const informasiTabs = pageNavigationConfigs.informasi.sections;

const nationalAgendas = [
  {
    day: '24',
    month: 'OKT',
    title: 'Jambore Nasional Dokter Kecil & KKR RI 2026',
    organizer: 'Direktorat PDM Kemendikdasmen RI',
    location: 'Balai Besar Guru Penggerak Yogyakarta',
    status: 'Pendaftaran Dibuka'
  },
  {
    day: '12',
    month: 'NOV',
    title: 'Peringatan Hari Kesehatan Nasional (HKN) & Gala UKS Model',
    organizer: 'Sinergi Kemendikdasmen & Kemenkes',
    location: 'Plaza Insan Berprestasi Gedung A Kemendikdasmen Jakarta',
    status: 'Konfirmasi Hadir'
  },
  {
    day: '05',
    month: 'DES',
    title: 'Rapat Koordinasi Nasional Tim Pembina UKS/M 38 Provinsi',
    organizer: 'Sekretariat Pembina UKS/M Pusat',
    location: 'Grand Mercure Convention Bandung & Hybrid Zoom',
    status: 'Undangan Khusus'
  }
];

function BeritaPanel() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedNews, setSelectedNews] = useState(null);

  const filteredNews = activeCategory === 'all'
    ? realNewsList
    : realNewsList.filter(n => n.categoryKey === activeCategory);

  return (
    <div className="about-bento-frame">
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap',
        gap: '16px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.06)'
      }}>
        <div>
          <span className="section-kicker">Rilis Resmi Kementerian</span>
          <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)' }}>
            Warta Terkini Usaha Kesehatan Sekolah
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-app)', padding: '6px', borderRadius: 'var(--radius-pill)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)' }}>
          <button className={`subnav-pill ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')} style={{ padding: '8px 16px', fontSize: '13px' }}>Semua Warta</button>
          <button className={`subnav-pill ${activeCategory === 'kebijakan' ? 'active' : ''}`} onClick={() => setActiveCategory('kebijakan')} style={{ padding: '8px 16px', fontSize: '13px' }}>Kebijakan</button>
          <button className={`subnav-pill ${activeCategory === 'kegiatan' ? 'active' : ''}`} onClick={() => setActiveCategory('kegiatan')} style={{ padding: '8px 16px', fontSize: '13px' }}>Kegiatan Lapangan</button>
          <button className={`subnav-pill ${activeCategory === 'sosialisasi' ? 'active' : ''}`} onClick={() => setActiveCategory('sosialisasi')} style={{ padding: '8px 16px', fontSize: '13px' }}>Inovasi GSS</button>
        </div>
      </div>

      <div className="news-masonry">
        {filteredNews.map(item => (
          <div key={item.id} className="news-card-playful" onClick={() => setSelectedNews(item)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
            <div className="news-img-wrap"><img src={item.image} alt={item.title} /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="section-kicker" style={{ margin: 0, padding: '4px 10px', fontSize: '10px' }}>{item.category}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <i className="fa-regular fa-calendar" style={{ marginRight: '5px' }}></i>{item.date}
              </span>
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '6px 0 8px', color: 'var(--text-primary)', lineHeight: 1.35 }}>{item.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '16px' }}>{item.excerpt}</p>
            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Baca Selengkapnya</span><i className="fa-solid fa-arrow-right"></i>
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                <i className="fa-regular fa-eye" style={{ marginRight: '4px' }}></i>{item.views}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedNews && (
        <div className="modal-bento-overlay" onClick={() => setSelectedNews(null)}>
          <div className="modal-bento-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal-bento-close" onClick={() => setSelectedNews(null)}><i className="fa-solid fa-xmark"></i></button>
            <div style={{ width: '100%', height: '280px', overflow: 'hidden', borderTopLeftRadius: 'var(--radius-xl)', borderTopRightRadius: 'var(--radius-xl)' }}>
              <img src={selectedNews.image} alt={selectedNews.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 'clamp(24px, 4vw, 36px)' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
                <span className="section-kicker" style={{ margin: 0 }}>{selectedNews.category}</span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <i className="fa-regular fa-calendar" style={{ marginRight: '6px' }}></i>{selectedNews.date}
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)', lineHeight: 1.25 }}>{selectedNews.title}</h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '18px' }}>{selectedNews.excerpt}</p>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
                Program ini merupakan bagian penting dari peta jalan percepatan mutu pendidikan dan pemenuhan hak kesehatan dasar setiap anak didik. Sinergi antara dinas pendidikan provinsi/kabupaten/kota, puskesmas pembina, dan komite sekolah terus diperkuat agar intervensi berjalan berkesinambungan di seluruh satuan pendidikan dari jenjang PAUD, SD/MI, SMP/MTs, hingga SMA/SMK/MA.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '18px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <button className="btn-massive" onClick={() => setSelectedNews(null)} style={{ padding: '10px 24px', fontSize: '14px' }}>
                  <i className="fa-solid fa-check"></i><span>Tutup Warta</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PraktikBaikPanel() {
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Praktik Baik (Best Practices)</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Inspirasi dari Satuan Pendidikan Model
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Kisah sukses sekolah percontohan dalam membiasakan 5 Sehat, pengelolaan kantin higienis, pengolahan sampah mandiri, dan kemitraan aktif paguyuban orang tua.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {bestPracticesList.map((bp, idx) => (
          <div key={idx} className="stat-box" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '26px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '14px' }}>
              <div style={{ fontSize: '28px' }}>{bp.icon}</div>
              <span className="indicator-card-tag" style={{ margin: 0 }}>{bp.level}</span>
            </div>
            <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>{bp.title}</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{bp.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgendaPanel() {
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Agenda & Jadwal</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Kalender Kegiatan Nasional UKS/M 2026
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {nationalAgendas.map((agenda, i) => (
          <div key={i} className="download-doc-item" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', background: 'var(--text-primary)', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '22px', fontWeight: 900, lineHeight: 1, fontFamily: 'Plus Jakarta Sans' }}>{agenda.day}</span>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--brand-accent)', letterSpacing: '0.05em' }}>{agenda.month}</span>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '4px', color: 'var(--text-primary)' }}>{agenda.title}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <span><i className="fa-solid fa-building-columns" style={{ marginRight: '6px', color: 'var(--brand-primary)' }}></i>{agenda.organizer}</span>
                  <span><i className="fa-solid fa-location-dot" style={{ marginRight: '6px', color: '#DC2626' }}></i>{agenda.location}</span>
                </div>
              </div>
            </div>
            <span className="section-kicker" style={{ margin: 0, whiteSpace: 'nowrap' }}>{agenda.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const informasiPanels = {
  'sec-info-berita': BeritaPanel,
  'sec-info-praktik': PraktikBaikPanel,
  'sec-info-agenda': AgendaPanel
};

export default function InformasiView({ activeSection, onNavigateSection }) {
  const activeId = informasiTabs.some(t => t.id === activeSection) ? activeSection : informasiTabs[0].id;
  const Panel = informasiPanels[activeId];

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>

      {/* Subpage Hero Banner */}
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-newspaper"></i> Pusat Informasi &amp; Kabar Terkini · UKS/M
        </span>
        <h1 className="subpage-hero-title">
          Warta Terkini, Praktik Baik &amp; Agenda 2026
        </h1>
        <p className="subpage-hero-desc">
          Kumpulan rilis resmi kebijakan kementerian, liputan kegiatan sekolah sehat di penjuru tanah air, etalase inovasi praktik baik sekolah model, serta kalender agenda nasional.
        </p>
      </div>

      {/* LOBBY: pick a topic, the panel below shows it */}
      <div className="lobby-tabs" data-gsap="reveal">
        {informasiTabs.map((tab) => (
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
