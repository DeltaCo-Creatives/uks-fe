const DAY_MS = 86400000;

const utcDay = (isoDate) => {
  const [y, m, d] = isoDate.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};

/** Whole days from today in Asia/Jakarta (the backend's "today") to a `yyyy-MM-dd` date; 0 is today, negative is past. */
export function daysUntil(isoDate, now = new Date()) {
  const today = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
  return (utcDay(isoDate) - utcDay(today)) / DAY_MS;
}

/** Status line of a kesempatan card ("Ditutup dalam 3 hari"); the API's `status` decides, the date only counts down. */
export function countdownLabel(item, now) {
  if (item.status === 'ditutup') return 'Pendaftaran ditutup';
  if (item.status === 'akan-dibuka') return `Dibuka mulai ${item.tanggalBukaLabel}`;
  if (!item.berlakuSampai) return null;
  const days = daysUntil(item.berlakuSampai, now);
  return days <= 0 ? 'Ditutup hari ini' : `Ditutup dalam ${days} hari`;
}

/** "5 Oktober 2026 – 20 Oktober 2026": opening (else publish) date to the deadline. */
export const periodeLabel = (item) =>
  [item.tanggalBukaLabel ?? item.tanggalTerbitLabel, item.berlakuSampaiLabel].filter(Boolean).join(' – ');

/** The "Daftar" button needs a link and a registration that is not closed. */
export const canDaftar = (item) => !!item.linkDaftar && item.status !== 'ditutup';
