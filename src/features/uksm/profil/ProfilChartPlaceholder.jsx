import { TodoTag } from '@/components/ContentPlaceholder';

/**
 * Honest stand-in for an org-chart image that has not been supplied yet.
 * Reserves the chart's real aspect ratio so the layout does not jump when the
 * image arrives.
 *
 * @param {{ chart: { title: string, source: string, width: number, height: number } }} props
 */
export default function ProfilChartPlaceholder({ chart }) {
  return (
    // profil-org-block is the hook ProfilStruktur's tab-change tween looks for; it carries no CSS.
    <figure className="profil-org-block m-0 max-[960px]:max-w-[560px]">
      {/* Dashed so it reads as "not here yet", not as a control. */}
      <div
        className="flex w-full flex-col items-center justify-center gap-2.5 rounded-card border-2 border-dashed border-[rgba(9,140,76,0.35)] bg-[rgba(9,140,76,0.04)] p-5 text-center"
        style={{ aspectRatio: `${chart.width} / ${chart.height}` }}
      >
        <i className="fa-solid fa-sitemap text-[28px] text-brand" aria-hidden="true"></i>
        <strong className="text-[15px] text-ink">Gambar bagan menyusul</strong>
        {import.meta.env.DEV && <TodoTag source={chart.source} />}
      </div>
      <figcaption className="mt-2.5 text-center text-[13px] leading-[1.5] text-ink-muted">{chart.title}</figcaption>
    </figure>
  );
}
