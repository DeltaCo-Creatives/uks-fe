import { useMemo, useRef, useState } from 'react';
import { useInfografisList, useMitraList } from '@/hooks/usePublicLists';
import { NEW_TAB_HINT } from '@/utils/linkKind';
import SafeImage from '@/components/SafeImage';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { MARQUEE_FADE } from '../styles';

// Each strip scrolls by half its width, so a half must be wider than the container or a gap shows at the loop point.
const MIN_LOGOS_PER_HALF = 8;
// Keeps the pace of the original 14-logo, 70s strip whatever the partner count.
const SECONDS_PER_LOGO = 5;

// Cluster hover: the hovered tile grows, its siblings shrink and fade. "!" beats GSAP's inline transform/opacity.
const TILE_BASE = 'relative flex-none cursor-pointer overflow-hidden rounded-card shadow-raised transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[height,opacity]';
const TILE_HOVER = 'hover:z-10 hover:transform-none! hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)]! group-has-[:hover]/bento:not-hover:transform-none! group-has-[:hover]/bento:not-hover:opacity-50!';
const TILE_SIZE = 'h-[230px] hover:h-[290px]! group-has-[:hover]/bento:not-hover:h-[200px]! max-md:h-[180px] max-md:hover:h-[220px]! max-md:group-has-[:hover]/bento:not-hover:h-[160px]!';
const TILE_SIZE_LARGE = 'h-[260px] basis-[clamp(200px,35vw,400px)] hover:h-[290px]! group-has-[:hover]/bento:not-hover:h-[200px]! max-md:hover:h-[220px]! max-md:group-has-[:hover]/bento:not-hover:h-[160px]!';

// A keyboard-focused logo and its ring must not sit under a fade.
const FADE_OFF_ON_FOCUS = 'has-[:focus-visible]:before:opacity-0 has-[:focus-visible]:after:opacity-0';

const LOGO_BASE = 'flex h-[85px] w-[220px] items-center justify-center opacity-80 transition-[opacity,scale] duration-300 ease-[ease]';
const LOGO_LINK = 'cursor-pointer rounded-soft [@media(hover:hover)]:hover:scale-105 [@media(hover:hover)]:hover:opacity-100 focus-visible:scale-105 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand';

// Hover effects apply only under a real pointer: on touch, :hover sticks after a tap, so a tapped logo
// would leave the row paused (and the logo enlarged) until the next tap elsewhere.
const STRIP_BASE = 'flex w-max items-center gap-12 px-6 [@media(hover:hover)]:hover:[animation-play-state:paused] has-[:focus-visible]:animate-none';

const isHttpUrl = (url) => /^https?:\/\//i.test(url ?? '');

/** One marquee logo: a new-tab link when the partner has a website, a plain tile otherwise. */
function PartnerLogo({ partner, hidden }) {
    const logo = <SafeImage src={partner.logoUrl} alt={partner.nama} fallbackType="logo" loading="lazy" className="max-h-full max-w-full object-contain" />;

    if (!isHttpUrl(partner.website)) {
        return <div className={LOGO_BASE} aria-hidden={hidden || undefined}>{logo}</div>;
    }

    return (
        <a
            className={`${LOGO_BASE} ${LOGO_LINK}`}
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
                    <div className="group/bento flex min-h-[280px] w-full flex-wrap items-center justify-center gap-4">
                        {items.map((info, i) => (
                            <div key={info.id} className={`${TILE_BASE} ${TILE_HOVER} ${i === 0 ? TILE_SIZE_LARGE : TILE_SIZE}`} data-gsap="reveal" onClick={() => info.image && setSelectedImage(info.image)}>
                                <SafeImage src={info.image} alt={info.title} className="h-full w-full object-cover" />
                            </div>
                        ))}
                    </div>
                )}

                {track.length > 0 && (
                    <div
                        className={`relative mt-8 flex w-full scroll-px-[clamp(40px,8vw,96px)] flex-col gap-4 overflow-hidden py-4 ${MARQUEE_FADE} ${FADE_OFF_ON_FOCUS}`}
                        ref={marqueeRef}
                    >
                        {/* Only the first pass of the first row is exposed to keyboard and screen readers; the rest are loop copies. */}
                        <div className={`${STRIP_BASE} animate-logo-scroll`} style={stripStyle} onFocus={revealFocusedLogo} onBlur={resetMarqueeScroll}>
                            {track.map((partner, i) => (
                                <PartnerLogo key={`a-${partner.id}-${i}`} partner={partner} hidden={i >= partners.length} />
                            ))}
                        </div>
                        <div className={`${STRIP_BASE} animate-logo-scroll-reverse`} style={stripStyle} aria-hidden="true">
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
                    <div className="relative max-h-[90vh] max-w-[90vw] animate-[bubblyPop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_forwards] cursor-default overflow-hidden rounded-card shadow-[0_40px_80px_rgba(0,0,0,0.3)]" onClick={e => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <img className="block h-full max-h-[90vh] w-full object-contain" src={selectedImage} alt="Expanded view" />
                    </div>
                </div>
            )}
        </section>
    );
}
