import { GSS_MADRASAH_URL, gssIntro } from '../../../data/portalData';
import GssOverview from './GssOverview';
import GssFocusTabs from './GssFocusTabs';
import GssAdvokasi from './GssAdvokasi';
import { NEW_TAB_HINT } from './gssLinks';
import './gss.css';

/**
 * UKS/M ▸ Sekolah Sehat (GSS). Content curated from PROD /sekolah-sehat/*
 * (see docs/sekolah-sehat-curation.md): overview, the 5 focus areas, and
 * the advocacy documents.
 */
export default function GssPage() {
  return (
    <div>
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-apple-whole"></i> Kluster 4 · UKS/M
        </span>
        <h1 className="subpage-hero-title">{gssIntro.title}</h1>
        <p className="subpage-hero-desc">{gssIntro.definition}</p>
        <a className="gss-hero-link" href={GSS_MADRASAH_URL} target="_blank" rel="noopener noreferrer">
          Untuk madrasah: buka Gerakan Madrasah Sehat (Kemenag)
          <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          <span className="gss-sr-only">{NEW_TAB_HINT}</span>
        </a>
      </div>

      <GssOverview />

      <section id="sec-gss-5sehat" className="section gss-section">
        <div className="section-header" data-gsap="reveal">
          <div>
            <span className="section-kicker">5 Fokus</span>
            <h2 className="section-title">Yang dilakukan sekolah untuk tiap fokus</h2>
          </div>
        </div>
        <GssFocusTabs />
      </section>

      <GssAdvokasi />
    </div>
  );
}
