import { Link } from 'react-router-dom';
import { triasPillarsDetail } from '@/data/portalData';
import { pathForView } from '@/routes';

// Full class strings, so Tailwind can see them. Hexes are the original blue/emerald values.
const PILLARS = [
  {
    key: 'pendidikan',
    icon: 'fa-graduation-cap',
    iconBox: 'bg-brand-light text-brand',
    accent: 'text-brand',
    label: 'PILAR 1 · 7 SUB-PROGRAM',
    title: 'Pendidikan Kesehatan',
    cta: 'Lihat 7 Sub-program →'
  },
  {
    key: 'pelayanan',
    icon: 'fa-kit-medical',
    iconBox: 'bg-[#DBEAFE] text-[#2563EB]',
    accent: 'text-[#2563EB]',
    label: 'PILAR 2 · 4 SUB-PROGRAM',
    title: 'Pelayanan Kesehatan',
    cta: 'Lihat 4 Sub-program →'
  },
  {
    key: 'lingkungan',
    icon: 'fa-seedling',
    iconBox: 'bg-[#D1FAE5] text-[#059669]',
    accent: 'text-[#059669]',
    label: 'PILAR 3 · 5 SUB-PROGRAM',
    title: 'Pembinaan Lingkungan Sekolah Sehat',
    cta: 'Lihat 5 Sub-program →'
  }
];

// The trailing "!" on .btn-pill overrides: that class is unlayered CSS and beats plain utilities.
// Drop the "!" once .btn-pill itself moves to Tailwind.
export default function TriasPillars() {
  return (
    <section id="sec-home-trias" className="section pb-[30px]!">
      <div className="container">
        <div className="section-header" data-gsap="reveal">
          <div>
            <span className="section-kicker">3 Pilar Pelaksanaan</span>
            <h2 className="section-title">Trias UKS/M di Satuan Pendidikan</h2>
          </div>
          <Link className="btn-pill primary py-2.5! px-[22px]!" to={pathForView('uksm-trias')}>
            Jelajahi Trias UKS/M &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
          {PILLARS.map((p) => (
            <div
              key={p.key}
              className="flex flex-col justify-between rounded-card border-[1.5px] border-black/[0.06] bg-card p-7 shadow-raised"
            >
              <div>
                <div className={`mb-4 flex size-[50px] items-center justify-center rounded-soft text-[22px] ${p.iconBox}`}>
                  <i className={`fa-solid ${p.icon}`}></i>
                </div>
                <span className={`text-[11px] font-extrabold ${p.accent}`}>{p.label}</span>
                <h3 className="mt-1.5 mb-2.5 text-[18px] font-extrabold">{p.title}</h3>
                <p className="mb-4 text-[13px] leading-[1.6] text-ink-muted">
                  {triasPillarsDetail[p.key].description}
                </p>
              </div>
              <Link
                className="btn-pill secondary w-full p-2.5! text-[12px]!"
                to={pathForView('uksm-trias', `sec-trias-${p.key}`)}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
