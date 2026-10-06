import { useState } from 'react';
import { useInfografisList } from '@/hooks/usePublicLists';
import { useContentToolbar } from '@/hooks/useContentToolbar';
import { usePagedGroups } from '@/hooks/usePagedGroups';
import ImageLightbox from '@/components/shared/ImageLightbox';
import ContentToolbar from '@/components/shared/ContentToolbar';
import Pagination from '@/components/shared/Pagination';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { InfografisGrid } from './PublikasiItems';
import { INFOGRAFIS_SEARCH_FIELDS } from '../searchFields';

/**
 * Each poster is shown whole in its tile, not cropped to fit one, so it can be
 * read on the page. Enlarging and downloading are for the small print, not the
 * only way to see what a poster says.
 */
export default function InfografisPanel({ title }) {
  const [zoomed, setZoomed] = useState(null);
  const { data: infografisList, loading, error, retry } = useInfografisList();

  const {
    query, setQuery,
    groups, resultCount, totalCount
  } = useContentToolbar({
    items: infografisList || [],
    dateField: null,
    searchFields: INFOGRAFIS_SEARCH_FIELDS
  });

  const { pagedGroups, page, totalPages, setPage } = usePagedGroups(groups, query);

  return (
    <div className="about-bento-frame">
      <div className="mb-6">
        <span className="section-kicker">Media Cetak Satuan Pendidikan</span>
        <h2 className="mt-1.5 mb-2.5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-ink">
          {title}
        </h2>
        <p className="max-w-[850px] text-[15px] leading-[1.7] text-ink-muted">
          Poster siap cetak untuk dinding dan mading sekolah. Klik poster untuk melihatnya lebih besar.
        </p>
      </div>

      {loading && <LoadingState label="Memuat infografis..." />}
      {!loading && error && <ErrorState title="Infografis tidak dapat dimuat" retry={retry} />}

      {!loading && !error && (
        (infografisList || []).length === 0 ? (
          <EmptyState
            icon="fa-solid fa-image"
            title="Belum ada infografis yang tersedia"
            text="Poster dan infografis akan tampil di sini begitu tersedia."
          />
        ) : (
          <>
            <ContentToolbar
              showSort={false}
              showDateRange={false}
              searchPlaceholder="Cari infografis berdasarkan judul atau deskripsi"
              query={query}
              onQueryChange={setQuery}
              resultCount={resultCount}
              totalCount={totalCount}
            />

            {resultCount === 0 ? (
              <EmptyState
                icon="fa-solid fa-image"
                title="Tidak ada infografis yang cocok"
                text="Coba kata kunci lain."
              />
            ) : (
              <InfografisGrid items={pagedGroups[0].items} onZoom={setZoomed} />
            )}
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )
      )}

      {zoomed && <ImageLightbox image={zoomed} onClose={() => setZoomed(null)} />}
    </div>
  );
}
