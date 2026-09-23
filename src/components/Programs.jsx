import { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { priorityProgramsList } from '../data/portalData';
import { pathForArticle } from '../routes';
import { useBeritaList } from '../hooks/useBerita';
import SafeImage from './SafeImage';

const MARQUEE_PX_PER_SECOND = 40;

export default function Programs() {
    const trackRef = useRef(null);
    const { data: newsList, loading, error, retry } = useBeritaList();
    const latestNews = (newsList || []).slice(0, 6);

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

                {loading && (
                    <div className="content-toolbar-empty" role="status" aria-live="polite">
                        <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i>
                        <h4 className="info-empty-title">Memuat kabar terbaru...</h4>
                    </div>
                )}

                {!loading && error && (
                    <div className="content-toolbar-empty">
                        <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                        <h4 className="info-empty-title">Kabar terbaru tidak dapat dimuat</h4>
                        <p className="info-empty-text">Terjadi gangguan saat mengambil data warta. Silakan coba lagi.</p>
                        <button type="button" className="btn-pill secondary" onClick={retry} style={{ marginTop: '12px' }}>
                            Coba Lagi
                        </button>
                    </div>
                )}

                {!loading && !error && latestNews.length === 0 && (
                    <div className="content-toolbar-empty">
                        <i className="fa-solid fa-newspaper" aria-hidden="true"></i>
                        <h4 className="info-empty-title">Belum ada kabar terbaru</h4>
                        <p className="info-empty-text">Warta terkini akan tampil di sini begitu tersedia.</p>
                    </div>
                )}

                {!loading && !error && latestNews.length > 0 && (
                    <div className="news-masonry">
                        {latestNews.map((item) => (
                            <Link
                                key={item.id}
                                to={pathForArticle(item.slug)}
                                className="news-card-playful"
                                data-gsap="reveal"
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="news-img-wrap">
                                    <SafeImage src={item.image} alt={item.title} />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.excerpt.substring(0, 100)}...</p>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-primary)' }}>
                                    Baca Selengkapnya &rarr;
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
