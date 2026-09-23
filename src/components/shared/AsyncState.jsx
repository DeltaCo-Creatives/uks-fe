const DEFAULT_ERROR_TEXT = 'Terjadi gangguan saat mengambil data. Silakan coba lagi.';

export function LoadingState({ label }) {
  return (
    <div className="content-toolbar-empty" role="status" aria-live="polite">
      <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i>
      <h4 className="info-empty-title">{label}</h4>
    </div>
  );
}

export function ErrorState({ title, text = DEFAULT_ERROR_TEXT, retry }) {
  return (
    <div className="content-toolbar-empty">
      <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
      <h4 className="info-empty-title">{title}</h4>
      <p className="info-empty-text">{text}</p>
      <button type="button" className="btn-pill secondary" onClick={retry} style={{ marginTop: '12px' }}>
        Coba Lagi
      </button>
    </div>
  );
}

export function EmptyState({ icon, title, text }) {
  return (
    <div className="content-toolbar-empty">
      <i className={icon} aria-hidden="true"></i>
      <h4 className="info-empty-title">{title}</h4>
      <p className="info-empty-text">{text}</p>
    </div>
  );
}
