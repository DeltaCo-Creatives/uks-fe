import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '../../hooks/useScrollLock';

// Same disc as the close button, centred on the photo's edge.
const STEP = 'absolute top-[calc(50%-22px)] grid size-11 cursor-pointer place-items-center rounded-full border-none bg-card text-[16px] text-ink shadow-float focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-accent';

/**
 * Full-size look at a poster that is already readable on the page, for the
 * small print. Escape and a backdrop click both close it.
 *
 * Portalled for the same reason as the document viewer: a GSAP transform on an
 * ancestor would otherwise trap this backdrop inside that panel.
 *
 * An album passes `onPrev`/`onNext` (also bound to the arrow keys) and a `caption` under the photo.
 *
 * @param {{ image: { src: string, title: string, alt?: string, caption?: string }, onClose: () => void, onPrev?: () => void, onNext?: () => void }} props
 */
export default function ImageLightbox({ image, onClose, onPrev, onNext }) {
  const closeRef = useRef(null);

  useScrollLock(true);

  // Latest handlers via ref, so inline callbacks don't re-run the effects.
  const handlers = useRef({ onClose, onPrev, onNext });
  useEffect(() => {
    handlers.current = { onClose, onPrev, onNext };
  });

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') handlers.current.onClose();
      if (event.key === 'ArrowLeft') handlers.current.onPrev?.();
      if (event.key === 'ArrowRight') handlers.current.onNext?.();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return createPortal(
    <div className="img-lightbox-overlay" onClick={onClose}>
      <div className={`img-lightbox${image.caption ? ' [&_img]:max-h-[calc(100vh-110px)]!' : ''}`} role="dialog" aria-modal="true" aria-label={image.title} onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className="img-lightbox-close" onClick={onClose} aria-label="Tutup tampilan penuh">
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        {/* Wraps only the photo, so the step buttons centre on it and not on photo + caption. */}
        <div className="relative">
          <img src={image.src} alt={image.alt ?? image.title} />
          {onPrev && (
            <button type="button" className={`${STEP} left-2`} onClick={onPrev} aria-label="Foto sebelumnya">
              <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
            </button>
          )}
          {onNext && (
            <button type="button" className={`${STEP} right-2`} onClick={onNext} aria-label="Foto berikutnya">
              <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </button>
          )}
        </div>
        {image.caption && <p aria-live="polite" className="mt-3 text-center text-[14px] font-semibold text-white">{image.caption}</p>}
      </div>
    </div>,
    document.body
  );
}
