import { useState } from 'react';
import { NEW_TAB_HINT } from './gssLinks';

/**
 * A YouTube video as an outbound link: thumbnail, title, channel. The
 * thumbnail is decorative (the title names the video) and falls back to an
 * icon block if YouTube's image fails to load.
 *
 * @param {{ video: { title: string, channel: string, url: string, thumbnail: string }, size?: 'lg' | 'sm' }} props
 */
export default function GssVideoLink({ video, size = 'sm' }) {
  const [thumbFailed, setThumbFailed] = useState(false);

  return (
    <a className={`gss-video gss-video-${size}`} href={video.url} target="_blank" rel="noopener noreferrer">
      <span className="gss-video-thumb">
        {thumbFailed ? (
          <i className="fa-brands fa-youtube" aria-hidden="true"></i>
        ) : (
          <img src={video.thumbnail} alt="" loading="lazy" width="480" height="360" onError={() => setThumbFailed(true)} />
        )}
        <span className="gss-video-play" aria-hidden="true"><i className="fa-solid fa-play"></i></span>
      </span>
      <span className="gss-video-text">
        <span className="gss-video-title">{video.title}</span>
        <span className="gss-video-channel">
          {video.channel} · Tonton di YouTube <span className="gss-sr-only">{NEW_TAB_HINT}</span>
        </span>
      </span>
    </a>
  );
}
