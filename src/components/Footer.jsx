import { Link } from 'react-router-dom';
import { usePengaturanSettings } from '../hooks/usePublicLists';
import { pathForView } from '../routes';

export default function Footer() {
  const footerLinks = [
    { label: 'Beranda', key: 'beranda' },
    { label: '1. Profil & Tata Kelola', key: 'uksm-profil' },
    { label: '2. TRIAS UKS/M', key: 'uksm-trias' },
    { label: '3. Stratifikasi UKS/M', key: 'uksm-stratifikasi' },
    { label: 'Program Prioritas', key: 'program' },
    { label: 'Kemitraan', key: 'mitra' },
    { label: 'Informasi & Warta', key: 'informasi' },
    { label: 'Publikasi & Buku', key: 'publikasi' },
    { label: 'Kontak & Helpdesk', key: 'kontak' }
  ];

  const { data: settings } = usePengaturanSettings();
  const address = settings?.['kontak.address'];
  const email = settings?.['kontak.email'];
  const phone = settings?.['kontak.phone'];
  const websiteUrl = settings?.['kontak.websiteUrl'];

  return (
    <footer id="kontak" style={{ marginTop: 'auto' }}>
      <div className="container">
        <div className="footer-content">
          <div style={{ flex: '1 1 300px', maxWidth: '420px' }}>
            <div className="footer-huge-text">UKS.</div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', marginTop: '14px', lineHeight: 1.6 }}>
              Portal Resmi Usaha Kesehatan Sekolah / Madrasah (UKS/M) lintas 4 Kementerian: Kementerian Pendidikan Dasar dan Menengah, Kementerian Kesehatan, Kementerian Agama, dan Kementerian Dalam Negeri Republik Indonesia.
            </p>
          </div>

          {/* Contact Details (A15) */}
          <div className="footer-links" style={{ flex: '1 1 260px', maxWidth: '340px' }}>
            <h5>Sekretariat Pembina</h5>
            {address && (
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                <i className="fa-solid fa-location-dot" style={{ marginRight: '8px', color: 'var(--brand-accent)' }}></i>
                {address}
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              {email && (
                <a
                  href={`mailto:${email}`}
                  style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fa-solid fa-envelope" style={{ color: 'var(--brand-accent)', fontSize: '12px' }}></i>
                  <span>{email}</span>
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fa-solid fa-phone" style={{ color: 'var(--brand-accent)', fontSize: '12px' }}></i>
                  <span>{phone}</span>
                </a>
              )}
              {websiteUrl && (
                <a
                  href={websiteUrl.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fa-solid fa-arrow-up-right-from-square" style={{ color: 'var(--brand-accent)', fontSize: '12px' }}></i>
                  <span>{websiteUrl.trim().replace(/^https?:\/\//, '')}</span>
                </a>
              )}
            </div>
          </div>

          <div className="footer-links" style={{ flex: '1 1 200px' }}>
            <h5>Peta Navigasi</h5>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link to={pathForView(link.key)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Kementerian Pendidikan Dasar dan Menengah RI · Sekretariat Pembina UKS/M Pusat.</div>
          <div style={{ color: 'rgba(255,255,255,0.6)' }}>Sinergi 4 Kementerian untuk Indonesia Emas 2045</div>
        </div>
      </div>
    </footer>
  );
}
