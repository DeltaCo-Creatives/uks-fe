import { pathForArticle, pathForView } from '@/routes';
import { useBerita, useBeritaList } from '@/hooks/useBerita';
import { ArticleDetail } from '@/features/informasi';

const BERITA_CONFIG = {
  useDetail: useBerita,
  useRelated: useBeritaList,
  pathForItem: pathForArticle,
  backTo: pathForView('informasi', 'sec-info-berita'),
  backLabel: 'Kembali ke Daftar Warta',
  loadingLabel: 'Memuat warta...',
  errorTitle: 'Warta tidak dapat dimuat',
  errorText: 'Terjadi gangguan saat mengambil data warta. Silakan coba lagi.',
  copiedMessage: 'Tautan warta berhasil disalin!',
  relatedTitle: 'Warta Terkait Lainnya'
};

export default function BeritaDetailPage() {
  return <ArticleDetail config={BERITA_CONFIG} />;
}
