import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '@/hooks/useCollapse';
import { ROW, LABEL, VALUE, SKELETON, URUTAN, URUTAN_NUMBER, MUTED } from '../styles';

const ROWS = [
  { key: 'hariIni', label: 'Hari Ini' },
  { key: 'mingguIni', label: 'Minggu Ini' },
  { key: 'bulanIni', label: 'Bulan Ini' },
  { key: 'total', label: 'Total' }
];

const numberFormat = new Intl.NumberFormat('id-ID');

// The count-up plays once per page load, however often the footer remounts.
let hasCounted = false;

/** The animated digits are hidden from screen readers, which get the final number instead. */
function Count({ value, className }) {
  const text = numberFormat.format(value);
  return (
    <>
      <span aria-hidden="true" data-count={value} className={className}>{text}</span>
      <span className="sr-only">{text}</span>
    </>
  );
}

function LoadingRows() {
  return (
    <>
      <p role="status" className="sr-only">Memuat statistik pengunjung</p>
      <dl aria-hidden="true">
        {ROWS.map(({ key, label }) => (
          <div key={key} className={ROW}>
            <dt className={LABEL}>{label}</dt>
            <dd><span className={SKELETON} /></dd>
          </div>
        ))}
      </dl>
    </>
  );
}

/**
 * Footer column with the visitor summary (Hari Ini, Minggu Ini, Bulan Ini, Total) and this visitor's number
 * for the day. Without a summary it shows skeleton rows while loading, or a muted line after a failed
 * request, and never blocks the page.
 *
 * @param {{
 *   ringkasan: { hariIni: number, mingguIni: number, bulanIni: number, total: number } | null,
 *   urutan: number | null,
 *   error: Error | null
 * }} props - fields of useKunjungan()
 */
export default function StatistikPengunjung({ ringkasan, urutan, error }) {
  const blockRef = useRef(null);
  const hasData = Boolean(ringkasan);
  const hasUrutan = Number.isInteger(urutan) && urutan > 0;

  // Purpose: draw the eye to the numbers once, the first time the footer scrolls into view.
  useGSAP(() => {
    const block = blockRef.current;
    if (!hasData || hasCounted || !block || prefersReducedMotion()) return undefined;

    const targets = gsap.utils.toArray('[data-count]', block);
    const ends = targets.map((el) => Number(el.dataset.count));
    const render = (progress) => {
      targets.forEach((el, i) => {
        el.textContent = numberFormat.format(Math.round(ends[i] * progress));
      });
    };
    render(0);

    let observer = null;
    const progress = { value: 0 };
    const tween = gsap.to(progress, {
      value: 1,
      duration: 1,
      ease: 'power1.out',
      onStart: () => {
        hasCounted = true;
        observer?.disconnect();
      },
      onUpdate: () => render(progress.value),
      // Values may have changed mid-count, so finish on what the DOM now says.
      onComplete: () => {
        targets.forEach((el) => {
          el.textContent = numberFormat.format(Number(el.dataset.count));
        });
      },
      scrollTrigger: { trigger: block, start: 'top 95%', once: true }
    });

    // Content above loads after the trigger is measured, so re-measure until the count starts.
    if (!hasCounted && typeof ResizeObserver === 'function') {
      observer = new ResizeObserver(() => {
        tween.scrollTrigger?.refresh();
        tween.scrollTrigger?.update();
      });
      observer.observe(document.body);
    }
    return () => observer?.disconnect();
  }, { dependencies: [hasData], scope: blockRef });

  let content;
  if (ringkasan) {
    content = (
      <>
        <dl>
          {ROWS.map(({ key, label }) => (
            <div key={key} className={ROW}>
              <dt className={LABEL}>{label}</dt>
              <dd className={VALUE}><Count value={ringkasan[key]} /></dd>
            </div>
          ))}
        </dl>
        {hasUrutan && (
          <p className={URUTAN}>
            Anda adalah pengunjung ke-<Count value={urutan} className={URUTAN_NUMBER} /> hari ini
          </p>
        )}
      </>
    );
  } else if (error) {
    content = <p className={MUTED}>Statistik pengunjung belum tersedia</p>;
  } else {
    content = <LoadingRows />;
  }

  return (
    <div ref={blockRef} className="footer-links" style={{ flex: '1 1 220px', maxWidth: '300px' }}>
      <h5>Statistik Pengunjung</h5>
      {content}
    </div>
  );
}
