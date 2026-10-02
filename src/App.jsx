import { useRef, useState } from 'react';
import { Routes, Route, Navigate, Outlet, Link, useLocation } from 'react-router-dom';
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
import ProgramView from './components/ProgramView';
import MitraView from './components/MitraView';
import InformasiView from './components/InformasiView';
import PublikasiView from './components/PublikasiView';
import KontakView from './components/KontakView';
import SearchView from './components/SearchView';
import BeritaDetailView from './components/BeritaDetailView';
import NotFoundView from './components/NotFoundView';
import Footer from './components/Footer';

import { pageNavigationConfigs } from './data/portalData';
import UptBerceritaDetailView from './components/UptBerceritaDetailView';
import { useBeritaList } from './hooks/useBerita';
import { useUptStoriesList } from './hooks/usePublicLists';
import {
  defaultTabSlug,
  pathForView,
  tabSectionFromPathname,
  viewKeyFromPathname
} from './routes';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const VIEWS_WITHOUT_DRAWER = ['beranda', 'search', 'berita-detail', 'upt-detail'];

// Article-style detail pages: the Informasi tab they belong to and the list
// their title is looked up in.
const DETAIL_CRUMBS = {
  'berita-detail': { sectionId: 'sec-info-berita', label: 'Warta Terkini', useList: useBeritaList },
  'upt-detail': { sectionId: 'sec-info-upt', label: 'UPT Bercerita', useList: useUptStoriesList }
};

/** Trailing crumb: the article title, once the list resolves; nothing broken shows while it loads. */
function DetailTitleCrumb({ useList, slug }) {
  const { data: list } = useList();
  const article = slug ? (list || []).find((n) => n.slug === slug) : null;
  if (!article) return null;

  return (
    <>
      <span>/</span>
      <span style={{ fontWeight: 800, color: 'var(--text-primary)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {article.title}
      </span>
    </>
  );
}

function Breadcrumbs({ viewKey, pathname }) {
  if (!viewKey || viewKey === 'beranda') return null;

  const linkStyle = { color: 'var(--brand-primary)', fontWeight: 700 };
  const detailCrumb = DETAIL_CRUMBS[viewKey];
  const slug = detailCrumb ? decodeURIComponent(pathname.split('/')[3] || '') : null;

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
          <>
            <span>/</span>
            <Link to={pathForView('informasi', detailCrumb.sectionId)} style={linkStyle}>Informasi</Link>
            <span>/</span>
            <Link to={pathForView('informasi', detailCrumb.sectionId)} style={linkStyle}>{detailCrumb.label}</Link>
            <DetailTitleCrumb key={viewKey} useList={detailCrumb.useList} slug={slug} />
          </>
        ) : (
          <>
            <span>/</span>
            <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
              {pageNavigationConfigs[viewKey].title}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function Layout() {
  const { pathname } = useLocation();
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

    const config = pageNavigationConfigs[viewKey];
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
    </div>
  );
}

function App() {
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

        <Route path="program" element={<Navigate to={`/program/${defaultTabSlug('program')}`} replace />} />
        <Route path="program/:programSlug" element={<ProgramView />} />

        <Route path="mitra" element={<MitraView />} />

        <Route path="informasi" element={<Navigate to={`/informasi/${defaultTabSlug('informasi')}`} replace />} />
        <Route path="informasi/berita/:idOrSlug" element={<BeritaDetailView />} />
        <Route path="informasi/upt-bercerita/:idOrSlug" element={<UptBerceritaDetailView />} />
        <Route path="informasi/:tabSlug" element={<InformasiView />} />

        <Route path="publikasi" element={<Navigate to={`/publikasi/${defaultTabSlug('publikasi')}`} replace />} />
        <Route path="publikasi/:tabSlug" element={<PublikasiView />} />

        <Route path="kontak" element={<KontakView />} />
        <Route path="search" element={<SearchView />} />

        <Route path="*" element={<NotFoundView />} />
      </Route>
    </Routes>
  );
}

export default App;
