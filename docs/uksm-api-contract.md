# API Contract: UKS/M pages (Trias, Profil, Struktur Organisasi, Stratifikasi)

## Context

The Trias UKS/M page (3 pillars, 16 sub-programs), the Profil & Tata Kelola page (5 parts) and the two
Struktur Organisasi charts were hardcoded in the portal (`src/data/trias.js`, `triasSummaries.js`,
`profil.js`). They move to one backend table so the CMS can edit them. The Stratifikasi UKS/M indicators
(previously SD only, hardcoded in `src/data/stratifikasi.js`) join them as one row per jenjang (PAUD, SD,
SMP, SMA, SLB), taken from the workbook "Kondisi Pemenuhan Indikator" (Magelang workshop, 21-22 September
2026).

Design: one row per unit (31 rows). Each row stores a validated JSON document (`dokumen`) whose shape is
the portal's own props, so the portal needs no shape mapper beyond joining rows and adding presentation
(icons, colours, links) that stays in code.

Edit-only: rows are created by the backend seeder; there is no create, delete, restore or reorder.

JSON keys inside `dokumen` are English on purpose (they mirror the portal props), unlike the Indonesian
keys of the Program contract. Row-level fields (`slug`, `kelompok`, `judul`, ...) stay Indonesian.

## Rows

| `kelompok` | `slug` | `induk` | `urutan` | `judul` | `judul` editable |
|---|---|---|---|---|---|
| `trias` | `pendidikan` | null | 10 | Pendidikan Kesehatan | no |
| `trias` | `literasi-kesehatan` ... (7 sub-programs) | `pendidikan` | 11-17 | sub-program title | yes |
| `trias` | `pelayanan` | null | 20 | Pelayanan Kesehatan | no |
| `trias` | `penjaringan-kesehatan-dan-pemeriksaan-berkala` ... (4) | `pelayanan` | 21-24 | | yes |
| `trias` | `lingkungan` | null | 30 | Pembinaan Lingkungan Sekolah Sehat | no |
| `trias` | `sanitasi-sekolah` ... (5) | `lingkungan` | 31-35 | | yes |
| `profil` | `deskripsi` | null | 10 | Deskripsi Umum | no |
| `profil` | `tujuan` | null | 20 | Tujuan | no |
| `profil` | `sasaran` | null | 30 | Sasaran | no |
| `profil` | `manajemen` | null | 40 | Manajemen UKS/M | no |
| `profil` | `monev` | null | 50 | Monitoring dan Evaluasi | no |
| `struktur` | `pembina` | null | 10 | Tim Pembina UKS/M | no |
| `struktur` | `pelaksana` | null | 20 | Tim Pelaksana UKS/M | no |
| `stratifikasi` | `paud` | null | 10 | PAUD | no |
| `stratifikasi` | `sd` | null | 20 | SD | no |
| `stratifikasi` | `smp` | null | 30 | SMP | no |
| `stratifikasi` | `sma` | null | 40 | SMA | no |
| `stratifikasi` | `slb` | null | 50 | SLB | no |

Sub-program slugs, in order (they are the old portal item ids; anchors `sec-trias-<pillar>` and
`trias-item-<sub-program>` depend on them):

- `pendidikan`: `literasi-kesehatan`, `perilaku-hidup-bersih-dan-sehat`, `pendidikan-gizi`,
  `pendidikan-kesehatan-reproduksi`, `pendidikan-karakter`, `pembiasaan-aktivitas-fisik`, `dokter-kecil`
- `pelayanan`: `penjaringan-kesehatan-dan-pemeriksaan-berkala`, `imunisasi`, `pemberian-obat-cacing`, `p3k-dan-p3p`
- `lingkungan`: `sanitasi-sekolah`, `pembinaan-kantin-sehat`, `pemanfaatan-pekarangan-sekolah`,
  `pemberantasan-sarang-nyamuk`, `kawasan-tanpa-rokok-napza-kekerasan-pornografi`

`slug`, `kelompok`, `induk` and `urutan` never change after seeding. A row's document shape is chosen by
`(kelompok, induk == null, slug)`: trias + no induk = pillar; trias + induk = sub-program; profil/struktur =
by slug; every stratifikasi row = `Stratifikasi`. The portal uses a stratifikasi row's `judul` as its jenjang
tab label and its `slug` in links (`/uksm/stratifikasi?jenjang=smp#sec-strat-indikator`).

## Endpoints

### Admin (`/api/v1/admin/uksm`, bearer token)

| Method | Path | Permission | Response |
|---|---|---|---|
| GET | `/api/v1/admin/uksm?kelompok=&induk=&search=&page=1&pageSize=10&sortBy=urutan&sortDir=asc` | `Uksm.Read` | `200 PagedResult<ListItem>` |
| GET | `/api/v1/admin/uksm/{id}` | `Uksm.Read` | `200 Detail`, `404` |
| PUT | `/api/v1/admin/uksm/{id}` | `Uksm.Update` | `200 { id }`, `400`, `404`, `409` |

There is no POST, DELETE, restore or reorder endpoint.

List query: `kelompok` and `induk` are exact filters (optional); `search` matches `judul` or `slug`
(contains, case-insensitive); `sortBy` is `urutan` (default), `judul` or `updatedAt`; `sortDir` `asc|desc`.
Parameter names and the `PagedResult` envelope are the same as the Program list
(`items, totalCount, pageNumber, pageSize, totalPages, hasPreviousPage, hasNextPage`).

```ts
ListItem = {
  id: string,            // uuid
  slug: string,
  kelompok: 'trias' | 'profil' | 'struktur' | 'stratifikasi',
  induk: string | null,  // pillar slug for sub-programs
  urutan: number,
  judul: string,
  updatedAt: string | null   // ISO 8601 with offset; set on insert, so seeded rows have the seed time
}

Detail = ListItem & {
  dokumen: Dokumen       // see "Documents"; every object that has `src` also gets
                         // `url: string | null` (absolute public URL of that file)
}
```

PUT body:

```ts
{
  judul: string,          // ignored unless the row is a sub-program
  dokumen: Dokumen,       // the whole document; unknown keys (e.g. `url`) are dropped
  updatedAt: string | null   // echo the GET value verbatim; compared with the stored value at millisecond precision
}
```

- `400` ValidationProblemDetails. Keys are the path of the offending value, e.g. `Judul`,
  `Dokumen.sections[2].content[1]`, `Dokumen.facts[0].label`, `Dokumen.monitoring.groups`. A JSON shape
  error (wrong type, missing required key) is reported at the path where it happened, or `Dokumen` if
  the path is unknown.
- `409` ProblemDetails (`title: "Conflict"`, `detail: "Halaman sudah diubah orang lain. Muat ulang
  halaman lalu ulangi perubahan Anda."`) when `updatedAt` differs from the stored value (millisecond precision).
- `200 { id }` on success. Saving an unchanged document must not change the stored row (no audit entry).

### Public (`GET /api/v1/public/uksm`, anonymous)

- `200`, a plain JSON array of every row, sorted by `kelompok` then `urutan`.
- `Cache-Control: public, max-age=60`. About 62 KB raw for trias/profil/struktur, plus about 22 KB for the
  5 stratifikasi rows.
- Inside `dokumen`, every `src` is replaced by the absolute public URL of the file (no extra `url` key).

```ts
PublicRow = { slug, kelompok, induk, urutan, judul, dokumen }
```

## Documents

Key order below is the canonical order (the backend writes documents in this order; the seed uses it too).
Optional values are `null`, never `""`, and the key is always present. Arrays marked "fixed" must contain
exactly those ids in that order: the CMS shows them without add/remove/reorder because the portal maps
each id to an icon or column.

```ts
// Shared
Fact    = { label: 'Waktu' | 'Tempat' | 'Pelaksana' | 'Sasaran', value: string }
Image   = { src: string, description: string, width: number, height: number }
          // src: relative storage path as returned by POST /uploads (kind "cover", lowercase), e.g. "cover/2026/10/<guid>.webp";
          //      the seed uses a token "@file.png" that the seeder replaces with the uploaded path
          // description: alt text, required (for tables/infographics: the transcription)
Chart   = { title: string, description: string, src: string, width: number, height: number }

Section =
  | { label: string, type: 'text',     content: string }
  | { label: string, type: 'bullets',  content: string[] }               // 1-50 items
  | { label: string, type: 'numbered', content: string[] }               // 1-50 items
  | { label: string, type: 'links',    content: { label: string, url: string | null }[] }  // 1-50
  | { label: string, type: 'image',    content: Image }                  // label = caption under the image

// trias, pillar (pendidikan | pelayanan | lingkungan)
Pilar = { tagline: string, description: string }

// trias, sub-program
SubProgram = {
  icon: string,              // Font Awesome class, e.g. "fa-solid fa-book-open"
  short: string,             // one line on the closed accordion row
  summary: string | null,    // plain-language summary
  description: string | null,// official opening paragraph
  facts: Fact[],             // 0-4, labels unique
  sections: Section[]        // 0-30, display order
}

// profil / deskripsi
Deskripsi = {
  definition: string,
  pillars: {                 // fixed: pendidikan, pelayanan, lingkungan
    id: string,
    definition: string,
    groups: { label: string, items: { name: string, note: string | null }[] }[]   // groups 1-10, items 1-50
  }[],
  continuity: { id: string, text: string }[]   // fixed: strata, tim, phbs
}

// profil / tujuan
Tujuan = {
  sentence: string,
  parts: { id: string, label: string, text: string }[]   // fixed: cara, tujuan, hasil
}

// profil / sasaran
Sasaran = {
  intro: string,
  main: { id: string, label: string }[],      // fixed: peserta-didik, pendidik, tendik, masyarakat
  stakeholders: string[]                      // 1-50
}

// profil / manajemen
Manajemen = {
  intro: string,
  components: {                               // fixed: kebijakan, perencanaan, koordinasi, kapasitas
    id: string, title: string, text: string,
    facts: { label: string, value: string }[] // 0-10, free labels
  }[]
}

// profil / monev
Monev = {
  title: string,
  intro: string,
  monitoring: {
    definition: string,
    facts: { id: string, label: string, value: string }[],   // fixed: siapa, kepada, kapan, cara
    groups: { id: string, title: string, items: string[] }[] // fixed: pendidikan, pelayanan, lingkungan, manajemen; items 1-50
  },
  evaluation: {
    definition: string,
    owner: string,
    audience: string,
    horizonsLead: string,
    horizons: { id: string, label: string, value: string }[],  // fixed: pendek, menengah, panjang
    sources: string[],                                          // 1-50
    stages: { id: string, title: string, text: string, points: string[] | null }[]  // fixed: perencanaan, pelaksanaan, tindak-lanjut
  }
}

// struktur / pembina
Pembina   = { definition: string, levels: string[], chart: Chart }
// struktur / pelaksana
Pelaksana = { definition: string, function: string, duties: string[], chart: Chart }

// stratifikasi (paud | sd | smp | sma | slb): the indicators of one jenjang, per pilar and strata.
// Every strata lists only what it adds; a school at a strata also meets every strata below it.
Stratifikasi = {
  pendidikan: StrataItems,   // Pendidikan Kesehatan
  pelayanan:  StrataItems,   // Pelayanan Kesehatan
  lingkungan: StrataItems,   // Pembinaan Lingkungan Sekolah Sehat
  manajemen:  StrataItems    // Tata Kelola dan Kepemimpinan Sekolah
}
StrataItems = { dasar: string[], madya: string[], utama: string[], paripurna: string[] }   // each 0-50 items
```

Indicator codes are not stored; the portal derives them from position, exactly as the workbook numbers
them: `<pilar prefix><strata letter>-<n>`, prefix `PD` / `PL` / `LK` / `TK` (pendidikan, pelayanan,
lingkungan, manajemen), letter `D` / `M` / `U` / `P` (dasar, madya, utama, paripurna), and `n` counting
1, 2, 3 ... through dasar, then madya, utama, paripurna within the pilar (e.g. SMP pelayanan: PLD-1 ...
PLD-5, PLM-6, PLU-7, PLU-8, PLP-9). Pilar titles, icons, strata names and colours stay in portal code.

### Validation rules (backend is the source of truth)

- Every string: not empty or whitespace-only, at most 5,000 characters. Optional strings are `null`.
- Lists: at most 50 items unless stated above; `sections` at most 30; sub-program `facts` at most 4;
  stratifikasi strata lists 0-50 (a strata may be empty).
- Whole document: at most 200,000 characters serialized. `judul` (sub-program only): 1-200 characters.
- `icon`: matches the existing Font Awesome class pattern used by Program (`IkonPattern`).
- Link `url`: absolute `http`/`https` URL or `null`.
- `section.type`: one of the five; `content` must match the type.
- `Image.src` / `Chart.src`: a relative path matching `^[a-z0-9][a-z0-9._/-]*$`, no `..`, not a URL.
  `width`/`height`: integers 1-10,000. `description` required.
- Fixed id lists: exactly the ids above, in that order.
- No HTML anywhere: every leaf is rendered as plain text by React, so nothing is sanitized.

### Dropped from the old portal data (derived or kept in code)

| Old field | Now |
|---|---|
| pillar `id`, `title` | row `slug`, `judul` |
| pillar `number` | `urutan / 10` |
| pillar `icon`, `color`, `bgBadge` | portal `PILLAR_STYLE[slug]` |
| pillar `cardColor` | removed (unused) |
| item `id`, `title` | row `slug`, `judul` |
| item `placeholder` | derived: no `description` and no `sections` |
| fact `icon` | portal `FACT_ICONS[label]` |
| `profilTriasPillars[].{title, icon, number, triasSection}` | joined from the pillar rows by id |
| `profilContinuity[].link` | portal `CONTINUITY_LINKS[id]` |
| `profilGoal.parts[].icon`, `profilTargets.main[].icon`, `profilMonev.monitoring.facts[].icon` | portal icon maps by id |
| `profilManagementComponents[].number`, `profilMonev.number` | derived from position (1-4, 5) |
| `chart.source` | removed (dev note) |
| `profilManagementIntro` + `profilManagementComponents` | `manajemen.{intro, components}` |

## Seed file (`Uks.Infrastructure/Data/SeedData/uksm/uksm.json`)

Embedded resource, maintained in uks-be. Its 26 trias/profil/struktur rows were generated from the former
portal data (`src/data/trias.js`, `triasSummaries.js`, `profil.js`) by `scripts/gen-uksm-seed.mjs` in an earlier
commit and proven equal to it (the portal mapper applied to the seed deep-equaled the old exports minus the
dropped fields above); that script and the old data files are now removed. The 5 stratifikasi rows are
hand-maintained in `uksm.json`. `node scripts/check-uksm-seed.mjs <uksm.json>` (uks-fe) checks the structure
(row counts, slugs, kelompok, induk) and the stratifikasi codes (jenjang order, per-jenjang totals, the SMP
pelayanan example, unique well-formed codes, 236 in total).

```ts
SeedRow = { slug, kelompok, induk, urutan, judul, dokumen }   // 31 rows, documents in canonical order
```

The 5 stratifikasi rows are not from the old portal data (the old SD list came from a dev CMS record and is
replaced). They are generated from the workbook "Kondisi Pemenuhan Indikator"
(https://docs.google.com/spreadsheets/d/1_52TIybrUZLi_qLgjb7nyRYNopP163UDOc21MMK5KjU, sheets (PAUD) ... (SLB),
read 2026-10-13): texts verbatim except these spelling fixes: "kedalam" -> "ke dalam", "orangtua" ->
"orang tua", "bekerjasama" -> "bekerja sama", "Memiliki Sarana prasarana" -> "Memiliki sarana prasarana",
and LKD-1's run-together criteria punctuated as "Sekolah memiliki sumber air layak dan cukup (tidak berasa,
berbau, dan berwarna; tersedia tempat penyimpanan air yang tertutup; tersedia sepanjang waktu)". The derived
codes equal the workbook codes for all 236 indicators. Total 236: PAUD 46, SD 46, SMP 48, SMA 47, SLB 49.

Images next to it (`struktur-tim-pembina.png`, `struktur-tim-pelaksana.png`, later content images) are
referenced as `"src": "@<file name>"`. The seeder runs in every environment, inserts only slugs that are
missing, uploads each referenced image with kind `cover` (stored as WebP) and replaces the token with
the stored path. A row whose image upload fails is skipped and retried on the next start.

## Permissions

`Uksm.Read`, `Uksm.Update` (in `PermissionNames.All`, not `ItOnly`): Admin CMS and Admin IT get them on
the next start. Users must log in again to receive them. Audit entity label: `UksmHalaman`.

## Release order

1. `dotnet ef database update` (migration `AddUksmHalaman`)
2. Deploy the backend; check `GET /api/v1/public/uksm` returns 31 rows and both chart URLs return 200
3. Deploy the CMS
4. Deploy the portal
5. Admin CMS / Admin IT log in again
