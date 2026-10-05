/**
 * Determinate bar when the total is known, a sliding indeterminate one otherwise.
 *
 * @param {{ loaded?: number, total?: number, label: string }} props
 */
export default function ProgressBar({ loaded = 0, total = 0, label }) {
  const percent = total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : null;

  return (
    <div
      className={`load-bar${percent === null ? ' is-indeterminate' : ''}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent ?? undefined}
    >
      <span style={percent === null ? undefined : { width: `${percent}%` }} />
    </div>
  );
}
