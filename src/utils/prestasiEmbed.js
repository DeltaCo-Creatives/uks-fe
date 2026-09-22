/**
 * Parses a winner's YouTube/Instagram/TikTok URL into an embeddable iframe src,
 * or null when the URL is not a specific post (an account page, a short link
 * with no video id). A null result must never be turned into an iframe src;
 * the caller falls back to a plain link card instead.
 */

const YOUTUBE_SHORTS = /youtube\.com\/shorts\/([\w-]+)/i;
const INSTAGRAM_POST = /^https?:\/\/(?:www\.)?instagram\.com\/(reel|p)\/([\w-]+)/i;
const TIKTOK_VIDEO = /^https?:\/\/(?:www\.)?tiktok\.com\/@[^/]+\/video\/(\d+)/i;

function youtubeEmbed(url) {
  const match = url?.match(YOUTUBE_SHORTS);
  return match ? { kind: 'youtube', src: `https://www.youtube-nocookie.com/embed/${match[1]}`, label: 'YouTube' } : null;
}

function instagramEmbed(url) {
  const match = url?.match(INSTAGRAM_POST);
  return match ? { kind: 'instagram', src: `https://www.instagram.com/${match[1]}/${match[2]}/embed`, label: 'Instagram' } : null;
}

function tiktokEmbed(url) {
  const match = url?.match(TIKTOK_VIDEO);
  return match ? { kind: 'tiktok', src: `https://www.tiktok.com/embed/v2/${match[1]}`, label: 'TikTok' } : null;
}

/**
 * Picks what the stage should embed for a winner. YouTube goes first because
 * it actually plays inline; Instagram/TikTok only show a cover and open the
 * real platform to play. Returns null when neither URL is a recognizable post,
 * so the stage can fall back to a plain link card instead of a dead iframe.
 *
 * @param {{ youtube?: string | null, social?: string | null }} winner
 * @returns {{ kind: 'youtube' | 'instagram' | 'tiktok', src: string, label: string } | null}
 */
export function stageEmbed(winner) {
  return youtubeEmbed(winner?.youtube) || instagramEmbed(winner?.social) || tiktokEmbed(winner?.social) || null;
}

/**
 * The platform name for a winner's social link, for the fallback link card
 * and the stage's outbound "view original" action.
 *
 * @param {string | null | undefined} url
 * @returns {string}
 */
export function socialPlatformLabel(url) {
  if (!url) return 'Sosial media';
  return url.includes('tiktok.com') ? 'TikTok' : 'Instagram';
}

// Runnable self-check, no test runner in this repo: fires once when this
// module loads in dev, throws on the first mismatch.
if (import.meta.env.DEV) {
  const cases = [
    { social: 'https://www.instagram.com/reel/C8fXXrjSIul/', youtube: 'https://youtube.com/shorts/aLmuBNsglvo', expect: 'youtube' },
    { social: 'https://www.instagram.com/reel/C8fXXrjSIul/', youtube: null, expect: 'instagram' },
    { social: 'https://www.instagram.com/p/C8ojXuAyzR7/', youtube: null, expect: 'instagram' },
    { social: 'https://www.tiktok.com/@paud.fajar.baru/video/7385390977185254662', youtube: null, expect: 'tiktok' },
    { social: 'https://www.instagram.com/smkn2buduran.official/', youtube: null, expect: null },
    { social: 'https://vt.tiktok.com/ZSYfCaSmW/', youtube: null, expect: null },
    { social: null, youtube: null, expect: null }
  ];
  for (const testCase of cases) {
    const result = stageEmbed(testCase);
    const gotKind = result?.kind ?? null;
    if (gotKind !== testCase.expect) {
      throw new Error(`stageEmbed self-check failed for ${JSON.stringify(testCase)}: expected ${testCase.expect}, got ${gotKind}`);
    }
  }
}
