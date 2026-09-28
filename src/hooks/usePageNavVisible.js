import { useEffect, useState } from 'react';

const FALLBACK_NAV_OFFSET = 84;
const BIND_ATTEMPTS = 5;

/**
 * True while a page's own top navigation is on screen. A page opts in by putting
 * `data-page-nav` on the element to watch; pages without one (Mitra, Kontak) report false.
 * An element that is display:none never counts as on screen.
 *
 * Starts true so a handle that depends on it does not flash in before the first reading; a
 * browser without IntersectionObserver starts, and stays, false.
 *
 * @param {string} pathname - re-binds when the route changes
 */
export function usePageNavVisible(pathname) {
  const [visible, setVisible] = useState(() => 'IntersectionObserver' in window);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;

    let observer;
    let frame;
    let attempts = 0;

    const bind = () => {
      const targets = document.querySelectorAll('[data-page-nav]');
      if (targets.length === 0) {
        // A redirect placeholder can render first; the real page follows within a frame or two.
        if (attempts++ < BIND_ATTEMPTS) frame = requestAnimationFrame(bind);
        else setVisible(false);
        return;
      }

      // The fixed navbar covers the top of the viewport, so a bar tucked behind it counts as hidden.
      const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-offset')) || FALLBACK_NAV_OFFSET;
      const inView = new Set();

      // Read the current position now: the observer's first report lands a frame later, which
      // would flash the handle when moving between pages.
      targets.forEach((target) => {
        const { top, bottom, width, height } = target.getBoundingClientRect();
        const rendered = width > 0 || height > 0;
        if (rendered && bottom > offset && top < window.innerHeight) inView.add(target);
      });
      setVisible(inView.size > 0);

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inView.add(entry.target);
          else inView.delete(entry.target);
        });
        setVisible(inView.size > 0);
      }, { rootMargin: `-${offset}px 0px 0px 0px` });
      targets.forEach((target) => observer.observe(target));
    };

    bind();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return visible;
}
