import { useMemo, useState } from 'react';
import SafeImage from '../SafeImage';
import ContentToolbar from '../shared/ContentToolbar';
import { useContentToolbar } from '../../hooks/useContentToolbar';
import { useUptStoriesList } from '../../hooks/useUptStories';
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
  const { data: stories, loading, error, retry } = useUptStoriesList();

  // Tabs mirror whatever categories the CMS actually returns, sorted
  // alphabetically so the order stays stable as new stories are published.
  const categoryTabs = useMemo(() => {
    if (!stories) return [];
    const seen = new Map();
    stories.forEach((story) => {
      if (!seen.has(story.categoryKey)) seen.set(story.categoryKey, story.category);
    });
    return Array.from(seen, ([key, label]) => ({ key, label }))
      .sort((a, b) => a.label.localeCompare(b.label, 'id'));
  }, [stories]);

  const categoryFiltered = !stories
    ? []
    : activeCategory === 'all'
      ? stories
      : stories.filter((s) => s.categoryKey === activeCategory);

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
            <button
              type="button"
              className={`info-filter-btn ${activeCategory === 'all' ? 'is-active' : ''}`}
              aria-pressed={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            >
              Semua Topik
            </button>
            {categoryTabs.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`info-filter-btn ${activeCategory === cat.key ? 'is-active' : ''}`}
                aria-pressed={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <div className="content-toolbar-empty" role="status" aria-live="polite">
          <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i>
          <h4 className="info-empty-title">Memuat cerita UPT...</h4>
        </div>
      )}

      {!loading && error && (
        <div className="content-toolbar-empty">
          <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
          <h4 className="info-empty-title">Cerita UPT tidak dapat dimuat</h4>
          <p className="info-empty-text">Terjadi gangguan saat mengambil data cerita UPT. Silakan coba lagi.</p>
          <button type="button" className="btn-pill secondary" onClick={retry} style={{ marginTop: '12px' }}>
            Coba Lagi
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
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
              <h4 className="info-empty-title">
                {totalCount === 0 ? 'Belum ada cerita UPT yang tersedia' : 'Tidak ada cerita yang cocok'}
              </h4>
              <p className="info-empty-text">
                {totalCount === 0
                  ? 'Cerita dari UPT daerah akan tampil di sini begitu tersedia.'
                  : 'Coba kategori lain, kata kunci berbeda, atau ubah rentang tanggal.'}
              </p>
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
        </>
      )}
    </div>
  );
}
