import { TodoTag } from '../../ContentPlaceholder';

/**
 * Honest stand-in for an org-chart image that has not been supplied yet.
 * Reserves the chart's real aspect ratio so the layout does not jump when the
 * image arrives.
 *
 * @param {{ chart: { title: string, source: string, width: number, height: number } }} props
 */
export default function ProfilChartPlaceholder({ chart }) {
  return (
    <figure className="profil-org-block profil-chart-slot">
      <div className="profil-chart-frame" style={{ aspectRatio: `${chart.width} / ${chart.height}` }}>
        <i className="fa-solid fa-sitemap" aria-hidden="true"></i>
        <strong>Gambar bagan menyusul</strong>
        {import.meta.env.DEV && <TodoTag source={chart.source} />}
      </div>
      <figcaption>{chart.title}</figcaption>
    </figure>
  );
}
