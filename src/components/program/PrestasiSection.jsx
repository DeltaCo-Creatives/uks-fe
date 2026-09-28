import { useMemo, useState } from 'react';
import LobbyTabs from '../shared/LobbyTabs';
import { ResourcesSection, CompetitionsSection } from './ProgramLinkSections';
import ShowcaseFace from './PrestasiShowcase';
import ProgramLink, { NEW_TAB_HINT } from './ProgramLink';
import FactList from './FactList';
import { useLombaList } from '../../hooks/usePublicLists';
import { LoadingState, ErrorState, EmptyState } from '../shared/AsyncState';

const FACE_TABS = [
  { id: 'mekanisme', icon: 'fa-solid fa-list-check', label: 'Mekanisme' },
  { id: 'pengumuman', icon: 'fa-solid fa-bullhorn', label: 'Pengumuman' },
  { id: 'showcase', icon: 'fa-solid fa-trophy', label: 'Showcase pemenang' }
];

const orUndefined = (arr) => (arr.length ? arr : undefined);

/** Groups LombaTautan-shaped items by `grup` (null → "Unduh"), first-seen order. */
function groupTautan(items) {
  const order = [];
  const byTitle = new Map();
  for (const item of items) {
    const title = item.grup || 'Unduh';
    if (!byTitle.has(title)) {
      byTitle.set(title, []);
      order.push(title);
    }
    byTitle.get(title).push({ title: item.judul, meta: item.keterangan, kind: item.jenis, url: item.url });
  }
  return order.map((title) => ({ title, items: byTitle.get(title) }));
}

/**
 * Adapts a PublicLombaDto (GET /public/lomba) to the item shape the
 * rendering components below already expect. Empty arrays become
 * `undefined` so the existing `data.x &&` checks in MekanismeFace,
 * PengumumanFace, etc. keep working unchanged.
 */
function mapLombaToItem(dto) {
  return {
    id: dto.id,
    year: String(dto.tahun),
    title: dto.judul,
    status: dto.keterangan,
    faces: {
      mekanisme: {
        lead: dto.deskripsi,
        flyers: dto.flyer.length
          ? { caption: dto.flyerKeterangan, credit: dto.sumber, items: dto.flyer.map((f) => ({ src: f.url, alt: f.alt })) }
          : undefined,
        tujuan: orUndefined(dto.tujuan),
        facts: orUndefined(dto.fakta.map((f) => ({ label: f.label, value: f.nilai }))),
        competitions: dto.pendaftaran
          ? {
              open: dto.pendaftaran.dibuka,
              note: dto.pendaftaran.catatan,
              items: dto.pendaftaran.items.map((i) => ({ level: i.jenjang, title: i.judul, url: i.url })),
              guide: dto.pendaftaran.panduan
                ? { title: dto.pendaftaran.panduan.judul, url: dto.pendaftaran.panduan.url }
                : undefined
            }
          : undefined,
        downloads: dto.unduhan.length ? { groups: groupTautan(dto.unduhan) } : undefined
      },
      pengumuman: dto.pengumuman && {
        note: dto.pengumuman.catatan,
        groups: dto.pengumuman.items.length ? groupTautan(dto.pengumuman.items) : undefined,
        source: dto.pengumuman.sumber
      },
      showcase: dto.pemenang.length
        ? {
            winners: dto.pemenang.map((w) => ({
              school: w.sekolah,
              kabkota: w.kabKota,
              provinsi: w.provinsi,
              jenjang: w.jenjang,
              kategori: w.kategori,
              youtube: w.urlYoutube,
              social: w.urlSosial
            })),
            note: dto.showcaseCatatan
          }
        : null
    }
  };
}

/**
 * The official flyers. At card width the text printed on them is too small to
 * read, so each one links out to the full-size file rather than pretending the
 * thumbnail is legible. `credit` is optional: not every flyer has a source.
 *
 * @param {{ flyers: { caption: string, credit: {label: string, url: string} | null, items: {src: string, alt: string}[] } }} props
 */
function FlyerStrip({ flyers }) {
  return (
    <figure className="prestasi-flyers">
      <div className="prestasi-flyer-grid">
        {flyers.items.map((flyer) => (
          <a key={flyer.src} href={flyer.src} target="_blank" rel="noopener noreferrer">
            <img src={flyer.src} alt={flyer.alt} loading="lazy" />
            <span className="prog-sr-only">{NEW_TAB_HINT}</span>
          </a>
        ))}
      </div>
      <figcaption>
        {flyers.caption}
        {flyers.credit && (
          <>
            {' '}
            <ProgramLink url={flyers.credit.url} className="prog-credit">Sumber: {flyers.credit.label}</ProgramLink>
          </>
        )}
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
        {activeTab === 'showcase' && <ShowcaseFace winners={face.winners} note={face.note} />}
      </div>
    </article>
  );
}

/** Prestasi: every competition run through UKS/M, each with up to three faces. */
export default function PrestasiSection() {
  const { data, loading, error, retry } = useLombaList();
  const items = useMemo(() => (data || []).map(mapLombaToItem), [data]);

  if (loading) return <LoadingState label="Memuat daftar kompetisi..." />;

  if (error) {
    return (
      <ErrorState
        title="Daftar kompetisi tidak dapat dimuat"
        text="Terjadi gangguan saat mengambil data kompetisi. Silakan coba lagi."
        retry={retry}
      />
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon="fa-solid fa-trophy"
        title="Belum ada kompetisi terdaftar"
        text="Daftar kompetisi akan tampil di sini begitu tersedia."
      />
    );
  }

  return (
    <div className="prestasi-list-wrap">
      {items.map((item) => <CompetitionCard key={item.id} item={item} />)}
    </div>
  );
}
