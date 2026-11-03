import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { usePengaturanSettings } from '@/hooks/usePublicLists';
import { safeHttpUrl } from '@/features/footer/resolveFooter';
import { NEW_TAB_HINT } from '@/utils/linkKind';
import { SECTION_MORE_BUTTON } from '../styles';
import { readMediaSosial } from '../mediaSosial';
import MediaSosialRow from './MediaSosialRow';
import MediaSosialPlayer from './MediaSosialPlayer';

const PROBE_URL = 'https://www.instagram.com/favicon.ico';
const PROBE_TIMEOUT_MS = 4000;
const LOAD_TIMEOUT_MS = 8000;

// Some school and office networks block Instagram; the probe tells that apart from a slow embed, once per page session.
let instagramReachable = null;
let instagramProbe = null;

function probeInstagram() {
  if (!instagramProbe) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
    instagramProbe = fetch(PROBE_URL, { mode: 'no-cors', cache: 'no-store', signal: controller.signal })
      .then(() => true, () => false)
      .then((reachable) => {
        clearTimeout(timer);
        instagramReachable = reachable;
        return reachable;
      });
  }
  return instagramProbe;
}

// About five tiles across a desktop row, fewer on tablets, and most of a phone's width so the next tile peeks in.
const TILE_WIDTH = 'w-[max(180px,calc((100%_-_80px)/5))] max-[600px]:w-[72%]';
const COVER_LIFT =
  'transition-[translate,scale,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ' +
  'group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_24px_rgba(9,140,76,0.16)] group-active:scale-[0.98] ' +
  'group-focus-visible:-translate-y-1.5 group-focus-visible:shadow-[0_12px_24px_rgba(9,140,76,0.16)] ' +
  'group-focus-visible:outline-3 group-focus-visible:outline-offset-3 group-focus-visible:outline-brand';

// Instagram's own gradient, so the mark reads as the platform at a glance.
const MARK = (
  <span
    className="inline-flex size-11 flex-none items-center justify-center rounded-card bg-[linear-gradient(45deg,#F9CE34_0%,#EE2A7B_50%,#6228D7_100%)] text-[24px] text-white"
    aria-hidden="true"
  >
    <i className="fa-brands fa-instagram"></i>
  </span>
);

// The cover is optional: without one, or when it fails to load, the caption fills the tile on the brand's light green.
// The mark sits bottom right because a reel's play badge takes the bottom left.
function InstagramCover({ item }) {
  const [failed, setFailed] = useState(false);
  if (item.coverUrl && !failed) {
    return (
      <img
        src={item.coverUrl}
        alt={item.title}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span className="block h-full bg-brand-light p-4" aria-hidden="true">
      <span className="font-heading line-clamp-5 text-[15px] leading-[1.4] font-extrabold break-words text-ink">{item.title}</span>
      <i className="fa-brands fa-instagram absolute right-3.5 bottom-3.5 text-[22px] text-brand-deep"></i>
    </span>
  );
}

function InstagramTile({ item, position, onOpen }) {
  const reel = item.kind === 'reel';
  return (
    <button
      type="button"
      className="group block w-full cursor-pointer rounded-panel text-left"
      onClick={onOpen}
      aria-label={`${item.title}, ${reel ? 'video' : 'postingan'}, ${position}, buka pemutar`}
    >
      <span data-media="" className={`relative block aspect-square overflow-hidden rounded-panel bg-card-alt shadow-soft ${COVER_LIFT}`}>
        <InstagramCover key={item.coverUrl ?? ''} item={item} />
        {reel && (
          <span
            className="absolute bottom-3 left-3 grid size-10 place-items-center rounded-full bg-brand-accent text-[14px] text-ink shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
            aria-hidden="true"
          >
            <i className="fa-solid fa-play"></i>
          </span>
        )}
      </span>
    </button>
  );
}

function InstagramPlayer({ item, onBlockedChange }) {
  const [phase, setPhase] = useState(() => {
    if (instagramReachable === null) return 'checking';
    return instagramReachable ? 'frame' : 'blocked';
  });

  useEffect(() => {
    if (phase !== 'checking') return undefined;
    let cancelled = false;
    probeInstagram().then((reachable) => {
      if (!cancelled) setPhase(reachable ? 'frame' : 'blocked');
    });
    return () => { cancelled = true; };
  }, [phase]);

  // The probe reached Instagram, so a late load means a slow embed: it stays mounted and the status stops spinning.
  useEffect(() => {
    if (phase !== 'frame') return undefined;
    const timer = setTimeout(() => setPhase('slow'), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    onBlockedChange(phase === 'blocked');
  }, [phase, onBlockedChange]);

  if (phase === 'blocked') {
    return (
      <div className="flex flex-col items-center gap-2.5 px-6 py-8 text-center" role="status">
        <i className="fa-solid fa-wifi text-[34px] text-ink-muted" aria-hidden="true"></i>
        <h3 className="text-[17px] font-bold">Instagram tidak dapat dibuka dari jaringan ini</h3>
        <p className="mb-1.5 max-w-[340px] text-[14px] leading-[1.6] text-ink-muted">
          Jaringan yang Anda pakai memblokir Instagram. Coba lewat jaringan lain, atau buka postingan ini langsung di Instagram.
        </p>
        <a
          className={`btn-pill primary ${SECTION_MORE_BUTTON} [transition-property:background-color,color,transform]! hover:bg-brand-deep! focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink`}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buka di Instagram
          <span className="sr-only"> {NEW_TAB_HINT}</span>
        </a>
      </div>
    );
  }

  // Fixed height with the embed scrolling inside, as on the Prestasi slides: Instagram's own chrome makes it tall.
  return (
    <div className="relative h-[620px] max-h-[min(64vh,calc(100dvh_-_var(--player-chrome)))] bg-card">
      {phase !== 'loaded' && (
        <p className="absolute inset-0 flex items-center justify-center gap-2 text-[13px] text-ink-muted" role="status">
          {phase === 'slow' ? (
            'Postingan belum termuat.'
          ) : (
            <>
              <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i>
              Memuat postingan…
            </>
          )}
        </p>
      )}
      {phase !== 'checking' && (
        <iframe
          className="relative block h-full w-full border-0"
          src={item.embedUrl}
          title={`Postingan Instagram: ${item.title}`}
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={() => setPhase('loaded')}
        />
      )}
    </div>
  );
}

export default function InstagramSection({ data }) {
  const titleId = useId();
  const { data: settings } = usePengaturanSettings();
  const { visible, items } = useMemo(() => readMediaSosial(data).instagram, [data]);
  const [openIndex, setOpenIndex] = useState(null);
  const [blocked, setBlocked] = useState(false);
  const openerRef = useRef(null);

  // Secondary, like the partner strip: the row shows only with posts to show, never as a loading or error state.
  if (!visible) return null;

  const profileHref = safeHttpUrl(settings?.['footer.instagramUrl']);
  const current = openIndex === null ? null : items[openIndex];
  const step = (delta) => setOpenIndex((index) => (index + delta + items.length) % items.length);

  return (
    <section className="section" aria-labelledby={titleId}>
      <div className="container">
        <MediaSosialRow
          titleId={titleId}
          mark={MARK}
          name="Instagram"
          profile={profileHref ? { href: profileHref, label: 'Lihat profil Instagram' } : null}
          label="Postingan Instagram"
          prevLabel="Postingan sebelumnya"
          nextLabel="Postingan berikutnya"
          items={items}
          slideClass={() => TILE_WIDTH}
          renderSlide={(item, index) => (
            <InstagramTile
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
          widthClass="max-w-[460px]"
          note={blocked ? null : {
            text: current.kind === 'reel' ? 'Video tidak muncul?' : 'Postingan tidak muncul?',
            href: current.url,
            label: 'Buka di Instagram'
          }}
          onPrev={items.length > 1 ? () => step(-1) : undefined}
          onNext={items.length > 1 ? () => step(1) : undefined}
          onClose={() => setOpenIndex(null)}
          returnFocusRef={openerRef}
        >
          <InstagramPlayer key={current.id} item={current} onBlockedChange={setBlocked} />
        </MediaSosialPlayer>
      )}
    </section>
  );
}
