import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { viewKeyFromPathname } from '../routes';

// The incoming page needs a frame to lay out before an anchor can be found.
const SETTLE_MS = 60;

/**
 * Scroll behavior for cross-page navigation: land on the anchor if the URL
 * names one, otherwise at the top.
 *
 * Moving within a single page is left alone — swapping a tab panel or jumping
 * to a section from the edge drawer scrolls itself, and re-scrolling here would
 * fight it.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const previousView = useRef(null);

  useEffect(() => {
    const view = viewKeyFromPathname(pathname);
    if (previousView.current === view) return undefined;

    // A link opened cold lands on its anchor outright. Gliding there instead
    // would animate the whole page height while images are still settling, and
    // any of that settling cancels the animation halfway.
    const behavior = previousView.current === null ? 'instant' : 'smooth';

    const timer = setTimeout(() => {
      // Recorded here rather than during the effect so that StrictMode's
      // discarded first pass does not mark the arrival as already handled.
      previousView.current = view;

      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target) {
        target.scrollIntoView({ behavior, block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior });
      }
    }, SETTLE_MS);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
