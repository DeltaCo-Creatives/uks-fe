import { bestPracticesList } from '../../data/portalData';
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
  const {
    query, setQuery,
    sortDir, setSortDir,
    groupKey, setGroupKey,
    dateRange, setDateRange,
    groups, resultCount, totalCount, datesWithContent
  } = useContentToolbar({
    items: bestPracticesList,
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
        <div className="content-toolbar-empty">
          <i className="fa-solid fa-school-flag" aria-hidden="true"></i>
          <h4 className="info-empty-title">Tidak ada praktik baik yang cocok</h4>
          <p className="info-empty-text">Coba kata kunci lain atau ubah rentang tanggal.</p>
        </div>
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
    </div>
  );
}
