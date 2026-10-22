const IMAGE_URL = /\.(?:jpe?g|png|webp|gif|avif)(?:[?#]|$)/i;

/** Agenda media carry no type, so an image is told by its file extension (a query or hash may follow). */
export const isImageUrl = (url) => IMAGE_URL.test(url);
