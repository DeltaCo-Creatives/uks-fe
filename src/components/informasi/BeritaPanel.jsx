import { useState } from 'react';
import { Link } from 'react-router-dom';
import { realNewsList } from '../../data/portalData';
import { pathForArticle } from '../../routes';
import SafeImage from '../SafeImage';
import ContentToolbar from '../shared/ContentToolbar';
import { useContentToolbar } from '../../hooks/useContentToolbar';
import { formatMonthYearID, parseIndonesianDate } from '../../utils/dateID';

const GROUP_OPTIONS = [
  { key: 'month', label: 'Bulan', getGroup: (item) => {
    const parsed = parseIndonesianDate(item.date);
    return parsed ? formatMonthYearID(parsed) : 'Tanggal tidak diketahui';
  } },
  { key: 'category', label: 'Kategori', getGroup: (item) => item.category }
];

const CATEGORIES = [
  { key: 'all', label: 'Semua Warta' },
  { key: 'pendidikan', label: 'Pendidikan' },
  { key: 'gss', label: 'Gerakan Sekolah Sehat' },
  { key: 'uks', label: 'UKS' }
];

export default function BeritaPanel() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categoryFiltered = activeCategory === 'all'
    ? realNewsList
    : realNewsList.filter(n => n.categoryKey === activeCategory);

  const {
    query, setQuery,
    sortDir, setSortDir,
    groupKey, setGroupKey,
    dateRange, setDateRange,
    groups, resultCount, totalCount, datesWithContent
  } = useContentToolbar({
    items: categoryFiltered,
    searchFields: ['title', 'excerpt', 'category'],
    groupOptions: GROUP_OPTIONS
  });

  return (
    <div className="about-bento-frame">
      <div className="info-panel-head">
        <div>
          <span className="section-kicker">Rilis Resmi Kementerian</span>
          <h2 className="info-panel-title">Warta Terkini Usaha Kesehatan Sekolah</h2>
        </div>

        <div className="info-filter">
          <div className="info-filter-track" role="group" aria-label="Saring warta menurut kategori">
            {CATEGORIES.map((cat) => (
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

      <ContentToolbar
        searchPlaceholder="Cari warta berdasarkan judul atau ringkasan"
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
          <i className="fa-solid fa-newspaper" aria-hidden="true"></i>
          <h4 className="info-empty-title">Tidak ada warta yang cocok</h4>
          <p className="info-empty-text">Coba ubah kata kunci pencarian atau rentang tanggal.</p>
        </div>
      ) : (
        groups.map((group) => (
          <div key={group.label ?? 'flat'}>
            {group.label && <h3 className="content-group-heading">{group.label}</h3>}
            <div className="info-grid">
              {group.items.map(item => (
                <Link
                  key={item.id}
                  to={pathForArticle(item.id)}
                  className="news-card-playful info-card-btn"
                >
                  <div className="news-img-wrap">
                    <SafeImage src={item.image} alt="" />
                  </div>
                  <div className="info-card-meta">
                    <span className="section-kicker">{item.category}</span>
                    <span className="info-card-date">
                      <i className="fa-regular fa-calendar" aria-hidden="true"></i> {item.date}
                    </span>
                  </div>
                  <h3 className="info-card-title">{item.title}</h3>
                  <p className="info-card-excerpt">{item.excerpt}</p>
                  <div className="info-card-foot">
                    <span className="info-card-cta">
                      Baca selengkapnya <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

