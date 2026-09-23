import { useState } from 'react';
import { defaultScreenshots } from '../data/portalData';
import { useInfografisList } from '../hooks/usePublikasi';
import SafeImage from './SafeImage';

export default function Infografis() {
    const [selectedImage, setSelectedImage] = useState(null);
    const { data: infografisList, loading, error, retry } = useInfografisList();
    const items = infografisList || [];

    return (
        <section className="section" id="infografis">
            <div className="container">
                <div className="section-header" data-gsap="reveal">
                    <div>
                        <span className="section-kicker">Galeri</span>
                        <h2 className="section-title">Visual Inspirasi</h2>
                    </div>
                </div>

                {loading && (
                    <div className="content-toolbar-empty" role="status" aria-live="polite">
                        <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i>
                        <h4 className="info-empty-title">Memuat infografis...</h4>
                    </div>
                )}

                {!loading && error && (
                    <div className="content-toolbar-empty">
                        <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                        <h4 className="info-empty-title">Infografis tidak dapat dimuat</h4>
                        <p className="info-empty-text">Terjadi gangguan saat mengambil data. Silakan coba lagi.</p>
                        <button type="button" className="btn-pill secondary" onClick={retry} style={{ marginTop: '12px' }}>
                            Coba Lagi
                        </button>
                    </div>
                )}

                {!loading && !error && items.length === 0 && (
                    <div className="content-toolbar-empty">
                        <i className="fa-solid fa-image" aria-hidden="true"></i>
                        <h4 className="info-empty-title">Belum ada infografis yang tersedia</h4>
                        <p className="info-empty-text">Poster dan infografis akan tampil di sini begitu tersedia.</p>
                    </div>
                )}

                {!loading && !error && items.length > 0 && (
                    <div className="info-bento">
                        {items.map((info, i) => (
                            <div key={info.id} className={`info-item ${i === 0 ? 'large' : ''}`} data-gsap="reveal" onClick={() => info.image && setSelectedImage(info.image)}>
                                <SafeImage src={info.image} alt={info.title} />
                            </div>
                        ))}
                    </div>
                )}

                <div className="screenshots-marquee" style={{ marginTop: '32px' }}>
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
