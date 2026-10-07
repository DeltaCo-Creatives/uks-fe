import { pengumumanHookFor } from '@/hooks/usePublicLists';
import { useContentToolbar } from '@/hooks/useContentToolbar';
import { usePagedGroups } from '@/hooks/usePagedGroups';
import ContentToolbar from '@/components/shared/ContentToolbar';
import Pagination from '@/components/shared/Pagination';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { PANEL_HEAD_STACKED, PANEL_TITLE, GRID } from '../styles';

const SEARCH_FIELDS = ['judul', 'ringkasan'];

/**
 * Shared shell of the Pengumuman and Kesempatan panels: heading, search, async states, paged cards.
 * The API already orders the list (pinned first), so the toolbar only searches and never re-sorts.
 *
 * @param {{ kicker: string, noun: string, icon: string, emptyTitle: string, emptyText: string }} copy
 * @param {import('react').ComponentType<{ item: object }>} Card
 */
export default function PengumumanList({ title, submenuId, copy, Card }) {
  const useList = pengumumanHookFor(submenuId);
  const { data, loading, error, retry } = useList();
  const { query, setQuery, groups, resultCount, totalCount } = useContentToolbar({
    items: data || [],
    dateField: null,
    searchFields: SEARCH_FIELDS
  });
  const { pagedGroups, page, totalPages, setPage } = usePagedGroups(groups, query);

  return (
    <div className="about-bento-frame">
      <div className={PANEL_HEAD_STACKED}>
        <span className="section-kicker">{copy.kicker}</span>
        <h2 className={PANEL_TITLE}>{title}</h2>
      </div>

      {loading && <LoadingState label={`Memuat ${copy.noun}...`} />}

      {!loading && error && (
        <ErrorState
          title={`Data ${copy.noun} tidak dapat dimuat`}
          text={`Terjadi gangguan saat mengambil data ${copy.noun}. Silakan coba lagi.`}
          retry={retry}
        />
      )}

      {!loading && !error && (
        totalCount === 0 ? (
          <EmptyState icon={copy.icon} title={copy.emptyTitle} text={copy.emptyText} />
        ) : (
          <>
            <ContentToolbar
              showSort={false}
              showDateRange={false}
              searchPlaceholder={`Cari ${copy.noun} berdasarkan judul atau ringkasan`}
              query={query}
              onQueryChange={setQuery}
              resultCount={resultCount}
              totalCount={totalCount}
            />
            {resultCount === 0 ? (
              <EmptyState icon={copy.icon} title={`Tidak ada ${copy.noun} yang cocok`} text="Coba kata kunci lain." />
            ) : (
              pagedGroups.map((group) => (
                <div key={group.label ?? 'flat'} className={GRID}>
                  {group.items.map((item) => <Card key={item.id} item={item} />)}
                </div>
              ))
            )}
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )
      )}
    </div>
  );
}
