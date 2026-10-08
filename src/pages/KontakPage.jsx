import { usePengaturanSettings } from '@/hooks/usePublicLists';
import { KontakAlamat, KontakTiket, KontakFaq, KontakLokasi } from '@/features/kontak';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function KontakPage() {
  const { data: settings } = usePengaturanSettings();
  usePageMeta({
    title: 'Kontak & Layanan Bantuan',
    description: 'Sekretariat bersama UKS/M: alamat, jalur konsultasi implementasi Trias UKS, permohonan bimbingan teknis stratifikasi, dan pengaduan layanan.'
  });

  return (
    <div className="container pb-20">

      {/* Subpage Hero Banner */}
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-headset"></i> Layanan Terpadu &amp; Konsultasi · Sekretariat Pusat
        </span>
        <h1 className="subpage-hero-title">
          Sekretariat Bersama &amp; Layanan Bantuan UKS/M
        </h1>
        <p className="subpage-hero-desc">
          Saluran komunikasi resmi, pusat konsultasi implementasi Trias UKS, permohonan bimbingan teknis stratifikasi sekolah sehat, dan pengaduan layanan terpadu.
        </p>
      </div>

      <div className="flex flex-col gap-9">
        <KontakAlamat settings={settings} />
        <KontakTiket email={settings?.['kontak.email']} />
        <KontakFaq />
        <KontakLokasi mapsUrl={settings?.['kontak.mapsUrl']} />
      </div>

    </div>
  );
}
