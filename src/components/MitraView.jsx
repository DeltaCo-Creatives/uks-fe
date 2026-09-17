import { mitraIntro } from '../data/portalData';
import MitraPanduan from './mitra/MitraPanduan';
import MitraKriteria from './mitra/MitraKriteria';
import MitraKami from './mitra/MitraKami';
import MitraDukungan from './mitra/MitraDukungan';
import './mitra/mitra.css';

/**
 * Mitra ▸ Kemitraan UKS/M. Content curated from PROD /mitra/* (see
 * docs/kemitraan-curation.md). One scrolling page; the drawer jumps between
 * the four sections.
 */
export default function MitraView({ onNavigate }) {
  return (
    <div className="container" style={{ padding: '24px 20px 80px' }}>
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-handshake-angle"></i> Mitra
        </span>
        <h1 className="subpage-hero-title">{mitraIntro.title}</h1>
        <p className="subpage-hero-desc">{mitraIntro.lead}</p>
      </div>

      <MitraPanduan />
      <MitraKriteria onNavigate={onNavigate} />
      <MitraKami />
      <MitraDukungan />
    </div>
  );
}
