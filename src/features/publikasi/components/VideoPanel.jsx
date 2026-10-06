import { useVideoList } from '@/hooks/usePublicLists';
import { useContentToolbar } from '@/hooks/useContentToolbar';
import { usePagedGroups } from '@/hooks/usePagedGroups';
import ContentToolbar from '@/components/shared/ContentToolbar';
import Pagination from '@/components/shared/Pagination';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { VideoGrid } from './PublikasiItems';
import { VIDEO_SEARCH_FIELDS } from '../searchFields';

export default function VideoPanel({ title }) {
  const { data: videos, loading, error, retry } = useVideoList();

  const {
    query, setQuery,
    groups, resultCount, totalCount
  } = useContentToolbar({
    items: videos || [],
    dateField: null,
    searchFields: VIDEO_SEARCH_FIELDS
  });

  const { pagedGroups, page, totalPages, setPage } = usePagedGroups(groups, query);

  return (
    <div className="about-bento-frame">
      <div className="mb-6">
        <span className="section-kicker">Media Audio Visual</span>
        <h2 className="mt-1.5 mb-2.5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-ink">
          {title}
        </h2>
      </div>

      {loading && <LoadingState label="Memuat video..." />}
      {!loading && error && <ErrorState title="Video tidak dapat dimuat" retry={retry} />}

      {!loading && !error && (
        (videos || []).length === 0 ? (
          <EmptyState
            icon="fa-solid fa-film"
            title="Belum ada video yang tersedia"
            text="Video edukasi akan tampil di sini begitu tersedia."
          />
        ) : (
          <>
            <ContentToolbar
              showSort={false}
              showDateRange={false}
              searchPlaceholder="Cari video berdasarkan judul atau kanal"
              query={query}
              onQueryChange={setQuery}
              resultCount={resultCount}
              totalCount={totalCount}
            />

            {resultCount === 0 ? (
              <EmptyState
                icon="fa-solid fa-film"
                title="Tidak ada video yang cocok"
                text="Coba kata kunci lain."
              />
            ) : (
              <VideoGrid videos={pagedGroups[0].items} />
            )}
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )
      )}
    </div>
  );
}
