import { profilPembina } from '@/data/portalData';
import ProfilChartPlaceholder from './ProfilChartPlaceholder';
import { MINI_LABEL, TEXT_LINK, SPLIT, ORG_LEAD, ORDERED_LIST, ORDERED_ITEM } from './styles';

/**
 * Tim Pembina: the definition and the four government levels from the page
 * text, beside a slot for the official chart image.
 */
export default function ProfilPembina({ onShowPelaksana }) {
  return (
    <div className={SPLIT}>
      <div className="profil-org-block">
        <p className={ORG_LEAD}>{profilPembina.definition}</p>

        <h3 className={MINI_LABEL}>Dibentuk di setiap jenjang pemerintahan</h3>
        <ol className={ORDERED_LIST}>
          {profilPembina.levels.map((level) => (
            <li key={level} className={ORDERED_ITEM}>{level}</li>
          ))}
        </ol>

        <button type="button" className={TEXT_LINK} onClick={onShowPelaksana}>
          Lihat tim yang bekerja di sekolah (Tim Pelaksana)
        </button>
      </div>

      <ProfilChartPlaceholder chart={profilPembina.chart} />
    </div>
  );
}
