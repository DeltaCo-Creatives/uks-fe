import { usePraktikBaikList } from '@/hooks/usePublicLists';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import ContentToolbar from '@/components/shared/ContentToolbar';
import Pagination from '@/components/shared/Pagination';
import { usePagedGroups } from '@/hooks/usePagedGroups';
import { useContentToolbar } from '@/hooks/useContentToolbar';
import { formatMonthYearID, parseIndonesianDate } from '@/utils/dateID';
import { PANEL_HEAD_STACKED, PANEL_TITLE, PANEL_DESC, GRID } from '../styles';

const GROUP_OPTIONS = [
  { key: 'month', label: 'Bulan', getGroup: (item) => {
    const parsed = parseIndonesianDate(item.date);
    return parsed ? formatMonthYearID(parsed) : 'Tanggal tidak diketahui';
  } },
  { key: 'level', label: 'Jenjang', getGroup: (item) => item.level }
];

export default function PraktikPanel({ title }) {
  const { data: practices, loading, error, retry } = usePraktikBaikList();

  const {
    query, setQuery,
    sortDir, setSortDir,
    groupKey, setGroupKey,
    dateRange, setDateRange,
    groups, resultCount, totalCount, datesWithContent
  } = useContentToolbar({
    items: practices || [],
    searchFields: ['title', 'desc', 'level'],
    groupOptions: GROUP_OPTIONS
  });

  const { pagedGroups, page, totalPages, setPage } = usePagedGroups(groups, `${query}|${sortDir}|${groupKey}|${JSON.stringify(dateRange)}`);

  return (
    <div className="about-bento-frame">
      <div className={PANEL_HEAD_STACKED}>
        <span className="section-kicker">Inspirasi Dari Sekolah</span>
        <h2 className={PANEL_TITLE}>{title}</h2>
        <p className={PANEL_DESC}>
          Cara yang sudah berjalan di sekolah dasar dan menengah, untuk ditiru sekolah lain.
        </p>
      </div>

      {loading && <LoadingState label="Memuat praktik baik..." />}

      {!loading && error && (
        <ErrorState
          title="Praktik baik tidak dapat dimuat"
          text="Terjadi gangguan saat mengambil data praktik baik. Silakan coba lagi."
          retry={retry}
        />
      )}

      {!loading && !error && (
        <>
          <ContentToolbar
            searchPlaceholder="Cari praktik baik berdasarkan judul, jenjang, atau deskripsi"
            query={query}
            onQueryChange={setQuery}
            sortDir={sortDir}
            onSortChange={setSortDir}
            groupOptions={GROUP_OPTIONS}
            groupKey={groupKey}
            onGroupChange={setGroupKey}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            markedDates={datesWithContent}
            resultCount={resultCount}
            totalCount={totalCount}
          />

          {resultCount === 0 ? (
            <EmptyState
              icon="fa-solid fa-school-flag"
              title={totalCount === 0 ? 'Belum ada praktik baik yang tersedia' : 'Tidak ada praktik baik yang cocok'}
              text={
                totalCount === 0
                  ? 'Praktik baik dari sekolah akan tampil di sini begitu tersedia.'
                  : 'Coba kata kunci lain atau ubah rentang tanggal.'
              }
            />
          ) : (
            pagedGroups.map((group) => (
              <div key={group.label ?? 'flat'}>
                {group.label && <h3 className="content-group-heading">{group.label}</h3>}
                <div className={GRID}>
                  {group.items.map((bp) => (
                    <article key={bp.id} className="flex flex-col items-start rounded-card bg-card p-6 shadow-raised max-[768px]:p-[18px]">
                      <span className="mb-3.5 grid size-11 place-items-center rounded-soft bg-brand-light text-[18px] text-brand" aria-hidden="true"><i className={bp.icon}></i></span>
                      <span className="mb-2.5 inline-block rounded-[999px] bg-brand-light px-2.5 py-1 text-[11px] font-extrabold text-brand-deep">{bp.level}</span>
                      <h3 className="mb-2 text-[17px] leading-[1.35] font-extrabold text-ink max-[768px]:text-[16px]">{bp.title}</h3>
                      <p className="mb-3 text-[13px] leading-[1.6] text-ink-muted">{bp.desc}</p>
                      <span className="mt-auto text-[11px] font-semibold text-ink-muted">
                        <i className="fa-regular fa-calendar" aria-hidden="true"></i> {bp.date}
                      </span>
                    </article>
                  ))}
                </div>
              </div>
            ))
          )}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
