import { useState } from 'react';

/**
 * SafeImage: Robust image component with automatic error fallbacks
 * Prevents broken image icons when manifest assets are missing or loading.
 */
export default function SafeImage({
  src,
  alt = '',
  className = '',
  style = {},
  fallbackType = 'photo', // 'photo' | 'logo' | 'avatar'
  icon = null,
  ...props
}) {
  const [hasError, setHasError] = useState(!src);

  if (hasError || !src) {
    if (fallbackType === 'logo') {
      return (
        <div
          className={`safe-image-fallback safe-logo-fallback ${className}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(9, 140, 76, 0.08)',
            color: 'var(--brand-primary)',
            borderRadius: 'var(--radius-md, 8px)',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: 800,
            textAlign: 'center',
            border: '1px dashed rgba(9, 140, 76, 0.25)',
            width: '100%',
            height: '100%',
            minHeight: '44px',
            ...style
          }}
          title={import.meta.env.DEV ? `Asset missing: ${src}` : alt}
        >
          <i className={icon || 'fa-solid fa-building-flag'} style={{ marginRight: '6px', fontSize: '14px' }}></i>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {alt || 'Mitra UKS'}
          </span>
        </div>
      );
    }

    // Default 'photo' or 'banner' fallback
    return (
      <div
        className={`safe-image-fallback safe-photo-fallback ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
          color: 'var(--text-secondary, #64748B)',
          borderRadius: 'inherit',
          padding: '16px',
          width: '100%',
          height: '100%',
          minHeight: '140px',
          textAlign: 'center',
          position: 'relative',
          ...style
        }}
        title={import.meta.env.DEV ? `Asset missing: ${src}` : alt}
      >
        <i className={icon || 'fa-solid fa-image'} style={{ fontSize: '28px', opacity: 0.5, marginBottom: '8px' }}></i>
        <span style={{ fontSize: '11px', fontWeight: 600, maxWidth: '85%', overflow: 'hidden', textOverflow: 'ellipsis', opacity: 0.8 }}>
          {alt || 'Foto Visual UKS'}
        </span>
        {import.meta.env.DEV && (
          <span style={{
            position: 'absolute',
            bottom: '4px',
            right: '4px',
            fontSize: '9px',
            background: 'rgba(0,0,0,0.4)',
            color: '#fff',
            padding: '2px 6px',
            borderRadius: '4px',
            fontFamily: 'monospace'
          }}>
            Asset TODO
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}

