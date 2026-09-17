import { profilGoal, profilTargets } from '../../../data/portalData';

/**
 * Tujuan is one long official sentence: shown at reading size in a white card,
 * then the same sentence as a three-step flow (means, goal, outcome) so its
 * logic reads at a glance. Sasaran is reference material on the tinted ground.
 */
export default function ProfilTujuanSasaran() {
  return (
    <section id="sec-profil-tujuan" className="section profil-section">
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Tujuan &amp; Sasaran</span>
          <h2 className="section-title">Untuk apa, dan untuk siapa</h2>
        </div>
      </div>

      <div className="profil-goal-grid">
        <div className="profil-goal" data-gsap="reveal">
          <div className="profil-goal-head">
            <span className="profil-goal-icon" aria-hidden="true"><i className="fa-solid fa-bullseye"></i></span>
            <h3 className="profil-block-title">Tujuan UKS/M</h3>
          </div>
          <p className="profil-goal-sentence">{profilGoal.sentence}</p>

          <h4 className="profil-mini-label">Dibaca per bagian</h4>
          <ol className="profil-goal-flow">
            {profilGoal.parts.map((part) => (
              <li key={part.id} className="profil-goal-step">
                <span className="profil-goal-step-icon" aria-hidden="true"><i className={part.icon}></i></span>
                <strong>{part.label}</strong>
                <p>{part.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div id="sec-profil-sasaran" className="profil-targets profil-section" data-gsap="reveal">
          <h3 className="profil-block-title">Sasaran utama</h3>
          <p className="profil-targets-intro">{profilTargets.intro}</p>
          <ul className="profil-target-list">
            {profilTargets.main.map((target) => (
              <li key={target.id}>
                <i className={target.icon} aria-hidden="true"></i>
                <span>{target.label}</span>
              </li>
            ))}
          </ul>

          <h4 className="profil-mini-label">Pemangku kepentingan</h4>
          <ul className="profil-inline-list">
            {profilTargets.stakeholders.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
