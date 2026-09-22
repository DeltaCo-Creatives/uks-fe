import { Link } from 'react-router-dom';
import { profilTriasPillars, profilContinuity } from '../../../data/portalData';
import { pathForView } from '../../../routes';

function PillarCard({ pillar }) {
  return (
    <article className="profil-pillar" data-gsap="reveal">
      <div className="profil-pillar-head">
        <span className="profil-pillar-icon" aria-hidden="true"><i className={pillar.icon}></i></span>
        <span className="profil-num" aria-hidden="true">{String(pillar.number).padStart(2, '0')}</span>
      </div>
      <h3 className="profil-pillar-title">{pillar.title}</h3>
      <p className="profil-pillar-def">{pillar.definition}</p>

      {pillar.groups.map((group) => (
        <div key={group.label} className="profil-pillar-group">
          <h4 className="profil-mini-label">{group.label}</h4>
          <ul className="profil-item-list">
            {group.items.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                {item.note && <span>{item.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Link
        className="profil-text-link profil-pillar-link"
        to={pathForView('uksm-trias', pillar.triasSection)}
      >
        Rincian program di halaman Trias UKS/M
      </Link>
    </article>
  );
}

/**
 * Deskripsi Umum: the three Trias pillars sit on one row, joined by a Manajemen UKS/M
 * bar (the source diagram puts Manajemen at the centre of the three). Below it,
 * the page's own "keep it running" advice as a numbered list, not more cards.
 */
export default function ProfilDeskripsi({ onOpenOrgTab, onScrollTo }) {

  return (
    <section id="sec-profil-deskripsi" className="section profil-section" style={{ paddingTop: '10px' }}>
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Deskripsi Umum</span>
          <h2 className="section-title">UKS/M dijalankan lewat Trias UKS/M</h2>
        </div>
      </div>

      <div className="profil-trias">
        <div className="profil-pillar-row">
          {profilTriasPillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>

        <div className="profil-hub" data-gsap="reveal">
          <span className="profil-hub-icon" aria-hidden="true"><i className="fa-solid fa-gears"></i></span>
          <p>
            Di tengah ketiganya ada <strong>Manajemen UKS/M</strong>: tata kelola pelaksanaan Trias UKS/M,
            dari kebijakan sampai monitoring dan evaluasi.
          </p>
          <button type="button" className="btn-pill profil-hub-btn" onClick={() => onScrollTo('sec-profil-manajemen')}>
            Lihat 5 komponen manajemen
          </button>
        </div>
      </div>

      <div className="profil-continuity" data-gsap="reveal">
        <h3 className="profil-block-title">Supaya UKS/M berjalan setiap tahun</h3>
        <ol className="profil-continuity-list">
          {profilContinuity.map((step, idx) => (
            <li key={step.id}>
              <span className="profil-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
              <div>
                <p>{step.text}</p>
                {step.link && (
                  step.link.orgTab ? (
                    <button type="button" className="profil-text-link" onClick={() => onOpenOrgTab(step.link.orgTab)}>
                      {step.link.label}
                    </button>
                  ) : (
                    <Link className="profil-text-link" to={pathForView(step.link.view, step.link.section)}>
                      {step.link.label}
                    </Link>
                  )
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
