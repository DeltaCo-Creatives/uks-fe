import { Link, useLocation } from 'react-router-dom';
import { pathForView } from '../routes';

const SUGGESTIONS = [
  { view: 'beranda', icon: 'fa-solid fa-house', label: 'Beranda Nasional' },
  { view: 'uksm-profil', icon: 'fa-solid fa-landmark', label: 'Profil & Tata Kelola' },
  { view: 'program', icon: 'fa-solid fa-bullhorn', label: 'Program Prioritas' },
  { view: 'informasi', icon: 'fa-solid fa-newspaper', label: 'Warta & Informasi' },
  { view: 'publikasi', icon: 'fa-solid fa-book-bookmark', label: 'Pustaka Digital' },
  { view: 'kontak', icon: 'fa-solid fa-headset', label: 'Kontak & Helpdesk' }
];

export default function NotFoundView() {
  const { pathname } = useLocation();

  return (
    <div className="container" style={{ padding: '32px 20px 80px', minHeight: '70vh' }}>
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-compass"></i> Halaman Tidak Ditemukan
        </span>
        <h1 className="subpage-hero-title">Alamat ini tidak ada di portal UKS/M</h1>
        <p className="subpage-hero-desc">
          Tautan <strong>{pathname}</strong> mungkin sudah dipindahkan atau salah ketik. Gunakan
          pencarian, atau langsung menuju salah satu halaman di bawah ini.
        </p>
        <Link to={pathForView('search')} className="btn-massive" style={{ marginTop: '20px' }}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <span>Cari di Direktori UKS/M</span>
        </Link>
      </div>

      <div className="about-bento-frame" style={{ background: '#FFFFFF' }}>
        <span className="section-kicker">Peta Navigasi</span>
        <h2 style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', fontWeight: 800, margin: '6px 0 20px', color: 'var(--text-primary)' }}>
          Halaman yang paling sering dikunjungi
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '14px' }}>
          {SUGGESTIONS.map((item) => (
            <Link
              key={item.view}
              to={pathForView(item.view)}
              className="subnav-pill"
              style={{ justifyContent: 'flex-start', padding: '14px 18px' }}
            >
              <i className={item.icon} aria-hidden="true"></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
