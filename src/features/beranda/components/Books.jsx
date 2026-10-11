import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { pathForTab } from '@/routes';
import { useBukuPanduanList } from '@/hooks/usePublicLists';
import { countPublikasiDownload, countPublikasiView } from '@/utils/counters';
import { downloadFile } from '@/utils/downloadFile';
import SafeImage from '@/components/SafeImage';
import DocViewerModal from '@/components/shared/DocViewerModal';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { MARQUEE_FRAME, MARQUEE_TRACK, SECTION_MORE_BUTTON } from '../styles';
import { useMarqueeHold } from '../useMarqueeHold';

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
    const trackRef = useRef(null);
    const { hold: holdMarquee, trackProps } = useMarqueeHold(marqueeTween);

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

    // Pause the marquee behind the reader; DocViewerModal locks scroll itself.
    useEffect(() => {
        holdMarquee('modal', Boolean(selectedBook));
    }, [selectedBook, holdMarquee]);

    // No PDF on the record: fall back to the source link when there is one,
    // otherwise there is nothing to open.
    const renderActions = (buku) => {
        if (!buku.pdf && !buku.externalUrl) return null;
        return (
            <div className="book-swipe-actions">
                {buku.pdf ? (
                    <>
                        <button className="btn-pill primary" onClick={() => { countPublikasiView(buku.slug); setSelectedBook(buku); }}>Baca</button>
                        <a className="btn-pill secondary" href={buku.pdf} download onClick={(e) => { countPublikasiDownload(buku.slug); downloadFile(e, buku.pdf, buku.title); }}>Unduh</a>
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
                    <Link to={pathForTab('publikasi', 'buku')} className={`btn-pill primary ${SECTION_MORE_BUTTON}`}>
                        Lihat Semua Buku <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </Link>
                </div>
            </div>

            <div className="container">
                <div className={MARQUEE_FRAME} data-gsap="reveal">
                    <div
                        className={MARQUEE_TRACK}
                        ref={trackRef}
                        {...trackProps}
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

            {selectedBook && (
                <DocViewerModal
                    doc={{
                        title: selectedBook.title,
                        url: selectedBook.pdf,
                        kind: 'pdf',
                        meta: [selectedBook.pages, selectedBook.size].filter(Boolean).join(' · '),
                        download: selectedBook.pdf,
                        slug: selectedBook.slug
                    }}
                    onClose={() => setSelectedBook(null)}
                />
            )}
        </section>
    );
}
