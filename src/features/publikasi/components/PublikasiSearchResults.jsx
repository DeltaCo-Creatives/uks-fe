import { useMemo, useState } from 'react';
import { pageNavigationConfigs } from '@/data/portalData';
import { useBukuPanduanList, useInfografisList, useVideoList, useProdukHukumList } from '@/hooks/usePublicLists';
import { matchesQuery } from '@/hooks/useContentToolbar';
import DocViewerModal from '@/components/shared/DocViewerModal';
import ImageLightbox from '@/components/shared/ImageLightbox';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { BookGrid, InfografisGrid, VideoGrid, RegulasiList } from './PublikasiItems';
import {
  BUKU_SEARCH_FIELDS,
  INFOGRAFIS_SEARCH_FIELDS,
  VIDEO_SEARCH_FIELDS,
  REGULASI_SEARCH_FIELDS
} from '../searchFields';

const sections = pageNavigationConfigs.publikasi.sections;

// "!" beats the unlayered shared toolbar rules this list adjusts.
const RESULTS =
  'about-bento-frame flex flex-col gap-7 [&>.content-toolbar-summary]:mt-0! [&_.content-toolbar-reset]:min-h-[44px]! ' +
  '[&_.content-toolbar-summary_span]:min-w-0 [&_.content-toolbar-summary_span]:[overflow-wrap:anywhere] [&_.info-empty-text]:min-w-0 [&_.info-empty-text]:[overflow-wrap:anywhere]';

function sectionById(id) {
  return sections.find((section) => section.id === id);
}

function useMatches(list, fields, query) {
  return useMemo(
    () => (list || []).filter((item) => matchesQuery(item, fields, query)),
    [list, fields, query]
  );
}

/**
 * Searches every Publikasi type at once and shows the matches grouped by type,
 * with the same cards and actions as the tabs. Mounted only while a search is
 * active, so the lists a visitor has not opened yet are fetched on first search.
 */
export default function PublikasiSearchResults({ query, onClear }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [zoomed, setZoomed] = useState(null);
  const buku = useBukuPanduanList();
  const infografis = useInfografisList();
  const video = useVideoList();
  const regulasi = useProdukHukumList();

  const bukuMatches = useMatches(buku.data, BUKU_SEARCH_FIELDS, query);
  const infografisMatches = useMatches(infografis.data, INFOGRAFIS_SEARCH_FIELDS, query);
  const videoMatches = useMatches(video.data, VIDEO_SEARCH_FIELDS, query);
  const regulasiMatches = useMatches(regulasi.data, REGULASI_SEARCH_FIELDS, query);

  const groups = [
    { section: sectionById('sec-pub-books'), source: buku, matches: bukuMatches, render: (items) => <BookGrid books={items} onRead={setSelectedBook} /> },
    { section: sectionById('sec-pub-infografis'), source: infografis, matches: infografisMatches, render: (items) => <InfografisGrid items={items} onZoom={setZoomed} /> },
    { section: sectionById('sec-pub-video'), source: video, matches: videoMatches, render: (items) => <VideoGrid videos={items} /> },
    { section: sectionById('sec-pub-regulasi'), source: regulasi, matches: regulasiMatches, render: (items) => <RegulasiList regulations={items} /> }
  ];

  const trimmed = query.trim();
  const anyLoading = groups.some(({ source }) => source.loading);
  const anyError = groups.some(({ source }) => !source.loading && source.error);
  const total = groups.reduce(
    (sum, { source, matches }) => (!source.loading && !source.error ? sum + matches.length : sum),
    0
  );

  return (
        // Every group heading is its wrapper's first child, so the groups are spaced here.
    <div className={RESULTS}>
      <p className="content-toolbar-summary" aria-live="polite">
        {anyLoading && total === 0
          ? <span>Mencari "{trimmed}"...</span>
          : <span>Menampilkan <strong>{total}</strong> hasil untuk "{trimmed}"</span>}
        <button type="button" className="content-toolbar-reset" onClick={onClear}>
          Hapus pencarian
        </button>
      </p>

      {groups.map(({ section, source, matches, render }) => {
        if (!source.loading && source.error) {
          return (
            <ErrorState key={section.id} title={`${section.label} tidak dapat dimuat`} retry={source.retry} />
          );
        }
        if (source.loading || matches.length === 0) return null;
        return (
          <div key={section.id}>
            <h3 className="content-group-heading">
              <i className={section.icon} aria-hidden="true"></i>
              {section.label} ({matches.length})
            </h3>
            {render(matches)}
          </div>
        );
      })}

      {anyLoading && <LoadingState label="Mencari di semua publikasi..." />}

      {!anyLoading && !anyError && total === 0 && (
        <EmptyState
          icon="fa-solid fa-magnifying-glass"
          title="Tidak ada publikasi yang cocok"
          text={`Tidak ada judul yang cocok dengan "${trimmed}". Coba kata kunci lain.`}
        />
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

      {zoomed && <ImageLightbox image={zoomed} onClose={() => setZoomed(null)} />}
    </div>
  );
}
