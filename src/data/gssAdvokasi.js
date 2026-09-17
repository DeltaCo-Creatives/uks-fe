/**
 * BAHAN ADVOKASI GSS
 *
 * From docs/sekolah-sehat/bahan-advokasi.md, in source order. `url: null`
 * marks a link that is missing, duplicated, private, or on a dead domain
 * (details in docs/sekolah-sehat-curation.md).
 */

const PH = 'https://is3.cloudhost.id/storagedirectus1/manajemen_uks/files/produk_hukum/';

export const gssLegalDocs = [
  { title: 'SKB 4 Menteri Nomor 83 Tahun 2022 tentang Pelaksanaan Imunisasi dan Aksi Bergizi', url: 'https://uks.kemendikdasmen.go.id/storage/manajemen_uks/files/produk_hukum/2BmyYNrnxfnHenNHV3WzO7rtXh54k4IJ3gL09BBi.pdf' },
  { title: 'Surat Edaran Mendikbudristek Nomor 7 Tahun 2022 tentang Diskresi Pelaksanaan Keputusan Bersama 4 Menteri tentang Panduan Penyelenggaraan Pembelajaran di Masa Pandemi Covid-19', url: `${PH}XWikLOLBzlv0IYkYqjRLePfATtwh9Y9gXoyTrgA4.pdf` },
  { title: 'Permenko Bidang PMK Nomor 1 Tahun 2022 tentang Rencana Aksi Nasional Peningkatan Kesejahteraan Anak Usia Sekolah dan Remaja', url: `${PH}5QoI8pk8youdhr8uRCyQk5SLEL7rQ23QRgP3fzEW.pdf` },
  // Source reuses the Permenko PMK 1/2022 file for this entry.
  { title: 'Peraturan Menteri Kesehatan Nomor 2269/MENKES/PER/XI/2011 tentang Pedoman Pembinaan Perilaku Hidup Bersih dan Sehat', url: null },
  { title: 'Peraturan Menteri Pendidikan Nasional Nomor 57 Tahun 2009 tentang Pemberian Bantuan Pengembangan Sekolah Sehat', url: `${PH}9i2fSxvbbAEeYpKt9vvvnrIJ9LuthFPMW4F1uXXB.pdf` },
  { title: 'Permendiknas Nomor 24 Tahun 2007 tentang Standar Sarana dan Prasarana untuk SD/MI, SMP/MTs, dan SMA/MA', url: `${PH}3hxH6GkqVfOGOBZu4PfedzoFtHV1ExWI45pXHcrG.pdf` },
  { title: 'Peraturan Bersama 4 Menteri Tahun 2014 tentang Pembinaan dan Pengembangan UKS/M', url: `${PH}cQNMhqmcotaphaGnQfHbrfIQ13QnRryjROAkSBJY.pdf` },
  // Source lists this entry without a link.
  { title: 'Peraturan Presiden Nomor 67 Tahun 2021 tentang Penanggulangan Tuberkulosis', url: null },
  { title: 'Peraturan Pemerintah Nomor 57 Tahun 2021 tentang Standar Nasional Pendidikan', url: `${PH}4roWpXIbAsZWOQNU2sA58ezTntLKUpzj8zDP7h0J.pdf` },
  { title: 'Instruksi Presiden Nomor 1 Tahun 2017 tentang Gerakan Masyarakat Hidup Sehat (GERMAS)', url: `${PH}HYRTIBhl1KoF7dZlBe4nEwhzItmDfsuo7RRcM3lg.pdf` },
  { title: 'Peraturan Pemerintah Nomor 61 Tahun 2014 tentang Kesehatan Reproduksi', url: `${PH}sVwwpGnxjDQvXwj5AUAemMgwrQrigA1YrnpiX6fx.pdf` },
  { title: 'Peraturan Presiden Nomor 60 Tahun 2013 tentang Pengembangan PAUD HI', url: `${PH}oDHktplglt409Gc0QOLFJR3EGq1fvFZLpwFDXk82.pdf` },
  { title: 'Peraturan Presiden Nomor 72 Tahun 2012 tentang Sistem Kesehatan Nasional', url: `${PH}yEWtMsQ9nYvjKJ871Eo3LaHWcvxodGs3crqOssGw.pdf` },
  { title: 'Peraturan Pemerintah Nomor 48 Tahun 2008 tentang Pendanaan Pendidikan', url: `${PH}xx7rhMWpY5rriyE2vBRZUEFOZRbH1Vu6RiwaAHe0.pdf` },
  { title: 'Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah', url: `${PH}mx1nibPGF7tD9zzusx5OEQfna1nTYjeWD0yAxUn5.pdf` },
  { title: 'Undang-Undang Nomor 36 Tahun 2009 tentang Kesehatan', url: `${PH}1mx3JXeFSJsIwKFoR9gnrLATyWuTWsG156yGhkkN.pdf` },
  { title: 'Undang-Undang Nomor 25 Tahun 2004 tentang Sistem Perencanaan Pembangunan Nasional', url: `${PH}8m8KH3KTC1mMq0vZhyYMv2YHXk7iisprevPM73nJ.pdf` },
  { title: 'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional', url: `${PH}pvvrRgryB8oQ2WsXsQRqT6h6HedlvTY8rFoTWpCX.pdf` }
];

/** `kind` drives the row icon: 'pdf' · 'drive' · 'video'. */
export const gssCampaignMaterials = [
  // ditpsd.kemdikbud.go.id no longer resolves (checked 2026-09-17).
  { title: 'Paparan Sekolah Sehat', kind: 'pdf', url: null },
  { title: 'Siaran Pers Peluncuran Sekolah Sehat', kind: 'pdf', url: null },
  { title: 'Surat Edaran Kampanye Sekolah Sehat', kind: 'drive', url: 'https://drive.google.com/file/d/1xyJXy6hQ8oiRaXFeZ4bC-r3YYFRnUIrB/view?usp=sharing' },
  { title: 'Pedoman Kampanye Sekolah Sehat', kind: 'drive', url: 'https://drive.google.com/file/d/13DG4BeuqPu8eUwL3c0clJ9MG-DNXQmEg/view?usp=sharing' },
  { title: 'Buku Saku Sehat Bergizi', kind: 'pdf', url: 'https://is3.cloudhost.id/storagedirectus1/manajemen_uks/files/publikasi/L4H44OkNQw3Oal3CXziuAuHDgoGZuTIQ3UogIaNT.pdf' },
  { title: 'Buku Saku Sehat Fisik', kind: 'drive', url: 'https://drive.google.com/file/d/111Vwr0_RfervHeA2PBFqDgWpdNbf-Rol/view?usp=sharing' },
  // Drive file is private (HTTP 401).
  { title: 'Petunjuk Teknis Pelaksanaan BIAS', kind: 'drive', url: null },
  { title: 'Komik BIAS', kind: 'drive', url: 'https://drive.google.com/file/d/1PaSDbNYyERXOWtwAjPbBnxXJ-wTYWe1t/view?usp=sharing' },
  { title: 'Desain Leaflet/Poster Sehat Bergizi', kind: 'drive', url: 'https://drive.google.com/file/d/1y4efWw89JPyv85Hld_XB8smlwGg1f90p/view?usp=sharing' },
  { title: 'Desain Leaflet/Poster Sehat Fisik', kind: 'drive', url: 'https://drive.google.com/file/d/1e3y7p6p8pJ0Wy_sCgjzSLZraaoY4x_tB/view?usp=sharing' },
  { title: 'Desain Leaflet/Poster Sehat Imunisasi', kind: 'drive', url: 'https://drive.google.com/file/d/1z5mbEois0XzOpqmIQF33Tox85Y7tEknt/view?usp=sharing' },
  { title: 'Infografis Kampanye Sekolah Sehat', kind: 'drive', url: 'https://drive.google.com/file/d/1JKfCJNc4MvI5b3yPX9MPG3TJ6w6Xq-1x/view?usp=sharing' },
  { title: 'Infografis Sehat Bergizi', kind: 'drive', url: 'https://drive.google.com/file/d/15Ix2S3QhBl10msfMjVCbGvPBm9f5lzp3/view?usp=sharing' },
  { title: 'Infografis Sehat Fisik', kind: 'drive', url: 'https://drive.google.com/file/d/1eRBEUjU9s47-ZBZoymJdREb5a9C4E8Mm/view?usp=sharing' },
  { title: 'Infografis Sehat Imunisasi', kind: 'drive', url: 'https://drive.google.com/file/d/1dHhkRmhg4Ir8qyuYfTuPF0diNX-sydOR/view?usp=sharing' },
  // Drive file is private (HTTP 401).
  { title: 'Desain Standing Banner Permainan Rakyat dan Olahraga Tradisional', kind: 'drive', url: null },
  { title: 'Desain Standing Banner Kampanye Sekolah Sehat', kind: 'drive', url: 'https://drive.google.com/file/d/1xr70_Fqx5NwFhviAdjYn3rh0Jd7IYDvC/view?usp=sharing' },
  { title: 'Iklan Layanan Masyarakat Sekolah Sehat', kind: 'video', url: 'https://youtu.be/Cbqg3RnW0ss' },
  { title: 'Gerak Lagu Sekolah Sehat', kind: 'video', url: 'https://youtu.be/gl56oxJOWVo' },
  { title: 'SKJ 2022', kind: 'video', url: 'https://youtu.be/V-GpqteRbeA' }
];
