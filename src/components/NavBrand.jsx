import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useConfirmRipple from '@/hooks/useConfirmRipple';
import { prefersReducedMotion } from '@/hooks/useCollapse';
import { HOVER_CAPABLE_QUERY } from '@/hooks/useHoverCapable';

const WORDMARK = '/Aset UKS/UKS-02.webp';
const MARK = '/Aset UKS/UKS-logo.svg';

// From/to vars of the entrance: the wordmark is wiped in left to right, a page loaded already scrolled fades in the round mark.
const ENTRANCE = {
  top: [
    { clipPath: 'inset(0 100% 0 0)', scale: 0.94, transformOrigin: 'left center' },
    { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 0.8, ease: 'expo.out', clearProps: 'clipPath,transform,transformOrigin' }
  ],
  scrolled: [
    { autoAlpha: 0, scale: 0.8 },
    { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out', clearProps: 'opacity,visibility,transform' }
  ]
};

// The entrance plays once per full page load, however often the navbar remounts.
let hasEntered = false;

// Both artworks stay mounted and crossfade as the bar shrinks; the box keeps its own CSS size transition.
export default function NavBrand({ scrolled, onClick }) {
  const wordmarkRef = useRef(null);
  const markRef = useRef(null);
  const bandRef = useRef(null);
  const swapRef = useRef(null);
  const shownScrolled = useRef(scrolled);
  // The stack is also the part that squeezes on click, so the box's own CSS transitions never fight GSAP.
  const { hostRef, ringRef, pressRef: stackRef, confirm } = useConfirmRipple();

  const { contextSafe } = useGSAP(() => {
    // Purpose: the wordmark gives way to the round mark in step with the bar shrinking; played forward or reversed by `scrolled`.
    swapRef.current = gsap.timeline({ paused: true })
      .fromTo(wordmarkRef.current, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 0.88, duration: 0.2, ease: 'power2.out' }, 0)
      .fromTo(markRef.current, { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.out' }, 0.3)
      .progress(scrolled ? 1 : 0);

    if (hasEntered || prefersReducedMotion()) return undefined;

    // Purpose: introduce the brand once per visit, the mark first and the text after it.
    const [from, to] = scrolled ? ENTRANCE.scrolled : ENTRANCE.top;
    const entrance = gsap.fromTo(stackRef.current, from, { ...to, paused: true, onStart: () => { hasEntered = true; } });
    // Hold the start state until the artwork is there, or the wipe would play over an empty box.
    const art = scrolled ? markRef.current : wordmarkRef.current;
    if (art.complete) {
      entrance.play();
      return undefined;
    }
    const start = () => entrance.play();
    art.addEventListener('load', start, { once: true });
    art.addEventListener('error', start, { once: true });
    return () => {
      art.removeEventListener('load', start);
      art.removeEventListener('error', start);
    };
  }, { scope: hostRef });

  useGSAP(() => {
    if (shownScrolled.current === scrolled) return;
    shownScrolled.current = scrolled;
    const swap = swapRef.current;
    if (!swap) return;

    if (prefersReducedMotion()) swap.pause().progress(scrolled ? 1 : 0);
    else if (scrolled) swap.play();
    else swap.reverse();
  }, { dependencies: [scrolled] });

  // Purpose: a single light sweep over the artwork on hover or keyboard focus, so the logo reads as clickable.
  const sweep = contextSafe((band) => gsap.fromTo(
    band,
    { xPercent: -120, autoAlpha: 1 },
    { xPercent: 260, duration: 0.8, ease: 'power2.inOut', clearProps: 'transform,opacity,visibility', overwrite: true }
  ));
  const shine = () => {
    if (!prefersReducedMotion()) sweep(bandRef.current);
  };

  // Taps do not hover, and a mouse click focuses without :focus-visible, so neither replays the sweep.
  const handlePointerEnter = (event) => {
    if (event.pointerType !== 'touch' && window.matchMedia(HOVER_CAPABLE_QUERY).matches) shine();
  };
  const handleFocus = (event) => {
    if (event.currentTarget.matches(':focus-visible')) shine();
  };
  const handleClick = (event) => {
    onClick?.(event);
    confirm();
  };

  return (
    <Link
      ref={hostRef}
      to="/"
      className="brand-icon-nav"
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onFocus={handleFocus}
      title="UKS Indonesia"
      aria-label="UKS Logo"
    >
      <span ref={stackRef} className="brand-logo-stack">
        <img ref={wordmarkRef} className="brand-logo-wordmark" src={WORDMARK} alt="" aria-hidden="true" />
        <img ref={markRef} className="brand-logo-mark" src={MARK} alt="" aria-hidden="true" />
        <span className="brand-logo-sheen" aria-hidden="true">
          <span ref={bandRef} className="brand-logo-sheen-band"></span>
        </span>
      </span>
      <span ref={ringRef} className="confirm-ring" aria-hidden="true"></span>
    </Link>
  );
}
