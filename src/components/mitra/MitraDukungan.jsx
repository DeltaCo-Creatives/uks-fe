import { useState } from 'react';
import { partnerSupport, partnersWithoutRecord } from '../../data/portalData';
import MitraSupportRecord from './MitraSupportRecord';

/**
 * Filled-in records come first as an accordion (the first one open). Partners
 * whose record is still empty are named in one plain list below, so the gap in
 * the data stays visible instead of being padded out.
 */
export default function MitraDukungan() {
  const [openId, setOpenId] = useState(partnerSupport[0]?.id ?? null);

  return (
    <section id="sec-mitra-dukungan" className="section mitra-section">
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Dukungan Mitra</span>
          <h2 className="section-title">Dukungan yang sudah tercatat</h2>
          <p className="mitra-section-lead">
            {partnerSupport.length} dari {partnerSupport.length + partnersWithoutRecord.length} mitra sudah memiliki rincian dukungan.
          </p>
        </div>
      </div>

      {partnerSupport.length === 0 ? (
        <p className="mitra-empty" data-gsap="reveal">Belum ada rincian dukungan mitra yang tercatat.</p>
      ) : (
        <ol className="mitra-records" data-gsap="reveal">
          {partnerSupport.map((record, idx) => (
            <MitraSupportRecord
              key={record.id}
              record={record}
              index={idx}
              isOpen={openId === record.id}
              onToggle={() => setOpenId((current) => (current === record.id ? null : record.id))}
            />
          ))}
        </ol>
      )}

      {partnersWithoutRecord.length > 0 && (
        <div className="mitra-tinted mitra-pending" data-gsap="reveal">
          <h3 className="mitra-block-title">Belum ada rincian dukungan</h3>
          <ul className="mitra-pending-list">
            {partnersWithoutRecord.map((partner) => (
              <li key={partner.name}>
                <span>{partner.name}</span>
                {partner.note && <small>{partner.note}</small>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
