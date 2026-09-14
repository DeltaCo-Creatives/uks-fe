const footerLinks = [
    { nama: 'Beranda', url: '#beranda' },
    { nama: 'UKS/M', url: '#tentang' },
    { nama: 'Program', url: '#berita' },
    { nama: 'Buku & Panduan', url: '#buku' },
    { nama: 'Publikasi', url: '#infografis' },
];

export default function Footer() {
    return (
        <footer id="kontak">
            <div className="container">
                <div className="footer-grid">

                    {/* Brand column */}
                    <div>
                        <div className="brand-icon footer-brand-icon">
                            <img src="Aset UKS/UKS-02.png" alt="Logo UKS" />
                        </div>
                        <p>
                            Portal informasi, edukasi, berita, dan literasi
                            kesehatan untuk mendukung terwujudnya lingkungan
                            sekolah yang sehat, aman, dan nyaman.
                        </p>
                    </div>

                    {/* Navigation column — matches cms-loader footerMenu structure */}
                    <div>
                        <h3>Navigasi</h3>
                        <ul id="footerMenu">
                            <ul className="main-menu">
                                {footerLinks.map((link) => (
                                    <li key={link.url} className="menu-item">
                                        <a href={link.url}>{link.nama}</a>
                                    </li>
                                ))}
                            </ul>
                        </ul>
                    </div>

                    {/* Contact column */}
                    <div>
                        <h3>Informasi</h3>
                        <ul>
                            <li>
                                <i className="fa-solid fa-envelope"></i> info@uks.id
                            </li>
                            <li>
                                <i className="fa-solid fa-globe"></i> www.uks.id
                            </li>
                            <li>
                                <i className="fa-solid fa-location-dot"></i> Indonesia
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="copyright">
                    © 2026 UKS Indonesia. Semua Hak Dilindungi.
                </div>
            </div>
        </footer>
    );
}
