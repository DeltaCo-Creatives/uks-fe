/**
 * RE-EXPORT BARREL FOR UKS/M PORTAL DATA
 * Preserves backwards-compatibility with existing imports across the application.
 */

// Navigation architecture
export * from './navigation';

// UKS/M Profiles
export * from './uksm';

// Profil & Tata Kelola, curated from PROD /tentang-uks/* and /program/manajemen-uks-m
export * from './profil';

// Trias UKS/M: 3 pillars, 16 sub-programs (verbatim from dev /trias-uks)
export * from './trias';
export * from './triasSummaries';
export * from './stratifikasi';

// Gerakan Sekolah Sehat, curated from PROD /sekolah-sehat/*

// Priority Programs (MBG, CKG, 7KAIH, ASRI, Prestasi, etc.)
export * from './program';

// Prestasi: competition winners, keyed by competition id
export * from './prestasi';

// Multi-stakeholder Partnership (Mitra, Activities, Support, Logos)
export * from './mitra';

// Partner marquee screenshots (Books/Infografis/Video/Regulasi now come from the API, see src/hooks/usePublikasi.js)
export * from './publikasi';

// Site Chrome, Contact Info, Apps Directory, FAQs & Ministry Links
export * from './site';
