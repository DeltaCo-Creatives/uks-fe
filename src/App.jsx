import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Books from './components/Books';
import Infografis from './components/Infografis';
import Footer from './components/Footer';

function App() {
    // Scroll reveal
    useEffect(() => {
        const targets = document.querySelectorAll('.reveal-on-scroll');
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach((e) => {
                if (!e.isIntersecting) return;
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px' });

        targets.forEach((t, i) => {
            t.style.transitionDelay = `${(i % 4) * 100}ms`;
            obs.observe(t);
        });
        return () => obs.disconnect();
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Programs />
                <Books />
                <Infografis />
            </main>
            <Footer />
        </>
    );
}

export default App;
