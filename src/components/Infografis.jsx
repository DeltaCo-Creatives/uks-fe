import { useState } from 'react';
import { defaultInfografis, defaultVideos, defaultScreenshots } from '../data/mockData';

export default function Infografis() {
    const [modalImage, setModalImage] = useState(null);

    const openInfografis = (image) => {
        setModalImage(image);
        document.body.style.overflow = "hidden";
    };

    const closeInfografis = (e) => {
        if (e && e.target !== e.currentTarget) return;
        setModalImage(null);
        document.body.style.overflow = "";
    };

    return (
        <section className="infografis-section" id="infografis">
            <div className="container">
                <div className="section-header">
                    <div>
                        <a href="#infografis" className="section-link infografis-all-link">
                            Lihat Semua <i className="fa-solid fa-arrow-right"></i>
                        </a>
                        <h2 className="section-title">Infografis UKS</h2>
                    </div>
                </div>

                <div className="infografis-grid">
                    {defaultInfografis.map((info, index) => (
                        <article key={index} className="infografis-card">
                            <img src={info.image} alt={info.title} />
                            <h3>{info.title}</h3>
                            <div className="infografis-actions">
                                <button className="infografis-view" type="button" onClick={() => openInfografis(info.image)}>
                                    <i className="fa-solid fa-eye"></i> Lihat
                                </button>
                                <a className="infografis-download" href={info.image} download>
                                    <i className="fa-solid fa-download"></i> Download
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="videos-block">
                    <h2 className="videos-title">Video UKS</h2>
                    <div className="videos-grid">
                        {defaultVideos.map((video, index) => (
                            <article key={index} className="video-card">
                                <div className="video-thumbnail">
                                    <img src={video.image} alt={video.title} />
                                    <span className="video-play" aria-hidden="true">
                                        <i className="fa-solid fa-play"></i>
                                    </span>
                                </div>
                                <h3>{video.title}</h3>
                            </article>
                        ))}
                    </div>
                    <a className="videos-more" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                        Temukan Video Lainnya <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>

                <div className="screenshots-marquee" aria-label="Galeri screenshot UKS">
                    <div className="screenshots-strip">
                        {defaultScreenshots.map((img, index) => (
                            <div key={index} className="screenshot-item">
                                <img src={img} alt={`Screenshot UKS ${index + 1}`} loading="lazy" />
                            </div>
                        ))}
                        {/* Duplicate for infinite marquee effect */}
                        {defaultScreenshots.map((img, index) => (
                            <div key={`dup-${index}`} className="screenshot-item">
                                <img src={img} alt={`Screenshot UKS ${index + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            <div 
                className={`infografis-modal ${modalImage ? 'show' : ''}`} 
                role="dialog" 
                aria-modal="true" 
                aria-label="Pratinjau infografis" 
                onClick={closeInfografis}
            >
                <div className="infografis-modal-content">
                    <button className="infografis-modal-close" type="button" aria-label="Tutup pratinjau" onClick={closeInfografis}>
                        &times;
                    </button>
                    {modalImage && <img src={modalImage} alt="Infografis Preview" />}
                </div>
            </div>
        </section>
    );
}
