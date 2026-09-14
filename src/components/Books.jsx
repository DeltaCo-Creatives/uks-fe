import { defaultBuku } from '../data/mockData';

export default function Books() {
    return (
        <section className="section" id="buku" style={{ overflow: 'hidden' }}>
            <div className="container">
                <div className="section-header reveal-on-scroll">
                    <div>
                        <span className="section-kicker">Perpustakaan</span>
                        <h2 className="section-title">Buku & Panduan</h2>
                    </div>
                </div>
            </div>

            <div className="swipe-track-wrapper">
                <div className="swipe-track">
                    {defaultBuku.map((buku) => (
                        <div key={buku.id} className="swipe-card book-swipe-card reveal-on-scroll">
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
