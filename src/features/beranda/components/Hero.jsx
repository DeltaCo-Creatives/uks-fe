import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { pathForArticle } from '@/routes';
import { useBeritaList } from '@/hooks/useBerita';
import { useHeroSlideList } from '@/hooks/usePublicLists';

// hero-slide, hero-bg, hero-content and hero-nav have no CSS of their own: the GSAP code below finds them by class.
// GSAP also writes inline opacity/transform/z-index, so animated elements avoid translate-* and scale-* utilities.
// "!" on the button beats the unlayered .btn-massive rule, which other pages still use.
const DOT = 'h-2.5 border-none [transition:var(--spring)] max-[600px]:h-2';
const DOT_IDLE = 'w-2.5 rounded-[50%] bg-[rgba(255,255,255,0.3)] max-[600px]:w-2';
const DOT_ACTIVE = 'w-7 rounded-[999px] bg-white max-[600px]:w-5';
const ARROW = 'size-11 rounded-[50%] border-none bg-[rgba(255,255,255,0.15)] text-[16px] text-white backdrop-blur-[12px] [transition:var(--spring)] hover:bg-white hover:text-ink hover:[transform:scale(1.1)] max-[600px]:size-9 max-[600px]:text-[13px]';

export default function Hero() {
    const { data: heroData, loading: heroLoading } = useHeroSlideList();
    const { data: newsList, loading: newsLoading } = useBeritaList();
    const hasHeroSlides = Boolean(heroData && heroData.length > 0);
    // Berita only stands in once the hero request has settled empty or failed, so it never flashes first.
    const slides = useMemo(() => {
        if (hasHeroSlides) return heroData;
        if (heroLoading) return [];
        return (newsList || []).slice(0, 4);
    }, [hasHeroSlides, heroData, heroLoading, newsList]);
    const pending = heroLoading || (!hasHeroSlides && newsLoading);
    const [current, setCurrent] = useState(0);
    // The auto-advance interval below is set up once per `total` and would
    // otherwise call a goTo() closure permanently frozen on that render's
    // `current` — this ref is what lets goTo check the live value instead.
    const currentRef = useRef(0);
    const total = slides.length;
    const heroRef = useRef(null);

    const goTo = (idx) => {
        if (idx === currentRef.current) return;

        const stage = heroRef.current;
        const slides = Array.from(stage.querySelectorAll('.hero-slide'));
        const next = slides[idx];

        // Kill ALL ongoing animations on all slides to prevent ghost overlapping
        gsap.killTweensOf(slides);
        slides.forEach(s => {
            gsap.killTweensOf(s.querySelector('.hero-bg img'));
            gsap.killTweensOf(s.querySelectorAll('.hero-content > *'));
        });

        // Force all other slides to fade out and go to back to prevent stacking
        const others = slides.filter((_, i) => i !== idx);
        gsap.to(others, { opacity: 0, duration: 0.3, zIndex: 1, ease: 'power2.in' });

        // Bring next slide on top
        gsap.set(next, { zIndex: 3 });

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.set(next, { zIndex: 2 });
            }
        });

        // Animate background image in next slide
        tl.fromTo(next.querySelector('.hero-bg img'),
            { scale: 1.12, opacity: 0 },
            { scale: 1, opacity: 0.9, duration: 1.4, ease: 'power3.out' }
        );
        // Fade in the next slide
        tl.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0);
        
        // Stagger text in next slide
        tl.fromTo(
            next.querySelectorAll('.hero-content > *'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)' },
            0.2 // Start text animation slightly earlier for responsiveness
        );

        currentRef.current = idx;
        setCurrent(idx);
    };

    // Auto-advance
    useEffect(() => {
        if (total < 2) return undefined;
        const timer = setInterval(() => {
            goTo((currentRef.current + 1) % total);
        }, 8000);
        return () => clearInterval(timer);
    }, [total]);

    // Initial entrance animation
    useGSAP(() => {
        const stage = heroRef.current;
        if (!stage) return;
        const firstSlide = stage.querySelector('.hero-slide');
        if (!firstSlide) return;
        gsap.set(firstSlide, { zIndex: 2, opacity: 1 });
        gsap.fromTo(
            firstSlide.querySelectorAll('.hero-content > *'),
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.4)', delay: 0.5 }
        );
        // The nav only renders with 2 or more slides.
        if (stage.querySelector('.hero-nav')) {
            gsap.fromTo(
                '.hero-nav',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1 }
            );
        }
    }, { scope: heroRef, dependencies: [total] });

    if (total === 0 && !pending) return null;

    return (
        <section className="w-full px-5 pt-7 max-[600px]:px-2 max-[600px]:pt-4 max-[600px]:pb-2" id="beranda">
            <div
                // Sits below the fixed navbar, so the nav offset and 40px of gaps come off the viewport (dvh: the mobile URL bar is not space the stage gets).
                className="relative h-[calc(100dvh_-_var(--nav-offset)_-_40px)] min-h-[520px] w-full overflow-hidden rounded-panel bg-ink shadow-raised max-[600px]:rounded-card"
                ref={heroRef}
            >
                {total === 0 && (
                    <p role="status" className="sr-only">
                        Memuat slide beranda
                    </p>
                )}
                {slides.map((slide, i) => (
                    <div
                        key={slide.id}
                        className="hero-slide absolute inset-0 flex items-center justify-center max-[600px]:pb-20"
                        style={{
                            opacity: i === 0 ? 1 : 0,
                            zIndex: i === 0 ? 2 : 1,
                        }}
                    >
                        <div className="hero-bg absolute inset-0 z-[1] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgba(0,0,0,0.8),rgba(0,0,0,0.2))] after:content-['']">
                            {/* API berita can have a null image; the gradient overlay alone still reads fine. */}
                            {slide.image && <img className="h-full w-full object-cover opacity-90" src={slide.image} alt={slide.title} />}
                        </div>
                        <div className="hero-content relative z-[3] max-w-[900px] px-6 py-[30px] text-center text-white max-[600px]:px-4 max-[600px]:py-5">
                            {/* Titles come from the API and can run long; on phones cap them so they never reach the slider controls. */}
                            <h1 className="mb-4 text-[clamp(24px,6vw,62px)] leading-[1.08] font-extrabold text-balance text-white max-[600px]:line-clamp-4 max-[600px]:leading-[1.2]">{slide.title}</h1>
                            <p className="mb-6 text-[clamp(15px,1.8vw,18px)] text-[rgba(255,255,255,0.8)]">{slide.excerpt}</p>
                            {slide.slug && (
                                <Link
                                    className="btn-massive max-[600px]:min-h-[40px] max-[600px]:px-5! max-[600px]:py-2.5! max-[600px]:text-[13px]!"
                                    to={pathForArticle(slide.slug)}
                                >
                                    Baca Selengkapnya
                                </Link>
                            )}
                        </div>
                    </div>
                ))}

                {total >= 2 && (
                    <div className="hero-nav absolute inset-x-6 bottom-6 z-10 flex items-center justify-between max-[600px]:inset-x-5 max-[600px]:bottom-5 max-[600px]:flex-col max-[600px]:gap-5">
                        <div className="flex gap-2.5 max-[600px]:gap-2">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`${DOT} ${idx === current ? DOT_ACTIVE : DOT_IDLE}`}
                                    onClick={() => goTo(idx)}
                                    aria-label={`Slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <div className="flex gap-3 max-[600px]:gap-2.5">
                            <button className={ARROW} onClick={() => goTo((current - 1 + total) % total)}>
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <button className={ARROW} onClick={() => goTo((current + 1) % total)}>
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
