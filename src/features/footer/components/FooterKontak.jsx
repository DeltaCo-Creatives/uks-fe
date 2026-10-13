import { SOCIAL_ROW, SOCIAL_LINK } from '../styles';
import FooterSkeleton, { HeadingSkeleton } from './FooterSkeleton';
import NewTabHint from './NewTabHint';

const COLUMN_STYLE = { flex: '1 1 260px', maxWidth: '340px' };
const TEXT_ROW_STYLE = { color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: 1.6, margin: 0 };
const TEXT_ICON_STYLE = { marginRight: '8px', color: 'var(--brand-accent)' };
const LINK_ROW_STYLE = { color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' };
const LINK_ICON_STYLE = { color: 'var(--brand-accent)', fontSize: '12px' };

// Plain text line with its icon: the address and the operating hours.
function TextRow({ icon, children }) {
  return (
    <p style={TEXT_ROW_STYLE}>
      <i className={`fa-solid ${icon}`} style={TEXT_ICON_STYLE}></i>
      {children}
    </p>
  );
}

function LinkRow({ item }) {
  return (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      style={LINK_ROW_STYLE}
    >
      <i className={`fa-solid ${item.icon}`} style={LINK_ICON_STYLE}></i>
      <span>{item.text}</span>
      {item.newTabHint && <NewTabHint />}
    </a>
  );
}

/** Sekretariat column (`kontak` of useFooterConfig): contact lines, then the social icon row; a skeleton while the settings load. */
export default function FooterKontak({ status, judul, alamat, items, social }) {
  if (status === 'loading') {
    return (
      <div className="footer-links" style={COLUMN_STYLE}>
        <HeadingSkeleton />
        <FooterSkeleton label="Memuat kontak" widths={['w-full', 'w-3/4', 'w-3/5']} className="text-[13px] leading-[1.6]" />
      </div>
    );
  }

  return (
    <div className="footer-links" style={COLUMN_STYLE}>
      <h5>{judul}</h5>
      {alamat && <TextRow icon="fa-location-dot">{alamat}</TextRow>}
      {items.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          {items.map((item) => (
            item.href ? <LinkRow key={item.key} item={item} /> : <TextRow key={item.key} icon={item.icon}>{item.text}</TextRow>
          ))}
        </div>
      )}
      {social.length > 0 && (
        <div role="group" aria-label="Media sosial UKS" className={SOCIAL_ROW}>
          {social.map(({ key, href, icon, label }) => (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={SOCIAL_LINK}>
              <i className={icon} aria-hidden="true"></i>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
