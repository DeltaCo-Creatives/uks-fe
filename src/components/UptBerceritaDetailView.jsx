import { pathForUptStory, pathForView } from '../routes';
import { useUptBercerita, useUptStoriesList } from '../hooks/usePublicLists';
import BeritaDetailView from './BeritaDetailView';

const UPT_CONFIG = {
  useDetail: useUptBercerita,
  useRelated: useUptStoriesList,
  pathForItem: pathForUptStory,
  backTo: pathForView('informasi', 'sec-info-upt'),
  backLabel: 'Kembali ke UPT Bercerita',
  loadingLabel: 'Memuat cerita...',
  errorTitle: 'Cerita tidak dapat dimuat',
  errorText: 'Terjadi gangguan saat mengambil data cerita. Silakan coba lagi.',
  copiedMessage: 'Tautan cerita berhasil disalin!',
  relatedTitle: 'Cerita Terkait Lainnya'
};

export default function UptBerceritaDetailView() {
  return <BeritaDetailView config={UPT_CONFIG} />;
}
