export default function Footer({ onNavigateView }) {
  const footerLinks = [
    { label: 'Beranda', key: 'beranda' },
    { label: '1. Profil & Tata Kelola', key: 'uksm-profil' },
    { label: '2. TRIAS UKS/M', key: 'uksm-trias' },
    { label: '3. Sekolah Sehat (GSS)', key: 'uksm-gss' },
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
          <div>
            <div className="footer-huge-text">UKS.</div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', marginTop: '14px', maxWidth: '440px', lineHeight: 1.6 }}>
              Portal Resmi Usaha Kesehatan Sekolah / Madrasah (UKS/M) lintas 4 Kementerian: Kementerian Pendidikan Dasar dan Menengah, Kementerian Kesehatan, Kementerian Agama, dan Kementerian Dalam Negeri Republik Indonesia.
            </p>
          </div>

          <div className="footer-links">
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
