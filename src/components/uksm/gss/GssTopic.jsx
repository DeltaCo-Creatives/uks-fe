/**
 * One topic inside a focus area. The data picks the shape: prose, a list
 * (numbered when order matters, e.g. CTPS steps), or label/value facts
 * (e.g. SKJ schedule, BIAS months).
 *
 * @param {{ topic: object }} props
 */
export default function GssTopic({ topic }) {
  const ListTag = topic.ordered ? 'ol' : 'ul';

  return (
    <div className="gss-topic gss-panel-block">
      <h4 className="gss-topic-title">{topic.title}</h4>

      {topic.paragraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="gss-prose">{paragraph}</p>
      ))}

      {topic.intro && <p className="gss-prose">{topic.intro}</p>}

      {topic.type === 'list' && (
        <ListTag className={`gss-topic-list ${topic.ordered ? 'is-ordered' : ''}`}>
          {topic.items.map((item, idx) => (
            <li key={item.label ?? item.text}>
              <span className="gss-topic-marker" aria-hidden="true">
                {topic.ordered ? idx + 1 : <i className="fa-solid fa-check"></i>}
              </span>
              <span>
                {item.label && <strong>{item.label}. </strong>}
                {item.text}
              </span>
            </li>
          ))}
        </ListTag>
      )}

      {topic.type === 'facts' && (
        <dl className="gss-facts">
          {topic.items.map((fact) => (
            <div key={fact.label} className="gss-fact">
              <dt><i className={fact.icon} aria-hidden="true"></i> {fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
