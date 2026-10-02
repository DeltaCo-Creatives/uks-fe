import useCollapse from '@/hooks/useCollapse';
import { NUM, DOT_LIST_SM, DOT_ITEM, COMPACT_NUM, FOCUS_INSET } from '../styles';

function FieldList({ items, ordered }) {
  if (items.length === 1) return <p>{items[0]}</p>;
  const List = ordered ? 'ol' : 'ul';
  return (
    <List className={ordered ? COMPACT_NUM : DOT_LIST_SM}>
      {items.map((item) => (
        <li key={item} className={ordered ? undefined : DOT_ITEM}>{item}</li>
      ))}
    </List>
  );
}

/**
 * One partner's support record. Closed, it shows who, what and when; open,
 * it shows the full record as label/value rows. Funding is plain text: the
 * amounts are in different currencies and are not meant to be compared.
 *
 * @param {{ record: object, index: number, isOpen: boolean, onToggle: () => void }} props
 */
export default function MitraSupportRecord({ record, index, isOpen, onToggle }) {
  const panelId = `mitra-support-${record.id}`;
  const { ref, mounted } = useCollapse(isOpen, { keepInView: true });

  const fields = [
    { label: 'Bentuk kolaborasi', items: record.bentukKolaborasi ?? [] },
    { label: 'Kegiatan', items: record.kegiatan ?? [], ordered: record.kegiatanBerurutan },
    { label: 'Penerima manfaat', items: record.penerimaManfaat ?? [] },
    { label: 'Lokasi', items: record.lokasi ?? [] },
    { label: 'Pembiayaan', items: record.pembiayaan ? [record.pembiayaan] : [] }
  ].filter((field) => field.items.length > 0);

  return (
    <li className="[&+&]:border-t [&+&]:border-rule">
      <button
        type="button"
        className={`grid min-h-16 w-full cursor-pointer grid-cols-[28px_minmax(0,1fr)_auto_16px] items-center gap-4 bg-transparent px-6 py-4 text-left text-ink hover:bg-card-alt max-[720px]:grid-cols-[28px_minmax(0,1fr)_16px] max-[720px]:items-start max-[720px]:gap-3 max-[720px]:px-[18px] ${FOCUS_INSET}`}
        aria-expanded={isOpen} aria-controls={panelId} onClick={onToggle}>
        <span className={NUM} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[16px] leading-[1.35] font-extrabold">
            {record.mitraNama}
            {record.unitKerja && <span className="ml-2 text-[13px] font-semibold text-ink-muted max-[720px]:ml-0 max-[720px]:block">{record.unitKerja}</span>}
          </span>
          {/* Some records list several collaborations; the full list is in the panel. */}
          <span className="line-clamp-2 text-[14px] leading-[1.5] text-ink-muted">{(record.bentukKolaborasi ?? []).join('; ')}</span>
        </span>
        {/* On phones the period drops under the name and the chevron moves up beside it. */}
        {record.periode && (
          <span className="text-[13px] font-bold whitespace-nowrap text-brand-deep max-[720px]:col-2 max-[720px]:row-2 max-[720px]:whitespace-normal">{record.periode}</span>
        )}
        <i
          className={`fa-solid fa-chevron-down text-[13px] text-ink-muted [transition:transform_0.3s_ease] max-[720px]:col-3 max-[720px]:row-1 ${isOpen ? '[transform:rotate(180deg)]' : ''}`}
          aria-hidden="true"
        ></i>
      </button>

      {mounted && (
        <div ref={ref}>
          <div id={panelId} role="region" aria-label={`Dukungan ${record.mitraNama}`} className="pr-6 pb-6 pl-[68px] max-[720px]:px-[18px] max-[720px]:pb-5">
            <dl className="m-0">
              {fields.map((field) => (
                <div key={field.label} className="grid grid-cols-[160px_minmax(0,1fr)] gap-4 border-t border-rule py-3 max-[720px]:grid-cols-[minmax(0,1fr)] max-[720px]:gap-1">
                  <dt className="text-[13px] leading-[1.6] font-bold text-brand-deep">{field.label}</dt>
                  <dd className="m-0 text-[14px] leading-[1.6] text-ink"><FieldList items={field.items} ordered={field.ordered} /></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </li>
  );
}
