import { useRekomendasi } from '@/hooks/useRekomendasi';
import SafeImage from '@/components/SafeImage';

/**
 * Up to 3 recommended publikasi for the opened `current`, taken from the already-loaded `items` of the same panel.
 * Renders nothing while loading, on error, or when none of the recommendations are in `items`.
 */
export default function RekomendasiStrip({ current, items, onPick }) {
  const slugs = useRekomendasi('publikasi', current?.slug);
  const picks = slugs.map((s) => items.find((i) => i.slug === s)).filter(Boolean).slice(0, 3);
  if (picks.length === 0) return null;

  return (
    <div className="border-t border-line px-4 py-3">
      <p className="mb-2 text-[12px] font-extrabold text-ink-muted">Rekomendasi</p>
      <div className="flex gap-3 max-[768px]:flex-col">
        {picks.map((item) => (
          <button
            key={item.id ?? item.slug}
            type="button"
            className="flex min-w-0 flex-1 items-center gap-2.5 rounded-soft border border-line bg-white p-2 text-left hover:border-brand"
            onClick={() => onPick(item)}
          >
            <span className="block size-10 shrink-0 overflow-hidden rounded-md">
              <SafeImage src={item.cover || item.thumb || item.image} alt="" icon="fa-regular fa-file-pdf" />
            </span>
            <span className="line-clamp-2 text-[13px] font-bold break-words text-ink">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
