import { useState } from 'react';
import { realNewsList } from '../../data/portalData';
import SafeImage from '../SafeImage';

export default function BeritaPanel({ onNavigateView }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredNews = activeCategory === 'all'
    ? realNewsList
    : realNewsList.filter(n => n.categoryKey === activeCategory);

  const handleArticleClick = (item) => {
    if (onNavigateView) {
      onNavigateView('berita-detail', null, item.id);
    }
  };

  return (
    <div className="about-bento-frame">
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap',
        gap: '16px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.06)'
      }}>
        <div>
          <span className="section-kicker">Rilis Resmi Kementerian</span>
          <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)' }}>
            Warta Terkini Usaha Kesehatan Sekolah
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', background: 'var(--bg-app)', padding: '6px', borderRadius: 'var(--radius-pill)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)' }}>
          <button className={`subnav-pill ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')} style={{ padding: '8px 16px', fontSize: '13px' }}>Semua Warta</button>
          <button className={`subnav-pill ${activeCategory === 'kebijakan' ? 'active' : ''}`} onClick={() => setActiveCategory('kebijakan')} style={{ padding: '8px 16px', fontSize: '13px' }}>Kebijakan</button>
          <button className={`subnav-pill ${activeCategory === 'kegiatan' ? 'active' : ''}`} onClick={() => setActiveCategory('kegiatan')} style={{ padding: '8px 16px', fontSize: '13px' }}>Kegiatan Lapangan</button>
          <button className={`subnav-pill ${activeCategory === 'sosialisasi' ? 'active' : ''}`} onClick={() => setActiveCategory('sosialisasi')} style={{ padding: '8px 16px', fontSize: '13px' }}>Inovasi GSS</button>
        </div>
      </div>

      <div className="news-masonry">
        {filteredNews.map(item => (
          <div
            key={item.id}
            className="news-card-playful"
            onClick={() => handleArticleClick(item)}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
          >
            <div className="news-img-wrap">
              <SafeImage src={item.image} alt={item.title} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="section-kicker" style={{ margin: 0, padding: '4px 10px', fontSize: '10px' }}>{item.category}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <i className="fa-regular fa-calendar" style={{ marginRight: '5px' }}></i>{item.date}
              </span>
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '6px 0 8px', color: 'var(--text-primary)', lineHeight: 1.35 }}>{item.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '16px', flexGrow: 1 }}>{item.excerpt}</p>
            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Baca Selengkapnya</span><i className="fa-solid fa-arrow-right"></i>
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                <i className="fa-regular fa-eye" style={{ marginRight: '4px' }}></i>{item.views}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

