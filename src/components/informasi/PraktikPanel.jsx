import { usePraktikBaikList } from '../../hooks/usePublicLists';
import { LoadingState, ErrorState, EmptyState } from '../shared/AsyncState';
import ContentToolbar from '../shared/ContentToolbar';
import { useContentToolbar } from '../../hooks/useContentToolbar';
import { formatMonthYearID, parseIndonesianDate } from '../../utils/dateID';

const GROUP_OPTIONS = [
  { key: 'month', label: 'Bulan', getGroup: (item) => {
    const parsed = parseIndonesianDate(item.date);
    return parsed ? formatMonthYearID(parsed) : 'Tanggal tidak diketahui';
  } },
  { key: 'level', label: 'Jenjang', getGroup: (item) => item.level }
];

export default function PraktikPanel() {
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

  return (
    <div className="about-bento-frame">
      <div className="info-panel-head is-stacked">
        <span className="section-kicker">Inspirasi Dari Sekolah</span>
        <h2 className="info-panel-title">Praktik Baik Pembiasaan Trias &amp; 5 Sehat</h2>
        <p className="info-panel-desc">
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
            groups.map((group) => (
              <div key={group.label ?? 'flat'}>
                {group.label && <h3 className="content-group-heading">{group.label}</h3>}
                <div className="info-grid">
                  {group.items.map((bp) => (
                    <article key={bp.id} className="info-practice">
                      <span className="info-practice-icon" aria-hidden="true"><i className={bp.icon}></i></span>
                      <span className="info-practice-level">{bp.level}</span>
                      <h3 className="info-practice-title">{bp.title}</h3>
                      <p className="info-practice-desc">{bp.desc}</p>
                      <span className="info-practice-date">
                        <i className="fa-regular fa-calendar" aria-hidden="true"></i> {bp.date}
                      </span>
                    </article>
                  ))}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
