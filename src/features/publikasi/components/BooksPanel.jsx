import { useMemo, useState } from 'react';
import { useBukuPanduanList } from '@/hooks/usePublicLists';
import { useContentToolbar } from '@/hooks/useContentToolbar';
import { usePagedGroups } from '@/hooks/usePagedGroups';
import DocViewerModal from '@/components/shared/DocViewerModal';
import ContentToolbar from '@/components/shared/ContentToolbar';
import Pagination from '@/components/shared/Pagination';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { BookGrid } from './PublikasiItems';
import { BUKU_SEARCH_FIELDS } from '../searchFields';

// The shared subnav pill, a size smaller; "!" beats its unlayered padding.
const TAG_PILL = 'subnav-pill px-4! py-2! text-[13px]!';

export default function BooksPanel() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookCategory, setBookCategory] = useState('all');
  const { data: bukuList, loading, error, retry } = useBukuPanduanList();

  // Pills mirror whatever tags the CMS actually put on the fetched books,
  // sorted alphabetically so the order stays stable as new books are added.
  const tagOptions = useMemo(() => {
    if (!bukuList) return [];
    const seen = new Map();
    bukuList.forEach((book) => {
      (book.tags || []).forEach((tag) => {
        if (tag?.slug && !seen.has(tag.slug)) seen.set(tag.slug, tag.name);
      });
    });
    return Array.from(seen, ([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name, 'id'));
  }, [bukuList]);

  const filteredBooks = useMemo(() => {
    if (!bukuList) return [];
    if (bookCategory === 'all') return bukuList;
    return bukuList.filter((b) => (b.tags || []).some((tag) => tag.slug === bookCategory));
  }, [bukuList, bookCategory]);

  const {
    query, setQuery,
    groups, resultCount, totalCount
  } = useContentToolbar({
    items: filteredBooks,
    dateField: null,
    searchFields: BUKU_SEARCH_FIELDS
  });

  const { pagedGroups, page, totalPages, setPage } = usePagedGroups(groups, `${query}|${bookCategory}`);

  const searching = query.trim() !== '';

  return (
    <div className="about-bento-frame">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <div>
          <span className="section-kicker">Perpustakaan Digital</span>
          <h2 className="mt-1.5 mb-0 text-[clamp(22px,2.6vw,28px)] font-extrabold text-ink">
            Buku &amp; Pedoman Teknis Satuan Pendidikan
          </h2>
        </div>
        {!loading && !error && (
          <div className="flex flex-wrap gap-2 rounded-[999px] bg-app p-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]">
            <button className={`${TAG_PILL} ${bookCategory === 'all' ? 'active' : ''}`} onClick={() => setBookCategory('all')}>Semua Koleksi</button>
            {tagOptions.map((tag) => (
              <button
                key={tag.slug}
                className={`${TAG_PILL} ${bookCategory === tag.slug ? 'active' : ''}`}
                onClick={() => setBookCategory(tag.slug)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && <LoadingState label="Memuat buku & pedoman..." />}
      {!loading && error && <ErrorState title="Buku & pedoman tidak dapat dimuat" retry={retry} />}

      {!loading && !error && (
        (bukuList || []).length === 0 ? (
          <EmptyState
            icon="fa-solid fa-book-bookmark"
            title="Belum ada buku yang tersedia"
            text="Buku dan pedoman akan tampil di sini begitu tersedia."
          />
        ) : (
          <>
            <ContentToolbar
              showSort={false}
              showDateRange={false}
              searchPlaceholder="Cari buku berdasarkan judul, kategori, atau tag"
              query={query}
              onQueryChange={setQuery}
              resultCount={resultCount}
              totalCount={totalCount}
            />

            {resultCount === 0 ? (
              <EmptyState
                icon="fa-solid fa-book-bookmark"
                title={searching ? 'Tidak ada buku yang cocok' : 'Tidak ada buku pada kategori ini'}
                text={
                  searching
                    ? (bookCategory === 'all' ? 'Coba kata kunci lain.' : 'Coba kata kunci lain atau pilih kategori lain.')
                    : 'Coba pilih kategori lain.'
                }
              />
            ) : (
              <BookGrid books={pagedGroups[0].items} onRead={setSelectedBook} />
            )}
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )
      )}

      {selectedBook && (
        <DocViewerModal
          doc={{
            title: selectedBook.title,
            url: selectedBook.pdf,
            kind: 'pdf',
            meta: [selectedBook.pages, selectedBook.size].filter(Boolean).join(' · '),
            download: selectedBook.pdf
          }}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
