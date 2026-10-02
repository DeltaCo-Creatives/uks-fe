// Class strings shared by the Program Prioritas components. --brand-deep is the green that passes AA for small text.

// Zero-padded "01" numerals shared with Trias and Profil. Size is set where it is used.
export const NUM = 'font-display font-extrabold text-brand-deep tabular-nums';

export const LEAD = 'max-w-[68ch] text-[16px] leading-[1.7] text-ink';
export const NOTE = 'mt-3.5 max-w-[80ch] text-[14px] leading-[1.65] text-ink-muted';

// Honest empty state: no fake "coming soon", just the fact and why.
export const EMPTY = 'flex items-center gap-3 rounded-card bg-card-alt px-5 py-[18px] text-[14px] leading-[1.6] text-ink-muted';
export const EMPTY_ICON = 'flex-none text-[18px] text-brand';

// Every link and button on the page shares one focus ring. "!" keeps it over the shared components'
// own unlayered focus rules (lobby tabs, retry buttons), as the old page-scoped rule did.
export const PAGE_FOCUS =
  '[&_a:focus-visible]:rounded-soft! [&_a:focus-visible]:outline-3! [&_a:focus-visible]:outline-offset-[3px]! [&_a:focus-visible]:outline-ink! ' +
  '[&_button:focus-visible]:rounded-soft! [&_button:focus-visible]:outline-3! [&_button:focus-visible]:outline-offset-[3px]! [&_button:focus-visible]:outline-ink!';

/*
 * Link styles for ProgramLink. A null url renders a <span class="is-missing"> instead of an <a>,
 * so each style carries its own `[&.is-missing]:` adjustments and limits hover effects to real
 * links with `[&[href]]:`.
 */
const MISSING = '[&.is-missing]:flex-wrap [&.is-missing]:gap-x-2.5 [&.is-missing]:gap-y-1 [&.is-missing]:cursor-default';

// Text links inside content: underlined, full tap height.
const TEXT_LINK = 'inline-flex min-h-[44px] cursor-pointer items-center p-0 text-left text-[14px] font-bold text-ink underline decoration-brand decoration-2 underline-offset-[5px] hover:text-brand-deep';
export const INLINE_LINK = `${TEXT_LINK} [&.is-missing]:flex-wrap [&.is-missing]:gap-x-2.5 [&.is-missing]:gap-y-1 [&.is-missing]:[text-decoration:none]`;
export const TEXT_BUTTON = TEXT_LINK;

// The one link in the dark hero.
export const HERO_SOURCE_LINK = `relative z-[1] mt-2.5 inline-flex min-h-[44px] items-center text-[13px] font-bold text-brand-accent underline underline-offset-4 [&_.prog-ext-icon]:text-brand-accent ${MISSING}`;

export const CREDIT_LINK = `inline-flex min-h-[44px] flex-wrap items-center font-semibold text-ink-muted underline underline-offset-[3px] ${MISSING}`;
export const SOURCE_LINK = `inline-flex min-h-[44px] items-center text-[13px] font-semibold text-ink underline underline-offset-[3px] ${MISSING}`;

// Level variants are real download links, so they are the buttons here.
export const VARIANT_LINK = `inline-flex min-h-[44px] items-center rounded-soft border-2 border-ink bg-card px-4 text-[14px] font-extrabold text-ink [&[href]]:hover:bg-ink [&[href]]:hover:text-white hover:[&_.prog-ext-icon]:text-brand-accent ${MISSING}`;

// A missing resource stacks its title over the "not available" note.
export const RESOURCE_LINK = 'flex min-h-14 items-center justify-between gap-3 py-2.5 text-ink [&[href]]:hover:[&_strong]:text-brand-deep [&[href]]:hover:[&_strong]:underline [&.is-missing]:cursor-default [&.is-missing]:flex-col [&.is-missing]:flex-wrap [&.is-missing]:items-start [&.is-missing]:justify-center [&.is-missing]:gap-1';

export const COMPETITION_LINK = `inline-flex min-h-[44px] flex-wrap items-center text-[15px] font-bold text-ink [&[href]]:hover:text-brand-deep [&[href]]:hover:underline ${MISSING}`;
