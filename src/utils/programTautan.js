// 7KAIH's two "Kiat Jitu" groups render one row per jenjang (PAUD/SD/SMP/SMA)
// as a `variants` list; every other resources group renders `items`. The API
// only gives us the group heading, so the shape is picked by name.
const VARIANT_GRUPS = new Set(['Kiat Jitu 7KAIH untuk guru', 'Kiat Jitu 7KAIH untuk orang tua']);

/**
 * Groups a program's `/public/program-tautan` rows by `grup` into the shape
 * ResourcesSection renders, preserving the API's order (program, urutan, judul)
 * so group order == order of first appearance.
 *
 * @param {Array<{program: string, grup: string, judul: string, keterangan: string|null, jenis: string|null, url: string|null}>} tautanList
 * @param {string} program - one of mbg|ckg|7kaih|asri|prestasi
 */
export function buildResourceGroups(tautanList, program) {
  const groups = [];
  const byGrup = new Map();

  (tautanList || [])
    .filter((row) => row.program === program)
    .forEach((row) => {
      let group = byGrup.get(row.grup);
      if (!group) {
        group = VARIANT_GRUPS.has(row.grup) ? { title: row.grup, variants: [] } : { title: row.grup, items: [] };
        byGrup.set(row.grup, group);
        groups.push(group);
      }
      if (group.variants) {
        group.variants.push({ label: row.judul, kind: row.jenis, url: row.url });
      } else {
        group.items.push({ title: row.judul, meta: row.keterangan, kind: row.jenis, url: row.url });
      }
    });

  return groups;
}

/**
 * The URL for a 7KAIH habit card, matched by its title against the
 * `Tujuh kebiasaan` group's `judul`.
 * // ponytail: title match breaks if a card is renamed, keep card titles and
 * // the seeded judul values in sync.
 */
export function habitUrl(tautanList, title) {
  const row = (tautanList || []).find(
    (r) => r.program === '7kaih' && r.grup === 'Tujuh kebiasaan' && r.judul === title
  );
  return row ? row.url : null;
}
