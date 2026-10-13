# API Contract: Footer Portal

## Context

The portal footer used to be fully hardcoded in `src/components/Footer.jsx`. Its texts, contact lines, social icons, navigation links and bottom bar now come from the CMS (page "Footer Portal"). The footer still has exactly four columns (brand, Sekretariat Pembina, Peta Navigasi, Statistik Pengunjung) plus the bottom bar, and with the seeded values it renders exactly as it did before.

Code: `src/features/footer/` (`resolveFooter.js` holds the rules below as pure functions, `defaults.js` the built-in fallback).

## Endpoints used

```
GET /api/v1/public/pengaturan      (existing)
GET /api/v1/public/footer-tautan   (new)
```

- **Auth:** none (public)
- **Query params:** none
- **Pagination:** none
- **Cache:** `Cache-Control: public, max-age=60` on both. The portal sends `cache: 'no-cache'`, so a CMS edit shows on the next page load.
- Both hooks are `createCachedList` lists, fetched once per page load and shared by every consumer (`usePengaturanSettings`, `useFooterTautanList` in `src/hooks/usePublicLists.js`).

## Settings (`/public/pengaturan`)

A flat `{ "module.key": "value" }` object. Every value is a string. The footer reads these keys:

| Key | Kind | Default |
|---|---|---|
| `footer.deskripsi` | text, max 500, may be empty | `Portal Resmi Usaha Kesehatan Sekolah / Madrasah (UKS/M) lintas 4 Kementerian: Kementerian Pendidikan Dasar dan Menengah, Kementerian Kesehatan, Kementerian Agama, dan Kementerian Dalam Negeri Republik Indonesia.` |
| `footer.tampilkanDeskripsi` | bool | `true` |
| `footer.judulKontak` | text, max 40 | `Sekretariat Pembina` |
| `footer.tampilkanKontak` | bool | `true` |
| `footer.kontakAlamat` | bool | `true` |
| `footer.kontakEmail` | bool | `true` |
| `footer.kontakTelepon` | bool | `true` |
| `footer.kontakTeleponUlt` | bool | `false` |
| `footer.kontakJamOperasional` | bool | `false` |
| `footer.kontakWebsite` | bool | `true` |
| `footer.kontakPeta` | bool | `false` |
| `footer.instagramUrl`, `youtubeUrl`, `facebookUrl`, `xUrl`, `tiktokUrl` | absolute http(s) URL, or empty | empty |
| `footer.judulNavigasi` | text, max 40 | `Peta Navigasi` |
| `footer.tampilkanNavigasi` | bool | `true` |
| `footer.judulStatistik` | text, max 40 | `Statistik Pengunjung` |
| `footer.hakCipta` | text, max 200 | `Kementerian Pendidikan Dasar dan Menengah RI · Sekretariat Pembina UKS/M Pusat.` |
| `footer.slogan` | text, max 150, may be empty | `Sinergi 4 Kementerian untuk Indonesia Emas 2045` |

Existing keys the footer also reads, unchanged:

| Key | Used for |
|---|---|
| `kontak.address`, `kontak.email`, `kontak.phone`, `kontak.ultPhone`, `kontak.operatingHours`, `kontak.websiteUrl`, `kontak.mapsUrl` | The values of the contact lines. They are edited only in Pengaturan Situs > Kontak. |
| `pengunjung.tampilkanStatistik` | Shows or hides the statistics column. |

### Reading rules

- **Switch (bool):** a default-true key is off only when the value is exactly `"false"`. A default-false key (`kontakTeleponUlt`, `kontakJamOperasional`, `kontakPeta`) is on only when the value is exactly `"true"`. A missing key is its default.
- **Text:** a missing, empty or blank value is its default. Exception: for `deskripsi` and `slogan` a stored empty string means "do not render"; only a missing key falls back to the default.
- Text values are trimmed before use.
- **URLs** (social, maps, external links): used only when they are absolute `http:` or `https:`. Anything else is treated as empty, so a bad value never becomes a link.

## Footer links (`/public/footer-tautan`)

A plain JSON array, active links only, already ordered by `urutan` then `label`. The portal renders it in the order received.

```json
[
  { "id": "3f1c…", "label": "Beranda", "jenis": "Halaman", "halaman": "beranda", "url": null },
  { "id": "9b2e…", "label": "Situs UKS", "jenis": "Eksternal", "halaman": null, "url": "https://example.org" }
]
```

| Field | Type | Notes |
|---|---|---|
| `id` | string (uuid) | React key |
| `label` | string | Link text, max 40 |
| `jenis` | `"Halaman"` or `"Eksternal"` | Always this exact string |
| `halaman` | string or null | A portal page key; set when `jenis` is `Halaman` |
| `url` | string or null | Absolute http(s) URL; set when `jenis` is `Eksternal` |

Allowed `halaman` keys mirror `VIEW_PATHS` in `src/routes.js`. The CMS dropdown and the API validator carry the same list, so a new portal page needs the key added in all three places.

| key | Path |
|---|---|
| `beranda` | `/` |
| `uksm-profil` | `/uksm/profil` |
| `uksm-trias` | `/uksm/trias` |
| `uksm-stratifikasi` | `/uksm/stratifikasi` |
| `program` | `/program` |
| `mitra` | `/mitra` |
| `informasi` | `/informasi` |
| `publikasi` | `/publikasi` |
| `kontak` | `/kontak` |
| `search` | `/search` |

The API seeds today's nine links (all `Halaman`, the first nine keys above except `search`, in that order) so the footer is unchanged until an admin edits it.

## Rendering rules

The footer keeps `<footer id="kontak">`, the `.container` and `.footer-content` wrappers, and the same column elements, classes and flex values as before. A hidden column renders no element at all, so it leaves no gap.

| Part | Content | Hidden when |
|---|---|---|
| Brand | The UKS wordmark always. The paragraph is `footer.deskripsi`. | The paragraph only: `tampilkanDeskripsi` is off or the text is empty |
| Sekretariat Pembina | Heading `judulKontak`. Lines in this order: address (`kontak.address`), email (`mailto:`), phone (`tel:`), ULT phone (`tel:`, shown as `ULT: <value>`), operating hours, website (new tab), map link ("Lihat di peta", new tab). Then a row of social icons. | `tampilkanKontak` is off, or there is no line and no icon |
| Peta Navigasi | Heading `judulNavigasi`, then the links | `tampilkanNavigasi` is off, or no link can be rendered |
| Statistik Pengunjung | The visitor summary, heading `judulStatistik` | `pengunjung.tampilkanStatistik` is `"false"` |
| Bottom bar | `© <current year> <hakCipta>` and, when not empty, `slogan` | Never; the slogan alone is left out when empty |

- **Contact lines:** a line shows only when its switch (`footer.kontak*`) is on and its `kontak.*` value is not empty.
- **Social icons:** Instagram, YouTube, Facebook, X, TikTok, in that order, each only when its URL is filled. Each is a 44px round link with `aria-label` "UKS di Instagram" (and so on), opening in a new tab with `rel="noopener noreferrer"`.
- **Halaman links:** a router link to `pathForView(halaman)`. A key that is not in `VIEW_PATHS` is skipped, so a removed page never leaves a broken link.
- **Eksternal links:** a plain `<a target="_blank" rel="noopener noreferrer">` with a small external icon and screen-reader text "(membuka tab baru)". A link without a valid http(s) URL is skipped.
- **Blank label:** the link is skipped.

## Loading and failure

Each part has a status: `loading`, `ready` or `fallback`.

- **Loading:** the settings and link texts show grey skeleton bars of the same height until their request settles, so customized content never flashes the old defaults. The statistics column heading is a skeleton too, while its numbers keep their own loading rows.
- **Failure:** if a request errors (network, 404 when the API is older than the portal, or a malformed body), that part falls back to the built-in values in `defaults.js`, equal to the table above and to the nine original links. The footer never looks broken.
- **Contact column on failure:** the contact values live in `/public/pengaturan`, so when that request fails there is nothing to show and the column is hidden.
- **Empty link list:** `[]` is a real answer (an admin removed every link), so the navigation column is hidden. It is not treated as a failure.

## Deploy order

Order does not matter:

- **Portal before API:** `/public/footer-tautan` answers 404, so the built-in links show; missing `footer.*` keys read as their defaults. The footer matches the old one.
- **API before portal:** the migration seeds today's values, so the old portal keeps working.
