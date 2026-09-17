import { gssBenefits, gssTargets, gssVideos } from '../../../data/portalData';
import GssVideoLink from './GssVideoLink';

/**
 * Manfaat (who gains what) carries the weight, so it gets the wide white
 * column; Sasaran is a reference list and sits beside it on the tinted ground.
 * The launch video leads the video row at a larger size.
 */
export default function GssOverview() {
  const [leadVideo, ...otherVideos] = gssVideos;

  return (
    <section id="sec-gss-overview" className="section gss-section" style={{ paddingTop: '10px' }}>
      <div className="section-header" data-gsap="reveal">
        <div>
          <span className="section-kicker">Manfaat &amp; Sasaran</span>
          <h2 className="section-title">Siapa yang terlibat dalam gerakan ini</h2>
        </div>
      </div>

      <div className="gss-overview-grid">
        <div className="gss-benefits" data-gsap="reveal">
          <h3 className="gss-block-title">Manfaat bagi</h3>
          <ul className="gss-benefit-list">
            {gssBenefits.map((benefit) => (
              <li key={benefit.id}>
                <span className="gss-benefit-icon" aria-hidden="true"><i className={benefit.icon}></i></span>
                <span>
                  <strong>{benefit.audience}</strong>
                  <span>{benefit.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="gss-targets" data-gsap="reveal">
          <h3 className="gss-block-title">Sasaran gerakan</h3>
          <ul className="gss-target-list">
            {gssTargets.map((target) => (
              <li key={target.id}>
                <i className={target.icon} aria-hidden="true"></i>
                <span>{target.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="gss-videos" data-gsap="reveal">
        <h3 className="gss-block-title">Video Sekolah Sehat</h3>
        <div className="gss-video-grid">
          <GssVideoLink video={leadVideo} size="lg" />
          <div className="gss-video-stack">
            {otherVideos.map((video) => (
              <GssVideoLink key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
