import { useState } from 'react';
import { ProfilDeskripsi, ProfilTujuanSasaran, ProfilStruktur, ProfilManajemen, useUksm } from '@/features/uksm';
import { usePageMeta } from '@/hooks/usePageMeta';
import { LoadingState, ErrorState } from '@/components/shared/AsyncState';

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/**
 * UKS/M ▸ Profil & Tata Kelola. Content curated from PROD /tentang-uks/* and
 * /program/manajemen-uks-m (see docs/profil-tata-kelola-curation.md).
 * The org-structure tab lives here so links elsewhere on the page can open it.
 * The text comes from /public/uksm; the sections mount only when every row they read is present
 * (Struktur is the exception: each of its tabs shows when its own row exists).
 */
export default function ProfilPage() {
  const [orgTab, setOrgTab] = useState('pembina');
  const { profilDefinition, profilReady, loading, retry } = useUksm();
  usePageMeta({ title: 'Profil & Tata Kelola UKS/M', description: profilDefinition });

  const openOrgTab = (tabId) => {
    setOrgTab(tabId);
    scrollToSection('sec-profil-struktur');
  };

  return (
    <div>
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-landmark"></i> Kluster 1 · UKS/M
        </span>
        <h1 className="subpage-hero-title">Profil &amp; Tata Kelola UKS/M</h1>
        {profilDefinition && <p className="subpage-hero-desc">{profilDefinition}</p>}
      </div>

      {loading && <LoadingState label="Memuat profil UKS/M..." />}

      {/* A 200 with missing rows is treated like a failed request. */}
      {!loading && !profilReady && <ErrorState title="Profil UKS/M tidak dapat dimuat" retry={retry} />}

      {profilReady && (
        <>
          <ProfilDeskripsi onOpenOrgTab={openOrgTab} onScrollTo={scrollToSection} />
          <ProfilTujuanSasaran />
          <ProfilStruktur activeTab={orgTab} onTabChange={setOrgTab} />
          <ProfilManajemen />
        </>
      )}
    </div>
  );
}
