/**
 * SITE CHROME & EXTERNAL SERVICES DATA
 * Contact info, applications directory, and FAQs. Ministry portals and
 * their linked groups now come from the API (see src/hooks/usePublicLists.js).
 */

export const contactInfo = {
  address: 'Gedung E Lantai 17, Kompleks Kemendikdasmen, Jl. Jenderal Sudirman, Senayan, Jakarta 10270',
  email: 'uks.dikdasmen@kemdikbud.go.id',
  phone: '(021) 572-5034',
  ultPhone: '177',
  websiteUrl: 'https://uks.kemendikdasmen.go.id',
  operatingHours: 'Senin - Jumat, 08.00 - 16.00 WIB',
  copyrightYear: '2026'
};

export const faqsList = [
  {
    q: 'Apakah dana Bantuan Operasional Satuan Pendidikan (BOSP) dapat digunakan untuk UKS?',
    a: 'Ya, sesuai petunjuk teknis pengelolaan dana BOSP Kemendikdasmen, pembiayaan pengadaan obat-obatan P3K, alat ukur TB/BB, sabun cuci tangan, pemeliharaan sanitasi toilet, dan pembinaan kader UKS dapat dialokasikan melalui komponen pemeliharaan sarana dan pembinaan peserta didik.'
  },
  {
    q: 'Bagaimana cara satuan pendidikan mengajukan kerja sama (MOU) dengan Puskesmas?',
    a: 'Kepala Satuan Pendidikan mengirimkan surat permohonan Perjanjian Kerja Sama (PKS) pelaksanaan Trias UKS ke Puskesmas di wilayah kerja setempat, yang kemudian dikoordinasikan dengan Dinas Kesehatan dan Tim Pembina UKS Kecamatan.'
  },
  {
    q: 'Apa syarat minimum agar sekolah mencapai Stratifikasi Standar?',
    a: 'Sekolah harus memenuhi 100% indikator Strata Minimal terlebih dahulu, memiliki ruang UKS dengan tempat tidur periksa terpisah, air bersih mengalir, jadwal rutin penjaringan berkala bersama Puskesmas, serta kantin sekolah yang tidak menjual makanan berpemanis atau berpengawet sintetis berlebih.'
  }
];
