# Claude Wireframe

Bare, static wireframes for the UKS site — no toolbar, no device switcher,
no JS. Just annotated boxes so the structure is easy to scan. Separate from
the `wireframe/` folder (not touched by this set).

Open `index.html` directly in a browser, or serve the folder statically.

## Files

- `style.css` — shared dark "blueprint" theme (all pages import this one file)
- `index.html` — **Beranda**, the current homepage, section by section
- `program-detail.html` — news/program detail (**new**, no route exists yet)
- `perpustakaan.html` — full library page: filters, grid, PDF-modal state (**new**)
- `galeri.html` — browsable gallery + lightbox state (**new**)
- `kontak.html` — contact page with form (**new**; today `#kontak` is only a footer anchor)

## Reading the annotations

- **Cyan tag** (top-right of a section) = this exists in the live app right
  now. It names the exact source: `Programs.jsx · defaultBerita[3]`, etc.
- **Orange tag / dashed orange outline** = new, not built yet. A dashed
  outline on an existing element (a button, a card) marks the thing that
  should navigate to one of the new pages, and names which one.
- Gray horizontal bars = placeholder body text (length signals line count,
  not real copy). Actual headings/labels are the real Indonesian copy from
  `src/data/mockData.js` so the content structure reads accurately.
- Each page has a top bar (status + route + links to the other 4 pages) so
  you can jump between them without a server.
