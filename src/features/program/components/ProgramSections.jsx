import { Link } from 'react-router-dom';
import ProgramLink from './ProgramLink';
import { pathForView } from '@/routes';
import { NUM, NOTE, INLINE_LINK, TEXT_BUTTON } from '../styles';

/* Timeline: ordered in time, so a line runs through the markers (a dot per step). Stacked on
   phones, the line runs down the left edge instead and stops at the last step. */
const TIMELINE_STEP =
  "relative pt-7 before:absolute before:top-1.5 before:-right-5 before:left-0 before:h-0.5 before:bg-brand-light before:content-[''] last:before:right-0 " +
  "after:absolute after:top-0 after:left-0 after:size-3.5 after:rounded-[50%] after:border-[3px] after:border-brand after:bg-app after:content-[''] " +
  'max-[1100px]:before:right-0 ' +
  'max-[600px]:pt-0 max-[600px]:pb-[22px] max-[600px]:pl-7 max-[600px]:before:top-3.5 max-[600px]:before:right-auto max-[600px]:before:bottom-0 max-[600px]:before:left-1.5 max-[600px]:before:h-auto max-[600px]:before:w-0.5 max-[600px]:last:before:right-auto max-[600px]:last:before:hidden max-[600px]:after:top-1';

/** MBG: who receives it. Real illustrations from the portal carry the three groups. */
export function AudienceSection({ section }) {
  return (
    <>
      <ul className="m-0 grid list-none grid-cols-3 gap-4 p-0 max-[600px]:grid-cols-1">
        {section.items.map((item) => (
          <li key={item.title} className="flex flex-col gap-2.5">
            <img
              className="aspect-[4/3] w-full rounded-card bg-card-alt object-cover object-[center_30%] max-[600px]:aspect-[16/10]"
              src={item.image}
              alt=""
              loading="lazy"
            />
            <span className="text-[16px] font-extrabold">{item.title}</span>
          </li>
        ))}
      </ul>
      <p className={NOTE}>
        {section.note}{' '}
        <ProgramLink url={section.noteSource.url} className={INLINE_LINK}>{section.noteSource.label}</ProgramLink>
      </p>
    </>
  );
}

/** MBG: intended outcomes. A plain numbered list; they are goals, not metrics. */
export function OutcomesSection({ section }) {
  return (
    <ol className="m-0 grid list-none grid-cols-2 gap-x-8 gap-y-0 p-0 max-[900px]:grid-cols-1">
      {section.items.map((item, idx) => (
        <li key={item.title} className="grid grid-cols-[36px_minmax(0,1fr)] gap-2 border-b border-rule py-3.5">
          <span className={`${NUM} text-[15px]`} aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
          <div>
            <strong className="mb-1 block text-[15px]">{item.title}</strong>
            <p className="text-[14px] leading-[1.6] text-ink-muted">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** CKG: checkup package per level. Real tabular data, so a real table; rows stack on phones. */
export function TableSection({ section }) {
  const cell = 'border-t border-rule px-[18px] py-4 text-left align-top max-[600px]:block max-[600px]:w-full';
  return (
    <>
      {section.intro && <p className="mb-4 max-w-[80ch] text-[15px] leading-[1.65] text-ink">{section.intro}</p>}
      <table className="w-full border-collapse overflow-hidden rounded-card bg-card max-[600px]:block">
        <thead className="max-[600px]:hidden">
          <tr className="max-[600px]:block max-[600px]:w-full">
            {section.columns.map((col) => (
              <th key={col} scope="col" className="bg-ink px-[18px] py-3 text-left text-[13px] font-bold text-white">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="max-[600px]:block max-[600px]:w-full">
          {section.rows.map((row) => (
            <tr key={row.level} className="max-[600px]:block max-[600px]:w-full">
              <th scope="row" className={`${cell} w-[230px] max-[600px]:pb-1`}>
                <span className="block text-[15px] font-extrabold">{row.level}</span>
                <span className="mt-0.5 block text-[13px] font-semibold text-brand-deep">{row.grades}</span>
              </th>
              <td className={`${cell} text-[14px] leading-[1.65] max-[600px]:border-t-0 max-[600px]:pt-0`}>{row.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {section.note && (
        // A caveat about the table, not another paragraph of description.
        <p className="mt-3 border-t border-rule pt-3 text-[13px] leading-[1.65] text-ink-muted">
          <strong className="block text-[12px] text-brand-deep">Catatan</strong>
          {section.note}
        </p>
      )}
    </>
  );
}

/** CKG: the four timed steps. A timeline because the steps are ordered in time (H-7, H-2, H, after). */
export function TimelineSection({ section }) {
  return (
    <ol className="m-0 grid list-none grid-cols-4 gap-5 p-0 max-[1100px]:grid-cols-2 max-[1100px]:gap-y-7 max-[600px]:grid-cols-1 max-[600px]:gap-0">
      {section.items.map((item) => (
        <li key={item.when} className={TIMELINE_STEP}>
          <span className="mb-0.5 block font-display text-[18px] font-extrabold text-brand-deep">{item.when}</span>
          <strong className="mb-1.5 block text-[15px]">{item.title}</strong>
          <p className="text-[14px] leading-[1.6] text-ink-muted">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** 7KAIH: the seven habits with the official illustrations; each links to its official page. */
export function HabitsSection({ section }) {
  return (
    <ol className="m-0 grid list-none grid-cols-2 gap-x-7 gap-y-3 p-0 max-[900px]:grid-cols-1">
      {section.items.map((item, idx) => (
        <li
          key={item.title}
          className="grid grid-cols-[96px_minmax(0,1fr)] items-start gap-4 border-b border-rule py-3 max-[600px]:grid-cols-[72px_minmax(0,1fr)]"
        >
          <img className="size-24 max-[600px]:size-[72px]" src={item.image} alt="" loading="lazy" width="96" height="96" />
          <div>
            <span className={`${NUM} mr-2 text-[14px]`} aria-hidden="true">{idx + 1}</span>
            <strong className="text-[16px]">{item.title}</strong>
            <p className="mt-1 mb-0 text-[14px] leading-[1.6] text-ink-muted">{item.text}</p>
            <ProgramLink url={item.url} className={INLINE_LINK}>Baca di laman resmi</ProgramLink>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** 7KAIH: the capaian leads, then the two columns explain the challenge it
    answers and what the movement builds to get there. */
export function ContrastSection({ section }) {
  const column = 'rounded-card p-6';
  const list = 'm-0 grid list-disc gap-2 pl-[18px]';
  const item = 'text-[14px] leading-[1.55] marker:text-brand';
  return (
    <>
      {/* What both columns build to, so it leads and spans them: the one statement of the section. */}
      <div className="mb-4 flex flex-col items-center gap-2 rounded-card bg-brand-light px-[clamp(18px,3vw,28px)] py-[clamp(22px,4vw,32px)] text-center">
        <span className="text-[13px] font-bold text-brand-deep">Capaian</span>
        <strong className="font-display text-[clamp(22px,3vw,32px)] leading-[1.25] font-extrabold">{section.outcome}</strong>
      </div>
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-4 max-[900px]:grid-cols-[minmax(0,1fr)]">
        <div className={`${column} bg-card-alt`}>
          <h4 className="mb-3 text-[15px] font-extrabold">{section.problem.title}</h4>
          <ul className={list}>
            {section.problem.items.map((text) => <li key={text} className={item}>{text}</li>)}
          </ul>
        </div>
        <div className={`${column} bg-card`}>
          <h4 className="mb-3 text-[15px] font-extrabold">{section.answer.title}</h4>
          <ul className={list}>
            {section.answer.items.map((text) => <li key={text} className={item}>{text}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
}

/** ASRI: the four pillars. The acronym letter is the motif, since the program is named by it. */
export function PillarsSection({ section }) {
  return (
    <>
      <ol className="m-0 grid list-none grid-cols-2 gap-4 p-0 max-[600px]:grid-cols-1">
        {section.items.map((item) => (
          <li
            key={item.letter}
            className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 rounded-card bg-card p-[22px] max-[600px]:grid-cols-[48px_minmax(0,1fr)] max-[600px]:p-[18px]"
          >
            <span className="font-display text-[56px] leading-[0.9] font-extrabold text-brand max-[600px]:text-[44px]" aria-hidden="true">{item.letter}</span>
            <div>
              <strong className="block text-[18px]">{item.title}</strong>
              <span className="mt-0.5 mb-2 block text-[13px] font-bold text-brand-deep">{item.subtitle}</span>
              <p className="text-[14px] leading-[1.65]">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className={NOTE}>
        Rumusan pilar: <ProgramLink url={section.source.url} className={INLINE_LINK}>{section.source.label}</ProgramLink>
      </p>
    </>
  );
}

/** ASRI: one documented school practice, plus the internal link to where it lives in Trias UKS/M. */
export function ExampleSection({ section }) {
  return (
    <div>
      <p className="max-w-[72ch] text-[15px] leading-[1.7]">{section.text}</p>
      <div className="mt-1.5 flex flex-wrap gap-x-7 gap-y-0">
        <ProgramLink url={section.source.url} className={INLINE_LINK}>{section.source.label}</ProgramLink>
        {section.related && (
          <Link
            className={TEXT_BUTTON}
            to={pathForView(section.related.view, section.related.section)}
          >
            {section.related.label}
          </Link>
        )}
      </div>
    </div>
  );
}
