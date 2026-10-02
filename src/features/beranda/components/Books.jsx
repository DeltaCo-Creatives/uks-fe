import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useBukuPanduanList } from '@/hooks/usePublicLists';
import { countPublikasiView } from '@/utils/counters';
import SafeImage from '@/components/SafeImage';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';

const MARQUEE_PX_PER_SECOND = 40;

// GSAP drives the overlay through inline `transform`, so the parked position must be a `transform` too:
// translate-x-full would set the separate `translate` property and stay applied under GSAP.
// Spring transitions and fadeIn/bubblyPop keyframes come from index.css.
const ALL_BOOKS_VIEW = 'fixed inset-0 z-[99998] overflow-hidden bg-app [transform:translateX(100%)]';
const BACK_BUTTON = 'flex size-14 items-center justify-center rounded-[50%] bg-white text-[20px] text-ink shadow-raised [transition:var(--spring)] hover:bg-ink hover:text-white hover:[transform:scale(1.1)_translateX(-8px)]';
const PDF_CLOSE = 'flex size-10 shrink-0 items-center justify-center rounded-[50%] bg-app [transition:var(--spring)] hover:bg-[#ff4757] hover:text-white hover:[transform:scale(1.1)_rotate(90deg)]';

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
    // The row holds still while a card is hovered, keyboard-focused, or its PDF is open.
    const hold = useRef({ hover: false, focus: false, modal: false });
    const syncMarquee = () => {
        const { hover, focus, modal } = hold.current;
        if (hover || focus || modal) marqueeTween.current?.pause();
        else marqueeTween.current?.play();
    };
    const holdMarquee = (key, value) => {
        hold.current[key] = value;
        syncMarquee();
    };

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
        holdMarquee('modal', Boolean(selectedBook));
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
                <div className="section-header gap-3!" data-gsap="reveal">
                    <div>
                        <span className="section-kicker">Perpustakaan</span>
                        <h2 className="section-title">Buku &amp; Panduan</h2>
                    </div>
                    <button className="btn-pill primary home-section-more" onClick={handleLihatSemua}>
                        Lihat Semua Buku <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </button>
                </div>
            </div>

            <div className="container">
                <div className="cards-marquee is-contained" data-gsap="reveal">
                    <div
                        className="cards-marquee-track"
                        ref={trackRef}
                        onMouseEnter={() => holdMarquee('hover', true)}
                        onMouseLeave={() => holdMarquee('hover', false)}
                        // Mouse-click focus must not pin the row; only keyboard focus does.
                        onFocus={(e) => e.target.matches(':focus-visible') && holdMarquee('focus', true)}
                        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && holdMarquee('focus', false)}
                    >
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
            </div>

            {/* ALL BOOKS OVERLAY — always in DOM, GSAP slides it in/out */}
            <div className={ALL_BOOKS_VIEW} ref={overlayRef}>
                <div className="container relative flex h-full flex-col">
                    <div className="flex items-center gap-6 pt-10 pb-5">
                        <button className={BACK_BUTTON} onClick={handleKembali}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <h2 className="text-[32px] tracking-[-0.02em]">Semua Koleksi Perpustakaan</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto pb-20 [scrollbar-color:var(--brand-primary)_transparent] [scrollbar-width:thin]">
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 py-4">
                            {(booksList || []).map((buku) => (
                                <div key={`grid-${buku.id}`} className="swipe-card book-swipe-card grid-card w-full! flex-none!">
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
                <div
                    className="fixed inset-0 z-[100000] flex animate-[fadeIn_0.3s_ease_forwards] items-center justify-center bg-[rgba(17,28,22,0.4)] p-6 backdrop-blur-[12px]"
                    onClick={() => setSelectedBook(null)}
                >
                    <div
                        className="flex h-[85vh] w-full max-w-[1000px] animate-[bubblyPop_0.6s_cubic-bezier(0.34,1.56,0.64,1)_forwards] flex-col overflow-hidden rounded-panel bg-white shadow-[0_40px_100px_rgba(0,0,0,0.3)]"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-black/[0.04] bg-white px-6 py-4">
                            <h3 className="overflow-hidden pr-6 text-[18px] text-ellipsis whitespace-nowrap">{selectedBook.title}</h3>
                            <button className={PDF_CLOSE} onClick={() => setSelectedBook(null)} aria-label="Tutup">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <iframe className="w-full flex-1 bg-[#f0f0f0]" src={`${selectedBook.pdf}#view=Fit`} title={selectedBook.title} />
                    </div>
                </div>
            )}
        </section>
    );
}
