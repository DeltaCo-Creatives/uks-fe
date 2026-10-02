import { useState } from 'react';
import { Link } from 'react-router-dom';
import { pathForArticle } from '@/routes';
import SafeImage from '@/components/SafeImage';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import ContentToolbar from '@/components/shared/ContentToolbar';
import Pagination from '@/components/shared/Pagination';
import { usePagedGroups } from '@/hooks/usePagedGroups';
import { useContentToolbar } from '@/hooks/useContentToolbar';
import { useBeritaList } from '@/hooks/useBerita';
import { formatMonthYearID, parseIndonesianDate } from '@/utils/dateID';
import {
  PANEL_HEAD, PANEL_TITLE, FILTER, FILTER_TRACK, filterButton, GRID,
  NEWS_CARD_LINK, CARD_META, CARD_KICKER, CARD_DATE, CARD_TITLE, CARD_EXCERPT, CARD_FOOT, CARD_FOOT_ITEM
} from '../styles';

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
  const { data: newsList, loading, error, retry } = useBeritaList();

  const categoryFiltered = !newsList
    ? []
    : activeCategory === 'all'
      ? newsList
      : newsList.filter(n => n.categoryKey === activeCategory);

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

  const { pagedGroups, page, totalPages, setPage } = usePagedGroups(groups, `${query}|${sortDir}|${groupKey}|${JSON.stringify(dateRange)}|${activeCategory}`);

  return (
    <div className="about-bento-frame">
      <div className={PANEL_HEAD}>
        <div>
          <span className="section-kicker">Rilis Resmi Kementerian</span>
          <h2 className={PANEL_TITLE}>Warta Terkini Usaha Kesehatan Sekolah</h2>
        </div>

        <div className={FILTER}>
          <div className={FILTER_TRACK} role="group" aria-label="Saring warta menurut kategori">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={filterButton(activeCategory === cat.key)}
                aria-pressed={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && <LoadingState label="Memuat warta terkini..." />}

      {!loading && error && (
        <ErrorState
          title="Warta tidak dapat dimuat"
          text="Terjadi gangguan saat mengambil data warta. Silakan coba lagi."
          retry={retry}
        />
      )}

      {!loading && !error && (
        <>
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
            <EmptyState
              icon="fa-solid fa-newspaper"
              title={totalCount === 0 ? 'Belum ada warta yang tersedia' : 'Tidak ada warta yang cocok'}
              text={
                totalCount === 0
                  ? 'Warta terkini akan tampil di sini begitu tersedia.'
                  : 'Coba ubah kata kunci pencarian atau rentang tanggal.'
              }
            />
          ) : (
            pagedGroups.map((group) => (
              <div key={group.label ?? 'flat'}>
                {group.label && <h3 className="content-group-heading">{group.label}</h3>}
                <div className={GRID}>
                  {group.items.map(item => (
                    <Link
                      key={item.id}
                      to={pathForArticle(item.slug)}
                      className={NEWS_CARD_LINK}
                    >
                      <div className="news-img-wrap">
                        <SafeImage src={item.image} alt="" />
                      </div>
                      <div className={CARD_META}>
                        <span className={CARD_KICKER}>{item.category}</span>
                        <span className={CARD_DATE}>
                          <i className="fa-regular fa-calendar" aria-hidden="true"></i> {item.date}
                        </span>
                      </div>
                      <h3 className={CARD_TITLE}>{item.title}</h3>
                      <p className={CARD_EXCERPT}>{item.excerpt}</p>
                      <div className={CARD_FOOT}>
                        <span className={CARD_FOOT_ITEM}>
                          Baca selengkapnya <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </span>
                      </div>
                    </Link>
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

