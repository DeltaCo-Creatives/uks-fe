import {
  STRATIFIKASI_SOURCE,
  stratifikasiIntro,
  stratifikasiGoals,
  stratifikasiScoring,
  stratifikasiIndicatorIntro,
  strataCategories,
  strataLevels
} from '@/data/portalData';
import { usePengaturanSettings } from '@/hooks/usePublicLists';
import ContentPlaceholder from '@/components/ContentPlaceholder';
import { StrataExplorer } from '@/features/uksm';

const OVERVIEW_CARD = 'flex scroll-mt-24 flex-col gap-3.5 rounded-card bg-card p-[clamp(20px,3vw,28px)] shadow-raised';
const OVERVIEW_TITLE = 'flex items-center gap-2.5 text-[18px] font-extrabold';

/** Tujuan: the 4 goals as a compact icon list. */
function GoalsCard() {
  return (
    <div id="sec-strat-tujuan" className={OVERVIEW_CARD} data-gsap="reveal">
      <h3 className={OVERVIEW_TITLE}>
        <i className="fa-solid fa-bullseye text-brand" aria-hidden="true"></i> Tujuan Stratifikasi UKS
      </h3>
      <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
        {stratifikasiGoals.map((goal) => (
          <li key={goal.id} className="flex items-start gap-3.5">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-soft bg-brand-light text-[16px] text-brand" aria-hidden="true"><i className={goal.icon}></i></span>
            <span className="flex flex-col gap-0.5">
              <strong className="text-[15px] text-ink">{goal.title}</strong>
              <span className="text-[14px] leading-[1.55] text-ink-muted">{goal.description}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Cara Penilaian: the official rule, with the 4 areas that must all be met shown as chips. */
function ScoringCard() {
  return (
    <div id="sec-strat-penilaian" className={`${OVERVIEW_CARD} border-2 border-brand-accent`} data-gsap="reveal">
      <h3 className={OVERVIEW_TITLE}>
        <i className="fa-solid fa-scale-balanced text-brand" aria-hidden="true"></i> {stratifikasiScoring.title}
      </h3>
      <p className="text-[16px] leading-[1.6] text-ink">Satu strata tercapai jika <strong>semua indikator di 4 bidang ini terpenuhi</strong>:</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-2">
        {strataCategories.map((cat) => (
          <span key={cat.id} className="flex items-center gap-2.5 rounded-soft bg-card-alt px-3.5 py-2.5 text-[14px] leading-[1.35] font-bold">
            <i className={`${cat.icon} w-[18px] text-center text-brand`} aria-hidden="true"></i> {cat.title}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-[14px] font-extrabold" aria-label="Urutan strata">
        {strataLevels.map((lvl, idx) => (
          <span key={lvl.key} className="inline-flex items-center gap-2">
            <span style={{ color: lvl.color }}>{lvl.name}</span>
            {idx < strataLevels.length - 1 && <i className="fa-solid fa-chevron-right text-[10px] text-ink-muted" aria-hidden="true"></i>}
          </span>
        ))}
      </div>
      <p className="border-t-[1.5px] border-line pt-3 text-[13px] leading-[1.65] text-ink-muted">{stratifikasiScoring.body}</p>
    </div>
  );
}

/**
 * UKS/M ▸ Stratifikasi UKS/M — dev's /stratifikasi-uks content: a short
 * overview (pengertian, tujuan, penilaian), the strata explorer (SD rubric),
 * then the external dashboard.
 */
export default function StratifikasiPage() {
  const { data: settings } = usePengaturanSettings();
  const dashboardUrl = settings?.['tautan.stratifikasiDashboardUrl'];

  return (
    <div>
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-layer-group"></i> Kluster 3 · Stratifikasi UKS/M
        </span>
        <h1 className="subpage-hero-title">Stratifikasi UKS</h1>
        <p className="subpage-hero-desc">{stratifikasiIntro.body}</p>
        {dashboardUrl && (
          <a className="btn-pill relative z-[1] mt-5 bg-brand-accent! px-5! py-2.5! text-ink! hover:[transform:scale(1.04)]" href={dashboardUrl} target="_blank" rel="noopener noreferrer">
            Masuk ke Dasbor Stratifikasi UKS/M <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        )}
      </div>

      <section id="sec-strat-pengertian" className="section scroll-mt-24 pt-2.5!">
        <div className="section-header" data-gsap="reveal">
          <div>
            <span className="section-kicker">Sekilas</span>
            <h2 className="section-title">{stratifikasiIntro.title}</h2>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-stretch gap-4">
          <ScoringCard />
          <GoalsCard />
        </div>
      </section>

      <section id="sec-strat-indikator" className="section scroll-mt-24">
        <div className="section-header" data-gsap="reveal">
          <div>
            <span className="section-kicker">Indikator · Jenjang SD</span>
            <h2 className="section-title">Indikator per Strata</h2>
            <p className="mt-2.5 text-[15px] leading-[1.65] text-ink-muted">{stratifikasiIndicatorIntro} Pilih strata untuk melihat indikatornya.</p>
          </div>
        </div>

        <StrataExplorer />

        <div className="mt-5">
          <ContentPlaceholder
            source={`${STRATIFIKASI_SOURCE} (CMS hanya punya rubrik SD)`}
            title="Indikator jenjang PAUD, SMP, dan SMA/SMK"
            note="Indikator di atas berlaku untuk jenjang SD. Indikator untuk jenjang lainnya akan ditambahkan."
          />
        </div>
      </section>

      <section className="section">
        <div className="flex flex-wrap items-center gap-[18px] rounded-card bg-brand-light p-[clamp(20px,3vw,28px)]" data-gsap="reveal">
          <span className="inline-flex size-[52px] shrink-0 items-center justify-center rounded-soft bg-brand text-[22px] text-white" aria-hidden="true"><i className="fa-solid fa-chart-column"></i></span>
          <div className="min-w-[220px] flex-1">
            <h3 className="mb-1 text-[18px] font-extrabold">Dasbor Stratifikasi UKS/M</h3>
            <p className="text-[14px] leading-[1.6] text-ink-muted">Penilaian strata sekolah/madrasah dilakukan melalui dasbor resmi Stratifikasi UKS/M.</p>
          </div>
          {dashboardUrl && (
            <a className="btn-pill primary px-[22px]! py-3! text-[14px]!" href={dashboardUrl} target="_blank" rel="noopener noreferrer">
              Masuk ke Dasbor <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
