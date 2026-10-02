import { useId, useRef } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { pageNavigationConfigs } from '@/data/portalData';
import { defaultTabSlug, pathForView, sectionIdFromSlug } from '@/routes';
import LobbyTabs from '@/components/shared/LobbyTabs';
import { BooksPanel, InfografisPanel, VideoPanel, RegulasiPanel, PublikasiSearchResults } from '@/features/publikasi';

const publikasiTabs = pageNavigationConfigs.publikasi.sections;

const publikasiPanels = {
  'sec-pub-books': BooksPanel,
  'sec-pub-infografis': InfografisPanel,
  'sec-pub-video': VideoPanel,
  'sec-pub-regulasi': RegulasiPanel
};

export default function PublikasiPage() {
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
    <div className="container pb-20">

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

        {/* Raised above the hero's decorative ::after glow, which would otherwise paint over the label. */}
        <div className="relative z-[1] mt-6 max-w-[680px]" role="search">
          <label className="mb-2 block text-[13px] font-bold text-white" htmlFor={searchId}>Cari di semua publikasi</label>
          {/* The dark hero hides the toolbar's soft focus glow, so the field uses the accent ring. */}
          {/* [&_i] also sizes the clear button's icon, as the old field rule did. */}
          <div className="flex min-h-12 items-center gap-2.5 rounded-[999px] border-[1.5px] border-transparent bg-card px-[18px] focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-brand-accent [&_i]:text-[14px]!">
            <i className="fa-solid fa-magnifying-glass text-ink-muted" aria-hidden="true"></i>
            {/* 16px keeps iOS Safari from zooming the page when the field is focused. */}
            <input
              className="min-w-0 flex-1 border-none bg-transparent py-[13px] text-[16px] text-ink [outline:none] placeholder:text-ink-muted placeholder:opacity-100 [&::-webkit-search-cancel-button]:appearance-none"
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
