/**
 * UKS/M API rows -> the shapes the components read (the shapes the removed hardcoded Trias, Profil
 * and Struktur data exported), consumed as `const { x } = useUksm()`.
 *
 * Pure: no React, no src/data imports, never mutates its input, safe to run in plain node
 * (scripts/check-uksm-seed.mjs does). Presentation that is not stored in the API
 * (icons, colours, links) is rebuilt here from the constant maps below.
 *
 * Contract: docs/uksm-api-contract.md. A row is { slug, kelompok, induk, urutan, judul, dokumen }.
 * Optional document values arrive as null (e.g. note, points); consumers test them for truthiness.
 * Rows may come in any order. A missing or unknown row does not throw: its export is {} / [] /
 * undefined (maps / lists / single values) and the consumer decides how to show the gap.
 * A document that breaks the contract (e.g. a null inside a list) can still throw; useUksm catches that.
 */

export const PILLAR_STYLE = {
  pendidikan: { icon: 'fa-solid fa-graduation-cap', color: '#098C4C', bgBadge: '#D2E8DA' },
  pelayanan: { icon: 'fa-solid fa-kit-medical', color: '#2563EB', bgBadge: '#DBEAFE' },
  lingkungan: { icon: 'fa-solid fa-seedling', color: '#059669', bgBadge: '#D1FAE5' }
};

// Keyed by the fact label allowed on a sub-program: Waktu | Tempat | Pelaksana | Sasaran
const FACT_ICONS = {
  Waktu: 'fa-regular fa-clock',
  Tempat: 'fa-solid fa-location-dot',
  Pelaksana: 'fa-solid fa-user-group',
  Sasaran: 'fa-solid fa-bullseye'
};

// Keyed by the fixed ids of profilGoal.parts, profilTargets.main and profilMonev.monitoring.facts
const GOAL_ICONS = {
  cara: 'fa-solid fa-hands-bubbles',
  tujuan: 'fa-solid fa-graduation-cap',
  hasil: 'fa-solid fa-child-reaching'
};

const TARGET_ICONS = {
  'peserta-didik': 'fa-solid fa-children',
  pendidik: 'fa-solid fa-chalkboard-user',
  tendik: 'fa-solid fa-id-badge',
  masyarakat: 'fa-solid fa-people-roof'
};

const MONEV_FACT_ICONS = {
  siapa: 'fa-solid fa-user-check',
  kepada: 'fa-solid fa-school',
  kapan: 'fa-regular fa-calendar',
  cara: 'fa-regular fa-pen-to-square'
};

// Link under a profilContinuity step; an id without an entry has no link.
const CONTINUITY_LINKS = {
  strata: { label: 'Buka Stratifikasi UKS/M', view: 'uksm-stratifikasi', section: 'sec-strat-pengertian' },
  tim: { label: 'Lihat susunan Tim Pelaksana', orgTab: 'pelaksana' }
};

const MONEV_NUMBER = 5; // Monitoring dan Evaluasi is management component 5; components 1-4 are numbered by position

// Stratifikasi indicator codes: <PILAR_PREFIX><strata initial>-<n>, e.g. PLD-1 (contract, "Stratifikasi").
const PILAR_PREFIX = { pendidikan: 'PD', pelayanan: 'PL', lingkungan: 'LK', manajemen: 'TK' };
const STRATA_KEYS = ['dasar', 'madya', 'utama', 'paripurna']; // lowest first; the initial is the key's first letter

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const list = (value) => (Array.isArray(value) ? value : []);
const texts = (value) => list(value).filter((item) => typeof item === 'string'); // an indicator that is not text is skipped, not rendered
const mapIfPresent = (doc, build) => (doc ? build(doc) : undefined);
const byUrutan = (a, b) => a.urutan - b.urutan;

function pillarItem(row) {
  const description = row.dokumen.description ?? null;
  const sections = list(row.dokumen.sections);
  const placeholder = description === null && sections.length === 0;
  return { id: row.slug, title: row.judul, ...(placeholder && { placeholder: true }), description, sections };
}

function itemSummary(doc) {
  return {
    icon: doc.icon,
    short: doc.short,
    summary: doc.summary ?? null,
    facts: list(doc.facts).map((fact) => ({ label: fact.label, icon: FACT_ICONS[fact.label], value: fact.value }))
  };
}

/**
 * What one strata adds to one pilar, each indicator with its derived code. The number keeps counting through
 * the strata below it (SMP pelayanan: PLD-1 ... PLD-5, then madya starts at PLM-6).
 *
 * @param {Record<string, Record<string, string[]>>} requirements a Stratifikasi document
 * @param {string} pilar pendidikan | pelayanan | lingkungan | manajemen
 * @param {string} strata dasar | madya | utama | paripurna
 * @returns {Array<{ code: string, text: string }>}
 */
export function strataIndicators(requirements, pilar, strata) {
  const items = requirements?.[pilar];
  const before = STRATA_KEYS.slice(0, STRATA_KEYS.indexOf(strata)).reduce((sum, key) => sum + texts(items?.[key]).length, 0);
  return texts(items?.[strata]).map((text, index) => ({
    code: `${PILAR_PREFIX[pilar]}${strata[0].toUpperCase()}-${before + index + 1}`,
    text
  }));
}

/**
 * @param {Array<{ slug: string, kelompok: string, induk: string | null, urutan: number, judul: string, dokumen: object }>} rows
 *   the public API rows (GET /api/v1/public/uksm), any order
 * @returns {Record<string, any>} triasPillarsDetail, triasPillarTaglines, triasItemSummaries, profilDefinition,
 *   profilTriasPillars, profilContinuity, profilGoal, profilTargets, profilPembina, profilPelaksana,
 *   profilManagementIntro, profilManagementComponents, profilMonev, and stratifikasiJenjang
 *   ([{ slug, label, requirements }] in urutan order; `requirements` is the Stratifikasi document, read with strataIndicators)
 */
export function mapUksm(rows) {
  const valid = list(rows).filter((row) => isObject(row) && isObject(row.dokumen)).sort(byUrutan);
  const trias = valid.filter((row) => row.kelompok === 'trias');
  const pillars = trias.filter((row) => row.induk == null);
  const subPrograms = trias.filter((row) => row.induk != null);
  const docOf = (kelompok, slug) => valid.find((row) => row.kelompok === kelompok && row.slug === slug)?.dokumen;

  const deskripsi = docOf('profil', 'deskripsi');
  const manajemen = docOf('profil', 'manajemen');

  return {
    triasPillarsDetail: Object.fromEntries(
      pillars.map((pillar) => [
        pillar.slug,
        {
          id: pillar.slug,
          number: pillar.urutan / 10,
          title: pillar.judul,
          ...PILLAR_STYLE[pillar.slug],
          description: pillar.dokumen.description,
          items: subPrograms.filter((row) => row.induk === pillar.slug).map(pillarItem)
        }
      ])
    ),
    triasPillarTaglines: Object.fromEntries(pillars.map((pillar) => [pillar.slug, pillar.dokumen.tagline])),
    triasItemSummaries: Object.fromEntries(subPrograms.map((row) => [row.slug, itemSummary(row.dokumen)])),

    profilDefinition: deskripsi?.definition,
    profilTriasPillars: list(deskripsi?.pillars).map((pillar) => {
      const row = pillars.find((candidate) => candidate.slug === pillar.id);
      return {
        id: pillar.id,
        number: row && row.urutan / 10,
        title: row?.judul,
        icon: PILLAR_STYLE[pillar.id]?.icon,
        triasSection: `sec-trias-${pillar.id}`,
        definition: pillar.definition,
        groups: pillar.groups
      };
    }),
    profilContinuity: list(deskripsi?.continuity).map(({ id, text }) => ({
      id,
      text,
      ...(CONTINUITY_LINKS[id] && { link: CONTINUITY_LINKS[id] })
    })),

    profilGoal: mapIfPresent(docOf('profil', 'tujuan'), (tujuan) => ({
      sentence: tujuan.sentence,
      parts: list(tujuan.parts).map(({ id, label, text }) => ({ id, label, icon: GOAL_ICONS[id], text }))
    })),
    profilTargets: mapIfPresent(docOf('profil', 'sasaran'), (sasaran) => ({
      intro: sasaran.intro,
      main: list(sasaran.main).map(({ id, label }) => ({ id, label, icon: TARGET_ICONS[id] })),
      stakeholders: sasaran.stakeholders
    })),

    profilPembina: docOf('struktur', 'pembina'),
    profilPelaksana: docOf('struktur', 'pelaksana'),

    profilManagementIntro: manajemen?.intro,
    profilManagementComponents: list(manajemen?.components).map((component, index) => ({
      id: component.id,
      number: index + 1,
      title: component.title,
      text: component.text,
      facts: list(component.facts)
    })),
    profilMonev: mapIfPresent(docOf('profil', 'monev'), (monev) => ({
      number: MONEV_NUMBER,
      title: monev.title,
      intro: monev.intro,
      monitoring: {
        ...monev.monitoring,
        facts: list(monev.monitoring?.facts).map(({ id, label, value }) => ({ id, icon: MONEV_FACT_ICONS[id], label, value }))
      },
      evaluation: monev.evaluation
    })),

    stratifikasiJenjang: valid
      .filter((row) => row.kelompok === 'stratifikasi')
      .map((row) => ({ slug: row.slug, label: row.judul, requirements: row.dokumen }))
  };
}
