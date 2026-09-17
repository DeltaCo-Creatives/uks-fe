import ContentPlaceholder, { TodoTag } from '../ContentPlaceholder';
import { TRIAS_SOURCE } from '../../data/portalData';

const SECTION_ICONS = {
  Waktu: 'fa-regular fa-clock',
  Tempat: 'fa-solid fa-location-dot',
  Pelaksana: 'fa-solid fa-user-group',
  Sasaran: 'fa-solid fa-bullseye',
  Kegiatan: 'fa-solid fa-list-check',
  Sarana: 'fa-solid fa-toolbox',
  'Langkah-langkah': 'fa-solid fa-shoe-prints',
  Tugas: 'fa-solid fa-clipboard-list',
  'Tautan Penting': 'fa-solid fa-link'
};

const cardStyle = {
  background: '#FFFFFF',
  borderRadius: 'var(--radius-lg)',
  padding: '22px',
  boxShadow: 'var(--shadow-card)'
};

/** Shared label row: tinted icon + section name. */
function SectionLabel({ label, pillar }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
      <span style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: pillar.bgBadge,
        color: pillar.color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        flexShrink: 0
      }}>
        <i className={SECTION_ICONS[label] || 'fa-solid fa-circle-info'}></i>
      </span>
      <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{label}</h4>
    </div>
  );
}

function ListSection({ section, pillar }) {
  if (section.type === 'links') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {section.content.map((link) => (
          <div key={link.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--text-primary)' }}>
            <i className="fa-solid fa-arrow-up-right-from-square" style={{ color: pillar.color, fontSize: '11px' }}></i>
            {link.url
              ? <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: pillar.color, fontWeight: 700 }}>{link.label}</a>
              : <span>{link.label}</span>}
            {!link.url && import.meta.env.DEV && <TodoTag source={`${TRIAS_SOURCE} (URL belum ada)`} />}
          </div>
        ))}
      </div>
    );
  }

  const numbered = section.type === 'numbered';
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', margin: 0, padding: 0 }}>
      {section.content.map((entry, idx) => (
        <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
          {numbered ? (
            <span style={{
              minWidth: '22px',
              height: '22px',
              borderRadius: '50%',
              background: pillar.color,
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '1px'
            }}>
              {idx + 1}
            </span>
          ) : (
            <i className="fa-solid fa-circle-check" style={{ color: pillar.color, marginTop: '4px', fontSize: '12px' }}></i>
          )}
          <span>{entry}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * One Trias sub-program: header, description, then its optional sections —
 * short text facts (Waktu/Tempat/…) as a tile row, lists as full cards.
 *
 * @param {{ item: object, index: number, pillar: object }} props
 */
export default function TriasSubProgram({ item, index, pillar }) {
  const number = String(index + 1).padStart(2, '0');
  const facts = item.sections.filter((s) => s.type === 'text');
  const lists = item.sections.filter((s) => s.type !== 'text');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={cardStyle}>
        <span className="indicator-card-tag" style={{ background: pillar.bgBadge, color: pillar.color }}>
          PILAR {pillar.number} · {number}
        </span>
        <h3 style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', fontWeight: 800, margin: '0 0 12px', color: 'var(--text-primary)' }}>
          {item.title}
        </h3>
        {item.description && (
          <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)', margin: 0 }}>
            {item.description}
          </p>
        )}
      </div>

      {item.placeholder && (
        <ContentPlaceholder
          source={TRIAS_SOURCE}
          title={item.title}
          note="Deskripsi, waktu, tempat, pelaksana, kegiatan, sarana, dan langkah-langkah untuk sub-program ini akan ditambahkan."
        />
      )}

      {facts.length > 0 && (
        <div className="indicator-bento-grid">
          {facts.map((section) => (
            <div key={section.label} style={cardStyle}>
              <SectionLabel label={section.label} pillar={pillar} />
              <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0 }}>{section.content}</p>
            </div>
          ))}
        </div>
      )}

      {lists.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '16px', alignItems: 'start' }}>
          {lists.map((section) => (
            <div key={section.label} style={cardStyle}>
              <SectionLabel label={section.label} pillar={pillar} />
              <ListSection section={section} pillar={pillar} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
