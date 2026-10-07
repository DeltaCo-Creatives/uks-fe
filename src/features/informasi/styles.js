// Class strings shared by the Informasi panels.

// Panel heading: title block beside the category filter, stacked on phones.
const PANEL_HEAD_BASE = 'mb-6 flex-wrap items-end justify-between gap-4 border-b border-[rgba(17,28,22,0.1)] pb-[18px] max-[768px]:mb-[18px] max-[768px]:block max-[768px]:pb-3.5';
export const PANEL_HEAD = `${PANEL_HEAD_BASE} flex`;
export const PANEL_HEAD_STACKED = `${PANEL_HEAD_BASE} block`;
export const PANEL_TITLE = 'mt-1.5 mb-0 text-[clamp(20px,2.6vw,28px)] leading-[1.25] font-extrabold text-ink';
export const PANEL_DESC = 'mt-2 mb-0 max-w-[70ch] text-[15px] leading-[1.65] text-ink-muted max-[768px]:text-[14px]';

// Category filter: one scrolling row on a phone, edge to edge like the section tabs above it,
// so the two strips scroll the same way instead of each wrapping into blocks.
export const FILTER =
  'flex-none max-[768px]:mx-[calc(50%_-_50vw)] max-[768px]:mt-3.5 max-[768px]:overflow-x-auto max-[768px]:overflow-y-hidden max-[768px]:px-[calc(50vw_-_50%)] max-[768px]:[scrollbar-width:none] max-[768px]:[-webkit-overflow-scrolling:touch] max-[768px]:[&::-webkit-scrollbar]:hidden';
export const FILTER_TRACK = 'flex flex-wrap gap-2 rounded-[999px] bg-app p-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] max-[768px]:w-max max-[768px]:flex-nowrap max-[768px]:gap-1.5';
const FILTER_BUTTON = 'inline-flex min-h-[44px] cursor-pointer items-center rounded-[999px] px-4 py-2 text-[13px] font-extrabold whitespace-nowrap [transition:var(--ease)] active:[transform:scale(0.985)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink max-[768px]:flex-none max-[768px]:px-3.5 max-[768px]:text-[12px]';
export const filterButton = (active) =>
  `${FILTER_BUTTON} ${active ? 'bg-brand-deep text-white' : 'bg-transparent text-ink-muted hover:bg-[rgba(0,0,0,0.04)] hover:text-ink'}`;

// Card grids drop to two columns on tablets before they drop to one on phones.
export const GRID =
  'grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-[18px] max-[900px]:grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] max-[900px]:gap-3.5 max-[768px]:grid-cols-[minmax(0,1fr)]';

/*
 * News and story cards build on the shared .news-card-playful, whose global style staggers the second
 * card down 12px and lifts a hovered one 8px. In a tidy grid that eats the gap, so cards stay on the
 * grid line and lift only a little ("!" beats the unlayered shared rules). Phones drop the lift.
 *
 * The shared `.news-card-playful h3` and `p` rules also set the title's size and the excerpt's margin
 * and line height; those still apply, so the classes below leave them out.
 */
export const NEWS_CARD =
  'news-card-playful flex flex-col [transform:none]! hover:[transform:translateY(-4px)]! max-[768px]:hover:[transform:none]! max-[768px]:hover:shadow-raised!';
export const NEWS_CARD_LINK = `${NEWS_CARD} w-full cursor-pointer border-none text-left focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-ink`;
// Card without an image or whole-card link (Pengumuman, Kesempatan): it holds its own links and button.
export const CARD_PLAIN = 'flex flex-col rounded-card border-[1.5px] border-rule-soft bg-card p-5 shadow-raised max-[768px]:p-4';
// Small status pill (Penting, Dibuka...); the caller adds the colours.
export const BADGE = 'inline-flex items-center gap-1.5 rounded-[999px] px-2.5 py-1 text-[11px] font-extrabold whitespace-nowrap';
export const CARD_META = 'mb-2 flex items-center justify-between gap-2.5';
export const CARD_KICKER = 'section-kicker m-0! px-2.5! py-1! text-[10px]!';
export const CARD_DATE = 'text-[11px] font-semibold whitespace-nowrap text-ink-muted';
export const CARD_TITLE = 'mt-1.5 mb-2 line-clamp-3 min-h-[4.05em] leading-[1.35] font-semibold text-ink';
// No flex-grow: a stretched clamp box shows a sliver of the next line. The footer's mt-auto aligns card bottoms instead.
export const CARD_EXCERPT = 'line-clamp-4';
export const CARD_FOOT = 'mt-auto flex items-center justify-between gap-2.5 border-t border-rule-soft pt-3';
export const CARD_FOOT_ITEM = 'inline-flex items-center gap-1.5 text-[12px] font-extrabold text-brand-deep';
