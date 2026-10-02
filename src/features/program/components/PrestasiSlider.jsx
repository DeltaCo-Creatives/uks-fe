import { useEffect, useRef, useState } from 'react';
import PrestasiSlide from './PrestasiSlide';

const VISIBLE_RATIO = 0.5;

const ARROW = 'flex size-11 flex-none cursor-pointer items-center justify-center rounded-[999px] border-2 border-ink bg-card text-ink [transition:var(--spring)] enabled:hover:bg-ink enabled:hover:text-card disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink';

/**
 * A responsive number of winners per slide (1 phone, 2 tablet, 3 desktop,
 * set on PrestasiSlide) on a native scroll-snap track: swipe on touch works
 * for free, the arrows page by a screenful via scrollBy(track.clientWidth)
 * so they never need to know how many slides fit. Only slides more than half
 * inside the track mount an iframe, so 3-up desktop never means more than 3
 * live embeds and the other winners stay as lightweight fallback cards.
 *
 * @param {{ winners: Array<object> }} props
 */
export default function PrestasiSlider({ winners }) {
  const trackRef = useRef(null);
  const [view, setView] = useState(() => ({ visible: new Set([0]), atStart: true, atEnd: false }));
  const total = winners.length;
  const { visible: visibleIndices, atStart, atEnd } = view;

  // Measured from the track's own geometry rather than an IntersectionObserver:
  // an observer reports nothing until the page composites, so a tab that opens
  // in the background would mount one slide and never correct itself.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const measure = () => {
      const bounds = track.getBoundingClientRect();
      const visible = new Set();
      for (const slide of track.querySelectorAll('[data-index]')) {
        const rect = slide.getBoundingClientRect();
        const shown = Math.min(rect.right, bounds.right) - Math.max(rect.left, bounds.left);
        if (shown > rect.width * VISIBLE_RATIO) visible.add(Number(slide.dataset.index));
      }
      const maxScroll = track.scrollWidth - track.clientWidth;
      setView({
        visible: visible.size ? visible : new Set([0]),
        atStart: track.scrollLeft <= 1,
        atEnd: track.scrollLeft >= maxScroll - 1
      });
    };

    measure();
    track.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      track.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [total]);

  const page = (direction) => {
    const track = trackRef.current;
    track?.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' && !atEnd) {
      event.preventDefault();
      page(1);
    } else if (event.key === 'ArrowLeft' && !atStart) {
      event.preventDefault();
      page(-1);
    }
  };

  const sortedVisible = [...visibleIndices].sort((a, b) => a - b);
  const first = sortedVisible[0] ?? 0;
  const last = sortedVisible[sortedVisible.length - 1] ?? 0;
  const counterLabel = first === last ? `${first + 1} / ${total}` : `${first + 1}-${last + 1} / ${total}`;

  // The one column is pinned to minmax(0, 1fr): an auto column would size to the track's full
  // scroll width and paint past the card, inflating the page's scroll width.
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-3">
      <div
        ref={trackRef}
        // Paint containment keeps the clipped off-screen slides out of the document's scroll width.
        className="flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [contain:paint] [scrollbar-width:none] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ink [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Video pemenang"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {winners.map((winner, index) => (
          <PrestasiSlide
            key={`${winner.jenjang}-${winner.kategori}-${winner.school}`}
            winner={winner}
            index={index}
            total={total}
            isVisible={visibleIndices.has(index)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          className={ARROW}
          onClick={() => page(-1)}
          disabled={atStart}
          aria-label="Pemenang sebelumnya"
        >
          <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
        </button>
        <span className="min-w-14 text-center text-[13px] font-bold text-ink-muted tabular-nums">{counterLabel}</span>
        <button
          type="button"
          className={ARROW}
          onClick={() => page(1)}
          disabled={atEnd}
          aria-label="Pemenang berikutnya"
        >
          <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
