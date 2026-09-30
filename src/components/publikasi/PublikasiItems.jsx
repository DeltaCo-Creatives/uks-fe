import { countPublikasiView } from '../../utils/counters';
import SafeImage from '../SafeImage';

export function BookGrid({ books, onRead }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))', gap: '20px' }}>
      {books.map((buku) => {
        const metaParts = [buku.pages, buku.size].filter(Boolean);
        return (
          <div key={buku.id} className="book-swipe-card" style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '20px', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', transition: 'var(--spring)' }}>
            <div className="book-cover-large"><SafeImage src={buku.cover} alt={buku.title} icon="fa-regular fa-file-pdf" /></div>
            {buku.category && (
              <span className="section-kicker" style={{ margin: '0 0 8px', padding: '4px 10px', fontSize: '10px' }}>{buku.category}</span>
            )}
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{buku.title}</h3>
            {buku.desc && (
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>{buku.desc}</p>
            )}
            {metaParts.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '16px' }}>
                {buku.pages && <span><i className="fa-regular fa-file-pdf" style={{ marginRight: '4px' }}></i>{buku.pages}</span>}
                {buku.pages && buku.size && <span>•</span>}
                {buku.size && <span>{buku.size}</span>}
              </div>
            )}
            {(buku.pdf || buku.externalUrl) && (
              <div className="book-swipe-actions">
                {buku.pdf ? (
                  <>
                    <button className="btn-pill primary" onClick={() => { countPublikasiView(buku.slug); onRead(buku); }}>
                      <i className="fa-solid fa-book-open" style={{ marginRight: '6px' }}></i>Baca Online
                    </button>
                    <a href={buku.pdf} download className="btn-pill secondary" style={{ textDecoration: 'none' }}>
                      <i className="fa-solid fa-download"></i>
                    </a>
                  </>
                ) : (
                  <a href={buku.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-pill secondary" style={{ textDecoration: 'none' }}>
                    <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginRight: '6px' }}></i>Buka Tautan
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function InfografisGrid({ items, onZoom }) {
  return (
    <div className="infografis-grid">
      {items.map((item) => (
        <figure key={item.id} className="infografis-tile">
          <button
            type="button"
            className="infografis-frame"
            onClick={() => { if (!item.image) return; countPublikasiView(item.slug); onZoom({ src: item.image, title: item.title }); }}
            disabled={!item.image}
          >
            <SafeImage src={item.image} alt={item.title} loading="lazy" style={{ aspectRatio: '3 / 4' }} />
            {item.image && <span className="infografis-zoom" aria-hidden="true"><i className="fa-solid fa-expand"></i></span>}
          </button>
          <figcaption>
            <span className="infografis-title">{item.title}</span>
            {item.image && (
              <a className="infografis-download" href={item.image} download>
                <i className="fa-solid fa-download" aria-hidden="true"></i>
                <span>Unduh</span>
              </a>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function VideoGrid({ videos }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
      {videos.map(vid => (
        <a key={vid.id} className="video-card-playful" href={vid.youtubeUrl} target="_blank" rel="noopener noreferrer">
          <div className="video-thumb-wrap">
            <img src={vid.thumb} alt={vid.title} />
            <div className="video-play-overlay"><div className="video-play-badge"><i className="fa-solid fa-play"></i></div></div>
            {vid.duration && (
              <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontSize: '11px', fontWeight: 800 }}>
                {vid.duration}
              </span>
            )}
          </div>
          <div style={{ padding: '20px' }}>
            {vid.channel && <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase' }}>{vid.channel}</span>}
            <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)', lineHeight: 1.4 }}>{vid.title}</h4>
          </div>
        </a>
      ))}
    </div>
  );
}

export function RegulasiList({ regulations }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {regulations.map((reg) => (
        <div key={reg.id} className="download-doc-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'var(--brand-light)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
              <i className="fa-solid fa-scale-balanced"></i>
            </div>
            <div>
              {reg.badge && <span className="indicator-card-tag" style={{ margin: '0 0 4px', fontSize: '9px' }}>{reg.badge}</span>}
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 4px' }}>{reg.title}</h4>
              {reg.number && <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{reg.number}</p>}
            </div>
          </div>
          <a href={reg.file} download className="btn-massive" style={{ padding: '8px 18px', fontSize: '13px', whiteSpace: 'nowrap' }}>
            <i className="fa-solid fa-download"></i><span>Unduh{reg.size ? ` (${reg.size})` : ''}</span>
          </a>
        </div>
      ))}
    </div>
  );
}
