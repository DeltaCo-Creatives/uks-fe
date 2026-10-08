import { useId, useState } from 'react';
import ImageLightbox from '@/components/shared/ImageLightbox';
import ProfilChartPlaceholder from './ProfilChartPlaceholder';

/**
 * The official org chart, or the placeholder until the image is supplied (a chart with no `src`).
 *
 * The chart's text is small once it is shrunk to a phone, so tapping it opens the full-size view. It is a picture
 * of a hierarchy, so `description` is what screen readers get in its place.
 *
 * @param {{ chart: { title: string, src?: string, description?: string, source: string, width: number, height: number } }} props
 */
export default function ProfilChart({ chart }) {
  const [zoomed, setZoomed] = useState(false);
  const descriptionId = useId();

  if (!chart.src) return <ProfilChartPlaceholder chart={chart} />;

  return (
    // profil-org-block is the hook ProfilStruktur's tab-change tween looks for; it carries no CSS.
    <figure className="profil-org-block m-0 max-[960px]:max-w-[560px]">
      <button
        type="button"
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-card border-none bg-white p-0 shadow-raised focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand"
        onClick={() => setZoomed(true)}
        aria-label={`Perbesar ${chart.title}`}
        aria-describedby={chart.description ? descriptionId : undefined}
      >
        <img src={chart.src} alt="" width={chart.width} height={chart.height} className="block h-auto w-full" />
        <span
          className="absolute right-2.5 bottom-2.5 grid size-[34px] place-items-center rounded-[50%] bg-[rgba(17,28,22,0.78)] text-[13px] text-white group-hover:bg-ink"
          aria-hidden="true"
        >
          <i className="fa-solid fa-expand"></i>
        </span>
      </button>
      {chart.description && <p id={descriptionId} className="sr-only">{chart.description}</p>}
      <figcaption className="mt-2.5 text-center text-[13px] leading-[1.5] text-ink-muted">{chart.title}</figcaption>

      {zoomed && (
        <ImageLightbox
          image={{ src: chart.src, title: chart.title, alt: chart.description ? `${chart.title}. ${chart.description}` : chart.title }}
          onClose={() => setZoomed(false)}
        />
      )}
    </figure>
  );
}
