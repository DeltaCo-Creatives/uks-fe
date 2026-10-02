import { useCallback, useRef } from 'react';

/**
 * Holds a GSAP marquee still while any reason is active: pointer over the track,
 * keyboard focus inside it, or one the caller sets via `hold(key, bool)` (e.g. a modal).
 * Spread `trackProps` onto the track element.
 *
 * Mouse-click focus is ignored on purpose, so a clicked button does not pin the row.
 */
export function useMarqueeHold(tweenRef) {
  const reasons = useRef({});

  const hold = useCallback((key, value) => {
    reasons.current[key] = value;
    if (Object.values(reasons.current).some(Boolean)) tweenRef.current?.pause();
    else tweenRef.current?.play();
  }, [tweenRef]);

  const trackProps = {
    onMouseEnter: () => hold('hover', true),
    onMouseLeave: () => hold('hover', false),
    onFocus: (e) => e.target.matches(':focus-visible') && hold('focus', true),
    onBlur: (e) => !e.currentTarget.contains(e.relatedTarget) && hold('focus', false)
  };

  return { hold, trackProps };
}
