// Class strings shared by the Beranda marquees (Programs, Books, Infografis) and section buttons.

// Edge fades. Raw gradients keep the original sRGB blend (Tailwind's gradients blend in oklab).
export const MARQUEE_FADE =
  "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-[clamp(40px,8vw,96px)] before:bg-[linear-gradient(to_right,var(--bg-app)_0%,transparent_100%)] before:content-[''] " +
  "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-[clamp(40px,8vw,96px)] after:bg-[linear-gradient(to_left,var(--bg-app)_0%,transparent_100%)] after:content-['']";

// Programs/Books card rows. GSAP animates the track through inline transform/filter,
// so those are set as raw `transform`/`filter` properties (not `translate-*`) to stay overridable.
export const MARQUEE_FRAME = `relative w-full overflow-hidden pt-2.5 pb-6 ${MARQUEE_FADE}`;
export const MARQUEE_TRACK =
  'flex w-max gap-5 px-5 will-change-[filter,transform] [filter:blur(0px)_contrast(1)] [transform:translateZ(0)]';

// "!" beats the unlayered .btn-pill padding; drop it once .btn-pill moves to Tailwind.
export const SECTION_MORE_BUTTON = 'min-h-[44px] px-[22px]! py-0!';
