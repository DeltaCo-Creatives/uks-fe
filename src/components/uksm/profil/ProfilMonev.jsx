import { profilMonev } from '../../../data/portalData';

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
    <div className="profil-checklist">
      {MONITOR_COLUMNS.map((column) => (
        <div key={column.join('-')} className="profil-checklist-col">
          {column.map((groupId) => {
            const group = byId[groupId];
            return (
              <div key={group.id} className="profil-checklist-group">
                <h5 className="profil-mini-label">{group.title}</h5>
                <ol start={startOf[group.id]}>
                  {group.items.map((item, idx) => (
                    <li key={item}>
                      <span className="profil-check-num" aria-hidden="true">{startOf[group.id] + idx}</span>
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
    <div className="profil-monev-part">
      <h4 className="profil-monev-part-title">Monitoring</h4>
      <p className="profil-body">{monitoring.definition}</p>

      <dl className="profil-monev-facts">
        {monitoring.facts.map((fact) => (
          <div key={fact.id}>
            <dt><i className={fact.icon} aria-hidden="true"></i> {fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <h4 className="profil-block-title">20 hal yang dipantau</h4>
      <MonitoringChecklist />
    </div>
  );
}

function Evaluation() {
  const { evaluation } = profilMonev;
  return (
    <div className="profil-monev-part">
      <h4 className="profil-monev-part-title">Evaluasi</h4>
      <p className="profil-body">{evaluation.definition}</p>

      <div className="profil-eval-grid">
        <div>
          <h5 className="profil-block-title">Target pencapaian</h5>
          <p className="profil-horizons-lead">{evaluation.horizonsLead}</p>
          <dl className="profil-horizons">
            {evaluation.horizons.map((horizon) => (
              <div key={horizon.id}>
                <dt>{horizon.label}</dt>
                <dd>{horizon.value}</dd>
              </div>
            ))}
          </dl>

          <dl className="profil-eval-meta">
            <div>
              <dt>Ditujukan kepada</dt>
              <dd>{evaluation.audience}</dd>
            </div>
            <div>
              <dt>Penanggung jawab</dt>
              <dd>{evaluation.owner}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h5 className="profil-block-title">Indikator bersumber dari</h5>
          <ul className="profil-source-list">
            {evaluation.sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </div>
      </div>

      <h5 className="profil-block-title">Tahapan evaluasi</h5>
      <ol className="profil-stages">
        {evaluation.stages.map((stage, idx) => (
          <li key={stage.id} className="profil-stage">
            <span className="profil-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
            <strong className="profil-stage-title">{stage.title}</strong>
            <p>{stage.text}</p>
            {stage.points && (
              <ul className="profil-stage-points">
                {stage.points.map((point) => (
                  <li key={point}>{point}</li>
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
    <article className="profil-monev" data-gsap="reveal" aria-labelledby="profil-monev-title">
      <header className="profil-monev-head">
        <span className="profil-component-num" aria-hidden="true">{String(profilMonev.number).padStart(2, '0')}</span>
        <div>
          <h3 id="profil-monev-title" className="profil-component-title">{profilMonev.title}</h3>
          <p className="profil-body">{profilMonev.intro}</p>
        </div>
      </header>

      <Monitoring />
      <Evaluation />
    </article>
  );
}
