import { useId, useMemo, useRef, useState } from 'react';
import { usePengaturanSettings } from '@/hooks/usePublicLists';
import { safeHttpUrl } from '@/features/footer/resolveFooter';
import { isYoutubePlaceholder, readMediaSosial, youtubePlayerSrc } from '../mediaSosial';
import MediaSosialRow from './MediaSosialRow';
import MediaSosialPlayer from './MediaSosialPlayer';

// About four videos across a desktop row and most of a phone's width, so the next card peeks in.
const VIDEO_WIDTH = 'w-[max(230px,calc((100%_-_60px)/4))] max-[600px]:w-[80%]';
// A Short is as wide as a video thumbnail is tall, so every thumbnail in the row has the same height.
const SHORT_WIDTH = 'w-[max(calc(230px*9/16),calc((100%_-_60px)*9/64))] max-[600px]:w-[45%]';
const CARD_LIFT =
  'transition-[translate,scale,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ' +
  'hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(9,140,76,0.16)] active:scale-[0.98] ' +
  'focus-visible:-translate-y-1.5 focus-visible:shadow-[0_12px_24px_rgba(9,140,76,0.16)] ' +
  'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand';
const DISC =
  'grid size-14 place-items-center rounded-full bg-brand-accent text-[20px] text-ink shadow-[0_10px_24px_rgba(0,0,0,0.3)] ' +
  'transition-[background-color,color,scale] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ' +
  'group-hover:scale-[1.15] group-hover:bg-white group-hover:text-brand group-focus-visible:scale-[1.15] group-focus-visible:bg-white group-focus-visible:text-brand';
// The player fills the height the dialog's chrome leaves; the floor keeps the dialog wide enough for its own controls.
const PLAYER_WIDTH = {
  video: 'max-w-[min(960px,max(320px,calc((100dvh_-_var(--player-chrome))*16/9)))]',
  short: 'max-w-[min(420px,max(280px,calc((100dvh_-_var(--player-chrome))*9/16)))]'
};
const PLAYER_BOX = {
  video: 'aspect-video w-[min(100%,calc((100dvh_-_var(--player-chrome))*16/9))]',
  short: 'aspect-[9/16] w-[min(100%,calc((100dvh_-_var(--player-chrome))*9/16))]'
};

// YouTube's red play mark on white, as the platform shows it.
const MARK = (
  <span className="inline-flex h-11 w-12 flex-none items-center justify-center rounded-card bg-white text-[34px] text-[#FF0033]" aria-hidden="true">
    <i className="fa-brands fa-youtube"></i>
  </span>
);

// The large size first, then the fallback; when both fail the dark frame stays as a neutral placeholder.
function YoutubeThumb({ item }) {
  const sources = [item.thumbnailUrl, item.thumbnailFallbackUrl].filter(Boolean);
  const [attempt, setAttempt] = useState(0);
  const src = sources[attempt];
  if (!src) return null;

  const next = () => setAttempt((value) => value + 1);
  return (
    <img
      key={src}
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
      onLoad={(event) => { if (isYoutubePlaceholder(event.currentTarget)) next(); }}
      onError={next}
    />
  );
}

function YoutubeCard({ item, position, onOpen }) {
  const short = item.kind === 'short';
  return (
    <button
      type="button"
      className={`group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-card bg-card text-left shadow-soft ${CARD_LIFT}`}
      onClick={onOpen}
      aria-label={[item.title, short && 'Shorts', item.channelName, position, 'putar video'].filter(Boolean).join(', ')}
    >
      <span data-media="" className={`relative block w-full overflow-hidden bg-ink ${short ? 'aspect-square' : 'aspect-video'}`}>
        <YoutubeThumb item={item} />
        <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
          <span className={DISC}>
            <i className="fa-solid fa-play"></i>
          </span>
        </span>
      </span>
      <span className="block px-4 pt-3.5 pb-4">
        <span className="font-heading line-clamp-2 min-h-[2.8em] text-[15px] leading-[1.4] font-extrabold break-words" title={item.title}>
          {item.title}
        </span>
        {(short || item.channelName) && (
          <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-ink-muted">
            {short && <span className="rounded-[6px] bg-brand-light px-[7px] py-0.5 text-[11px] font-bold text-brand-deep">Shorts</span>}
            {item.channelName && <span className="min-w-0 truncate">{item.channelName}</span>}
          </span>
        )}
      </span>
    </button>
  );
}

function YoutubePlayer({ item }) {
  return (
    <div className="bg-ink">
      <div className={`mx-auto ${item.kind === 'short' ? PLAYER_BOX.short : PLAYER_BOX.video}`}>
        <iframe
          className="block h-full w-full border-0"
          src={youtubePlayerSrc(item.embedUrl)}
          title={`Pemutar YouTube: ${item.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function YoutubeSection({ data }) {
  const titleId = useId();
  const { data: settings } = usePengaturanSettings();
  const { visible, items } = useMemo(() => readMediaSosial(data).youtube, [data]);
  const [openIndex, setOpenIndex] = useState(null);
  const openerRef = useRef(null);

  // Secondary, like the partner strip: the row shows only with videos to show, never as a loading or error state.
  if (!visible) return null;

  const profileHref = safeHttpUrl(settings?.['footer.youtubeUrl']);
  const current = openIndex === null ? null : items[openIndex];
  const step = (delta) => setOpenIndex((index) => (index + delta + items.length) % items.length);

  return (
    <section className="section" aria-labelledby={titleId}>
      <div className="container">
        <MediaSosialRow
          titleId={titleId}
          mark={MARK}
          name="YouTube"
          profile={profileHref ? { href: profileHref, label: 'Lihat kanal YouTube' } : null}
          label="Video YouTube"
          prevLabel="Video sebelumnya"
          nextLabel="Video berikutnya"
          items={items}
          slideClass={(item) => (item.kind === 'short' ? SHORT_WIDTH : VIDEO_WIDTH)}
          renderSlide={(item, index) => (
            <YoutubeCard
              item={item}
              position={`${index + 1} dari ${items.length}`}
              onOpen={(event) => {
                openerRef.current = event.currentTarget;
                setOpenIndex(index);
              }}
            />
          )}
        />
      </div>

      {current && (
        <MediaSosialPlayer
          title={current.title}
          position={`${openIndex + 1} dari ${items.length}`}
          widthClass={current.kind === 'short' ? PLAYER_WIDTH.short : PLAYER_WIDTH.video}
          note={{ href: current.url, label: 'Tonton di YouTube' }}
          onPrev={items.length > 1 ? () => step(-1) : undefined}
          onNext={items.length > 1 ? () => step(1) : undefined}
          onClose={() => setOpenIndex(null)}
          returnFocusRef={openerRef}
        >
          <YoutubePlayer key={current.id} item={current} />
        </MediaSosialPlayer>
      )}
    </section>
  );
}
