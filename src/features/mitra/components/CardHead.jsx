import { BLOCK_TITLE, ICON, CARD_HEAD, PHOTO } from '../styles';

const FALLBACK_ICON = 'fa-solid fa-handshake';

/** Head of a Panduan/Kriteria card: the photo above the title when set, else the icon box (a fallback icon when neither is set). */
export default function CardHead({ card }) {
  const { photo } = card;
  return (
    <>
      {photo && <img className={PHOTO} src={photo.src} alt={photo.description} width={photo.width} height={photo.height} loading="lazy" />}
      <div className={CARD_HEAD}>
        {!photo && <span className={ICON} aria-hidden="true"><i className={card.icon || FALLBACK_ICON}></i></span>}
        <h3 className={BLOCK_TITLE}>{card.title}</h3>
      </div>
    </>
  );
}
