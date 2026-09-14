import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { defaultHeroSlides } from '../data/mockData';

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const total = defaultHeroSlides.length;
    const heroRef = useRef(null);

    const goTo = (idx) => {
        if (idx === current) return;

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
            { scale: 1, opacity: 0.6, duration: 1.4, ease: 'power3.out' }
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

        setCurrent(idx);
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(c => {
                const next = (c + 1) % total;
                goTo(next);
                return c;
            });
        }, 8000);
        return () => clearInterval(timer);
    }, [total]);

    // Initial entrance animation
    useGSAP(() => {
        const stage = heroRef.current;
        const firstSlide = stage.querySelector('.hero-slide');
        if (!firstSlide) return;
        gsap.set(firstSlide, { zIndex: 2, opacity: 1 });
        gsap.fromTo(
            firstSlide.querySelectorAll('.hero-content > *'),
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.4)', delay: 0.5 }
        );
        gsap.fromTo(
            '.hero-nav',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1 }
        );
    }, { scope: heroRef });

    return (
        <section className="hero" id="beranda">
            <div className="hero-stage" ref={heroRef}>
                {defaultHeroSlides.map((slide, i) => (
                    <div
                        key={i}
                        className="hero-slide"
                        style={{
                            opacity: i === 0 ? 1 : 0,
                            zIndex: i === 0 ? 2 : 1,
                        }}
                    >
                        <div className="hero-bg">
                            <img src={slide.image} alt={slide.title} />
                        </div>
                        <div className="hero-content">
                            <h1>{slide.title}</h1>
                            <p>{slide.text}</p>
                            <a href={slide.buttonLink} className="btn-massive">
                                {slide.buttonText}
                            </a>
                        </div>
                    </div>
                ))}

                <div className="hero-nav">
                    <div className="hero-dots">
                        {defaultHeroSlides.map((_, idx) => (
                            <button
                                key={idx}
                                className={`hero-dot ${idx === current ? 'active' : ''}`}
                                onClick={() => goTo(idx)}
                                aria-label={`Slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <div className="hero-arrows">
                        <button className="hero-arrow" onClick={() => goTo((current - 1 + total) % total)}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button className="hero-arrow" onClick={() => goTo((current + 1) % total)}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
