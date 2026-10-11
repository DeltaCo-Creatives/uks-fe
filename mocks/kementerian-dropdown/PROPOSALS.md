# Kementerian Terkait menu: three directions

Live mock: `http://localhost:5173/mocks/kementerian-dropdown/index.html` (deep links: `#dir=a|b|c|now&vp=desktop|short|mobile&kasus=normal|panjang|memuat|kosong|gagal`).
Files: `index.html` (self-contained), this file. Nothing under `src` was touched.

Design Read: a navbar megamenu in a public-service portal for school health staff, dinas and parents, in the site's own Tactile and Playful language (`:root` tokens, card-alt surfaces, Plus Jakarta Sans 800, rounded 4/8/12 ladder), dial ENERGY 2 / RHYTHM 2 / MOTION 1. No DESIGN.md exists, so the direction is the tokens plus the live site. The panel's hit area is never animated (index.css 2221-2228); only the existing 180ms opacity and 8px translateY remain.

Measured in the mock (Chrome, 1280 frame, live data, real Inter/Jakarta):

| | Sekarang | A | B | C |
|---|---|---|---|---|
| Desktop panel height | 539px | 524px | 555px | 392px to 433px (per tab) |
| Same, with the 58-char label | 618px | 595px | 584px | 392px to 518px |
| Mobile group body (375px) | 607px at 30px rows | 1160px at 44px | 1129px at 44px | 476px (first group open) |
| 1280x600 viewport | last row cut off, no scroll | scrolls inside | scrolls inside | fits |
| Empty space inside the shortest card | about 73% (Kemendagri) | about 40px | none (no cards) | none (pane hugs content) |

## Shared work (every direction needs this)

These come from research requirements R1 to R9 and are the same in A, B and C.

`Navbar.jsx`
- Desktop trigger (lines 201-217): `<a href="#kementerian-terkait">` becomes `<button type="button" aria-expanded={openMenu === 'kementerian'} aria-controls="nav-kementerian-panel">`. No `aria-haspopup`, this is a disclosure, not a menu.
- Every CSS rule that styles the trigger as `> a` must also match the button, or it loses its pill look, its hover color and its hover bridge: `index.css` 362-363, 381-382, 387-390 (pill and hover) and 2172, 2176 (the 44px bridge). Change them to `> a, > button`. The mock holds the panel open with JS, so it does not exercise the bridge: re-test the diagonal path from trigger to panel in the app.
- On the `.nav-item-has-dropdown` wrapper add `onKeyDown` (Escape: `setOpenMenu(null)` and focus the trigger through a ref) and `onBlur` (`if (!e.currentTarget.contains(e.relatedTarget)) setOpenMenu(null)`). Same handlers for the UKS/M trigger (lines 93-110), about +12 lines shared.
- Mobile search row (lines 264-265): `color: var(--brand-deep)` on brand-light (4.81:1, today 3.35:1) and `background: var(--brand-deep)` when active (white on brand-primary is 4.31:1). A, B and C show the fixed row; Sekarang shows the live one.
- Mobile group (lines 352-388): the `<div onClick>` header becomes `<button className="nav-mobile-group-header" aria-expanded aria-controls>`. Drop the count text (`{n} Kementerian Terkait:` becomes `Kementerian Terkait`). External links also call `closeMenus` (desktop already does, mobile does not). Hamburger gets `aria-expanded`, `aria-controls` and an Indonesian `aria-label` ("Menu navigasi", today "Toggle Navigation Menu").

`NavKementerianDropdown.jsx`
- Read `{ data, loading, error, retry }` from `useKementerianList()` (the Kontak page already does). Replace the "stay silent" comment with a status block: loading `role="status"`, empty, and failed with `Coba Lagi`. No `role="alert"`.
- After `Coba Lagi` the button is replaced by the loading block, so focus would fall to `<body>`: move it back to the trigger (the mock does this).
- Give the wrapper `id="nav-kementerian-panel"`, delete the inline `width: 840px` and every inline style, delete `onMouseEnter/onMouseLeave` on links, delete `totalLinks`.
- Every link: `<span>{label}</span><span className="sr-only"> (membuka tab baru)</span><i aria-hidden>` plus the glyph.

`index.css`
- Delete the CSS `:hover` selectors at 2211 and 2243 (`.nav-item-has-dropdown:hover .nav-cluster-dropdown ...`). The JS `openMenu` already opens on `mouseenter`, so these only make `:hover` beat Escape (WCAG 1.4.13). Re-test the diagonal path from trigger to panel after removing them (the 44px `a:hover::after` bridge stays).
- `.nav-cluster-panel`: drop `backdrop-filter` (blur stacking, finding 11), set `background: var(--bg-card)`, add `max-height: calc(100dvh - 130px); overflow-y: auto; overscroll-behavior: contain`.
- `.nav-cluster-dropdown`: `width: var(--nav-dd-w, 780px)`; the Kementerian panel sets `--nav-dd-w`.
- Touch: `@media (pointer: coarse) { .nav-kem-link { min-height: 44px } }` for A and B. The desktop panel also opens on a touch laptop or a landscape tablet wider than 1024px, where 36px and 40px rows are under the 44px tap size.
- Mobile: `.nav-mobile-menu` `max-height: calc(85dvh - 70px)` plus `overscroll-behavior: contain`, and a solid `background: var(--bg-card)` with no `backdrop-filter` (the `.98` alpha showed nothing through it); `.nav-mobile-group-header` loses `text-transform: uppercase` and `letter-spacing`, becomes brand-deep, 44px min height (this also changes the UKS/M header, intentionally, so the two match).
- Specified, not mocked: between 601px and 1024px cap the drawer (`max-width: 560px; left: auto`) so tablets do not get a stretched stack (R8).
- Add `prefers-reduced-motion: reduce` for the nav (today only `.load-bar` is guarded): no panel `translateY`, no hover lift.
- Do not use `var(--spring)` (`all`) on dense links: it also animates the focus ring in over 0.5s. List the properties instead (the mock does).

Text rules used by all three: brand text under 18px is `--brand-deep`; links use `var(--radius-sm)` (the undefined `--radius-xs` is gone); one 3px `--text-primary` focus ring with 2px offset on every control; the external glyph is 10px solid `--text-secondary` (5.5:1 on card-alt), explained once by a plain-text legend "Dibuka di tab baru" in the header.

Contrast, computed with `antislop-human/contrast-check.py`: text-primary on card-alt 15.15, brand-deep on white 6.20, brand-deep on brand-light 4.81, text-secondary on card-alt 5.52 and on white 6.37, white-78% on text-primary 10.94. Non-text: yellow on brand-deep 4.29 (icon, needs 3), brand-primary borders on white 4.31 and on brand-light 3.35 (needs 3).

Full sweep (second pass): 86 text and icon pairs through the same script, including hover, focus, active, selected, the inert bar and drawer rows, the mock's own page text and the focus ring. Every pair A, B and C use passes AA (74 pairs). One inert drawer row, "Pencarian Direktori UKS" in brand-primary on brand-light at 3.35, failed and was changed to brand-deep at 4.81. Of the 11 Sekarang pairs, 5 still fail on purpose because they are the baseline's own defects: capsule 3.35, link hover 4.31, faded external icons 2.49 on desktop and 2.17 on mobile, mobile group label 4.13 (4.31 on pure white). The link boundary in B and C is 1.0 to 1.2:1 against its surface (B border 1.23, C card on pane 1.15), which is below 3:1 but is not what identifies the link: the label (15:1 or more) and the external glyph (5.5:1 or more) do, hover and focus move the border to 3.35:1 or more, and the focus ring is 13:1 or more. That faint border is the same `rgba(17, 28, 22, 0.1)` the Kontak tiles use.

### Purpose-Gate reasons (R-31), shared by A, B and C

| Technique | Where | One-line reason |
|---|---|---|
| Badges (R-09) | None left. "Dibuka di tab baru" and "3 tautan" are plain text | A legend and a count are not controls, so they get no capsule, border or dot. Uppercase capsule exists only in Sekarang |
| Arrow glyph (R-08) | The external-link glyph on each link | It says the click opens a new tab, backed by a hidden "(membuka tab baru)" and the header legend. 10px, solid, `aria-hidden`. Chevrons only show disclosure state (trigger, group header, accordion); C's chevron on the selected tab points at the pane it drives. No decorative arrows on buttons |
| Icons (R-04) | Font Awesome 6.5.2, the site's own set. `ikon` from the CMS in each tile | heart-pulse for health, book-open for education, mosque for religion, building-columns for home affairs, utensils for nutrition. No sparkle or star set, no Lucide. Spinner, triangle and columns glyphs are the loading, failed and empty states |
| Shadow (R-12) | `.dd-panel` `0 24px 60px` at .16, and the C link hover `0 12px 28px` green at .14 | Same values as `.nav-cluster-panel` and `.nav-cluster-card:hover`. The panel is the one surface floating over the page; the hover shadow marks the one link under the pointer. Cards, tiles and rows carry none |
| Blur (R-10) | Only the bar's `blur(24px)`, which is the site's pill | Panel and drawer are solid white in A, B and C, so one blur is in view on desktop and on mobile. Sekarang has two (bar plus panel, bar plus drawer) |
| Palette (R-29) | Green family (primary, deep, light: one hue), one yellow accent, neutrals | No color was added to `:root`. Yellow appears once per view inside the proposal: the wide card's tile (A), the selected tab (C), the open accordion tile (C mobile). B has no yellow; green hover is its only accent |
| Uppercase and tracking (R-06) | None in A, B, C | Tracking is the site's `-0.03em` on headings. The uppercase 11px mobile header and the uppercase capsule exist only in Sekarang |
| Typeface (R-06) | Plus Jakarta Sans 800 for names, Inter 500 and 600 for links | They are the two faces `index.html` already loads, not a new pick |
| Radius (R-11) | 4px tiles and rows in cards, 8px links and cards, 12px panel and tabs | The site's 4/8/12 ladder. Pill only on the bar, the drawer's own rows (context) and `Coba Lagi` (the site's button shape) |
| Motion (R-19) | Existing 180ms opacity and 8px `translateY` on the panel, 150ms color on hover, and in C a 2px spring lift on links | MOTION 1. The panel's hit area is never scaled or clipped. The lift runs only on hover-capable fine pointers with motion allowed, because the link is the thing being lifted |
| Gradient, glow, grid (R-01, R-07, R-13) | None in the proposals. The only gradient is the black scrim behind the context photo, copied from `Hero.jsx` | Nothing to justify |
| Dials | ENERGY 2 / RHYTHM 2 / MOTION 1 | A and C break their grammar where content weight differs (wide card, short list). B is closest to RHYTHM 1: its only break is row height |

---

## A. Kartu Berbobot (weighted cards)

Concept: keep the tactile card-alt cards, but let content weight set the card size. Any group with 6 or more links spans two columns and lists its links in two columns; the rest sit three across. BGN stops sitting alone, Kemendikdasmen stops being a tall empty box, and the wide card gets the one dark tile with the yellow glyph, so the eye has a focal point. Links become `text-primary` 13px/500 instead of 12px grey, because links are the action.

```
+--------------------------------------------------------------------------+
| (link) Kementerian Terkait & Direktorat Pembina UKS/M    (ext) Dibuka di tab baru |
|--------------------------------------------------------------------------|
| +-----------------+ +--------------------------------------------------+ |
| | [h] Kemenkes RI | | [book*] Kemendikdasmen RI                        | |
| |-----------------| | Kementerian Pendidikan Dasar dan Menengah        | |
| | Kementerian K.  | |--------------------------------------------------| |
| | Ayo Sehat       | | Ditjen PAUDDIKDASMEN (ext)   Direktorat PAUD (ext)| |
| | Perangkat Ajar  | | Direktorat SD (ext)          Direktorat SMP (ext) | |
| |                 | | Direktorat SMA (ext)         7KAIH (...)  (ext)   | |
| +-----------------+ | Dasbord MBG (ext)            Stratifikasi (ext)   | |
|                     +--------------------------------------------------+ |
| +----------------+ +----------------+ +----------------+                 |
| | [m] Kemenag RI | | [b] Kemendagri | | [u] BGN        |                 |
| | Kementerian    | | Kementerian    | |----------------|                 |
| | Agama          | | Dalam Negeri   | | Badan Gizi N.  |                 |
| | Dir. KSKK      | | Dir. SUPD      | +----------------+                 |
| | Dir. Pesantren | +----------------+                                    |
| +----------------+            * dark green tile, yellow glyph            |
+--------------------------------------------------------------------------+
Mobile: Kementerian Terkait [button]   cards stacked, all open, 44px link rows
```

Reasons (R-31):
- Color: card-alt cards and brand-light tiles as today, one `--brand-deep` tile with the `--brand-accent` glyph on the wide card, because the span already made it the focal point and the site uses that yellow only at key moments.
- Layout: 3 columns. Only the heaviest instansi (6 links or more) spans two columns and gets the dark tile; when a card would not fit a row, the card before it widens to close the gap, and the last card widens to close the final row. CMS order is kept, so Tab order is visual order.
- Type: Plus Jakarta 800 15px for the instansi, 12px `nama` caption, Inter 500 13px links, so links read before the chrome.
- Spacing: gap 14 and padding 14 as today, 36px link rows 2px apart, which is the density the current 12px list already had.
- Cards: card-alt surface kept; the card itself does not lift because it is not a link, only the link row gets the white fill and green border.
- Icons: CMS `ikon` in a 44px tile (the size of `.nav-cluster-icon`); heart-pulse, book-open, mosque, building-columns and utensils each name the ministry's field.

Code mapping:
- `NavKementerianDropdown.jsx`: rewrite, about +70 / -90 (no inline styles). `const WIDE_AT = 6`; only the group with the most links gets span 2 and the solid tile, and only when it has `WIDE_AT` links or more. `packSpans(base)` (about 8 lines, pure) turns base spans into final spans with no holes; the mock self-checks it on 9 cases (live data, growth data, wide card last or third, 1, 2, 4 and 0 cards). Inner link columns are `min(span, links)`. `showNama(group)` hides the caption when a link label already equals `nama` (Kemenkes and BGN).
- New classes: `.nav-kem-grid`, `.nav-kem-card` (+ `.span-2`, `.span-3`), `.nav-kem-links` (+ `.cols-2`, `.cols-3`), `.nav-kem-head`, `.nav-kem-links`, `.nav-kem-link`, `.nav-kem-note`, `.nav-kem-state`. Reuse `.nav-cluster-icon` with two modifiers (`.is-inline` removes the bottom margin, `.is-solid` for the dark tile). Keep `.nav-cluster-*` (the UKS/M panel still uses them). CSS about +75 / -0.
- `Navbar.jsx` mobile: replace lines 365-388 with stacked cards, about +30 / -25.
- Total with shared work: about +230 / -170.

Risks:
- The span threshold is a magic number; two groups with 6 or more links give two wide cards.
- If the wide group lands in the last column of a row it wraps and leaves a hole. Use `grid-auto-flow: dense` and accept that tab order can differ from the visual order by one card, or sort wide groups first in the component.
- Cards in a row stretch to the tallest. With the long label the Kemenkes card has about 130px of empty space (the stress case in the mock).
- Mobile cost: 1160px at 44px targets. Pair it with the accordion from C on mobile.

Data/CMS: none required. Nice to have: `nama` filled (the caption falls back to nothing), `unit` as a second caption line, `logoUrl` image inside the tile with the FA icon as fallback (as Kontak does).

---

## B. Direktori Baris (directory rows)

Concept: one row per instansi. Identity on the left (tile, name, full name), links on the right in a flowing grid of bordered link buttons. Row height follows the link count, so 8 links and 1 link are both just a row, with no box to leave empty and no orphan. Only clickable things carry a border, so the identity side reads as a label and the right side reads as buttons.

```
+--------------------------------------------------------------------------------+
| (link) Kementerian Terkait & Direktorat Pembina UKS/M        (ext) Dibuka di tab baru |
|--------------------------------------------------------------------------------|
| [h]    Kemenkes RI       [Kementerian Kesehatan] [Ayo Sehat Kemenkes] [Perangkat..] |
|--------------------------------------------------------------------------------|
| [book] Kemendikdasmen RI [Ditjen PAUDDIKDASMEN]  [Direktorat PAUD]    [Direktorat SD] |
|        Kementerian Pend. [Direktorat SMP]        [Direktorat SMA]     [7KAIH (...)]   |
|        Dasar dan Menengah[Dasbord MBG]           [Stratifikasi UKS/M]                  |
|--------------------------------------------------------------------------------|
| [m]    Kemenag RI        [Direktorat KSKK]       [Direktorat Pesantren]               |
| [b]    Kemendagri RI     [Direktorat SUPD]                                            |
| [u]    BGN               [Badan Gizi Nasional]                                        |
+--------------------------------------------------------------------------------+
Mobile: section per instansi (tile + name), full-width 44px bordered link buttons, rules between
```

Reasons (R-31):
- Color: no tinted surfaces; 1px rules and the green hover carry the structure, so the 15 links are the only bordered things.
- Layout: row per instansi because the content is a directory (an institution and its destinations), and the same grammar stacks on mobile.
- Type: Plus Jakarta 800 15px name, 12px full name, Inter 500 13px links, as in A.
- Spacing: 14px between rows, 8px between link buttons, 20px gutter between identity and links.
- Cards: no cards. The bordered link buttons echo the ministry tiles on the Kontak page (1.5px rule, brand border and brand-light fill on hover).
- Icons: tile on the identity side only, so the link side stays quiet.

Code mapping:
- `NavKementerianDropdown.jsx`: rewrite, about +55 / -90. New classes: `.nav-kem-list`, `.nav-kem-row`, `.nav-kem-id`, `.nav-kem-links`, `.nav-kem-link`, `.nav-kem-note`, `.nav-kem-state`. CSS about +70.
- `Navbar.jsx` mobile: sections plus bordered link buttons, about +30 / -25.
- Total with shared work: about +210 / -170. The simplest of the three: no state, no thresholds, no ordering edge case.

Risks:
- Tallest panel (555px), so on a 600px laptop it scrolls inside its max-height.
- It can read as a table and is the plainest of the three, the least "tactile".
- With the 58-char label a link wraps to 3 lines in a 194px column and stretches its row.
- It is the closest to RHYTHM 1 and the only one with no yellow accent, so it has the weakest focal point of the three.
- The 216px identity column is fixed, so a very long `singkatan` wraps.

Data/CMS: none required, same optional fields as A.

---

## C. Lobi Instansi (rail and pane)

Concept: choose the instansi first, then see its links. A vertical rail of five tabs on the left and one pane on the right reuse the `.lobby-tab` idea from the Program and Publikasi pages (dark active tab, yellow glyph on the active icon). Each tab states how many links sit behind it, so nothing is hidden silently. On mobile the same markup is a single-open accordion, which is the best mobile form of the three.

```
+----------------------------------------------------------------------+
| (link) Kementerian Terkait & Direktorat Pembina UKS/M  (ext) Dibuka di tab baru |
|----------------------------------------------------------------------|
| +------------------+  +--------------------------------------------+ |
| |[heart*] Kemenkes >|  | [h] Kemenkes RI                            | |
| |  3 tautan  (dark) |  |--------------------------------------------| |
| | [book] Kemendik..  |  | Kementerian Kesehatan                 (ext)| |
| |  8 tautan          |  | Ayo Sehat Kemenkes                    (ext)| |
| | [m] Kemenag RI     |  | Perangkat Ajar Kesehatan              (ext)| |
| |  2 tautan          |  +--------------------------------------------+ |
| | [b] Kemendagri RI  |       * yellow glyph on the selected tab only    |
| | [u] BGN            |                                                  |
| +------------------+                                                  |
+----------------------------------------------------------------------+
Mobile: Kementerian Terkait [button] > 5 rows [tile name, n tautan, chevron], one open at a time
```

Reasons (R-31):
- Color: dark active tab plus yellow glyph is the one place the site already uses that accent (`.lobby-tab.active`); the pane is card-alt with white link cards.
- Layout: rail plus pane shows one group at a time, so 1 and 8 links both fit, and the rail (about 300px) is the height floor so a tab click never moves the pointer out of the panel.
- Type: Plus Jakarta 800 14px tab names, 12px count in text-secondary, 18px pane title, Inter 600 14px links.
- Spacing: 56px rail items with 4px gaps, 18px pane padding, 48px link cards with 8px gaps.
- Cards: only links are cards, and they lift 2px on hover (hover-capable, motion-allowed devices only) because the link is the thing you click. Groups with 3 links or fewer list in one column.
- Icons: a tile in each tab, none repeated in the pane head, so the accent appears once.

Code mapping:
- `NavKementerianDropdown.jsx`: rewrite with `useState` for the selected index and a tab `onKeyDown` (Up, Down, Home, End, about 12 lines), about +100 / -90. New classes: `.nav-kem-body`, `.nav-kem-rail`, `.nav-kem-tab`, `.nav-kem-pane`, `.nav-kem-links`, `.nav-kem-link`, `.nav-kem-note`, `.nav-kem-state`. CSS about +95. Reset the selection when the data changes.
- `Navbar.jsx` mobile: accordion with `useState` for the open index, about +45 / -25.
- Total with shared work: about +260 / -170.

Risks:
- 12 of the 15 links are hidden until you pick a tab, which works against the point of a megamenu. The per-tab count is the mitigation.
- A user who hovers the trigger and then expects hover on the rail to switch groups gets nothing; switching is click and keyboard only. A short hover-intent delay could be added later.
- The most code and the most ARIA (tablist inside a disclosure nav), so the most to keep correct.
- Pane height changes with the group (instant, not animated). BGN's pane is about 160px next to a 300px rail, which leaves white space to its right.

Data/CMS: none required. The tab count is computed from `tautan.length`.

---

## Growth: what happens when links are added

Case `Banyak tautan` in the mock: 7 instansi, 30 links (Kemenkes 7, Kemendikdasmen 12, Kemenag 4, plus KemenPPPA and BKKBN as examples). Added links are test data (`href="#"`). Comparison image: `growth-desktop.png`.

| | Sekarang | A | B | C |
|---|---|---|---|---|
| Panel height, 15 links | 537px | 522px | 553px | 390px to 431px |
| Panel height, 30 links | 751px, no max-height, bottom unreachable on most laptops | 1003px, scrolls inside the panel | 989px, scrolls inside the panel | 510px to 543px, fits |
| Fits without scrolling (panel max is `100dvh - 130px`) | n/a | viewport 1133px tall or more | 1119px or more | 673px or more |

- A with the first rule (every group with 6+ links is wide) broke at growth: a hole next to Kemenkes and two dark tiles, so two focal points. Fixed with the heaviest-only rule and `packSpans` above. What remains: row height follows the tallest card, so short cards beside a tall one get empty space again (Kemendagri and BGN beside Kemenag's 4 links).
- B never breaks, it only gets longer: every new instansi adds a row of about 70px, every 3 links add a line of about 50px.
- C grows the slowest: the rail adds about 60px per instansi, the pane only shows the selected group (12 links = 6 rows). Up to about 9 instansi the panel stays under 650px.
- Mobile: C's accordion grows by one 56px header per instansi, whatever the link count. A and B stack every link.
- Rule of thumb: A is right while the list stays around 5 to 6 instansi and 20 links or fewer. If the CMS list is expected to grow past that, use C on desktop as well, since it is the only direction whose height does not follow the total link count.

## Recommendation

A on desktop, with C's accordion on mobile.

- A is the smallest step in the design language: same card-alt surfaces, same 44px tile as the UKS/M megamenu, same green hover. Visitors who know the UKS/M panel will not have to learn a second one.
- All 15 links stay visible, which is what a megamenu is for. C hides 12 of them behind a tab, and B is the plainest and the tallest (555px).
- One rule derived from the data (6 or more links gets two columns) removes the orphaned BGN row, the 73% empty Kemendagri card, and the flat hierarchy at the same time, and it keeps working when the CMS adds a link.
- Mobile is separate markup already (`Navbar.jsx`), so mixing costs nothing. The accordion keeps the group at 476px against 1160px for A's stacked cards at 44px targets, and the open group is at most 8 rows.
- If a plainer, lower-risk change is preferred, B is the fallback: no state, no thresholds, no ordering edge case.

## Antislop findings from research

Fixed by all three (shared work plus each direction's markup):
- 1, 2 contrast: capsule gone, brand text under 18px is brand-deep, icon is solid 5.5:1. The mobile label too.
- 3 JS-only hover and no focus: CSS `:hover` and `:focus-visible`, trigger is a button with `aria-expanded` and `aria-controls`, Escape works from the trigger and the panel and returns focus, the panel closes when focus leaves.
- 4 mobile group header is a `div`: now a button with `aria-expanded`.
- 5 tap targets: 44px minimum on mobile (measured, 44px and above for every control in the group).
- 6 silent states: loading, empty and failed blocks, with `Coba Lagi`.
- 7 "5 kementerian" counted a badan: no count in A and B; C counts `n tautan` per instansi only.
- 9 uppercase 10px capsule: replaced by a 12px plain-text legend (it is not a control).
- 10 repeated external icon: kept as the written exception, solid 10px, `aria-hidden`, with a hidden "(membuka tab baru)" on every link and a visible legend in the header.
- 11 blur stacking: panel is solid white.
- 12 undefined `--radius-xs`: `--radius-sm`.
- 13 inline styles: classes.
- 14 no tile, no `nama`: tile plus caption in every direction.
- 15 pill rows with two-line labels: radius 4 or 8.
- 16 `vh`: `dvh`.
- 18 mobile uppercase tracked header: sentence case.
- 17 mobile external links do not close the drawer: in the shared work list, not demonstrable in a static mock.

Differs by direction:
- 8 five identical cards and the 4+1 orphan row: A through the span rule, B by dropping cards, C by showing one group at a time.
- Hierarchy: A by size and the one dark tile, B by row height and bordered links, C by the selected tab.

## Verification (R-35)

Designer's run, in headless Chrome against the Vite dev server with a CDP driver: 86 checks, 0 failures, console clean (the only message is the dev server's missing favicon). The driver was not kept in the repo, so this list cannot be re-run from this folder. The element-by-element click-through the Delivery Gate asks for (R-35) is a separate step and was not part of the review pass below.

Review pass (measured in the browser pane against the same dev server, not a click-through): the heights and tap sizes in the table above reproduce, with one correction (C with the long label reaches 518px, not 433px). Re-measured after the review fixes: every control in the mobile group is 44px or taller in A, B and C, with 4px or more between neighbours; no element leaves the drawer and no label is clipped at 375px, and the same holds at 320px with the long label open; the accordion stays in step with its `aria-expanded` after switching case or viewport; after `Coba Lagi` focus lands on the trigger (desktop) or the hamburger (mobile).
- Desktop A, B, C: trigger click closes and reopens (`aria-expanded`, computed visibility), Enter opens, Escape on the trigger closes and keeps focus, Tab from the trigger lands on the first link, Escape inside the panel returns focus to the trigger, focus moving outside closes the panel.
- Keyboard focus shows the 3px `--text-primary` ring on a link in A, B and C. Real `:hover` gives brand-deep text on white (A, C) or brand-light (B) with a brand border.
- C desktop: click, Down, Up (wraps), Home and End change the selected tab and only one pane is displayed.
- Stress: A, B, C with the 58-char label show no horizontal overflow; the `#` test link is intercepted; the long label stays inside the C mobile drawer.
- States: failed shows the message and `Coba Lagi`; pressing it shows the loading text, then 15 links. Loading, empty and failed render in all three desktop and mobile forms.
- Mobile A, B, C: drawer open, group toggle collapses and expands (`aria-expanded`), hamburger closes and opens, Escape closes the drawer and returns focus to the hamburger, no horizontal overflow, every visible control in the group is 44px or taller, C accordion is single-open.
- 1280x600: Sekarang is clipped (panel bottom at 629 in a 600 frame), A and B scroll inside the panel, C fits.
- Mock controls: direction tabs (Right, End, wrap), viewport and case buttons.
- Not run: a screen reader, a real touch device, Firefox and Safari, tablet widths (the R8 drawer cap is specified only).

## Data and content to confirm (outside the three designs)

- `nama` is not in any repo. The mock shows plain expansions of `singkatan` (Kementerian Kesehatan, Kementerian Agama, Kementerian Dalam Negeri); only Kemendikdasmen (`KontakAlamat.jsx:46`) and BGN (wireframe 3) are confirmed. The CMS must fill it, and the caption disappears when a link label already says it.
- Link URLs for the 8 Kemendikdasmen links and the rest come from the old prototypes (`full-site-uks-fe-4/src/data/nav.js`, `full-site-uks-fe-3` scrape) and are unverified against the live database.
- `url` (group homepage), `logoUrl` and `unit` were not found, so no direction depends on them. Later options: the instansi heading becomes a link when `url` exists, and BGN's single link (which repeats its own name) could then collapse into the heading.
- Content: "Dasbord MBG" is spelled "Dasbor" in the prototypes and in standard Indonesian.
- "Pencarian Direktori UKS" in the mobile drawer is brand-primary on brand-light (3.35:1) in `Navbar.jsx:264-265`, the same R-25 failure as the old capsule. It sits outside the Kementerian group, but A, B and C show it fixed and the shared work lists the change.
- The product label "Kementerian Terkait", the three state messages and the Kontak page all say "kementerian" for a list that includes BGN, which is a badan. The proposals drop the count that made this visible and leave the label alone; renaming it (for example "Instansi Terkait") is the owner's call.
- State copy is lifted from the Kontak page: loading and the failed title are identical, the empty title is identical, the empty body says "tautan" instead of "kementerian mitra", and the failed body drops "kementerian".
- The "Label panjang" case adds one test link (`Direktorat Sekolah Menengah Kejuruan dan Pendidikan Khusus`, `href="#"`). It is stress data, labelled as such under the case buttons, and is not part of the CMS content.
