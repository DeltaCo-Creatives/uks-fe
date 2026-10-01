import './pagination.css';

// First, last, and one page either side of the current one; gaps become "…".
function pageList(page, totalPages) {
  const wanted = new Set([1, totalPages, page - 1, page, page + 1]);
  const pages = [...wanted].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  return pages.flatMap((p, i) => (i > 0 && p - pages[i - 1] > 1 ? ['gap-' + p, p] : [p]));
}

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages < 1) return null;

  const go = (e, p) => {
    onChange(p);
    e.currentTarget.closest('.about-bento-frame')?.scrollIntoView({ block: 'start' });
  };

  return (
    <nav className="pager" aria-label="Halaman">
      <div className="pager-track">
        <button type="button" className="pager-btn" aria-label="Halaman sebelumnya" disabled={page === 1} onClick={(e) => go(e, page - 1)}>
          <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
          <span className="pager-label">Sebelumnya</span>
        </button>

        {pageList(page, totalPages).map((p) =>
          typeof p === 'string' ? (
            <span key={p} className="pager-gap" aria-hidden="true">…</span>
          ) : (
            <button
              key={p}
              type="button"
              className={`pager-btn ${p === page ? 'is-active' : ''}`}
              aria-label={`Halaman ${p}`}
              aria-current={p === page ? 'page' : undefined}
              onClick={(e) => go(e, p)}
            >
              {p}
            </button>
          )
        )}

        <button type="button" className="pager-btn" aria-label="Halaman berikutnya" disabled={page === totalPages} onClick={(e) => go(e, page + 1)}>
          <span className="pager-label">Berikutnya</span>
          <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  );
}
