import { nationalAgendas } from '../../data/portalData';

export default function AgendaPanel() {
  return (
    <div className="about-bento-frame">
      <div className="info-panel-head is-stacked">
        <span className="section-kicker">Kalender Kegiatan</span>
        <h2 className="info-panel-title">Agenda Transformasi UKS/M 2026</h2>
        <p className="info-panel-desc">
          Jambore dokter kecil, peringatan hari besar kesehatan, bimbingan teknis TP UKS provinsi, dan festival karya inovasi nasional.
        </p>
      </div>

      <div className="info-agenda-list">
        {nationalAgendas.map((ev, i) => (
          <article key={i} className="info-agenda">
            <div className="info-agenda-date">
              <span className="info-agenda-day">{ev.day}</span>
              <span className="info-agenda-month">{ev.month}</span>
            </div>
            <div>
              <span className="info-agenda-organizer">{ev.organizer}</span>
              <h3 className="info-agenda-title">{ev.title}</h3>
              <p className="info-agenda-place">
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                <span>{ev.location}</span>
              </p>
            </div>
            <span className="info-agenda-status">{ev.status}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

