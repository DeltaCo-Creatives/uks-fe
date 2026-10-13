// Class strings for the footer columns, which sit on the dark --text-primary background.

// Skeleton bars are sized in em, so inside text of the same size a bar plus its margin is exactly one line (1.6 for body copy, 1.5 for a heading).
export const BAR = 'block h-[0.9em] my-[0.35em] rounded-sm bg-[rgba(255,255,255,0.18)]';
export const BAR_HEADING = 'block h-[0.9em] my-[0.3em] w-32 rounded-sm bg-[rgba(255,255,255,0.18)]';
// A navigation row is 24px tall (its li uses the 16px page text), so the bar centres in a fixed row.
export const NAV_ROW = 'flex h-6 items-center';
export const NAV_BAR = 'block h-3.5 rounded-sm bg-[rgba(255,255,255,0.18)]';
// Inline bars in the bottom line, which is 13px text.
export const BOTTOM_BAR = 'inline-block h-3.5 max-w-full align-middle rounded-sm bg-[rgba(255,255,255,0.18)]';

export const SOCIAL_ROW = 'flex flex-wrap gap-2';
// "!" beats the unlayered .footer-links a rules: its 13px bold muted text and the 4px padding it adds on hover.
export const SOCIAL_LINK =
  'inline-flex size-11 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] text-[16px]! text-[rgba(255,255,255,0.85)]! ' +
  'hover:bg-[rgba(255,255,255,0.18)] hover:text-brand-accent! hover:pl-0! focus-visible:bg-[rgba(255,255,255,0.18)] focus-visible:text-brand-accent!';

// Small arrow after an external link's label.
export const EXTERNAL_ICON = 'ml-1.5 text-[10px]';
