import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { priorityProgramsList, realNewsList } from '../data/portalData';

const MARQUEE_PX_PER_SECOND = 40;

export default function Programs({ onNavigateView }) {
    const trackRef = useRef(null);

    // Repeat programs so each half is sufficiently wide (> 3500px)
    const marqueePrograms = useMemo(() => [
        ...priorityProgramsList, ...priorityProgramsList, ...priorityProgramsList
    ], []);

    // Initialize unstoppable GSAP Marquee
    useEffect(() => {
        const marqueeTween = gsap.to(trackRef.current, {
            xPercent: -50,
            repeat: -1,
            // Constant speed rather than a constant duration: the track holds
            // several copies of the list, so a fixed duration sped the row up
            // every time an item was added.
            duration: (trackRef.current.scrollWidth / 2) / MARQUEE_PX_PER_SECOND,
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
                            onClick={() => onNavigateView('berita-detail', null, item.slug)}
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
        </section>
    );
}
