import { Link, useParams } from 'react-router-dom';
import { pathForAgenda, pathForTab } from '@/routes';
import { useAgenda } from '@/hooks/usePublicLists';
import { useNavConfig } from '@/hooks/useNavConfig';
import { usePageMeta, NOT_FOUND_META } from '@/hooks/usePageMeta';
import { isImageUrl } from '@/utils/agendaMedia';
import { embedUrl, linkKind, NEW_TAB_HINT } from '@/utils/linkKind';
import { sanitizeHtml } from '@/utils/sanitizeHtml';
import SafeImage from './SafeImage';
import { LoadingState, ErrorState } from './shared/AsyncState';
import NotFoundView from './NotFoundView';
import './BeritaDetailView.css';

const PAGE = 'container max-w-[980px] px-5 pt-6 pb-20';
// "!" beats the unlayered .about-bento-frame background and padding.
const FRAME = 'about-bento-frame bg-card! p-[clamp(24px,4vw,44px)]!';
const SIDE_LINK = 'inline-flex items-center gap-2 text-[14px] font-bold text-brand-deep hover:underline';
const YOUTUBE_EMBED = 'https://www.youtube-nocookie.com/embed/';

/** A YouTube attachment plays inline: the privacy-friendly embed URL, or null for any other link. */
const youtubeSrc = (url) => {
  const src = embedUrl(url);
  return src?.startsWith(YOUTUBE_EMBED) ? src : null;
};

/** Detail of one agenda entry: date, facts, images, rich-text description, videos and links. */
export default function AgendaDetailView() {
  const { itemSlug, submenuSlug } = useParams();
  const { data: item, loading, error, retry } = useAgenda(itemSlug);
  const tabSlug = item?.submenuSlug ?? submenuSlug;
  const tabLabel = useNavConfig().informasi.sections.find((s) => s.slug === tabSlug)?.label;
  // The NotFoundView below sets this too, but a parent's effect runs last, so the parent has to agree.
  const notFound = !loading && (error?.status === 404 || (!error && !item));
  usePageMeta(notFound ? NOT_FOUND_META : {
    title: item?.title ?? tabLabel,
    description: item?.description,
    // The item resolves under any submenu slug; the canonical is the one in its own submenu.
    path: item && pathForAgenda(item.slug, item.submenuSlug)
  });
  const back = (
    <Link to={pathForTab('informasi', tabSlug)} className="btn-pill secondary px-5 py-2.5">
      <i className="fa-solid fa-arrow-left" aria-hidden="true"></i> Kembali ke {tabLabel ?? 'Daftar'}
    </Link>
  );

  if (loading) return <div className={PAGE}><div className={FRAME}><LoadingState label="Memuat agenda..." /></div></div>;
  if (error?.status === 404) return <NotFoundView />;
  if (error) {
    return (
      <div className={PAGE}>
        <div className={FRAME}>
          <ErrorState title="Agenda tidak dapat dimuat" retry={retry} />
          <div className="mt-4 text-center">{back}</div>
        </div>
      </div>
    );
  }
  if (!item) return <NotFoundView />;

  const facts = [
    ['fa-solid fa-user-group', item.organizer],
    ['fa-solid fa-location-dot', item.location],
    ['fa-solid fa-circle-info', item.status]
  ].filter(([, text]) => text);
  const media = item.media ?? [];
  const images = media.filter(isImageUrl);
  const attachments = media.filter((url) => !isImageUrl(url));
  const videos = attachments.filter(youtubeSrc);
  const links = attachments.filter((url) => !youtubeSrc(url));

  return (
    <div className={PAGE}>
      <article className={FRAME}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {item.category && <span className="section-kicker m-0!">{item.category}</span>}
          <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted">
            <i className="fa-regular fa-calendar" aria-hidden="true"></i>
            {item.dateLabel}
          </span>
        </div>

        <h1 className="mb-4 text-[clamp(24px,3.8vw,38px)] leading-[1.25] font-extrabold text-ink">{item.title}</h1>

        {facts.length > 0 && (
          <ul className="mb-7 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-[14px] text-ink-muted">
            {facts.map(([icon, text]) => (
              <li key={icon} className="flex items-center gap-1.5">
                <i className={`${icon} text-brand`} aria-hidden="true"></i>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        )}

        {images.map((url) => (
          <SafeImage key={url} src={url} alt={item.title} className="mb-7 max-h-[440px] w-full rounded-card object-cover shadow-raised" />
        ))}

        {/* Sanitized server-side and again here, rendered as HTML like the berita body. No description, no box. */}
        {item.description && (
          <div className="article-html-content text-[16px] leading-[1.85] text-ink" dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }} />
        )}

        {videos.map((url) => (
          <iframe
            key={url}
            src={youtubeSrc(url)}
            title={`Video ${item.title}`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="mt-7 aspect-video w-full rounded-card border-0"
          />
        ))}

        {(item.registrationUrl || links.length > 0) && (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule-soft pt-6">
            {item.registrationUrl && (
              <a
                href={item.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill primary px-6 py-3 no-underline"
                aria-label={`Daftar ${NEW_TAB_HINT}`}
              >
                Daftar <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            )}
            {links.map((url) => {
              const kind = linkKind(url);
              return (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer" className={SIDE_LINK}>
                  <i className={kind.icon} aria-hidden="true"></i> {kind.label}
                  <span className="sr-only"> {NEW_TAB_HINT}</span>
                </a>
              );
            })}
          </div>
        )}

        <div className="mt-10 border-t border-rule-soft pt-6">{back}</div>
      </article>
    </div>
  );
}
