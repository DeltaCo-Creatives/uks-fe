import { useState, useEffect } from 'react';
import { defaultHeroSlides } from '../data/mockData';

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const total = defaultHeroSlides.length;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((p) => (p + 1) % total);
        }, 7000);
        return () => clearInterval(timer);
    }, [total]);

    const go = (dir) =>
        setCurrent((p) => {
            const n = p + dir;
            if (n < 0) return total - 1;
            if (n >= total) return 0;
            return n;
        });

    return (
        <section className="hero" id="beranda">
            <div className="hero-stage">
                {defaultHeroSlides.map((slide, i) => (
                    <div key={i} className={`hero-slide ${i === current ? 'active' : ''}`}>
                        
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
                                onClick={() => setCurrent(idx)}
                                aria-label={`Slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <div className="hero-arrows">
                        <button className="hero-arrow" onClick={() => go(-1)}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button className="hero-arrow" onClick={() => go(1)}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
