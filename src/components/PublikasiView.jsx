import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { realBooksList, defaultInfografis, pageNavigationConfigs, videoList, regulationsList } from '../data/portalData';
import { defaultTabSlug, pathForView, sectionIdFromSlug } from '../routes';
import DocViewerModal from './shared/DocViewerModal';
import ImageLightbox from './shared/ImageLightbox';
import LobbyTabs from './shared/LobbyTabs';
import SafeImage from './SafeImage';

const publikasiTabs = pageNavigationConfigs.publikasi.sections;

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
            <div className="book-cover-large"><SafeImage src={buku.cover} alt={buku.title} icon="fa-regular fa-file-pdf" /></div>
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
        <DocViewerModal
          doc={{
            title: selectedBook.title,
            url: selectedBook.pdf,
            kind: 'pdf',
            meta: `${selectedBook.pages} · ${selectedBook.size}`,
            download: selectedBook.pdf
          }}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

/**
 * Each poster is shown whole in its tile, not cropped to fit one, so it can be
 * read on the page. Enlarging and downloading are for the small print, not the
 * only way to see what a poster says.
 */
function InfografisPanel() {
  const [zoomed, setZoomed] = useState(null);

  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Media Cetak Satuan Pendidikan</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Infografis Mading &amp; Kampanye Siap Cetak
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Poster siap cetak untuk dinding dan mading sekolah. Klik poster untuk melihatnya lebih besar.
        </p>
      </div>

      <div className="infografis-grid">
        {defaultInfografis.map((item) => (
          <figure key={item.image} className="infografis-tile">
            <button type="button" className="infografis-frame" onClick={() => setZoomed({ src: item.image, title: item.title })}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <span className="infografis-zoom" aria-hidden="true"><i className="fa-solid fa-expand"></i></span>
            </button>
            <figcaption>
              <span className="infografis-title">{item.title}</span>
              <a className="infografis-download" href={item.image} download>
                <i className="fa-solid fa-download" aria-hidden="true"></i>
                <span>Unduh</span>
              </a>
            </figcaption>
          </figure>
        ))}
      </div>

      {zoomed && <ImageLightbox image={zoomed} onClose={() => setZoomed(null)} />}
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

export default function PublikasiView() {
  const { tabSlug } = useParams();
  const navigate = useNavigate();
  const activeId = sectionIdFromSlug('publikasi', tabSlug);

  if (!activeId) return <Navigate to={`/publikasi/${defaultTabSlug('publikasi')}`} replace />;

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

      <LobbyTabs
        tabs={publikasiTabs}
        activeId={activeId}
        onSelect={(id) => navigate(pathForView('publikasi', id))}
        label="Bagian publikasi"
      />

      {/* GIANT DISPLAY PANEL */}
      <div className="lobby-panel" data-gsap="reveal" key={activeId}>
        <Panel />
      </div>

    </div>
  );
}
