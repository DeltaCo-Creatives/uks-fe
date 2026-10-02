import { Link } from 'react-router-dom';
import { profilManagementIntro, profilManagementComponents } from '@/data/portalData';
import { pathForView } from '@/routes';
import ProfilMonev from './ProfilMonev';
import { SECTION, COMPONENT_NUM, BODY, TEXT_LINK } from './styles';

function ComponentItem({ component }) {
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-t border-rule py-6" data-gsap="reveal">
      <span className={COMPONENT_NUM} aria-hidden="true">{String(component.number).padStart(2, '0')}</span>
      <div>
        <h3 className="mb-2 text-[19px] font-extrabold">{component.title}</h3>
        <p className={BODY}>{component.text}</p>

        {component.facts.length > 0 && (
          <dl className="mt-3.5 mb-0 border-b border-rule">
            {component.facts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[150px_minmax(0,1fr)] gap-3 border-t border-rule py-2.5 text-[14px] leading-[1.5] max-[600px]:grid-cols-[minmax(0,1fr)] max-[600px]:gap-0.5"
              >
                <dt className="font-bold text-brand-deep">{fact.label}</dt>
                <dd className="m-0 text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {component.link && (
          <Link
            className={`${TEXT_LINK} mt-1.5`}
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
    <section id="sec-profil-manajemen" className={SECTION}>
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Manajemen UKS/M</span>
          <h2 className="section-title">5 komponen tata kelola</h2>
          <p className="mt-3 max-w-[68ch] text-[16px] leading-[1.65] text-ink-muted">{profilManagementIntro}</p>
        </div>
      </div>

      <ol className="m-0 mb-8 grid list-none grid-cols-2 gap-x-10 gap-y-0 p-0 max-[600px]:grid-cols-1">
        {profilManagementComponents.map((component) => (
          <ComponentItem key={component.id} component={component} />
        ))}
      </ol>

      <ProfilMonev />
    </section>
  );
}
