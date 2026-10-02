import { useEffect, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { priorityProgramsList, programIntro } from '@/data/portalData';
import { prefersReducedMotion } from '@/hooks/useCollapse';
import { useProgramTautanList, usePengaturanSettings } from '@/hooks/usePublicLists';
import { buildResourceGroups, habitUrl } from '@/utils/programTautan';
import { defaultTabSlug, pathForView, sectionIdFromSlug } from '@/routes';
import { ProgramPicker, ProgramPanel, ProgramLink } from '@/features/program';
import { PAGE_FOCUS, HERO_SOURCE_LINK } from '@/features/program/styles';

// Clears the fixed navbar when a program switch scrolls the picker to the top.
const NAV_OFFSET = 96;

/**
 * Program Prioritas: pick one of five programs, the panel below shows it.
 * Content curated from the portal and official program sites, see
 * docs/program-curation.md. Each program's resource-link groups and the
 * 7KAIH habit-card URLs come from /public/program-tautan, matched to a
 * program by its `sec-prog-*` id (see src/utils/programTautan.js).
 */
export default function ProgramPage() {
  const { programSlug } = useParams();
  const navigate = useNavigate();
  const activeId = sectionIdFromSlug('program', programSlug);
  const activeIndex = Math.max(0, priorityProgramsList.findIndex((p) => p.id === activeId));
  const active = priorityProgramsList[activeIndex];
  const pickerRef = useRef(null);
  const panelRef = useRef(null);
  const shownId = useRef(active.id);

  const { data: tautanList } = useProgramTautanList();
  const { data: settings } = usePengaturanSettings();
  const programSourceLabel = settings?.['tautan.programSumberLabel'];
  const programSourceUrl = settings?.['tautan.programSumberUrl'];

  // Switching fades the new panel's blocks in, so the change reads as a change.
  useGSAP(() => {
    if (shownId.current === active.id) return;
    shownId.current = active.id;
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

  if (!activeId) return <Navigate to={`/program/${defaultTabSlug('program')}`} replace />;

  // sec-prog-mbg -> mbg, sec-prog-7kaih -> 7kaih, etc.
  const programKey = active.id.replace('sec-prog-', '');
  // The panel never waits on the links: a resources section with no groups
  // yet (loading, failed, or none configured) is left out. A program without
  // a resources section of its own (ASRI, Prestasi) gets a "Rujukan" one, so
  // links added in the CMS always show up.
  const hasResources = active.sections.some((section) => section.type === 'resources');
  const sections = hasResources
    ? active.sections
    : [...active.sections, { id: 'rujukan', type: 'resources', title: 'Rujukan' }];
  const activeWithLinks = {
    ...active,
    sections: sections
      .map((section) => {
        if (section.type === 'resources') {
          return { ...section, groups: buildResourceGroups(tautanList, programKey) };
        }
        if (section.type === 'habits') {
          return { ...section, items: section.items.map((item) => ({ ...item, url: habitUrl(tautanList, item.title) })) };
        }
        return section;
      })
      .filter((section) => section.type !== 'resources' || section.groups.length > 0)
  };

  return (
    <div className={`container pb-20 ${PAGE_FOCUS}`}>
      <div className="subpage-hero-banner" data-gsap="reveal">
        <span className="subpage-hero-kicker">
          <i className="fa-solid fa-bullhorn"></i> Program Prioritas
        </span>
        <h1 className="subpage-hero-title">Program prioritas yang berjalan lewat UKS/M</h1>
        <p className="subpage-hero-desc">
          {programIntro.text} Lima program di bawah ini menjelaskan apa isinya, siapa sasarannya, dan rujukan resminya.
        </p>
        {programSourceUrl && (
          <ProgramLink url={programSourceUrl} className={HERO_SOURCE_LINK}>
            Sumber: {programSourceLabel}
          </ProgramLink>
        )}
      </div>

      <ProgramPicker
        programs={priorityProgramsList}
        activeId={active.id}
        onSelect={(id) => navigate(pathForView('program', id))}
        pickerRef={pickerRef}
      />

      <ProgramPanel ref={panelRef} program={activeWithLinks} number={activeIndex + 1} />
    </div>
  );
}
