import { Link } from 'react-router-dom';
import { strataLevels } from '@/data/portalData';
import { pathForView } from '@/routes';

/**
 * Beranda ▸ Stratifikasi UKS/M teaser — dev homepage's 4 strata boxes +
 * "Lihat Detail", both leading to UKS/M ▸ Stratifikasi UKS/M.
 */
// Strata colors come from data shared with the Stratifikasi page, so they stay inline.
// The trailing "!" beats the unlayered .btn-pill/.section rules; drop it once those move to Tailwind.
export default function HomeStratifikasi() {
  return (
    <section id="sec-home-stratifikasi" className="section pb-[30px]!">
      <div className="container">
        <div className="section-header" data-gsap="reveal">
          <div>
            <span className="section-kicker">Standar Kesiapan Satpen</span>
            <h2 className="section-title">Stratifikasi UKS/M</h2>
          </div>
          <Link className="btn-pill primary py-2.5! px-[22px]!" to={pathForView('uksm-stratifikasi')}>
            Lihat Detail &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
          {strataLevels.map((lvl) => (
            <Link
              key={lvl.key}
              data-gsap="reveal"
              to={pathForView('uksm-stratifikasi', 'sec-strat-indikator')}
              className="flex flex-col gap-2 rounded-card border-[1.5px] border-t-6 border-black/[0.06] bg-card p-6 text-left shadow-raised"
              style={{ borderTopColor: lvl.color }}
            >
              <span
                className="self-start rounded-full px-2.5 py-1 text-[11px] font-extrabold"
                style={{ color: lvl.color, background: lvl.bgColor }}
              >
                STRATA {lvl.code}
              </span>
              <h3 className="text-[18px] font-extrabold">{lvl.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
