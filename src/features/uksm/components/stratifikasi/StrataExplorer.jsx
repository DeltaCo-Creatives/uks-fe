import { useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '@/hooks/useCollapse';
import { strataCategories, strataLevels } from '@/data/portalData';
import { strataIndicators } from '../../mapUksm';
import JenjangTabs from './JenjangTabs';
import StrataCategoryCard from './StrataCategoryCard';
import { FOCUS_RING } from '../../styles';

const DEFAULT_JENJANG = 'sd';

// --strata-color / --strata-bg / --step-rise are set inline per step, so the colors and height follow the data.
const STEP = 'flex min-h-[calc(104px_+_var(--step-rise,0px))] cursor-pointer flex-col items-start justify-end gap-1 rounded-card border-2 border-t-[6px] border-t-[var(--strata-color)] px-5 py-[18px] text-left text-ink [transition:var(--spring)] hover:shadow-raised hover:[transform:translateY(-3px)] max-[768px]:min-h-0 max-[768px]:px-4 max-[768px]:py-3.5';
const STEP_IDLE = 'border-line bg-card';
const STEP_ACTIVE = 'border-[var(--strata-color)] bg-[var(--strata-bg)] shadow-raised';

const countIndicators = (requirements, strataKey) =>
  strataCategories.reduce((sum, category) => sum + strataIndicators(requirements, category.id, strataKey).length, 0);

/** The 4 strata as a rising ladder of buttons; the selected one drives the panel below. */
function StrataLadder({ requirements, selectedKey, onSelect }) {
  return (
    <div className="mb-4 grid grid-cols-4 items-end gap-3 max-[768px]:grid-cols-2 max-[768px]:items-stretch" role="group" aria-label="Pilih strata">
      {strataLevels.map((strata, idx) => {
        const isActive = strata.key === selectedKey;
        const count = countIndicators(requirements, strata.key);
        return (
          <button
            key={strata.key}
            type="button"
            className={`${STEP} ${FOCUS_RING} ${isActive ? STEP_ACTIVE : STEP_IDLE}`}
            aria-pressed={isActive}
            onClick={() => onSelect(strata.key)}
            style={{ '--strata-color': strata.color, '--strata-bg': strata.bgColor, '--step-rise': `${idx * 16}px` }}
          >
            <span className="text-[11px] font-extrabold tracking-[0.06em] text-ink-muted uppercase">Strata {strata.code}</span>
            <span className="font-display text-[22px] leading-[1.2] font-extrabold max-[768px]:text-[18px]">{strata.name}</span>
            <span className="text-[13px] font-bold text-ink-muted">{idx === 0 ? `${count} indikator` : `+${count} indikator`}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * UKS/M ▸ Stratifikasi ▸ Indikator: pick a jenjang and a strata, see only what that strata adds,
 * grouped by the 4 indicator areas. The choice lives in ?jenjang= and ?strata= (replace, no history entry);
 * an unknown or missing value falls back to SD (else the first jenjang) and Dasar.
 *
 * @param {{ jenjang: Array<{ slug: string, label: string, requirements: object }> }} props at least one row
 */
export default function StrataExplorer({ jenjang }) {
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const current =
    jenjang.find((row) => row.slug === searchParams.get('jenjang')) ??
    jenjang.find((row) => row.slug === DEFAULT_JENJANG) ??
    jenjang[0];
  const index = Math.max(0, strataLevels.findIndex((level) => level.key === searchParams.get('strata')));
  const strata = strataLevels[index];
  const previous = strataLevels[index - 1];
  const next = strataLevels[index + 1];
  const { requirements } = current;
  const count = countIndicators(requirements, strata.key);
  const panelRef = useRef(null);
  const viewKey = `${current.slug}-${strata.key}`;
  const shownKey = useRef(viewKey);

  // navigate rather than setSearchParams, which would drop the #sec-strat-indikator anchor of a shared link.
  const select = (param, value) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set(param, value);
    navigate({ search: `?${nextParams}`, hash }, { replace: true });
  };

  // strat-panel-head and strat-category-card are class hooks for this tween; they carry no CSS.
  // Soft fade-up of the new jenjang or strata's content; the first render and reduced-motion users get none.
  useGSAP(() => {
    if (shownKey.current === viewKey) return;
    shownKey.current = viewKey;
    if (prefersReducedMotion()) return;
    gsap.from('.strat-panel-head, .strat-category-card', {
      opacity: 0,
      y: 12,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.05,
      clearProps: 'opacity,transform'
    });
  }, { dependencies: [viewKey], scope: panelRef });

  return (
    <JenjangTabs jenjang={jenjang} activeSlug={current.slug} onSelect={(slug) => select('jenjang', slug)}>
      <StrataLadder requirements={requirements} selectedKey={strata.key} onSelect={(key) => select('strata', key)} />

      <div ref={panelRef} className="rounded-card border-t-[6px] bg-card p-[clamp(20px,3vw,32px)] shadow-raised" style={{ borderTopColor: strata.color }} aria-live="polite">
        <div className="strat-panel-head mb-5">
          <div>
            <span className="mb-3 inline-block self-start rounded-[999px] px-2.5 py-1 text-[10px] font-extrabold" style={{ background: strata.bgColor, color: strata.color }}>
              STRATA {strata.code} · TINGKAT {index + 1} DARI {strataLevels.length}
            </span>
            <h3 className="mb-1.5 text-[clamp(24px,3vw,30px)] font-extrabold">{strata.name}</h3>
            <p className="text-[15px] leading-[1.65] text-ink-muted [&>strong]:text-ink">
              {previous
                ? <>Sekolah sudah memenuhi <strong>seluruh indikator strata {previous.name}</strong>, ditambah {count} indikator berikut.</>
                : <>Sekolah memenuhi seluruh {count} indikator berikut.</>}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-3.5" key={viewKey}>
          {strataCategories.map((category, idx) => (
            <StrataCategoryCard
              key={category.id}
              category={category}
              index={idx}
              requirements={strataIndicators(requirements, category.id, strata.key)}
              strata={strata}
            />
          ))}
        </div>

        {next && (
          <button type="button" className={`btn-pill secondary mt-5 min-h-[44px] cursor-pointer px-5! py-2.5! text-[14px]! ${FOCUS_RING}`} onClick={() => select('strata', next.key)}>
            Lanjut ke strata {next.name} <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        )}
      </div>
    </JenjangTabs>
  );
}
