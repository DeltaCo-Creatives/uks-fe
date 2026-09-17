import { useState } from 'react';
import { triasPillarsDetail } from '../../data/portalData';
import TriasSubProgram from './TriasSubProgram';

/**
 * One pillar: intro card, numbered sub-program tabs, and a display panel for
 * the selected sub-program (one at a time, like dev's single-open accordion).
 *
 * @param {{ pillar: object }} props
 */
function PillarSection({ pillar }) {
  const [activeId, setActiveId] = useState(pillar.items[0].id);
  const activeIndex = pillar.items.findIndex((item) => item.id === activeId);
  const activeItem = pillar.items[activeIndex];

  return (
    <section id={`sec-trias-${pillar.id}`} className="section" style={pillar.number === 1 ? { paddingTop: '10px' } : undefined}>
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker" style={{ background: pillar.bgBadge, color: pillar.color }}>
            Pilar {pillar.number} · {pillar.items.length} Sub-program
          </span>
          <h2 className="section-title">({pillar.number}) {pillar.title}</h2>
        </div>
      </div>

      <div className="about-bento-frame" data-gsap="reveal" style={{ marginBottom: '28px' }}>
        <div className="about-card" style={{ background: pillar.cardColor, padding: '28px 32px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="program-icon" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', margin: 0, flexShrink: 0 }}>
              <i className={pillar.icon}></i>
            </div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.95)', fontSize: '15px', lineHeight: 1.65 }}>
              {pillar.description}
            </p>
          </div>
        </div>

        <div className="lobby-tabs" role="tablist" aria-label={`Sub-program ${pillar.title}`}>
          {pillar.items.map((item, idx) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={item.id === activeId}
              className={`lobby-tab ${item.id === activeId ? 'active' : ''}`}
              onClick={() => setActiveId(item.id)}
              style={{ padding: '10px 18px' }}
            >
              <span style={{ fontWeight: 800, color: item.id === activeId ? 'var(--brand-accent)' : pillar.color }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        <div className="lobby-panel" role="tabpanel" key={activeId}>
          <TriasSubProgram item={activeItem} index={activeIndex} pillar={pillar} />
        </div>
      </div>
    </section>
  );
}

/** UKS/M ▸ TRIAS UKS/M — content from dev's /trias-uks. */
export default function TriasPage() {
  const pillars = Object.values(triasPillarsDetail);

  return (
    <div>
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-shield-heart"></i> Kluster 2 · TRIAS UKS/M
        </span>
        <h1 className="subpage-hero-title">
          TRIAS UKS/M : 3 Pilar Pelaksanaan di Satuan Pendidikan
        </h1>
        <p className="subpage-hero-desc">
          {pillars.map((p) => `(${p.number}) ${p.title}`).join(', ')}.
        </p>
      </div>

      {pillars.map((pillar) => (
        <PillarSection key={pillar.id} pillar={pillar} />
      ))}
    </div>
  );
}
