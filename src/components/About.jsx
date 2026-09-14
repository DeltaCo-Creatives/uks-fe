import { defaultStats } from '../data/mockData';

export default function About() {
    return (
        <section className="section" id="tentang">
            <div className="container">

                <div className="section-header about-header">
                    <div>
                        <h2 className="section-title">Trias UKS</h2>
                    </div>
                </div>

                <div className="about">
                    <div className="about-features">

                        <div className="feature">
                            <div className="feature-icon">
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <h3>Pendidikan Kesehatan</h3>
                            <p>Pendidikan Kesehatan membentuk pengetahuan, sikap, dan kebiasaan hidup sehat siswa melalui jalur Interakurikuler, Ekstrakurikuler dan Kokurikuler</p>
                        </div>

                        <div className="feature">
                            <div className="feature-icon">
                                <i className="fa-solid fa-hospital"></i>
                            </div>
                            <h3>Pelayanan Kesehatan</h3>
                            <p>Layanan kesehatan promotif, preventif, kuratif, rehabilitatif meliputi skrining, suplementai, P3K, imunisasi, konseling dan rujukan</p>
                        </div>

                        <div className="feature">
                            <div className="feature-icon">
                                <i className="fa-solid fa-people-group"></i>
                            </div>
                            <h3>Pembinaan lingkungan</h3>
                            <p>Lingkungan sekolah sehat: sarana bersih, CTPS, kantin, pengelolaan sampah, dan pekarangan mendukung pendidikan optimal</p>
                        </div>

                    </div>

                    {/* Statistics section */}
                    <div className="stats">
                        {defaultStats.map((stat, index) => (
                            <div key={index} className="stat">
                                <i className={stat.icon}></i>
                                <strong>{stat.value}</strong>
                                <span>{stat.label}</span>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}
