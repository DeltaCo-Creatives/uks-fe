import { pageNavigationConfigs } from '../data/portalData';
import LobbyTabs from './shared/LobbyTabs';
import BeritaPanel from './informasi/BeritaPanel';
import PraktikPanel from './informasi/PraktikPanel';
import UptBerceritaPanel from './informasi/UptBerceritaPanel';
import AgendaPanel from './informasi/AgendaPanel';
import AplikasiPanel from './informasi/AplikasiPanel';
import './informasi/informasi.css';

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
    <div className="container informasi-page">
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

      <LobbyTabs
        tabs={informasiTabs}
        activeId={activeId}
        onSelect={onNavigateSection}
        label="Bagian informasi"
      />

      <div className="lobby-panel" data-gsap="reveal" key={activeId}>
        <Panel />
      </div>
    </div>
  );
}
