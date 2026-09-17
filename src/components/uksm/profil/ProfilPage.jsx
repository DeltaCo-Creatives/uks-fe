import { useState } from 'react';
import { profilDefinition } from '../../../data/portalData';
import ProfilDeskripsi from './ProfilDeskripsi';
import ProfilTujuanSasaran from './ProfilTujuanSasaran';
import ProfilStruktur from './ProfilStruktur';
import ProfilManajemen from './ProfilManajemen';
import './profil.css';

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/**
 * UKS/M ▸ Profil & Tata Kelola. Content curated from PROD /tentang-uks/* and
 * /program/manajemen-uks-m (see docs/profil-tata-kelola-curation.md).
 * The org-structure tab lives here so links elsewhere on the page can open it.
 */
export default function ProfilPage({ onNavigate }) {
  const [orgTab, setOrgTab] = useState('pembina');

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
        <p className="subpage-hero-desc">{profilDefinition}</p>
      </div>

      <ProfilDeskripsi onNavigate={onNavigate} onOpenOrgTab={openOrgTab} onScrollTo={scrollToSection} />
      <ProfilTujuanSasaran />
      <ProfilStruktur activeTab={orgTab} onTabChange={setOrgTab} />
      <ProfilManajemen onNavigate={onNavigate} />
    </div>
  );
}
