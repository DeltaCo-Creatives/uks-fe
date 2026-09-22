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

/**
 * A competition's list of lomba, each tied to a level, plus a status note and
 * a guide link. Reused by PrestasiSection for each competition's Mekanisme face.
 */
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
      {section.guide && <ProgramLink url={section.guide.url} className="prog-inline-link">{section.guide.title}</ProgramLink>}
    </>
  );
}
