import { kerjaSamaBenefits, kerjaSamaGroups, kerjaSamaNote, kerjaSamaRules } from '@/data/portalData';
import { SECTION, BLOCK_TITLE, NUM, CARD, TINTED, ICON, CARD_HEAD, DOT_LIST, DOT_ITEM } from '../styles';

/**
 * The source lists 10 forms of cooperation flat; they are grouped by what the
 * partner provides so the list can be scanned. Ketentuan are the binding rules,
 * so they get the white card and numbers you can cite; Manfaat sits beside
 * them on the tinted ground.
 */
export default function MitraPanduan() {
  return (
    <section id="sec-mitra-panduan" className={SECTION}>
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Panduan Kemitraan</span>
          <h2 className="section-title">Bentuk kerja sama yang bisa diajukan</h2>
        </div>
      </div>

      {/* The 1px gap over the rule-colored ground draws the dividers between groups. */}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-panel bg-rule max-[720px]:grid-cols-1" data-gsap="reveal">
        {kerjaSamaGroups.map((group) => (
          <div key={group.id} className="bg-card p-6 max-[600px]:p-5">
            <div className={CARD_HEAD}>
              <span className={ICON} aria-hidden="true"><i className={group.icon}></i></span>
              <h3 className={BLOCK_TITLE}>{group.title}</h3>
            </div>
            <ul className={DOT_LIST}>
              {group.items.map((item) => (
                <li key={item} className={DOT_ITEM}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-3.5 mb-0 max-w-[80ch] text-[14px] leading-[1.65] text-ink-muted" data-gsap="reveal">
        <strong className="text-ink">Catatan:</strong> {kerjaSamaNote}
      </p>

      <div className="mt-8 grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start gap-6 max-[960px]:grid-cols-[minmax(0,1fr)]">
        <div className={CARD} data-gsap="reveal">
          <h3 className={`${BLOCK_TITLE} mb-3.5`}>Ketentuan kerja sama</h3>
          <ol className="m-0 list-none p-0">
            {kerjaSamaRules.map((rule, idx) => (
              <li key={rule} className="grid grid-cols-[28px_1fr] gap-2.5 border-t border-rule py-3.5 first:border-t-0 first:pt-0">
                <span className={`${NUM} leading-[1.6]`} aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                <p className="text-[14px] leading-[1.65] text-ink">{rule}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={TINTED} data-gsap="reveal">
          <h3 className={`${BLOCK_TITLE} mb-3.5`}>Manfaat bagi mitra</h3>
          <ul className={DOT_LIST}>
            {kerjaSamaBenefits.map((benefit) => (
              <li key={benefit} className={DOT_ITEM}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
