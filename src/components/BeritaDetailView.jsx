import { Link, useParams } from 'react-router-dom';
import { pathForArticle, pathForView } from '../routes';
import { useBerita, useBeritaList } from '../hooks/useBerita';
import SafeImage from './SafeImage';
import NotFoundView from './NotFoundView';
import './BeritaDetailView.css';

export default function BeritaDetailView() {
  const { idOrSlug } = useParams();
  const { data: article, loading, error } = useBerita(idOrSlug);
  const { data: newsList } = useBeritaList();

  if (loading) {
    return (
      <div className="container" style={{ padding: '24px 20px 80px', maxWidth: '980px' }}>
        <div className="about-bento-frame" style={{ background: '#FFFFFF', padding: 'clamp(24px, 4vw, 44px)', textAlign: 'center' }} role="status" aria-live="polite">
          <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" style={{ fontSize: '28px', color: 'var(--brand-primary)', marginBottom: '12px' }}></i>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontWeight: 600 }}>Memuat warta...</p>
        </div>
      </div>
    );
  }

  if (error?.status === 404) {
    return <NotFoundView />;
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '24px 20px 80px', maxWidth: '980px' }}>
        <div className="about-bento-frame" style={{ background: '#FFFFFF', padding: 'clamp(24px, 4vw, 44px)', textAlign: 'center' }}>
          <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" style={{ fontSize: '28px', color: '#DC2626', marginBottom: '12px' }}></i>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Warta tidak dapat dimuat</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Terjadi gangguan saat mengambil data warta. Silakan coba lagi.</p>
          <Link to={pathForView('informasi', 'sec-info-berita')} className="btn-pill secondary" style={{ padding: '10px 20px', fontSize: '13px' }}>
            Kembali ke Daftar Warta
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return <NotFoundView />;
  }

  const otherArticles = (newsList || []).filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <div className="container" style={{ padding: '24px 20px 80px', maxWidth: '980px' }}>
      {/* Article Header Card */}
      <div
        className="about-bento-frame"
        style={{ background: '#FFFFFF', padding: 'clamp(24px, 4vw, 44px)', marginBottom: '36px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <span
            className="section-kicker"
            style={{
              margin: 0,
              padding: '5px 14px',
              fontSize: '11px',
              background: 'var(--brand-light)',
              color: 'var(--brand-primary)'
            }}
          >
            {article.category}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <i className="fa-regular fa-calendar"></i>
            {article.date}
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(24px, 3.8vw, 38px)',
            fontWeight: 800,
            lineHeight: 1.25,
            color: 'var(--text-primary)',
            margin: '0 0 16px'
          }}
        >
          {article.title}
        </h1>

        {article.author && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--brand-primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}
            >
              <i className="fa-solid fa-feather-pointed"></i>
            </div>
            <span>Oleh: <strong style={{ color: 'var(--text-primary)' }}>{article.author}</strong></span>
          </div>
        )}

        {/* Hero Image */}
        <div
          style={{
            width: '100%',
            maxHeight: '440px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <SafeImage
            src={article.image}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Excerpt Lead */}
        <p
          style={{
            fontSize: 'clamp(16px, 1.8vw, 18px)',
            fontWeight: 600,
            lineHeight: 1.7,
            color: 'var(--brand-primary)',
            borderLeft: '4px solid var(--brand-primary)',
            paddingLeft: '20px',
            margin: '0 0 28px',
            fontStyle: 'italic'
          }}
        >
          {article.excerpt}
        </p>

        {/* Article body: sanitized server-side, rendered as HTML */}
        {article.content ? (
          <div
            className="article-html-content"
            style={{ fontSize: '16px', lineHeight: 1.85, color: '#1E293B' }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <p style={{ fontSize: '16px', lineHeight: 1.85, color: '#1E293B', margin: 0 }}>{article.excerpt}</p>
        )}

        {article.sourceUrl && (
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
            style={{ marginTop: '24px', padding: '10px 20px', fontSize: '13px', background: 'var(--bg-app)', border: '1px solid rgba(0,0,0,0.08)', display: 'inline-flex' }}
          >
            Baca artikel asli di portal Kemendikdasmen
            <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginLeft: '8px' }}></i>
          </a>
        )}

        {/* Share & Back action bar */}
        <div
          style={{
            marginTop: '40px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <Link
            to={pathForView('informasi', 'sec-info-berita')}
            className="btn-pill secondary"
            style={{ padding: '10px 20px', fontSize: '13px' }}
          >
            <i className="fa-solid fa-arrow-left" style={{ marginRight: '8px' }}></i>
            Kembali ke Daftar Warta
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Bagikan:</span>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Tautan warta berhasil disalin!');
                }
              }}
              className="btn-pill"
              style={{ padding: '8px 14px', fontSize: '12px', background: 'var(--bg-app)', border: '1px solid rgba(0,0,0,0.08)' }}
              title="Salin Tautan"
            >
              <i className="fa-solid fa-copy" style={{ marginRight: '6px' }}></i> Salin Tautan
            </button>
          </div>
        </div>
      </div>

      {/* "Warta Lainnya" recommendations */}
      {otherArticles.length > 0 && (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <span className="section-kicker">Rekomendasi Terkini</span>
          <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary)' }}>
            Warta Terkait Lainnya
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
          {otherArticles.map((other) => (
            <Link
              key={other.id}
              to={pathForArticle(other.slug)}
              className="news-card-playful"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div className="news-img-wrap">
                <SafeImage src={other.image} alt={other.title} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="section-kicker" style={{ margin: 0, padding: '3px 8px', fontSize: '10px' }}>
                  {other.category}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  <i className="fa-regular fa-calendar" style={{ marginRight: '4px' }}></i>
                  {other.date}
                </span>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, margin: '4px 0 8px', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                {other.title}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px', flexGrow: 1 }}>
                {other.excerpt}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Baca Selengkapnya</span>
                  <i className="fa-solid fa-arrow-right"></i>
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

