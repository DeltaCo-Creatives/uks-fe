import { useState } from 'react';
import { triasPillarsDetail, triasPillarTaglines } from '../../data/portalData';
import TriasAccordionItem from './TriasAccordionItem';

const sectionIdOf = (pillar) => `sec-trias-${pillar.id}`;

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Hero shortcut card: jumps to a pillar section. */
function PillarJumpCard({ pillar }) {
  return (
    <button type="button" className="trias-jump-card" onClick={() => scrollToSection(sectionIdOf(pillar))} data-gsap="reveal">
      <span className="trias-jump-top">
        <span className="trias-jump-icon" style={{ background: pillar.bgBadge, color: pillar.color }} aria-hidden="true">
          <i className={pillar.icon}></i>
        </span>
        <span className="trias-pillar-badge" style={{ background: pillar.color }}>{pillar.number}</span>
      </span>
      <span className="trias-jump-title">{pillar.title}</span>
      <span className="trias-jump-desc">{triasPillarTaglines[pillar.id]}</span>
      <span className="trias-jump-link" style={{ color: pillar.color }}>
        Lihat {pillar.items.length} sub-program <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
      </span>
    </button>
  );
}

/** One pillar: numbered heading, official description, and its sub-program rows. */
function PillarSection({ pillar, openItemId, onToggleItem }) {
  return (
    <section id={sectionIdOf(pillar)} className="section trias-pillar-section">
      <div className="trias-pillar-header" data-gsap="reveal">
        <span className="trias-pillar-badge trias-pillar-badge-lg" style={{ background: pillar.color }}>{pillar.number}</span>
        <div>
          <span className="section-kicker" style={{ background: pillar.bgBadge, color: pillar.color }}>
            Pilar {pillar.number} · {pillar.items.length} Sub-program
          </span>
          <h2 className="section-title">{pillar.title}</h2>
          <p className="trias-pillar-desc">{pillar.description}</p>
        </div>
      </div>

      <div className="trias-accordion-list" data-gsap="reveal">
        {pillar.items.map((item, idx) => (
          <TriasAccordionItem
            key={item.id}
            item={item}
            index={idx}
            pillar={pillar}
            isOpen={item.id === openItemId}
            onToggle={() => onToggleItem(item.id)}
          />
        ))}
      </div>
    </section>
  );
}

/** UKS/M ▸ TRIAS UKS/M — dev's /trias-uks content, summarised first, full text on request. */
export default function TriasPage() {
  const pillars = Object.values(triasPillarsDetail);
  const [openItemId, setOpenItemId] = useState(pillars[0].items[0].id);

  const handleToggleItem = (itemId) => {
    setOpenItemId((current) => (current === itemId ? null : itemId));
  };

  return (
    <div>
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-shield-heart"></i> Kluster 2 · TRIAS UKS/M
        </span>
        <h1 className="subpage-hero-title">Trias UKS/M</h1>
        <p className="subpage-hero-desc">
          Tiga program pokok Usaha Kesehatan Sekolah/Madrasah untuk membentuk warga sekolah yang sehat,
          dari belajar hidup sehat hingga menjaga lingkungan sekolah.
        </p>
      </div>

      <div className="trias-jump-grid">
        {pillars.map((pillar) => (
          <PillarJumpCard key={pillar.id} pillar={pillar} />
        ))}
      </div>

      {pillars.map((pillar) => (
        <PillarSection key={pillar.id} pillar={pillar} openItemId={openItemId} onToggleItem={handleToggleItem} />
      ))}
    </div>
  );
}
