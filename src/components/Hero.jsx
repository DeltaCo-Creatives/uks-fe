import { useState, useEffect } from 'react';
import { defaultHeroSlides } from '../data/mockData';

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % defaultHeroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const changeSlide = (direction) => {
        setCurrentIndex((prev) => {
            let next = prev + direction;
            if (next >= defaultHeroSlides.length) next = 0;
            if (next < 0) next = defaultHeroSlides.length - 1;
            return next;
        });
    };

    return (
        <section className="hero" id="beranda">
            <div className="container">
                <div className="slider" id="slider">

                    {defaultHeroSlides.map((slide, index) => (
                        <article key={index} className={`slide ${index === currentIndex ? 'active' : ''}`}>

                            {/* Slide content: label, title, text, button */}
                            <div className="slide-content">
                                <span className="slide-label">
                                    <i className="fa-solid fa-newspaper"></i>
                                    {slide.label}
                                </span>
                                <h1>{slide.title}</h1>
                                <p>{slide.text}</p>
                                <a href={slide.buttonLink} className="slide-button">
                                    {slide.buttonText}
                                    <i className="fa-solid fa-arrow-right"></i>
                                </a>
                            </div>

                            {/* Floating thumbnail image */}
                            <img
                                className="slide-thumbnail"
                                src={slide.image}
                                alt={`Thumbnail ${slide.label}`}
                            />

                            {/* Background decoration icon */}
                            <i className="fa-solid fa-leaf hero-decoration" aria-hidden="true"></i>

                        </article>
                    ))}

                    {/* Navigation buttons */}
                    <button className="slider-btn slider-prev" onClick={() => changeSlide(-1)} aria-label="Slide sebelumnya">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="slider-btn slider-next" onClick={() => changeSlide(1)} aria-label="Slide berikutnya">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>

                    {/* Dot indicators */}
                    <div className="slider-dots">
                        {defaultHeroSlides.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
