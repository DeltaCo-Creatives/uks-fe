import { useEffect, useRef, useState } from 'react';
// The legacy build keeps older phones working; the worker is bundled by Vite as a
// plain script, so hosts that mis-serve .mjs files can't break it.
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';
import PdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?worker';
import { joinChunks, readWithProgress } from '../../utils/readWithProgress';
import { progressText } from '../../utils/formatBytes';
import ProgressBar from './ProgressBar';

GlobalWorkerOptions.workerPort = new PdfWorker();

const MAX_PIXEL_RATIO = 2;

/**
 * One page, drawn only while it is near the viewport. Off-screen pages give their
 * canvas back, since a long book at phone resolution would otherwise exhaust memory.
 */
function PdfPage({ pdf, pageNumber, width, ratio, root }) {
  const holderRef = useRef(null);
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pageRatio, setPageRatio] = useState(ratio);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder || !root) return undefined;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      root,
      rootMargin: '150% 0px'
    });
    observer.observe(holder);

    return () => observer.disconnect();
  }, [root]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    if (!visible || !width) {
      canvas.width = 0;
      canvas.height = 0;
      return undefined;
    }

    let cancelled = false;
    let task;

    (async () => {
      const page = await pdf.getPage(pageNumber);
      if (cancelled) return;

      const base = page.getViewport({ scale: 1 });
      setPageRatio(base.height / base.width);

      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      const viewport = page.getViewport({ scale: (width / base.width) * pixelRatio });
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      task = page.render({ canvas, viewport });
      await task.promise;
    })().catch((error) => {
      if (!cancelled && error?.name !== 'RenderingCancelledException') console.error(error);
    });

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [visible, pdf, pageNumber, width]);

  return (
    <div
      ref={holderRef}
      className="doc-viewer-pdf-page"
      style={{ width, height: Math.round(width * pageRatio) }}
    >
      {/* Sits under the canvas, which is blank until drawn and opaque after, so no state is needed */}
      <span className="doc-viewer-pdf-page-label" aria-hidden="true">Halaman {pageNumber}</span>
      <canvas ref={canvasRef} aria-label={`Halaman ${pageNumber}`} role="img" />
    </div>
  );
}

/**
 * Reads a PDF inside the page for browsers with no PDF viewer of their own
 * (phones). Desktop browsers frame the file directly instead.
 *
 * The file is fetched here, so its host must allow this site's origin via CORS.
 * If it doesn't, the reader says so and the viewer's footer actions still apply.
 *
 * It downloads the whole file rather than loading by byte ranges: pdf.js has to check the last
 * page before it opens a document, and in a PDF not built for web streaming (Canva exports
 * among them) that touches every page, so ranges end up fetching the entire file in many
 * sequential round trips, which is slower than one download.
 *
 * @param {{ url: string, title: string }} props
 */
export default function PdfReader({ url, title }) {
  const [scroller, setScroller] = useState(null);
  const [width, setWidth] = useState(0);
  const [doc, setDoc] = useState({ status: 'loading', loaded: 0, total: 0, preparing: false });

  useEffect(() => {
    if (!scroller) return undefined;

    const measure = () => {
      const style = getComputedStyle(scroller);
      const inner = scroller.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      setWidth(Math.max(0, Math.floor(inner)));
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(scroller);

    return () => observer.disconnect();
  }, [scroller]);

  useEffect(() => {
    const controller = new AbortController();
    let loadingTask;

    (async () => {
      // no-cache: a copy cached earlier from a plain navigation lacks the CORS headers.
      const response = await fetch(url, { cache: 'no-cache', signal: controller.signal });
      if (!response.ok) throw new Error(`PDF responded with ${response.status}`);

      const chunks = await readWithProgress(response, ({ loaded, total }) => {
        setDoc((current) => (current.status === 'loading' ? { ...current, loaded, total } : current));
      });

      // Parsing a big file takes a moment of its own; say so rather than sit at 100%.
      setDoc((current) => (current.status === 'loading' ? { ...current, preparing: true } : current));
      loadingTask = getDocument({ data: joinChunks(chunks) });
      const pdf = await loadingTask.promise;
      const first = (await pdf.getPage(1)).getViewport({ scale: 1 });

      setDoc({ status: 'ready', pdf, numPages: pdf.numPages, ratio: first.height / first.width });
    })().catch((error) => {
      if (error?.name !== 'AbortError') setDoc({ status: 'error' });
    });

    return () => {
      controller.abort();
      loadingTask?.destroy();
    };
  }, [url]);

  if (doc.status === 'error') {
    return (
      <div className="doc-viewer-offsite" role="alert">
        <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        <p>Dokumen tidak bisa ditampilkan di sini. Coba unduh atau buka di tab baru.</p>
      </div>
    );
  }

  return (
    <div
      ref={setScroller}
      className="doc-viewer-pdf"
      role="document"
      aria-label={title}
      aria-busy={doc.status === 'loading'}
      tabIndex={0}
    >
      {doc.status === 'loading' && (
        <div className="doc-viewer-pdf-status">
          <p role="status">{doc.preparing ? 'Menyiapkan halaman…' : 'Memuat dokumen…'}</p>
          <ProgressBar loaded={doc.loaded} total={doc.preparing ? 0 : doc.total} label="Kemajuan memuat dokumen" />
          {!doc.preparing && doc.loaded > 0 && <p aria-hidden="true">{progressText(doc.loaded, doc.total)}</p>}
        </div>
      )}
      {doc.status === 'ready' &&
        width > 0 &&
        Array.from({ length: doc.numPages }, (_, index) => (
          <PdfPage
            key={index}
            pdf={doc.pdf}
            pageNumber={index + 1}
            width={width}
            ratio={doc.ratio}
            root={scroller}
          />
        ))}
    </div>
  );
}
