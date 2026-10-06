import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useNavConfig } from '@/hooks/useNavConfig';
import { TEMPLATE_PANELS } from '@/pages/templatePanels';
import { defaultTabPath, pathForView } from '@/routes';
import LobbyTabs from '@/components/shared/LobbyTabs';

export default function InformasiPage() {
  const { tabSlug } = useParams();
  const navigate = useNavigate();
  const informasiTabs = useNavConfig().informasi.sections;
  const section = informasiTabs.find((tab) => tab.slug === tabSlug);

  if (!section) return <Navigate to={defaultTabPath('informasi')} replace />;

  const activeId = section.id;
  const Panel = TEMPLATE_PANELS.informasi[section.template];

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
        <Panel title={section.label} submenuId={section.submenuId} />
      </div>
    </div>
  );
}
