import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * Full-size look at a poster that is already readable on the page, for the
 * small print. Escape and a backdrop click both close it.
 *
 * Portalled for the same reason as the document viewer: a GSAP transform on an
 * ancestor would otherwise trap this backdrop inside that panel.
 *
 * @param {{ image: { src: string, title: string }, onClose: () => void }} props
 */
export default function ImageLightbox({ image, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return createPortal(
    <div className="img-lightbox-overlay" onClick={onClose}>
      <div className="img-lightbox" role="dialog" aria-modal="true" aria-label={image.title} onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className="img-lightbox-close" onClick={onClose} aria-label="Tutup tampilan penuh">
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        <img src={image.src} alt={image.title} />
      </div>
    </div>,
    document.body
  );
}
