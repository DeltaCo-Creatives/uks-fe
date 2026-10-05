# API Contract: Program Prioritas

## Context

The 5 priority programs (MBG, CKG Sekolah, 7KAIH, ASRI, Prestasi) are currently hardcoded in the frontend. This endpoint moves their content to the backend so it can be managed from the CMS. Three places use the data: the Program page, the program cards on Beranda, and site search.

The links that are now served separately by `/public/program-tautan` are embedded in this response. The frontend can then stop matching links to programs by `grup` name.

## Endpoint

```
GET /api/v1/public/program
```

- **Auth:** none (public)
- **Query params:** none
- **Pagination:** none. There are about 5 programs, and every consumer needs all of them.
- **Response:** `200`, a plain JSON array (same style as `/public/program-tautan`)
  - Only active programs
  - Sorted by `urutan` ascending
  - Empty array `[]` if there are none

There is no detail endpoint, because every page that uses this data needs the full list.

## Program object

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string (uuid) | yes | |
| `slug` | string | yes | Unique. Used in the URL (`/program/mbg`) and as the program key for links. Current values: `mbg`, `ckg`, `7kaih`, `asri`, `prestasi` |
| `urutan` | integer | yes | Display order |
| `labelNav` | string | yes | Short label for the tab picker, e.g. `"CKG Sekolah"` |
| `judul` | string | yes | Full title |
| `ikon` | string | yes | Font Awesome class, e.g. `"fa-solid fa-utensils"` |
| `instansi` | string | yes | Responsible agency |
| `ringkasan` | string | yes | 1 sentence, used on Beranda cards |
| `deskripsi` | string | yes | Opening paragraph on the Program page |
| `fakta` | `Fakta[]` | yes | Can be `[]` |
| `gambar` | `Gambar \| null` | yes | Main image, `null` if none |
| `bagian` | `Bagian[]` | yes | Page sections, in display order |
| `sumber` | `Sumber[]` | yes | Source list at the bottom of the page. Can be `[]` |

### Shared types

```ts
Fakta  = { label: string, nilai: string }

Sumber = { label: string, url: string | null }   // url null = link not available, the UI labels it

Gambar = {
  url: string,            // absolute URL of the uploaded file
  alt: string,
  keterangan: string | null,   // caption
  lebar: number,          // px, prevents layout shift
  tinggi: number,         // px
  sumber: Sumber | null   // image credit
}
```

### Bagian (section)

Every section has the same outer structure. Its content goes in `isi`, and the shape of `isi` depends on `tipe`.

```ts
Bagian = {
  id: string,       // unique within a program, e.g. "rujukan"
  tipe: string,     // see the table below
  judul: string,
  isi: object       // shape depends on `tipe`
}
```

| `tipe` | Used by | `isi` shape |
|---|---|---|
| `audience` | MBG | `{ item: [{ judul, gambar: string(url) }], catatan: string\|null, sumberCatatan: Sumber\|null }` |
| `outcomes` | MBG | `{ item: [{ judul, teks }] }` |
| `table` | CKG | `{ pengantar: string\|null, kolom: string[], baris: [{ jenjang, kelas, teks }], catatan: string\|null }` |
| `timeline` | CKG | `{ item: [{ waktu, judul, teks }] }` |
| `habits` | 7KAIH | `{ item: [{ judul, gambar: string(url), teks, url: string\|null }] }` |
| `contrast` | 7KAIH | `{ masalah: { judul, item: string[] }, jawaban: { judul, item: string[] }, hasil: string }` |
| `pillars` | ASRI | `{ item: [{ huruf, judul, subjudul, teks }], sumber: Sumber\|null }` |
| `example` | ASRI | `{ teks, sumber: Sumber\|null, terkait: { label, url } \| null }` |
| `resources` | MBG, CKG, 7KAIH | `{ grup: Grup[] }`, see below |
| `prestasi` | Prestasi | `{}`. Competition data still comes from `/public/lomba`; this is only a placeholder that sets where the section appears |

`example.terkait.url` is an internal path, e.g. `"/uksm/trias#sec-trias-lingkungan"`.

### Resources (replaces how `program-tautan` is used today)

```ts
Grup = {
  judul: string,                  // e.g. "Situs resmi"
  tampilan: "daftar" | "jenjang", // "jenjang" = one row of PAUD/SD/SMP/SMA buttons
  item: [{
    judul: string,                // with "jenjang": the level label, e.g. "PAUD"
    keterangan: string | null,
    jenis: "drive" | null,
    url: string | null
  }]
}
```

Rules:
- `tampilan` replaces name matching. Today the frontend hardcodes that the groups `Kiat Jitu 7KAIH untuk guru` and `… untuk orang tua` render as level buttons. That should become a field on the group in the CMS.
- 7KAIH habit links (`grup: "Tujuh kebiasaan"` in `program-tautan`) go into `habits.isi.item[].url`. **Do not** repeat them as a group in `resources`.
- A `resources` section with an empty `grup` is hidden by the frontend, so it is safe to return.
- `/public/program-tautan` can stay until the frontend switches over, then it can be removed.

## Example response (shortened)

```json
[
  {
    "id": "3f1c…",
    "slug": "mbg",
    "urutan": 1,
    "labelNav": "MBG",
    "judul": "Makan Bergizi Gratis (MBG)",
    "ikon": "fa-solid fa-utensils",
    "instansi": "Badan Gizi Nasional (BGN)",
    "ringkasan": "Program nasional pemberian makanan bergizi secara gratis dan berkelanjutan kepada kelompok sasaran prioritas di seluruh Indonesia.",
    "deskripsi": "Makan Bergizi Gratis (MBG) adalah program nasional …",
    "fakta": [
      { "label": "Dasar hukum", "nilai": "Peraturan Presiden Nomor 83 Tahun 2024 tentang Badan Gizi Nasional" },
      { "label": "Koordinator", "nilai": "Badan Gizi Nasional (BGN)" }
    ],
    "gambar": null,
    "bagian": [
      {
        "id": "sasaran",
        "tipe": "audience",
        "judul": "Siapa yang menerima",
        "isi": {
          "item": [
            { "judul": "Peserta didik", "gambar": "https://…/mbg-peserta-didik.webp" }
          ],
          "catatan": "Menurut Pasal 5 ayat 1 Perpres 83/2024, …",
          "sumberCatatan": { "label": "BGN: siaran pers sasaran MBG", "url": "https://www.bgn.go.id/…" }
        }
      },
      {
        "id": "rujukan",
        "tipe": "resources",
        "judul": "Rujukan untuk sekolah",
        "isi": {
          "grup": [
            {
              "judul": "Panduan dan regulasi",
              "tampilan": "daftar",
              "item": [
                { "judul": "Pedoman Pendidikan Karakter dalam Makan Bergizi Gratis", "keterangan": "Buku panduan, Kemendikdasmen", "jenis": "drive", "url": "https://s.id/pedomanmbg" }
              ]
            }
          ]
        }
      }
    ],
    "sumber": [
      { "label": "JDIH BPK: Perpres No. 83 Tahun 2024", "url": "https://peraturan.bpk.go.id/Details/295857/perpres-no-83-tahun-2024" }
    ]
  }
]
```

The 7KAIH "Kiat Jitu" group with `tampilan: "jenjang"`:

```json
{
  "judul": "Kiat Jitu 7KAIH untuk guru",
  "tampilan": "jenjang",
  "item": [
    { "judul": "PAUD", "keterangan": null, "jenis": "drive", "url": "https://s.id/kiatjitu7kaih-gurupaud" },
    { "judul": "SD",   "keterangan": null, "jenis": "drive", "url": "https://s.id/kiatjitu7kaih-gurusd" }
  ]
}
```

## Seed data

All current content (including the full text of every section) is in `src/data/program.js` in the frontend repo. Images are in `public/program/*` and need to be uploaded to storage.

## Open questions for backend

1. How to store `isi`: a JSON column per section, or one table per `tipe`? The contract works with either. A JSON column is much simpler given there are 10 shapes.
2. Should `slug` be editable in the CMS? Changing it breaks existing `/program/<slug>` URLs.
