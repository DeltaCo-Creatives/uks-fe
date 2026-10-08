import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '@/hooks/useCollapse';

// Typing counts as finished once the query has been still this long.
const SETTLE_MS = 300;
// Past this many results the cascade stops; the rest are simply there.
const CASCADE_LIMIT = 12;

// Settled-query feedback for a live search; `status` ('idle' | 'loading' | 'results' | 'empty') is what the results show, and the parts inside `scopeRef` carry data-search-glow, -count, -item and -empty.
export default function useSearchFeedback(scopeRef, query, status) {
  const [settled, setSettled] = useState(query);
  // The settled query already acknowledged, so repeating it stays quiet; the page's first query is its own.
  const acknowledged = useRef(query.trim());

  useEffect(() => {
    // Clearing settles straight away: there is nothing left to confirm.
    const timer = setTimeout(() => setSettled(query), query.trim() ? SETTLE_MS : 0);
    return () => clearTimeout(timer);
  }, [query]);

  // Purpose: results change on every keystroke, so one calm confirmation once typing stops says the search landed.
  useGSAP(() => {
    const trimmed = settled.trim();
    if (!trimmed) {
      acknowledged.current = '';
      return;
    }
    const landed = status === 'results' || status === 'empty';
    if (!landed || trimmed !== query.trim() || trimmed === acknowledged.current) return;

    acknowledged.current = trimmed;
    if (prefersReducedMotion()) return;

    const pick = (selector) => gsap.utils.toArray(selector, scopeRef.current);
    if (status === 'empty') {
      const empty = pick('[data-search-empty]');
      if (empty.length) gsap.from(empty, { autoAlpha: 0, duration: 0.35, ease: 'power2.out', clearProps: 'opacity,visibility' });
      return;
    }

    const glow = pick('[data-search-glow]');
    const counts = pick('[data-search-count]');
    const items = pick('[data-search-item]').slice(0, CASCADE_LIMIT);
    const timeline = gsap.timeline();
    if (glow.length) {
      timeline
        .fromTo(glow, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' }, 0)
        .to(glow, { autoAlpha: 0, duration: 0.4, ease: 'power2.inOut', clearProps: 'opacity,visibility' }, 0.2);
    }
    if (counts.length) {
      timeline
        .to(counts, { '--flash': 1, duration: 0.15, ease: 'power2.out' }, 0.1)
        .to(counts, { '--flash': 0, duration: 0.85, ease: 'power2.inOut', clearProps: '--flash' }, 0.25);
    }
    if (items.length) {
      timeline.from(
        items,
        { y: 12, autoAlpha: 0, duration: 0.45, ease: 'power2.out', stagger: 0.04, clearProps: 'opacity,visibility,transform' },
        0.05
      );
    }
  }, { dependencies: [settled, query, status], scope: scopeRef, revertOnUpdate: true });

  // Kept apart from the effect above, which reverts on every query change and would cut the pulse short.
  const { contextSafe } = useGSAP({ scope: scopeRef });

  // Purpose: the chip you pressed answers with a small squeeze before its results arrive.
  const pulse = contextSafe((el) => {
    if (!el || prefersReducedMotion()) return;
    gsap.fromTo(el, { scale: 0.95 }, { scale: 1, duration: 0.35, ease: 'power3.out', clearProps: 'transform', overwrite: true });
  });

  return { settleNow: setSettled, pulse };
}
