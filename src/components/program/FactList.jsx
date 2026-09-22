/**
 * Label/value pairs for a program or a competition. `compact` tightens the
 * spacing for the ones nested inside a competition card.
 *
 * @param {{ facts: {label: string, value: string}[], compact?: boolean }} props
 */
export default function FactList({ facts, compact = false }) {
  return (
    <dl className={`prog-facts ${compact ? 'is-compact' : ''}`}>
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
