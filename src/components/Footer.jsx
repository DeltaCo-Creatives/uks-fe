import { navLinks } from '../data/mockData';

export default function Footer() {
    return (
        <footer id="kontak">
            <div className="container">
                <div className="footer-content" data-gsap="reveal">
                    <div>
                        <div className="footer-huge-text">UKS.</div>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', marginTop: '16px', maxWidth: '400px' }}>
                            Membangun generasi sehat, cerdas, dan tangguh mulai dari lingkungan sekolah.
                        </p>
                    </div>

                    <div className="footer-links">
                        <ul>
                            {navLinks.map((link) => (
                                <li key={link.url}><a href={link.url}>{link.nama}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div>© {new Date().getFullYear()} UKS Indonesia.</div>
                    <div>Semua Hak Dilindungi.</div>
                </div>
            </div>
        </footer>
    );
}
