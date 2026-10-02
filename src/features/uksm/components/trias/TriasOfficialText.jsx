import { TodoTag } from '@/components/ContentPlaceholder';
import { TRIAS_SOURCE } from '@/data/portalData';

const TEXT = 'm-0 text-[15px] leading-[1.75] text-ink';
// The last span of a row takes the remaining width, so long text wraps beside its marker.
const ROW = 'flex flex-wrap items-start gap-2.5 text-[15px] leading-[1.7] text-ink [&>span:last-child]:min-w-0 [&>span:last-child]:flex-1';

function LinkList({ links, color }) {
  return (
    <ul className="m-0 flex flex-col gap-2 p-0">
      {links.map((link) => (
        <li key={link.label} className={ROW}>
          <i className="fa-solid fa-arrow-up-right-from-square mt-1.5 text-[12px]" style={{ color }}></i>
          {link.url
            ? <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-bold" style={{ color }}>{link.label}</a>
            : <span>{link.label}</span>}
          {!link.url && import.meta.env.DEV && <TodoTag source={`${TRIAS_SOURCE} (URL belum ada)`} />}
        </li>
      ))}
    </ul>
  );
}

function EntryList({ entries, numbered, color }) {
  return (
    <ul className="m-0 flex flex-col gap-2 p-0">
      {entries.map((entry, idx) => (
        <li key={idx} className={ROW}>
          <span className="min-w-[22px] font-extrabold" style={{ color }}>{numbered ? `${idx + 1}.` : '•'}</span>
          <span>{entry}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The verbatim dev copy for one sub-program: description, then every
 * section (text, bullets, numbered steps, links) in its original order.
 *
 * @param {{ item: object, pillar: object }} props
 */
export default function TriasOfficialText({ item, pillar }) {
  return (
    <div className="mt-[18px] flex flex-col gap-5 border-t-[1.5px] border-line pt-[18px]">
      {item.description && <p className={TEXT}>{item.description}</p>}
      {item.sections.map((section) => (
        <div key={section.label} className="flex flex-col gap-2">
          <h4 className="text-[15px] font-extrabold" style={{ color: pillar.color }}>{section.label}</h4>
          {section.type === 'text' && <p className={TEXT}>{section.content}</p>}
          {section.type === 'links' && <LinkList links={section.content} color={pillar.color} />}
          {(section.type === 'bullets' || section.type === 'numbered') && (
            <EntryList entries={section.content} numbered={section.type === 'numbered'} color={pillar.color} />
          )}
        </div>
      ))}
    </div>
  );
}
