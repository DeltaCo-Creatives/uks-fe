import { useState } from 'react';
import { triasPillarsDetail, triasPillarTaglines } from '@/data/portalData';
import { TriasAccordionItem } from '@/features/uksm';

const BADGE = 'inline-flex size-8 shrink-0 items-center justify-center rounded-[50%] font-display text-[15px] font-extrabold text-white';
// The kicker already says "Pilar N", so phones drop the big badge and the title keeps full width.
const BADGE_LG = 'size-12! text-[22px]! max-[600px]:hidden';

const sectionIdOf = (pillar) => `sec-trias-${pillar.id}`;

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Hero shortcut card: jumps to a pillar section. */
function PillarJumpCard({ pillar }) {
  return (
    <button
      type="button"
      className="flex cursor-pointer flex-col gap-2.5 rounded-card border-[1.5px] border-line bg-card p-6 text-left text-ink shadow-raised [transition:var(--spring)] hover:shadow-lift hover:[transform:translateY(-4px)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-accent max-[600px]:gap-1.5 max-[600px]:px-[18px] max-[600px]:py-4"
      onClick={() => scrollToSection(sectionIdOf(pillar))} data-gsap="reveal">
      <span className="flex items-center justify-between">
        <span className="flex size-[50px] items-center justify-center rounded-soft text-[22px]" style={{ background: pillar.bgBadge, color: pillar.color }} aria-hidden="true">
          <i className={pillar.icon}></i>
        </span>
        <span className={BADGE} style={{ background: pillar.color }}>{pillar.number}</span>
      </span>
      <span className="font-display text-[18px] leading-[1.3] font-extrabold">{pillar.title}</span>
      <span className="text-[14px] leading-[1.6] text-ink-muted max-[600px]:hidden">{triasPillarTaglines[pillar.id]}</span>
      <span className="mt-auto inline-flex items-center gap-1.5 text-[14px] font-bold" style={{ color: pillar.color }}>
        Lihat {pillar.items.length} sub-program <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
      </span>
    </button>
  );
}

/** One pillar: numbered heading, official description, and its sub-program rows. */
function PillarSection({ pillar, openItemId, onToggleItem }) {
  return (
    <section id={sectionIdOf(pillar)} className="section scroll-mt-24">
      <div className="mb-6 flex items-start gap-[18px]" data-gsap="reveal">
        <span className={`${BADGE} ${BADGE_LG}`} style={{ background: pillar.color }}>{pillar.number}</span>
        <div>
          <span className="section-kicker" style={{ background: pillar.bgBadge, color: pillar.color }}>
            Pilar {pillar.number} · {pillar.items.length} Sub-program
          </span>
          <h2 className="section-title">{pillar.title}</h2>
          <p className="mt-2.5 max-w-[860px] text-[15px] leading-[1.7] text-ink-muted">{pillar.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3" data-gsap="reveal">
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

      <div className="mb-3 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4 max-[600px]:gap-2.5">
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
