import { profilMonev } from '@/data/portalData';
import { NUM, COMPONENT_NUM, BLOCK_TITLE, MINI_LABEL, BODY } from './styles';

const PART_TITLE = 'mb-2 text-[22px] font-extrabold';
const HORIZON_FIRST = 'pt-3.5 pr-4 max-[600px]:py-3 max-[600px]:pr-0';
const HORIZON_REST = 'border-l border-rule-strong pt-3.5 pr-4 pl-4 max-[600px]:border-t max-[600px]:border-l-0 max-[600px]:px-0 max-[600px]:py-3';

// Checklist columns: Lingkungan and the single Manajemen item share the third column
const MONITOR_COLUMNS = [['pendidikan'], ['pelayanan'], ['lingkungan', 'manajemen']];

const { groups: MONITOR_GROUPS } = profilMonev.monitoring;

// The source numbers the items 1 to 20 straight through; keep that numbering.
const START_OF = Object.fromEntries(
  MONITOR_GROUPS.map((group, idx) => [
    group.id,
    1 + MONITOR_GROUPS.slice(0, idx).reduce((sum, prev) => sum + prev.items.length, 0)
  ])
);

function MonitoringChecklist() {
  const startOf = START_OF;
  const byId = Object.fromEntries(MONITOR_GROUPS.map((group) => [group.id, group]));

  return (
    <div className="grid grid-cols-3 gap-6 max-[960px]:grid-cols-2 max-[600px]:grid-cols-1">
      {MONITOR_COLUMNS.map((column) => (
        <div key={column.join('-')}>
          {column.map((groupId) => {
            const group = byId[groupId];
            return (
              <div key={group.id} className="not-first:mt-5">
                <h5 className={MINI_LABEL}>{group.title}</h5>
                <ol className="m-0 grid list-none gap-0.5 p-0" start={startOf[group.id]}>
                  {group.items.map((item, idx) => (
                    <li key={item} className="grid grid-cols-[28px_minmax(0,1fr)] gap-1.5 border-b border-rule-soft py-[7px] text-[14px] leading-[1.45]">
                      <span className="text-[13px] font-extrabold text-brand-deep tabular-nums" aria-hidden="true">{startOf[group.id] + idx}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Monitoring() {
  const { monitoring } = profilMonev;
  return (
    <div className="pt-7">
      <h4 className={PART_TITLE}>Monitoring</h4>
      <p className={BODY}>{monitoring.definition}</p>

      <dl className="mt-5 mb-7 grid grid-cols-[1fr_1.6fr_0.8fr_1.2fr] gap-2 max-[960px]:grid-cols-2 max-[600px]:grid-cols-1">
        {monitoring.facts.map((fact) => (
          <div key={fact.id} className="rounded-card bg-card-alt p-3.5">
            <dt className="mb-1 text-[13px] font-bold text-brand-deep"><i className={`${fact.icon} w-4 text-brand`} aria-hidden="true"></i> {fact.label}</dt>
            <dd className="m-0 text-[14px] leading-[1.5] font-semibold">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <h4 className={BLOCK_TITLE}>20 hal yang dipantau</h4>
      <MonitoringChecklist />
    </div>
  );
}

function Evaluation() {
  const { evaluation } = profilMonev;
  return (
    <div className="mt-8 border-t border-rule pt-7">
      <h4 className={PART_TITLE}>Evaluasi</h4>
      <p className={BODY}>{evaluation.definition}</p>

      <div className="mt-6 mb-7 grid grid-cols-2 gap-8 max-[960px]:grid-cols-1">
        <div>
          <h5 className={BLOCK_TITLE}>Target pencapaian</h5>
          <p className="mb-3 text-[14px] leading-[1.6] text-ink-muted">{evaluation.horizonsLead}</p>
          {/* Three periods named in the source: stated as text, not drawn to scale. */}
          <dl className="m-0 grid grid-cols-3 border-t-2 border-ink max-[600px]:grid-cols-1">
            {evaluation.horizons.map((horizon, idx) => (
              <div key={horizon.id} className={idx === 0 ? HORIZON_FIRST : HORIZON_REST}>
                <dt className="mb-1.5 text-[13px] font-bold text-brand-deep">{horizon.label}</dt>
                <dd className="m-0 font-display text-[18px] leading-[1.3] font-bold text-ink">{horizon.value}</dd>
              </div>
            ))}
          </dl>

          <dl className="mt-7 mb-0">
            {[['Ditujukan kepada', evaluation.audience], ['Penanggung jawab', evaluation.owner]].map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[150px_minmax(0,1fr)] gap-3 border-t border-rule py-3 max-[600px]:grid-cols-[minmax(0,1fr)] max-[600px]:gap-0.5"
              >
                <dt className="text-[13px] leading-[1.6] font-bold text-brand-deep">{label}</dt>
                <dd className="m-0 text-[14px] leading-[1.6] text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h5 className={BLOCK_TITLE}>Indikator bersumber dari</h5>
          <ul className="m-0 grid list-none gap-2.5 p-0">
            {evaluation.sources.map((source) => (
              <li
                key={source}
                className="relative border-b border-rule-soft pb-2.5 pl-[22px] text-[14px] leading-[1.6] before:absolute before:top-px before:left-0 before:text-[13px] before:text-brand before:font-black before:[font-family:'Font_Awesome_6_Free'] before:content-['\f058']"
              >
                {source}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h5 className={BLOCK_TITLE}>Tahapan evaluasi</h5>
      <ol className="m-0 grid list-none grid-cols-3 gap-4 p-0 max-[960px]:grid-cols-1">
        {evaluation.stages.map((stage, idx) => (
          <li key={stage.id} className="rounded-card bg-card-alt p-[18px]">
            <span className={`${NUM} text-[13px]`} aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
            <strong className="mt-1 mb-1.5 block text-[16px] font-extrabold">{stage.title}</strong>
            <p className="text-[14px] leading-[1.6] text-ink">{stage.text}</p>
            {stage.points && (
              <ul className="mt-2 mb-0 grid list-disc gap-1.5 pl-[18px]">
                {stage.points.map((point) => (
                  <li key={point} className="text-[14px] leading-[1.6] text-ink marker:text-brand">{point}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Component 5. The source spends most of its words here, so it is the page's
 * one elevated panel: monitoring (who, when, what) then evaluation (targets,
 * sources, stages).
 */
export default function ProfilMonev() {
  return (
    <article className="rounded-panel bg-card p-8 shadow-raised max-[600px]:p-5" data-gsap="reveal" aria-labelledby="profil-monev-title">
      <header className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b-2 border-ink pb-6">
        <span className={COMPONENT_NUM} aria-hidden="true">{String(profilMonev.number).padStart(2, '0')}</span>
        <div>
          <h3 id="profil-monev-title" className="mb-2 text-[19px] font-extrabold">{profilMonev.title}</h3>
          <p className={BODY}>{profilMonev.intro}</p>
        </div>
      </header>

      <Monitoring />
      <Evaluation />
    </article>
  );
}
