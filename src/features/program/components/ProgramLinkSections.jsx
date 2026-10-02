import ProgramLink from './ProgramLink';
import { linkKind } from '@/utils/linkKind';
import { INLINE_LINK, VARIANT_LINK, RESOURCE_LINK, COMPETITION_LINK } from '../styles';

/** Documents and official sites, grouped. Level variants (PAUD/SD/SMP/SMA) sit on one row. */
export function ResourcesSection({ section }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-8 gap-y-5">
      {section.groups.map((group) => (
        <div key={group.title}>
          <h4 className="mb-1.5 text-[14px] font-bold text-brand-deep">{group.title}</h4>
          {group.variants ? (
            <>
              {/* Names the file kind shared by every level variant below, once, instead of per chip. */}
              <span className="mt-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-ink-muted">
                <i className={`${linkKind(group.variants[0].url, group.variants[0].kind).icon} text-brand`} aria-hidden="true"></i>
                {linkKind(group.variants[0].url, group.variants[0].kind).label}, per jenjang
              </span>
              <ul className="mt-2 mb-0 flex list-none flex-wrap gap-2 p-0" aria-label={group.title}>
                {group.variants.map((variant) => (
                  <li key={variant.label}>
                    <ProgramLink url={variant.url} className={VARIANT_LINK}>{variant.label}</ProgramLink>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="m-0 list-none border-b border-rule p-0">
              {group.items.map((item) => {
                const kind = linkKind(item.url, item.kind);
                return (
                  <li key={item.title} className="border-t border-rule">
                    <ProgramLink url={item.url} className={RESOURCE_LINK}>
                      {/* Groups the kind icon with the title, so space-between only pushes the trailing new-tab arrow to the edge. */}
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span className="grid size-8 flex-none place-items-center rounded-soft bg-brand-light text-[13px] text-brand" aria-hidden="true"><i className={kind.icon}></i></span>
                        <span className="flex min-w-0 flex-col gap-0.5">
                          <strong className="text-[15px] leading-[1.35]">{item.title}</strong>
                          <span className="text-[13px] text-ink-muted">{item.url && item.meta ? `${kind.label} · ${item.meta}` : item.meta || kind.label}</span>
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
 * A competition's list of lomba, each tied to a level, plus a deadline note and
 * a guide link. Reused by PrestasiSection for each competition's Mekanisme face.
 * `section.open` swaps the deadline icon, so a lomba still taking entries is not
 * marked with the closed-calendar glyph.
 */
export function CompetitionsSection({ section }) {
  return (
    <>
      <p className="mb-3.5 flex items-baseline gap-2.5 text-[14px] leading-[1.6] text-ink">
        <i className={`fa-regular ${section.open ? 'fa-calendar-check' : 'fa-calendar-xmark'} text-brand`} aria-hidden="true"></i> {section.note}
      </p>
      <ul className="mt-0 mb-2 list-none border-b border-rule p-0">
        {section.items.map((item) => (
          <li
            key={item.title}
            className="grid min-h-14 grid-cols-[140px_minmax(0,1fr)] items-center gap-3 border-t border-rule max-[600px]:grid-cols-[minmax(0,1fr)] max-[600px]:gap-0.5 max-[600px]:py-2"
          >
            <span className="text-[13px] font-bold text-brand-deep">{item.level}</span>
            <ProgramLink url={item.url} className={COMPETITION_LINK}>{item.title}</ProgramLink>
          </li>
        ))}
      </ul>
      {section.guide && <ProgramLink url={section.guide.url} className={INLINE_LINK}>{section.guide.title}</ProgramLink>}
    </>
  );
}
