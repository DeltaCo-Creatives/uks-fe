import { BAR, BAR_HEADING } from '../styles';

/** Heading placeholder of a loading column, kept in an h5 so it takes the same height as the real heading. */
export function HeadingSkeleton() {
  return (
    <h5 aria-hidden="true">
      <span className={BAR_HEADING} />
    </h5>
  );
}

/** Text-line placeholders for a loading part: hidden from assistive tech, with one status line in their place. */
export default function FooterSkeleton({ label, widths, className = '' }) {
  return (
    <>
      <p role="status" className="sr-only">{label}</p>
      {/* A flex column keeps the bars' vertical margins from collapsing into each other. */}
      <div aria-hidden="true" className={`flex flex-col ${className}`}>
        {widths.map((width, index) => (
          <span key={`${width}-${index}`} className={`${BAR} ${width}`} />
        ))}
      </div>
    </>
  );
}
