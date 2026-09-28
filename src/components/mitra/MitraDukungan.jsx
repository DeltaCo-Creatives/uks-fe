import { useState } from 'react';
import { useMitraList, useDukunganMitraList } from '../../hooks/usePublicLists';
import { LoadingState, ErrorState } from '../shared/AsyncState';
import MitraSupportRecord from './MitraSupportRecord';

/**
 * Filled-in records come first as an accordion (the first one open). Partners
 * whose record is still empty are named in one plain list below, so the gap in
 * the data stays visible instead of being padded out.
 *
 * Needs both `/public/mitra` (for `tanpaDukungan`) and `/public/dukungan-mitra`
 * for the "X of Y" lead line, so loading/error is gated on both together.
 * ponytail: a failure in either endpoint blanks the whole section instead of
 * showing the half that loaded; split the gate if that partial view is wanted.
 */
export default function MitraDukungan() {
  const mitraList = useMitraList();
  const dukunganList = useDukunganMitraList();
  const loading = mitraList.loading || dukunganList.loading;
  const error = mitraList.error || dukunganList.error;
  const retry = () => {
    mitraList.retry();
    dukunganList.retry();
  };

  const partnerSupport = dukunganList.data ?? [];
  const partnersWithoutRecord = mitraList.data?.tanpaDukungan ?? [];

  const [openId, setOpenId] = useState(null);
  const defaultOpenId = partnerSupport[0]?.id ?? null;
  const activeOpenId = openId ?? defaultOpenId;

  return (
    <section id="sec-mitra-dukungan" className="section mitra-section">
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Dukungan Mitra</span>
          <h2 className="section-title">Dukungan yang sudah tercatat</h2>
          {!loading && !error && (
            <p className="mitra-section-lead">
              {partnerSupport.length} dari {partnerSupport.length + partnersWithoutRecord.length} mitra sudah memiliki rincian dukungan.
            </p>
          )}
        </div>
      </div>

      {loading && <LoadingState label="Memuat dukungan mitra..." />}

      {!loading && error && (
        <ErrorState
          title="Dukungan mitra tidak dapat dimuat"
          text="Terjadi gangguan saat mengambil data dukungan mitra. Silakan coba lagi."
          retry={retry}
        />
      )}

      {!loading && !error && (
        <>
          {partnerSupport.length === 0 ? (
            <p className="mitra-empty" data-gsap="reveal">Belum ada rincian dukungan mitra yang tercatat.</p>
          ) : (
            <ol className="mitra-records" data-gsap="reveal">
              {partnerSupport.map((record, idx) => (
                <MitraSupportRecord
                  key={record.id}
                  record={record}
                  index={idx}
                  isOpen={activeOpenId === record.id}
                  onToggle={() => setOpenId(activeOpenId === record.id ? 'none' : record.id)}
                />
              ))}
            </ol>
          )}

          {partnersWithoutRecord.length > 0 && (
            <div className="mitra-tinted mitra-pending" data-gsap="reveal">
              <h3 className="mitra-block-title">Belum ada rincian dukungan</h3>
              <ul className="mitra-pending-list">
                {partnersWithoutRecord.map((partner) => (
                  <li key={partner.id}>
                    <span>{partner.nama}</span>
                    {partner.catatan && <small>{partner.catatan}</small>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </section>
  );
}
