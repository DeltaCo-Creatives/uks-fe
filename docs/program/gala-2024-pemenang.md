# Gala Kreasi Video GSS 2024 — Pengumuman & Daftar Pemenang: Source Extracts

Scraped 2026-09-22 from PROD (`/gala-kreasi/gala-kreasi-2024-pemenang` and
`/gala-kreasi/gala-kreasi-2024-video-pemenang`). Closes PR-08 and PR-09 in
`docs/content-inventory.md`, both of which were marked "not scraped". Text verbatim.

## P1. `/gala-kreasi/gala-kreasi-2024-pemenang`

> Berikut ini Pengumuman Pemenang Gala Kreasi Video Gerakan Sekolah Sehat 2024:
>
> 1. Instagram: Pengumuman Pemenang — https://www.instagram.com/ditjen.paud.dikdasmen/p/C-hCBB3yrDz/
> 2. Dokumen: Daftar Pemenang per Jenjang — https://drive.google.com/file/d/1ArEK0wExN4D2b1bg9yU6xi8dWugMH3g0/view
> 3. SK Pemenang: SK Pemenang Gala Kreasi Video GSS 2024 — https://uks.kemendikdasmen.go.id/storage/manajemen_uks/files/produk_hukum/DXRUqW5K8kiaCOCm6aW29UNVK6uvVsQ3hSflYReR.pdf
>
> Dokumentasi Apresiasi Gala Kreasi Video Gerakan Sekolah Sehat 2024:
>
> 1. Instagram: Malam Apresiasi Gala Kreasi Video GSS 2024 — https://www.instagram.com/reel/C-mkY_PSqnK/
> 2. Instagram: Puncak Acara Gala Kreasi Video GSS 2024 — https://www.instagram.com/p/C-mKw1wp_Ec/
>
> Sumber: Siaran Pers No.365/sipers/A6/VIII/2024, Biro Kerja Sama dan Hubungan
> Masyarakat, Sekretariat Jenderal, Kementerian Pendidikan, Kebudayaan, Riset,
> dan Teknologi.

## P2. `/gala-kreasi/gala-kreasi-2024-video-pemenang`

> Berikut ini Daftar Pemenang Gala Kreasi Video Gerakan Sekolah Sehat 2024:

114 rows in one table, ordered by jenjang: PAUD/TK (17), SD (22), SMP (22),
SMA (17), SMK (12), SLB/SKH (12), SKB & PKBM (12). Jenjang is not its own column on prod — it is only readable from
the school-name prefix and from where the `Kategori` counter restarts at 1.

Notes on the source data, all left as-is below:

- `Kategori` mixes three vocabularies in one column: "Terbaik N", "Peringkat N"
  and "Inspiratif N". Ranks restart at 1 for every jenjang.
- Only 11 of 114 rows carry a YouTube link; the rest have a social link only.
- Some rows repeat one social link across two schools (SMPN 1 PASEH / SMP SUKMA
  BANGSA PIDIE; SMAN 1 PANGKALAN BUN / SMAN 2 SANGGAU), and SMKN 2 BUDURAN's
  link points at an account page, not a post. Prod's data, not corrected.
- Two Instagram URLs were malformed on prod (query string with no `?`); the junk
  is stripped here, the post id untouched.
- A few provinces are wrong on prod (e.g. SDN KANYORAN 2 in Kab. Kediri is filed
  under Kalimantan Selatan). Not corrected — flag before publishing.

| # | Nama Sekolah | Kabupaten/Kota | Provinsi | Kategori | YouTube | Sosial Media |
|---|---|---|---|---|---|---|
| 1 | TK YAPIS AGATS | Kab. Asmat | Papua Selatan | Inspiratif 1 | https://youtube.com/shorts/aLmuBNsglvo | https://www.instagram.com/reel/C8fXXrjSIul/ |
| 2 | TK NEGERI 4 HALMAHERA BARAT | Kab. Halmahera Barat | Maluku Utara | Inspiratif 2 | https://youtube.com/shorts/mOtYYibUcjU | https://www.instagram.com/reel/C8qm3svPSr-/ |
| 3 | TK UNGGULAN AL-YA'LU | Kota Malang | Jawa Timur | Terbaik 1 | https://youtube.com/shorts/3kDTgPMKW3Q | https://www.instagram.com/reel/C82MIcryl8f/ |
| 4 | TK TUNAS HARAPAN | Kota Probolinggo | Jawa Timur | Terbaik 2 | https://youtube.com/shorts/E-6v6OP_Vho | https://www.instagram.com/reel/C8yRv6NyfUX/ |
| 5 | TK TELKOM BATAM | Kota Batam | Kepulauan Riau | Terbaik 3 | https://youtube.com/shorts/yV43JhER0GE | https://www.instagram.com/reel/C8tLjBZRRks/ |
| 6 | TK RAKYAT PEMATANG | Kab. Langkat | Sumatera Utara | Terbaik 4 | https://youtube.com/shorts/jjunCIkcThU | https://www.instagram.com/reel/C8nqsDvSaqa/ |
| 7 | TK ISLAM NURUL HUDA AL-ASIAH | Kab. Ciamis | Jawa Barat | Terbaik 5 | https://youtube.com/shorts/UpQDmXFX8M4 | https://www.instagram.com/reel/C8Grkn6PGJs/ |
| 8 | TK MUTIARA HATI | Kab. Ponorogo | Jawa Timur | Terbaik 6 | — | https://www.instagram.com/reel/C8i410ESI6I/ |
| 9 | TK AL-FAZZA | Kab. Padang Lawas Utara | Sumatera Utara | Terbaik 7 | — | https://www.instagram.com/reel/C8uTpUHSC05/ |
| 10 | TK KHADIJAH | Kota Surabaya | Jawa Timur | Terbaik 8 | — | https://www.instagram.com/reel/C8xCWv8vfZh/ |
| 11 | TK IT DHIA EL WIDAD | Kab. Tanah Bumbu | Kalimantan Selatan | Terbaik 9 | — | https://www.instagram.com/reel/C8q6rz4v3h6/ |
| 12 | TK NEGERI PEMBINA KABUPATEN | Kab. Lamandau | Kalimantan Tengah | Terbaik 10 | — | https://www.instagram.com/reel/C8uJ7WvvJeO/ |
| 13 | TK BINA PERTIWI | Kab. Mamuju Utara | Sulawesi Barat | Terbaik 11 | — | https://www.instagram.com/reel/C8zWdtlIn2q/ |
| 14 | TK ISLAM TERPADU BINA INSANI | Kab. Kediri | Jawa Timur | Terbaik 12 | — | https://www.instagram.com/reel/C9Jjoq3yBjL/ |
| 15 | PAUD FAJAR BARU | Kab. Sabu Raijua | NTT | Terbaik 13 | — | https://www.tiktok.com/@paud.fajar.baru/video/7385390977185254662 |
| 16 | TK MUSLIMAT AL-HIDAYAH | Kab. Manokwari Selatan | Papua Barat | Terbaik 14 | — | https://www.instagram.com/reel/C8mg8QZvOgd/ |
| 17 | TKN PEMBINA KECAMATAN | Kota Singkawang | Kalimantan Barat | Terbaik 15 | — | https://www.instagram.com/reel/C8zceqDPORZ/ |
| 18 | SDN TAMANSARI 1 BONDOWOSO | Kab. Bondowoso | Jawa Timur | Inspiratif 1 | — | https://www.tiktok.com/@sdntamansarisatu1/video/7386306787726724358 |
| 19 | SD INPRES LEDA | Kab. Manggarai | Nusa Tenggara Timur | Inspiratif 2 | https://youtube.com/shorts/3OUZDfI_Yhc | https://www.instagram.com/reel/C8mNB43P8-S/ |
| 20 | SDN 1 SEMARAPURA KANGIN | Kab. Klungkung | Bali | Terbaik 1 | https://youtube.com/shorts/blIWxJiUHM0 | https://www.instagram.com/reel/C8ygXtrhEk8/ |
| 21 | SD FRANSISKUS BATURAJA | Kab. Ogan Komering Ulu | Sumatera Selatan | Terbaik 2 | https://youtube.com/shorts/AxnuV6_6mYI | https://www.instagram.com/reel/C8gbHAFSjqb/ |
| 22 | SDK SOVERDI | Kab. Badung | Bali | Terbaik 3 | — | https://www.instagram.com/p/C8ojXuAyzR7/ |
| 23 | SDN KEBALENAN | Kab. Banyuwangi | Jawa Timur | Terbaik 4 | — | https://www.instagram.com/reel/C8iTr4VSyLD/ |
| 24 | SD ISLAM AL AZHAR 14 | Kota Semarang | Jawa Tengah | Terbaik 5 | — | https://www.instagram.com/p/C8yfAqySUGq/ |
| 25 | SD MGI ISLAMIC SCHOOL KAWALI | Kab. Ciamis | Jawa Barat | Terbaik 6 | — | https://www.instagram.com/reel/C8vlnNHSTdQ/ |
| 26 | SD UNGGULAN AISYIYAH BANTUL | Kab. Bantul | DI Yogyakarta | Terbaik 7 | — | https://www.instagram.com/reel/C8yOVwHSrJf/ |
| 27 | SD MUHAMMADIYAH 11 | Kota Surabaya | Jawa Timur | Terbaik 8 | — | https://www.instagram.com/reel/C8op4zCvJur/ |
| 28 | SD AL MUTTAQIEN | Kota Surabaya | Jawa Timur | Terbaik 9 | — | https://www.instagram.com/reel/C8w2E5LPfPU/ |
| 29 | SDN 7 SALOTUNGO | Kab. Soppeng | Sulawesi Selatan | Terbaik 10 | — | https://www.instagram.com/p/C8YmsLBi700/ |
| 30 | SDIT AR-RASYID | Kab. Tanah Bumbu | Kalimantan Selatan | Terbaik 11 | — | https://www.instagram.com/reel/C8qqwyBpLHu/ |
| 31 | SD NEGERI KAJEKSAN | Kab. Sidoarjo | Jawa Timur | Terbaik 12 | — | https://www.instagram.com/reel/C9QC98wSwpO/ |
| 32 | SDN 4 PATARUMAN | Kab. Garut | Jawa Barat | Terbaik 13 | — | https://www.instagram.com/reel/C9JduySy5pf/ |
| 33 | SDN PEMURUS BARU 2 | Kota Banjarmasin | Kalimantan Selatan | Terbaik 14 | — | https://www.instagram.com/reel/C8ePQWXvwVw/ |
| 34 | SDS KRISTEN KALAM KUDUS 2 | Kota Pematangsiantar | Sumatera Utara | Terbaik 15 | — | https://www.tiktok.com/@skkk.ps/video/7384611000969972998 |
| 35 | SDN PACARKELING V/186 | Kota Surabaya | Jawa Timur | Terbaik 16 | — | https://www.instagram.com/reel/C812GqgyGBV/ |
| 36 | SDN 1 IMBANAGARA RAYA | Kab. Ciamis | Jawa Barat | Terbaik 17 | — | https://www.instagram.com/reel/C819TVrPeCO/ |
| 37 | SDN 2 BARABAI TIMUR | Kab. Hulu Sungai Tengah | Kalimantan Selatan | Terbaik 18 | https://youtube.com/shorts/Fh_oqLV9jX0 | https://www.instagram.com/reel/C81iI39R5hI/ |
| 38 | SDN KANYORAN 2 | Kab. Kediri | Kalimantan Selatan | Terbaik 19 | — | https://www.instagram.com/reel/C8epfqEva8M/ |
| 39 | SDN 3 BALER BALE AGUNG | Kab. Jembrana | Jawa Timur | Terbaik 20 | — | https://www.instagram.com/reel/C8vVW2-yhSe/ |
| 40 | SMPN 6 KLATEN | Kab. Klaten | Jawa Tengah | Terbaik 1 | — | https://www.instagram.com/reel/C8y__oGgxUt/ |
| 41 | SMPN 6 KOTA MOJOKERTO | Kota Mojokerto | Jawa Timur | Terbaik 2 | — | https://www.instagram.com/reel/C8nsuaLBrby/ |
| 42 | SMPN 1 PASEH | Kab. Bandung | Jawa Barat | Terbaik 3 | — | https://www.instagram.com/reel/C8wE2l0ynAg/ |
| 43 | SMP SUKMA BANGSA KABUPATEN PIDIE | Kab. Pidie | Aceh | Peringkat 4 | — | https://www.instagram.com/reel/C8wE2l0ynAg/ |
| 44 | SMPN 22 KABUPATEN SORONG | Kab. Sorong | Papua Barat Daya | Peringkat 5 | — | https://www.instagram.com/reel/C8v9OsoSAZm/ |
| 45 | SMP CAHAYA BANGSA | Kota Metro | Lampung | Peringkat 6 | — | https://www.instagram.com/reel/C81vpJiSXoQ/ |
| 46 | SMPN 6 NEGARA | Kab. Jembrana | Bali | Peringkat 7 | — | https://www.instagram.com/reel/C8xJHTAvtEp/ |
| 47 | SMPN 58 JAKARTA | Kota Jakarta Selatan | DKI Jakarta | Peringkat 8 | — | https://www.instagram.com/reel/C8zZeZWvmDq/ |
| 48 | SMPN 1 TOMBATU | Kab. Minahasa Tenggara | Sulawesi Utara | Peringkat 9 | — | https://www.instagram.com/reel/C8eHDQls2Fv/ |
| 49 | SMPN 3 CILAKU | Kab. Cianjur | Jawa Barat | Peringkat 10 | — | https://www.instagram.com/reel/C8s-_UXhNVh/ |
| 50 | SMPN 3 SUMBAWA BESAR | Kab. Sumbawa | Nusa Tenggara Barat | Peringkat 11 | — | https://www.instagram.com/reel/C8d20R9voxH/ |
| 51 | SMPN 3 KALASAN | Kab. Sleman | DI Yogyakarta | Peringkat 12 | — | https://www.instagram.com/reel/C8yiZXjyutp/ |
| 52 | SMPN 15 SEMARANG | Kota Semarang | Jawa Tengah | Peringkat 13 | — | https://www.instagram.com/reel/C8uKA4FP3bn/ |
| 53 | SMPN 4 LOURA | Kab. Sumba Barat Daya | Nusa Tenggara Timur | Peringkat 14 | — | https://www.instagram.com/reel/C8p-pafq28F/ |
| 54 | UPTD SMPN 5 BANGKALAN | Kab. Bangkalan | Jawa Timur | Peringkat 15 | — | https://www.instagram.com/reel/C8x_n2eB1ha/ |
| 55 | SMP SWASTA MAITREYAWIRA | Kab. Deli Serdang | Sumatera Utara | Peringkat 16 | — | https://www.instagram.com/reel/C8lJPlTBg0u/ |
| 56 | SMPN 9 MUARA TEWEH | Kab. Barito Utara | Kalimantan Tengah | Peringkat 17 | — | https://www.instagram.com/reel/C8thtRGSjLH/ |
| 57 | SMPN 12 SEMARANG | Kota Semarang | Jawa Tengah | Peringkat 18 | — | https://www.instagram.com/reel/C9Pms55Pnes/ |
| 58 | SMPN 2 PAPAR | Kab. Kediri | Jawa Timur | Peringkat 19 | — | https://www.instagram.com/reel/C81-n1TywYP/ |
| 59 | SMP YPPSB SANGATTA UTARA | Kab. Kutai Timur | Kalimantan Timur | Peringkat 20 | — | https://www.instagram.com/reel/C7WMcCyhDb2/ |
| 60 | SMPN 53 MERANGIN | Kab. Merangin | Jambi | Inspiratif 1 | — | https://www.instagram.com/reel/C9OHRfEyq73/ |
| 61 | SMP SATU ATAP LIBARU SUNGKAI | Kab. Balangan | Kalimantan Selatan | Inspiratif 2 | — | https://www.instagram.com/reel/C8o3Z-sxO8a/ |
| 62 | SMAN 1 SRAGEN | Kab. Sragen | Jawa Tengah | Terbaik 1 | — | https://www.instagram.com/reel/C8i0uQWyja1/ |
| 63 | SMAN 8 TAKENGON UNGGUL | Kab. Aceh Tengah | Aceh | Terbaik 2 | — | https://www.instagram.com/reel/C8RNbEHJZDD/ |
| 64 | SMAN 1 TULUNGAGUNG | Kab. Tulungagung | Jawa Timur | Terbaik 3 | — | https://www.instagram.com/reel/C81yWY2yrtY/ |
| 65 | SMAN 15 JAKARTA | Kota Jakarta Utara | DKI Jakarta | Peringkat 4 | — | https://www.instagram.com/reel/C7242QDyxmW/ |
| 66 | SMAN 4 PANGKALPINANG | Kota Pangkalpinang | Kep. Bangka Belitung | Peringkat 5 | — | https://www.instagram.com/reel/C8LvwnWSNRK/ |
| 67 | SMAN 1 PEKUTATAN | Kab. Jembrana | Bali | Peringkat 6 | — | https://www.instagram.com/reel/C8vkrGDvEVt/ |
| 68 | SMAN 1 BENGKALIS | Kab. Bengkalis | Riau | Peringkat 7 | — | https://www.instagram.com/reel/C8yXSAyPET/ |
| 69 | SMAN 1 PANGKALAN BUN | Kab. Kotawaringin Barat | Kalimantan Tengah | Peringkat 8 | — | https://www.instagram.com/reel/C8yZFXHhtFw/ |
| 70 | SMAN 2 SANGGAU | Kab. Sanggau | Kalimantan Barat | Peringkat 9 | — | https://www.instagram.com/reel/C8yZFXHhtFw/ |
| 71 | SMAN 1 SEMIN | Kab. Gunung Kidul | DI Yogyakarta | Peringkat 10 | — | https://vt.tiktok.com/ZSYfCaSmW/ |
| 72 | SMAN 4 PONTIANAK | Kota Pontianak | Kalimantan Barat | Peringkat 11 | — | https://www.instagram.com/reel/C8zeoepvzoV/ |
| 73 | SMAN 9 PANDEGLANG | Kab. Pandeglang | Banten | Peringkat 12 | — | https://www.instagram.com/reel/C7_Xjehy5Bp/ |
| 74 | SMAN 2 GARUT | Kab. Garut | Jawa Barat | Peringkat 13 | — | https://www.instagram.com/reel/C9MGvPtpg99/ |
| 75 | SMAN 1 JEBUS | Kab. Bangka Barat | Kep. Bangka Belitung | Peringkat 14 | — | https://www.instagram.com/reel/C8orLeTMfDV/ |
| 76 | SMAN TERPADU UNGGULAN 1 | Kab. Tana Tidung | Kalimantan Utara | Peringkat 15 | — | https://www.instagram.com/reel/C75l3O5S0sw/ |
| 77 | SMAN 1 SALAK | Kab. Pakpak Bharat | Sumatera Utara | Inspiratif 1 | — | https://www.instagram.com/reel/C8ykdhaSBiE/ |
| 78 | SMAN 5 TUAL | Kota Tual | Maluku | Inspiratif 2 | — | https://www.instagram.com/reel/C81geQWyzyJ/ |
| 79 | SMKN 2 BUDURAN SIDOARJO | Kab. Sidoarjo | Jawa Timur | Terbaik 1 | — | https://www.instagram.com/smkn2buduran.official/ |
| 80 | SMK YADIKA TANJUNGSARI | Kab. Sumedang | Jawa Barat | Terbaik 2 | — | https://www.instagram.com/reel/C8ymIAKRnMp/ |
| 81 | SMK NEGERI 2 TAKARI | Kab. Kupang | Nusa Tenggara Timur | Terbaik 3 | — | https://www.instagram.com/reel/C8ZPt0yISIx/ |
| 82 | SMKN 1 NGASEM | Kab. Kediri | Jawa Timur | Peringkat 4 | — | https://www.instagram.com/reel/C8ycX_UPBNM/ |
| 83 | SMKN 1 DOKO | Kab. Blitar | Jawa Timur | Peringkat 5 | — | https://www.instagram.com/p/C8o0-jLs5Ys/ |
| 84 | SMK SANTO ALOISIUS | Kab. Manggarai | Nusa Tenggara Timur | Peringkat 6 | — | https://www.instagram.com/reel/C8ivwEai1Hu/ |
| 85 | SMK AL-CHASANAH | Kota Jakarta Barat | DKI Jakarta | Peringkat 7 | — | https://www.instagram.com/reel/C8bsyl4xOJ/ |
| 86 | SMKN 1 KLUNGKUNG | Kab. Klungkung | Bali | Peringkat 8 | — | https://www.instagram.com/reel/C8ymiTFhtxL/ |
| 87 | SMKN 1 WONOSOBO | Kab. Wonosobo | Jawa Tengah | Peringkat 9 | — | https://www.instagram.com/reel/C8vjskTSS9u/ |
| 88 | SMKN 1 BANGKINANG | Kab. Kampar | Riau | Peringkat 10 | — | https://www.instagram.com/reel/C8zPXFopVLA/ |
| 89 | SMKN 3 BATAM | Kota Batam | Kepulauan Riau | Inspiratif 1 | — | https://www.instagram.com/reel/C8qnzouylxh/ |
| 90 | SMKN 1 SEI MENGGARIS | Kab. Nunukan | Kalimantan Utara | Inspiratif 2 | — | https://www.instagram.com/reel/C8lmpuhsV7n/ |
| 91 | SLBN 1 PANGKALAN BUN | Kab. Kotawaringin Barat | Kalimantan Tengah | Terbaik 1 | — | https://www.instagram.com/reel/C8yHhEYRJm8/ |
| 92 | SLB MUHAMMADIYAH DEKSO | Kab. Kulonprogo | DI Yogyakarta | Terbaik 2 | — | https://www.instagram.com/reel/C7yKmS0SqLl/ |
| 93 | SLBN 1 BADUNG | Kab. Badung | Bali | Terbaik 3 | — | https://www.instagram.com/reel/C7iWiqqPtJB/ |
| 94 | SLBN 1 MATARAM | Kota Mataram | Nusa Tenggara Barat | Terbaik 4 | — | https://www.instagram.com/reel/C8wQDBBSqA1/ |
| 95 | SLBN TENGGARONG | Kab. Tenggarong | Kalimantan Timur | Peringkat 5 | — | https://www.instagram.com/reel/C8ocRsISlpx/ |
| 96 | SLBN PANDAAN | Kab. Pasuruan | Jawa Timur | Peringkat 6 | — | https://www.instagram.com/reel/C66RehVS0li/ |
| 97 | SLBN 2 LOMBOK BARAT | Kab. Lombok Barat | Nusa Tenggara Barat | Peringkat 7 | — | https://www.instagram.com/reel/C8meUpISmDo/ |
| 98 | SKH KARYA INSANI | Kab. Tangerang | Banten | Peringkat 8 | — | https://www.instagram.com/reel/C8zQYUqyKl1/ |
| 99 | SLB BC NURANI | Kota Cimahi | Jawa Barat | Peringkat 9 | — | https://www.instagram.com/reel/C8zcNSkSRw-/ |
| 100 | SLBN 1 JEMBRANA | Kab. Jembrana | Bali | Peringkat 10 | — | https://www.instagram.com/reel/C80Lv8Ey4wq/ |
| 101 | SLBN ROKAN HULU | Kab. Rokan Hulu | Riau | Inspiratif | — | https://www.instagram.com/reel/C8RtCoAvoLX/ |
| 102 | SLBN TULANG BAWANG | Kab. Tulang Bawang | Lampung | Inspiratif | — | https://www.instagram.com/reel/C81arY5xuWq/ |
| 103 | SPNF SKB KOTA PONTIANAK | Kota Pontianak | Kalimantan Barat | Terbaik 1 | — | https://www.instagram.com/reel/C8wQZ26uRw4/ |
| 104 | PKBM RIAU BERKARYA | Kab. Pelalawan | Riau | Terbaik 2 | — | https://www.instagram.com/reel/C7s9TCLBSyQ/ |
| 105 | PKBM SINAR TUALAN | Kab. Kotawaringin Timur | Kalimantan Tengah | Terbaik 3 | — | https://www.instagram.com/reel/C8z-2AQSc-x/ |
| 106 | PKBM KURANJI | Kota Banjarbaru | Kalimantan Selatan | Peringkat 4 | — | https://www.instagram.com/reel/C89lTubPXyi/ |
| 107 | PKBM AISYIYAH 01 | Kota Tangerang | Banten | Peringkat 5 | — | https://www.instagram.com/reel/C7_S-WOP0I1/ |
| 108 | PKBM YOWANA SASTRA RENDANG | Kab. Karangasem | Bali | Peringkat 6 | — | https://www.instagram.com/reel/C8dyOXcxAtx/ |
| 109 | SANGGAR KEGIATAN BELAJAR (SKB) 15 | Kota Jakarta Pusat | DKI Jakarta | Peringkat 7 | — | https://www.instagram.com/reel/C8rGQ24ML7T/ |
| 110 | PKBM PELANGI | Kab. Tangerang | Banten | Peringkat 8 | — | https://www.instagram.com/reel/C8y-QWES0QD/ |
| 111 | PKBM WIDYA GUPTA | Kab. Gianyar | Bali | Peringkat 9 | — | https://www.instagram.com/reel/C8wEJjTyXTQ/ |
| 112 | SPNF SKB KUTAI TIMUR | Kab. Kutai Timur | Kalimantan Timur | Peringkat 10 | — | https://www.instagram.com/reel/C8MNO47uJPI/ |
| 113 | SPNF SKB BARITO KUALA | Kab. Barito Kuala | Kalimantan Selatan | Inspiratif 1 | — | https://www.instagram.com/reel/C8zfPdahWm0/ |
| 114 | SKB KAB. SAMBAS | Kab. Sambas | Kalimantan Barat | Inspiratif 2 | — | https://www.instagram.com/reel/C8yzqDHymOj/ |
