const STORAGE_KEY = 'uks.kunjungan';
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// Used when storage is blocked or full, so a visit still counts once per page load.
let memoryMarker = null;

// A shape-valid but impossible date (2026-13-45) would be sent to the API and rejected on every load.
function isRealDate(value) {
  if (!DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function parseMarker(raw) {
  try {
    const value = JSON.parse(raw);
    const valid =
      value !== null &&
      typeof value === 'object' &&
      typeof value.tanggal === 'string' &&
      isRealDate(value.tanggal) &&
      Number.isInteger(value.urutan) &&
      value.urutan > 0;
    return valid ? { tanggal: value.tanggal, urutan: value.urutan } : null;
  } catch {
    return null;
  }
}

/**
 * The last counted visit of this browser, `{ tanggal: "yyyy-MM-dd", urutan }`, or null when there is none
 * or the stored value is corrupt. Holds no identifier: only the WIB day and the number shown that day.
 */
export function readMarker() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const stored = raw === null ? null : parseMarker(raw);
    if (stored) return stored;
  } catch {
    // Storage blocked: the in-memory marker below stands in.
  }
  return memoryMarker;
}

/** @param {{ tanggal: string, urutan: number }} marker */
export function writeMarker(marker) {
  memoryMarker = marker;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(marker));
  } catch {
    // Storage blocked or full: the in-memory marker still stops a recount in this page load.
  }
}
