import PengumumanList from './PengumumanList';
import { PengumumanCard } from './PengumumanCards';

const COPY = {
  kicker: 'Pengumuman Resmi',
  noun: 'pengumuman',
  icon: 'fa-solid fa-bullhorn',
  emptyTitle: 'Belum ada pengumuman.',
  emptyText: 'Pengumuman terbaru akan tampil di sini begitu tersedia.'
};

export default function PengumumanPanel({ title, submenuId }) {
  return <PengumumanList title={title} submenuId={submenuId} copy={COPY} Card={PengumumanCard} />;
}
