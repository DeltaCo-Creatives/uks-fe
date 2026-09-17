import { useState, useMemo } from 'react';
import { mitraActivities } from '../../data/portalData';
import SafeImage from '../SafeImage';

export default function AktivitasPanel() {
  const [partnerFilter, setPartnerFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // Extract unique partner list for filter pills
  const partners = useMemo(() => {
    const list = Array.from(new Set(mitraActivities.map((a) => a.partner)));
    return ['all', ...list];
  }, []);

  const filteredAndSortedActivities = useMemo(() => {
    let result = partnerFilter === 'all'
      ? [...mitraActivities]
      : mitraActivities.filter((a) => a.partner === partnerFilter);

    result.sort((a, b) => {
      // Sort based on id (higher id = newer)
      return sortOrder === 'newest' ? b.id - a.id : a.id - b.id;
    });

    return result;
  }, [partnerFilter, sortOrder]);

  return (
    <div className="about-bento-frame">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(0,0,0,0.06)'
        }}
      >
        <div>
          <span className="section-kicker">Warta Kolaborasi</span>
          <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 4px', color: 'var(--text-primary)' }}>
            Aktivitas Mitra UKS/M di Lapangan
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
            Dokumentasi kegiatan intervensi nyata dan sinergi multipihak di satuan pendidikan se-Indonesia.
          </p>
        </div>

        {/* Sort Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Urutkan:</span>
          <button
            className={`subnav-pill ${sortOrder === 'newest' ? 'active' : ''}`}
            onClick={() => setSortOrder('newest')}
            style={{ padding: '6px 14px', fontSize: '12px' }}
          >
            <i className="fa-solid fa-arrow-down-wide-short" style={{ marginRight: '6px' }}></i>
            Terbaru
          </button>
          <button
            className={`subnav-pill ${sortOrder === 'oldest' ? 'active' : ''}`}
            onClick={() => setSortOrder('oldest')}
            style={{ padding: '6px 14px', fontSize: '12px' }}
          >
            <i className="fa-solid fa-arrow-up-wide-short" style={{ marginRight: '6px' }}></i>
            Terdahulu
          </button>
        </div>
      </div>

      {/* Partner Filter Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        {partners.map((p) => (
          <button
            key={p}
            className={`subnav-pill ${partnerFilter === p ? 'active' : ''}`}
            onClick={() => setPartnerFilter(p)}
            style={{ padding: '6px 14px', fontSize: '12px' }}
          >
            {p === 'all' ? 'Semua Lembaga Mitra' : p}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      {filteredAndSortedActivities.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px', background: 'var(--bg-app)', borderRadius: 'var(--radius-lg)' }}>
          <i className="fa-solid fa-folder-open" style={{ fontSize: '32px', color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '12px' }}></i>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
            Tidak ada aktivitas ditemukan
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Belum ada dokumentasi publikasi untuk mitra yang dipilih.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '20px' }}>
          {filteredAndSortedActivities.map((item) => (
            <div
              key={item.id}
              className="news-card-playful"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div className="news-img-wrap" style={{ height: '200px' }}>
                <SafeImage src={item.image} alt={item.title} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span
                  className="section-kicker"
                  style={{
                    margin: 0,
                    padding: '3px 8px',
                    fontSize: '10px',
                    background: 'var(--brand-light)',
                    color: 'var(--brand-primary)'
                  }}
                >
                  {item.category}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  <i className="fa-regular fa-calendar" style={{ marginRight: '4px' }}></i>
                  {item.date}
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '4px 0 8px', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px', flexGrow: 1 }}>
                {item.excerpt}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--brand-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fa-solid fa-handshake-angle"></i>
                  <span>{item.partner}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

