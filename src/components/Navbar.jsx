import { useState, useEffect } from 'react';
import { navLinks } from '../data/mockData';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Trigger once on mount
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`nav-dynamic-wrapper ${scrolled ? 'is-scrolled' : 'is-top'}`}>
            <nav className="nav-dynamic-bar">
                <a href="#beranda" className="brand-icon-nav">
                    <img src="Aset UKS/UKS-02.png" alt="UKS Logo" />
                </a>

                <div className="nav-links-nav">
                    {navLinks.map((link) => (
                        <a key={link.url} href={link.url}>{link.nama}</a>
                    ))}
                </div>

                <button 
                    className="nav-search-btn"
                    onClick={() => setShowSearch(!showSearch)}
                    aria-label="Search"
                >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </nav>
        </div>
    );
}
