import { useState } from 'react';
import { defaultInfografis, defaultScreenshots } from '../data/mockData';

export default function Infografis() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section className="section" id="infografis">
            <div className="container">
                <div className="section-header" data-gsap="reveal">
                    <div>
                        <span className="section-kicker">Galeri</span>
                        <h2 className="section-title">Visual Inspirasi</h2>
                    </div>
                </div>

                <div className="info-bento">
                    {defaultInfografis.map((info, i) => (
                        <div key={i} className={`info-item ${i === 0 ? 'large' : ''}`} data-gsap="reveal" onClick={() => setSelectedImage(info.image)}>
                            <img src={info.image} alt={info.title} />
                        </div>
                    ))}
                </div>

                <div className="screenshots-marquee" style={{ marginTop: '80px' }}>
                    <div className="screenshots-strip">
                        {defaultScreenshots.map((img, i) => (
                            <div key={i} className="screenshot-item">
                                <img src={img} alt={`Partner ${i + 1}`} loading="lazy" />
                            </div>
                        ))}
                        {defaultScreenshots.map((img, i) => (
                            <div key={`d1-${i}`} className="screenshot-item">
                                <img src={img} alt={`Partner ${i + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                    {/* Second row (Column of twos) */}
                    <div className="screenshots-strip strip-reverse">
                        {defaultScreenshots.map((img, i) => (
                            <div key={i} className="screenshot-item">
                                <img src={img} alt={`Partner ${i + 1}`} loading="lazy" />
                            </div>
                        ))}
                        {defaultScreenshots.map((img, i) => (
                            <div key={`d2-${i}`} className="screenshot-item">
                                <img src={img} alt={`Partner ${i + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
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
