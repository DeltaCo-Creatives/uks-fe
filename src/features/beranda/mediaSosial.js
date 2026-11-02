// Pure helpers for the Beranda Instagram and YouTube rows; no imports, so scripts/check-media-sosial.mjs runs them in Node.

// An item's link and embed must stay on its platform's own hosts, since the embed becomes an iframe src.
const HOSTS = {
  instagram: { link: 'https://www.instagram.com/', embed: 'https://www.instagram.com/' },
  youtube: { link: 'https://www.youtube.com/', embed: 'https://www.youtube-nocookie.com/embed/' }
};

const startsWith = (value, prefix) => typeof value === 'string' && value.startsWith(prefix);

function readPlatform(section, hosts) {
  const items = Array.isArray(section?.items)
    ? section.items.filter((item) => item?.id != null && startsWith(item.url, hosts.link) && startsWith(item.embedUrl, hosts.embed))
    : [];
  return { visible: section?.visible === true && items.length > 0, items };
}

/** `{ instagram, youtube }`, each `{ visible, items }`, from the /public/media-sosial answer; anything malformed reads as hidden. */
export function readMediaSosial(data) {
  return {
    instagram: readPlatform(data?.instagram, HOSTS.instagram),
    youtube: readPlatform(data?.youtube, HOSTS.youtube)
  };
}

/** YouTube answers a thumbnail size it does not have with a 120px-wide grey image instead of an error. */
export const isYoutubePlaceholder = (image) => image.naturalWidth === 120;

export const youtubePlayerSrc = (embedUrl) => `${embedUrl}?autoplay=1&playsinline=1&rel=0`;
