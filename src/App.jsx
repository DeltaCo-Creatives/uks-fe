import { useRef, useState } from 'react';
import { Routes, Route, Navigate, Outlet, Link, useLocation, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import EdgeDrawer from './components/EdgeDrawer';
import ScrollManager from './components/ScrollManager';
import BerandaPage from './pages/BerandaPage';
import UksmClusters from './pages/UksmClusters';
import ProfilPage from './pages/ProfilPage';
import TriasPage from './pages/TriasPage';
import StratifikasiPage from './pages/StratifikasiPage';
import ProgramPage from './pages/ProgramPage';
import MitraPage from './pages/MitraPage';
import InformasiPage from './pages/InformasiPage';
import PublikasiPage from './pages/PublikasiPage';
import KontakPage from './pages/KontakPage';
import SearchView from './components/SearchView';
import BeritaDetailView from './components/BeritaDetailView';
import PengumumanDetailView from './components/PengumumanDetailView';
import NotFoundView from './components/NotFoundView';
import Footer from './components/Footer';
import DownloadToast from './components/shared/DownloadToast';

import NavConfigProvider from '@/components/NavConfigProvider';
import { useNavConfig } from '@/hooks/useNavConfig';
import UptBerceritaDetailView from './components/UptBerceritaDetailView';
import { useBeritaList } from './hooks/useBerita';
import { usePengumumanList, useUptStoriesList } from './hooks/usePublicLists';
import {
  DETAIL_VIEWS,
  defaultTabPath,
  pathForTab,
  tabSectionFromPathname,
  viewKeyFromPathname
} from './routes';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const VIEWS_WITHOUT_DRAWER = ['beranda', 'search', 'berita-detail', 'upt-detail', 'pengumuman-detail'];

// Article-style detail pages: the slug and label of the Informasi tab they fall back to and the
// list their title is looked up in. Berita and pengumuman details override the tab with their own submenu.
const DETAIL_CRUMBS = {
  'berita-detail': { tabSlug: 'berita', label: 'Warta Terkini', useList: useBeritaList },
  'pengumuman-detail': { tabSlug: 'pengumuman', label: 'Pengumuman', useList: usePengumumanList },
  'upt-detail': { tabSlug: 'upt', label: 'UPT Bercerita', useList: useUptStoriesList }
};

/**
 * Informasi / tab / title crumbs of an article detail. The tab is the article's own submenu (the URL's
 * while the list loads); the title shows once the list resolves, so nothing broken shows while it loads.
 */
function DetailCrumbs({ detailCrumb, tabSlug, slug, linkStyle }) {
  const sections = useNavConfig().informasi.sections;
  const { data: list } = detailCrumb.useList();
  const article = slug ? (list || []).find((n) => n.slug === slug) : null;
  const tab = article?.submenuSlug ?? tabSlug;
  const label = sections.find((s) => s.slug === tab)?.label ?? detailCrumb.label;

  return (
    <>
      <span>/</span>
      <Link to={pathForTab('informasi', tab)} style={linkStyle}>Informasi</Link>
      <span>/</span>
      <Link to={pathForTab('informasi', tab)} style={linkStyle}>{label}</Link>
      {article && (
        <>
          <span>/</span>
          <span style={{ fontWeight: 800, color: 'var(--text-primary)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {article.title ?? article.judul}
          </span>
        </>
      )}
    </>
  );
}

function Breadcrumbs({ viewKey, pathname }) {
  const configs = useNavConfig();
  if (!viewKey || viewKey === 'beranda') return null;

  const linkStyle = { color: 'var(--brand-primary)', fontWeight: 700 };
  const detailCrumb = DETAIL_CRUMBS[viewKey];
  const [, , tabSlug, itemSlug] = pathname.split('/');

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '12px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        fontSize: '12px',
        color: 'var(--text-secondary)'
      }}>
        <Link to="/" style={linkStyle}>Beranda</Link>

        {detailCrumb ? (
          <DetailCrumbs
            key={viewKey}
            detailCrumb={detailCrumb}
            tabSlug={viewKey === 'upt-detail' ? detailCrumb.tabSlug : tabSlug}
            slug={decodeURIComponent(itemSlug || '')}
            linkStyle={linkStyle}
          />
        ) : (
          <>
            <span>/</span>
            <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
              {configs[viewKey].title}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

// /informasi/:submenuSlug/:itemSlug: the detail of an artikel / pengumuman / kesempatan submenu, else back to the tab.
function SubmenuDetailRoute() {
  const { submenuSlug } = useParams();
  const sections = useNavConfig().informasi.sections;
  const detailView = DETAIL_VIEWS[sections.find((s) => s.slug === submenuSlug)?.template];
  if (detailView === 'berita-detail') return <BeritaDetailView />;
  if (detailView === 'pengumuman-detail') return <PengumumanDetailView />;
  return <Navigate to={pathForTab('informasi', submenuSlug)} replace />;
}

function Layout() {
  const { pathname } = useLocation();
  const configs = useNavConfig();
  const viewKey = viewKeyFromPathname(pathname);
  const [scrolledSection, setScrolledSection] = useState(null);
  // Tracks which elements have already played their reveal, across the whole
  // Layout lifetime, so a re-scan on every pathname change doesn't re-fade
  // chrome (hero banner, tab nav) that never left the page.
  const revealedRef = useRef(new WeakSet());

  // Keyed off the full path rather than the view: /program, /informasi and
  // /publikasi each redirect to a sibling URL with the SAME view key (e.g.
  // /program -> /program/mbg is 'program' both before and after), so a
  // [viewKey]-only dependency ran this scan once against the still-empty
  // redirect placeholder and never again once the real content landed —
  // that content just appeared at full opacity, no fade. Re-running per
  // pathname fixes that; the revealedRef filter keeps it from re-animating
  // content that was already shown.
  useGSAP(() => {
    const reveals = gsap.utils
      .toArray('[data-gsap="reveal"]')
      .filter((el) => !revealedRef.current.has(el));
    reveals.forEach((el, i) => {
      revealedRef.current.add(el);
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          delay: (i % 3) * 0.06,
        }
      );
    });

    const config = configs[viewKey];
    if (!config || config.sections.length === 0) return undefined;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      let matchedSection = null;

      config.sections.forEach(sec => {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPos) {
          matchedSection = sec.id;
        }
      });

      if (matchedSection) {
        setScrolledSection(matchedSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // On a tab view the drawer follows the URL; elsewhere it follows the scroll.
  const activeSection = tabSectionFromPathname(pathname) ?? scrolledSection;
  const showDrawer = viewKey && !VIEWS_WITHOUT_DRAWER.includes(viewKey);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollManager />

      {/* Primary Floating Navbar */}
      <Navbar />

      {/* Universal Left-Edge Hover Navigation Drawer — hidden on Beranda, Search, & Detail */}
      {showDrawer && <EdgeDrawer viewKey={viewKey} activeSection={activeSection} />}

      <main style={{ flexGrow: 1 }}>
        <Breadcrumbs viewKey={viewKey} pathname={pathname} />
        <Outlet />
      </main>

      <Footer />
      <DownloadToast />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<BerandaPage />} />

        <Route path="uksm" element={<UksmClusters />}>
          <Route index element={<Navigate to="profil" replace />} />
          <Route path="profil" element={<ProfilPage />} />
          <Route path="trias" element={<TriasPage />} />
          <Route path="stratifikasi" element={<StratifikasiPage />} />
        </Route>

        <Route path="program" element={<Navigate to={defaultTabPath('program')} replace />} />
        <Route path="program/:programSlug" element={<ProgramPage />} />

        <Route path="mitra" element={<MitraPage />} />

        <Route path="informasi" element={<Navigate to={defaultTabPath('informasi')} replace />} />
        <Route path="informasi/berita/:idOrSlug" element={<BeritaDetailView />} />
        <Route path="informasi/upt-bercerita/:idOrSlug" element={<UptBerceritaDetailView />} />
        <Route path="informasi/:submenuSlug/:itemSlug" element={<SubmenuDetailRoute />} />
        <Route path="informasi/:tabSlug" element={<InformasiPage />} />

        <Route path="publikasi" element={<Navigate to={defaultTabPath('publikasi')} replace />} />
        <Route path="publikasi/:tabSlug" element={<PublikasiPage />} />

        <Route path="kontak" element={<KontakPage />} />
        <Route path="search" element={<SearchView />} />

        <Route path="*" element={<NotFoundView />} />
      </Route>
    </Routes>
  );
}

// Routes mount only once the nav config settles, so tab slugs resolve against the real tabs.
function App() {
  return (
    <NavConfigProvider>
      <AppRoutes />
    </NavConfigProvider>
  );
}

export default App;
