import { useMediaSosial } from '@/hooks/usePublicLists';
import InstagramSection from './InstagramSection';
import YoutubeSection from './YoutubeSection';

/** Instagram, then YouTube, from one /public/media-sosial answer. */
export default function MediaSosialSections() {
  const { data } = useMediaSosial();
  return (
    <>
      <div id="sec-home-instagram">
        <InstagramSection data={data} />
      </div>
      <div id="sec-home-youtube">
        <YoutubeSection data={data} />
      </div>
    </>
  );
}
