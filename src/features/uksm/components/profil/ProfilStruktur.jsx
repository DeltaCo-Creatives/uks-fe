import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '@/hooks/useCollapse';
import { useUksm } from '../../useUksm';
import ProfilPembina from './ProfilPembina';
import ProfilPelaksana from './ProfilPelaksana';
import { SECTION, FOCUS_DARK } from './styles';

const TAB = `flex min-h-14 cursor-pointer flex-col items-start gap-0.5 rounded-soft px-4 py-2.5 text-left [transition:background-color_0.2s_ease] max-[600px]:px-3 ${FOCUS_DARK}`;
const TAB_IDLE = 'bg-transparent text-ink hover:bg-[rgba(255,255,255,0.7)]';
const TAB_ACTIVE = 'bg-ink text-white';

const TABS = [
  { id: 'pembina', label: 'Tim Pembina', hint: 'Pusat sampai kecamatan' },
  { id: 'pelaksana', label: 'Tim Pelaksana', hint: 'Di sekolah/madrasah' }
];

/**
 * Two org charts behind ARIA tabs (arrow keys, Home/End). Both charts are
 * rebuilt as HTML from the PROD chart images, so they read and reflow as text.
 * A chart whose row is missing (its image upload failed at seed time) loses its tab;
 * with neither row the section is not shown.
 */
export default function ProfilStruktur({ activeTab: requestedTab, onTabChange }) {
  const { profilPembina, profilPelaksana } = useUksm();
  const tabs = TABS.filter((tab) => (tab.id === 'pembina' ? profilPembina : profilPelaksana));
  const activeTab = tabs.some((tab) => tab.id === requestedTab) ? requestedTab : tabs[0]?.id;
  const tabRefs = useRef({});
  const panelRef = useRef(null);
  const shownTab = useRef(activeTab);

  useGSAP(() => {
    if (shownTab.current === activeTab) return;
    shownTab.current = activeTab;
    if (prefersReducedMotion()) return;
    // profil-org-block is a hook for this tween; it carries no CSS.
    gsap.from('.profil-org-block', {
      opacity: 0,
      y: 10,
      duration: 0.35,
      ease: 'power2.out',
      stagger: 0.05,
      clearProps: 'opacity,transform'
    });
  }, { dependencies: [activeTab], scope: panelRef });

  if (!tabs.length) return null;

  const selectByIndex = (index) => {
    const next = tabs[(index + tabs.length) % tabs.length];
    onTabChange(next.id);
    tabRefs.current[next.id]?.focus();
  };

  const handleKeyDown = (event) => {
    const current = tabs.findIndex((tab) => tab.id === activeTab);
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') selectByIndex(current + 1);
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') selectByIndex(current - 1);
    else if (event.key === 'Home') selectByIndex(0);
    else if (event.key === 'End') selectByIndex(tabs.length - 1);
    else return;
    event.preventDefault();
  };

  const switchTo = (tabId) => {
    onTabChange(tabId);
    tabRefs.current[tabId]?.focus();
  };

  return (
    <section id="sec-profil-struktur" className={SECTION}>
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Struktur Organisasi</span>
          <h2 className="section-title">Siapa mengurus UKS/M di tiap tingkat</h2>
        </div>
      </div>

      <div className="rounded-panel bg-card px-2 pt-2 pb-7 max-[600px]:px-1.5 max-[600px]:pt-1.5 max-[600px]:pb-5" data-gsap="reveal">
        <div className="grid auto-cols-fr grid-flow-col gap-1.5 rounded-card bg-card-alt p-1.5" role="tablist" aria-label="Struktur organisasi">
          {tabs.map((tab) => {
            const selected = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[tab.id] = el; }}
                id={`profil-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="profil-org-panel"
                tabIndex={selected ? 0 : -1}
                className={`${TAB} ${selected ? TAB_ACTIVE : TAB_IDLE}`}
                onClick={() => onTabChange(tab.id)}
                onKeyDown={handleKeyDown}
              >
                <span className="text-[15px] font-extrabold">{tab.label}</span>
                <span className={`text-[13px] ${selected ? 'text-[rgba(255,255,255,0.8)]' : 'text-ink-muted'}`}>{tab.hint}</span>
              </button>
            );
          })}
        </div>

        <div
          ref={panelRef}
          id="profil-org-panel"
          role="tabpanel"
          aria-labelledby={`profil-tab-${activeTab}`}
          tabIndex={0}
          className={`px-5 pt-6 max-[600px]:px-2.5 max-[600px]:pt-5 ${FOCUS_DARK}`}
        >
          {/* The link to the other team is left out when that team has no tab. */}
          {activeTab === 'pembina'
            ? <ProfilPembina onShowPelaksana={profilPelaksana ? () => switchTo('pelaksana') : undefined} />
            : <ProfilPelaksana onShowPembina={profilPembina ? () => switchTo('pembina') : undefined} />}
        </div>
      </div>
    </section>
  );
}
