import { Link } from 'react-router-dom';
import { mitraRegistration, mitraSectors } from '@/data/portalData';
import { pathForView } from '@/routes';
import { SECTION, BLOCK_TITLE, MINI_LABEL, CARD, ICON, CARD_HEAD } from '../styles';

// "!" on the focus radius beats the unlayered .btn-pill radius.
const REGISTER_BUTTON = 'btn-pill min-h-[44px] cursor-pointer bg-white text-ink no-underline hover:bg-brand-light max-[600px]:w-full focus-visible:rounded-soft! focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-brand-accent';

/**
 * Each sector shows who belongs to it and the conditions that apply to it,
 * side by side. The registration bar closes the section with the honest
 * status: there is no working form yet, so it points to the contact page.
 */
export default function MitraKriteria() {
  return (
    <section id="sec-mitra-kriteria" className={SECTION}>
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Kriteria Mitra</span>
          <h2 className="section-title">Siapa yang bisa menjadi mitra</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 items-stretch gap-6 max-[960px]:grid-cols-[minmax(0,1fr)]">
        {mitraSectors.map((sector) => (
          <div key={sector.id} className={CARD} data-gsap="reveal">
            <div className={CARD_HEAD}>
              <span className={ICON} aria-hidden="true"><i className={sector.icon}></i></span>
              <h3 className={BLOCK_TITLE}>{sector.title}</h3>
            </div>

            <dl className="mt-0 mb-[22px]">
              {sector.members.map((member) => (
                <div key={member.label} className="border-t border-rule py-3">
                  <dt className="text-[14px] font-bold text-ink">{member.label}</dt>
                  <dd className="mt-1 mb-0 text-[14px] leading-[1.6] text-ink-muted">{member.text}</dd>
                </div>
              ))}
            </dl>

            <h4 className={MINI_LABEL}>Yang perlu dipenuhi</h4>
            <ul className="m-0 grid list-none gap-2.5 p-0">
              {sector.requirements.map((req) => (
                <li key={req} className="grid grid-cols-[18px_1fr] gap-2.5 text-[14px] leading-[1.6]">
                  <i className="fa-solid fa-check mt-[5px] text-[12px] text-brand" aria-hidden="true"></i>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 rounded-panel bg-ink px-6 py-5 text-white max-[600px]:p-5" data-gsap="reveal">
        <span className="grid size-11 flex-none place-items-center rounded-card bg-brand-accent text-[18px] text-ink" aria-hidden="true"><i className="fa-solid fa-file-signature"></i></span>
        <p className="flex-[1_1_320px] text-[15px] leading-[1.6] text-[rgba(255,255,255,0.88)]">
          <strong className="text-white">Pendaftaran mitra.</strong> {mitraRegistration.status} Untuk menyampaikan minat bermitra,
          hubungi sekretariat UKS/M melalui halaman Kontak.
        </p>
        {mitraRegistration.url ? (
          <a className={REGISTER_BUTTON} href={mitraRegistration.url} target="_blank" rel="noopener noreferrer">
            Isi formulir pendaftaran
          </a>
        ) : (
          <Link className={REGISTER_BUTTON} to={pathForView('kontak', 'sec-kontak-alamat')}>
            Buka halaman Kontak
          </Link>
        )}
      </div>
    </section>
  );
}
