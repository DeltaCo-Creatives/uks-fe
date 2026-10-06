import { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { pathForArticle, pathForProgram, pathForTab } from '@/routes';
import { beritaHookFor } from '@/hooks/useBerita';
import { useNavConfig } from '@/hooks/useNavConfig';
import { useProgramList } from '@/hooks/usePublicLists';
import SafeImage from '@/components/SafeImage';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { MARQUEE_FRAME, MARQUEE_TRACK, SECTION_MORE_BUTTON } from '../styles';
import { useMarqueeHold } from '../useMarqueeHold';

const MARQUEE_PX_PER_SECOND = 40;

export default function Programs() {
    // "Warta Terkini" is the seeded berita submenu only; the static fallback has no id, so it lists all berita.
    const beritaId = useNavConfig().informasi.sections.find((s) => s.slug === 'berita')?.submenuId;
    // Keyed so a submenu list that arrives late (after the nav wait) remounts and fetches the filtered list.
    return <ProgramsSection key={beritaId ?? 'all'} beritaId={beritaId} />;
}

function ProgramsSection({ beritaId }) {
    const trackRef = useRef(null);
    const marqueeTween = useRef(null);
    const { trackProps } = useMarqueeHold(marqueeTween);
    const useList = beritaHookFor(beritaId);
    const { data: newsList, loading, error, retry } = useList();
    const latestNews = (newsList || []).slice(0, 4);
    // Decorative row: it stays out until the programs load and is skipped if they fail.
    const { data: programs } = useProgramList();

    // Repeat programs so each half is sufficiently wide (> 3500px)
    const marqueePrograms = useMemo(() => {
        const list = programs || [];
        return [...list, ...list, ...list];
    }, [programs]);

    // Initialize unstoppable GSAP Marquee
    useEffect(() => {
        if (marqueePrograms.length === 0) return undefined;
        marqueeTween.current = gsap.to(trackRef.current, {
            xPercent: -50,
            repeat: -1,
            // Constant speed rather than a constant duration: the track holds
            // several copies of the list, so a fixed duration sped the row up
            // every time an item was added.
            duration: (trackRef.current.scrollWidth / 2) / MARQUEE_PX_PER_SECOND,
            ease: 'none'
        });

        return () => {
            if (marqueeTween.current) marqueeTween.current.kill();
        };
    }, [marqueePrograms]);

    return (
        <section className="section" id="berita">
            {marqueePrograms.length > 0 && (
                <>
                    <div className="container">
                        <div className="section-header" data-gsap="reveal">
                            <div>
                                <span className="section-kicker">Eksplorasi</span>
                                <h2 className="section-title">Program Unggulan</h2>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className={MARQUEE_FRAME} data-gsap="reveal">
                            <div className={MARQUEE_TRACK} ref={trackRef} {...trackProps}>
                                {/* Each card opens its program page. Only the first pass is exposed to keyboard and screen readers; the rest are loop copies. */}
                                {[...marqueePrograms, ...marqueePrograms].map((p, i) => {
                                    const hidden = i >= programs.length;
                                    return (
                                        <Link
                                            key={i}
                                            to={pathForProgram(p.slug)}
                                            className="swipe-card"
                                            aria-hidden={hidden || undefined}
                                            tabIndex={hidden ? -1 : undefined}
                                        >
                                            <div className="mb-3.5 flex size-14 items-center justify-center rounded-[50%] bg-app text-[24px] text-brand">
                                                <i className={p.ikon || 'fa-solid fa-star'}></i>
                                            </div>
                                            <h3>{p.judul}</h3>
                                            <p>{p.ringkasan}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div id="sec-home-news" className="container mt-7!">
                <div className="section-header" data-gsap="reveal">
                    <div>
                        <span className="section-kicker">Update</span>
                        <h2 className="section-title">Kabar Terbaru</h2>
                    </div>
                    <Link to={pathForTab('informasi', 'berita')} className={`btn-pill primary ${SECTION_MORE_BUTTON}`}>
                        Lihat Semua Warta <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </Link>
                </div>

                {loading && <LoadingState label="Memuat kabar terbaru..." />}

                {!loading && error && (
                    <ErrorState
                        title="Kabar terbaru tidak dapat dimuat"
                        text="Terjadi gangguan saat mengambil data warta. Silakan coba lagi."
                        retry={retry}
                    />
                )}

                {!loading && !error && latestNews.length === 0 && (
                    <EmptyState
                        icon="fa-solid fa-newspaper"
                        title="Belum ada kabar terbaru"
                        text="Warta terkini akan tampil di sini begitu tersedia."
                    />
                )}

                {!loading && !error && latestNews.length > 0 && (
                    <div className="news-masonry">
                        {latestNews.map((item) => (
                            <Link
                                key={item.id}
                                to={pathForArticle(item.slug, item.submenuSlug)}
                                className="news-card-playful"
                                data-gsap="reveal"
                            >
                                <div className="news-img-wrap">
                                    <SafeImage src={item.image} alt={item.title} />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.excerpt}</p>
                                <span className="mt-auto text-[12px] font-bold text-brand-deep">Baca Selengkapnya &rarr;</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
