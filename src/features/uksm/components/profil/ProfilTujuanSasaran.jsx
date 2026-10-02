import { profilGoal, profilTargets } from '@/data/portalData';
import { SECTION, BLOCK_TITLE, MINI_LABEL } from './styles';

// The chevrons between steps mark the order ("dengan … sehingga …"): a right arrow beside each step,
// a down arrow above it on phones. The glyph is Font Awesome's, set through ::before.
// String.raw keeps the single backslash in the class text, which is what Tailwind scans for.
const STEP_ARROW = String.raw`not-first:before:absolute not-first:before:top-1/2 not-first:before:-left-[19px] not-first:before:text-[12px] not-first:before:text-brand not-first:before:font-black not-first:before:[font-family:'Font_Awesome_6_Free'] not-first:before:content-['\f054'] not-first:before:[transform:translateY(-50%)] max-[600px]:not-first:before:top-[-20px] max-[600px]:not-first:before:left-1/2 max-[600px]:not-first:before:content-['\f078'] max-[600px]:not-first:before:[transform:translateX(-50%)]`;

/**
 * Tujuan is one long official sentence: shown at reading size in a white card,
 * then the same sentence as a three-step flow (means, goal, outcome) so its
 * logic reads at a glance. Sasaran is reference material on the tinted ground.
 */
export default function ProfilTujuanSasaran() {
  return (
    <section id="sec-profil-tujuan" className={SECTION}>
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Tujuan &amp; Sasaran</span>
          <h2 className="section-title">Untuk apa, dan untuk siapa</h2>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start gap-8 max-[1180px]:grid-cols-[minmax(0,1fr)]">
        <div className="rounded-panel bg-card p-7 max-[600px]:p-5" data-gsap="reveal">
          <div className="mb-3.5 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-card bg-brand-light text-[18px] text-brand" aria-hidden="true"><i className="fa-solid fa-bullseye"></i></span>
            <h3 className="m-0 text-[17px] font-extrabold">Tujuan UKS/M</h3>
          </div>
          <p className="mb-6 max-w-[62ch] text-[17px] leading-[1.7] font-semibold text-ink max-[600px]:text-[16px]">{profilGoal.sentence}</p>

          <h4 className={MINI_LABEL}>Dibaca per bagian</h4>
          <ol className="m-0 grid list-none grid-cols-3 gap-7 p-0 max-[600px]:grid-cols-1 max-[600px]:gap-[26px]">
            {profilGoal.parts.map((part) => (
              <li key={part.id} className={`relative flex flex-col gap-1.5 rounded-card bg-card-alt p-[18px] ${STEP_ARROW}`}>
                <span className="mb-1 grid size-9 place-items-center rounded-soft bg-card text-[16px] text-brand" aria-hidden="true"><i className={part.icon}></i></span>
                <strong className="text-[13px] font-bold text-brand-deep">{part.label}</strong>
                <p className="text-[14px] leading-[1.6] text-ink">{part.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div id="sec-profil-sasaran" className="scroll-mt-24 rounded-panel bg-card-alt p-6 max-[600px]:p-5" data-gsap="reveal">
          <h3 className={BLOCK_TITLE}>Sasaran utama</h3>
          <p className="mb-3 text-[14px] leading-[1.65] text-ink-muted">{profilTargets.intro}</p>
          <ul className="m-0 mb-5 grid list-none grid-cols-2 gap-x-4 p-0 max-[600px]:grid-cols-1">
            {profilTargets.main.map((target) => (
              <li key={target.id} className="flex items-center gap-2.5 border-b border-rule py-2.5 text-[14px] leading-[1.3] font-bold">
                <i className={`${target.icon} w-5 text-center text-[16px] text-brand`} aria-hidden="true"></i>
                <span>{target.label}</span>
              </li>
            ))}
          </ul>

          <h4 className={MINI_LABEL}>Pemangku kepentingan</h4>
          {/* Static names separated by a dot, no pill shapes. */}
          <ul className="m-0 flex list-none flex-wrap gap-y-1 p-0 text-[14px] leading-[1.6] font-semibold text-ink">
            {profilTargets.stakeholders.map((name) => (
              <li key={name} className="not-last:after:mx-2.5 not-last:after:font-bold not-last:after:text-ink-muted not-last:after:content-['·']">{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
