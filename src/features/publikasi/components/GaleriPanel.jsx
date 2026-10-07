import { useState } from 'react';
import { publikasiHookFor } from '@/hooks/usePublicLists';
import { useContentToolbar } from '@/hooks/useContentToolbar';
import { usePagedGroups } from '@/hooks/usePagedGroups';
import ContentToolbar from '@/components/shared/ContentToolbar';
import Pagination from '@/components/shared/Pagination';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { GaleriGrid, AlbumLightbox } from './PublikasiItems';
import { GALERI_SEARCH_FIELDS } from '../searchFields';

/** Albums as cards, each opening its photos in the lightbox. Has no static tab, so `submenuId` is always set. */
export default function GaleriPanel({ title, submenuId }) {
  const [album, setAlbum] = useState(null);
  const useList = publikasiHookFor(submenuId);
  const { data: albums, loading, error, retry } = useList();

  const {
    query, setQuery,
    groups, resultCount, totalCount
  } = useContentToolbar({
    items: albums || [],
    dateField: null,
    searchFields: GALERI_SEARCH_FIELDS
  });

  const { pagedGroups, page, totalPages, setPage } = usePagedGroups(groups, query);

  return (
    <div className="about-bento-frame">
      <div className="mb-6">
        <span className="section-kicker">Dokumentasi Kegiatan</span>
        <h2 className="mt-1.5 mb-2.5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-ink">
          {title}
        </h2>
        <p className="max-w-[850px] text-[15px] leading-[1.7] text-ink-muted">
          Kumpulan foto kegiatan UKS/M. Klik album untuk melihat fotonya.
        </p>
      </div>

      {loading && <LoadingState label="Memuat galeri..." />}
      {!loading && error && <ErrorState title="Galeri tidak dapat dimuat" retry={retry} />}

      {!loading && !error && (
        (albums || []).length === 0 ? (
          <EmptyState
            icon="fa-regular fa-images"
            title="Belum ada album yang tersedia"
            text="Album foto akan tampil di sini begitu tersedia."
          />
        ) : (
          <>
            <ContentToolbar
              showSort={false}
              showDateRange={false}
              searchPlaceholder="Cari album berdasarkan judul atau deskripsi"
              query={query}
              onQueryChange={setQuery}
              resultCount={resultCount}
              totalCount={totalCount}
            />

            {resultCount === 0 ? (
              <EmptyState
                icon="fa-regular fa-images"
                title="Tidak ada album yang cocok"
                text="Coba kata kunci lain."
              />
            ) : (
              <GaleriGrid items={pagedGroups[0].items} onOpen={setAlbum} />
            )}
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )
      )}

      {album && <AlbumLightbox album={album} onClose={() => setAlbum(null)} />}
    </div>
  );
}
