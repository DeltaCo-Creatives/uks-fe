import { MitraPanduan, MitraKriteria, MitraKami, MitraDukungan, useMitraKonten } from '@/features/mitra';
import { usePageMeta } from '@/hooks/usePageMeta';

// The tab title and meta description stay fixed in code: an editor changing the hero heading must not change the SEO meta.
const META_TITLE = 'Kemitraan UKS/M';
const META_DESCRIPTION =
  'Bentuk kerja sama, ketentuan, dan kriteria bagi lembaga yang ingin mendukung Sekolah Sehat, beserta daftar mitra sejak 2022 dan dukungan yang sudah tercatat.';

/**
 * Mitra ▸ Kemitraan UKS/M. Content curated from PROD /mitra/* (see
 * docs/kemitraan-curation.md). One scrolling page; the drawer jumps between
 * the four sections. The hero heading and lead come from the `mitra-hero` document
 * (the heading falls back to META_TITLE); the sections read their own documents.
 */
export default function MitraPage() {
  const { hero } = useMitraKonten();
  usePageMeta({ title: META_TITLE, description: META_DESCRIPTION });

  return (
    <div className="container px-5 pt-6 pb-20">
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-handshake-angle"></i> Mitra
        </span>
        <h1 className="subpage-hero-title">{hero?.title ?? META_TITLE}</h1>
        {hero?.lead && <p className="subpage-hero-desc">{hero.lead}</p>}
      </div>

      <MitraPanduan />
      <MitraKriteria />
      <MitraKami />
      <MitraDukungan />
    </div>
  );
}
