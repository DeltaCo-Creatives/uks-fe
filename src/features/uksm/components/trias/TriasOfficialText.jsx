import { TodoTag } from '@/components/ContentPlaceholder';
import ProfilChart from '../profil/ProfilChart';

// Dev-only label for the TODO tags: where the original copy came from.
export const TRIAS_SOURCE = 'portal-uks.demo.or.id/trias-uks';

const TEXT = 'm-0 text-[15px] leading-[1.75] text-ink';
// The last span of a row takes the remaining width, so long text wraps beside its marker.
const ROW = 'flex flex-wrap items-start gap-2.5 text-[15px] leading-[1.7] text-ink [&>span:last-child]:min-w-0 [&>span:last-child]:flex-1';

function LinkList({ links, color }) {
  return (
    <ul className="m-0 flex flex-col gap-2 p-0">
      {links.map((link, idx) => (
        <li key={idx} className={ROW}>
          <i className="fa-solid fa-arrow-up-right-from-square mt-1.5 text-[12px]" style={{ color }}></i>
          {/* Only http(s) becomes a link: a javascript: or data: URL from the API shows as plain text. */}
          {/^https?:\/\//i.test(link.url)
            ? <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-bold" style={{ color }}>{link.label}</a>
            : <span>{link.label}</span>}
          {!link.url && import.meta.env.DEV && <TodoTag source={`${TRIAS_SOURCE} (URL belum ada)`} />}
        </li>
      ))}
    </ul>
  );
}

// In a numbered list, "a. ..." is a step of the entry above it (the seed flattens nested steps this way).
const SUB_STEP = /^[a-z]\. /;

function EntryList({ entries, numbered, color }) {
  return (
    <ul className="m-0 flex flex-col gap-2 p-0">
      {entries.map((entry, idx) => {
        // Indented under the entry above, no marker of its own, and it does not use up a number.
        // pl-8 is the marker's 22px plus the 10px gap, so the text lines up with the entry above.
        if (numbered && SUB_STEP.test(entry)) {
          return <li key={idx} className={`${ROW} pl-8`}><span>{entry}</span></li>;
        }
        const marker = numbered ? `${entries.slice(0, idx + 1).filter((text) => !SUB_STEP.test(text)).length}.` : '•';
        return (
          <li key={idx} className={ROW}>
            <span className="min-w-[22px] font-extrabold" style={{ color }}>{marker}</span>
            <span>{entry}</span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The verbatim dev copy for one sub-program: description, then every
 * section (text, bullets, numbered steps, links, image) in its original order.
 *
 * @param {{ item: object, pillar: object }} props
 */
export default function TriasOfficialText({ item, pillar }) {
  return (
    <div className="mt-[18px] flex flex-col gap-5 border-t-[1.5px] border-line pt-[18px]">
      {item.description && <p className={TEXT}>{item.description}</p>}
      {item.sections.map((section, idx) => (
        // Labels are editable and can repeat, so the position is the key.
        <div key={idx} className="flex flex-col gap-2">
          {/* An image's label is its caption, shown under the picture by ProfilChart. */}
          {section.type === 'image'
            ? <ProfilChart chart={{ title: section.label, ...section.content }} />
            : <h4 className="text-[15px] font-extrabold" style={{ color: pillar.color }}>{section.label}</h4>}
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
