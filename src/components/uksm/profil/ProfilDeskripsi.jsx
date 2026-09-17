import { profilTriasPillars, profilContinuity } from '../../../data/portalData';

function PillarCard({ pillar, onNavigate }) {
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

      <button
        type="button"
        className="profil-text-link profil-pillar-link"
        onClick={() => onNavigate('uksm-trias', pillar.triasSection)}
      >
        Rincian program di halaman Trias UKS/M
      </button>
    </article>
  );
}

/**
 * Deskripsi Umum: the three Trias pillars sit on one row, joined by a Manajemen UKS/M
 * bar (the source diagram puts Manajemen at the centre of the three). Below it,
 * the page's own "keep it running" advice as a numbered list, not more cards.
 */
export default function ProfilDeskripsi({ onNavigate, onOpenOrgTab, onScrollTo }) {
  const handleContinuityLink = (link) => {
    if (link.orgTab) onOpenOrgTab(link.orgTab);
    else onNavigate(link.view, link.section);
  };

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
            <PillarCard key={pillar.id} pillar={pillar} onNavigate={onNavigate} />
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
                  <button type="button" className="profil-text-link" onClick={() => handleContinuityLink(step.link)}>
                    {step.link.label}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
