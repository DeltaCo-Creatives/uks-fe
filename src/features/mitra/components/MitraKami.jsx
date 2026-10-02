import { useId, useMemo, useRef, useState } from 'react';
import { mitraFields, mitraSupportTypes } from '@/data/portalData';
import { useMitraList } from '@/hooks/usePublicLists';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { SECTION, MINI_LABEL, NUM, COMPACT_NUM, EMPTY, FOCUS_INSET } from '../styles';

const YEAR_TAB = `flex min-h-16 cursor-pointer flex-col items-start gap-0.5 border-b-[3px] bg-transparent px-6 py-3.5 text-left hover:bg-card-alt [&+&]:border-l [&+&]:border-l-rule max-[600px]:px-3.5 max-[600px]:py-3 ${FOCUS_INSET}`;
const PARTNER_LIST = 'm-0 list-none [columns:3_240px] gap-x-8 p-0';
const PARTNER = 'grid grid-cols-[28px_1fr] gap-2 border-b border-rule py-[9px] text-[14px] leading-[1.5] text-ink break-inside-avoid';

const NEXT_KEYS = ['ArrowRight', 'ArrowDown'];
const PREV_KEYS = ['ArrowLeft', 'ArrowUp'];

const normalize = (text) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/* Searching one cohort at a time would hide a partner filed under another year,
   so a query drops the year tabs and looks across all of them at once. */
const searchAllYears = (kelompokTahun, query) => {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return kelompokTahun.flatMap((year) =>
    year.mitra
      .filter((partner) => terms.every((term) => normalize(partner.nama).includes(term)))
      .map((partner) => ({ name: partner.nama, year: year.label }))
  );
};

/**
 * Partner directory by cohort year as ARIA tabs (roving tabindex, arrow/Home/End).
 * Names are plain text in columns: they are not links, so nothing looks clickable.
 */
export default function MitraKami() {
  const { data, loading, error, retry } = useMitraList();
  const kelompokTahun = useMemo(() => data?.kelompokTahun ?? [], [data]);
  const totalPartners = kelompokTahun.reduce((sum, year) => sum + year.mitra.length, 0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState('');
  const tabRefs = useRef([]);
  const searchId = useId();
  const cohort = kelompokTahun[activeIndex];
  const trimmed = query.trim();
  const matches = useMemo(
    () => (trimmed ? searchAllYears(kelompokTahun, trimmed) : null),
    [trimmed, kelompokTahun]
  );

  const selectTab = (index) => {
    const next = (index + kelompokTahun.length) % kelompokTahun.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event) => {
    if (NEXT_KEYS.includes(event.key)) selectTab(activeIndex + 1);
    else if (PREV_KEYS.includes(event.key)) selectTab(activeIndex - 1);
    else if (event.key === 'Home') selectTab(0);
    else if (event.key === 'End') selectTab(kelompokTahun.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <section id="sec-mitra-kami" className={SECTION}>
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Mitra Kami</span>
          <h2 className="section-title">Lembaga yang sudah bermitra</h2>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-8 max-[960px]:grid-cols-[minmax(0,1fr)]" data-gsap="reveal">
        <div>
          <h3 className={MINI_LABEL}>Bidang usaha mitra</h3>
          {/* Static names separated by a dot, no pill shapes. */}
          <ul className="m-0 flex list-none flex-wrap gap-y-1 p-0 text-[15px] leading-[1.6] font-semibold text-ink">
            {mitraFields.map((field) => (
              <li key={field} className="not-last:after:mx-2.5 not-last:after:font-bold not-last:after:text-ink-muted not-last:after:content-['·']">{field}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={MINI_LABEL}>Bentuk dukungan mitra</h3>
          <ol className={COMPACT_NUM}>
            {mitraSupportTypes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="overflow-hidden rounded-panel bg-card" data-gsap="reveal">
        {loading && <LoadingState label="Memuat daftar mitra..." />}

        {!loading && error && (
          <ErrorState
            title="Daftar mitra tidak dapat dimuat"
            text="Terjadi gangguan saat mengambil data mitra. Silakan coba lagi."
            retry={retry}
          />
        )}

        {!loading && !error && (
          kelompokTahun.length === 0 ? (
            <EmptyState
              icon="fa-solid fa-handshake-angle"
              title="Belum ada mitra terdaftar"
              text="Daftar mitra akan tampil di sini begitu tersedia."
            />
          ) : (
            <>
              <div className="flex flex-col gap-1.5 px-6 pt-[18px]">
                <label className="text-[13px] font-bold text-ink" htmlFor={searchId}>Cari nama lembaga</label>
                <div className="flex items-center gap-2.5 rounded-soft border-[1.5px] border-rule bg-card px-3.5 focus-within:border-brand">
                  <i className="fa-solid fa-magnifying-glass text-[13px] text-ink-muted" aria-hidden="true"></i>
                  {/* The field's border turns green on focus instead of an outline. */}
                  <input
                    className="min-h-[44px] min-w-0 flex-1 border-none bg-none text-[14px] text-ink focus:[outline:none]"
                    id={searchId}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={`contoh: Danone, Unicef (${totalPartners} lembaga)`}
                  />
                </div>
              </div>

              <p className="m-0 px-6 pt-2.5 pb-3.5 text-[13px] text-ink-muted" aria-live="polite">
                {trimmed
                  ? `${matches.length} dari ${totalPartners} lembaga cocok, dari semua tahun`
                  : `${totalPartners} lembaga terdaftar di ${kelompokTahun.length} periode`}
              </p>

              {trimmed ? (
                matches.length > 0 ? (
                  <ol className={PARTNER_LIST}>
                    {matches.map(({ name, year }, idx) => (
                      <li key={`${year}-${name}`} className={PARTNER}>
                        <span className={`${NUM} leading-[1.6]`} aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                        <span>
                          {name}
                          {/* A match shows its cohort, since the year tabs are hidden while searching. */}
                          <span className="mt-0.5 block text-[12px] font-bold text-brand-deep">Mitra {year}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="mx-6 mt-0 mb-6 flex flex-col items-start gap-3 rounded-soft border-2 border-dashed border-[#CBD5CE] p-6 text-[15px]">
                    <p className="m-0">Tidak ada lembaga dengan nama yang memuat “{trimmed}”.</p>
                    <button type="button" className="btn-pill secondary" onClick={() => setQuery('')}>
                      Hapus pencarian
                    </button>
                  </div>
                )
              ) : (
                <>
                  <div className="grid grid-cols-3 border-b border-rule" role="tablist" aria-label="Tahun kemitraan" onKeyDown={handleKeyDown}>
                    {kelompokTahun.map((year, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={year.label}
                          ref={(el) => { tabRefs.current[idx] = el; }}
                          id={`mitra-year-tab-${year.label}`}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-controls="mitra-year-panel"
                          tabIndex={isActive ? 0 : -1}
                          className={`${YEAR_TAB} ${isActive ? 'border-b-brand text-ink' : 'border-b-transparent text-ink-muted'}`}
                          onClick={() => setActiveIndex(idx)}
                        >
                          <span className="text-[16px] font-extrabold max-[600px]:text-[14px]">Mitra {year.label}</span>
                          <span className="text-[13px] font-semibold text-ink-muted">{year.mitra.length} lembaga</span>
                        </button>
                      );
                    })}
                  </div>

                  <div
                    id="mitra-year-panel"
                    role="tabpanel"
                    aria-labelledby={`mitra-year-tab-${cohort.label}`}
                    tabIndex={0}
                    className={`p-6 max-[600px]:px-5 max-[600px]:py-4 ${FOCUS_INSET}`}
                  >
                    {cohort.mitra.length === 0 ? (
                      <p className={EMPTY}>Belum ada data mitra untuk tahun ini.</p>
                    ) : (
                      <ol className={PARTNER_LIST}>
                        {cohort.mitra.map((partner, idx) => (
                          <li key={partner.id} className={PARTNER}>
                            <span className={`${NUM} leading-[1.6]`} aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                            <span>{partner.nama}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </>
              )}
            </>
          )
        )}
      </div>
    </section>
  );
}
