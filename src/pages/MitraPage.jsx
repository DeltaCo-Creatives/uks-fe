import { mitraIntro } from '@/data/portalData';
import { MitraPanduan, MitraKriteria, MitraKami, MitraDukungan } from '@/features/mitra';

/**
 * Mitra ▸ Kemitraan UKS/M. Content curated from PROD /mitra/* (see
 * docs/kemitraan-curation.md). One scrolling page; the drawer jumps between
 * the four sections.
 */
export default function MitraPage() {
  return (
    <div className="container px-5 pt-6 pb-20">
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-handshake-angle"></i> Mitra
        </span>
        <h1 className="subpage-hero-title">{mitraIntro.title}</h1>
        <p className="subpage-hero-desc">{mitraIntro.lead}</p>
      </div>

      <MitraPanduan />
      <MitraKriteria />
      <MitraKami />
      <MitraDukungan />
    </div>
  );
}
