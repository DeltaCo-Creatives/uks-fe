import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Books from './components/Books';
import Infografis from './components/Infografis';
import Footer from './components/Footer';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
    const mainRef = useRef(null);

    useGSAP(() => {
        // Wait one frame to ensure all elements are painted
        // Target only elements that are in the normal document flow (not inside scroll containers)
        const reveals = gsap.utils.toArray('[data-gsap="reveal"]');

        reveals.forEach((el, i) => {
            gsap.fromTo(el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none reverse',
                    },
                    delay: (i % 4) * 0.08,
                }
            );
        });

        ScrollTrigger.addEventListener('refreshInit', () => ScrollTrigger.refresh());
        window.addEventListener('resize', () => ScrollTrigger.refresh());

        return () => {
            window.removeEventListener('resize', () => ScrollTrigger.refresh());
        };
    }, { scope: mainRef });

    return (
        <div ref={mainRef}>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Programs />
                <Books />
                <Infografis />
            </main>
            <Footer />
        </div>
    );
}

export default App;
