import { useId, useMemo, useState } from 'react';
import { gssLegalDocs, gssCampaignMaterials } from '../../../data/portalData';
import { linkKind, NEW_TAB_HINT } from './gssLinks';

const GROUPS = [
  { id: 'hukum', label: 'Produk hukum', items: gssLegalDocs },
  { id: 'kampanye', label: 'Materi kampanye', items: gssCampaignMaterials }
];

const normalize = (text) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function DocRow({ doc, number }) {
  const kind = linkKind(doc.url);
  const body = (
    <>
      <span className="gss-doc-num" aria-hidden="true">{number}</span>
      <span className="gss-doc-text">
        <span className="gss-doc-title">{doc.title}</span>
        <span className="gss-doc-kind"><i className={kind.icon} aria-hidden="true"></i> {kind.label}</span>
      </span>
    </>
  );

  return (
    <li>
      {doc.url ? (
        <a className="gss-doc" href={doc.url} target="_blank" rel="noopener noreferrer">
          {body}
          <i className="fa-solid fa-arrow-up-right-from-square gss-doc-open" aria-hidden="true"></i>
          <span className="gss-sr-only">{NEW_TAB_HINT}</span>
        </a>
      ) : (
        <div className="gss-doc is-missing">{body}</div>
      )}
    </li>
  );
}

/**
 * Bahan Advokasi: two source lists behind a switch, with a search that
 * filters the active list and an empty state that offers the way back.
 */
export default function GssAdvokasi() {
  const [groupId, setGroupId] = useState(GROUPS[0].id);
  const [query, setQuery] = useState('');
  const searchId = useId();
  const group = GROUPS.find((g) => g.id === groupId);

  const results = useMemo(() => {
    const numbered = group.items.map((doc, idx) => ({ doc, number: idx + 1 }));
    const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
    if (terms.length === 0) return numbered;
    return numbered.filter(({ doc }) => terms.every((term) => normalize(doc.title).includes(term)));
  }, [group, query]);

  return (
    <section id="sec-gss-advokasi" className="section gss-section">
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Bahan Advokasi</span>
          <h2 className="section-title">Dasar hukum &amp; materi kampanye</h2>
        </div>
      </div>

      <div className="gss-docs" data-gsap="reveal">
        <div className="gss-docs-toolbar">
          <div className="gss-segmented" role="group" aria-label="Jenis dokumen">
            {GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={g.id === groupId}
                className={`gss-segment ${g.id === groupId ? 'is-active' : ''}`}
                onClick={() => setGroupId(g.id)}
              >
                {g.label} <span className="gss-segment-count">{g.items.length}</span>
              </button>
            ))}
          </div>

          <div className="gss-search">
            <label htmlFor={searchId}>Cari judul dokumen</label>
            <div className="gss-search-field">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="contoh: imunisasi, undang-undang"
              />
            </div>
          </div>
        </div>

        <p className="gss-docs-status" aria-live="polite">
          {query.trim()
            ? `${results.length} dari ${group.items.length} dokumen cocok`
            : `${group.items.length} dokumen`}
        </p>

        {results.length > 0 ? (
          <ol className="gss-doc-list">
            {results.map(({ doc, number }) => (
              <DocRow key={doc.title} doc={doc} number={number} />
            ))}
          </ol>
        ) : (
          <div className="gss-docs-empty">
            <p>
              Tidak ada {group.label.toLowerCase()} dengan judul yang memuat “{query.trim()}”.
            </p>
            <button type="button" className="btn-pill secondary" onClick={() => setQuery('')}>
              Hapus pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
