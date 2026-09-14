import { useState } from 'react';
import { defaultBerita } from '../data/mockData';

const navLinks = [
    { nama: 'Beranda', url: '#beranda' },
    { nama: 'UKS/M', url: '#tentang' },
    { nama: 'Program', url: '#berita' },
    { nama: 'Informasi', url: '#buku' },
    { nama: 'Publikasi', url: '#infografis' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Search all visible text content on the page
            const cards = document.querySelectorAll('.news-card, .book-card, .infografis-card, .video-card');
            let matchCount = 0;
            let firstMatch = null;
            cards.forEach((card) => {
                const isMatch = card.textContent.toLowerCase().includes(searchQuery.toLowerCase());
                card.style.display = isMatch ? '' : 'none';
                if (isMatch) {
                    matchCount++;
                    if (!firstMatch) firstMatch = card;
                }
            });
            setSearchStatus(matchCount ? `${matchCount} hasil ditemukan` : 'Tidak ada hasil ditemukan');
            setSearchVisible(true);
            if (firstMatch) firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            // Clear filter
            document.querySelectorAll('.news-card, .book-card, .infografis-card, .video-card')
                .forEach((card) => { card.style.display = ''; });
            setSearchStatus('');
            setSearchVisible(false);
        }
    };

    const handleSearchInput = (e) => {
        setSearchQuery(e.target.value);
        if (!e.target.value.trim()) {
            document.querySelectorAll('.news-card, .book-card, .infografis-card, .video-card')
                .forEach((card) => { card.style.display = ''; });
            setSearchStatus('');
            setSearchVisible(false);
        }
    };

    return (
        <header className="navbar">
            <div className="container nav">

                {/* Brand / Logo */}
                <a href="#beranda" className="brand">
                    <div className="brand-icon">
                        <img src="Aset UKS/UKS-02.png" alt="Logo UKS" />
                    </div>
                </a>

                {/* Mobile hamburger */}
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Buka menu">
                    <i className="fa-solid fa-bars"></i>
                </button>

                {/* Nav links — cms-loader renders: nav-menu > ul.main-menu > li.menu-item */}
                <ul className={`nav-menu ${menuOpen ? 'show' : ''}`} id="navMenu">
                    <ul className="main-menu">
                        {navLinks.map((link) => (
                            <li key={link.url} className="menu-item">
                                <a href={link.url} onClick={closeMenu}>{link.nama}</a>
                            </li>
                        ))}
                    </ul>
                </ul>

                {/* Search */}
                <form className="site-search" id="siteSearch" role="search" onSubmit={handleSearch}>
                    <input
                        id="siteSearchInput"
                        type="search"
                        placeholder="Pencarian"
                        aria-label="Pencarian"
                        value={searchQuery}
                        onChange={handleSearchInput}
                    />
                    <button type="submit" aria-label="Cari">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <div className={`search-status ${searchVisible ? 'show' : ''}`} role="status" aria-live="polite">
                        {searchStatus}
                    </div>
                </form>

            </div>
        </header>
    );
}
