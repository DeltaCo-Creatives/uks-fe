/** True for a link-only berita whose sourceUrl is a safe absolute http(s) URL (a missing flag counts as false). */
export const isExternalBerita = (item) =>
  Boolean(item?.linkOnly) && /^https?:\/\//i.test(item.sourceUrl ?? '');
