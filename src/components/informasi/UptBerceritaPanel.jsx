import { useState, useMemo } from 'react';
import { uptStories } from '../../data/portalData';
import SafeImage from '../SafeImage';
import ContentToolbar from '../shared/ContentToolbar';
import { useContentToolbar } from '../../hooks/useContentToolbar';
import { formatMonthYearID, parseIndonesianDate } from '../../utils/dateID';

const GROUP_OPTIONS = [
  { key: 'month', label: 'Bulan', getGroup: (item) => {
    const parsed = parseIndonesianDate(item.date);
    return parsed ? formatMonthYearID(parsed) : 'Tanggal tidak diketahui';
  } },
  { key: 'category', label: 'Topik', getGroup: (item) => item.category },
  { key: 'region', label: 'Wilayah', getGroup: (item) => item.region }
];

export default function UptBerceritaPanel() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', '7KAIH', 'CKG', 'MBG', 'UKS'];

  const categoryFiltered = useMemo(() => {
    if (activeCategory === 'all') return uptStories;
    return uptStories.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const {
    query, setQuery,
    sortDir, setSortDir,
    groupKey, setGroupKey,
    dateRange, setDateRange,
    groups, resultCount, totalCount, datesWithContent
  } = useContentToolbar({
    items: categoryFiltered,
    searchFields: ['title', 'excerpt', 'region', 'category'],
    groupOptions: GROUP_OPTIONS
  });

  return (
    <div className="about-bento-frame">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(0,0,0,0.06)'
        }}
      >
        <div>
          <span className="section-kicker">Kabar Unit Pelaksana Teknis</span>
          <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 4px', color: 'var(--text-primary)' }}>
            UPT Bercerita: Gerak Sehat di Daerah
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
            Catatan lapangan dari Balai Penjaminan Mutu Pendidikan (BPMP) dan Balai Guru Penggerak (BGP) se-Indonesia.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', background: 'var(--bg-app)', padding: '6px', borderRadius: 'var(--radius-pill)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`subnav-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              {cat === 'all' ? 'Semua Topik' : cat}
            </button>
          ))}
        </div>
      </div>

      <ContentToolbar
        searchPlaceholder="Cari cerita berdasarkan judul, wilayah, atau ringkasan"
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
          <i className="fa-solid fa-book-open-reader" style={{ fontSize: '32px', color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '12px' }}></i>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
            Tidak ada cerita yang cocok
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Coba kategori lain, kata kunci berbeda, atau ubah rentang tanggal.
          </p>
        </div>
      ) : (
        groups.map((group) => (
          <div key={group.label ?? 'flat'}>
            {group.label && <h3 className="content-group-heading">{group.label}</h3>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '20px' }}>
              {group.items.map((story) => (
                <div
                  key={story.id}
                  className="news-card-playful"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <div className="news-img-wrap" style={{ height: '200px' }}>
                    <SafeImage src={story.image} alt={story.title} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span
                      className="section-kicker"
                      style={{
                        margin: 0,
                        padding: '3px 10px',
                        fontSize: '10px',
                        background: 'var(--brand-light)',
                        color: 'var(--brand-primary)'
                      }}
                    >
                      {story.category}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <i className="fa-regular fa-calendar" style={{ marginRight: '4px' }}></i>
                      {story.date}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '4px 0 8px', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                    {story.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px', flexGrow: 1 }}>
                    {story.excerpt}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--brand-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <i className="fa-solid fa-map-pin"></i>
                      <span>{story.region}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
