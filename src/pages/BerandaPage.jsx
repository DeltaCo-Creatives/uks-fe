import { Hero, TriasPillars, Programs, Books, Infografis, HomeStratifikasi } from '@/features/beranda';

export default function BerandaPage() {
  return (
    <div>
      {/* 1. Hero Stage */}
      <div id="sec-home-hero">
        <Hero />
      </div>

      <TriasPillars />

      {/* 3b. Stratifikasi UKS/M — 4 strata teaser */}
      <HomeStratifikasi />

      {/* 5. Program Unggulan Marquee & Kabar Terbaru */}
      <div id="sec-home-programs">
        <Programs />
      </div>

      {/* 6. Rak Perpustakaan Buku Digital */}
      <div id="sec-home-books">
        <Books />
      </div>

      {/* 7. Galeri Visual Inspirasi & Partner Marquee */}
      <div id="sec-home-gallery">
        <Infografis />
      </div>

    </div>
  );
}
