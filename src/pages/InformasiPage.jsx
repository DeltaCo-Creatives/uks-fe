import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { pageNavigationConfigs } from '@/data/portalData';
import { defaultTabSlug, pathForView, sectionIdFromSlug } from '@/routes';
import LobbyTabs from '@/components/shared/LobbyTabs';
import { BeritaPanel, PraktikPanel, UptBerceritaPanel, AgendaPanel, AplikasiPanel } from '@/features/informasi';

const informasiTabs = pageNavigationConfigs.informasi.sections;

const infoPanels = {
  'sec-info-berita': BeritaPanel,
  'sec-info-praktik': PraktikPanel,
  'sec-info-upt': UptBerceritaPanel,
  'sec-info-agenda': AgendaPanel,
  'sec-info-aplikasi': AplikasiPanel
};

export default function InformasiPage() {
  const { tabSlug } = useParams();
  const navigate = useNavigate();
  const activeId = sectionIdFromSlug('informasi', tabSlug);

  if (!activeId) return <Navigate to={`/informasi/${defaultTabSlug('informasi')}`} replace />;

  const Panel = infoPanels[activeId];

  // No horizontal padding: the tab and filter strips cancel exactly the container's own inset to reach
  // the screen edges, and extra padding here would knock that alignment out.
  return (
    <div className="container pt-6 pb-20 max-[768px]:pt-3 max-[768px]:pb-14">
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
        onSelect={(id) => navigate(pathForView('informasi', id))}
        label="Bagian informasi"
        pageNav
      />

      <div className="lobby-panel" data-gsap="reveal" key={activeId}>
        <Panel />
      </div>
    </div>
  );
}
