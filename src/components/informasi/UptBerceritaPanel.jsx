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
      <div className="info-panel-head">
        <div>
          <span className="section-kicker">Kabar Unit Pelaksana Teknis</span>
          <h2 className="info-panel-title">UPT Bercerita: Gerak Sehat di Daerah</h2>
          <p className="info-panel-desc">
            Catatan lapangan dari Balai Penjaminan Mutu Pendidikan (BPMP) dan Balai Guru Penggerak (BGP) se-Indonesia.
          </p>
        </div>

        <div className="info-filter">
          <div className="info-filter-track" role="group" aria-label="Saring cerita menurut topik">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`info-filter-btn ${activeCategory === cat ? 'is-active' : ''}`}
                aria-pressed={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'all' ? 'Semua Topik' : cat}
              </button>
            ))}
          </div>
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
          <i className="fa-solid fa-book-open-reader" aria-hidden="true"></i>
          <h4 className="info-empty-title">Tidak ada cerita yang cocok</h4>
          <p className="info-empty-text">Coba kategori lain, kata kunci berbeda, atau ubah rentang tanggal.</p>
        </div>
      ) : (
        groups.map((group) => (
          <div key={group.label ?? 'flat'}>
            {group.label && <h3 className="content-group-heading">{group.label}</h3>}
            <div className="info-grid">
              {group.items.map((story) => (
                <article key={story.id} className="news-card-playful info-story">
                  <div className="news-img-wrap">
                    <SafeImage src={story.image} alt="" />
                  </div>

                  <div className="info-card-meta">
                    <span className="section-kicker">{story.category}</span>
                    <span className="info-card-date">
                      <i className="fa-regular fa-calendar" aria-hidden="true"></i> {story.date}
                    </span>
                  </div>

                  <h3 className="info-card-title">{story.title}</h3>
                  <p className="info-card-excerpt">{story.excerpt}</p>

                  <div className="info-card-foot">
                    <span className="info-card-region">
                      <i className="fa-solid fa-location-dot" aria-hidden="true"></i> {story.region}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
