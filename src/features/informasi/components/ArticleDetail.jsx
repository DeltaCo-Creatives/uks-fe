import { Link, useParams } from 'react-router-dom';
import SafeImage from '@/components/SafeImage';
import NotFoundView from '@/components/NotFoundView';
import RelatedArticles from './RelatedArticles';

const PAGE = 'container max-w-[980px] px-5 pt-6 pb-20';
// "!" beats the unlayered .about-bento-frame, which also clears its surface and padding on phones.
const FRAME = 'about-bento-frame bg-white! p-[clamp(24px,4vw,44px)]!';
const STATE_ICON = 'mb-3 text-[28px]';
const PILL_OUTLINE = 'bg-app border! border-[rgba(0,0,0,0.08)]!';
const META_ITEM = 'inline-flex items-center gap-1.5 text-[13px] text-ink-muted';

// Article body: HTML sanitized server-side. Scoped so embedded markup matches the
// article typography and never overflows a phone screen.
const ARTICLE_HTML =
  'flex flex-col gap-5 text-[16px] leading-[1.85] text-[#1E293B] [&_p]:m-0 ' +
  '[&_:is(h2,h3,h4)]:mt-2 [&_:is(h2,h3,h4)]:leading-[1.35] [&_:is(h2,h3,h4)]:font-extrabold [&_:is(h2,h3,h4)]:text-ink ' +
  '[&_a]:font-bold [&_a]:text-brand [&_a]:[word-break:break-word] ' +
  '[&_:is(ul,ol)]:m-0 [&_:is(ul,ol)]:pl-6 [&_li]:mb-2 ' +
  '[&_blockquote]:m-0 [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-5 [&_blockquote]:text-ink-muted [&_blockquote]:italic ' +
  '[&_img]:block [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-card ' +
  '[&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:border-collapse ' +
  '[&_:is(th,td)]:border [&_:is(th,td)]:border-[rgba(0,0,0,0.1)] [&_:is(th,td)]:px-3 [&_:is(th,td)]:py-2 [&_:is(th,td)]:text-left ' +
  '[&_iframe]:max-w-full [&_iframe]:rounded-card [&_iframe]:border-0 ' +
  // YouTube embeds ship at a fixed pixel size; force 16:9 so they scale down instead of overflowing.
  '[&_iframe:is([src*=youtube],[src*="youtu.be"])]:aspect-video [&_iframe:is([src*=youtube],[src*="youtu.be"])]:h-auto [&_iframe:is([src*=youtube],[src*="youtu.be"])]:w-full';

/**
 * Article-style detail page (Warta, UPT Bercerita). `config` carries the data hooks,
 * where "back" goes, the related-list link target and the page copy. Hooks are called
 * as `config.useDetail()`, so a config must stay the same object for the life of a
 * mounted component.
 */
export default function ArticleDetail({ config }) {
  const { idOrSlug } = useParams();
  const { data: article, loading, error } = config.useDetail(idOrSlug);
  const { data: relatedList } = config.useRelated();

  if (loading) {
    return (
      <div className={PAGE}>
        <div className={`${FRAME} text-center`} role="status" aria-live="polite">
          <i className={`fa-solid fa-circle-notch fa-spin ${STATE_ICON} text-brand`} aria-hidden="true"></i>
          <p className="m-0 font-semibold text-ink-muted">{config.loadingLabel}</p>
        </div>
      </div>
    );
  }

  if (error?.status === 404 || (!error && !article)) {
    return <NotFoundView />;
  }

  if (error) {
    return (
      <div className={PAGE}>
        <div className={`${FRAME} text-center`}>
          <i className={`fa-solid fa-triangle-exclamation ${STATE_ICON} text-[#DC2626]`} aria-hidden="true"></i>
          <h2 className="mb-2 text-[18px] font-extrabold text-ink">{config.errorTitle}</h2>
          <p className="mb-4 text-ink-muted">{config.errorText}</p>
          <Link to={config.backTo} className="btn-pill secondary px-5! py-2.5!">
            {config.backLabel}
          </Link>
        </div>
      </div>
    );
  }

  const otherArticles = (relatedList || []).filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <div className={PAGE}>
      <div className={`${FRAME} mb-9`}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="section-kicker m-0! px-3.5! py-[5px]! text-[11px]! text-brand!">
            {article.category}
          </span>
          <span className={META_ITEM}>
            <i className="fa-regular fa-calendar"></i>
            {article.date}
          </span>
          {article.region && (
            <span className={META_ITEM}>
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              {article.region}
            </span>
          )}
        </div>

        <h1 className="mb-4 text-[clamp(24px,3.8vw,38px)] leading-[1.25] font-extrabold text-ink">
          {article.title}
        </h1>

        {article.author && (
          <div className="mb-6 flex items-center gap-2.5 text-[13px] text-ink-muted">
            <div className="flex size-8 items-center justify-center rounded-full bg-brand text-[14px] text-white">
              <i className="fa-solid fa-feather-pointed"></i>
            </div>
            <span>Oleh: <strong className="text-ink">{article.author}</strong></span>
          </div>
        )}

        <div className="mb-8 max-h-[440px] w-full overflow-hidden rounded-card shadow-raised">
          <SafeImage src={article.image} alt={article.title} className="block size-full object-cover" />
        </div>

        <p className="mb-7 border-l-4 border-brand pl-5 text-[clamp(16px,1.8vw,18px)] leading-[1.7] font-semibold text-brand italic">
          {article.excerpt}
        </p>

        {article.content ? (
          <div className={ARTICLE_HTML} dangerouslySetInnerHTML={{ __html: article.content }} />
        ) : (
          <p className="m-0 text-[16px] leading-[1.85] text-[#1E293B]">{article.excerpt}</p>
        )}

        {article.sourceUrl && (
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-pill mt-6 px-5! py-2.5! ${PILL_OUTLINE}`}
          >
            Baca artikel asli di portal Kemendikdasmen
            <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
          </a>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(0,0,0,0.08)] pt-6">
          <Link to={config.backTo} className="btn-pill secondary px-5! py-2.5!">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            {config.backLabel}
          </Link>

          <div className="flex items-center gap-2.5">
            <span className="text-[13px] font-bold text-ink-muted">Bagikan:</span>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert(config.copiedMessage);
                }
              }}
              className={`btn-pill px-3.5! py-2! text-[12px]! ${PILL_OUTLINE}`}
              title="Salin Tautan"
            >
              <i className="fa-solid fa-copy mr-1.5"></i> Salin Tautan
            </button>
          </div>
        </div>
      </div>

      <RelatedArticles articles={otherArticles} title={config.relatedTitle} pathForItem={config.pathForItem} />
    </div>
  );
}
