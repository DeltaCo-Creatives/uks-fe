import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Books from './components/Books';
import Infografis from './components/Infografis';
import Footer from './components/Footer';

// Intersection Observer for scroll animations (reveal effect)
function useRevealEffect() {
    useEffect(() => {
        const revealTargets = document.querySelectorAll(
            ".section-header, .about, .about-features, .stats, .news-card, .program-card, .book-card, .infografis-card, .video-card, footer"
        );

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -45px"
        });

        revealTargets.forEach((target, index) => {
            target.classList.add("reveal");
            if (target.matches(".news-card, .program-card, .book-card, .infografis-card, .video-card")) {
                target.style.transitionDelay = `${(index % 4) * 90}ms`;
            }
            revealObserver.observe(target);
        });

        return () => revealObserver.disconnect();
    }, []);
}

function App() {
    useRevealEffect();

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
