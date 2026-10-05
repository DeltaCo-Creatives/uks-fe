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
  ExampleSection,
  RichTextSection
} from './ProgramSections';
import { ResourcesSection } from './ProgramLinkSections';
import PrestasiSection from './PrestasiSection';
import FactList from './FactList';
import { LEAD, CREDIT_LINK, SOURCE_LINK } from '../styles';

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
  prestasi: PrestasiSection,
  richtext: RichTextSection
};

function ProgramFigure({ image }) {
  return (
    <figure className="m-0">
      <img
        className="block h-auto max-h-[520px] w-full rounded-card bg-card-alt object-contain max-[900px]:max-h-[420px]"
        src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
      <figcaption className="mt-2 text-[13px] leading-[1.5] text-ink-muted">
        {image.caption}{' '}
        {image.credit && <ProgramLink url={image.credit.url} className={CREDIT_LINK}>Sumber: {image.credit.label}</ProgramLink>}
      </figcaption>
    </figure>
  );
}

/**
 * One program: a header (what it is, who runs it, key facts, optional source
 * image), then its 2-3 content sections, then the sources it was curated from.
 */
const ProgramPanel = forwardRef(function ProgramPanel({ program, number }, ref) {
  const hasImage = Boolean(program.image);
  const facts = program.facts.length > 0 && <FactList facts={program.facts} />;

  return (
    <div
      ref={ref}
      id="prog-panel"
      role="tabpanel"
      aria-labelledby={`prog-tab-${program.id}`}
      tabIndex={0}
      className="flex flex-col gap-4 focus-visible:rounded-soft focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-ink"
    >
      {/* prog-block is the hook ProgramPage's switch tween looks for; it carries no CSS. */}
      <header
        className={`prog-block grid gap-9 rounded-panel bg-card p-8 shadow-raised max-[900px]:grid-cols-[minmax(0,1fr)] max-[900px]:gap-6 max-[600px]:p-5 ${hasImage ? 'grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]' : 'grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]'}`}
      >
        <div>
          <span className="font-display text-[15px] font-extrabold text-brand-deep" aria-hidden="true">{String(number).padStart(2, '0')}</span>
          <h2 className="mt-1.5 mb-2 text-[clamp(24px,2.8vw,32px)] leading-[1.2] font-extrabold">{program.title}</h2>
          <p className="mb-4 flex items-baseline gap-2 text-[14px] font-semibold text-ink-muted">
            <i className="fa-solid fa-building-columns text-brand" aria-hidden="true"></i> {program.agency}
          </p>
          <p className={LEAD}>{program.lead}</p>
          {hasImage && facts}
        </div>
        <div className="[&>dl]:mt-0">
          {hasImage ? <ProgramFigure image={program.image} /> : facts}
        </div>
      </header>

      {program.sections.map((section, idx) => {
        const Section = SECTION_COMPONENTS[section.type];
        return (
          <section key={section.id} className="prog-block mt-4 border-t-2 border-ink pt-7 pb-2" aria-labelledby={`prog-sec-${program.id}-${section.id}`}>
            <h3 id={`prog-sec-${program.id}-${section.id}`} className="mb-[18px] flex items-baseline gap-3 text-[clamp(20px,2.2vw,24px)] font-extrabold">
              <span className="text-[14px] font-extrabold text-brand-deep tabular-nums" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
              {section.title}
            </h3>
            <Section section={section} />
          </section>
        );
      })}

      {/* "!" beats the global unlayered footer rule (the site footer's dark bar), which also matches this element. */}
      {program.sources.length > 0 && (
        <footer className="prog-block mt-4! rounded-card! bg-card-alt! px-[22px]! py-[18px]!">
          <h3 className="mb-1 text-[13px] font-bold text-brand-deep">Sumber konten</h3>
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-0 p-0">
            {program.sources.map((source) => (
              <li key={source.label}>
                <ProgramLink url={source.url} className={SOURCE_LINK}>{source.label}</ProgramLink>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </div>
  );
});

export default ProgramPanel;
