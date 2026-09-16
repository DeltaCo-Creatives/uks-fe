import { useState } from 'react';
import { realBooksList, defaultInfografis, pageNavigationConfigs } from '../data/portalData';

const publikasiTabs = pageNavigationConfigs.publikasi.sections;

const videoList = [
  { id: 'vid-1', title: 'Animasi Edukasi: Tata Cara 6 Langkah Cuci Tangan Pakai Sabun (CTPS)', duration: '03:45', channel: 'Pusdatin Kemendikdasmen', thumb: 'Aset UKS/beritagambar1.png' },
  { id: 'vid-2', title: 'Tutorial Senam Kebugaran Jasmani (SKJ) & Peregangan Kelas 3 Menit', duration: '05:12', channel: 'Direktorat PDM', thumb: 'Aset UKS/bertaigambar2.png' },
  { id: 'vid-3', title: 'Film Pendek Edukasi: Sahabat Sehat, Lawan Anemia dengan Aksi Bergizi', duration: '08:20', channel: 'Kementerian Kesehatan RI', thumb: 'Aset UKS/gambar3.png' }
];

const regulationsList = [
  { code: 'SKB-2022', badge: 'SKB 4 MENTERI', title: 'SKB 4 Menteri tentang Pembinaan & Pengembangan UKS/M', number: 'Nomor 03/KB/2022, Nomor HK.01.08/MENKES/1325/2022, Nomor 835 Tahun 2022, Nomor 119-5091.A Tahun 2022', size: '2.4 MB', file: 'Aset UKS/buku3.pdf' },
  { code: 'PERMENDIKBUD-18', badge: 'REGULASI PDM', title: 'Permendikbudristek No. 18 Tahun 2023 tentang Standar Pelayanan Minimal Pendidikan', number: 'Pasal 24: Fasilitasi Layanan Kesehatan Dasar di Sekolah', size: '1.8 MB', file: 'Aset UKS/buku1.pdf' },
  { code: 'SE-GSS-2024', badge: 'SURAT EDARAN', title: 'Surat Edaran Dirjen PAUD Dikdasmen tentang Kampanye Sekolah Sehat', number: 'Nomor 4447/C/HK.04.01/2024 tentang Gerakan 5 Sehat', size: '890 KB', file: 'Aset UKS/buku2.pdf' }
];

function BooksPanel() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookCategory, setBookCategory] = useState('all');

  const filteredBooks = bookCategory === 'all'
    ? realBooksList
    : realBooksList.filter(b => b.categoryKey === bookCategory);

  return (
    <div className="about-bento-frame">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div>
          <span className="section-kicker">Perpustakaan Digital</span>
          <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)' }}>
            Buku &amp; Pedoman Teknis Satuan Pendidikan
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-app)', padding: '6px', borderRadius: 'var(--radius-pill)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)' }}>
          <button className={`subnav-pill ${bookCategory === 'all' ? 'active' : ''}`} onClick={() => setBookCategory('all')} style={{ padding: '8px 16px', fontSize: '13px' }}>Semua Koleksi</button>
          <button className={`subnav-pill ${bookCategory === 'mbg' ? 'active' : ''}`} onClick={() => setBookCategory('mbg')} style={{ padding: '8px 16px', fontSize: '13px' }}>MBG &amp; Gizi</button>
          <button className={`subnav-pill ${bookCategory === 'modul' ? 'active' : ''}`} onClick={() => setBookCategory('modul')} style={{ padding: '8px 16px', fontSize: '13px' }}>Kesehatan Jiwa</button>
          <button className={`subnav-pill ${bookCategory === 'manajemen' ? 'active' : ''}`} onClick={() => setBookCategory('manajemen')} style={{ padding: '8px 16px', fontSize: '13px' }}>Tata Kelola</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredBooks.map((buku) => (
          <div key={buku.id} className="book-swipe-card" style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '20px', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', transition: 'var(--spring)' }}>
            <div className="book-cover-large"><img src={buku.cover} alt={buku.title} /></div>
            <span className="section-kicker" style={{ margin: '0 0 8px', padding: '4px 10px', fontSize: '10px' }}>{buku.category}</span>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{buku.title}</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>{buku.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '16px' }}>
              <span><i className="fa-regular fa-file-pdf" style={{ marginRight: '4px' }}></i>{buku.pages}</span>
              <span>•</span>
              <span>{buku.size}</span>
            </div>
            <div className="book-swipe-actions">
              <button className="btn-pill primary" onClick={() => setSelectedBook(buku)}>
                <i className="fa-solid fa-book-open" style={{ marginRight: '6px' }}></i>Baca Online
              </button>
              <a href={buku.pdf} download className="btn-pill secondary" style={{ textDecoration: 'none' }}>
                <i className="fa-solid fa-download"></i>
              </a>
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="modal-bento-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal-bento-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal-bento-close" onClick={() => setSelectedBook(null)}><i className="fa-solid fa-xmark"></i></button>
            <div style={{ padding: 'clamp(24px, 4vw, 36px)' }}>
              <span className="section-kicker">{selectedBook.category}</span>
              <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, margin: '8px 0 16px', color: 'var(--text-primary)' }}>{selectedBook.title}</h2>
              <div style={{ background: 'var(--bg-app)', borderRadius: 'var(--radius-lg)', padding: '28px', textAlign: 'center', margin: '20px 0', border: '1.5px dashed rgba(0,0,0,0.12)' }}>
                <div style={{ fontSize: '56px', color: '#DC2626', marginBottom: '14px' }}><i className="fa-solid fa-file-pdf"></i></div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px' }}>Dokumen Digital Siap Baca ({selectedBook.pages} · {selectedBook.size})</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 20px' }}>{selectedBook.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <a href={selectedBook.pdf} target="_blank" rel="noreferrer" className="btn-massive" style={{ padding: '12px 24px', fontSize: '14px' }}>
                    <i className="fa-solid fa-up-right-from-square"></i><span>Buka Dokumen PDF Penuh</span>
                  </a>
                  <a href={selectedBook.pdf} download className="btn-pill secondary" style={{ padding: '12px 20px', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-download"></i><span>Unduh Arsip</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfografisPanel() {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Media Cetak Satuan Pendidikan</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Infografis Mading &amp; Kampanye Siap Cetak
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Arahkan kursor ke salah satu poster untuk memperbesar. Klik untuk melihat resolusi penuh siap cetak untuk dinding sekolah.
        </p>
      </div>

      <div className="info-bento">
        {defaultInfografis.map((item, idx) => (
          <div key={idx} className="info-item" onClick={() => setSelectedImage(item.image)} title={`Klik untuk memperbesar: ${item.title}`}>
            <img src={item.image} alt={item.title} />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}><i className="fa-solid fa-xmark"></i></button>
            <img src={selectedImage} alt="Infografis Pembesaran" />
          </div>
        </div>
      )}
    </div>
  );
}

function VideoPanel() {
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Media Audio Visual</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Video Animasi Edukasi Peserta Didik
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {videoList.map(vid => (
          <div key={vid.id} className="video-card-playful">
            <div className="video-thumb-wrap">
              <img src={vid.thumb} alt={vid.title} />
              <div className="video-play-overlay"><div className="video-play-badge"><i className="fa-solid fa-play"></i></div></div>
              <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontSize: '11px', fontWeight: 800 }}>
                {vid.duration}
              </span>
            </div>
            <div style={{ padding: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase' }}>{vid.channel}</span>
              <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)', lineHeight: 1.4 }}>{vid.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegulasiPanel() {
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Produk Hukum Resmi</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Regulasi &amp; Landasan Hukum SKB 4 Menteri
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {regulationsList.map((reg) => (
          <div key={reg.code} className="download-doc-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'var(--brand-light)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                <i className="fa-solid fa-scale-balanced"></i>
              </div>
              <div>
                <span className="indicator-card-tag" style={{ margin: '0 0 4px', fontSize: '9px' }}>{reg.badge}</span>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 4px' }}>{reg.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{reg.number}</p>
              </div>
            </div>
            <a href={reg.file} download className="btn-massive" style={{ padding: '8px 18px', fontSize: '13px', whiteSpace: 'nowrap' }}>
              <i className="fa-solid fa-download"></i><span>Unduh ({reg.size})</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const publikasiPanels = {
  'sec-pub-books': BooksPanel,
  'sec-pub-infografis': InfografisPanel,
  'sec-pub-video': VideoPanel,
  'sec-pub-regulasi': RegulasiPanel
};

export default function PublikasiView({ activeSection, onNavigateSection }) {
  const activeId = publikasiTabs.some(t => t.id === activeSection) ? activeSection : publikasiTabs[0].id;
  const Panel = publikasiPanels[activeId];

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>

      {/* Subpage Hero Banner */}
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-book-bookmark"></i> Pustaka Digital &amp; Media Komunikasi · UKS/M
        </span>
        <h1 className="subpage-hero-title">
          Publikasi, Modul Panduan &amp; Regulasi
        </h1>
        <p className="subpage-hero-desc">
          Akses perpustakaan dokumen resmi Kemendikdasmen: buku pedoman digital, infografis mading siap cetak, video edukasi animasi, serta regulasi SKB 4 Menteri.
        </p>
      </div>

      {/* LOBBY: pick a topic, the panel below shows it */}
      <div className="lobby-tabs" data-gsap="reveal">
        {publikasiTabs.map((tab) => (
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
