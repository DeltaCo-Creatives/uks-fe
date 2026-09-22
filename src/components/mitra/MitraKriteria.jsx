import { Link } from 'react-router-dom';
import { mitraRegistration, mitraSectors } from '../../data/portalData';
import { pathForView } from '../../routes';

/**
 * Each sector shows who belongs to it and the conditions that apply to it,
 * side by side. The registration bar closes the section with the honest
 * status: there is no working form yet, so it points to the contact page.
 */
export default function MitraKriteria() {
  return (
    <section id="sec-mitra-kriteria" className="section mitra-section">
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Kriteria Mitra</span>
          <h2 className="section-title">Siapa yang bisa menjadi mitra</h2>
        </div>
      </div>

      <div className="mitra-sector-grid">
        {mitraSectors.map((sector) => (
          <div key={sector.id} className="mitra-card mitra-sector" data-gsap="reveal">
            <div className="mitra-form-head">
              <span className="mitra-icon" aria-hidden="true"><i className={sector.icon}></i></span>
              <h3 className="mitra-block-title">{sector.title}</h3>
            </div>

            <dl className="mitra-members">
              {sector.members.map((member) => (
                <div key={member.label}>
                  <dt>{member.label}</dt>
                  <dd>{member.text}</dd>
                </div>
              ))}
            </dl>

            <h4 className="mitra-mini-label">Yang perlu dipenuhi</h4>
            <ul className="mitra-check-list">
              {sector.requirements.map((req) => (
                <li key={req}>
                  <i className="fa-solid fa-check" aria-hidden="true"></i>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mitra-register" data-gsap="reveal">
        <span className="mitra-register-icon" aria-hidden="true"><i className="fa-solid fa-file-signature"></i></span>
        <p>
          <strong>Pendaftaran mitra.</strong> {mitraRegistration.status} Untuk menyampaikan minat bermitra,
          hubungi sekretariat UKS/M melalui halaman Kontak.
        </p>
        {mitraRegistration.url ? (
          <a className="btn-pill mitra-register-btn" href={mitraRegistration.url} target="_blank" rel="noopener noreferrer">
            Isi formulir pendaftaran
          </a>
        ) : (
          <Link className="btn-pill mitra-register-btn" to={pathForView('kontak', 'sec-kontak-alamat')}>
            Buka halaman Kontak
          </Link>
        )}
      </div>
    </section>
  );
}
