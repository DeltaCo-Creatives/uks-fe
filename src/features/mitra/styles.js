// Class strings shared by the Kemitraan sections. --brand-deep is the green that passes AA for small text.

export const SECTION = 'section scroll-mt-24';

export const BLOCK_TITLE = 'm-0 text-[17px] leading-[1.35] font-extrabold';
export const MINI_LABEL = 'mb-2.5 block text-[13px] font-bold text-brand-deep';

// Zero-padded "01" numerals shared with Trias and Profil.
export const NUM = 'font-display text-[13px] font-extrabold text-brand-deep tabular-nums';

export const CARD = 'rounded-panel bg-card p-7 max-[600px]:p-5';
export const TINTED = 'rounded-panel bg-card-alt p-7 max-[600px]:p-5';
export const ICON = 'grid size-10 flex-none place-items-center rounded-card bg-brand-light text-[16px] text-brand';
export const CARD_HEAD = 'mb-3.5 flex items-center gap-3';
export const EMPTY = 'rounded-card bg-card-alt p-5 text-[14px] text-ink-muted';

// Static item lists: a small square dot before each line.
export const DOT_LIST = 'm-0 grid list-none gap-2.5 p-0';
export const DOT_LIST_SM = 'm-0 grid list-none gap-1.5 p-0';
export const DOT_ITEM = "relative pl-4 text-[14px] leading-[1.6] text-ink before:absolute before:top-[0.6em] before:left-0 before:size-1.5 before:rounded-[2px] before:bg-brand before:content-['']";

// The base reset clears list-style on every list, so the numbered ones ask for their numbers back.
export const COMPACT_NUM = 'm-0 grid list-decimal gap-1.5 pl-5 text-[14px] leading-[1.55] text-ink marker:font-extrabold marker:text-brand-deep';

// Tabs, panels and record rows sit inside cards, so their focus ring is drawn inside the edge.
export const FOCUS_INSET = 'focus-visible:rounded-soft focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-ink';
