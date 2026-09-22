import ProgramLink from './ProgramLink';
import { socialPlatformLabel, stageEmbed } from '../../utils/prestasiEmbed';

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
      className="prestasi-slide"
      data-index={index}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} dari ${total}`}
      inert={!isVisible}
    >
      <div className={`prestasi-slide-media${embed ? ` is-${embed.kind}` : ' is-offsite'}`}>
        {/* Sits behind the iframe. A blocked embed (tracking protection, ad
            blocker) leaves the iframe box genuinely empty, so this shows
            through instead of the white void the real embed would paint
            while loading normally. */}
        <div className="prestasi-slide-fallback">
          <i className={`fa-brands ${PLATFORM_ICON[platform.kind]}`} aria-hidden="true"></i>
          <strong>{winner.school}</strong>
          <ProgramLink url={platform.url} className="prog-inline-link">Buka di {platform.label}</ProgramLink>
        </div>
        {isVisible && embed && (
          <iframe
            key={embed.src}
            className="prestasi-slide-frame"
            src={embed.src}
            title={`Video ${winner.school} (${embed.label})`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>

      <div className="prestasi-slide-info">
        <span className="prestasi-slide-kategori">{winner.kategori}</span>
        <h4>{winner.school}</h4>
        <p>{winner.kabkota}, {winner.provinsi}</p>
        <div className="prestasi-slide-links">
          {winner.youtube && <ProgramLink url={winner.youtube} className="prog-inline-link">YouTube</ProgramLink>}
          {winner.social && (
            <ProgramLink url={winner.social} className="prog-inline-link">{socialPlatformLabel(winner.social)}</ProgramLink>
          )}
        </div>
      </div>
    </div>
  );
}
