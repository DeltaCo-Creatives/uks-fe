import { TodoTag } from '../ContentPlaceholder';
import { TRIAS_SOURCE } from '../../data/portalData';

const textStyle = { fontSize: '15px', lineHeight: 1.75, color: 'var(--text-primary)', margin: 0 };

function LinkList({ links, color }) {
  return (
    <ul className="trias-text-list">
      {links.map((link) => (
        <li key={link.label}>
          <i className="fa-solid fa-arrow-up-right-from-square" style={{ color, fontSize: '12px', marginTop: '6px' }}></i>
          {link.url
            ? <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color, fontWeight: 700 }}>{link.label}</a>
            : <span>{link.label}</span>}
          {!link.url && import.meta.env.DEV && <TodoTag source={`${TRIAS_SOURCE} (URL belum ada)`} />}
        </li>
      ))}
    </ul>
  );
}

function EntryList({ entries, numbered, color }) {
  return (
    <ul className="trias-text-list">
      {entries.map((entry, idx) => (
        <li key={idx}>
          <span className="trias-text-marker" style={{ color }}>{numbered ? `${idx + 1}.` : '•'}</span>
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
    <div className="trias-official-text">
      {item.description && <p style={textStyle}>{item.description}</p>}
      {item.sections.map((section) => (
        <div key={section.label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: pillar.color }}>{section.label}</h4>
          {section.type === 'text' && <p style={textStyle}>{section.content}</p>}
          {section.type === 'links' && <LinkList links={section.content} color={pillar.color} />}
          {(section.type === 'bullets' || section.type === 'numbered') && (
            <EntryList entries={section.content} numbered={section.type === 'numbered'} color={pillar.color} />
          )}
        </div>
      ))}
    </div>
  );
}
