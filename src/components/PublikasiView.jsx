import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { pageNavigationConfigs } from '../data/portalData';
import { defaultTabSlug, pathForView, sectionIdFromSlug } from '../routes';
import { useBukuPanduanList, useInfografisList, useVideoList, useProdukHukumList } from '../hooks/usePublikasi';
import DocViewerModal from './shared/DocViewerModal';
import ImageLightbox from './shared/ImageLightbox';
import LobbyTabs from './shared/LobbyTabs';
import SafeImage from './SafeImage';

const publikasiTabs = pageNavigationConfigs.publikasi.sections;

function LoadingState({ label }) {
  return (
    <div className="content-toolbar-empty" role="status" aria-live="polite">
      <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i>
      <h4 className="info-empty-title">{label}</h4>
    </div>
  );
}

function ErrorState({ title, retry }) {
  return (
    <div className="content-toolbar-empty">
      <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
      <h4 className="info-empty-title">{title}</h4>
      <p className="info-empty-text">Terjadi gangguan saat mengambil data. Silakan coba lagi.</p>
      <button type="button" className="btn-pill secondary" onClick={retry} style={{ marginTop: '12px' }}>
        Coba Lagi
      </button>
    </div>
  );
}

function EmptyState({ icon, title, text }) {
  return (
    <div className="content-toolbar-empty">
      <i className={icon} aria-hidden="true"></i>
      <h4 className="info-empty-title">{title}</h4>
      <p className="info-empty-text">{text}</p>
    </div>
  );
}

function BooksPanel() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookCategory, setBookCategory] = useState('all');
  const { data: bukuList, loading, error, retry } = useBukuPanduanList();

  // Pills mirror whatever tags the CMS actually put on the fetched books,
  // sorted alphabetically so the order stays stable as new books are added.
  const tagOptions = useMemo(() => {
    if (!bukuList) return [];
    const seen = new Map();
    bukuList.forEach((book) => {
      (book.tags || []).forEach((tag) => {
        if (tag?.slug && !seen.has(tag.slug)) seen.set(tag.slug, tag.name);
      });
    });
    return Array.from(seen, ([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name, 'id'));
  }, [bukuList]);

  const filteredBooks = !bukuList
    ? []
    : bookCategory === 'all'
      ? bukuList
      : bukuList.filter((b) => (b.tags || []).some((tag) => tag.slug === bookCategory));

  return (
    <div className="about-bento-frame">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div>
          <span className="section-kicker">Perpustakaan Digital</span>
          <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)' }}>
            Buku &amp; Pedoman Teknis Satuan Pendidikan
          </h2>
        </div>
        {!loading && !error && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', background: 'var(--bg-app)', padding: '6px', borderRadius: 'var(--radius-pill)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)' }}>
            <button className={`subnav-pill ${bookCategory === 'all' ? 'active' : ''}`} onClick={() => setBookCategory('all')} style={{ padding: '8px 16px', fontSize: '13px' }}>Semua Koleksi</button>
            {tagOptions.map((tag) => (
              <button
                key={tag.slug}
                className={`subnav-pill ${bookCategory === tag.slug ? 'active' : ''}`}
                onClick={() => setBookCategory(tag.slug)}
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && <LoadingState label="Memuat buku & pedoman..." />}
      {!loading && error && <ErrorState title="Buku & pedoman tidak dapat dimuat" retry={retry} />}

      {!loading && !error && (
        filteredBooks.length === 0 ? (
          <EmptyState
            icon="fa-solid fa-book-bookmark"
            title={bukuList.length === 0 ? 'Belum ada buku yang tersedia' : 'Tidak ada buku pada kategori ini'}
            text={bukuList.length === 0 ? 'Buku dan pedoman akan tampil di sini begitu tersedia.' : 'Coba pilih kategori lain.'}
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {filteredBooks.map((buku) => {
              const metaParts = [buku.pages, buku.size].filter(Boolean);
              return (
                <div key={buku.id} className="book-swipe-card" style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '20px', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', transition: 'var(--spring)' }}>
                  <div className="book-cover-large"><SafeImage src={buku.cover} alt={buku.title} icon="fa-regular fa-file-pdf" /></div>
                  {buku.category && (
                    <span className="section-kicker" style={{ margin: '0 0 8px', padding: '4px 10px', fontSize: '10px' }}>{buku.category}</span>
                  )}
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{buku.title}</h3>
                  {buku.desc && (
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>{buku.desc}</p>
                  )}
                  {metaParts.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '16px' }}>
                      {buku.pages && <span><i className="fa-regular fa-file-pdf" style={{ marginRight: '4px' }}></i>{buku.pages}</span>}
                      {buku.pages && buku.size && <span>•</span>}
                      {buku.size && <span>{buku.size}</span>}
                    </div>
                  )}
                  {(buku.pdf || buku.externalUrl) && (
                    <div className="book-swipe-actions">
                      {buku.pdf ? (
                        <>
                          <button className="btn-pill primary" onClick={() => setSelectedBook(buku)}>
                            <i className="fa-solid fa-book-open" style={{ marginRight: '6px' }}></i>Baca Online
                          </button>
                          <a href={buku.pdf} download className="btn-pill secondary" style={{ textDecoration: 'none' }}>
                            <i className="fa-solid fa-download"></i>
                          </a>
                        </>
                      ) : (
                        <a href={buku.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-pill secondary" style={{ textDecoration: 'none' }}>
                          <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginRight: '6px' }}></i>Buka Tautan
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
      )}

      {selectedBook && (
        <DocViewerModal
          doc={{
            title: selectedBook.title,
            url: selectedBook.pdf,
            kind: 'pdf',
            meta: [selectedBook.pages, selectedBook.size].filter(Boolean).join(' · '),
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
  const { data: infografisList, loading, error, retry } = useInfografisList();

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

      {loading && <LoadingState label="Memuat infografis..." />}
      {!loading && error && <ErrorState title="Infografis tidak dapat dimuat" retry={retry} />}

      {!loading && !error && (
        (infografisList || []).length === 0 ? (
          <EmptyState
            icon="fa-solid fa-image"
            title="Belum ada infografis yang tersedia"
            text="Poster dan infografis akan tampil di sini begitu tersedia."
          />
        ) : (
          <div className="infografis-grid">
            {infografisList.map((item) => (
              <figure key={item.id} className="infografis-tile">
                <button
                  type="button"
                  className="infografis-frame"
                  onClick={() => item.image && setZoomed({ src: item.image, title: item.title })}
                  disabled={!item.image}
                >
                  <SafeImage src={item.image} alt={item.title} loading="lazy" style={{ aspectRatio: '3 / 4' }} />
                  {item.image && <span className="infografis-zoom" aria-hidden="true"><i className="fa-solid fa-expand"></i></span>}
                </button>
                <figcaption>
                  <span className="infografis-title">{item.title}</span>
                  {item.image && (
                    <a className="infografis-download" href={item.image} download>
                      <i className="fa-solid fa-download" aria-hidden="true"></i>
                      <span>Unduh</span>
                    </a>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )
      )}

      {zoomed && <ImageLightbox image={zoomed} onClose={() => setZoomed(null)} />}
    </div>
  );
}

function VideoPanel() {
  const { data: videos, loading, error, retry } = useVideoList();

  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Media Audio Visual</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Video Animasi Edukasi Peserta Didik
        </h2>
      </div>

      {loading && <LoadingState label="Memuat video..." />}
      {!loading && error && <ErrorState title="Video tidak dapat dimuat" retry={retry} />}

      {!loading && !error && (
        (videos || []).length === 0 ? (
          <EmptyState
            icon="fa-solid fa-film"
            title="Belum ada video yang tersedia"
            text="Video edukasi akan tampil di sini begitu tersedia."
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {videos.map(vid => (
              <a key={vid.id} className="video-card-playful" href={vid.youtubeUrl} target="_blank" rel="noopener noreferrer">
                <div className="video-thumb-wrap">
                  <img src={vid.thumb} alt={vid.title} />
                  <div className="video-play-overlay"><div className="video-play-badge"><i className="fa-solid fa-play"></i></div></div>
                  {vid.duration && (
                    <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontSize: '11px', fontWeight: 800 }}>
                      {vid.duration}
                    </span>
                  )}
                </div>
                <div style={{ padding: '20px' }}>
                  {vid.channel && <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase' }}>{vid.channel}</span>}
                  <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)', lineHeight: 1.4 }}>{vid.title}</h4>
                </div>
              </a>
            ))}
          </div>
        )
      )}
    </div>
  );
}

function RegulasiPanel() {
  const { data: regulations, loading, error, retry } = useProdukHukumList();

  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Produk Hukum Resmi</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Regulasi &amp; Landasan Hukum SKB 4 Menteri
        </h2>
      </div>

      {loading && <LoadingState label="Memuat regulasi..." />}
      {!loading && error && <ErrorState title="Regulasi tidak dapat dimuat" retry={retry} />}

      {!loading && !error && (
        (regulations || []).length === 0 ? (
          <EmptyState
            icon="fa-solid fa-scale-balanced"
            title="Belum ada regulasi yang tersedia"
            text="Produk hukum akan tampil di sini begitu tersedia."
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {regulations.map((reg) => (
              <div key={reg.id} className="download-doc-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'var(--brand-light)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                    <i className="fa-solid fa-scale-balanced"></i>
                  </div>
                  <div>
                    {reg.badge && <span className="indicator-card-tag" style={{ margin: '0 0 4px', fontSize: '9px' }}>{reg.badge}</span>}
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 4px' }}>{reg.title}</h4>
                    {reg.number && <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{reg.number}</p>}
                  </div>
                </div>
                <a href={reg.file} download className="btn-massive" style={{ padding: '8px 18px', fontSize: '13px', whiteSpace: 'nowrap' }}>
                  <i className="fa-solid fa-download"></i><span>Unduh{reg.size ? ` (${reg.size})` : ''}</span>
                </a>
              </div>
            ))}
          </div>
        )
      )}
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
