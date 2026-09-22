import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { embedUrl, linkKind, NEW_TAB_HINT } from '../../utils/linkKind';

/**
 * Reads a document without leaving the page: the file fills the dialog, and the
 * footer keeps working actions whether or not the host allows framing.
 *
 * Rendered through a portal because the GSAP reveal leaves a transform on the
 * section wrappers, and a transformed ancestor becomes the containing block for
 * position: fixed, which would pin the backdrop inside that panel.
 *
 * @param {{ doc: { title: string, url: string, kind?: string, meta?: string, download?: string }, onClose: () => void }} props
 */
export default function DocViewerModal({ doc, onClose }) {
  const closeRef = useRef(null);
  const titleId = useId();
  const src = embedUrl(doc.url, doc.kind);
  const kind = linkKind(doc.url, doc.kind);

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
    <div className="doc-viewer-overlay" onClick={onClose}>
      <div
        className="doc-viewer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="doc-viewer-head">
          <div className="doc-viewer-heading">
            <h3 id={titleId}>{doc.title}</h3>
            <span className="doc-viewer-kind">
              <i className={kind.icon} aria-hidden="true"></i> {doc.meta ? `${kind.label} · ${doc.meta}` : kind.label}
            </span>
          </div>
          <button ref={closeRef} type="button" className="doc-viewer-close" onClick={onClose} aria-label="Tutup dokumen">
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        {src ? (
          <iframe className="doc-viewer-frame" src={src} title={doc.title} allow="fullscreen" />
        ) : (
          <div className="doc-viewer-offsite">
            <i className={kind.icon} aria-hidden="true"></i>
            <p>Dokumen ini hanya bisa dibuka di situs sumbernya.</p>
          </div>
        )}

        <div className="doc-viewer-foot">
          {/* Some hosts refuse to be framed, and that failure is silent, so the way out stays visible */}
          <p className="doc-viewer-note">{src ? 'Dokumen tidak tampil? Buka di tab baru.' : ''}</p>
          <div className="doc-viewer-actions">
            <a className="btn-pill secondary" href={doc.url} target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              <span>Buka di tab baru</span>
              <span className="doc-viewer-sr">{NEW_TAB_HINT}</span>
            </a>
            {doc.download && (
              <a className="btn-pill secondary" href={doc.download} download>
                <i className="fa-solid fa-download" aria-hidden="true"></i>
                <span>Unduh</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
