import { Link } from 'react-router-dom';
import { profilTriasPillars, profilContinuity } from '@/data/portalData';
import { pathForView } from '@/routes';
import { SECTION, NUM, BLOCK_TITLE, MINI_LABEL, TEXT_LINK } from './styles';

function PillarCard({ pillar }) {
  return (
    // The cards sit on a row with square bottom corners so the Manajemen bar butts against them; stacked on tablet they round off.
    <article className="flex flex-col rounded-t-panel rounded-b-none bg-card px-6 pt-6 pb-3 max-[960px]:rounded-panel max-[960px]:pb-4 max-[600px]:p-5" data-gsap="reveal">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-card bg-brand-light text-[18px] text-brand" aria-hidden="true"><i className={pillar.icon}></i></span>
        <span className={`${NUM} text-[13px]`} aria-hidden="true">{String(pillar.number).padStart(2, '0')}</span>
      </div>
      <h3 className="mb-2 text-[20px] leading-[1.25] font-extrabold">{pillar.title}</h3>
      <p className="mb-4 text-[14px] leading-[1.65] text-ink-muted">{pillar.definition}</p>

      {pillar.groups.map((group) => (
        <div key={group.label} className="[&+&]:mt-4">
          <h4 className={MINI_LABEL}>{group.label}</h4>
          <ul className="m-0 grid list-none gap-2 p-0">
            {group.items.map((item) => (
              <li
                key={item.name}
                className="relative pl-4 text-[14px] leading-[1.45] before:absolute before:top-[0.5em] before:left-0 before:size-1.5 before:rounded-[2px] before:bg-brand before:content-['']"
              >
                <strong className="block font-bold text-ink">{item.name}</strong>
                {item.note && <span className="block text-[13px] text-ink-muted">{item.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Link
        className={`${TEXT_LINK} mt-auto pt-3`}
        to={pathForView('uksm-trias', pillar.triasSection)}
      >
        Rincian program di halaman Trias UKS/M
      </Link>
    </article>
  );
}

/**
 * Deskripsi Umum: the three Trias pillars sit on one row, joined by a Manajemen UKS/M
 * bar (the source diagram puts Manajemen at the centre of the three). Below it,
 * the page's own "keep it running" advice as a numbered list, not more cards.
 */
export default function ProfilDeskripsi({ onOpenOrgTab, onScrollTo }) {

  return (
    <section id="sec-profil-deskripsi" className={`${SECTION} pt-2.5!`}>
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Deskripsi Umum</span>
          <h2 className="section-title">UKS/M dijalankan lewat Trias UKS/M</h2>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-4 max-[960px]:grid-cols-1 max-[960px]:gap-3">
          {profilTriasPillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>

        <div
          className="flex flex-wrap items-center gap-4 rounded-t-none rounded-b-panel bg-ink px-6 py-5 text-white shadow-raised max-[960px]:mt-3 max-[960px]:rounded-panel"
          data-gsap="reveal"
        >
          <span className="grid size-11 flex-none place-items-center rounded-card bg-brand-accent text-[18px] text-ink" aria-hidden="true"><i className="fa-solid fa-gears"></i></span>
          <p className="flex-[1_1_320px] text-[15px] leading-[1.6] text-[rgba(255,255,255,0.88)]">
            Di tengah ketiganya ada <strong className="text-white">Manajemen UKS/M</strong>: tata kelola pelaksanaan Trias UKS/M,
            dari kebijakan sampai monitoring dan evaluasi.
          </p>
          {/* "!" beats the unlayered .btn-pill colors and radius. */}
          <button
            type="button"
            className="btn-pill min-h-[44px] cursor-pointer bg-white! text-ink! hover:bg-brand-light! focus-visible:rounded-soft! focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-ink"
            onClick={() => onScrollTo('sec-profil-manajemen')}
          >
            Lihat 5 komponen manajemen
          </button>
        </div>
      </div>

      <div className="mt-9 rounded-panel bg-card-alt p-7 max-[600px]:p-5" data-gsap="reveal">
        <h3 className={BLOCK_TITLE}>Supaya UKS/M berjalan setiap tahun</h3>
        <ol className="m-0 grid list-none grid-cols-3 gap-6 p-0 max-[960px]:grid-cols-1">
          {profilContinuity.map((step, idx) => (
            <li key={step.id} className="grid grid-cols-[auto_1fr] items-start gap-3">
              <span className={`${NUM} text-[22px] leading-[1.2]`} aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
              <div>
                <p className="text-[14px] leading-[1.65] text-ink">{step.text}</p>
                {step.link && (
                  step.link.orgTab ? (
                    <button type="button" className={TEXT_LINK} onClick={() => onOpenOrgTab(step.link.orgTab)}>
                      {step.link.label}
                    </button>
                  ) : (
                    <Link className={TEXT_LINK} to={pathForView(step.link.view, step.link.section)}>
                      {step.link.label}
                    </Link>
                  )
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
