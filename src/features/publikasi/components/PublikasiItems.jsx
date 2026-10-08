import { useState } from 'react';
import { countProdukHukumView, countPublikasiDownload, countPublikasiView } from '@/utils/counters';
import SafeImage from '@/components/SafeImage';
import ImageLightbox from '@/components/shared/ImageLightbox';
import DocViewerModal from '@/components/shared/DocViewerModal';
import { downloadFile } from '@/utils/downloadFile';
import { isDirectPdf } from '@/utils/linkKind';
// The same card grid as the Warta lists (3 across on a desktop, 2 on a tablet, 1 on a phone), so the pages match.
import { GRID } from '@/features/informasi/styles';

/*
 * Book cards build on the shared book-swipe-card / book-cover-large / book-swipe-actions classes, which
 * Beranda's Books marquee also uses. "!" beats those unlayered rules where the grid card differs.
 */
export function BookGrid({ books, onRead }) {
  return (
    <div className={GRID}>
      {books.map((buku) => {
        const metaParts = [buku.pages, buku.size].filter(Boolean);
        return (
          <div key={buku.id} className="book-swipe-card flex flex-col rounded-card bg-white p-5! shadow-raised [transition:var(--spring)]">
            <div className="book-cover-large"><SafeImage src={buku.cover} alt={buku.title} icon="fa-regular fa-file-pdf" /></div>
            {buku.category && (
              <span className="section-kicker m-0! mb-2! px-2.5! py-1! text-[10px]!">{buku.category}</span>
            )}
            {/* Same clamp as the Warta cards: 3 title lines (height reserved, so cards line up) and a 4-line excerpt.
                "!" beats the shared book-swipe-card h3 rules, which fade the third line out and cap the height. */}
            <h3
              className="mb-2! line-clamp-3 max-h-none! min-h-[4.05em] text-[16px] leading-[1.35]! font-extrabold break-words text-ink [-webkit-mask-image:none]! [mask-image:none]!"
              title={buku.title}
            >
              {buku.title}
            </h3>
            {buku.desc && (
              <p className="mb-3.5 line-clamp-4 text-[12px]! leading-[1.5] break-words text-ink-muted">{buku.desc}</p>
            )}
            {metaParts.length > 0 && (
              <div className="mb-4 flex items-center gap-3 text-[11px] font-bold text-brand">
                {buku.pages && <span><i className="fa-regular fa-file-pdf mr-1"></i>{buku.pages}</span>}
                {buku.pages && buku.size && <span>•</span>}
                {buku.size && <span>{buku.size}</span>}
              </div>
            )}
            {(buku.pdf || buku.externalUrl) && (
              <div className="book-swipe-actions">
                {buku.pdf ? (
                  <>
                    <button className="btn-pill primary" onClick={() => { countPublikasiView(buku.slug); onRead(buku); }}>
                      <i className="fa-solid fa-book-open mr-1.5"></i>Baca Online
                    </button>
                    <a href={buku.pdf} download className="btn-pill secondary no-underline" onClick={(e) => { countPublikasiDownload(buku.slug); downloadFile(e, buku.pdf, buku.title); }}>
                      <i className="fa-solid fa-download"></i>
                    </a>
                  </>
                ) : (
                  <a href={buku.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-pill secondary no-underline">
                    <i className="fa-solid fa-arrow-up-right-from-square mr-1.5"></i>Buka Tautan
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/*
 * Posters are portrait and of differing ratios. object-fit: contain on a shared portrait frame shows
 * each one whole, so a poster can be read in the grid instead of being cropped into an unreadable tile.
 */
export function InfografisGrid({ items, onZoom }) {
  return (
    <div className={GRID}>
      {items.map((item) => (
        <figure key={item.id} className="m-0 flex flex-col overflow-hidden rounded-card bg-card shadow-raised">
          <button
            type="button"
            className="group relative block w-full cursor-zoom-in border-none bg-app p-0 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-ink [&_img]:block [&_img]:aspect-[3/4] [&_img]:w-full [&_img]:object-contain"
            onClick={() => { if (!item.image) return; countPublikasiView(item.slug); onZoom({ src: item.image, title: item.title }); }}
            disabled={!item.image}
          >
            <SafeImage src={item.image} alt={item.title} loading="lazy" style={{ aspectRatio: '3 / 4' }} />
            {item.image && (
              <span
                className="absolute right-2.5 bottom-2.5 grid size-[34px] place-items-center rounded-[50%] bg-[rgba(17,28,22,0.78)] text-[13px] text-white group-hover:bg-ink"
                aria-hidden="true"
              >
                <i className="fa-solid fa-expand"></i>
              </span>
            )}
          </button>
          <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="line-clamp-3 min-w-0 text-[14px] leading-[1.35] font-extrabold break-words text-ink" title={item.title}>{item.title}</span>
            {item.image && (
              <a
                className="inline-flex min-h-[44px] flex-none items-center gap-1.5 px-2.5 text-[13px] font-bold text-ink underline decoration-brand underline-offset-4 hover:text-brand-deep focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink"
                href={item.image}
                download
                onClick={(e) => { countPublikasiDownload(item.slug); downloadFile(e, item.image, item.title); }}
              >
                <i className="fa-solid fa-download" aria-hidden="true"></i>
                <span>Unduh</span>
              </a>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/*
 * Album cards share the infografis card frame; the cover is cropped to a landscape tile since the photos
 * inside differ in ratio, and the full photos open in AlbumLightbox.
 */
export function GaleriGrid({ items, onOpen }) {
  return (
    <div className={GRID}>
      {items.map((item) => {
        const count = item.foto?.length ?? 0;
        return (
          <figure key={item.id} className="m-0 flex flex-col overflow-hidden rounded-card bg-card shadow-raised">
            <button
              type="button"
              className="group relative block w-full cursor-zoom-in border-none bg-app p-0 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-ink [&_img]:block [&_img]:aspect-[4/3] [&_img]:w-full [&_img]:object-cover"
              onClick={() => { countPublikasiView(item.slug); onOpen(item); }}
              disabled={count === 0}
              aria-label={`Buka album ${item.title}`}
            >
              <SafeImage src={item.cover} alt="" loading="lazy" />
              <span
                className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-full bg-[rgba(17,28,22,0.78)] px-3 py-1.5 text-[12px] font-bold text-white group-hover:bg-ink"
                aria-hidden="true"
              >
                <i className="fa-regular fa-images"></i>{count}
              </span>
            </button>
            <figcaption className="px-4 py-3">
              <span className="line-clamp-3 text-[14px] leading-[1.35] font-extrabold break-words text-ink" title={item.title}>{item.title}</span>
              {item.desc && <span className="mt-1 line-clamp-4 text-[12px] leading-[1.5] break-words text-ink-muted">{item.desc}</span>}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

/** The photos of one album in the shared lightbox, with prev/next and each photo's keterangan as caption. */
export function AlbumLightbox({ album, onClose }) {
  const [index, setIndex] = useState(0);
  const fotos = album.foto ?? [];
  const foto = fotos[index];
  if (!foto) return null;

  const step = (delta) => setIndex((i) => (i + delta + fotos.length) % fotos.length);
  const position = `${index + 1} / ${fotos.length}`;
  return (
    <ImageLightbox
      image={{ src: foto.url, title: album.title, alt: foto.keterangan ?? album.title, caption: foto.keterangan ? `${foto.keterangan} (${position})` : position }}
      onClose={onClose}
      onPrev={fotos.length > 1 ? () => step(-1) : undefined}
      onNext={fotos.length > 1 ? () => step(1) : undefined}
    />
  );
}

export function VideoGrid({ videos }) {
  return (
    <div className={GRID}>
      {videos.map(vid => (
        <a
          key={vid.id}
          className="group overflow-hidden rounded-card bg-card shadow-raised [transition:var(--spring)] hover:shadow-lift hover:[transform:translateY(-6px)]"
          href={vid.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => countPublikasiView(vid.slug)}
        >
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <img
              className="h-full w-full object-cover opacity-85 [transition:var(--ease)] group-hover:opacity-95 group-hover:[transform:scale(1.06)]"
              src={vid.thumb}
              alt={vid.title}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] [transition:var(--ease)]">
              <div className="flex size-14 items-center justify-center rounded-[50%] bg-brand-accent text-[20px] text-ink shadow-[0_10px_24px_rgba(0,0,0,0.3)] [transition:var(--spring)] group-hover:bg-white group-hover:text-brand group-hover:[transform:scale(1.15)]">
                <i className="fa-solid fa-play"></i>
              </div>
            </div>
            {vid.duration && (
              <span className="absolute right-3 bottom-3 rounded-[999px] bg-[rgba(0,0,0,0.8)] px-2.5 py-1 text-[11px] font-extrabold text-white">
                {vid.duration}
              </span>
            )}
          </div>
          <div className="p-5">
            {vid.channel && <span className="text-[11px] font-bold text-brand uppercase">{vid.channel}</span>}
            <h4 className="mt-1.5 mb-0 line-clamp-3 text-[15px] leading-[1.4] font-extrabold break-words text-ink" title={vid.title}>{vid.title}</h4>
          </div>
        </a>
      ))}
    </div>
  );
}

/*
 * "Baca Online" reads `fileUrl`, the direct file link: the `file` link counts a download and redirects to
 * another origin, which would inflate the download count and fail CORS on phones. It is offered only for
 * PDFs (a record may also hold .doc/.docx, which can't be shown). Unduh keeps using `file` so it counts.
 */
export function RegulasiList({ regulations }) {
  const [reading, setReading] = useState(null);

  return (
    <div className="flex flex-col gap-3.5">
      {regulations.map((reg) => (
        // Stacks on phones, with the download button taking the full width. (Centered: the old phone rule's
        // left alignment and smaller gap never applied, since the base rule came later in the stylesheet.)
        <div
          key={reg.id}
          className="mb-3 flex items-center justify-between gap-4 rounded-soft border-[1.5px] border-line bg-white px-5 py-4 [transition:var(--spring)] hover:border-brand hover:shadow-raised hover:[transform:translateY(-2px)] max-[768px]:flex-col"
        >
          {/* min-w-0 lets the text shrink and wrap beside the buttons; titles clamp to 3 lines like the Warta cards. */}
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-[50px] shrink-0 items-center justify-center rounded-soft bg-brand-light text-[20px] text-brand">
              <i className="fa-solid fa-scale-balanced"></i>
            </div>
            <div className="min-w-0">
              {reg.badge && (
                <span className="mb-1 inline-block self-start rounded-[999px] bg-brand-light px-2.5 py-1 text-[9px] font-extrabold text-brand">{reg.badge}</span>
              )}
              <h4 className="mt-0.5 mb-1 line-clamp-3 text-[15px] font-extrabold break-words text-ink" title={reg.title}>{reg.title}</h4>
              {reg.number && <p className="line-clamp-2 text-[12px] break-words text-ink-muted" title={reg.number}>{reg.number}</p>}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2.5 max-[768px]:w-full max-[768px]:flex-col">
            {isDirectPdf(reg.fileUrl) && (
              <button
                type="button"
                className="btn-pill primary px-[18px]! py-2! whitespace-nowrap max-[768px]:w-full"
                onClick={() => { countProdukHukumView(reg.slug); setReading(reg); }}
              >
                <i className="fa-solid fa-book-open"></i><span>Baca Online</span>
              </button>
            )}
            <a
              href={reg.file}
              download
              onClick={(e) => downloadFile(e, reg.fileUrl || reg.file, reg.title, reg.fileUrl ? reg.file : undefined)}
              className="btn-massive px-[18px]! py-2! text-[13px]! whitespace-nowrap max-[768px]:w-full max-[768px]:justify-center"
            >
              <i className="fa-solid fa-download"></i><span>Unduh{reg.size ? ` (${reg.size})` : ''}</span>
            </a>
          </div>
        </div>
      ))}

      {reading && (
        <DocViewerModal
          doc={{
            title: reading.title,
            url: reading.fileUrl,
            kind: 'pdf',
            meta: reading.size,
            download: reading.file,
            downloadSource: reading.fileUrl
          }}
          onClose={() => setReading(null)}
        />
      )}
    </div>
  );
}
