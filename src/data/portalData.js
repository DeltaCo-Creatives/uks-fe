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

// Priority Programs (MBG, CKG, 7KAIH, ASRI, SAIH, etc.)
export * from './program';

// Multi-stakeholder Partnership (Mitra, Activities, Support, Logos)
export * from './mitra';

// Information, News, Best Practices, Agenda & UPT Stories
export * from './informasi';

// Digital Publications, Books, Infographics, Videos & Regulations
export * from './publikasi';

// Site Chrome, Contact Info, Apps Directory, FAQs & Ministry Links
export * from './site';
