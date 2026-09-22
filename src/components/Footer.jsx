import { contactInfo } from '../data/portalData';

export default function Footer({ onNavigateView }) {
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

  const handleLink = (e, key) => {
    e.preventDefault();
    if (onNavigateView) {
      onNavigateView(key);
    }
  };

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
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
              <i className="fa-solid fa-location-dot" style={{ marginRight: '8px', color: 'var(--brand-accent)' }}></i>
              {contactInfo.address}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              <a
                href={`mailto:${contactInfo.email}`}
                style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <i className="fa-solid fa-envelope" style={{ color: 'var(--brand-accent)', fontSize: '12px' }}></i>
                <span>{contactInfo.email}</span>
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <i className="fa-solid fa-phone" style={{ color: 'var(--brand-accent)', fontSize: '12px' }}></i>
                <span>{contactInfo.phone}</span>
              </a>
              <a
                href={contactInfo.websiteUrl.trim()}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <i className="fa-solid fa-arrow-up-right-from-square" style={{ color: 'var(--brand-accent)', fontSize: '12px' }}></i>
                <span>{contactInfo.websiteUrl.trim().replace(/^https?:\/\//, '')}</span>
              </a>
            </div>
          </div>

          <div className="footer-links" style={{ flex: '1 1 200px' }}>
            <h5>Peta Navigasi</h5>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={`#${link.key}`}
                    onClick={(e) => handleLink(e, link.key)}
                  >
                    {link.label}
                  </a>
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
