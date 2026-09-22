import { useMemo, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { pathForView } from '../routes';
import {
  triasPillarsDetail,
  strataLevels,
  priorityProgramsList,
  realBooksList,
  realNewsList,
  bestPracticesList,
  nationalAgendas,
  videoList,
  regulationsList,
  appsList,
  uptStories
} from '../data/portalData';

export default function SearchView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const inputRef = useRef(null);

  // Replace rather than push: one history entry for the search, not one per keystroke.
  const setQuery = (value) => {
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  const suggestionChips = [
    'Kesehatan Siswa',
    'UKS Mandiri',
    'Gizi Sekolah',
    'Cuci Tangan'
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Build unified search index once
  const searchIndex = useMemo(() => {
    const items = [];

    // 1. Trias sub-programs
    Object.values(triasPillarsDetail).forEach((pilar) => {
      pilar.items.forEach((item) => {
        items.push({
          id: `trias-${item.id}`,
          title: item.title,
          excerpt: `${item.description || pilar.description} (${pilar.title})`,
          typeLabel: 'Trias UKS/M',
          typeColor: pilar.color,
          icon: pilar.icon,
          viewKey: 'uksm-trias',
          sectionId: `sec-trias-${pilar.id}`
        });
      });
    });

    // 2. Strata Levels
    strataLevels.forEach((strata) => {
      items.push({
        id: `strata-${strata.key}`,
        title: `Strata ${strata.name}`,
        excerpt: `Indikator jenjang SD: ${Object.values(strata.requirementsSD).flat().join('; ')}`,
        typeLabel: 'Stratifikasi UKS/M',
        typeColor: strata.color,
        icon: 'fa-solid fa-layer-group',
        viewKey: 'uksm-stratifikasi',
        sectionId: 'sec-strat-indikator'
      });
    });

    // 3. Priority Programs
    priorityProgramsList.forEach((prog) => {
      items.push({
        id: `prog-${prog.id}`,
        title: prog.title,
        excerpt: `${prog.agency}. ${prog.lead} ${prog.sections.map((section) => section.title).join(' · ')}`,
        typeLabel: 'Program Prioritas',
        typeColor: '#098C4C',
        icon: prog.icon,
        viewKey: 'program',
        sectionId: prog.id
      });
    });

    // 4. Digital Books
    realBooksList.forEach((book) => {
      items.push({
        id: `book-${book.id}`,
        title: book.title,
        excerpt: `${book.category} (${book.year}) - ${book.desc}`,
        typeLabel: 'Buku & Juknis',
        typeColor: '#D97706',
        icon: 'fa-solid fa-book-bookmark',
        viewKey: 'publikasi',
        sectionId: 'sec-pub-books'
      });
    });

    // 5. News
    realNewsList.forEach((news) => {
      items.push({
        id: `news-${news.id}`,
        title: news.title,
        excerpt: `${news.date} · ${news.category} - ${news.excerpt}`,
        typeLabel: 'Warta Terkini',
        typeColor: '#2563EB',
        icon: 'fa-solid fa-newspaper',
        viewKey: 'informasi',
        sectionId: 'sec-info-berita'
      });
    });

    // 6. Best Practices
    bestPracticesList.forEach((bp, idx) => {
      items.push({
        id: `bp-${idx}`,
        title: bp.title,
        excerpt: `${bp.level} - ${bp.desc}`,
        typeLabel: 'Praktik Baik',
        typeColor: '#059669',
        icon: 'fa-solid fa-award',
        viewKey: 'informasi',
        sectionId: 'sec-info-praktik'
      });
    });

    // 7. Agenda
    nationalAgendas.forEach((ag, idx) => {
      items.push({
        id: `agenda-${idx}`,
        title: ag.title,
        excerpt: `${ag.day} ${ag.month} · ${ag.organizer} di ${ag.location} (${ag.status})`,
        typeLabel: 'Agenda Nasional',
        typeColor: '#7C3AED',
        icon: 'fa-solid fa-calendar-days',
        viewKey: 'informasi',
        sectionId: 'sec-info-agenda'
      });
    });

    // 8. Videos
    videoList.forEach((vid) => {
      items.push({
        id: `vid-${vid.id}`,
        title: vid.title,
        excerpt: `Durasi: ${vid.duration} · Kanal: ${vid.channel}`,
        typeLabel: 'Video Edukasi',
        typeColor: '#DC2626',
        icon: 'fa-solid fa-film',
        viewKey: 'publikasi',
        sectionId: 'sec-pub-video'
      });
    });

    // 9. Regulations
    regulationsList.forEach((reg) => {
      items.push({
        id: `reg-${reg.code}`,
        title: reg.title,
        excerpt: `${reg.badge} · ${reg.number}`,
        typeLabel: 'Produk Hukum SKB',
        typeColor: '#1E293B',
        icon: 'fa-solid fa-scale-balanced',
        viewKey: 'publikasi',
        sectionId: 'sec-pub-regulasi'
      });
    });

    // 10. Apps
    appsList.forEach((app) => {
      items.push({
        id: `app-${app.id}`,
        title: app.name,
        excerpt: `${app.publisher} · ${app.tagline || ''} - ${app.description}`,
        typeLabel: 'Aplikasi Terkait',
        typeColor: '#0284C7',
        icon: 'fa-solid fa-mobile-screen',
        viewKey: 'informasi',
        sectionId: 'sec-info-aplikasi'
      });
    });

    // 11. UPT Stories
    uptStories.forEach((st) => {
      items.push({
        id: `upt-${st.id}`,
        title: st.title,
        excerpt: `${st.region} · Kategori: ${st.category} - ${st.excerpt}`,
        typeLabel: 'UPT Bercerita',
        typeColor: '#059669',
        icon: 'fa-solid fa-book-open-reader',
        viewKey: 'informasi',
        sectionId: 'sec-info-upt'
      });
    });

    return items;
  }, []);

  // Normalization helper for accent and case insensitivity
  const normalize = (str) =>
    (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const terms = normalize(trimmed).split(/\s+/).filter(Boolean);

    return searchIndex.filter((item) => {
      const target = `${normalize(item.title)} ${normalize(item.excerpt)} ${normalize(item.typeLabel)}`;
      return terms.every((term) => target.includes(term));
    });
  }, [query, searchIndex]);

  return (
    <div className="container" style={{ padding: '32px 20px 80px', minHeight: '75vh' }}>
      {/* Search Header Banner */}
      <div
        className="subpage-hero-banner"
        style={{
          background: 'linear-gradient(135deg, #111C16 0%, #098C4C 100%)',
          textAlign: 'center',
          padding: '44px 24px 36px',
          marginBottom: '32px'
        }}
      >
        <span className="subpage-hero-kicker" style={{ margin: '0 auto 12px' }}>
          <i className="fa-solid fa-magnifying-glass"></i> Indeks Pencarian Nasional
        </span>
        <h1 className="subpage-hero-title" style={{ fontSize: 'clamp(26px, 3.6vw, 36px)' }}>
          Pusat Informasi &amp; Sumber Daya UKS/M
        </h1>
        <p className="subpage-hero-desc" style={{ margin: '0 auto 24px', maxWidth: '640px' }}>
          Cari sub-program Trias UKS/M, strata kesiapan, warta kebijakan, modul panduan, hingga regulasi SKB 4 Menteri.
        </p>

        {/* Input Field Container */}
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 12px 6px 20px',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.2)',
              border: '2px solid transparent'
            }}
          >
            <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--brand-primary)', fontSize: '18px', marginRight: '12px' }}></i>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setQuery('');
              }}
              placeholder="Ketik kata kunci (contoh: gizi, imunisasi, kantin, CTPS)..."
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                fontFamily: 'inherit'
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{
                  background: 'rgba(0, 0, 0, 0.06)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)'
                }}
                title="Hapus pencarian"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>

        {/* Suggestion Chips */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Saran pencarian:</span>
          {suggestionChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setQuery(chip)}
              style={{
                background: query === chip ? '#FFFFFF' : 'rgba(255, 255, 255, 0.16)',
                color: query === chip ? 'var(--brand-primary)' : '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--radius-pill)',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'var(--spring)'
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Main Results Container */}
      {!query.trim() && (
        <div
          className="about-bento-frame"
          style={{ textAlign: 'center', padding: '60px 24px', background: '#FFFFFF' }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'var(--brand-light)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              margin: '0 auto 18px'
            }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Mulai Pencarian Portal UKS/M
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 20px', lineHeight: 1.6 }}>
            Ketik kata kunci apa pun pada kolom pencarian di atas, atau klik salah satu pilihan saran kata kunci untuk melihat direktori terkait.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span><i className="fa-solid fa-check" style={{ color: 'var(--brand-primary)', marginRight: '6px' }}></i> 16 Sub-program Trias</span>
            <span><i className="fa-solid fa-check" style={{ color: 'var(--brand-primary)', marginRight: '6px' }}></i> Buku Panduan Resmi</span>
            <span><i className="fa-solid fa-check" style={{ color: 'var(--brand-primary)', marginRight: '6px' }}></i> Inisiatif Program</span>
          </div>
        </div>
      )}

      {query.trim() && results.length === 0 && (
        <div
          className="about-bento-frame"
          style={{ textAlign: 'center', padding: '60px 24px', background: '#FFFFFF' }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#FEE2E2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              margin: '0 auto 16px'
            }}
          >
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Tidak Ditemukan Hasil untuk "{query}"
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 16px', lineHeight: 1.6 }}>
            Mohon periksa kembali ejaan kata kunci Anda atau coba gunakan kata kunci umum lainnya seperti <em>Gizi</em>, <em>Kantin</em>, atau <em>Imunisasi</em>.
          </p>
          <button
            onClick={() => setQuery('')}
            className="btn-pill secondary"
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {query.trim() && results.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Menampilkan <strong style={{ color: 'var(--brand-primary)' }}>{results.length}</strong> hasil untuk "{query}"
            </span>
            <button
              onClick={() => setQuery('')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                cursor: 'pointer'
              }}
            >
              Bersihkan Hasil
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '16px' }}>
            {results.map((item) => (
              <Link
                key={item.id}
                to={pathForView(item.viewKey, item.sectionId)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  border: '1.5px solid rgba(0,0,0,0.06)',
                  boxShadow: 'var(--shadow-card)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'var(--spring)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--brand-primary)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        color: item.typeColor || 'var(--brand-primary)',
                        background: 'var(--bg-app)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <i className={item.icon || 'fa-solid fa-circle-dot'} style={{ fontSize: '10px' }}></i>
                      {item.typeLabel}
                    </span>
                    <i className="fa-solid fa-chevron-right" style={{ fontSize: '11px', color: 'var(--text-secondary)', opacity: 0.5 }}></i>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px', lineHeight: 1.35 }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {item.excerpt}
                  </p>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--brand-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span>Buka Halaman</span>
                    <i className="fa-solid fa-arrow-right" style={{ fontSize: '10px' }}></i>
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    Bagian #{item.sectionId || item.viewKey}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

