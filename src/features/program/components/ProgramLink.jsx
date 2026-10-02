import { TodoTag } from '@/components/ContentPlaceholder';

export const NEW_TAB_HINT = '(membuka tab baru)';

/**
 * Outbound link that opens in a new tab and says so to screen readers.
 * A null url renders the label as plain text with an honest "not available"
 * note, so a dead link never ships as a control.
 *
 * The span carries `is-missing` so each link style in ../styles.js can adjust
 * for it; `prog-ext-icon` lets a style recolor the trailing icon.
 *
 * @param {{ url: string | null, className?: string, children: import('react').ReactNode }} props
 */
export default function ProgramLink({ url, className = '', children }) {
  if (!url) {
    return (
      <span className={`${className} is-missing`}>
        {children}
        <span className="text-[12px] font-semibold text-ink-muted italic">Tautan belum tersedia</span>
        {import.meta.env.DEV && <TodoTag source="link did not resolve on 2026-09-17, see docs/program-curation.md" />}
      </span>
    );
  }

  return (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer">
      {children}
      <i className="fa-solid fa-arrow-up-right-from-square prog-ext-icon ml-1.5 text-[11px] text-brand" aria-hidden="true"></i>
      <span className="sr-only">{NEW_TAB_HINT}</span>
    </a>
  );
}
