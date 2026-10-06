import { useProdukHukumList } from '@/hooks/usePublicLists';
import { useContentToolbar } from '@/hooks/useContentToolbar';
import ContentToolbar from '@/components/shared/ContentToolbar';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { RegulasiList } from './PublikasiItems';
import { REGULASI_SEARCH_FIELDS } from '../searchFields';

export default function RegulasiPanel({ title }) {
  const { data: regulations, loading, error, retry } = useProdukHukumList();

  const {
    query, setQuery,
    groups, resultCount, totalCount
  } = useContentToolbar({
    items: regulations || [],
    dateField: null,
    searchFields: REGULASI_SEARCH_FIELDS
  });

  return (
    <div className="about-bento-frame">
      <div className="mb-6">
        <span className="section-kicker">Produk Hukum Resmi</span>
        <h2 className="mt-1.5 mb-2.5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-ink">
          {title}
        </h2>
      </div>

      {loading && <LoadingState label="Memuat regulasi..." />}
      {!loading && error && <ErrorState title="Regulasi tidak dapat dimuat" retry={retry} />}

      {!loading && !error && (
        (regulations || []).length === 0 ? (
          <EmptyState
            icon="fa-solid fa-scale-balanced"
            title="Belum ada regulasi yang tersedia"
            text="Produk hukum akan tampil di sini begitu tersedia."
          />
        ) : (
          <>
            <ContentToolbar
              showSort={false}
              showDateRange={false}
              searchPlaceholder="Cari regulasi berdasarkan judul atau nomor"
              query={query}
              onQueryChange={setQuery}
              resultCount={resultCount}
              totalCount={totalCount}
            />

            {resultCount === 0 ? (
              <EmptyState
                icon="fa-solid fa-scale-balanced"
                title="Tidak ada regulasi yang cocok"
                text="Coba kata kunci lain."
              />
            ) : (
              <RegulasiList regulations={groups[0].items} />
            )}
          </>
        )
      )}
    </div>
  );
}
