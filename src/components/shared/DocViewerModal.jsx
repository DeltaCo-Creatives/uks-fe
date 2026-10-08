import { lazy, Suspense, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { embedUrl, isDirectPdf, linkKind, NEW_TAB_HINT } from '../../utils/linkKind';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useHoverCapable } from '../../hooks/useHoverCapable';
import { downloadFile } from '../../utils/downloadFile';
import { countPublikasiDownload } from '../../utils/counters';
import ProgressBar from './ProgressBar';

// pdf.js is large, and only touch devices ever need it.
const PdfReader = lazy(() => import('./PdfReader'));

/**
 * Reads a document without leaving the page: the file fills the dialog, and the
 * footer keeps working actions whether or not the host allows framing.
 *
 * Rendered through a portal because the GSAP reveal leaves a transform on the
 * section wrappers, and a transformed ancestor becomes the containing block for
 * position: fixed, which would pin the backdrop inside that panel.
 *
 * `slug` is a publikasi's, used to count its download. A produk hukum has no `slug` here: its `download` link is
 * itself the counting endpoint (counted by the plain link on desktop), and `downloadSource` is the direct file
 * link phones fetch to save the file, with `download` pinged afterwards instead.
 *
 * @param {{ doc: { title: string, url: string, kind?: string, meta?: string, download?: string, downloadSource?: string, slug?: string }, onClose: () => void }} props
 */
export default function DocViewerModal({ doc, onClose }) {
  const closeRef = useRef(null);
  const titleId = useId();
  const src = embedUrl(doc.url, doc.kind);
  const kind = linkKind(doc.url, doc.kind);
  // Phones can't frame a PDF (blank page), so they get the in-page reader.
  const readInPage = !useHoverCapable() && isDirectPdf(doc.url, doc.kind);

  useScrollLock(true);

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
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

        {readInPage ? (
          <Suspense
            fallback={
              <div className="doc-viewer-offsite">
                <div className="doc-viewer-pdf-status">
                  <p role="status">Memuat dokumen…</p>
                  <ProgressBar label="Kemajuan memuat dokumen" />
                </div>
              </div>
            }
          >
            <PdfReader url={doc.url} title={doc.title} />
          </Suspense>
        ) : src ? (
          <iframe className="doc-viewer-frame" src={src} title={doc.title} allow="fullscreen" />
        ) : (
          <div className="doc-viewer-offsite">
            <i className={kind.icon} aria-hidden="true"></i>
            <p>Dokumen ini hanya bisa dibuka di situs sumbernya.</p>
          </div>
        )}

        <div className="doc-viewer-foot">
          {/* Some hosts refuse to be framed, and that failure is silent, so the way out stays visible */}
          <p className="doc-viewer-note">{src && !readInPage ? 'Dokumen tidak tampil? Buka di tab baru.' : ''}</p>
          <div className="doc-viewer-actions">
            <a className="btn-pill secondary" href={doc.url} target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              <span>Buka di tab baru</span>
              <span className="doc-viewer-sr">{NEW_TAB_HINT}</span>
            </a>
            {doc.download && (
              <a className="btn-pill secondary" href={doc.download} download onClick={(e) => {
                countPublikasiDownload(doc.slug);
                downloadFile(e, doc.downloadSource || doc.download, doc.title, doc.downloadSource ? doc.download : undefined);
              }}>
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
