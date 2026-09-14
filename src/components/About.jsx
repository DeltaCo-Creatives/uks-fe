import { defaultStats } from '../data/mockData';

export default function About() {
    return (
        <section className="section" id="tentang">
            <div className="container">
                <div className="section-header reveal-on-scroll">
                    <div>
                        <span className="section-kicker">Fondasi UKS</span>
                        <h2 className="section-title">Trias UKS</h2>
                    </div>
                </div>

                <div className="about-grid">
                    <div className="about-card reveal-on-scroll">
                        <div>
                            <div className="program-icon" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <h3>Pendidikan Kesehatan</h3>
                            <p>Membentuk pengetahuan, sikap, dan kebiasaan hidup sehat siswa secara menyenangkan melalui Intrakurikuler, Ekstrakurikuler, dan Kokurikuler.</p>
                        </div>
                    </div>
                    
                    <div className="about-stats reveal-on-scroll">
                        {defaultStats.map((s, i) => (
                            <div key={i} className="stat-box">
                                <strong>{s.value}</strong>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
