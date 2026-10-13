import FooterWordmark from '@/components/FooterWordmark';
import FooterSkeleton from './FooterSkeleton';

const TEXT_STYLE = { color: 'rgba(255,255,255,0.75)', fontSize: '14px', marginTop: '14px', lineHeight: 1.6 };

/** Brand column (`brand` of useFooterConfig): the wordmark always, the description as a skeleton while loading and left out when switched off or empty. */
export default function FooterBrand({ status, deskripsi }) {
  let description = null;
  if (status === 'loading') {
    description = <FooterSkeleton label="Memuat deskripsi" widths={['w-full', 'w-full', 'w-11/12', 'w-2/3']} className="mt-3.5 text-[14px] leading-[1.6]" />;
  } else if (deskripsi) {
    description = <p style={TEXT_STYLE}>{deskripsi}</p>;
  }

  return (
    <div style={{ flex: '1 1 220px', maxWidth: '420px' }}>
      <FooterWordmark />
      {description}
    </div>
  );
}
