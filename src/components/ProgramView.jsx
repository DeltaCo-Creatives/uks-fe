import { priorityProgramsList } from '../data/portalData';

// The two closing topics don't have a Kementerian program-office shape
// (no external links / hero image) — just a header + a small card grid —
// so they're kept as plain local data rather than forced into portalData's
// priorityProgramsList shape.
const extraProgramItems = [
  {
    id: 'sec-prog-dokcil',
    navLabel: 'Dokter Kecil & KKR',
    icon: 'fa-solid fa-user-doctor',
    kicker: 'Kader Kesehatan Siswa',
    title: '5. Pembinaan Dokter Kecil & Kader Kesehatan Remaja (KKR)',
    desc: 'Pelatihan terstruktur bagi murid SD/MI (Dokter Kecil) dan peserta didik SMP/SMA/SMK (Kader Kesehatan Remaja / KKR) untuk menumbuhkan keteladanan teman sebaya (peer educator) dalam membudayakan Perilaku Hidup Bersih dan Sehat.',
    cards: [
      {
        icon: 'fa-solid fa-stethoscope',
        bg: 'var(--brand-light)',
        color: 'var(--brand-primary)',
        title: 'Pemeriksaan Ringan Berkala',
        desc: 'Membantu guru pembina UKS dalam pengukuran antropometri (tinggi & berat badan) berkala, serta uji tajam penglihatan menggunakan kartu Snellen.'
      },
      {
        icon: 'fa-solid fa-kit-medical',
        bg: '#DBEAFE',
        color: '#2563EB',
        title: 'Pertolongan Pertama (P3K)',
        desc: 'Terampil menangani luka ringan, lecet, mimisan, kram otot saat olahraga, pingsan saat upacara bendera, dan pencatatan riwayat istirahat di ruang UKS.'
      },
      {
        icon: 'fa-solid fa-people-group',
        bg: '#FEF3C7',
        color: '#D97706',
        title: 'Edukasi & Teladan Sebaya',
        desc: 'Menggerakkan teman sekelas untuk selalu cuci tangan pakai sabun (CTPS), menghabiskan bekal sarapan bergizi seimbang, dan menghentikan kebiasaan merokok/vaping.'
      }
    ]
  },
  {
    id: 'sec-prog-sarpras',
    navLabel: 'Sarpras UKS',
    icon: 'fa-solid fa-couch',
    kicker: 'Fasilitas Standar Sekolah',
    title: '6. Standardisasi Ruang UKS & Sarpras Higienis',
    desc: 'Kemendikdasmen menetapkan pedoman teknis fasilitas fisik ruang UKS yang ramah anak, bersih, dan memadai guna mendukung pertolongan pertama dan pemulihan kesehatan murid di sekolah.',
    cards: [
      {
        icon: 'fa-solid fa-bed',
        bg: 'var(--bg-card-alt)',
        color: 'var(--text-primary)',
        title: 'Tempat Periksa Terpisah',
        desc: 'Minimal memiliki 2 tempat tidur periksa (terpisah putra dan putri) dilengkapi tirai sekat privasi, bantal berkain bersih, dan sprei yang dicuci teratur.'
      },
      {
        icon: 'fa-solid fa-faucet-detergent',
        bg: 'var(--bg-card-alt)',
        color: 'var(--brand-primary)',
        title: 'Sanitasi Air Mengalir & CTPS',
        desc: 'Wastafel cuci tangan dengan air bersih mengalir deras, dispenser sabun cair antibakteri, tempat sampah medis tertutup injak, dan lap kain/tisu sekali pakai.'
      },
      {
        icon: 'fa-solid fa-weight-scale',
        bg: 'var(--bg-card-alt)',
        color: '#D97706',
        title: 'Alat Ukur Medis Standar',
        desc: 'Stadiometer presisi, timbangan badan digital terkalibrasi, tensimeter digital manset anak, termometer infrared dahi, serta lemari obat berkunci.'
      }
    ]
  }
];

const allProgramItems = [...priorityProgramsList, ...extraProgramItems];

function FeaturedProgram({ prog }) {
  return (
    <div className="about-bento-frame">
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        flexWrap: 'wrap', gap: '16px', marginBottom: '24px', paddingBottom: '20px',
        borderBottom: '1px solid rgba(0,0,0,0.06)'
      }}>
        <div>
          <span className="section-kicker">
            <i className="fa-solid fa-shield-halved" style={{ marginRight: '6px' }}></i>
            {prog.kicker}
          </span>
          <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 8px', color: 'var(--text-primary)' }}>
            {prog.title}
          </h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: 'var(--brand-primary)', background: 'var(--brand-light)', padding: '4px 12px', borderRadius: 'var(--radius-pill)' }}>
            <i className="fa-solid fa-building-columns"></i>
            <span>{prog.agency}</span>
          </div>
        </div>

        {prog.links.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            {prog.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={i === 0 ? 'btn-massive' : 'btn-pill secondary'}
                style={i === 0 ? { padding: '10px 22px', fontSize: '14px' } : { padding: '10px 18px', fontSize: '13px' }}
              >
                <span>{link.label}</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            ))}
          </div>
        )}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '28px', alignItems: 'center'
      }}>
        <div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '20px' }}>
            {prog.desc}
          </p>

          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '22px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-card)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '14px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-circle-check" style={{ color: 'var(--brand-primary)' }}></i>
              Fokus Implementasi Utama di Satuan Pendidikan:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {prog.pillars.map((pil, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--brand-light)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0, marginTop: '2px' }}>
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <span>{pil}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-card)', aspectRatio: '4/3', background: 'var(--text-primary)' }}>
          <img
            src={prog.image}
            alt={prog.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(17,28,22,0.85) 0%, transparent 100%)', color: '#FFFFFF' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--brand-accent)' }}>
              Dokumentasi Lapangan
            </span>
            <h5 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 0' }}>
              {prog.title}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

function GridProgram({ prog }) {
  return (
    <div className="about-bento-frame">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-kicker">{prog.kicker}</span>
        <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
          {prog.title}
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px' }}>
          {prog.desc}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
        {prog.cards.map((card, idx) => (
          <div key={idx} className="stat-box" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '24px' }}>
            <div className="program-icon" style={{ background: card.bg, color: card.color, marginBottom: '14px' }}>
              <i className={card.icon}></i>
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
              {card.title}
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProgramView({ activeSection, onNavigateSection }) {
  const activeId = allProgramItems.some(p => p.id === activeSection) ? activeSection : allProgramItems[0].id;
  const active = allProgramItems.find(p => p.id === activeId);

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>

      {/* Subpage Hero Banner */}
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-layer-group"></i> Inisiatif Strategis 2026 · Transformasi Nasional
        </span>
        <h1 className="subpage-hero-title">
          Program Prioritas Usaha Kesehatan Sekolah (UKS/M)
        </h1>
        <p className="subpage-hero-desc">
          Inisiatif terpadu lintas 4 Kementerian untuk mengakselerasi pemenuhan nutrisi bergizi, deteksi dini kesehatan berkala, pencegahan anemia, sanitasi air bersih, serta pembinaan kader dokter kecil menuju Generasi Sehat Indonesia Emas 2045.
        </p>
      </div>

      {/* LOBBY: pick a program, the panel below shows it */}
      <div className="lobby-tabs" data-gsap="reveal">
        {allProgramItems.map((item, idx) => (
          <button
            key={item.id}
            className={`lobby-tab ${activeId === item.id ? 'active' : ''}`}
            onClick={() => onNavigateSection(item.id)}
          >
            <i className={item.icon}></i>
            <span>{idx + 1}. {item.navLabel || item.title}</span>
          </button>
        ))}
      </div>

      {/* GIANT DISPLAY PANEL */}
      <div className="lobby-panel" data-gsap="reveal" key={active.id}>
        {active.pillars ? <FeaturedProgram prog={active} /> : <GridProgram prog={active} />}
      </div>

    </div>
  );
}
