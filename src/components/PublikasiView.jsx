import { useId, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { pageNavigationConfigs } from '../data/portalData';
import { defaultTabSlug, pathForView, sectionIdFromSlug } from '../routes';
import { useBukuPanduanList, useInfografisList, useVideoList, useProdukHukumList } from '../hooks/usePublicLists';
import { useContentToolbar } from '../hooks/useContentToolbar';
import DocViewerModal from './shared/DocViewerModal';
import ImageLightbox from './shared/ImageLightbox';
import LobbyTabs from './shared/LobbyTabs';
import ContentToolbar from './shared/ContentToolbar';
import { LoadingState, ErrorState, EmptyState } from './shared/AsyncState';
import { BookGrid, InfografisGrid, VideoGrid, RegulasiList } from './publikasi/PublikasiItems';
import PublikasiSearchResults from './publikasi/PublikasiSearchResults';
import {
  BUKU_SEARCH_FIELDS,
  INFOGRAFIS_SEARCH_FIELDS,
  VIDEO_SEARCH_FIELDS,
  REGULASI_SEARCH_FIELDS
} from './publikasi/searchFields';
import './publikasi/publikasi.css';

const publikasiTabs = pageNavigationConfigs.publikasi.sections;

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

  const filteredBooks = useMemo(() => {
    if (!bukuList) return [];
    if (bookCategory === 'all') return bukuList;
    return bukuList.filter((b) => (b.tags || []).some((tag) => tag.slug === bookCategory));
  }, [bukuList, bookCategory]);

  const {
    query, setQuery,
    groups, resultCount, totalCount
  } = useContentToolbar({
    items: filteredBooks,
    dateField: null,
    searchFields: BUKU_SEARCH_FIELDS
  });

  const searching = query.trim() !== '';

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
        (bukuList || []).length === 0 ? (
          <EmptyState
            icon="fa-solid fa-book-bookmark"
            title="Belum ada buku yang tersedia"
            text="Buku dan pedoman akan tampil di sini begitu tersedia."
          />
        ) : (
          <>
            <ContentToolbar
              showSort={false}
              showDateRange={false}
              searchPlaceholder="Cari buku berdasarkan judul, kategori, atau tag"
              query={query}
              onQueryChange={setQuery}
              resultCount={resultCount}
              totalCount={totalCount}
            />

            {resultCount === 0 ? (
              <EmptyState
                icon="fa-solid fa-book-bookmark"
                title={searching ? 'Tidak ada buku yang cocok' : 'Tidak ada buku pada kategori ini'}
                text={
                  searching
                    ? (bookCategory === 'all' ? 'Coba kata kunci lain.' : 'Coba kata kunci lain atau pilih kategori lain.')
                    : 'Coba pilih kategori lain.'
                }
              />
            ) : (
              <BookGrid books={groups[0].items} onRead={setSelectedBook} />
            )}
          </>
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

  const {
    query, setQuery,
    groups, resultCount, totalCount
  } = useContentToolbar({
    items: infografisList || [],
    dateField: null,
    searchFields: INFOGRAFIS_SEARCH_FIELDS
  });

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
          <>
            <ContentToolbar
              showSort={false}
              showDateRange={false}
              searchPlaceholder="Cari infografis berdasarkan judul atau deskripsi"
              query={query}
              onQueryChange={setQuery}
              resultCount={resultCount}
              totalCount={totalCount}
            />

            {resultCount === 0 ? (
              <EmptyState
                icon="fa-solid fa-image"
                title="Tidak ada infografis yang cocok"
                text="Coba kata kunci lain."
              />
            ) : (
              <InfografisGrid items={groups[0].items} onZoom={setZoomed} />
            )}
          </>
        )
      )}

      {zoomed && <ImageLightbox image={zoomed} onClose={() => setZoomed(null)} />}
    </div>
  );
}

function VideoPanel() {
  const { data: videos, loading, error, retry } = useVideoList();

  const {
    query, setQuery,
    groups, resultCount, totalCount
  } = useContentToolbar({
    items: videos || [],
    dateField: null,
    searchFields: VIDEO_SEARCH_FIELDS
  });

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
          <>
            <ContentToolbar
              showSort={false}
              showDateRange={false}
              searchPlaceholder="Cari video berdasarkan judul atau kanal"
              query={query}
              onQueryChange={setQuery}
              resultCount={resultCount}
              totalCount={totalCount}
            />

            {resultCount === 0 ? (
              <EmptyState
                icon="fa-solid fa-film"
                title="Tidak ada video yang cocok"
                text="Coba kata kunci lain."
              />
            ) : (
              <VideoGrid videos={groups[0].items} />
            )}
          </>
        )
      )}
    </div>
  );
}

function RegulasiPanel() {
  const { data: regulations, loading, error, retry } = useProdukHukumList();

  const {
    query, setQuery,
    groups, resultCount, totalCount
  } = useContentToolbar({
    items: regulations || [],
    dateField: null,
    searchFields: REGULASI_SEARCH_FIELDS
  });

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
          <>
            <ContentToolbar
              showSort={false}
              showDateRange={false}
              searchPlaceholder="Cari regulasi berdasarkan judul atau nomor"
              query={query}
              onQueryChange={setQuery}
              resultCount={resultCount}
              totalCount={totalCount}
            />

            {resultCount === 0 ? (
              <EmptyState
                icon="fa-solid fa-scale-balanced"
                title="Tidak ada regulasi yang cocok"
                text="Coba kata kunci lain."
              />
            ) : (
              <RegulasiList regulations={groups[0].items} />
            )}
          </>
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
  const [searchParams, setSearchParams] = useSearchParams();
  const searchId = useId();
  const searchInputRef = useRef(null);
  const activeId = sectionIdFromSlug('publikasi', tabSlug);

  const q = searchParams.get('q') || '';
  const searching = q.trim() !== '';

  // Replace rather than push: one history entry for the search, not one per keystroke.
  const setQ = (value) => {
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  // The results, and the button that cleared them, unmount; keep keyboard focus in the search box.
  const clearSearch = () => {
    setQ('');
    searchInputRef.current?.focus();
  };

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

        <div className="publikasi-search" role="search">
          <label className="publikasi-search-label" htmlFor={searchId}>Cari di semua publikasi</label>
          <div className="publikasi-search-field">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <input
              ref={searchInputRef}
              id={searchId}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape' && q) setQ('');
              }}
              placeholder="Judul buku, infografis, video, atau regulasi"
            />
            {q && (
              <button
                type="button"
                className="content-toolbar-clear"
                onClick={clearSearch}
                aria-label="Hapus pencarian"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stay mounted while searching: the Daftar Isi handle watches this nav. */}
      <LobbyTabs
        tabs={publikasiTabs}
        activeId={searching ? null : activeId}
        onSelect={(id) => navigate(pathForView('publikasi', id))}
        label="Bagian publikasi"
        pageNav
      />

      {/* GIANT DISPLAY PANEL */}
      <div className="lobby-panel" data-gsap="reveal" key={activeId}>
        {searching ? <PublikasiSearchResults query={q} onClear={clearSearch} /> : <Panel />}
      </div>

    </div>
  );
}
