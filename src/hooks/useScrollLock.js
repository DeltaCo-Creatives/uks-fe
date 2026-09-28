import { useEffect } from 'react';

// Shared by every layer that freezes the page (drawer, document viewer, image lightbox), so one
// letting go never unlocks the page under another that is still open.
let lockCount = 0;
let saved = null;

function lock() {
  if (lockCount++ > 0) return;
  const html = document.documentElement.style;
  const body = document.body.style;
  saved = { gutter: html.scrollbarGutter, overflow: body.overflow };
  // Reserve the gutter only when a scrollbar is there to replace; on a short page it would add one.
  if (window.innerWidth > document.documentElement.clientWidth) html.scrollbarGutter = 'stable';
  body.overflow = 'hidden';
}

function unlock() {
  if (--lockCount > 0) return;
  document.documentElement.style.scrollbarGutter = saved.gutter;
  document.body.style.overflow = saved.overflow;
  saved = null;
}

/**
 * Stops the page from scrolling while `active`. The scrollbar gutter stays reserved, so the
 * page and the fixed navbar do not jump sideways when the scrollbar disappears.
 *
 * @param {boolean} active
 */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    lock();
    return unlock;
  }, [active]);
}
