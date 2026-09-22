import { useState } from 'react';
import LobbyTabs from '../shared/LobbyTabs';
import { ResourcesSection, CompetitionsSection } from './ProgramLinkSections';
import ShowcaseFace from './PrestasiShowcase';
import ProgramLink, { NEW_TAB_HINT } from './ProgramLink';
import FactList from './FactList';

const FACE_TABS = [
  { id: 'mekanisme', icon: 'fa-solid fa-list-check', label: 'Mekanisme' },
  { id: 'pengumuman', icon: 'fa-solid fa-bullhorn', label: 'Pengumuman' },
  { id: 'showcase', icon: 'fa-solid fa-trophy', label: 'Showcase pemenang' }
];

/**
 * The official flyers. At card width the text printed on them is too small to
 * read, so each one links out to the full-size file rather than pretending the
 * thumbnail is legible.
 *
 * @param {{ flyers: { caption: string, credit: {label: string, url: string}, items: {src: string, alt: string, width: number, height: number}[] } }} props
 */
function FlyerStrip({ flyers }) {
  return (
    <figure className="prestasi-flyers">
      <div className="prestasi-flyer-grid">
        {flyers.items.map((flyer) => (
          <a key={flyer.src} href={flyer.src} target="_blank" rel="noopener noreferrer">
            <img src={flyer.src} alt={flyer.alt} width={flyer.width} height={flyer.height} loading="lazy" />
            <span className="prog-sr-only">{NEW_TAB_HINT}</span>
          </a>
        ))}
      </div>
      <figcaption>
        {flyers.caption}{' '}
        <ProgramLink url={flyers.credit.url} className="prog-credit">Sumber: {flyers.credit.label}</ProgramLink>
      </figcaption>
    </figure>
  );
}

/** What the competition is, who it is for, and the rules/downloads. */
function MekanismeFace({ data }) {
  return (
    <div className="prestasi-face">
      <p className="prog-lead">{data.lead}</p>
      {data.flyers && <FlyerStrip flyers={data.flyers} />}
      {data.tujuan && (
        <ul className="prestasi-list">
          {data.tujuan.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}
      {data.facts && <FactList facts={data.facts} compact />}
      {data.competitions && <CompetitionsSection section={data.competitions} />}
      {data.downloads && <ResourcesSection section={data.downloads} />}
    </div>
  );
}

/** The winner announcement: SK, the official document, and the announcement posts. Honest empty state when none exists yet. */
function PengumumanFace({ data }) {
  if (!data.groups) {
    return (
      <div className="prestasi-empty">
        <i className="fa-regular fa-file-lines" aria-hidden="true"></i>
        <p>{data.note}</p>
      </div>
    );
  }

  return (
    <div className="prestasi-face">
      <ResourcesSection section={data} />
      {data.source && <p className="prog-note">Sumber: {data.source}</p>}
    </div>
  );
}

function CompetitionCard({ item }) {
  const tabs = FACE_TABS.filter((tab) => item.faces[tab.id]);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const face = item.faces[activeTab];

  return (
    <article className="prestasi-contest">
      <header className="prestasi-contest-head">
        <span className="prog-edition-year">{item.year}</span>
        <div>
          <h4>{item.title}</h4>
          <p className="prestasi-status">{item.status}</p>
        </div>
      </header>

      {tabs.length > 1 && (
        <LobbyTabs tabs={tabs} activeId={activeTab} onSelect={setActiveTab} label={`Tampilan ${item.title}`} />
      )}

      <div className="prestasi-contest-body">
        {activeTab === 'mekanisme' && <MekanismeFace data={face} />}
        {activeTab === 'pengumuman' && <PengumumanFace data={face} />}
        {activeTab === 'showcase' && <ShowcaseFace competitionId={face.competitionId} note={face.note} />}
      </div>
    </article>
  );
}

/** Prestasi: every competition run through UKS/M, each with up to three faces. */
export default function PrestasiSection({ section }) {
  return (
    <div className="prestasi-list-wrap">
      {section.items.map((item) => <CompetitionCard key={item.id} item={item} />)}
    </div>
  );
}
