import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavConfig } from '@/hooks/useNavConfig';
import { publikasiHookFor, produkHukumHookFor } from '@/hooks/usePublicLists';
import { matchesQuery } from '@/hooks/useContentToolbar';
import DocViewerModal from '@/components/shared/DocViewerModal';
import ImageLightbox from '@/components/shared/ImageLightbox';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { BookGrid, InfografisGrid, GaleriGrid, AlbumLightbox, VideoGrid, RegulasiList } from './PublikasiItems';
import {
  BUKU_SEARCH_FIELDS,
  INFOGRAFIS_SEARCH_FIELDS,
  GALERI_SEARCH_FIELDS,
  VIDEO_SEARCH_FIELDS,
  REGULASI_SEARCH_FIELDS
} from '../searchFields';

// "!" beats the unlayered shared toolbar rules this list adjusts.
const RESULTS =
  'about-bento-frame flex flex-col gap-7 [&>.content-toolbar-summary]:mt-0! [&_.content-toolbar-reset]:min-h-[44px]! ' +
  '[&_.content-toolbar-summary_span]:min-w-0 [&_.content-toolbar-summary_span]:[overflow-wrap:anywhere] [&_.info-empty-text]:min-w-0 [&_.info-empty-text]:[overflow-wrap:anywhere]';

function useMatches(list, fields, query) {
  return useMemo(
    () => (list || []).filter((item) => matchesQuery(item, fields, query)),
    [list, fields, query]
  );
}

// Per template: which list a tab searches, the fields it matches on, and how its hits render.
const SOURCES = {
  buku: {
    useSource: (id) => publikasiHookFor(id),
    fields: BUKU_SEARCH_FIELDS,
    render: (items, { onRead }) => <BookGrid books={items} onRead={onRead} />
  },
  infografis: {
    useSource: (id) => publikasiHookFor(id),
    fields: INFOGRAFIS_SEARCH_FIELDS,
    render: (items, { onZoom }) => <InfografisGrid items={items} onZoom={onZoom} />
  },
  galeri: {
    useSource: (id) => publikasiHookFor(id),
    fields: GALERI_SEARCH_FIELDS,
    render: (items, { onAlbum }) => <GaleriGrid items={items} onOpen={onAlbum} />
  },
  video: {
    useSource: (id) => publikasiHookFor(id),
    fields: VIDEO_SEARCH_FIELDS,
    render: (items) => <VideoGrid videos={items} />
  },
  dokumen: {
    useSource: (id) => produkHukumHookFor(id),
    fields: REGULASI_SEARCH_FIELDS,
    render: (items) => <RegulasiList regulations={items} />
  }
};

const PENDING = { loading: true, error: false, count: 0 };

/**
 * One Publikasi tab's matches. A component per tab, so each calls its own cached list hook (no hooks
 * in a loop); it reports loading/error/count up so the parent can sum the total.
 */
function SectionResults({ section, query, actions, report }) {
  const { useSource, fields, render } = SOURCES[section.template];
  const useList = useSource(section.submenuId);
  const { data, loading, error, retry } = useList();
  const matches = useMatches(data, fields, query);
  const failed = !loading && Boolean(error);
  const count = matches.length;

  useEffect(() => {
    report(section.id, { loading, error: failed, count });
  }, [report, section.id, loading, failed, count]);

  if (failed) {
    return <ErrorState title={`${section.label} tidak dapat dimuat`} retry={retry} />;
  }
  if (loading || count === 0) return null;
  return (
    <div>
      <h3 className="content-group-heading">
        <i className={section.icon} aria-hidden="true"></i>
        {section.label} ({count})
      </h3>
      {render(matches, actions)}
    </div>
  );
}

/**
 * Searches every Publikasi tab at once and shows the matches grouped by tab,
 * with the same cards and actions as the tabs. Mounted only while a search is
 * active, so the lists a visitor has not opened yet are fetched on first search.
 */
export default function PublikasiSearchResults({ query, onClear }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [zoomed, setZoomed] = useState(null);
  const [album, setAlbum] = useState(null);
  const [statuses, setStatuses] = useState({});
  // One group per Publikasi tab; a template with no search source here is left out.
  const sections = useNavConfig().publikasi.sections.filter((section) => SOURCES[section.template]);
  const actions = { onRead: setSelectedBook, onZoom: setZoomed, onAlbum: setAlbum };

  const report = useCallback((id, status) => {
    setStatuses((prev) => {
      const old = prev[id];
      const same = old && old.loading === status.loading && old.error === status.error && old.count === status.count;
      return same ? prev : { ...prev, [id]: status };
    });
  }, []);

  const trimmed = query.trim();
  const states = sections.map((section) => statuses[section.id] ?? PENDING);
  const anyLoading = states.some((status) => status.loading);
  const anyError = states.some((status) => !status.loading && status.error);
  const total = states.reduce((sum, status) => (!status.loading && !status.error ? sum + status.count : sum), 0);

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

      {sections.map((section) => (
        <SectionResults key={section.id} section={section} query={query} actions={actions} report={report} />
      ))}

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
            download: selectedBook.pdf,
            slug: selectedBook.slug
          }}
          onClose={() => setSelectedBook(null)}
        />
      )}

      {zoomed && <ImageLightbox image={zoomed} onClose={() => setZoomed(null)} />}
      {album && <AlbumLightbox album={album} onClose={() => setAlbum(null)} />}
    </div>
  );
}
