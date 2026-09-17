import useCollapse from '../../hooks/useCollapse';

function FieldList({ items, ordered }) {
  if (items.length === 1) return <p>{items[0]}</p>;
  const List = ordered ? 'ol' : 'ul';
  return (
    <List className={ordered ? 'mitra-compact-num' : 'mitra-dot-list mitra-dot-list-sm'}>
      {items.map((item) => (
        <li key={item}>{item}</li>
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
    { label: 'Bentuk kolaborasi', items: record.collaboration },
    { label: 'Kegiatan', items: record.activities, ordered: record.activitiesOrdered },
    { label: 'Penerima manfaat', items: record.beneficiaries },
    { label: 'Lokasi', items: record.locations },
    { label: 'Pembiayaan', items: record.funding ? [record.funding] : [] }
  ].filter((field) => field.items.length > 0);

  return (
    <li className={`mitra-record ${isOpen ? 'is-open' : ''}`}>
      <button type="button" className="mitra-record-trigger" aria-expanded={isOpen} aria-controls={panelId} onClick={onToggle}>
        <span className="mitra-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <span className="mitra-record-heading">
          <span className="mitra-record-name">
            {record.name}
            {record.unit && <span className="mitra-record-unit">{record.unit}</span>}
          </span>
          <span className="mitra-record-summary">{record.collaboration.join('; ')}</span>
        </span>
        <span className="mitra-record-period">{record.period}</span>
        <i className="fa-solid fa-chevron-down mitra-record-chevron" aria-hidden="true"></i>
      </button>

      {mounted && (
        <div ref={ref}>
          <div id={panelId} role="region" aria-label={`Dukungan ${record.name}`} className="mitra-record-panel">
            <dl className="mitra-record-fields">
              {fields.map((field) => (
                <div key={field.label}>
                  <dt>{field.label}</dt>
                  <dd><FieldList items={field.items} ordered={field.ordered} /></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </li>
  );
}
