let formatter = null;

/**
 * Today's date in WIB (Asia/Jakarta) as "yyyy-MM-dd", from the device clock. Only a hint for when to
 * re-check across midnight: the server's date decides what is counted. Null when Intl cannot answer.
 *
 * @param {Date} [now]
 * @returns {string | null}
 */
export function jakartaToday(now = new Date()) {
  try {
    formatter ??= new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const parts = Object.fromEntries(formatter.formatToParts(now).map((part) => [part.type, part.value]));
    return `${parts.year}-${parts.month}-${parts.day}`;
  } catch {
    return null;
  }
}
