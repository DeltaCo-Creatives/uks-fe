import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { cancelDownload, getDownloadState, subscribeDownload } from '../../utils/downloadFile';
import { progressText } from '../../utils/formatBytes';
import ProgressBar from './ProgressBar';

const COPY = {
  loading: { icon: 'fa-solid fa-download', title: 'Mengunduh…' },
  done: { icon: 'fa-solid fa-circle-check', title: 'Selesai diunduh' },
  error: { icon: 'fa-solid fa-triangle-exclamation', title: 'Gagal mengunduh' }
};

/**
 * Progress card for the phone download (see downloadFile). Mounted once; it renders
 * nothing unless a download is running or just finished, so desktops never see it.
 * Portalled to body so it stays above the document viewer and any transformed ancestor.
 */
export default function DownloadToast() {
  const download = useSyncExternalStore(subscribeDownload, getDownloadState);
  if (!download) return null;

  const { status, name, url, loaded, total } = download;
  const copy = COPY[status];

  return createPortal(
    <div className={`download-toast is-${status}`} role="status">
      <i className={copy.icon} aria-hidden="true"></i>
      <div className="download-toast-body">
        <strong>{copy.title}</strong>
        <span className="download-toast-name">{name}</span>

        {status === 'loading' && (
          <>
            <ProgressBar loaded={loaded} total={total} label={`Kemajuan mengunduh ${name}`} />
            <span className="download-toast-meta" aria-hidden="true">{progressText(loaded, total)}</span>
          </>
        )}
        {status === 'error' && (
          <span className="download-toast-meta">
            Coba lagi, atau{' '}
            <a href={url} target="_blank" rel="noopener noreferrer">buka file di tab baru</a>.
          </span>
        )}
      </div>
      <button type="button" className="download-toast-close" onClick={cancelDownload}>
        {status === 'loading' ? 'Batal' : 'Tutup'}
      </button>
    </div>,
    document.body
  );
}
