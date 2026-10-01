import { useAgendaList } from '../../hooks/usePublicLists';
import Pagination from '../shared/Pagination';
import { usePagedGroups } from '../../hooks/usePagedGroups';
import { LoadingState, ErrorState, EmptyState } from '../shared/AsyncState';

export default function AgendaPanel() {
  const { data, loading, error, retry } = useAgendaList();
  const { pagedGroups, page, totalPages, setPage } = usePagedGroups([{ items: data || [] }], '');
  const agendas = data ? pagedGroups[0]?.items ?? [] : [];
  const hasAgendas = !!data?.length;

  return (
    <div className="about-bento-frame">
      <div className="info-panel-head is-stacked">
        <span className="section-kicker">Kalender Kegiatan</span>
        <h2 className="info-panel-title">Agenda Transformasi UKS/M 2026</h2>
        <p className="info-panel-desc">
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
          <div className="info-agenda-list">
            {agendas.map((ev) => (
              <article key={ev.slug ?? ev.id} className="info-agenda">
                <div className="info-agenda-date">
                  <span className="info-agenda-day">{ev.day}</span>
                  <span className="info-agenda-month">{ev.month}</span>
                </div>
                <div>
                  {ev.organizer && <span className="info-agenda-organizer">{ev.organizer}</span>}
                  <h3 className="info-agenda-title">{ev.title}</h3>
                  {ev.location && (
                    <p className="info-agenda-place">
                      <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                      <span>{ev.location}</span>
                    </p>
                  )}
                </div>
                {ev.status && <span className="info-agenda-status">{ev.status}</span>}
              </article>
            ))}
          </div>
        )
      )}
      {!loading && !error && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}
    </div>
  );
}
