import { useMemo, useRef, useState } from 'react';
import { useInfografisList, useMitraList } from '../hooks/usePublicLists';
import { NEW_TAB_HINT } from '../utils/linkKind';
import SafeImage from './SafeImage';
import { LoadingState, ErrorState, EmptyState } from './shared/AsyncState';

// Each strip scrolls by half its width, so a half must be wider than the container or a gap shows at the loop point.
const MIN_LOGOS_PER_HALF = 8;
// Keeps the pace of the original 14-logo, 70s strip whatever the partner count.
const SECONDS_PER_LOGO = 5;

const isHttpUrl = (url) => /^https?:\/\//i.test(url ?? '');

/** One marquee logo: a new-tab link when the partner has a website, a plain tile otherwise. */
function PartnerLogo({ partner, hidden }) {
    const logo = <SafeImage src={partner.logoUrl} alt={partner.nama} fallbackType="logo" loading="lazy" />;

    if (!isHttpUrl(partner.website)) {
        return <div className="screenshot-item" aria-hidden={hidden || undefined}>{logo}</div>;
    }

    return (
        <a
            className="screenshot-item"
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${partner.nama} ${NEW_TAB_HINT}`}
            aria-hidden={hidden || undefined}
            tabIndex={hidden ? -1 : undefined}
        >
            {logo}
        </a>
    );
}

export default function Infografis() {
    const [selectedImage, setSelectedImage] = useState(null);
    const { data: infografisList, loading, error, retry } = useInfografisList();
    const items = infografisList || [];

    // The strip is secondary, so it stays hidden while loading, on error, or with no logos.
    const { data: mitraData } = useMitraList();
    const partners = useMemo(
        () => (mitraData?.kelompokTahun ?? []).flatMap((year) => year.mitra ?? []).filter((partner) => partner?.logoUrl),
        [mitraData]
    );
    const half = useMemo(() => {
        if (partners.length === 0) return [];
        const copies = Math.ceil(MIN_LOGOS_PER_HALF / partners.length);
        return Array.from({ length: copies }, () => partners).flat();
    }, [partners]);
    const track = [...half, ...half];
    const stripStyle = { animationDuration: `${half.length * SECONDS_PER_LOGO}s` };

    // Browsers leave a half-clipped focused logo where it is, so pull a keyboard-focused one fully into view.
    const revealFocusedLogo = (event) => {
        if (event.target.matches(':focus-visible')) {
            event.target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    };

    // Focus scrolling shifts the clipped marquee sideways; undo it once focus leaves the row.
    const marqueeRef = useRef(null);
    const resetMarqueeScroll = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget) && marqueeRef.current) {
            marqueeRef.current.scrollLeft = 0;
        }
    };

    return (
        <section className="section" id="infografis">
            <div className="container">
                <div className="section-header" data-gsap="reveal">
                    <div>
                        <span className="section-kicker">Galeri</span>
                        <h2 className="section-title">Visual Inspirasi</h2>
                    </div>
                </div>

                {loading && <LoadingState label="Memuat infografis..." />}

                {!loading && error && <ErrorState title="Infografis tidak dapat dimuat" retry={retry} />}

                {!loading && !error && items.length === 0 && (
                    <EmptyState
                        icon="fa-solid fa-image"
                        title="Belum ada infografis yang tersedia"
                        text="Poster dan infografis akan tampil di sini begitu tersedia."
                    />
                )}

                {!loading && !error && items.length > 0 && (
                    <div className="info-bento">
                        {items.map((info, i) => (
                            <div key={info.id} className={`info-item ${i === 0 ? 'large' : ''}`} data-gsap="reveal" onClick={() => info.image && setSelectedImage(info.image)}>
                                <SafeImage src={info.image} alt={info.title} />
                            </div>
                        ))}
                    </div>
                )}

                {track.length > 0 && (
                    <div className="screenshots-marquee" style={{ marginTop: '32px' }} ref={marqueeRef}>
                        {/* Only the first pass of the first row is exposed to keyboard and screen readers; the rest are loop copies. */}
                        <div className="screenshots-strip" style={stripStyle} onFocus={revealFocusedLogo} onBlur={resetMarqueeScroll}>
                            {track.map((partner, i) => (
                                <PartnerLogo key={`a-${partner.id}-${i}`} partner={partner} hidden={i >= partners.length} />
                            ))}
                        </div>
                        <div className="screenshots-strip strip-reverse" style={stripStyle} aria-hidden="true">
                            {track.map((partner, i) => (
                                <PartnerLogo key={`b-${partner.id}-${i}`} partner={partner} hidden />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Full Screen Image Lightbox */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <img src={selectedImage} alt="Expanded view" />
                    </div>
                </div>
            )}
        </section>
    );
}
