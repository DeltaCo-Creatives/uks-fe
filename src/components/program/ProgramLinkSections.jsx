import ProgramLink from './ProgramLink';
import { linkKind } from '../../utils/linkKind';

/** Documents and official sites, grouped. Level variants (PAUD/SD/SMP/SMA) sit on one row. */
export function ResourcesSection({ section }) {
  return (
    <div className="prog-resources">
      {section.groups.map((group) => (
        <div key={group.title} className="prog-resource-group">
          <h4>{group.title}</h4>
          {group.variants ? (
            <>
              <span className="prog-variants-kind">
                <i className={linkKind(group.variants[0].url, group.variants[0].kind).icon} aria-hidden="true"></i>
                {linkKind(group.variants[0].url, group.variants[0].kind).label}, per jenjang
              </span>
              <ul className="prog-variants" aria-label={group.title}>
                {group.variants.map((variant) => (
                  <li key={variant.label}>
                    <ProgramLink url={variant.url} className="prog-variant">{variant.label}</ProgramLink>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="prog-resource-list">
              {group.items.map((item) => {
                const kind = linkKind(item.url, item.kind);
                return (
                  <li key={item.title}>
                    <ProgramLink url={item.url} className="prog-resource">
                      <span className="prog-resource-main">
                        <span className="prog-resource-icon" aria-hidden="true"><i className={kind.icon}></i></span>
                        <span className="prog-resource-text">
                          <strong>{item.title}</strong>
                          <span>{item.url && item.meta ? `${kind.label} · ${item.meta}` : item.meta || kind.label}</span>
                        </span>
                      </span>
                    </ProgramLink>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/** SAIH 2025: five competitions, each tied to a level. The deadline note says the edition is closed. */
export function CompetitionsSection({ section }) {
  return (
    <>
      <p className="prog-closed">
        <i className="fa-regular fa-calendar-xmark" aria-hidden="true"></i> {section.note}
      </p>
      <ul className="prog-competitions">
        {section.items.map((item) => (
          <li key={item.title}>
            <span className="prog-competition-level">{item.level}</span>
            <ProgramLink url={item.url} className="prog-competition">{item.title}</ProgramLink>
          </li>
        ))}
      </ul>
      <ProgramLink url={section.guide.url} className="prog-inline-link">{section.guide.title}</ProgramLink>
    </>
  );
}

/** Gala Kreasi Video: what it is, then one row per past edition with its page and guide. */
export function ArchiveSection({ section, onNavigate }) {
  return (
    <div className="prog-archive">
      <div>
        <p className="prog-archive-text">{section.text}</p>
        <dl className="prog-facts is-compact">
          <div>
            <dt>Peserta</dt>
            <dd>{section.audience}</dd>
          </div>
        </dl>
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
      <ul className="prog-editions">
        {section.editions.map((edition) => (
          <li key={edition.year}>
            <span className="prog-edition-year">{edition.year}</span>
            <span className="prog-edition-focus">{edition.focus}</span>
            <span className="prog-edition-links">
              <ProgramLink url={edition.page} className="prog-inline-link">Halaman lomba</ProgramLink>
              <ProgramLink url={edition.guide} className="prog-inline-link">Petunjuk pelaksanaan</ProgramLink>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
