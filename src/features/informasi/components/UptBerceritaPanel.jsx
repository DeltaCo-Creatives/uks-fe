import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { pathForUptStory } from '@/routes';
import SafeImage from '@/components/SafeImage';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import ContentToolbar from '@/components/shared/ContentToolbar';
import Pagination from '@/components/shared/Pagination';
import { usePagedGroups } from '@/hooks/usePagedGroups';
import { useContentToolbar } from '@/hooks/useContentToolbar';
import { useUptStoriesList } from '@/hooks/usePublicLists';
import { formatMonthYearID, parseIndonesianDate } from '@/utils/dateID';
import {
  PANEL_HEAD, PANEL_TITLE, PANEL_DESC, FILTER, FILTER_TRACK, filterButton, GRID,
  NEWS_CARD, NEWS_CARD_LINK, CARD_META, CARD_KICKER, CARD_DATE, CARD_TITLE, CARD_EXCERPT, CARD_FOOT, CARD_FOOT_ITEM
} from '../styles';

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

  const { pagedGroups, page, totalPages, setPage } = usePagedGroups(groups, `${query}|${sortDir}|${groupKey}|${JSON.stringify(dateRange)}|${activeCategory}`);

  return (
    <div className="about-bento-frame">
      <div className={PANEL_HEAD}>
        <div>
          <span className="section-kicker">Kabar Unit Pelaksana Teknis</span>
          <h2 className={PANEL_TITLE}>UPT Bercerita: Gerak Sehat di Daerah</h2>
          <p className={PANEL_DESC}>
            Catatan lapangan dari Balai Penjaminan Mutu Pendidikan (BPMP) dan Balai Guru Penggerak (BGP) se-Indonesia.
          </p>
        </div>

        <div className={FILTER}>
          <div className={FILTER_TRACK} role="group" aria-label="Saring cerita menurut topik">
            <button
              type="button"
              className={filterButton(activeCategory === 'all')}
              aria-pressed={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            >
              Semua Topik
            </button>
            {categoryTabs.map((cat) => (
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

      {loading && <LoadingState label="Memuat cerita UPT..." />}

      {!loading && error && (
        <ErrorState
          title="Cerita UPT tidak dapat dimuat"
          text="Terjadi gangguan saat mengambil data cerita UPT. Silakan coba lagi."
          retry={retry}
        />
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
            <EmptyState
              icon="fa-solid fa-book-open-reader"
              title={totalCount === 0 ? 'Belum ada cerita UPT yang tersedia' : 'Tidak ada cerita yang cocok'}
              text={
                totalCount === 0
                  ? 'Cerita dari UPT daerah akan tampil di sini begitu tersedia.'
                  : 'Coba kategori lain, kata kunci berbeda, atau ubah rentang tanggal.'
              }
            />
          ) : (
            pagedGroups.map((group) => (
              <div key={group.label ?? 'flat'}>
                {group.label && <h3 className="content-group-heading">{group.label}</h3>}
                <div className={GRID}>
                  {group.items.map((story) => {
                    const cardBody = (
                      <>
                        <div className="news-img-wrap">
                          <SafeImage src={story.image} alt="" />
                        </div>

                        <div className={CARD_META}>
                          <span className={CARD_KICKER}>{story.category}</span>
                          <span className={CARD_DATE}>
                            <i className="fa-regular fa-calendar" aria-hidden="true"></i> {story.date}
                          </span>
                        </div>

                        <h3 className={CARD_TITLE}>{story.title}</h3>
                        <p className={CARD_EXCERPT}>{story.excerpt}</p>

                        <div className={CARD_FOOT}>
                          <span className={CARD_FOOT_ITEM}>
                            <i className="fa-solid fa-location-dot" aria-hidden="true"></i> {story.region}
                          </span>
                          {story.slug && (
                            <span className={CARD_FOOT_ITEM}>
                              Baca selengkapnya <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                            </span>
                          )}
                        </div>
                      </>
                    );

                    // No slug means no detail page to open, so it stays a plain card.
                    return story.slug ? (
                      <Link
                        key={story.id}
                        to={pathForUptStory(story.slug)}
                        className={NEWS_CARD_LINK}
                      >
                        {cardBody}
                      </Link>
                    ) : (
                      <article key={story.id} className={NEWS_CARD}>
                        {cardBody}
                      </article>
                    );
                  })}
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
