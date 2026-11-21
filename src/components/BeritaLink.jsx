import { Link } from 'react-router-dom';
import { isExternalBerita } from '@/utils/beritaLink';

/** Card link for a berita: a link-only item opens its source in a new tab, anything else the internal route `to`. */
export default function BeritaLink({ item, to, children, ...rest }) {
  if (isExternalBerita(item)) {
    return <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
  }
  return <Link to={to} {...rest}>{children}</Link>;
}
