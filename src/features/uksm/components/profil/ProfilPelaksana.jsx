import { profilPelaksana } from '@/data/portalData';
import ProfilChart from './ProfilChart';
import { BODY, MINI_LABEL, TEXT_LINK, SPLIT, ORG_LEAD, ORDERED_LIST, ORDERED_ITEM } from './styles';

/**
 * Tim Pelaksana: what the team is for (fungsi, tugas) beside a slot for the
 * official chart image.
 */
export default function ProfilPelaksana({ onShowPembina }) {
  return (
    <div className={SPLIT}>
      <div className="profil-org-block">
        <p className={ORG_LEAD}>{profilPelaksana.definition}</p>

        <h3 className={MINI_LABEL}>Fungsi</h3>
        <p className={BODY}>{profilPelaksana.function}</p>

        <h3 className={`${MINI_LABEL} mt-[18px]`}>Tugas</h3>
        <ol className={ORDERED_LIST}>
          {profilPelaksana.duties.map((duty) => (
            <li key={duty} className={ORDERED_ITEM}>{duty}</li>
          ))}
        </ol>

        <button type="button" className={TEXT_LINK} onClick={onShowPembina}>
          Lihat Tim Pembina dari pusat sampai kecamatan
        </button>
      </div>

      <ProfilChart chart={profilPelaksana.chart} />
    </div>
  );
}
