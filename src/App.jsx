import { useRef } from 'react';
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
                        // once: true — fire once, never reverse.
                        // This prevents DevTools resize from "un-revealing" elements.
                        once: true,
                    },
                    delay: (i % 4) * 0.08,
                }
            );
        });

        // Debounced resize handler so rapid DevTools panel opens don't spam-refresh
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
        };
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', handleResize);
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
