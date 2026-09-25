import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useBukuPanduanList } from '../hooks/usePublicLists';
import { countPublikasiView } from '../utils/counters';
import SafeImage from './SafeImage';
import { LoadingState, ErrorState, EmptyState } from './shared/AsyncState';

const MARQUEE_PX_PER_SECOND = 40;

/** `[category, year]` joined without printing a stray separator when either is missing. */
function bookMeta(buku) {
    return [buku.category, buku.year].filter(Boolean).join(' · ');
}

export default function Books() {
    const { data: booksList, loading, error, retry } = useBukuPanduanList();
    const hasBooks = !loading && !error && Boolean(booksList?.length);

    const [selectedBook, setSelectedBook] = useState(null);
    const marqueeTween = useRef(null);
    const overlayRef = useRef(null);
    const trackRef = useRef(null);

    // Repeat books 4x per half so the track is over 3500px wide, preventing empty space on wide displays
    const marqueeBooks = useMemo(() => {
        const list = booksList || [];
        return [...list, ...list, ...list, ...list];
    }, [booksList]);

    // Initialize GSAP Marquee once the list has loaded and the track has rendered.
    useEffect(() => {
        if (!hasBooks || !trackRef.current) return undefined;

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
    }, [hasBooks]);

    // Lock scroll when PDF modal is open
    useEffect(() => {
        if (selectedBook) {
            document.body.style.overflow = 'hidden';
            gsap.to('.nav-dynamic-wrapper', { y: -100, opacity: 0, duration: 0.5, ease: 'back.in(1.2)' });
        } else {
            document.body.style.overflow = '';
            gsap.to('.nav-dynamic-wrapper', { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.2)', clearProps: 'all' });
        }
    }, [selectedBook]);

    const handleLihatSemua = () => {
        // Ramp up warp speed
        marqueeTween.current.play();
        gsap.to(marqueeTween.current, { timeScale: 80, duration: 1.2, ease: 'power4.in' });
        gsap.to(trackRef.current, { filter: 'blur(24px) contrast(1.3)', duration: 1.2, ease: 'power4.in' });

        // At max velocity, slide the overlay in from the right
        setTimeout(() => {
            document.body.style.overflow = 'hidden';
            const overlay = overlayRef.current;
            const cards = overlay.querySelectorAll('.grid-card');

            // The overlay is always in the DOM but positioned off-screen.
            // Animate it sliding in from the right.
            gsap.timeline()
                .fromTo(overlay,
                    { x: '100%' },
                    { x: '0%', duration: 0.5, ease: 'power3.inOut' }
                )
                .fromTo(cards,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'back.out(1.4)' },
                    '-=0.1'
                );
        }, 1200);
    };

    const handleKembali = () => {
        const overlay = overlayRef.current;
        gsap.to(overlay, {
            x: '-100%',
            duration: 0.5,
            ease: 'power3.inOut',
            onComplete: () => {
                document.body.style.overflow = '';
                // Decelerate marquee
                gsap.to(marqueeTween.current, { timeScale: 1, duration: 1.5, ease: 'power2.out' });
                gsap.to(trackRef.current, { filter: 'blur(0px) contrast(1)', duration: 1.5 });
            }
        });
    };

    // No PDF on the record: fall back to the source link when there is one,
    // otherwise there is nothing to open.
    const renderActions = (buku) => {
        if (!buku.pdf && !buku.externalUrl) return null;
        return (
            <div className="book-swipe-actions">
                {buku.pdf ? (
                    <>
                        <button className="btn-pill primary" onClick={() => { countPublikasiView(buku.slug); setSelectedBook(buku); }}>Baca</button>
                        <a className="btn-pill secondary" href={buku.pdf} download>Unduh</a>
                    </>
                ) : (
                    <a className="btn-pill secondary" href={buku.externalUrl} target="_blank" rel="noopener noreferrer">Buka</a>
                )}
            </div>
        );
    };

    if (!hasBooks) {
        return (
            <section className="section" id="buku">
                <div className="container">
                    <div className="section-header" data-gsap="reveal">
                        <div>
                            <span className="section-kicker">Perpustakaan</span>
                            <h2 className="section-title">Buku &amp; Panduan</h2>
                        </div>
                    </div>
                    {loading && <LoadingState label="Memuat buku & panduan..." />}
                    {!loading && error && <ErrorState title="Buku & panduan tidak dapat dimuat" retry={retry} />}
                    {!loading && !error && (
                        <EmptyState
                            icon="fa-solid fa-book-bookmark"
                            title="Belum ada buku yang tersedia"
                            text="Buku dan pedoman akan tampil di sini begitu tersedia."
                        />
                    )}
                </div>
            </section>
        );
    }

    return (
        <section className="section" id="buku">
            <div className="container">
                <div className="section-header" data-gsap="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                        <span className="section-kicker">Perpustakaan</span>
                        <h2 className="section-title">Buku &amp; Panduan</h2>
                    </div>
                    <button className="btn-pill secondary" onClick={handleLihatSemua} style={{ padding: '12px 24px', flex: 'none' }}>
                        Lihat Semua <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                    </button>
                </div>
            </div>

            <div className="cards-marquee" data-gsap="reveal">
                <div className="cards-marquee-track" ref={trackRef}>
                    {/* First half */}
                    {marqueeBooks.map((buku, idx) => (
                        <div key={`b1-${idx}`} className="swipe-card book-swipe-card">
                            <div className="book-cover-large">
                                <SafeImage src={buku.cover} alt={buku.title} icon="fa-regular fa-file-pdf" />
                            </div>
                            <h3>{buku.title}</h3>
                            {bookMeta(buku) && <p>{bookMeta(buku)}</p>}
                            {renderActions(buku)}
                        </div>
                    ))}
                    {/* Duplicated half for seamless infinite loop */}
                    {marqueeBooks.map((buku, idx) => (
                        <div key={`b2-${idx}`} className="swipe-card book-swipe-card">
                            <div className="book-cover-large">
                                <SafeImage src={buku.cover} alt={buku.title} icon="fa-regular fa-file-pdf" />
                            </div>
                            <h3>{buku.title}</h3>
                            {bookMeta(buku) && <p>{bookMeta(buku)}</p>}
                            {renderActions(buku)}
                        </div>
                    ))}
                </div>
            </div>

            {/* ALL BOOKS OVERLAY — always in DOM, GSAP slides it in/out */}
            <div className="all-books-view" ref={overlayRef}>
                <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="all-books-header">
                        <button className="kembali-btn" onClick={handleKembali}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <h2>Semua Koleksi Perpustakaan</h2>
                    </div>
                    <div className="all-books-scroll-area">
                        <div className="all-books-grid">
                            {(booksList || []).map((buku) => (
                                <div key={`grid-${buku.id}`} className="swipe-card book-swipe-card grid-card">
                                    <div className="book-cover-large">
                                        <SafeImage src={buku.cover} alt={buku.title} icon="fa-regular fa-file-pdf" />
                                    </div>
                                    <h3>{buku.title}</h3>
                                    {bookMeta(buku) && <p>{bookMeta(buku)}</p>}
                                    {renderActions(buku)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bubbly PDF Modal */}
            {selectedBook && (
                <div className="pdf-modal-overlay" onClick={() => setSelectedBook(null)} style={{ zIndex: 100000 }}>
                    <div className="pdf-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="pdf-modal-header">
                            <h3>{selectedBook.title}</h3>
                            <button className="pdf-modal-close" onClick={() => setSelectedBook(null)} aria-label="Tutup">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <iframe src={`${selectedBook.pdf}#view=Fit`} title={selectedBook.title} />
                    </div>
                </div>
            )}
        </section>
    );
}
