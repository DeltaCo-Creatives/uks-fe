import { useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useConfirmRipple from '@/hooks/useConfirmRipple';
import { prefersReducedMotion } from '@/hooks/useCollapse';

// The search button of the bar; `ref.confirm()` replays its confirmation for the mobile drawer, which closes on tap.
export default function NavSearchButton({ active, onClick, ref }) {
  const iconRef = useRef(null);
  const sweeping = useRef(null);
  const { hostRef, ringRef, confirm } = useConfirmRipple();
  const { contextSafe } = useGSAP({ scope: hostRef });

  // Purpose: the magnifier swings through a short arc, as if scanning, to show the search opening.
  const sweep = contextSafe((icon) => gsap.timeline()
    .to(icon, { rotation: -22, x: -1.5, duration: 0.12, ease: 'power2.out' })
    .to(icon, { rotation: 16, x: 1.5, duration: 0.18, ease: 'power2.inOut' })
    .to(icon, { rotation: 0, x: 0, duration: 0.14, ease: 'power2.out', clearProps: 'transform' }));

  const play = () => {
    confirm();
    if (prefersReducedMotion()) return;
    sweeping.current?.revert();
    sweeping.current = sweep(iconRef.current);
  };

  useImperativeHandle(ref, () => ({ confirm: play }));

  const handleClick = () => {
    onClick();
    play();
  };

  return (
    <span ref={hostRef} className="nav-search-wrap">
      <button
        onClick={handleClick}
        className={`nav-search-btn ${active ? 'active' : ''}`}
        aria-label="Pencarian Direktori UKS"
        title="Pencarian Direktori UKS/M"
      >
        <i ref={iconRef} className="fa-solid fa-magnifying-glass"></i>
      </button>
      <span ref={ringRef} className="confirm-ring" aria-hidden="true"></span>
    </span>
  );
}
