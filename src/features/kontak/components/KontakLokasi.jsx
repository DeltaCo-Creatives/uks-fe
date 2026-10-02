import { SECTION } from '../styles';

/** Location of the central secretariat, with a link to directions when one is configured. */
export default function KontakLokasi({ mapsUrl }) {
  return (
    <section className={SECTION} data-gsap="reveal">
      <div className="about-bento-frame">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-panel bg-ink p-[clamp(28px,4vw,40px)] text-white">
          <div>
            <span className="subpage-hero-kicker">
              <i className="fa-solid fa-map-location-dot"></i> Lokasi Sekretariat Pusat
            </span>
            <h3 className="mt-2 mb-2.5 text-[clamp(20px,2.6vw,26px)] font-extrabold text-white">
              Kompleks Kemendikdasmen Senayan
            </h3>
            <p className="max-w-[600px] text-[14px] leading-[1.6] text-[rgba(255,255,255,0.85)]">
              Kunjungan audiensi dan koordinasi tatap muka dilayani pada hari kerja (Senin - Jumat) dengan membuat janji temu melalui Helpdesk minimal H-3.
            </p>
          </div>

          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-massive"
            >
              <i className="fa-solid fa-diamond-turn-right"></i>
              <span>Petunjuk Arah Google Maps</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
