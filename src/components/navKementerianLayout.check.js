// Run: node src/components/navKementerianLayout.check.js
import assert from 'node:assert/strict';
import { packSpans, wideIndex } from './navKementerianLayout.js';

const packCases = [
  [[1, 2, 1, 1, 1], [1, 2, 1, 1, 1]],
  [[1, 2, 1, 1, 1, 1, 1], [1, 2, 1, 1, 1, 1, 2]],
  [[1, 1, 2], [1, 2, 3]],
  [[1], [3]],
  [[1, 1], [1, 2]],
  [[], []],
  [[2], [3]],
  [[1, 1, 1, 1], [1, 1, 1, 3]],
  [[1, 1, 2, 1], [1, 2, 2, 1]]
];

for (const [base, expected] of packCases) {
  assert.deepEqual(packSpans(base), expected, `packSpans(${JSON.stringify(base)})`);
}

const untouched = [1, 1, 2];
packSpans(untouched);
assert.deepEqual(untouched, [1, 1, 2], 'packSpans must not mutate its input');

const wideCases = [
  [[3, 8, 2, 1, 1], 1],
  [[3, 5, 2, 1, 1], -1],
  [[7, 7, 2], 0],
  [[6], 0],
  [[], -1]
];

for (const [counts, expected] of wideCases) {
  assert.equal(wideIndex(counts), expected, `wideIndex(${JSON.stringify(counts)})`);
}

process.stdout.write(`navKementerianLayout: ${packCases.length} packSpans cases and ${wideCases.length} wideIndex cases passed\n`);
