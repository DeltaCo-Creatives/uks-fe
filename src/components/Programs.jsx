import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { defaultPrograms, defaultBerita } from '../data/mockData';

export default function Programs() {
    const trackRef = useRef(null);

    // Initialize unstoppable GSAP Marquee
    useEffect(() => {
        const marqueeTween = gsap.to(trackRef.current, {
            xPercent: -50,
            repeat: -1,
            duration: 40,
            ease: 'none'
        });

        return () => {
            if (marqueeTween) marqueeTween.kill();
        };
    }, []);

    return (
        <section className="section" id="berita">
            <div className="container">
                <div className="section-header" data-gsap="reveal">
                    <div>
                        <span className="section-kicker">Eksplorasi</span>
                        <h2 className="section-title">Program Unggulan</h2>
                    </div>
                </div>
            </div>

            <div className="cards-marquee" data-gsap="reveal">
                <div className="cards-marquee-track" ref={trackRef}>
                    {/* First set */}
                    {defaultPrograms.map((p, i) => (
                        <div key={i} className="swipe-card">
                            <div className="program-icon">
                                <i className={p.icon || 'fa-solid fa-star'}></i>
                            </div>
                            <h3>{p.title}</h3>
                            <p>{p.description}</p>
                        </div>
                    ))}
                    {/* Duplicated set for seamless infinite loop */}
                    {defaultPrograms.map((p, i) => (
                        <div key={`dup-${i}`} className="swipe-card">
                            <div className="program-icon">
                                <i className={p.icon || 'fa-solid fa-star'}></i>
                            </div>
                            <h3>{p.title}</h3>
                            <p>{p.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container" style={{ marginTop: '80px' }}>
                <div className="section-header" data-gsap="reveal">
                    <div>
                        <span className="section-kicker">Update</span>
                        <h2 className="section-title">Kabar Terbaru</h2>
                    </div>
                </div>

                <div className="news-masonry">
                    {defaultBerita.map((item) => (
                        <article key={item.id} className="news-card-playful" data-gsap="reveal">
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
