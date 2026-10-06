import { Link } from 'react-router-dom';
import SafeImage from '@/components/SafeImage';

/** Up to three sibling articles under a detail page. Renders nothing when there are none. */
export default function RelatedArticles({ articles, title, pathForItem }) {
  if (articles.length === 0) return null;

  return (
    <div>
      <div className="mb-5">
        <span className="section-kicker">Rekomendasi Terkini</span>
        <h3 className="my-1 text-[22px] font-extrabold text-ink">{title}</h3>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
        {articles.map((other) => (
          <Link key={other.id} to={pathForItem(other.slug)} className="news-card-playful flex flex-col">
            <div className="news-img-wrap">
              <SafeImage src={other.image} alt={other.title} />
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="section-kicker m-0! px-2! py-[3px]! text-[10px]!">{other.category}</span>
              <span className="text-[11px] font-semibold text-ink-muted">
                <i className="fa-regular fa-calendar mr-1"></i>
                {other.date}
              </span>
            </div>
            <h4 className="mt-1 mb-2 text-[16px] leading-[1.35] font-extrabold text-ink">{other.title}</h4>
            {/* "!" beats the unlayered `.news-card-playful p` spacing. */}
            <p className="mb-3.5! grow leading-[1.5]!">{other.excerpt}</p>
            <div className="mt-auto flex items-center justify-between border-t border-line pt-2.5">
              <span className="flex items-center gap-1.5 text-[12px] font-extrabold text-brand">
                <span>Baca Selengkapnya</span>
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
