import PengumumanList from './PengumumanList';
import { KesempatanCard } from './PengumumanCards';

const COPY = {
  kicker: 'Peluang dan Pendaftaran',
  noun: 'kesempatan',
  icon: 'fa-solid fa-calendar-check',
  emptyTitle: 'Belum ada kesempatan yang dibuka.',
  emptyText: 'Kesempatan dan pendaftaran akan tampil di sini begitu dibuka.'
};

export default function KesempatanPanel({ title, submenuId }) {
  return <PengumumanList title={title} submenuId={submenuId} copy={COPY} Card={KesempatanCard} />;
}
