import { defaultBuku } from '../data/mockData';

export default function Books() {
    return (
        <section className="section" id="buku">
            <div className="container">
                <div className="section-header" data-gsap="reveal">
                    <div>
                        <span className="section-kicker">Perpustakaan</span>
                        <h2 className="section-title">Buku &amp; Panduan</h2>
                    </div>
                </div>
            </div>

            <div className="cards-marquee" data-gsap="reveal">
                <div className="cards-marquee-track">
                    {/* First set */}
                    {defaultBuku.map((buku) => (
                        <div key={buku.id} className="swipe-card book-swipe-card">
                            <div className="book-cover-large">
                                <img src={buku.cover} alt={buku.judul} />
                            </div>
                            <h3>{buku.judul}</h3>
                            <p>{buku.kategori} · {buku.tahun}</p>
                            <div className="book-swipe-actions">
                                <button className="btn-pill primary" onClick={() => window.open(buku.pdf, '_blank')}>
                                    Baca
                                </button>
                                <a className="btn-pill secondary" href={buku.pdf} download>
                                    Unduh
                                </a>
                            </div>
                        </div>
                    ))}
                    {/* Duplicated set for seamless infinite loop */}
                    {defaultBuku.map((buku) => (
                        <div key={`dup-${buku.id}`} className="swipe-card book-swipe-card">
                            <div className="book-cover-large">
                                <img src={buku.cover} alt={buku.judul} />
                            </div>
                            <h3>{buku.judul}</h3>
                            <p>{buku.kategori} · {buku.tahun}</p>
                            <div className="book-swipe-actions">
                                <button className="btn-pill primary" onClick={() => window.open(buku.pdf, '_blank')}>
                                    Baca
                                </button>
                                <a className="btn-pill secondary" href={buku.pdf} download>
                                    Unduh
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
