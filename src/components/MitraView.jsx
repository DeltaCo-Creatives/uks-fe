import { pageNavigationConfigs } from '../data/portalData';
import TentangPanel from './mitra/TentangPanel';
import AlurPanel from './mitra/AlurPanel';
import FormPanel from './mitra/FormPanel';
import KatalogPanel from './mitra/KatalogPanel';
import AktivitasPanel from './mitra/AktivitasPanel';
import DukunganPanel from './mitra/DukunganPanel';
import TestimoniPanel from './mitra/TestimoniPanel';

const mitraTabs = pageNavigationConfigs.mitra.sections;

const mitraPanels = {
  'sec-mitra-tentang': TentangPanel,
  'sec-mitra-alur': AlurPanel,
  'sec-mitra-form': FormPanel,
  'sec-mitra-katalog': KatalogPanel,
  'sec-mitra-aktivitas': AktivitasPanel,
  'sec-mitra-dukungan': DukunganPanel,
  'sec-mitra-testimoni': TestimoniPanel
};

export default function MitraView({ activeSection, onNavigateSection }) {
  // If activeSection isn't valid for this view, default to the first tab (Tentang)
  const activeId = mitraPanels[activeSection] ? activeSection : mitraTabs[0].id;
  const Panel = mitraPanels[activeId] || TentangPanel;

  return (
    <div className="container" style={{ padding: '24px 20px 80px' }}>
      {/* Subpage Hero Banner */}
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-handshake-angle"></i> Kemitraan Multipihak · Gotong Royong Nasional
        </span>
        <h1 className="subpage-hero-title">
          Kolaborasi Kemitraan UKS/M
        </h1>
        <p className="subpage-hero-desc">
          Membuka ruang sinergi bagi BUMN, sektor swasta melalui program CSR, organisasi profesi kesehatan, perguruan tinggi, LSM, dan lembaga multilateral dalam akselerasi pembiasaan 5 Sehat di 38 Provinsi.
        </p>
      </div>

      {/* LOBBY: pick a topic, the panel below shows it */}
      <div className="lobby-tabs" data-gsap="reveal">
        {mitraTabs.map((tab) => (
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
