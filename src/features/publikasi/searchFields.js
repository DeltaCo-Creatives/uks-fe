// Shared by the per-tab search and the search-everything box so both match the same text.
export const BUKU_SEARCH_FIELDS = [
  'title',
  'desc',
  'category',
  'year',
  (book) => (book.tags || []).map((tag) => tag?.name).join(' ')
];

export const INFOGRAFIS_SEARCH_FIELDS = ['title', 'desc'];

export const GALERI_SEARCH_FIELDS = ['title', 'desc'];

export const VIDEO_SEARCH_FIELDS = ['title', 'channel'];

export const REGULASI_SEARCH_FIELDS = ['title', 'number', 'badge', 'year'];
