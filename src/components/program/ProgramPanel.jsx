import { forwardRef } from 'react';
import ProgramLink from './ProgramLink';
import {
  AudienceSection,
  OutcomesSection,
  TableSection,
  TimelineSection,
  HabitsSection,
  ContrastSection,
  PillarsSection,
  ExampleSection
} from './ProgramSections';
import { ResourcesSection, CompetitionsSection, ArchiveSection } from './ProgramLinkSections';

const SECTION_COMPONENTS = {
  audience: AudienceSection,
  outcomes: OutcomesSection,
  table: TableSection,
  timeline: TimelineSection,
  habits: HabitsSection,
  contrast: ContrastSection,
  pillars: PillarsSection,
  example: ExampleSection,
  resources: ResourcesSection,
  competitions: CompetitionsSection,
  archive: ArchiveSection
};

function FactList({ facts }) {
  return (
    <dl className="prog-facts">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProgramFigure({ image }) {
  return (
    <figure className="prog-figure">
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
      <figcaption>
        {image.caption}{' '}
        <ProgramLink url={image.credit.url} className="prog-credit">Sumber: {image.credit.label}</ProgramLink>
      </figcaption>
    </figure>
  );
}

/**
 * One program: a header (what it is, who runs it, key facts, optional source
 * image), then its 2-3 content sections, then the sources it was curated from.
 */
const ProgramPanel = forwardRef(function ProgramPanel({ program, number, onNavigate }, ref) {
  const hasImage = Boolean(program.image);

  return (
    <div
      ref={ref}
      id="prog-panel"
      role="tabpanel"
      aria-labelledby={`prog-tab-${program.id}`}
      tabIndex={0}
      className="prog-panel"
    >
      <header className={`prog-head prog-block ${hasImage ? 'has-image' : ''}`}>
        <div className="prog-head-main">
          <span className="prog-head-num" aria-hidden="true">{String(number).padStart(2, '0')}</span>
          <h2 className="prog-title">{program.title}</h2>
          <p className="prog-agency">
            <i className="fa-solid fa-building-columns" aria-hidden="true"></i> {program.agency}
          </p>
          <p className="prog-lead">{program.lead}</p>
          {hasImage && <FactList facts={program.facts} />}
        </div>
        <div className="prog-head-aside">
          {hasImage ? <ProgramFigure image={program.image} /> : <FactList facts={program.facts} />}
        </div>
      </header>

      {program.sections.map((section, idx) => {
        const Section = SECTION_COMPONENTS[section.type];
        return (
          <section key={section.id} className={`prog-section prog-block prog-section-${section.type}`} aria-labelledby={`prog-sec-${program.id}-${section.id}`}>
            <h3 id={`prog-sec-${program.id}-${section.id}`} className="prog-section-title">
              <span className="prog-section-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
              {section.title}
            </h3>
            <Section section={section} onNavigate={onNavigate} />
          </section>
        );
      })}

      <footer className="prog-sources prog-block">
        <h3 className="prog-sources-title">Sumber konten</h3>
        <ul>
          {program.sources.map((source) => (
            <li key={source.url}>
              <ProgramLink url={source.url} className="prog-source-link">{source.label}</ProgramLink>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
});

export default ProgramPanel;
