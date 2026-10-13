import { Link } from 'react-router-dom';
import { EXTERNAL_ICON, NAV_ROW, NAV_BAR } from '../styles';
import { HeadingSkeleton } from './FooterSkeleton';
import NewTabHint from './NewTabHint';

const COLUMN_STYLE = { flex: '1 1 300px' };
// Matches the nine links the footer shipped with, so the skeleton fills the same grid.
const SKELETON_WIDTHS = ['w-1/3', 'w-3/4', 'w-2/3', 'w-3/4', 'w-1/2', 'w-1/3', 'w-2/3', 'w-1/2', 'w-3/4'];

/** Peta Navigasi column (`navigasi` of useFooterConfig): internal pages as router links, external addresses in a new tab; a skeleton while loading. */
export default function FooterNavigasi({ status, judul, links }) {
  if (status === 'loading') {
    return (
      <div className="footer-links" style={COLUMN_STYLE}>
        <HeadingSkeleton />
        <p role="status" className="sr-only">Memuat peta navigasi</p>
        <ul aria-hidden="true">
          {SKELETON_WIDTHS.map((width, index) => (
            <li key={`${width}-${index}`} className={NAV_ROW}>
              <span className={`${NAV_BAR} ${width}`} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="footer-links" style={COLUMN_STYLE}>
      <h5>{judul}</h5>
      <ul>
        {links.map((link) => (
          <li key={link.key}>
            {link.external ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <i className={`fa-solid fa-arrow-up-right-from-square ${EXTERNAL_ICON}`} aria-hidden="true"></i>
                <NewTabHint />
              </a>
            ) : (
              <Link to={link.to}>{link.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
