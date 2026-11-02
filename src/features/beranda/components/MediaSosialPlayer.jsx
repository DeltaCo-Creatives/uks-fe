import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '@/hooks/useScrollLock';
import { NEW_TAB_HINT } from '@/utils/linkKind';

const FOCUS_RING = 'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink';
// "!" beats the unlayered .btn-pill rules: its `all` transition would grow the focus ring in, and its hover green fails AA.
const STEP = `btn-pill secondary min-h-[44px] px-[18px]! py-0! [transition-property:background-color,color,transform]! hover:text-brand-deep! ${FOCUS_RING}`;
// The labelled pair needs about 254px, so a narrower footer or a short screen shows only the arrows, still named by the text.
const STEP_ICON_ONLY = '@max-[270px]:w-11 @max-[270px]:px-0! [@media(max-height:480px)]:w-11 [@media(max-height:480px)]:px-0!';
const STEP_TEXT = '@max-[270px]:sr-only [@media(max-height:480px)]:sr-only';
const LINK = `inline-flex min-h-[44px] items-center rounded-soft font-bold text-brand-deep underline underline-offset-[3px] hover:text-ink ${FOCUS_RING}`;
const FOCUSABLE = 'a[href], button, iframe';
// The most the padding, header and footer take (they tighten on a short screen); players size themselves to the rest.
const CHROME = '[--player-chrome:240px] [@media(max-height:480px)]:[--player-chrome:136px]';

/** Popup player for one card, portalled like ImageLightbox; focus stays inside and returns to the card on close. */
export default function MediaSosialPlayer({ title, position, widthClass, note, onPrev, onNext, onClose, returnFocusRef, children }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();
  // Stepping swaps the item under a button that keeps focus, so the new item is announced from the first step on.
  const [stepped, setStepped] = useState(false);

  useScrollLock(true);

  // Latest handler via ref, so an inline callback doesn't re-run the effect.
  const closeHandler = useRef(onClose);
  useEffect(() => {
    closeHandler.current = onClose;
  });

  useEffect(() => {
    const opener = returnFocusRef.current;
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeHandler.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!dialogRef.current.contains(active) || active === (event.shiftKey ? first : last)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (opener?.isConnected) opener.focus();
    };
  }, [returnFocusRef]);

  return createPortal(
    <div
      className={`fixed inset-0 z-[10005] flex items-center justify-center bg-[rgba(10,16,13,0.72)] p-4 [@media(max-height:480px)]:p-2 ${CHROME}`}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        className={`flex max-h-full w-full flex-col overflow-hidden rounded-panel bg-card shadow-[0_40px_100px_rgba(0,0,0,0.3)] ${widthClass}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="flex items-center justify-between gap-3 border-b border-rule py-3 pr-3 pl-5 [@media(max-height:480px)]:py-1.5">
          <h2 id={titleId} className="line-clamp-2 min-w-0 text-[16px] leading-[1.4] font-bold break-words [@media(max-height:480px)]:line-clamp-1">{title}</h2>
          <button
            ref={closeRef}
            type="button"
            className={`grid size-11 flex-none cursor-pointer place-items-center rounded-full bg-app text-[16px] text-ink hover:bg-ink hover:text-white ${FOCUS_RING}`}
            onClick={onClose}
            aria-label="Tutup pemutar"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
        <p className="sr-only" aria-live="polite">{stepped ? `${title}, ${position}` : ''}</p>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>

        {(note || onPrev || onNext) && (
          <div className="@container flex flex-wrap items-center gap-2.5 border-t border-rule px-4 py-3 [@media(max-height:480px)]:py-1.5">
            {note && (
              <p className="flex flex-wrap items-center gap-x-1.5 text-[13px] text-ink-muted">
                {note.text && <span>{note.text}</span>}
                <a className={LINK} href={note.href} target="_blank" rel="noopener noreferrer">
                  {note.label}
                  <span className="sr-only"> {NEW_TAB_HINT}</span>
                </a>
              </p>
            )}
            {onPrev && onNext && (
              <div className="ml-auto flex gap-2">
                <button type="button" className={`${STEP} ${STEP_ICON_ONLY}`} onClick={() => { setStepped(true); onPrev(); }}>
                  <i className="fa-solid fa-chevron-left" aria-hidden="true"></i><span className={STEP_TEXT}>Sebelumnya</span>
                </button>
                <button type="button" className={`${STEP} ${STEP_ICON_ONLY}`} onClick={() => { setStepped(true); onNext(); }}>
                  <span className={STEP_TEXT}>Berikutnya</span><i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
