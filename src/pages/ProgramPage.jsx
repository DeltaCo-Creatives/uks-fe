import { useEffect, useMemo, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { programIntro } from '@/data/portalData';
import { prefersReducedMotion } from '@/hooks/useCollapse';
import { useProgramList, usePengaturanSettings } from '@/hooks/usePublicLists';
import { pathForProgram } from '@/routes';
import { ProgramPicker, ProgramPanel, ProgramLink, mapProgram } from '@/features/program';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared/AsyncState';
import { PAGE_FOCUS, HERO_SOURCE_LINK } from '@/features/program/styles';

// Clears the fixed navbar when a program switch scrolls the picker to the top.
const NAV_OFFSET = 96;

/**
 * Program Prioritas: pick a program, the panel below shows it. Programs,
 * their sections and links come from /public/program, keyed by slug in the URL.
 */
export default function ProgramPage() {
  const { programSlug } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, retry } = useProgramList();
  const programs = useMemo(() => (data || []).map(mapProgram), [data]);
  const activeIndex = programs.findIndex((p) => p.id === programSlug);
  const active = programs[activeIndex];
  const activeId = active?.id;
  const pickerRef = useRef(null);
  const panelRef = useRef(null);
  const shownId = useRef(activeId);

  const { data: settings } = usePengaturanSettings();
  const programSourceLabel = settings?.['tautan.programSumberLabel'];
  const programSourceUrl = settings?.['tautan.programSumberUrl'];

  // Switching fades the new panel's blocks in, so the change reads as a change.
  useGSAP(() => {
    if (!activeId || shownId.current === activeId) return;
    shownId.current = activeId;
    if (prefersReducedMotion()) return;
    // prog-block marks the panel's blocks for this tween; it carries no CSS.
    gsap.from(panelRef.current.querySelectorAll('.prog-block'), {
      opacity: 0,
      y: 12,
      duration: 0.35,
      ease: 'power2.out',
      stagger: 0.05,
      clearProps: 'opacity,transform'
    });
  }, { dependencies: [activeId] });

  // Switching programs lands you at the top of the new one, not at whatever
  // offset you were reading the previous one at. The jump is instant on
  // purpose: a smooth scroll across a long page is still running while the
  // new panel's embeds and images settle underneath it, so it ends up short.
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!activeId) return undefined;
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
  }, [activeId]);

  // An unknown or retired slug lands on the first program once the list is in.
  if (!loading && !error && programs.length > 0 && !active) {
    return <Navigate to={pathForProgram(programs[0].id)} replace />;
  }

  return (
    <div className={`container pb-20 ${PAGE_FOCUS}`}>
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-bullhorn"></i> Program Prioritas
        </span>
        <h1 className="subpage-hero-title">Program prioritas yang berjalan lewat UKS/M</h1>
        <p className="subpage-hero-desc">
          {programIntro.text} Program di bawah ini menjelaskan apa isinya, siapa sasarannya, dan rujukan resminya.
        </p>
        {programSourceUrl && (
          <ProgramLink url={programSourceUrl} className={HERO_SOURCE_LINK}>
            Sumber: {programSourceLabel}
          </ProgramLink>
        )}
      </div>

      {loading && <LoadingState label="Memuat program prioritas..." />}

      {!loading && error && (
        <ErrorState title="Program prioritas tidak dapat dimuat" retry={retry} />
      )}

      {!loading && !error && programs.length === 0 && (
        <EmptyState
          icon="fa-solid fa-bullhorn"
          title="Belum ada program prioritas"
          text="Program prioritas akan tampil di sini begitu tersedia."
        />
      )}

      {active && (
        <>
          <ProgramPicker
            programs={programs}
            activeId={activeId}
            onSelect={(id) => navigate(pathForProgram(id))}
            pickerRef={pickerRef}
          />

          <ProgramPanel ref={panelRef} program={active} number={activeIndex + 1} />
        </>
      )}
    </div>
  );
}
