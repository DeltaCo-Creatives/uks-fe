import { useState } from 'react';
import { useDukunganMitraList } from '../../hooks/usePublicLists';
import { LoadingState, ErrorState } from '../shared/AsyncState';
import MitraSupportRecord from './MitraSupportRecord';

/**
 * Filled-in support records as an accordion, the first one open.
 */
export default function MitraDukungan() {
  const { data, loading, error, retry } = useDukunganMitraList();

  const partnerSupport = data ?? [];

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
              {partnerSupport.length} mitra sudah memiliki rincian dukungan.
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
        </>
      )}
    </section>
  );
}
