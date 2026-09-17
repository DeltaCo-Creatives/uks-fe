import { profilPembina } from '../../../data/portalData';
import ProfilChartPlaceholder from './ProfilChartPlaceholder';

/**
 * Tim Pembina: the definition and the four government levels from the page
 * text, beside a slot for the official chart image.
 */
export default function ProfilPembina({ onShowPelaksana }) {
  return (
    <div className="profil-org-split">
      <div className="profil-org-block">
        <p className="profil-org-lead">{profilPembina.definition}</p>

        <h3 className="profil-mini-label">Dibentuk di setiap jenjang pemerintahan</h3>
        <ol className="profil-level-list">
          {profilPembina.levels.map((level) => (
            <li key={level}>{level}</li>
          ))}
        </ol>

        <button type="button" className="profil-text-link" onClick={onShowPelaksana}>
          Lihat tim yang bekerja di sekolah (Tim Pelaksana)
        </button>
      </div>

      <ProfilChartPlaceholder chart={profilPembina.chart} />
    </div>
  );
}
