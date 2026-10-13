import { BOTTOM_BAR } from '../styles';

/** Bottom bar (`bottom` of useFooterConfig): the copyright line with the current year, and the slogan unless it is empty; skeleton bars while loading. */
export default function FooterBottom({ status, hakCipta, slogan }) {
  const year = new Date().getFullYear();

  if (status === 'loading') {
    return (
      <div className="footer-bottom">
        <p role="status" className="sr-only">Memuat teks footer</p>
        <div aria-hidden="true">
          © {year} <span className={`${BOTTOM_BAR} w-72`} />
        </div>
        <div aria-hidden="true">
          <span className={`${BOTTOM_BAR} w-56`} />
        </div>
      </div>
    );
  }

  return (
    <div className="footer-bottom">
      <div>© {year} {hakCipta}</div>
      {slogan && <div style={{ color: 'rgba(255,255,255,0.6)' }}>{slogan}</div>}
    </div>
  );
}
