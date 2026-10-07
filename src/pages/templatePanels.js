import { BeritaPanel, PraktikPanel, UptBerceritaPanel, AgendaPanel, AplikasiPanel, PengumumanPanel, KesempatanPanel } from '@/features/informasi';
import { BooksPanel, InfografisPanel, VideoPanel, RegulasiPanel, GaleriPanel } from '@/features/publikasi';

/**
 * Which panel renders each submenu `template`, per menu. A template missing
 * here has no panel in this build, so NavConfigProvider drops its tab.
 */
export const TEMPLATE_PANELS = {
  informasi: {
    artikel: BeritaPanel,
    'praktik-baik': PraktikPanel,
    'upt-bercerita': UptBerceritaPanel,
    agenda: AgendaPanel,
    tautan: AplikasiPanel,
    dokumen: RegulasiPanel,
    pengumuman: PengumumanPanel,
    kesempatan: KesempatanPanel
  },
  publikasi: {
    buku: BooksPanel,
    infografis: InfografisPanel,
    video: VideoPanel,
    galeri: GaleriPanel,
    dokumen: RegulasiPanel
  }
};
