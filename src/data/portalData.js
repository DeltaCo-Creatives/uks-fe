/**
 * RE-EXPORT BARREL FOR UKS/M PORTAL DATA
 * Preserves backwards-compatibility with existing imports across the application.
 */

// Navigation architecture
export * from './navigation';

// UKS/M Profiles
export * from './uksm';

export * from './stratifikasi';

// Gerakan Sekolah Sehat, curated from PROD /sekolah-sehat/*

// Priority Programs (MBG, CKG, 7KAIH, ASRI, Prestasi, etc.)
export * from './program';
