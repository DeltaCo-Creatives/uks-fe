// Run: node scripts/check-page-meta.mjs
import assert from 'node:assert/strict';
import { toMetaDescription } from '../src/utils/metaDescription.js';

assert.equal(toMetaDescription(null), '');
assert.equal(toMetaDescription('   '), '');
assert.equal(toMetaDescription('Sekolah sehat.'), 'Sekolah sehat.');

// HTML stripped, entities decoded once, whitespace collapsed.
assert.equal(toMetaDescription('<p>UKS &amp;&nbsp;<strong>TRIAS</strong>\n\n  &amp;lt;</p>'), 'UKS & TRIAS &lt;');

// Long text: within the limit, ellipsis added, cut on a word boundary.
const long = 'Usaha Kesehatan Sekolah '.repeat(20).trim();
const cut = toMetaDescription(long);
assert.ok(cut.length <= 160, `too long: ${cut.length}`);
assert.ok(cut.endsWith('…'));
assert.ok(long.startsWith(cut.slice(0, -1)) && long[cut.length - 1] === ' ', 'cut mid-word');

// The ellipsis counts toward the limit: a word ending at char 159 stays, one ending at 160 goes.
const fits = `${'a'.repeat(100)} ${'b'.repeat(58)}`;
assert.equal(toMetaDescription(`${fits} cc`), `${fits}…`);
assert.equal(toMetaDescription(`${fits}b cc`), `${'a'.repeat(100)}…`);

// One endless word: hard cut.
assert.equal(toMetaDescription('x'.repeat(400)).length, 160);

console.log('check-page-meta: ok');
