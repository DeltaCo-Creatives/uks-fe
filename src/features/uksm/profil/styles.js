// Class strings shared by the Profil sections. --brand-deep is the green that passes AA for small text.

export const SECTION = 'section scroll-mt-24';

// Zero-padded numerals ("01") shared with Trias. Size is set where it is used.
export const NUM = 'font-display font-extrabold text-brand-deep tabular-nums';
export const COMPONENT_NUM = `${NUM} text-[32px] leading-none max-[600px]:text-[26px]`;

export const BLOCK_TITLE = 'mb-3.5 text-[17px] font-extrabold';
export const MINI_LABEL = 'mb-2 block text-[13px] font-bold text-brand-deep';
export const BODY = 'max-w-[72ch] text-[15px] leading-[1.7] text-ink-muted';

// Internal navigation text links: underlined, no arrow, full tap height.
export const FOCUS_DARK = 'focus-visible:rounded-soft focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-ink';
export const TEXT_LINK = `inline-flex min-h-[44px] cursor-pointer items-center p-0 text-left text-[14px] font-bold text-ink underline decoration-brand decoration-2 underline-offset-[5px] hover:text-brand-deep ${FOCUS_DARK}`;

// Org chart panels (Pembina / Pelaksana): text column beside the chart slot.
export const SPLIT = 'grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start gap-8 max-[960px]:grid-cols-[minmax(0,1fr)]';
export const ORG_LEAD = 'mb-5 max-w-[72ch] text-[16px] leading-[1.65] text-ink';
// The base reset clears list-style on every list, so numbered lists ask for their numbers back.
export const ORDERED_LIST = 'm-0 mb-3 grid list-decimal gap-2 pl-5';
export const ORDERED_ITEM = 'pl-1 text-[15px] leading-[1.6] text-ink marker:font-extrabold marker:text-brand-deep';
