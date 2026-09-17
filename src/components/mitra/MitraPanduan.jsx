import { kerjaSamaBenefits, kerjaSamaGroups, kerjaSamaNote, kerjaSamaRules } from '../../data/portalData';

/**
 * The source lists 10 forms of cooperation flat; they are grouped by what the
 * partner provides so the list can be scanned. Ketentuan are the binding rules,
 * so they get the white card and numbers you can cite; Manfaat sits beside
 * them on the tinted ground.
 */
export default function MitraPanduan() {
  return (
    <section id="sec-mitra-panduan" className="section mitra-section">
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Panduan Kemitraan</span>
          <h2 className="section-title">Bentuk kerja sama yang bisa diajukan</h2>
        </div>
      </div>

      <div className="mitra-forms" data-gsap="reveal">
        {kerjaSamaGroups.map((group) => (
          <div key={group.id} className="mitra-form-group">
            <div className="mitra-form-head">
              <span className="mitra-icon" aria-hidden="true"><i className={group.icon}></i></span>
              <h3 className="mitra-block-title">{group.title}</h3>
            </div>
            <ul className="mitra-dot-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mitra-note" data-gsap="reveal">
        <strong>Catatan:</strong> {kerjaSamaNote}
      </p>

      <div className="mitra-terms-grid">
        <div className="mitra-card" data-gsap="reveal">
          <h3 className="mitra-block-title">Ketentuan kerja sama</h3>
          <ol className="mitra-num-list">
            {kerjaSamaRules.map((rule, idx) => (
              <li key={rule}>
                <span className="mitra-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                <p>{rule}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mitra-tinted" data-gsap="reveal">
          <h3 className="mitra-block-title">Manfaat bagi mitra</h3>
          <ul className="mitra-dot-list">
            {kerjaSamaBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
