const toItems = (list, fields) => list.map((item) => Object.fromEntries(
  Object.entries(fields).map(([to, from]) => [to, item[from]])
));

/** Section content per `tipe`, in the shape the section components render. */
const SECTION_MAPPERS = {
  audience: (isi) => ({
    items: toItems(isi.item, { title: 'judul', image: 'gambar' }),
    note: isi.catatan,
    noteSource: isi.sumberCatatan
  }),
  outcomes: (isi) => ({ items: toItems(isi.item, { title: 'judul', text: 'teks' }) }),
  table: (isi) => ({
    intro: isi.pengantar,
    columns: isi.kolom,
    rows: toItems(isi.baris, { level: 'jenjang', grades: 'kelas', text: 'teks' }),
    note: isi.catatan
  }),
  timeline: (isi) => ({ items: toItems(isi.item, { when: 'waktu', title: 'judul', text: 'teks' }) }),
  habits: (isi) => ({ items: toItems(isi.item, { title: 'judul', image: 'gambar', text: 'teks', url: 'url' }) }),
  contrast: (isi) => ({
    problem: { title: isi.masalah.judul, items: isi.masalah.item },
    answer: { title: isi.jawaban.judul, items: isi.jawaban.item },
    outcome: isi.hasil
  }),
  pillars: (isi) => ({
    items: toItems(isi.item, { letter: 'huruf', title: 'judul', subtitle: 'subjudul', text: 'teks' }),
    source: isi.sumber
  }),
  example: (isi) => ({ text: isi.teks, source: isi.sumber, related: isi.terkait }),
  resources: (isi) => ({
    groups: isi.grup.map((grup) => (grup.tampilan === 'jenjang'
      ? { title: grup.judul, variants: toItems(grup.item, { label: 'judul', kind: 'jenis', url: 'url' }) }
      : { title: grup.judul, items: toItems(grup.item, { title: 'judul', meta: 'keterangan', kind: 'jenis', url: 'url' }) }))
  }),
  prestasi: () => ({}),
  richtext: (isi) => ({ html: isi.html })
};

/**
 * Adapts a PublicProgramPrioritasDto (GET /public/program) to the shape
 * ProgramPicker and ProgramPanel render. A section with a `tipe` this build
 * does not know is dropped, and so is a resources section with no groups.
 */
export function mapProgram(dto) {
  return {
    id: dto.slug,
    navLabel: dto.labelNav,
    title: dto.judul,
    icon: dto.ikon,
    agency: dto.instansi,
    lead: dto.deskripsi,
    facts: dto.fakta.map((f) => ({ label: f.label, value: f.nilai })),
    image: dto.gambar && {
      src: dto.gambar.url,
      alt: dto.gambar.alt,
      caption: dto.gambar.keterangan,
      credit: dto.gambar.sumber,
      width: dto.gambar.lebar,
      height: dto.gambar.tinggi
    },
    sections: dto.bagian
      .filter((bagian) => SECTION_MAPPERS[bagian.tipe])
      .map((bagian) => ({ id: bagian.id, type: bagian.tipe, title: bagian.judul, ...SECTION_MAPPERS[bagian.tipe](bagian.isi) }))
      .filter((section) => section.type !== 'resources' || section.groups.length > 0),
    sources: dto.sumber
  };
}
