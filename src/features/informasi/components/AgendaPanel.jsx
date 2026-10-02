import { useAgendaList } from '@/hooks/usePublicLists';
import Pagination from '@/components/shared/Pagination';
import { usePagedGroups } from '@/hooks/usePagedGroups';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { PANEL_HEAD_STACKED, PANEL_TITLE, PANEL_DESC } from '../styles';

export default function AgendaPanel() {
  const { data, loading, error, retry } = useAgendaList();
  const { pagedGroups, page, totalPages, setPage } = usePagedGroups([{ items: data || [] }], '');
  const agendas = data ? pagedGroups[0]?.items ?? [] : [];
  const hasAgendas = !!data?.length;

  return (
    <div className="about-bento-frame">
      <div className={PANEL_HEAD_STACKED}>
        <span className="section-kicker">Kalender Kegiatan</span>
        <h2 className={PANEL_TITLE}>Agenda Transformasi UKS/M 2026</h2>
        <p className={PANEL_DESC}>
          Jambore dokter kecil, peringatan hari besar kesehatan, bimbingan teknis TP UKS provinsi, dan festival karya inovasi nasional.
        </p>
      </div>

      {loading && <LoadingState label="Memuat agenda..." />}

      {!loading && error && (
        <ErrorState
          title="Agenda tidak dapat dimuat"
          text="Terjadi gangguan saat mengambil data agenda. Silakan coba lagi."
          retry={retry}
        />
      )}

      {!loading && !error && (
        !hasAgendas ? (
          <EmptyState
            icon="fa-solid fa-calendar-days"
            title="Belum ada agenda yang tersedia"
            text="Agenda nasional akan tampil di sini begitu tersedia."
          />
        ) : (
          <div className="flex flex-col gap-3">
            {agendas.map((ev) => (
              <article
                key={ev.slug ?? ev.id}
                className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-[18px] rounded-soft border-[1.5px] border-rule-soft bg-card px-5 py-[18px] max-[768px]:grid-cols-[56px_minmax(0,1fr)] max-[768px]:gap-3.5 max-[768px]:px-4 max-[768px]:py-3.5"
              >
                <div className="flex flex-col items-center justify-center rounded-soft bg-brand-deep px-2 py-2.5 text-white">
                  <span className="text-[22px] leading-none font-extrabold max-[768px]:text-[19px]">{ev.day}</span>
                  <span className="text-[11px] font-bold">{ev.month}</span>
                </div>
                <div>
                  {ev.organizer && <span className="text-[11px] font-extrabold text-brand-deep">{ev.organizer}</span>}
                  <h3 className="mt-1 mb-1.5 text-[16px] leading-[1.35] font-extrabold text-ink">{ev.title}</h3>
                  {ev.location && (
                    <p className="flex items-center gap-1.5 text-[13px] text-ink-muted">
                      <i className="fa-solid fa-location-dot text-brand" aria-hidden="true"></i>
                      <span>{ev.location}</span>
                    </p>
                  )}
                </div>
                {/* Plain text, not a pill: the status is a label, and a filled pill would read as a button.
                    On phones it moves under the text instead of squeezing a third column. */}
                {ev.status && <span className="text-[12px] font-bold whitespace-nowrap text-ink-muted max-[768px]:col-2">{ev.status}</span>}
              </article>
            ))}
          </div>
        )
      )}
      {!loading && !error && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}
    </div>
  );
}
