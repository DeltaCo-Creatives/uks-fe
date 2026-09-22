import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { priorityProgramsList, programIntro } from '../data/portalData';
import { prefersReducedMotion } from '../hooks/useCollapse';
import ProgramPicker from './program/ProgramPicker';
import ProgramPanel from './program/ProgramPanel';
import ProgramLink from './program/ProgramLink';
import './program/program.css';

// Clears the fixed navbar when a program switch scrolls the picker to the top.
const NAV_OFFSET = 96;

/**
 * Program Prioritas: pick one of five programs, the panel below shows it.
 * Content curated from the portal and official program sites, see
 * docs/program-curation.md.
 */
export default function ProgramView({ activeSection, onNavigateSection, onNavigate }) {
  const activeIndex = Math.max(0, priorityProgramsList.findIndex((p) => p.id === activeSection));
  const active = priorityProgramsList[activeIndex];
  const pickerRef = useRef(null);
  const panelRef = useRef(null);
  const shownId = useRef(active.id);

  // Switching fades the new panel's blocks in, so the change reads as a change.
  useGSAP(() => {
    if (shownId.current === active.id) return;
    shownId.current = active.id;
    if (prefersReducedMotion()) return;
    gsap.from(panelRef.current.querySelectorAll('.prog-block'), {
      opacity: 0,
      y: 12,
      duration: 0.35,
      ease: 'power2.out',
      stagger: 0.05,
      clearProps: 'opacity,transform'
    });
  }, { dependencies: [active.id] });

  // Switching programs lands you at the top of the new one, not at whatever
  // offset you were reading the previous one at. The jump is instant on
  // purpose: a smooth scroll across a long page is still running while the
  // new panel's embeds and images settle underneath it, so it ends up short.
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return undefined;
    }
    // Queued rather than run inline: GSAP's ScrollTrigger re-anchors the
    // scroll position after the panel swaps, and it would undo an inline jump.
    const timer = setTimeout(() => {
      const picker = pickerRef.current;
      if (!picker) return;
      window.scrollTo({ top: picker.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, behavior: 'auto' });
    }, 0);
    return () => clearTimeout(timer);
  }, [active.id]);

  return (
    <div className="container prog-page" style={{ paddingBottom: '80px' }}>
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-bullhorn"></i> Program Prioritas
        </span>
        <h1 className="subpage-hero-title">Program prioritas yang berjalan lewat UKS/M</h1>
        <p className="subpage-hero-desc">
          {programIntro.text} Lima program di bawah ini menjelaskan apa isinya, siapa sasarannya, dan rujukan resminya.
        </p>
        <ProgramLink url={programIntro.source.url} className="prog-hero-source">
          Sumber: {programIntro.source.label}
        </ProgramLink>
      </div>

      <ProgramPicker
        programs={priorityProgramsList}
        activeId={active.id}
        onSelect={onNavigateSection}
        pickerRef={pickerRef}
      />

      <ProgramPanel ref={panelRef} program={active} number={activeIndex + 1} onNavigate={onNavigate} />
    </div>
  );
}
