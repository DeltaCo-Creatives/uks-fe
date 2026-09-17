import ProgramLink from './ProgramLink';

/** MBG: who receives it. Real illustrations from the portal carry the three groups. */
export function AudienceSection({ section }) {
  return (
    <>
      <ul className="prog-audience">
        {section.items.map((item) => (
          <li key={item.title}>
            <img src={item.image} alt="" loading="lazy" />
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <p className="prog-note">
        {section.note}{' '}
        <ProgramLink url={section.noteSource.url} className="prog-inline-link">{section.noteSource.label}</ProgramLink>
      </p>
    </>
  );
}

/** MBG: intended outcomes. A plain numbered list; they are goals, not metrics. */
export function OutcomesSection({ section }) {
  return (
    <ol className="prog-outcomes">
      {section.items.map((item, idx) => (
        <li key={item.title}>
          <span className="prog-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
          <div>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** CKG: checkup package per level. Real tabular data, so a real table; rows stack on phones. */
export function TableSection({ section }) {
  return (
    <>
      {section.intro && <p className="prog-intro">{section.intro}</p>}
      <table className="prog-table">
        <thead>
          <tr>
            {section.columns.map((col) => <th key={col} scope="col">{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row) => (
            <tr key={row.level}>
              <th scope="row">
                <span className="prog-table-level">{row.level}</span>
                <span className="prog-table-grades">{row.grades}</span>
              </th>
              <td>{row.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {section.note && <p className="prog-note">{section.note}</p>}
    </>
  );
}

/** CKG: the four timed steps. A timeline because the steps are ordered in time (H-7, H-2, H, after). */
export function TimelineSection({ section }) {
  return (
    <ol className="prog-timeline">
      {section.items.map((item) => (
        <li key={item.when}>
          <span className="prog-timeline-when">{item.when}</span>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** 7KAIH: the seven habits with the official illustrations; each links to its official page. */
export function HabitsSection({ section }) {
  return (
    <ol className="prog-habits">
      {section.items.map((item, idx) => (
        <li key={item.title}>
          <img src={item.image} alt="" loading="lazy" width="96" height="96" />
          <div>
            <span className="prog-num" aria-hidden="true">{idx + 1}</span>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
            <ProgramLink url={item.url} className="prog-inline-link">Baca di laman resmi</ProgramLink>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** 7KAIH: challenges on one side, what the movement builds on the other, and where it leads. */
export function ContrastSection({ section }) {
  return (
    <div className="prog-contrast">
      <div className="prog-contrast-col">
        <h4>{section.problem.title}</h4>
        <ul>
          {section.problem.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="prog-contrast-col is-answer">
        <h4>{section.answer.title}</h4>
        <ul>
          {section.answer.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="prog-contrast-outcome">
          <span>Capaian</span>
          <strong>{section.outcome}</strong>
        </p>
      </div>
    </div>
  );
}

/** ASRI: the four pillars. The acronym letter is the motif, since the program is named by it. */
export function PillarsSection({ section }) {
  return (
    <>
      <ol className="prog-pillars">
        {section.items.map((item) => (
          <li key={item.letter}>
            <span className="prog-pillar-letter" aria-hidden="true">{item.letter}</span>
            <div>
              <strong>{item.title}</strong>
              <span className="prog-pillar-sub">{item.subtitle}</span>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="prog-note">
        Rumusan pilar: <ProgramLink url={section.source.url} className="prog-inline-link">{section.source.label}</ProgramLink>
      </p>
    </>
  );
}

/** ASRI: one documented school practice, plus the internal link to where it lives in Trias UKS/M. */
export function ExampleSection({ section, onNavigate }) {
  return (
    <div className="prog-example">
      <p>{section.text}</p>
      <div className="prog-example-links">
        <ProgramLink url={section.source.url} className="prog-inline-link">{section.source.label}</ProgramLink>
        {section.related && (
          <button
            type="button"
            className="prog-text-btn"
            onClick={() => onNavigate(section.related.view, section.related.section)}
          >
            {section.related.label}
          </button>
        )}
      </div>
    </div>
  );
}
