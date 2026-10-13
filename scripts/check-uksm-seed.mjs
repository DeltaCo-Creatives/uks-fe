// Structure and stratifikasi-code check for the UKS/M seed file (contract: docs/uksm-api-contract.md, "Seed file").
//
//   node scripts/check-uksm-seed.mjs <uksm.json>
//
// The seed lives in uks-be (Uks.Infrastructure/Data/SeedData/uksm/uksm.json). Prints OK or the list of
// problems (exit 1); a missing argument is a usage error (exit 2).
import { readFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';
import { mapUksm, strataIndicators } from '../src/features/uksm/mapUksm.js';

const KELOMPOK = ['trias', 'profil', 'struktur'];
const EXPECTED_ROWS = 26; // trias + profil + struktur rows
const STRATIFIKASI = 'stratifikasi'; // 0 or 5 more rows (workbook data, one per jenjang)
const STRATIFIKASI_SLUGS = ['paud', 'sd', 'smp', 'sma', 'slb']; // the jenjang order the portal shows
const STRATIFIKASI_COUNTS = [46, 46, 48, 47, 49]; // indicators per jenjang, in STRATIFIKASI_SLUGS order, 236 in total
const PILARS = ['pendidikan', 'pelayanan', 'lingkungan', 'manajemen'];
const STRATA = ['dasar', 'madya', 'utama', 'paripurna'];
const SMP_PELAYANAN_CODES = 'PLD-1,PLD-2,PLD-3,PLD-4,PLD-5,PLM-6,PLU-7,PLU-8,PLP-9'; // the contract's worked example
const CODE_FORMAT = /^(PD|PL|LK|TK)[DMUP]-[1-9]\d*$/;

const show = (value) => {
  const text = JSON.stringify(value) ?? 'undefined';
  return text.length > 70 ? `${text.slice(0, 67)}...` : text;
};

function structureProblems(rows) {
  if (!Array.isArray(rows)) return ['the seed file is not a JSON array'];
  const problems = [];
  const stratifikasiSlugs = rows.filter((row) => row.kelompok === STRATIFIKASI).map((row) => row.slug);
  if (rows.length - stratifikasiSlugs.length !== EXPECTED_ROWS) problems.push(`expected ${EXPECTED_ROWS} trias/profil/struktur rows, got ${rows.length - stratifikasiSlugs.length}`);
  if (stratifikasiSlugs.length && !isDeepStrictEqual([...stratifikasiSlugs].sort(), [...STRATIFIKASI_SLUGS].sort())) problems.push(`expected 0 or ${STRATIFIKASI_SLUGS.length} stratifikasi rows (${STRATIFIKASI_SLUGS.join(', ')}), got ${show(stratifikasiSlugs)}`);
  const slugs = rows.map((row) => row.slug);
  const duplicates = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);
  if (duplicates.length) problems.push(`duplicate slugs: ${[...new Set(duplicates)].join(', ')}`);
  const pillarSlugs = new Set(rows.filter((row) => row.kelompok === 'trias' && row.induk === null).map((row) => row.slug));
  rows.forEach((row) => {
    if (![...KELOMPOK, STRATIFIKASI].includes(row.kelompok)) problems.push(`${row.slug}: invalid kelompok ${show(row.kelompok)}`);
    if (row.induk !== null && !(row.kelompok === 'trias' && pillarSlugs.has(row.induk))) problems.push(`${row.slug}: invalid induk ${show(row.induk)}`);
  });
  return problems;
}

/** The derived indicator codes (strataIndicators) against the contract: jenjang order, per-jenjang totals, the SMP example, well-formed unique codes. */
function stratifikasiProblems(rows) {
  const problems = [];
  const codesOf = (requirements, pilars, stratas = STRATA) =>
    pilars.flatMap((pilar) => stratas.flatMap((strata) => strataIndicators(requirements, pilar, strata).map((indicator) => indicator.code)));

  // Something that is not text is skipped without breaking the numbering of the strata above it.
  const oddCodes = codesOf({ pendidikan: { dasar: ['a', null, { x: 1 }, 'b'], madya: ['c'] } }, ['pendidikan'], ['dasar', 'madya']).join();
  if (oddCodes !== 'PDD-1,PDD-2,PDM-3') problems.push(`strataIndicators skips non-text items: expected PDD-1,PDD-2,PDM-3, got ${oddCodes}`);

  const jenjang = mapUksm(rows).stratifikasiJenjang;
  if (jenjang.length === 0) return problems; // 0 stratifikasi rows are allowed
  const slugs = jenjang.map((row) => row.slug);
  if (!isDeepStrictEqual(slugs, STRATIFIKASI_SLUGS)) problems.push(`stratifikasi jenjang order: expected ${show(STRATIFIKASI_SLUGS)}, got ${show(slugs)}`);
  if (!isDeepStrictEqual(mapUksm([...rows].reverse()).stratifikasiJenjang, jenjang)) problems.push('stratifikasi jenjang depend on row order');

  for (const { slug, requirements } of jenjang) {
    const codes = codesOf(requirements, PILARS);
    const expected = STRATIFIKASI_COUNTS[STRATIFIKASI_SLUGS.indexOf(slug)];
    if (expected !== undefined && codes.length !== expected) problems.push(`${slug}: expected ${expected} indicators, got ${codes.length}`);
    if (new Set(codes).size !== codes.length) problems.push(`${slug}: indicator codes are not unique`);
    const malformed = codes.filter((code) => !CODE_FORMAT.test(code));
    if (malformed.length) problems.push(`${slug}: malformed indicator codes ${show(malformed)}`);
  }

  const smpCodes = codesOf(jenjang.find((row) => row.slug === 'smp')?.requirements, ['pelayanan']).join();
  if (smpCodes !== SMP_PELAYANAN_CODES) problems.push(`SMP pelayanan codes: expected ${SMP_PELAYANAN_CODES}, got ${show(smpCodes)}`);
  return problems;
}

function check(path) {
  let rows;
  try {
    rows = JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    console.error(`FAIL: cannot read ${path}: ${err.message}`);
    process.exit(1);
  }
  const problems = structureProblems(rows);
  if (!Array.isArray(rows)) {
    console.error(`FAIL: ${problems.join('; ')}`);
    process.exit(1);
  }
  problems.push(...stratifikasiProblems(rows));

  if (problems.length) {
    console.error(`FAIL: ${problems.length} problem(s)`);
    problems.forEach((problem) => console.error(`  ${problem}`));
    process.exit(1);
  }
  const stratifikasi = rows.filter((row) => row.kelompok === STRATIFIKASI).length;
  console.log(`OK: ${rows.length} rows (${rows.length - stratifikasi} trias/profil/struktur, ${stratifikasi} stratifikasi), structure and stratifikasi codes match the contract`);
}

const [path] = process.argv.slice(2);
if (!path) {
  console.error('usage: node scripts/check-uksm-seed.mjs <uksm.json>');
  process.exit(2);
}
check(path);
