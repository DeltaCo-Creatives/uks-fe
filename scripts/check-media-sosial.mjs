// Run: node scripts/check-media-sosial.mjs
import assert from 'node:assert/strict';
import { isYoutubePlaceholder, readMediaSosial, youtubePlayerSrc } from '../src/features/beranda/mediaSosial.js';

const HIDDEN = { visible: false, items: [] };
const ig = { id: 'a', kind: 'reel', url: 'https://www.instagram.com/reel/C8fXXrjSIul/', embedUrl: 'https://www.instagram.com/reel/C8fXXrjSIul/embed/' };
const yt = { id: 'b', kind: 'video', url: 'https://www.youtube.com/watch?v=Cbqg3RnW0ss', embedUrl: 'https://www.youtube-nocookie.com/embed/Cbqg3RnW0ss' };

// A missing or malformed answer hides both sections.
for (const data of [null, undefined, [], 'x', {}, { instagram: null, youtube: { visible: true } }, { instagram: { visible: true, items: 'x' } }]) {
  assert.deepEqual(readMediaSosial(data), { instagram: HIDDEN, youtube: HIDDEN }, JSON.stringify(data));
}

// Shown only when the API says visible and at least one item survives.
assert.deepEqual(readMediaSosial({ instagram: { visible: true, items: [ig] }, youtube: { visible: true, items: [yt] } }), {
  instagram: { visible: true, items: [ig] },
  youtube: { visible: true, items: [yt] }
});
assert.equal(readMediaSosial({ instagram: { visible: 'true', items: [ig] } }).instagram.visible, false);
assert.equal(readMediaSosial({ youtube: { visible: true, items: [] } }).youtube.visible, false);
assert.deepEqual(readMediaSosial({ youtube: { visible: false, items: [yt] } }).youtube, { visible: false, items: [yt] });

// Items whose link or embed leaves the platform's hosts are dropped; with none left the section hides.
const badInstagram = [
  { ...ig, embedUrl: 'javascript:alert(1)' },
  { ...ig, embedUrl: 'https://www.instagram.com.evil.test/reel/x/embed/' },
  { ...ig, url: 'http://www.instagram.com/reel/C8fXXrjSIul/' },
  { ...ig, id: undefined },
  null
];
assert.deepEqual(readMediaSosial({ instagram: { visible: true, items: [...badInstagram, ig] } }).instagram.items, [ig]);
assert.deepEqual(readMediaSosial({ instagram: { visible: true, items: badInstagram } }).instagram, HIDDEN);
const badYoutube = [
  { ...yt, embedUrl: 'https://www.youtube.com/embed/Cbqg3RnW0ss' },
  { ...yt, url: 'https://youtu.be/Cbqg3RnW0ss' }
];
assert.deepEqual(readMediaSosial({ youtube: { visible: true, items: [...badYoutube, yt] } }).youtube.items, [yt]);

assert.equal(isYoutubePlaceholder({ naturalWidth: 120 }), true);
assert.equal(isYoutubePlaceholder({ naturalWidth: 480 }), false);
assert.equal(youtubePlayerSrc(yt.embedUrl), 'https://www.youtube-nocookie.com/embed/Cbqg3RnW0ss?autoplay=1&playsinline=1&rel=0');

console.log('check-media-sosial: ok');
