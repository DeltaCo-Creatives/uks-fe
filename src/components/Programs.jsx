import { defaultBerita, defaultPrograms } from '../data/mockData';

function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function truncate(text, maxLength) {
    const clean = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return clean.length > maxLength ? clean.slice(0, maxLength).trim() + '...' : clean;
}

export default function Programs() {
    return (
        <>
            {/* ===== BERITA & PROGRAM ===== */}
            <section className="section" id="berita">
                <div className="container">

                    <div className="section-header">
                        <div>
                            <h2 className="section-title">Berita UKS</h2>
                        </div>
                        <a href="#" className="section-link">
                            Lihat Semua <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>

                    {/* News Grid — same structure as cms-loader renderBerita() */}
                    <div className="news-grid" id="newsGrid">
                        {defaultBerita.map((item) => (
                            <article key={item.id} className="news-card">
                                <div className="news-image">
                                    <img src={item.gambar} alt={item.judul} />
                                    {item.kategori && (
                                        <span className="news-category">{item.kategori}</span>
                                    )}
                                </div>
                                <div className="news-body">
                                    <div className="news-date">{formatDate(item.tanggal)}</div>
                                    <h3>{item.judul}</h3>
                                    <p>{truncate(item.isi, 180)}</p>
                                    <a href="#" className="news-read">
                                        Baca Selengkapnya <i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Program Cards */}
                    <div className="programs-block">
                        <h2 className="programs-title">Program UKS</h2>
                        <div className="programs-grid">
                            {defaultPrograms.map((program, index) => (
                                <article key={index} className="program-card">
                                    <img
                                        className={`program-photo${program.title === 'Lingkungan Sekolah Sehat' ? ' program-photo-environment' : ''}`}
                                        src={program.image}
                                        alt={`Foto ${program.title}`}
                                    />
                                    <h3>{program.title}</h3>
                                    <p>{program.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* ===== SEMUA BERITA (hidden section used by CMS) ===== */}
            <section className="section" id="semua-berita">
                <div className="container">
                    <div className="section-header" style={{ display: 'none' }}>
                        <div></div><div></div>
                    </div>
                    <div className="news-grid" id="allNewsGrid"></div>
                </div>
            </section>
        </>
    );
}
