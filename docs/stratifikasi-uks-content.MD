# `/stratifikasi-uks` — Content Specification

Scraped live from `https://portal-uks.demo.or.id/stratifikasi-uks` (DEV/V2 build). Reachable from the header's **UKS/M** menu. This one turned up the most significant findings of the three pages audited so far — read the flags before the content.

## 🚩 Flag 1: the page fetches real CMS content and renders none of it

The Inertia JSON carries a `stratifikasiList` prop — **4 real CMS records** (`Deskripsi`, `Tujuan`, `Stratifikasi UKS SD`, `Perhitungan Stratifikasi UKS/M`), each with a proper `konten` rich-text field. This looked, at first, like the CMS-backed content source for the page.

It isn't used. Confirmed by searching the actual rendered page's `innerText` for unique phrases from each of the 4 records — **zero matches, for all four**. The entire visible page (2,199 characters) is separate, hardcoded text baked into the `Stratifikasi/Index` component. The 4 CMS records are fetched on every page load and then thrown away client-side.

## 🚩 Flag 2: most of that unused payload is a bloated image, not text

Of the ~197KB the 4 CMS records carry combined, **~170KB (86%) is JPEG images pasted directly into the rich-text field as base64 data URIs** — not uploaded to a media library and referenced by URL, but inlined character-for-character into the `konten` string:

| Record | Total size | Image (base64) | Actual text |
|---|---|---|---|
| Deskripsi | 35,161 chars | 33,706 chars | ~660 chars |
| Tujuan | 136,799 chars | 136,183 chars | ~150 chars |
| Stratifikasi UKS SD | 23,942 chars | 0 (real table, see below) | ~23,900 chars |
| Perhitungan Stratifikasi UKS/M | 1,874 chars | 0 | ~1,874 chars |

Since none of this renders anyway (Flag 1), it's currently pure waste on every request to this route — ~170KB of dead base64 image data shipped to every visitor's browser for content that never appears. If this data does get wired up in the rebuild, those two images need to go through a real asset pipeline first.

## 🚩 Flag 3: the strata names disagree with themselves, on the same page

The page's own hardcoded hero text names the four tiers **"Dasar, Madya, Utama, Paripurna."** But:
- The **homepage's** Stratifikasi section names them **"Minimal, Standar, Optimal, Paripurna"** (with codes 01–04).
- This page's own **unused CMS content** — all 4 records, independently — consistently say **"Minimal, Standar, Optimal, Paripurna"** too.
- The genuinely detailed scoring table (Flag 4 below) uses **"Minimal, Standar, Optimal, Paripurna"** as its actual column headers.

So three independent sources agree on one naming scheme, and only this one page's rewritten hero copy uses a different one. This reads like a copy mistake made while writing the V2 redesign's hero text, not an intentional rename — worth confirming with whoever owns the content before either name ships for real.

## 🚩 Flag 4: real, valuable content exists that nothing currently shows

The `Stratifikasi UKS SD` record contains a genuine, detailed scoring rubric — a 6-column table (`No`, `Indikator`, `Minimal`, `Standar`, `Optimal`, `Paripurna`) with one row per Trias UKS/M category, each cell listing the specific requirements a school must meet at that tier. This is real substantive content — full table reproduced below — but it currently exists **only for jenjang SD**. There's no equivalent `stratifikasi-uks-smp`, `-sma`, or `-paud` record in the CMS list, and even the one that exists isn't displayed anywhere on the live site.

If the goal is an actual self-service "check what tier your school qualifies for" experience, this table is the right shape of content to build it from — it just needs the other 3 education levels written, and a page built to actually show it.

---

## Hardcoded page content (what actually renders)

**H1:** Stratifikasi UKS

**Section: "Apa itu Stratifikasi UKS/M?"**
> Stratifikasi UKS/M adalah alat bantu untuk mengetahui apa yang sudah dicapai dan apa yang masih perlu dilakukan satuan pendidikan, agar dapat mencapai strata Dasar, Madya, Utama, hingga Paripurna.

**Section: "Tujuan Stratifikasi UKS"** — 4 cards:

| Judul | Deskripsi |
|---|---|
| Alat Ukur Trias UKS | Mengukur pelaksanaan tiga program pokok UKS di satuan pendidikan. |
| Strategi Peningkatan Mutu | Menjadi dasar perbaikan kualitas pelaksanaan UKS/M di sekolah. |
| Sistem Monev | Bagian dari sistem monitoring dan evaluasi yang berkelanjutan. |
| Alat Capaian & Rekomendasi | Dasar penyusunan rekomendasi tindak lanjut bagi sekolah. |

**Section: "Cara Penilaian"**
> Sekolah/madrasah harus memenuhi seluruh indikator (pendidikan kesehatan, pelayanan kesehatan, pembinaan lingkungan sekolah sehat dan manajemen UKS/M) pada kelompok stratifikasi UKS/M tertentu (dasar atau madya atau utama atau paripurna).

**Section: "Indikator"**
> Sekolah harus memenuhi seluruh indikator berikut pada kelompok strata yang sama.

Then 4 blocks, one per strata (using the page's own "Dasar/Madya/Utama/Paripurna" names — see Flag 3), each with identical structure:

> **[STRATA NAME]**
> Apabila sekolah telah memenuhi seluruh indikator [strata]:
> 1. Pendidikan kesehatan
> 2. Pelayanan kesehatan
> 3. Pembinaan lingkungan sehat di sekolah sehat
> 4. Manajemen UKS/M

*(All 4 blocks list the exact same 4 category names — the block only names the categories, it doesn't say what's actually required at that level. That detail is what the unused `Stratifikasi UKS SD` table actually has — see below.)*

**Closing CTA:** "Masuk ke Dasbor Stratifikasi UKS/M" → `https://stratifikasiuks.org/`

This is the same finding as prod: prod's entire "Stratifikasi UKS/M" nav item skips straight to `stratifikasiuks.org` with no internal page at all. Dev keeps an internal explainer page but ends at the same external destination. Both sites agree the real interactive tool lives off-site — the only question is whether to keep it that way for the rebuild.

---

## Unused CMS content — Deskripsi (`slug: deskripsi`)

Real text (image stripped):

> **Definisi Stratifikasi UKS/M**
> Alat ukur kinerja yang dilakukan oleh sekolah dan Puskesmas (Tim Pelaksana UKS/M Kecamatan) serta Kementerian di pusat atau OPD terkait di Kab/Kota (Tim Pembina UKS/M Kab/Kota) terkait kegiatan trias UKS/M, yakni Pendidikan Kesehatan, Pelayanan Kesehatan dan Lingkungan Sekolah Sehat.
>
> **Maksud Stratifikasi UKS/M**
> Dijadikan sebagai alat bantu untuk mengetahui apa yang sudah dicapai dan yang harus dilakukan satuan pendidikan untuk mencapai strata minimal, standar, optimal dan paripurna.
>
> **Penilaian Stratifikasi UKS/M**
> Bersifat absolut untuk semua kegiatan yang tercantum dalam daftar indikator minimal/standar/optimal/paripurna harus terlaksana/terpenuhi seluruhnya, baru satuan pendidikan dapat menyatakan UKS/M pada satuan pendidikan tersebut berada pada tingkat minimal/standar/optimal/paripurna.

*(Plus one embedded JPEG, ~34KB base64, not extracted here — needs to be re-sourced as a real uploaded asset if this content gets used.)*

## Unused CMS content — Tujuan (`slug: tujuan`)

Real text (image stripped) — this is the actual source the hardcoded "Tujuan Stratifikasi UKS" section above appears to have been copied from:

> **Tujuan Stratifikasi UKS**
> Tujuan stratifikasi UKS/M adalah: Alat Ukur Trias UKS, Strategi Peningkatan Mutu, Sistem Monev, Alat Capaian dan Rekomendasi.

*(Plus one embedded JPEG, ~136KB base64 — the single largest chunk of dead weight in this page's entire payload.)*

## Unused CMS content — Perhitungan Stratifikasi UKS/M (`slug: perhitungan-stratifikasi-uks-m`)

Full text, no images:

> **Cara Perhitungan Stratifikasi UKS/M**
> Sekolah/madrasah harus memenuhi seluruh indikator (pendidikan kesehatan, pelayanan kesehatan, pembinaan lingkungan sekolah sehat dan manajemen UKS/M) pada kelompok stratifikasi UKS/M tertentu (minimal atau standar atau optimal atau paripurna).
>
> - Sekolah memiliki stratifikasi UKS/M **Minimal** apabila telah memenuhi seluruh indikator (pendidikan kesehatan, pelayanan kesehatan, pembinaan lingkungan sekolah sehat dan manajemen UKS/M) pada kelompok stratifikasi UKS/M MINIMAL.
> - Sekolah memiliki stratifikasi UKS/M **Standar** apabila telah memenuhi seluruh indikator ... pada kelompok stratifikasi UKS/M STANDAR.
> - Sekolah memiliki stratifikasi UKS/M **Optimal** apabila telah memenuhi seluruh indikator ... pada kelompok stratifikasi UKS/M OPTIMAL.
> - Sekolah memiliki stratifikasi UKS/M **Paripurna** apabila telah memenuhi seluruh indikator ... pada kelompok stratifikasi UKS/M PARIPURNA.

## Unused CMS content — Stratifikasi UKS SD (`slug: stratifikasi-uks-sd`) — the real rubric

Full table, extracted from the actual `<table>` markup (not text-flattened):

### 1. Pendidikan Kesehatan

| Minimal | Standar | Optimal | Paripurna |
|---|---|---|---|
| Adanya rencana pembelajaran tentang Pendidikan kesehatan | *Dipenuhinya strata minimal, plus:* | *Di penuhinya strata standar, plus:* | *Dipenuhinya strata optimal, plus:* |
| Pendidikan kesehatan dilaksanakan secara kurikuler | Pendidikan jasmani dan kesehatan dilaksanakan secara ekstrakulikuler | Sekolah melakukan peregangan di antara jam pelajaran | Penerapan pendidikan karakter dan keterampilan hidup sehat |
| Pendidikan jasmani dilaksanakan secara kurikuler | Sekolah melaksanakan literasi dengan materi kesehatan | Sekolah melakukan tes kebugaran | Adanya forum komunikasi pendidik dan konselor sebaya |
| | Sekolah melaksanakan pembinaan kader kesehatan | Pendidikan kesehatan (kespro, napza, sanitasi, gizi) terintegrasi dengan mata pelajaran lain | Melibatkan orang tua dalam pendidikan kesehatan |
| | Sekolah melaksanakan kegiatan CTPS bersama | | |
| | Sekolah melaksanakan sarapan bersama dengan gizi seimbang | | |
| | Sekolah melaksanakan kegiatan sikat gigi bersama | | |

### 2. Pelayanan Kesehatan

| Minimal | Standar | Optimal | Paripurna |
|---|---|---|---|
| Sekolah memfasilitasi puskesmas melaksanakan penjaringan kesehatan dan pemeriksaan berkala | *Dipenuhinya standar minimal, plus:* | *Dipenuhinya strata standar, plus:* | *Dipenuhinya strata optimal, plus:* |
| Sekolah membantu pelaksanaan imunisasi anak sekolah | Sekolah melaksanakan pelayanan P3K dan P3P | Sekolah melaksanakan layanan konseling | Sekolah menindaklanjuti hasil penjaringan dan pemeriksaan berkala |
| Sekolah memeriksa kebersihan diri peserta didik | Sekolah melibatkan Puskesmas dalam penanganan rujukan jika diperlukan | | Menurunnya jumlah hari tidak masuk sekolah karena sakit |
| | Sekolah memberikan obat cacing | | Peserta didik memiliki status gizi baik |

### 3. Pembinaan Lingkungan Sekolah Sehat

| Minimal | Standar | Optimal | Paripurna |
|---|---|---|---|
| Sekolah dengan sumber air layak, tersedia di lingkungan sekolah dan cukup | *Dipenuhinya strata minimal, plus:* | *Dipenuhinya strata standar, plus:* | *Dipenuhi nya strata optimal, plus:* |
| Sekolah dengan tempat cuci tangan dengan sabun dan air mengalir | Sekolah memiliki rasio toilet sesuai dengan standar Permendikbud 24/2007 | Sekolah memanfaatkan pekarangan sekolah dengan menanam tanaman obat dan pangan | Air minum disediakan oleh sekolah |
| Sekolah memiliki toilet dengan kondisi baik dan terpisah | Sekolah memiliki tempat sampah yang terpilah | Sekolah melakukan 3R (Reduce, reuse, recycle) | Sekolah memiliki rasio toilet sesuai dengan standar Kepmenkes 1429/2006 |
| Sekolah memiliki saluran drainase | Sekolah memiliki kantin sehat | Tersedia toilet MKM (Manajemen Kebersihan Menstruasi) | Kantin telah mendapatkan stiker tanda laik higiene sanitasi |
| Sekolah memiliki kantin | Sekolah menerapkan KTR | | Tersedia toilet disabilitas |
| Sekolah memiliki lahan/ruang terbuka hijau | | | Sekolah bekerja sama dengan puskesmas melakukan pemeriksaan kualitas udara dan skrining siswa perokok |
| Sekolah memiliki tempat sampah yang tertutup | | | Sekolah bekerjasama dengan pihak lain untuk menyediakan bank sampah |
| Sekolah memiliki tempat pembuangan sampah sementara yang tertutup | | | Sekolah melakukan kegiatan pengolahan tanaman obat dan pangan |
| Ruang Kelas dalam keadaan bersih | | | |
| Sekolah melaksanakan pemberantasan sarang nyamuk | | | |
| Sekolah memiliki aturan KTR, KTN, KTK, KTP | | | |

### 4. Manajemen UKS

| Minimal | Standar | Optimal | Paripurna |
|---|---|---|---|
| Buku pegangan kesehatan (Buku UKS/M, gizi seimbang, kespro, sanitasi, Napza dll) | *Dipenuhinya strata minimal, plus:* | *Dipenuhinya strata standar, plus:* | *Dipenuhinya strata optimal, plus:* |
| Ada penanggungjawab UKS | Sekolah menggunakan buku rapor kesehatanku | Adanya kemitraan dengan instansi terkait | Sekolah melakukan pembinaan dan pengawasan |
| Tersedia media KIE kesehatan (alat peraga, poster dll) | Sekolah melakukan konsultasi/koordinasi dengan Tim Pembina UKS | Tersedia sarana dan prasarana sekolah aman bencana | Seluruh guru terorientasi UKS |
| Tersedia sarana prasarana olahraga | Sekolah memiliki ruang UKS | | Sekolah menggunakan Rapor Kesehatan Lingkungan dan Kantin |
| Tersedia dana untuk kegiatan UKS dan pemeliharaan sanitasi sekolah | | | |
| Terdapat kemitraan dengan Puskesmas | | | |
| Terdapat perencanaan kegiatan UKS di Sekolah | | | |

---

## Summary for the implementation plan

1. **Decide the naming, once, in one place.** "Minimal / Standar / Optimal / Paripurna" wins 3-to-1 against this page's own "Dasar / Madya / Utama / Paripurna." Whatever's chosen, it needs to be the same string everywhere — homepage, this page's hero, and the rubric data.
2. **Don't ship the unused `stratifikasiList` prop as-is.** If it's wired up for real, strip the two embedded base64 images out of `Deskripsi` and `Tujuan` and replace them with actual uploaded media — as-is they're ~170KB of dead weight per page load.
3. **The SD rubric table is the real content asset here.** It's detailed, structured, and consistent with the rest of the system's naming — but it's SD-only, and displayed nowhere. If a self-service "what tier is my school" page is in scope, this table (extended to SMP/SMA/PAUD) is the content to build it on.
4. **Both dev and prod ultimately defer to `stratifikasiuks.org` for the actual interactive tool.** Confirm whether that's staying an external dependency or getting absorbed into the rebuild before designing this page further — it changes whether the answer to "what do we need to show here" is "an explainer page pointing outward" (cheap) or "the actual scoring engine" (a much bigger build, for which the SD table above is a real head start).
