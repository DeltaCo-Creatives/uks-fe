import { defaultInfografis, defaultScreenshots } from '../data/mockData';

export default function Infografis() {
    return (
        <section className="section" id="infografis">
            <div className="container">
                <div className="section-header reveal-on-scroll">
                    <div>
                        <span className="section-kicker">Galeri</span>
                        <h2 className="section-title">Visual Inspirasi</h2>
                    </div>
                </div>

                <div className="info-bento">
                    {defaultInfografis.map((info, i) => (
                        <div key={i} className={`info-item reveal-on-scroll ${i === 0 ? 'large' : ''}`}>
                            <img src={info.image} alt={info.title} />
                            <div className="info-overlay">
                                <i className="fa-solid fa-magnifying-glass-plus"></i>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="screenshots-marquee" style={{ marginTop: '80px' }}>
                    <div className="screenshots-strip">
                        {defaultScreenshots.map((img, i) => (
                            <div key={i} className="screenshot-item">
                                <img src={img} alt={`Screenshot ${i + 1}`} loading="lazy" />
                            </div>
                        ))}
                        {defaultScreenshots.map((img, i) => (
                            <div key={`d-${i}`} className="screenshot-item">
                                <img src={img} alt={`Screenshot ${i + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
