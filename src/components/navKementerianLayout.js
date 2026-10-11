// Width of the panel grid in columns. index.css (.nav-kem-grid) has to match.
const COLUMNS = 3;

// The group with the most links takes two columns, but only from this many links up.
export const WIDE_AT = 6;

/**
 * Index of the one group that spans two columns: the one with the most links,
 * and only when that is WIDE_AT or more. A tie goes to the first. -1 when none qualifies.
 *
 * @param {number[]} counts - link count per group, in display order
 */
export function wideIndex(counts) {
  const max = Math.max(0, ...counts);
  return max >= WIDE_AT ? counts.indexOf(max) : -1;
}

/**
 * Final column span of every card, so no row of the grid has a hole. A card that
 * would not fit its row widens the card before it, and the last card widens to
 * close the final row. Order is untouched, so Tab order stays the CMS order.
 *
 * @param {number[]} base - wanted span per card (1 or 2), in display order
 */
export function packSpans(base) {
  const closeRow = (spans, col) => [...spans.slice(0, -1), spans[spans.length - 1] + COLUMNS - col];
  const { spans, col } = base.reduce(
    (acc, span) => (acc.col + span > COLUMNS
      ? { spans: [...closeRow(acc.spans, acc.col), span], col: span % COLUMNS }
      : { spans: [...acc.spans, span], col: (acc.col + span) % COLUMNS }),
    { spans: [], col: 0 }
  );
  return col ? closeRow(spans, col) : spans;
}
