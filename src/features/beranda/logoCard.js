/*
 * The partner logo files are not clean logos: each is a white card (with the logo on it) inside a pale frame that carries
 * a baked-in shadow, and where the card sits inside the frame differs from file to file. This finds the card so the
 * Beranda logo strip can show only that, instead of the frame around it.
 *
 * It reads the picture's pixels, which needs the image host to allow this site's origin (CORS). If it does not (for
 * example on localhost), nothing is cropped and the logo shows as the file is. Logos that are already clean (transparent
 * or a plain white background) come out as the whole picture, so they are shown whole too.
 */

// A row/column belongs to the card once this share of its pixels are card pixels (ignores speckle and shadow edges).
const MIN_FILL = 0.25;
// Below this share of the picture the detection is not trusted, and the picture is shown whole.
const MIN_CARD_SHARE = 0.4;
const LOAD_TIMEOUT_MS = 3000;

// url -> crop, or null when it could not be worked out (kept so a logo is analysed once per page load).
const cache = new Map();

// The card is pure white or has logo ink on it. The frame and its shadow are pale, low-saturation greys in between.
function isCardPixel(r, g, b) {
  const luminance = (r + g + b) / 3;
  const saturation = Math.max(r, g, b) - Math.min(r, g, b);
  return luminance >= 252.5 || luminance < 225 || saturation > 14;
}

/**
 * @param {HTMLImageElement} image - loaded with crossOrigin = 'anonymous'
 * @returns {{ x: number, y: number, w: number, h: number, naturalWidth: number, naturalHeight: number } | null}
 */
export function findCard(image) {
  const { naturalWidth: width, naturalHeight: height } = image;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, 0);
  const { data } = context.getImageData(0, 0, width, height); // throws when the host did not allow CORS

  const rows = new Uint32Array(height);
  const columns = new Uint32Array(width);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const k = (y * width + x) * 4;
      if (isCardPixel(data[k], data[k + 1], data[k + 2])) {
        rows[y]++;
        columns[x]++;
      }
    }
  }

  const filled = (counts, index, size) => counts[index] / size >= MIN_FILL;
  let top = 0;
  while (top < height && !filled(rows, top, width)) top++;
  let bottom = height - 1;
  while (bottom > top && !filled(rows, bottom, width)) bottom--;
  let left = 0;
  while (left < width && !filled(columns, left, height)) left++;
  let right = width - 1;
  while (right > left && !filled(columns, right, height)) right--;

  const w = right - left + 1;
  const h = bottom - top + 1;
  if (w <= 0 || h <= 0 || (w * h) / (width * height) < MIN_CARD_SHARE) return null;

  return { x: left, y: top, w, h, naturalWidth: width, naturalHeight: height };
}

function analyse(url) {
  return new Promise((resolve) => {
    if (cache.has(url)) {
      resolve();
      return;
    }

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      try {
        cache.set(url, findCard(image));
      } catch {
        cache.set(url, null);
      }
      resolve();
    };
    image.onerror = () => {
      cache.set(url, null);
      resolve();
    };
    image.src = url;
  });
}

/**
 * Works out the card of every logo. Never rejects, and gives up waiting after a few seconds, so the strip is never
 * held back by a slow or blocked image: a logo with no result is simply shown whole.
 *
 * @param {string[]} urls
 * @returns {Promise<Record<string, ReturnType<typeof findCard>>>} only the logos where a card was found
 */
export async function loadCardCrops(urls) {
  const unique = [...new Set(urls)];
  await Promise.race([
    Promise.all(unique.map(analyse)),
    new Promise((resolve) => setTimeout(resolve, LOAD_TIMEOUT_MS))
  ]);

  const crops = {};
  for (const url of unique) {
    const crop = cache.get(url);
    if (crop) crops[url] = crop;
  }
  return crops;
}
