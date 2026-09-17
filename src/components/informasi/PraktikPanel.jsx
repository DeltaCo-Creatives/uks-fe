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
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">Inspirasi Dari Sekolah</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          Praktik Baik Pembiasaan Trias &amp; 5 Sehat
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          Inovasi mandiri yang berhasil diterapkan di berbagai jenjang sekolah dasar dan menengah sebagai rujukan replikasi nasional.
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
          <i className="fa-solid fa-lightbulb" style={{ fontSize: '32px', color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '12px' }}></i>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
            Tidak ada praktik baik yang cocok
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Coba kata kunci lain atau ubah rentang tanggal.
          </p>
        </div>
      ) : (
        groups.map((group) => (
          <div key={group.label ?? 'flat'}>
            {group.label && <h3 className="content-group-heading">{group.label}</h3>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
              {group.items.map((bp) => (
                <div key={bp.id} className="stat-box" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '26px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '14px' }}>{bp.icon}</div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand-primary)', background: 'var(--brand-light)', padding: '4px 10px', borderRadius: 'var(--radius-pill)', marginBottom: '10px', display: 'inline-block' }}>
                    {bp.level}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>{bp.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>{bp.desc}</p>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, marginTop: 'auto' }}>
                    <i className="fa-regular fa-calendar" style={{ marginRight: '5px' }}></i>{bp.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
