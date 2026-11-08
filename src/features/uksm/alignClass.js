// Allowlist, so an unexpected value from the API never becomes a class.
const ALIGN_CLASS = { center: 'text-center', right: 'text-right', justify: 'text-justify' };

/** Tailwind class for a CMS paragraph alignment; left (the default) and anything unknown give ''. */
export const alignClass = (value) => ALIGN_CLASS[value] ?? '';
