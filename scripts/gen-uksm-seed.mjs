// UKS/M seed generator and parity check (contract: docs/uksm-api-contract.md, "Seed file").
//
//   node scripts/gen-uksm-seed.mjs gen <out.json>     old portal data -> the 26 seed rows
//   node scripts/gen-uksm-seed.mjs check <in.json>    mapUksm(seed) must deep-equal the old exports; stratifikasi codes must match the contract
//
// Deleted together with src/data/{trias,triasSummaries,profil}.js once the portal reads the API.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, posix } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import * as triasModule from '../src/data/trias.js';
import * as summariesModule from '../src/data/triasSummaries.js';
import * as profilModule from '../src/data/profil.js';
import { mapUksm, strataIndicators } from '../src/features/uksm/mapUksm.js';

const { triasPillarsDetail, TRIAS_SOURCE } = triasModule;
const { triasPillarTaglines, triasItemSummaries } = summariesModule;
const {
  profilDefinition, profilTriasPillars, profilContinuity, profilGoal, profilTargets, profilPembina,
  profilPelaksana, profilManagementIntro, profilManagementComponents, profilMonev
} = profilModule;

const KELOMPOK = ['trias', 'profil', 'struktur'];
const EXPECTED_ROWS = 26; // trias + profil + struktur rows, the only ones the old portal data covers
const STRATIFIKASI = 'stratifikasi'; // 0 or 5 more rows (workbook data: hand-maintained, not made by gen, no old export to compare; check verifies their derived codes)
const STRATIFIKASI_SLUGS = ['paud', 'sd', 'smp', 'sma', 'slb'];
const STRATIFIKASI_INDICATORS = 236; // PAUD 46, SD 46, SMP 48, SMA 47, SLB 49
const PILARS = ['pendidikan', 'pelayanan', 'lingkungan', 'manajemen'];
const STRATA = ['dasar', 'madya', 'utama', 'paripurna'];
const SMP_PELAYANAN_CODES = 'PLD-1,PLD-2,PLD-3,PLD-4,PLD-5,PLM-6,PLU-7,PLU-8,PLP-9'; // the contract's worked example
const EXPECTED_TOKENS = 2; // the two Struktur charts
const FIELD_DROPPED = 'cardColor / chart.source';

// ---------- gen ----------

const chartDoc = ({ title, description, src, width, height }) => ({ title, description, src: `@${posix.basename(src)}`, width, height });

const subProgramDoc = (item) => {
  const summary = triasItemSummaries[item.id];
  return {
    icon: summary.icon,
    short: summary.short,
    summary: summary.summary ?? null,
    description: item.description ?? null,
    facts: summary.facts.map(({ label, value }) => ({ label, value })),
    sections: item.sections.map(({ label, type, content }) => ({ label, type, content }))
  };
};

// Profil and Struktur rows: [kelompok, slug, urutan, judul, document]
const PAGE_ROWS = [
  ['profil', 'deskripsi', 10, 'Deskripsi Umum', () => ({
    definition: profilDefinition,
    pillars: profilTriasPillars.map(({ id, definition, groups }) => ({
      id,
      definition,
      groups: groups.map(({ label, items }) => ({ label, items: items.map(({ name, note }) => ({ name, note: note ?? null })) }))
    })),
    continuity: profilContinuity.map(({ id, text }) => ({ id, text }))
  })],
  ['profil', 'tujuan', 20, 'Tujuan', () => ({
    sentence: profilGoal.sentence,
    parts: profilGoal.parts.map(({ id, label, text }) => ({ id, label, text }))
  })],
  ['profil', 'sasaran', 30, 'Sasaran', () => ({
    intro: profilTargets.intro,
    main: profilTargets.main.map(({ id, label }) => ({ id, label })),
    stakeholders: profilTargets.stakeholders
  })],
  ['profil', 'manajemen', 40, 'Manajemen UKS/M', () => ({
    intro: profilManagementIntro,
    components: profilManagementComponents.map(({ id, title, text, facts }) => ({
      id, title, text, facts: facts.map(({ label, value }) => ({ label, value }))
    }))
  })],
  ['profil', 'monev', 50, 'Monitoring dan Evaluasi', () => ({
    title: profilMonev.title,
    intro: profilMonev.intro,
    monitoring: {
      definition: profilMonev.monitoring.definition,
      facts: profilMonev.monitoring.facts.map(({ id, label, value }) => ({ id, label, value })),
      groups: profilMonev.monitoring.groups.map(({ id, title, items }) => ({ id, title, items }))
    },
    evaluation: {
      definition: profilMonev.evaluation.definition,
      owner: profilMonev.evaluation.owner,
      audience: profilMonev.evaluation.audience,
      horizonsLead: profilMonev.evaluation.horizonsLead,
      horizons: profilMonev.evaluation.horizons.map(({ id, label, value }) => ({ id, label, value })),
      sources: profilMonev.evaluation.sources,
      stages: profilMonev.evaluation.stages.map(({ id, title, text, points }) => ({ id, title, text, points: points ?? null }))
    }
  })],
  ['struktur', 'pembina', 10, 'Tim Pembina UKS/M', () => ({
    definition: profilPembina.definition,
    levels: profilPembina.levels,
    chart: chartDoc(profilPembina.chart)
  })],
  ['struktur', 'pelaksana', 20, 'Tim Pelaksana UKS/M', () => ({
    definition: profilPelaksana.definition,
    function: profilPelaksana.function,
    duties: profilPelaksana.duties,
    chart: chartDoc(profilPelaksana.chart)
  })]
];

function buildRows() {
  const triasRows = Object.values(triasPillarsDetail).flatMap((pillar, pillarIndex) => {
    const base = (pillarIndex + 1) * 10; // pillars 10/20/30, their sub-programs 11-17 / 21-24 / 31-35
    return [
      { slug: pillar.id, kelompok: 'trias', induk: null, urutan: base, judul: pillar.title, dokumen: { tagline: triasPillarTaglines[pillar.id], description: pillar.description } },
      ...pillar.items.map((item, itemIndex) => ({
        slug: item.id, kelompok: 'trias', induk: pillar.id, urutan: base + itemIndex + 1, judul: item.title, dokumen: subProgramDoc(item)
      }))
    ];
  });
  const pageRows = PAGE_ROWS.map(([kelompok, slug, urutan, judul, build]) => ({ slug, kelompok, induk: null, urutan, judul, dokumen: build() }));
  return [...triasRows, ...pageRows];
}

function gen(outPath) {
  const rows = buildRows();
  if (rows.length !== EXPECTED_ROWS) throw new Error(`expected ${EXPECTED_ROWS} rows, built ${rows.length}`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(rows, null, 2)}\n`, 'utf8');
  console.log(`wrote ${rows.length} rows to ${outPath}`);
}

// ---------- check ----------

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

/** Replace every `src: "@file.png"` token by the old public path and count them. */
function resolveTokens(node, found) {
  if (Array.isArray(node)) return node.map((child) => resolveTokens(child, found));
  if (!isPlainObject(node)) return node;
  return Object.fromEntries(Object.entries(node).map(([key, value]) => {
    if (key === 'src' && typeof value === 'string' && value.startsWith('@')) {
      found.push(value);
      return [key, `/profil/${value.slice(1)}`];
    }
    return [key, resolveTokens(value, found)];
  }));
}

/** Drop null/undefined values so that null, undefined and a missing key compare alike. */
function dropNullish(node) {
  if (Array.isArray(node)) return node.map(dropNullish);
  if (!isPlainObject(node)) return node;
  return Object.fromEntries(Object.entries(node).filter(([, value]) => value != null).map(([key, value]) => [key, dropNullish(value)]));
}

const show = (value) => {
  const text = JSON.stringify(value) ?? 'undefined';
  return text.length > 70 ? `${text.slice(0, 67)}...` : text;
};

/** Every path at which `actual` differs from `expected`, key order ignored. */
function diff(expected, actual, path, out) {
  if (Array.isArray(expected) && Array.isArray(actual)) {
    if (expected.length !== actual.length) out.push(`${path}.length: expected ${expected.length}, got ${actual.length}`);
    for (let i = 0; i < Math.min(expected.length, actual.length); i += 1) diff(expected[i], actual[i], `${path}[${i}]`, out);
  } else if (isPlainObject(expected) && isPlainObject(actual)) {
    for (const key of new Set([...Object.keys(expected), ...Object.keys(actual)])) {
      if (!(key in actual)) out.push(`${path}.${key}: missing in mapper output (expected ${show(expected[key])})`);
      else if (!(key in expected)) out.push(`${path}.${key}: unexpected in mapper output (got ${show(actual[key])})`);
      else diff(expected[key], actual[key], `${path}.${key}`, out);
    }
  } else if (!Object.is(expected, actual)) {
    out.push(`${path}: expected ${show(expected)}, got ${show(actual)}`);
  }
  return out;
}

/** The old exports with the fields the contract drops removed. */
function oldExports() {
  const exports = structuredClone({
    triasPillarsDetail, triasPillarTaglines, triasItemSummaries, profilDefinition, profilTriasPillars, profilContinuity,
    profilGoal, profilTargets, profilPembina, profilPelaksana, profilManagementIntro, profilManagementComponents, profilMonev
  });
  Object.values(exports.triasPillarsDetail).forEach((pillar) => delete pillar.cardColor);
  delete exports.profilPembina.chart.source;
  delete exports.profilPelaksana.chart.source;
  return exports;
}

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

/** The derived indicator codes (strataIndicators) against the contract: jenjang order, the SMP example, unique codes, 236 in total. */
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

  let total = 0;
  for (const { slug, requirements } of jenjang) {
    const codes = codesOf(requirements, PILARS);
    total += codes.length;
    if (new Set(codes).size !== codes.length) problems.push(`${slug}: indicator codes are not unique`);
  }
  if (total !== STRATIFIKASI_INDICATORS) problems.push(`expected ${STRATIFIKASI_INDICATORS} stratifikasi indicators, got ${total}`);

  const smpCodes = codesOf(jenjang.find((row) => row.slug === 'smp')?.requirements, ['pelayanan']).join();
  if (smpCodes !== SMP_PELAYANAN_CODES) problems.push(`SMP pelayanan codes: expected ${SMP_PELAYANAN_CODES}, got ${show(smpCodes)}`);
  return problems;
}

function check(inPath) {
  const rows = JSON.parse(readFileSync(inPath, 'utf8'));
  const problems = structureProblems(rows);
  if (!Array.isArray(rows)) {
    console.error(`FAIL: ${problems.join('; ')}`);
    process.exit(1);
  }

  const tokens = [];
  const portalRows = rows.filter((row) => row.kelompok !== STRATIFIKASI);
  const mapped = mapUksm(resolveTokens(portalRows, tokens));
  if (tokens.length !== EXPECTED_TOKENS) problems.push(`expected ${EXPECTED_TOKENS} "@file" src tokens, found ${tokens.length}`);

  const expected = oldExports();
  const names = Object.keys(expected);
  // Every export of the old modules must be accounted for (TRIAS_SOURCE is a dev-only label, not API data).
  const oldNames = [...Object.keys(triasModule), ...Object.keys(summariesModule), ...Object.keys(profilModule)].filter((name) => name !== 'TRIAS_SOURCE');
  if (!isDeepStrictEqual([...oldNames].sort(), [...names].sort())) problems.push(`old module exports ${show(oldNames)} are not the compared set ${show(names)}`);
  if (typeof TRIAS_SOURCE !== 'string') problems.push('TRIAS_SOURCE export vanished from trias.js');

  for (const name of names) diff(dropNullish(expected[name]), dropNullish(mapped[name]), name, problems);

  // Object.values(triasPillarsDetail) drives the page order, and the API may deliver rows in any order.
  const shuffled = mapUksm(resolveTokens([...portalRows].reverse(), []));
  const pillarOrder = Object.keys(expected.triasPillarsDetail);
  for (const [label, result] of [['rows as stored', mapped], ['rows reversed', shuffled]]) {
    if (!isDeepStrictEqual(Object.keys(result.triasPillarsDetail), pillarOrder)) problems.push(`triasPillarsDetail key order (${label}): expected ${show(pillarOrder)}`);
  }
  if (!isDeepStrictEqual(shuffled, mapped)) problems.push('mapUksm output depends on row order');

  problems.push(...stratifikasiProblems(rows));

  if (problems.length) {
    console.error(`FAIL: ${problems.length} problem(s) (dropped by contract and ignored: ${FIELD_DROPPED}; null = undefined = missing)`);
    problems.forEach((problem) => console.error(`  ${problem}`));
    process.exit(1);
  }
  console.log(`OK: ${names.length} exports equal`);
}

// ---------- cli ----------

const [mode, file] = process.argv.slice(2);
if (!file || (mode !== 'gen' && mode !== 'check')) {
  console.error('usage: node scripts/gen-uksm-seed.mjs gen <out.json> | check <in.json>');
  process.exit(2);
}
(mode === 'gen' ? gen : check)(file);
