import { TodoTag } from '../../ContentPlaceholder';
import { GSS_SOURCE } from '../../../data/portalData';
import { linkKind, NEW_TAB_HINT } from './gssLinks';

function ToolAction({ tool }) {
  if (tool.variants) {
    return (
      <div className="gss-tool-variants" role="group" aria-label={`Pilih jenjang untuk ${tool.title}`}>
        {tool.variants.map((variant) => (
          <a key={variant.label} className="gss-tool-chip" href={variant.url} target="_blank" rel="noopener noreferrer">
            {variant.label} <span className="gss-sr-only">{NEW_TAB_HINT}</span>
          </a>
        ))}
      </div>
    );
  }

  if (!tool.url) {
    return (
      <span className="gss-tool-missing">
        Tautan belum tersedia
        {import.meta.env.DEV && <TodoTag source={`${GSS_SOURCE} (lihat docs/sekolah-sehat-curation.md)`} />}
      </span>
    );
  }

  return (
    <a className="btn-pill secondary gss-tool-open" href={tool.url} target="_blank" rel="noopener noreferrer">
      Buka dokumen <span className="gss-sr-only">{NEW_TAB_HINT}</span>
    </a>
  );
}

/**
 * "Alat Bantu Penerapan": each row names the file and where it opens.
 * Missing links stay listed with an honest label instead of a dead button.
 *
 * @param {{ tools: object[], focusTitle: string }} props
 */
export default function GssToolList({ tools, focusTitle }) {
  return (
    <div className="gss-panel-block">
      <h4 className="gss-topic-title">Alat bantu penerapan {focusTitle}</h4>
      <ul className="gss-tool-list">
        {tools.map((tool) => {
          const kind = tool.variants ? { label: 'Google Drive, per jenjang', icon: 'fa-brands fa-google-drive' } : linkKind(tool.url);
          return (
            <li key={tool.title} className={`gss-tool ${tool.url || tool.variants ? '' : 'is-missing'}`}>
              <span className="gss-tool-icon" aria-hidden="true"><i className={kind.icon}></i></span>
              <span className="gss-tool-text">
                <span className="gss-tool-title">{tool.title}</span>
                {(tool.url || tool.variants) && <span className="gss-tool-kind">{kind.label}</span>}
              </span>
              <ToolAction tool={tool} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
