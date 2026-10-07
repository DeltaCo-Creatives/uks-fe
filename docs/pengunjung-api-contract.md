# API Contract: Statistik Pengunjung

## Context

The portal footer has a 4th column, "Statistik Pengunjung", with four counts (Hari Ini, Minggu Ini, Bulan Ini, Total) and the line "Anda adalah pengunjung ke-1.234 hari ini". One call both counts the visit and returns the summary, so the portal makes a single request per page load.

Counting is **one visit per browser per WIB day**. Opening the portal again the same day shows the same number and is not counted twice. The next WIB day counts again. The server stores only daily totals: no visitor id, no IP, no personal data.

The CMS Dashboard reads the same totals through its own admin endpoints. They are not part of this contract.

## Endpoint

```
POST /api/v1/public/kunjungan?tanggalTerakhir=yyyy-MM-dd
```

- **Auth:** none (public)
- **Query params:** `tanggalTerakhir`, optional. The WIB date of the last visit this browser was counted for. The portal omits it when it has no valid value.
- **Body:** none
- **Request headers:** none added by the portal. No body and no custom headers keep it a "simple" CORS request, so the browser sends no preflight (same as the view counters behind `apiPing`).
- **Response:** `200`, a JSON object. `Cache-Control: no-store`.
- **Bots:** a crawler or a blank User-Agent still gets `200` with the summary, but is not counted and gets `urutan: null`.

The portal treats a network error, a non-2xx status, or a body that does not match the shape below as a failure. A missing endpoint (portal deployed before the API) is a failure too, see "States" below.

## Response

```ts
{
  urutan: number | null,   // this visitor's number for today, null when not counted now
  ringkasan: {
    tanggal: string,       // "yyyy-MM-dd", today in WIB according to the server
    hariIni: number,
    mingguIni: number,
    bulanIni: number,
    total: number
  }
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `urutan` | integer \| null | yes | Positive integer when this call counted the visit. `null` when `tanggalTerakhir` equals the server's today, and for bots |
| `ringkasan.tanggal` | string | yes | Server date in WIB. The portal stores it in its marker, so it is always the server's date and never the device's |
| `ringkasan.hariIni` | integer | yes | Visits counted today, 00:00 to 23:59 WIB |
| `ringkasan.mingguIni` | integer | yes | Visits counted this calendar week, Monday to Sunday (WIB) |
| `ringkasan.bulanIni` | integer | yes | Visits counted this calendar month, from the 1st (WIB) |
| `ringkasan.total` | integer | yes | Every visit counted since go-live. Starts at 0 |

The four counts are never null. With no data yet they are `0`.

## Counting rules

- **Today is the server's WIB date.** The device clock is never used to decide what counts.
- The browser keeps a marker `{ "tanggal": "yyyy-MM-dd", "urutan": 57 }`. The portal sends `marker.tanggal` as `tanggalTerakhir`.
  - `tanggalTerakhir` equals the server's today: **not counted**, `urutan: null`. The portal shows the `urutan` in its marker.
  - Anything else, or no parameter, and the User-Agent is not a bot: **counted**. The response carries the new `urutan` and the portal overwrites the marker.
- `urutan` comes from one atomic upsert per day. Two visitors never share a number and a day has no gaps (1, 2, 3, ...).
- Week, month and total are sums of the daily counts.
- A week that spans a month start is correct by definition: on Wed 1 Oct, Minggu Ini includes 29 and 30 Sep, Bulan Ini does not.

## Portal behaviour

| Topic | Behaviour |
|---|---|
| Marker | `localStorage` key `uks.kunjungan`, JSON `{ tanggal, urutan }`. Valid only when `tanggal` is a real `yyyy-MM-dd` date and `urutan` is a positive integer. Anything else is discarded and the visit is treated as the first of the day |
| Storage blocked or full | The marker is kept in memory instead, so the visit counts once per full page load and never on in-app navigation |
| Requests per page load | One. A module-level shared promise covers React StrictMode's double effect, remounts and every consumer of the hook |
| Several tabs at once | The call runs inside the Web Lock `uks-kunjungan` and re-reads the marker inside it, so tabs opened together queue and only the first counts. Without Web Locks, at most one extra count |
| Tab left open across midnight | When the tab becomes visible and the device's WIB date differs from `ringkasan.tanggal`, the call runs again. The server decides whether it counts. The numbers on screen stay until the new ones arrive, and the count-up does not replay |
| Count-up | The numbers count up once per page load, when the column first scrolls into view. With `prefers-reduced-motion: reduce` the final numbers show at once. Screen readers get the final numbers only |
| Setting | `pengunjung.tampilkanStatistik` from `GET /public/pengaturan`. The column is hidden only when the value is exactly `"false"`. A missing key, any other value, or a settings error means shown. Hiding never stops the counting |

### States

| State | What the visitor sees |
|---|---|
| Loading | The four row labels with grey placeholder bars. Screen readers hear "Memuat statistik pengunjung" |
| Data | The four counts. The "Anda adalah pengunjung ke-N hari ini" line shows only when `urutan` is a positive number |
| Error | The muted line "Statistik pengunjung belum tersedia". No retry button, and the rest of the page is unaffected |

A failed re-check after midnight keeps the numbers already shown.

## Edge cases

| Case | Result |
|---|---|
| Revisit hours later, same day | Not counted, same number shown |
| Wrong device clock | Harmless. The server's date is authoritative, so the same day is never counted twice |
| Corrupted or impossible marker (`{`, `2026-13-45`, `urutan: 0`) | Discarded, no `tanggalTerakhir` sent |
| Incognito, another browser, another device, cleared site data | Counted as a new visitor. This is inherent to the approach |
| Bot, crawler, blank User-Agent | Summary returned, not counted |
| API down, or endpoint not deployed yet | "Statistik pengunjung belum tersedia" in the footer column only |
| Request retried by the server's database retry policy | Very rarely one extra count. Accepted |

## Example

First visit of the day:

```
POST /api/v1/public/kunjungan
```

```json
{
  "urutan": 57,
  "ringkasan": {
    "tanggal": "2026-10-07",
    "hariIni": 57,
    "mingguIni": 412,
    "bulanIni": 1530,
    "total": 1530
  }
}
```

The browser now stores `{"tanggal":"2026-10-07","urutan":57}`. Coming back later the same day:

```
POST /api/v1/public/kunjungan?tanggalTerakhir=2026-10-07
```

```json
{
  "urutan": null,
  "ringkasan": {
    "tanggal": "2026-10-07",
    "hariIni": 63,
    "mingguIni": 418,
    "bulanIni": 1536,
    "total": 1536
  }
}
```

The portal shows "Anda adalah pengunjung ke-57 hari ini" from its marker, next to the fresh counts.

## Code

- `src/features/pengunjung/useKunjungan.js`: the call, the lock, the midnight re-check
- `src/features/pengunjung/kunjunganStorage.js`: marker validation and the in-memory fallback
- `src/features/pengunjung/jakartaDate.js`: the device's WIB date, used only as a re-check hint
- `src/features/pengunjung/components/StatistikPengunjung.jsx`: the footer column and its count-up
- `src/components/Footer.jsx`: calls the hook always and shows the column unless the setting is `"false"`
