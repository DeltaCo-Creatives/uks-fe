import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '@/hooks/useCollapse';

// How far the ring travels past the host's edge, so a wide host does not throw a huge ring over its neighbours.
const SPREAD = 12;
const reach = (size) => 1 + (2 * SPREAD) / size;

// Click confirmation: a quick press plus a brand ring rippling out; attach the refs, then call confirm() from the click handler.
export default function useConfirmRipple() {
  const hostRef = useRef(null);
  const ringRef = useRef(null);
  // The part that squeezes; leave it unattached to squeeze the whole host.
  const pressRef = useRef(null);
  const playing = useRef(null);
  const { contextSafe } = useGSAP({ scope: hostRef });

  const play = contextSafe((host, ring, press) => gsap.timeline()
    .to(press, { scale: 0.94, duration: 0.1, ease: 'power2.out' })
    .to(press, { scale: 1, duration: 0.3, ease: 'power3.out', clearProps: 'transform' })
    .fromTo(
      ring,
      { scaleX: 1, scaleY: 1, autoAlpha: 0.7 },
      {
        scaleX: reach(host.offsetWidth),
        scaleY: reach(host.offsetHeight),
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility'
      },
      0
    ));

  // Purpose: acknowledge a tap or Enter the instant it lands, without delaying what the control does.
  const confirm = () => {
    const host = hostRef.current;
    const ring = ringRef.current;
    if (!host || !ring || prefersReducedMotion()) return;
    playing.current?.revert();
    playing.current = play(host, ring, pressRef.current ?? host);
  };

  return { hostRef, ringRef, pressRef, confirm };
}
