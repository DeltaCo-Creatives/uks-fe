import { useId, useState } from 'react';
import PrestasiSlider from './PrestasiSlider';

const JENJANG_ORDER = ['PAUD/TK', 'SD', 'SMP', 'SMA', 'SMK', 'SLB/SKH', 'SKB & PKBM'];

function countByJenjang(winners) {
  const counts = {};
  for (const winner of winners) counts[winner.jenjang] = (counts[winner.jenjang] || 0) + 1;
  return counts;
}

/* A winner's jenjang the display order doesn't know about yet is appended at
   the end rather than hidden from the filter. */
function orderedJenjang(winners) {
  const extra = [...new Set(winners.map((winner) => winner.jenjang))].filter((j) => !JENJANG_ORDER.includes(j));
  return extra.length ? [...JENJANG_ORDER, ...extra] : JENJANG_ORDER;
}

function firstJenjangWithWinners(order, counts) {
  return order.find((level) => counts[level]) || null;
}

/**
 * The actual winners, one jenjang at a time, one winner per slide. The
 * slider is keyed on jenjang so switching the filter remounts it fresh on
 * slide 1, no extra state needed here to keep the two in sync.
 *
 * @param {{ winners: Array<object>, note?: string }} props
 */
export default function ShowcaseFace({ winners, note }) {
  const filterId = useId();
  const counts = countByJenjang(winners);
  const order = orderedJenjang(winners);
  const [jenjang, setJenjang] = useState(() => firstJenjangWithWinners(order, counts));

  if (winners.length === 0) {
    return (
      <div className="prestasi-empty">
        <i className="fa-regular fa-file-lines" aria-hidden="true"></i>
        <p>Belum ada pemenang yang tercatat untuk kompetisi ini.</p>
      </div>
    );
  }

  const shown = winners.filter((winner) => winner.jenjang === jenjang);

  return (
    <div className="prestasi-face">
      <div className="prestasi-showcase-toolbar">
        <label className="prestasi-filter" htmlFor={filterId}>
          <span>Filter jenjang</span>
          <select id={filterId} value={jenjang} onChange={(event) => setJenjang(event.target.value)}>
            {order.filter((level) => counts[level]).map((level) => (
              <option key={level} value={level}>{level} ({counts[level]})</option>
            ))}
          </select>
        </label>
        <p className="prestasi-showcase-count">Menampilkan {shown.length} pemenang jenjang {jenjang}</p>
      </div>

      <PrestasiSlider key={jenjang} winners={shown} />

      {note && <p className="prog-note">{note}</p>}
    </div>
  );
}
