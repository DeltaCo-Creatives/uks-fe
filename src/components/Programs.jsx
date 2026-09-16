import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { priorityProgramsList, realNewsList } from '../data/portalData';

export default function Programs() {
    const trackRef = useRef(null);
    const [selectedNews, setSelectedNews] = useState(null);

    // Repeat programs so each half is sufficiently wide (> 3500px)
    const marqueePrograms = useMemo(() => [
        ...priorityProgramsList, ...priorityProgramsList, ...priorityProgramsList
    ], []);

    // Initialize unstoppable GSAP Marquee
    useEffect(() => {
        const marqueeTween = gsap.to(trackRef.current, {
            xPercent: -50,
            repeat: -1,
            duration: 45,
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
                    {marqueePrograms.map((p, i) => (
                        <div key={`p1-${i}`} className="swipe-card">
                            <div className="program-icon">
                                <i className={p.icon || 'fa-solid fa-star'}></i>
                            </div>
                            <h3>{p.title}</h3>
                            <p>{p.desc}</p>
                        </div>
                    ))}
                    {/* Duplicated set for seamless infinite loop */}
                    {marqueePrograms.map((p, i) => (
                        <div key={`p2-${i}`} className="swipe-card">
                            <div className="program-icon">
                                <i className={p.icon || 'fa-solid fa-star'}></i>
                            </div>
                            <h3>{p.title}</h3>
                            <p>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div id="sec-home-news" className="container" style={{ marginTop: '28px' }}>
                <div className="section-header" data-gsap="reveal">
                    <div>
                        <span className="section-kicker">Update</span>
                        <h2 className="section-title">Kabar Terbaru</h2>
                    </div>
                </div>

                <div className="news-masonry">
                    {realNewsList.map((item) => (
                        <article
                            key={item.id}
                            className="news-card-playful"
                            data-gsap="reveal"
                            onClick={() => setSelectedNews(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="news-img-wrap">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.excerpt.substring(0, 100)}...</p>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-primary)' }}>
                                Baca Selengkapnya &rarr;
                            </span>
                        </article>
                    ))}
                </div>
            </div>

            {/* Full News Article Modal */}
            {selectedNews && (
                <div className="pdf-modal-overlay" onClick={() => setSelectedNews(null)} style={{ zIndex: 100000 }}>
                    <div
                        className="pdf-modal-content"
                        onClick={e => e.stopPropagation()}
                        style={{ maxWidth: '720px', height: 'auto', maxHeight: '85vh', overflowY: 'auto', padding: '24px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div>
                                <span className="section-kicker" style={{ marginBottom: '8px' }}>{selectedNews.category} · {selectedNews.date}</span>
                                <h3 style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1.25, margin: '4px 0' }}>{selectedNews.title}</h3>
                            </div>
                            <button
                                className="pdf-modal-close"
                                onClick={() => setSelectedNews(null)}
                                aria-label="Tutup"
                                style={{ marginLeft: '16px' }}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div style={{ width: '100%', height: '280px', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
                            <img src={selectedNews.image} alt={selectedNews.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#37473D' }}>
                            {selectedNews.excerpt}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
