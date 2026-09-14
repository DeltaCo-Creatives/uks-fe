import { useState } from 'react';
import { defaultBuku } from '../data/mockData';

export default function Books() {
    const [openBookUrl, setOpenBookUrl] = useState(null);
    const [bookTitle, setBookTitle] = useState('');
    const [bookZoom, setBookZoom] = useState(1);

    const openBook = (url, title) => {
        setOpenBookUrl(url);
        setBookTitle(title);
        setBookZoom(1);
        document.body.classList.add('book-reader-open');
    };

    const closeBook = () => {
        setOpenBookUrl(null);
        document.body.classList.remove('book-reader-open');
    };

    const changeBookZoom = (amount) => {
        setBookZoom((prev) => Math.min(2, Math.max(0.7, prev + amount)));
    };

    return (
        <section className="books-section" id="buku">
            <div className="container">
                <div className="section-header">
                    <div>
                        <div className="section-kicker">Literasi Kesehatan</div>
                        <h2 className="section-title">Buku & Panduan UKS</h2>
                    </div>
                    <a href="#" className="section-link">
                        Lihat Semua <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>

                <div className="books-grid">
                    {defaultBuku.map((buku) => (
                        <article key={buku.id} className="book-card">
                            <div className="book-cover">
                                <img src={buku.cover} alt={`Cover ${buku.judul}`} />
                            </div>
                            <h3>{buku.judul}</h3>
                            <div className="book-meta">
                                {buku.kategori} • {buku.tahun || 'UKS'}
                            </div>
                            <div className="book-actions">
                                <button className="book-button" type="button" onClick={() => openBook(buku.pdf, buku.judul)}>
                                    <i className="fa-solid fa-book-open"></i> Baca Buku
                                </button>
                                <a href={buku.pdf} className="book-download" download>
                                    <i className="fa-solid fa-download"></i> Unduh
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* PDF READER MODAL */}
                <div 
                    className={`book-reader ${openBookUrl ? 'show' : ''}`} 
                    role="dialog" 
                    aria-modal="true" 
                    aria-labelledby="bookReaderTitle" 
                    aria-hidden={!openBookUrl}
                >
                    <div className="book-reader-header">
                        <div className="book-reader-title" id="bookReaderTitle">{bookTitle}</div>
                        <div className="book-reader-controls">
                            <button className="book-reader-zoom" type="button" onClick={() => changeBookZoom(-0.1)} aria-label="Perkecil buku">
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <button className="book-reader-zoom" type="button" onClick={() => changeBookZoom(0.1)} aria-label="Perbesar buku">
                                <i className="fa-solid fa-plus"></i>
                            </button>
                            <button className="book-reader-close" type="button" onClick={closeBook} aria-label="Tutup pembaca buku">
                                <i className="fa-solid fa-xmark"></i> Tutup
                            </button>
                        </div>
                    </div>
                    <div className="book-reader-frame-wrap">
                        {openBookUrl && (
                            <iframe 
                                id="bookReaderFrame" 
                                title="Pembaca buku"
                                src={`${openBookUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                                style={{ transform: `scale(${bookZoom})` }}
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
