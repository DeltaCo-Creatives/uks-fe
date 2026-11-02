import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/hooks/useCollapse';
import { NEW_TAB_HINT } from '@/utils/linkKind';
import { SECTION_MORE_BUTTON } from '../styles';

const PAGE_SHARE = 0.9;

const FOCUS_RING = 'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink';
// "!" beats the unlayered .btn-pill rules: its `all` transition would grow the focus ring in, and its hover green fails AA.
const PILL_FIX = '[transition-property:background-color,color,transform]! hover:bg-brand-deep!';
// Half outside the row; below 600px the page margin is too narrow for that, so they sit just inside its edges.
const ARROW = `absolute top-1/2 z-20 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-[#C9D3CC] bg-card text-[15px] text-ink shadow-[0_6px_18px_rgba(17,28,22,0.14)] hover:border-ink ${FOCUS_RING}`;
const ARROW_PREV = `${ARROW} left-[-22px] max-[600px]:left-1.5`;
const ARROW_NEXT = `${ARROW} right-[-22px] max-[600px]:right-1.5`;

// The scroller clips both axes: padding makes room for the hover lift and shadow, negative margins give it back.
const FRAME = 'relative -mx-2 -mt-4 -mb-9';
const TRACK = 'flex gap-5 px-2 pt-4 pb-9';
// Scroll padding equal to the track padding, or snapping parks the first card 8px in and the row loads scrolled.
const SCROLLER = 'snap-x snap-mandatory scroll-px-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';
const FADE_START = "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-14 before:bg-[linear-gradient(to_right,var(--bg-app),transparent)] before:content-['']";
const FADE_END = "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-[72px] after:bg-[linear-gradient(to_left,var(--bg-app),transparent)] after:content-['']";
// A keyboard-focused card and its ring must not sit under a fade.
const FADE_OFF_ON_FOCUS = 'has-[[data-slide]_:focus-visible]:before:hidden has-[[data-slide]_:focus-visible]:after:hidden';

/** Section header and card row: static while the cards fit, a carousel once they overflow. */
export default function MediaSosialRow({
  titleId, mark, name, profile, label, prevLabel, nextLabel, items, slideClass, renderSlide
}) {
  const headerRef = useRef(null);
  const rowRef = useRef(null);
  const trackRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const refocusRef = useRef(null);
  const trackId = useId();
  const [edges, setEdges] = useState({ overflowing: false, atStart: true, atEnd: true });
  const [arrowTop, setArrowTop] = useState(null);
  const count = items.length;
  const carousel = edges.overflowing;
  const showPrev = carousel && !edges.atStart;
  const showNext = carousel && !edges.atEnd;

  // App.jsx scans for reveals before this row has data, so the header fades itself in. The row's arrival shifts the
  // triggers below, so they re-measure once; this one re-measures until it plays, as content above may still load.
  useGSAP(() => {
    ScrollTrigger.refresh();
    if (prefersReducedMotion()) return undefined;
    let observer = null;
    const tween = gsap.fromTo(headerRef.current, { opacity: 0, y: 30 }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      onStart: () => observer?.disconnect(),
      scrollTrigger: { trigger: headerRef.current, start: 'top 90%', once: true }
    });
    if (typeof ResizeObserver === 'function') {
      observer = new ResizeObserver(() => {
        tween.scrollTrigger?.refresh();
        tween.scrollTrigger?.update();
      });
      observer.observe(document.body);
    }
    return () => observer?.disconnect();
  });

  useEffect(() => {
    const track = trackRef.current;
    const row = rowRef.current;
    if (!track || !row) return undefined;
    let live = true;

    const measure = () => {
      const max = track.scrollWidth - track.clientWidth;
      const next = { overflowing: max > 1, atStart: track.scrollLeft <= 1, atEnd: track.scrollLeft >= max - 1 };
      // A focused arrow about to disappear passes focus on after the render: to the other arrow, the track, or the first card.
      const active = document.activeElement;
      refocusRef.current = null;
      if (active && active === prevRef.current && (!next.overflowing || next.atStart)) refocusRef.current = nextRef;
      if (active && active === nextRef.current && (!next.overflowing || next.atEnd)) refocusRef.current = prevRef;
      setEdges((prev) => (
        prev.overflowing === next.overflowing && prev.atStart === next.atStart && prev.atEnd === next.atEnd ? prev : next
      ));
      // Centred on the image at the top of each card; offsetHeight ignores the hover lift.
      const media = track.querySelector('[data-media]');
      const slide = media?.closest('[data-slide]');
      setArrowTop(slide ? Math.round(slide.getBoundingClientRect().top - row.getBoundingClientRect().top + media.offsetHeight / 2) : null);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener('scroll', measure, { passive: true });
    document.fonts?.ready.then(() => live && measure());

    return () => {
      live = false;
      observer.disconnect();
      track.removeEventListener('scroll', measure);
    };
  }, [count]);

  useLayoutEffect(() => {
    const target = refocusRef.current;
    if (!target) return;
    refocusRef.current = null;
    const track = trackRef.current;
    (target.current ?? (track?.tabIndex === 0 ? track : track?.querySelector('button, a[href]')))?.focus();
  }, [edges]);

  const page = (direction) => {
    const track = trackRef.current;
    if (!track || (direction < 0 ? edges.atStart : edges.atEnd)) return;
    track.scrollBy({ left: direction * track.clientWidth * PAGE_SHARE, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    if (event.target === event.currentTarget) {
      page(direction);
      return;
    }
    // On a card the arrows move focus to its neighbour, which the browser scrolls into view.
    const slide = event.target.closest('[data-slide]');
    (direction > 0 ? slide?.nextElementSibling : slide?.previousElementSibling)?.querySelector('button, a[href]')?.focus();
  };

  const arrowStyle = arrowTop === null ? undefined : { top: arrowTop };

  return (
    <>
      <div ref={headerRef} className="section-header">
        <div>
          <span className="section-kicker">Media Sosial</span>
          <h2 id={titleId} className="section-title flex items-center gap-3.5">{mark}{name}</h2>
        </div>
        {profile && (
          <a
            className={`btn-pill primary ${SECTION_MORE_BUTTON} ${PILL_FIX} ${FOCUS_RING}`}
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {profile.label}
            <span className="sr-only"> {NEW_TAB_HINT}</span>
          </a>
        )}
      </div>

      <div ref={rowRef} className="relative">
        {showPrev && (
          <button ref={prevRef} type="button" className={ARROW_PREV} style={arrowStyle} aria-label={prevLabel} aria-controls={trackId} onClick={() => page(-1)}>
            <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </button>
        )}
        <div className={`${FRAME} ${showPrev ? FADE_START : ''} ${showNext ? FADE_END : ''} ${FADE_OFF_ON_FOCUS}`}>
          <div
            ref={trackRef}
            id={trackId}
            className={`${TRACK} ${SCROLLER} ${FOCUS_RING}`}
            role={carousel ? 'region' : undefined}
            aria-roledescription={carousel ? 'carousel' : undefined}
            aria-label={carousel ? label : undefined}
            tabIndex={carousel ? 0 : undefined}
            onKeyDown={carousel ? handleKeyDown : undefined}
          >
            {items.map((item, index) => (
              <div key={item.id} data-slide="" className={`flex-none snap-start ${slideClass(item)}`}>
                {renderSlide(item, index)}
              </div>
            ))}
          </div>
        </div>
        {showNext && (
          <button ref={nextRef} type="button" className={ARROW_NEXT} style={arrowStyle} aria-label={nextLabel} aria-controls={trackId} onClick={() => page(1)}>
            <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </button>
        )}
      </div>
    </>
  );
}
