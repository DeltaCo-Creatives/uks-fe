import { defaultPrograms, defaultBerita } from '../data/mockData';

export default function Programs() {
    return (
        <section className="section" id="berita" style={{ overflow: 'hidden' }}>
            
            <div className="container">
                <div className="section-header reveal-on-scroll">
                    <div>
                        <span className="section-kicker">Eksplorasi</span>
                        <h2 className="section-title">Program Unggulan</h2>
                    </div>
                </div>
            </div>

            <div className="swipe-track-wrapper">
                <div className="swipe-track">
                    {defaultPrograms.map((p, i) => (
                        <div key={i} className="swipe-card reveal-on-scroll">
                            <div className="program-icon">
                                <i className={p.icon || "fa-solid fa-star"}></i>
                            </div>
                            <h3>{p.title}</h3>
                            <p>{p.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container" style={{ marginTop: '80px' }}>
                <div className="section-header reveal-on-scroll">
                    <div>
                        <span className="section-kicker">Update</span>
                        <h2 className="section-title">Kabar Terbaru</h2>
                    </div>
                </div>
                
                <div className="news-masonry">
                    {defaultBerita.map((item) => (
                        <article key={item.id} className="news-card-playful reveal-on-scroll">
                            <div className="news-img-wrap">
                                <img src={item.gambar} alt={item.judul} />
                            </div>
                            <h3>{item.judul}</h3>
                            <p>{item.isi.substring(0, 100)}...</p>
                        </article>
                    ))}
                </div>
            </div>
            
        </section>
    );
}
