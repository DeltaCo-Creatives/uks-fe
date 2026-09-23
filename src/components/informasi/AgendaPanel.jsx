import { useAgendaList } from '../../hooks/useAgenda';

export default function AgendaPanel() {
  const { data, loading, error, retry } = useAgendaList();
  const agendas = data || [];

  return (
    <div className="about-bento-frame">
      <div className="info-panel-head is-stacked">
        <span className="section-kicker">Kalender Kegiatan</span>
        <h2 className="info-panel-title">Agenda Transformasi UKS/M 2026</h2>
        <p className="info-panel-desc">
          Jambore dokter kecil, peringatan hari besar kesehatan, bimbingan teknis TP UKS provinsi, dan festival karya inovasi nasional.
        </p>
      </div>

      {loading && (
        <div className="content-toolbar-empty" role="status" aria-live="polite">
          <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i>
          <h4 className="info-empty-title">Memuat agenda...</h4>
        </div>
      )}

      {!loading && error && (
        <div className="content-toolbar-empty">
          <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
          <h4 className="info-empty-title">Agenda tidak dapat dimuat</h4>
          <p className="info-empty-text">Terjadi gangguan saat mengambil data agenda. Silakan coba lagi.</p>
          <button type="button" className="btn-pill secondary" onClick={retry} style={{ marginTop: '12px' }}>
            Coba Lagi
          </button>
        </div>
      )}

      {!loading && !error && (
        agendas.length === 0 ? (
          <div className="content-toolbar-empty">
            <i className="fa-solid fa-calendar-days" aria-hidden="true"></i>
            <h4 className="info-empty-title">Belum ada agenda yang tersedia</h4>
            <p className="info-empty-text">Agenda nasional akan tampil di sini begitu tersedia.</p>
          </div>
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
    </div>
  );
}
