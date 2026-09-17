import { profilPelaksana } from '../../../data/portalData';
import ProfilChartPlaceholder from './ProfilChartPlaceholder';

/**
 * Tim Pelaksana: what the team is for (fungsi, tugas) beside a slot for the
 * official chart image.
 */
export default function ProfilPelaksana({ onShowPembina }) {
  return (
    <div className="profil-org-split">
      <div className="profil-org-block">
        <p className="profil-org-lead">{profilPelaksana.definition}</p>

        <h3 className="profil-mini-label">Fungsi</h3>
        <p className="profil-body">{profilPelaksana.function}</p>

        <h3 className="profil-mini-label profil-spaced-label">Tugas</h3>
        <ol className="profil-duty-list">
          {profilPelaksana.duties.map((duty) => (
            <li key={duty}>{duty}</li>
          ))}
        </ol>

        <button type="button" className="profil-text-link" onClick={onShowPembina}>
          Lihat Tim Pembina dari pusat sampai kecamatan
        </button>
      </div>

      <ProfilChartPlaceholder chart={profilPelaksana.chart} />
    </div>
  );
}
