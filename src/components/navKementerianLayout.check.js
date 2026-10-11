// Run: node src/components/navKementerianLayout.check.js
import assert from 'node:assert/strict';
import { WIDE_AT, packSpans, wideIndex } from './navKementerianLayout.js';

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
  [[3, WIDE_AT + 2, 2, 1, 1], 1],
  [[3, WIDE_AT - 1, 2, 1, 1], -1],
  [[WIDE_AT + 1, WIDE_AT + 1, 2], 0],
  [[WIDE_AT], 0],
  [[], -1]
];

for (const [counts, expected] of wideCases) {
  assert.equal(wideIndex(counts), expected, `wideIndex(${JSON.stringify(counts)})`);
}

process.stdout.write(`navKementerianLayout: ${packCases.length} packSpans cases and ${wideCases.length} wideIndex cases passed\n`);
