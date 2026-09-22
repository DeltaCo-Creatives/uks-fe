import { useState } from 'react';
import { Routes, Route, Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import EdgeDrawer from './components/EdgeDrawer';
import ScrollManager from './components/ScrollManager';
import BerandaView from './components/BerandaView';
import UksmClusters from './components/UksmClusters';
import ProfilPage from './components/uksm/profil/ProfilPage';
import TriasPage from './components/uksm/TriasPage';
import StratifikasiPage from './components/uksm/StratifikasiPage';
import ProgramView from './components/ProgramView';
import MitraView from './components/MitraView';
import InformasiView from './components/InformasiView';
import PublikasiView from './components/PublikasiView';
import KontakView from './components/KontakView';
import SearchView from './components/SearchView';
import BeritaDetailView from './components/BeritaDetailView';
import NotFoundView from './components/NotFoundView';
import Footer from './components/Footer';

import { pageNavigationConfigs, realNewsList } from './data/portalData';
import {
  defaultTabSlug,
  pathForView,
  tabSectionFromPathname,
  viewKeyFromPathname
} from './routes';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const VIEWS_WITHOUT_DRAWER = ['beranda', 'search', 'berita-detail'];

function Breadcrumbs({ viewKey, pathname }) {
  if (!viewKey || viewKey === 'beranda') return null;

  const linkStyle = { color: 'var(--brand-primary)', fontWeight: 700 };
  const articleKey = decodeURIComponent(pathname.split('/')[3] || '');
  const article =
    viewKey === 'berita-detail'
      ? realNewsList.find((n) => n.id === Number(articleKey) || n.slug === articleKey) || realNewsList[0]
      : null;

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

        {article ? (
          <>
            <span>/</span>
            <Link to={pathForView('informasi', 'sec-info-berita')} style={linkStyle}>Informasi</Link>
            <span>/</span>
            <Link to={pathForView('informasi', 'sec-info-berita')} style={linkStyle}>Warta Terkini</Link>
            <span>/</span>
            <span style={{ fontWeight: 800, color: 'var(--text-primary)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {article.title}
            </span>
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

  // Keyed off the view rather than the full path: switching tabs inside one
  // view swaps a panel without remounting the page around it, so re-running
  // this would re-fade the banner that never went away.
  useGSAP(() => {
    const reveals = gsap.utils.toArray('[data-gsap="reveal"]');
    reveals.forEach((el, i) => {
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
  }, [viewKey]);

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
        <Route index element={<BerandaView />} />

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
