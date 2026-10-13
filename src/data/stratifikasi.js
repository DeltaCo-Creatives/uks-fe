/**
 * STRATIFIKASI UKS/M DATA
 * Source: portal-uks.demo.or.id/stratifikasi-uks (see docs/stratifikasi-uks-content.MD).
 * Page copy is dev's rendered text. The indicators per jenjang are not here: they come from
 * /public/uksm (rows of kelompok "stratifikasi", see docs/uksm-api-contract.md); this file keeps
 * only how they are presented (pilar titles and icons, strata names and colours).
 */

export const stratifikasiIntro = {
  title: 'Apa itu Stratifikasi UKS/M?',
  body: 'Stratifikasi UKS/M adalah alat bantu untuk mengetahui apa yang sudah dicapai dan apa yang masih perlu dilakukan satuan pendidikan, agar dapat mencapai strata Dasar, Madya, Utama, hingga Paripurna.'
};

export const stratifikasiGoals = [
  { id: 'alat-ukur', title: 'Alat Ukur Trias UKS', description: 'Mengukur pelaksanaan tiga program pokok UKS di satuan pendidikan.', icon: 'fa-solid fa-ruler-combined' },
  { id: 'mutu', title: 'Strategi Peningkatan Mutu', description: 'Menjadi dasar perbaikan kualitas pelaksanaan UKS/M di sekolah.', icon: 'fa-solid fa-arrow-trend-up' },
  { id: 'monev', title: 'Sistem Monev', description: 'Bagian dari sistem monitoring dan evaluasi yang berkelanjutan.', icon: 'fa-solid fa-magnifying-glass-chart' },
  { id: 'rekomendasi', title: 'Alat Capaian & Rekomendasi', description: 'Dasar penyusunan rekomendasi tindak lanjut bagi sekolah.', icon: 'fa-solid fa-clipboard-check' }
];

export const stratifikasiScoring = {
  title: 'Cara Penilaian',
  body: 'Sekolah/madrasah harus memenuhi seluruh indikator (pendidikan kesehatan, pelayanan kesehatan, pembinaan lingkungan sekolah sehat, serta tata kelola dan kepemimpinan sekolah) pada kelompok stratifikasi UKS/M tertentu (dasar atau madya atau utama atau paripurna).'
};

export const stratifikasiIndicatorIntro = 'Sekolah harus memenuhi seluruh indikator berikut pada kelompok strata yang sama.';

/** The 4 indicator areas (pilar of the workbook), in page order. `id` is the key inside a jenjang's document. */
export const strataCategories = [
  { id: 'pendidikan', title: 'Pendidikan Kesehatan', icon: 'fa-solid fa-graduation-cap' },
  { id: 'pelayanan', title: 'Pelayanan Kesehatan', icon: 'fa-solid fa-kit-medical' },
  { id: 'lingkungan', title: 'Pembinaan Lingkungan Sekolah Sehat', icon: 'fa-solid fa-seedling' },
  { id: 'manajemen', title: 'Tata Kelola dan Kepemimpinan Sekolah', icon: 'fa-solid fa-sitemap' }
];

/**
 * The 4 strata, lowest first. A jenjang lists only what each strata adds;
 * every strata above Dasar also requires the one before it.
 */
export const strataLevels = [
  { key: 'dasar', code: '01', name: 'Dasar', color: '#64748B', bgColor: '#F1F5F9' },
  { key: 'madya', code: '02', name: 'Madya', color: '#2563EB', bgColor: '#DBEAFE' },
  { key: 'utama', code: '03', name: 'Utama', color: '#D97706', bgColor: '#FEF3C7' },
  { key: 'paripurna', code: '04', name: 'Paripurna', color: '#098C4C', bgColor: '#D2E8DA' }
];
