import { Link } from 'react-router-dom';
import { profilManagementIntro, profilManagementComponents } from '../../../data/portalData';
import { pathForView } from '../../../routes';
import ProfilMonev from './ProfilMonev';

function ComponentItem({ component }) {
  return (
    <li className="profil-component" data-gsap="reveal">
      <span className="profil-component-num" aria-hidden="true">{String(component.number).padStart(2, '0')}</span>
      <div>
        <h3 className="profil-component-title">{component.title}</h3>
        <p className="profil-body">{component.text}</p>

        {component.facts.length > 0 && (
          <dl className="profil-component-facts">
            {component.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {component.link && (
          <Link
            className="profil-text-link"
            to={pathForView(component.link.view, component.link.section)}
          >
            {component.link.label}
          </Link>
        )}
      </div>
    </li>
  );
}

/**
 * Manajemen UKS/M. Components 1-4 carry equal weight in the source, so they
 * share one plain two-column list. Monitoring dan Evaluasi holds most of the
 * page's text and gets its own wide panel.
 */
export default function ProfilManajemen() {
  return (
    <section id="sec-profil-manajemen" className="section profil-section">
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Manajemen UKS/M</span>
          <h2 className="section-title">5 komponen tata kelola</h2>
          <p className="profil-section-lead">{profilManagementIntro}</p>
        </div>
      </div>

      <ol className="profil-component-list">
        {profilManagementComponents.map((component) => (
          <ComponentItem key={component.id} component={component} />
        ))}
      </ol>

      <ProfilMonev />
    </section>
  );
}
