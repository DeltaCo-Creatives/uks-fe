import GssTopic from './GssTopic';
import GssToolList from './GssToolList';
import GssVideoLink from './GssVideoLink';

/**
 * Everything one focus area asks of a school, in the order a reader acts on
 * it: the goal, the activities to run, background topics, then the files.
 *
 * @param {{ focus: object, index: number, total: number }} props
 */
export default function GssFocusPanel({ focus, index, total }) {
  return (
    <div className="gss-panel-inner">
      <header className="gss-panel-head gss-panel-block">
        <span className="gss-panel-count">Fokus {index + 1} dari {total}</span>
        <h3 className="gss-panel-title">{focus.title}</h3>
        <p className="gss-panel-goal">{focus.goal}</p>
        {focus.videos.length > 0 && (
          <div className="gss-panel-videos">
            {focus.videos.map((video) => (
              <GssVideoLink key={video.id} video={video} />
            ))}
          </div>
        )}
      </header>

      <div className="gss-activities gss-panel-block">
        <h4 className="gss-topic-title">Kegiatan {focus.title} di sekolah</h4>
        <ol className="gss-activity-list">
          {focus.activities.map((activity, idx) => (
            <li key={activity.label ?? activity.text}>
              <span className="gss-activity-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
              <span>
                {activity.label && <strong className="gss-activity-label">{activity.label}</strong>}
                {activity.text}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {focus.topics.map((topic) => (
        <GssTopic key={topic.id} topic={topic} />
      ))}

      <GssToolList tools={focus.tools} focusTitle={focus.title} />
    </div>
  );
}
