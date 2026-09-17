import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const NAV_OFFSET = 96;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Smooth height/fade open-close for conditionally rendered content. Keeps the
 * content mounted until the close tween ends; skips the animation on first
 * render and when the user prefers reduced motion.
 *
 * @param {boolean} isOpen
 * @param {{ keepInView?: boolean }} [options] keepInView: after opening, scroll
 *   the element back under the navbar if earlier content collapsing pushed it up.
 * @returns {{ ref: import('react').RefObject<HTMLElement>, mounted: boolean }}
 */
export default function useCollapse(isOpen, { keepInView = false } = {}) {
  const ref = useRef(null);
  const previousOpen = useRef(isOpen);
  const [mounted, setMounted] = useState(isOpen);

  if (isOpen && !mounted) setMounted(true);

  useGSAP(() => {
    if (previousOpen.current === isOpen) return;
    previousOpen.current = isOpen;

    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      if (!isOpen) setMounted(false);
      return;
    }

    gsap.killTweensOf(el);

    if (isOpen) {
      gsap.set(el, { clearProps: 'height,opacity,overflow' });
      gsap.from(el, {
        height: 0,
        opacity: 0,
        overflow: 'hidden',
        duration: 0.42,
        ease: 'power2.out',
        clearProps: 'height,opacity,overflow',
        onComplete: () => {
          if (!keepInView) return;
          const top = el.parentElement?.getBoundingClientRect().top ?? 0;
          if (top < NAV_OFFSET) window.scrollBy({ top: top - NAV_OFFSET, behavior: 'smooth' });
        }
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        overflow: 'hidden',
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => setMounted(false)
      });
    }
  }, { dependencies: [isOpen] });

  return { ref, mounted };
}
