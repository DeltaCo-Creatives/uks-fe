import ProgramLink from './ProgramLink';
import { socialPlatformLabel, stageEmbed } from '@/utils/prestasiEmbed';
import { INLINE_LINK } from '../styles';

/* Media box per embed kind. YouTube shorts are pure 9:16 video, so the box fits them exactly.
   Instagram and TikTok wrap the video in their own chrome (about 690px tall at 300px wide), so they
   get a fixed height that scrolls rather than a ratio that would clip them. */
const MEDIA = {
  youtube: 'aspect-[9/16] max-h-[520px]',
  instagram: 'h-[700px] max-h-[78vh] overflow-y-auto max-[600px]:h-[560px] max-[600px]:max-h-[70vh]',
  tiktok: 'h-[700px] max-h-[78vh] overflow-y-auto max-[600px]:h-[560px] max-[600px]:max-h-[70vh]',
  offsite: 'aspect-[9/16] max-h-[400px]'
};

const PLATFORM_ICON = { youtube: 'fa-youtube', instagram: 'fa-instagram', tiktok: 'fa-tiktok' };

function platformInfo(winner, embed) {
  if (embed) {
    return { kind: embed.kind, label: embed.label, url: embed.kind === 'youtube' ? winner.youtube : winner.social };
  }
  const kind = winner.social?.includes('tiktok.com') ? 'tiktok' : 'instagram';
  return { kind, label: socialPlatformLabel(winner.social), url: winner.social };
}

/**
 * One winner's slide: media over a fallback card, school details below.
 * Only slides the IntersectionObserver marks sufficiently visible mount an
 * iframe (up to 3 on desktop, 1 on a phone); the rest keep the fallback as
 * a lightweight placeholder. Non-visible slides are `inert` so they are
 * never reachable-but-invisible to keyboard or screen reader users while
 * scrolled off the track.
 *
 * @param {{ winner: object, index: number, total: number, isVisible: boolean }} props
 */
export default function PrestasiSlide({ winner, index, total, isVisible }) {
  const embed = stageEmbed(winner);
  const platform = platformInfo(winner, embed);

  return (
    <div
      // 3 slides in view on desktop, 2 on tablet, 1 on phones; the counter and arrows say there are more.
      className="w-[calc((100%_-_32px)/3)] flex-none snap-start max-[900px]:w-[calc((100%_-_16px)/2)] max-[600px]:w-full"
      data-index={index}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} dari ${total}`}
      inert={!isVisible}
    >
      <div className={`relative mx-auto w-[min(320px,100%)] overflow-hidden rounded-card bg-card ${MEDIA[embed ? embed.kind : 'offsite']}`}>
        {/* Sits behind the iframe. A blocked embed (tracking protection, ad
            blocker) leaves the iframe box genuinely empty, so this shows
            through instead of the white void the real embed would paint
            while loading normally. */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-5 text-center text-[13px] leading-[1.5] text-ink-muted [&_i]:text-[28px] [&_i]:text-brand [&_strong]:text-[14px] [&_strong]:text-ink">
          <i className={`fa-brands ${PLATFORM_ICON[platform.kind]}`} aria-hidden="true"></i>
          <strong>{winner.school}</strong>
          <ProgramLink url={platform.url} className={INLINE_LINK}>Buka di {platform.label}</ProgramLink>
        </div>
        {isVisible && embed && (
          <iframe
            key={embed.src}
            // Positioned so the real embed paints over the absolutely positioned fallback.
            className="relative z-[1] block h-full w-full border-none"
            src={embed.src}
            title={`Video ${winner.school} (${embed.label})`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>

      <div className="mx-auto flex w-[min(320px,100%)] flex-col gap-1.5">
        <span className="text-[12px] font-extrabold text-brand-deep">{winner.kategori}</span>
        <h4 className="text-[18px] leading-[1.3] font-extrabold">{winner.school}</h4>
        <p className="text-[13px] text-ink-muted">{winner.kabkota}, {winner.provinsi}</p>
        <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
          {winner.youtube && <ProgramLink url={winner.youtube} className={INLINE_LINK}>YouTube</ProgramLink>}
          {winner.social && (
            <ProgramLink url={winner.social} className={INLINE_LINK}>{socialPlatformLabel(winner.social)}</ProgramLink>
          )}
        </div>
      </div>
    </div>
  );
}
