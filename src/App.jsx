import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import EdgeDrawer from './components/EdgeDrawer';
import BerandaView from './components/BerandaView';
import UksmClusters from './components/UksmClusters';
import ProgramView from './components/ProgramView';
import MitraView from './components/MitraView';
import InformasiView from './components/InformasiView';
import PublikasiView from './components/PublikasiView';
import KontakView from './components/KontakView';
import Footer from './components/Footer';

import { pageNavigationConfigs } from './data/portalData';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const [currentView, setCurrentView] = useState('beranda');
  const [activeSection, setActiveSection] = useState(null);
  const mainRef = useRef(null);

  // View Navigation Handler
  const handleNavigateView = (viewKey, targetSectionId = null) => {
    // Backwards compatibility alias for 'uksm'
    if (viewKey === 'uksm') {
      viewKey = 'uksm-profil';
    }

    setCurrentView(viewKey);
    setActiveSection(targetSectionId);

    // Scroll to section or top
    setTimeout(() => {
      if (targetSectionId) {
        const el = document.getElementById(targetSectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 60);
  };

  // Section Navigation Handler
  const handleNavigateSection = (targetSectionId) => {
    setActiveSection(targetSectionId);
    const el = document.getElementById(targetSectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // GSAP Entrance and ScrollSpy
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

    // ScrollSpy for Active Section
    const handleScroll = () => {
      const config = pageNavigationConfigs[currentView];
      if (!config) return;

      const scrollPos = window.scrollY + 180;
      let matchedSection = null;

      config.sections.forEach(sec => {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPos) {
          matchedSection = sec.id;
        }
      });

      if (matchedSection) {
        setActiveSection(matchedSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const currentConfig = pageNavigationConfigs[currentView] || pageNavigationConfigs['beranda'];

  return (
    <div ref={mainRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Primary Floating Navbar */}
      <Navbar currentView={currentView} onNavigateView={handleNavigateView} />

      {/* Universal Left-Edge Hover Navigation Drawer — hidden on Beranda,
          which has no long anatomy to jump around (the nav dropdowns cover
          it); every subpage still gets it for in-page section navigation. */}
      {currentView !== 'beranda' && (
        <EdgeDrawer
          currentView={currentView}
          activeSection={activeSection}
          onNavigateSection={handleNavigateSection}
        />
      )}

      <main style={{ flexGrow: 1 }}>
        {/* Breadcrumb strip for Sub-Pages */}
        {currentView !== 'beranda' && (
          <div className="container" style={{ paddingTop: '20px', paddingBottom: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: 'var(--text-secondary)'
            }}>
              <a
                href="#beranda"
                onClick={(e) => { e.preventDefault(); handleNavigateView('beranda'); }}
                style={{ color: 'var(--brand-primary)', fontWeight: 700 }}
              >
                Beranda
              </a>
              <span>/</span>
              <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{currentConfig.title}</span>
            </div>
          </div>
        )}

        {/* View Switcher */}
        {currentView === 'beranda' && (
          <BerandaView onNavigateView={handleNavigateView} />
        )}

        {['uksm-profil', 'uksm-trias', 'uksm-gss'].includes(currentView) && (
          <UksmClusters activeSubpage={currentView} onChangeView={handleNavigateView} />
        )}

        {currentView === 'program' && (
          <ProgramView activeSection={activeSection} onNavigateSection={handleNavigateSection} />
        )}

        {currentView === 'mitra' && (
          <MitraView activeSection={activeSection} onNavigateSection={handleNavigateSection} />
        )}

        {currentView === 'informasi' && (
          <InformasiView activeSection={activeSection} onNavigateSection={handleNavigateSection} />
        )}

        {currentView === 'publikasi' && (
          <PublikasiView activeSection={activeSection} onNavigateSection={handleNavigateSection} />
        )}

        {currentView === 'kontak' && (
          <KontakView />
        )}
      </main>

      <Footer onNavigateView={handleNavigateView} />
    </div>
  );
}

export default App;
