/**
 * Parsing and formatting for the Indonesian "14 September 2026" date strings
 * used throughout the portal's content lists (Warta, UPT Bercerita, Praktik Baik).
 */

const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * @param {string} value - e.g. "14 September 2026"
 * @returns {Date | null} a real Date, or null when the string cannot be parsed
 */
export function parseIndonesianDate(value) {
  if (!value) return null;
  const parts = value.trim().split(/\s+/);
  if (parts.length !== 3) return null;

  const [dayStr, monthName, yearStr] = parts;
  const day = parseInt(dayStr, 10);
  const year = parseInt(yearStr, 10);
  const monthIndex = MONTHS_ID.findIndex(
    (m) => m.toLowerCase() === monthName.toLowerCase()
  );

  if (Number.isNaN(day) || Number.isNaN(year) || monthIndex === -1) return null;
  return new Date(year, monthIndex, day);
}

/** @param {Date} date @returns {string} e.g. "September 2026" */
export function formatMonthYearID(date) {
  return `${MONTHS_ID[date.getMonth()]} ${date.getFullYear()}`;
}

/** @param {Date} date @returns {string} e.g. "14 September 2026" */
export function formatDateID(date) {
  return `${date.getDate()} ${MONTHS_ID[date.getMonth()]} ${date.getFullYear()}`;
}

/** @param {Date} a @param {Date} b */
export function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

export const MONTHS_ID_LIST = MONTHS_ID;
