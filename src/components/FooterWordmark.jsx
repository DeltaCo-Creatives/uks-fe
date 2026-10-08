import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HOVER_CAPABLE_QUERY } from '@/hooks/useHoverCapable';

const MAX_TILT_Y = 10;
const MAX_TILT_X = 8;
// Pointer distance, in px, at which the tilt reaches its maximum.
const TILT_RANGE_X = 420;
const TILT_RANGE_Y = 260;
// The highlight's centre as a fraction of the wordmark width; both ends sit outside the letters.
const SHEEN_REST = -0.4;
const SHEEN_END = 1.4;
const SWEEP_DURATION = 1.6;
const SWEEP_PERIOD = 5;
const FOLLOW = { duration: 0.8, ease: 'power3.out' };

// Three stacked copies of the text: a face with the gradient, a depth layer behind it and a moving sheen over it.
export default function FooterWordmark() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const sheenRef = useRef(null);

  // Purpose: make the footer's one big mark answer the pointer like a physical object, with a slow shine to catch the eye.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Touch screens and reduced motion keep the static 3D look, so none of this is set up for them.
    mm.add(`${HOVER_CAPABLE_QUERY} and (prefers-reduced-motion: no-preference)`, () => {
      const root = rootRef.current;
      const stage = stageRef.current;
      const sheenLayer = sheenRef.current;
      const footer = root.closest('footer');
      if (!footer) return undefined;

      const sheen = { x: SHEEN_REST };
      const paint = () => sheenLayer.style.setProperty('--sheen', sheen.x.toFixed(3));
      const tiltX = gsap.quickTo(stage, 'rotationX', FOLLOW);
      const tiltY = gsap.quickTo(stage, 'rotationY', FOLLOW);
      const sheenTo = gsap.quickTo(sheen, 'x', { ...FOLLOW, onUpdate: paint });
      const idle = gsap.timeline({ repeat: -1, repeatDelay: SWEEP_PERIOD - SWEEP_DURATION, paused: true })
        .fromTo(sheen, { x: SHEEN_REST }, { x: SHEEN_END, duration: SWEEP_DURATION, ease: 'power2.inOut', onUpdate: paint });

      let inView = false;
      let tabVisible = !document.hidden;
      let engaged = false;
      let running = false;

      // The shine runs only while the footer is on screen, the tab is showing and the pointer is not using the wordmark.
      const syncIdle = () => {
        const shouldRun = inView && tabVisible && !engaged;
        if (shouldRun === running) return;
        running = shouldRun;
        if (shouldRun) idle.restart();
        else idle.pause();
      };

      // After the pointer leaves, the wordmark settles and rests a full beat before the shine returns.
      const release = gsap.to({}, {
        duration: FOLLOW.duration + SWEEP_PERIOD - SWEEP_DURATION,
        paused: true,
        onComplete: () => {
          engaged = false;
          syncIdle();
        }
      });

      const handleMove = (event) => {
        if (event.pointerType === 'touch') return;
        release.pause();
        if (!engaged) {
          engaged = true;
          syncIdle();
        }
        const box = root.getBoundingClientRect();
        const toX = gsap.utils.clamp(-1, 1, (event.clientX - (box.left + box.width / 2)) / TILT_RANGE_X);
        const toY = gsap.utils.clamp(-1, 1, (event.clientY - (box.top + box.height / 2)) / TILT_RANGE_Y);
        tiltY(toX * MAX_TILT_Y);
        tiltX(-toY * MAX_TILT_X);
        sheenTo(gsap.utils.clamp(SHEEN_REST, SHEEN_END, (event.clientX - box.left) / box.width));
      };
      const handleLeave = () => {
        if (!engaged) return;
        tiltX(0);
        tiltY(0);
        sheenTo(SHEEN_REST);
        release.restart();
      };
      const handleVisibility = () => {
        tabVisible = !document.hidden;
        syncIdle();
      };

      const observer = new IntersectionObserver((entries) => {
        inView = entries[entries.length - 1].isIntersecting;
        syncIdle();
      });
      observer.observe(root);
      document.addEventListener('visibilitychange', handleVisibility);
      footer.addEventListener('pointermove', handleMove);
      footer.addEventListener('pointerleave', handleLeave);

      return () => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', handleVisibility);
        footer.removeEventListener('pointermove', handleMove);
        footer.removeEventListener('pointerleave', handleLeave);
        sheenLayer.style.removeProperty('--sheen');
      };
    });
  }, { scope: rootRef });

  return (
    <div ref={rootRef} className="footer-huge-text footer-wordmark">
      <div ref={stageRef} className="footer-wordmark-stage">
        <span className="footer-wordmark-face">UKS</span>
        <span className="footer-wordmark-depth" aria-hidden="true">UKS</span>
        <span ref={sheenRef} className="footer-wordmark-sheen" aria-hidden="true">UKS</span>
      </div>
    </div>
  );
}
