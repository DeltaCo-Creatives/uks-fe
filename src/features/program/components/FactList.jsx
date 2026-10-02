/**
 * Label/value pairs for a program or a competition. `compact` tightens the
 * spacing for the ones nested inside a competition card.
 *
 * @param {{ facts: {label: string, value: string}[], compact?: boolean }} props
 */
export default function FactList({ facts, compact = false }) {
  return (
    <dl className={`border-b border-rule ${compact ? 'mt-4 mb-1' : 'mt-5 mb-0'}`}>
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 border-t border-rule py-[11px] max-[600px]:grid-cols-[minmax(0,1fr)] max-[600px]:gap-0.5"
        >
          <dt className="text-[13px] leading-[1.55] font-bold text-brand-deep">{fact.label}</dt>
          <dd className="m-0 text-[14px] leading-[1.55] text-ink">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
