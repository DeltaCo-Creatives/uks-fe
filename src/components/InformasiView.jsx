import { pageNavigationConfigs } from '../data/portalData';
import BeritaPanel from './informasi/BeritaPanel';
import PraktikPanel from './informasi/PraktikPanel';
import UptBerceritaPanel from './informasi/UptBerceritaPanel';
import AgendaPanel from './informasi/AgendaPanel';
import AplikasiPanel from './informasi/AplikasiPanel';

const informasiTabs = pageNavigationConfigs.informasi.sections;

export default function InformasiView({ activeSection, onNavigateSection, onNavigateView }) {
  const infoPanels = {
    'sec-info-berita': () => <BeritaPanel onNavigateView={onNavigateView} />,
    'sec-info-praktik': PraktikPanel,
    'sec-info-upt': UptBerceritaPanel,
    'sec-info-agenda': AgendaPanel,
    'sec-info-aplikasi': AplikasiPanel
  };

  const activeId = infoPanels[activeSection] ? activeSection : informasiTabs[0].id;
  const Panel = infoPanels[activeId] || infoPanels['sec-info-berita'];

  return (
    <div className="container" style={{ padding: '24px 20px 80px' }}>
      {/* Subpage Hero Banner */}
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-newspaper"></i> Warta, Cerita Daerah &amp; Agenda UKS/M
        </span>
        <h1 className="subpage-hero-title">
          Pusat Informasi &amp; Cerita Daerah
        </h1>
        <p className="subpage-hero-desc">
          Rilis resmi kementerian, praktik baik inspiratif satuan pendidikan, kabar UPT BPMP/BGP di 38 provinsi, kalender kegiatan, dan direktori aplikasi kesehatan.
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
