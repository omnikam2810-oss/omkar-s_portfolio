import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { PHOTOS, PRINCIPLES, type PhotoId } from "@/lib/about-story";
import { letterHand, letterScript } from "@/lib/letter-fonts";
import { ChapterIndicator } from "./chapter-indicator";
import { LetterWriting } from "./letter-writing";
import { RevealText } from "./reveal-text";
import { InstagramIcon } from "@/components/ui/social-icons";
import { SITE } from "@/lib/site";

/** A photo, or, until you add one in public/about, a quiet warm plate that holds its place. */
function Photo({
  id,
  className = "",
  sizes,
  priority,
}: {
  id: PhotoId;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const p = PHOTOS[id];
  return (
    <div
      className={`group relative overflow-hidden rounded-[10px] bg-band ${className}`}
    >
      {p.src ? (
        <Image
          src={p.src}
          alt={p.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition: p.position }}
          className={`object-cover transition-[scale,filter] ease-brand motion-reduce:transition-none ${p.grayscale ? "grayscale duration-[1400ms] group-hover:grayscale-0" : "duration-700"} group-hover:scale-[1.04] motion-reduce:group-hover:scale-100`}
        />
      ) : (
        <div
          role="img"
          aria-label={`${p.alt} (photo coming soon)`}
          className="grid size-full place-items-center bg-linear-to-br from-accent-tint via-band to-bg-alt p-4 text-center font-mono text-label tracking-[0.14em] text-muted-2 uppercase"
        >
          Photo: {p.label}
        </div>
      )}
    </div>
  );
}

function Scene({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-4 flex items-center gap-3 font-mono text-label tracking-[0.22em] text-accent uppercase">
      <span aria-hidden="true" className="h-px w-8 bg-accent-2" />
      {n} — {label}
    </div>
  );
}

const SECTION = "mx-auto max-w-[1240px] px-4 md:px-8";

/** Scene 01: the opening. */
function Opening() {
  return (
    <section data-chapter="0" className={`${SECTION} py-14 md:py-24`}>
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7 lg:pt-8">
          <div className="rise">
            <Scene n="01" label="The beginning" />
          </div>
          {/* the belief, one word at a time: the sentence in ink, “just to” stepped back, the turn in teal */}
          <RevealText
            as="h1"
            id="about-title"
            onLoad
            delay={0.15}
            stagger={0.07}
            className="mt-6 mb-7 max-w-2xl font-display text-[46px] leading-[1.04] font-medium tracking-[-0.035em] text-ink md:text-[76px]"
            parts={[
              { t: "I didn’t come this far " },
              { t: "just to ", className: "text-soft" },
              { t: "stay the same.", className: "text-accent italic" },
            ]}
          />
          <RevealText
            as="p"
            onLoad
            delay={1.1}
            stagger={0.09}
            className="m-0 mb-10 max-w-xl font-display text-[21px] leading-[1.55] text-muted md:text-[25px]"
            parts={[
              { t: "I " },
              { t: "fail. ", className: "text-ink" },
              { t: "I " },
              { t: "learn. ", className: "text-ink" },
              { t: "I " },
              { t: "rebuild. ", className: "text-ink" },
              { t: "I " },
              { t: "repeat. ", className: "text-ink" },
              { t: "That’s how I grow.", className: "text-accent italic" },
            ]}
          />
          <dl
            className="rise m-0 grid max-w-lg grid-cols-3 gap-4 rounded-card bg-band p-5 md:gap-6 md:p-6"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              ["Folio", "Vol. 2026"],
              ["Coordinate", "18.52°N · IN"],
              ["Status", "In progress"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="mb-1 font-mono text-label tracking-[0.14em] text-muted-2 uppercase">
                  {k}
                </dt>
                <dd className="m-0 font-mono text-small font-semibold text-ink">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rise lg:col-span-5 lg:self-center" style={{ animationDelay: "0.2s" }}>
          <div className="mx-auto max-w-[320px] rounded-card bg-band p-3">
            <Photo
              id="workspace"
              priority
              sizes="(min-width:1024px) 320px, 100vw"
              className="aspect-[4/5]"
            />
            <div className="mt-3 flex items-center justify-between px-1 font-mono text-label tracking-[0.12em] text-muted-2 uppercase">
              <span>Fig. 1 — The workspace</span>
              <span>Pune</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Scene 02: the person behind the screen. */
function Person() {
  return (
    <section data-chapter="1" className="bg-bg-alt py-16 md:py-28">
      <div className={SECTION}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
          <Reveal className="flex flex-col justify-between gap-8 lg:col-span-4">
            <div>
              <Scene n="02" label="The person" />
              <h2 className="mt-3 mb-5 font-display text-[34px] leading-[1.1] font-medium tracking-[-0.02em] text-ink md:text-[44px]">
                The person behind the screen.
              </h2>
              <p className="m-0 text-base leading-[1.7] text-body">
                Software is written on terminals, but ideas are seeded in
                walks, silence, observations, and deep curiosity.
              </p>
            </div>
            <div className="rounded-card border border-line bg-surface p-6">
              <div className="mb-3 font-mono text-label tracking-[0.18em] text-muted-2 uppercase">
                Internal compass
              </div>
              <ul className="m-0 flex list-none flex-col gap-3 p-0 text-small text-ink">
                {[
                  "Curiosity as a non-negotiable compass",
                  "Building software from first principles",
                  "Comfortable with unresolved complexity",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="size-1.5 shrink-0 rounded-full bg-accent-2" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal
            delay={0.1}
            className="about-grain flex flex-col justify-center gap-8 rounded-card border border-line bg-surface p-7 md:p-12 lg:col-span-8"
          >
            <RevealText
              parts={[
                { t: "I’m someone who enjoys " },
                { t: "figuring things out. ", className: "text-accent italic" },
                { t: "I find excitement in the little things — " },
                { t: "understanding something I couldn’t yesterday, ", className: "text-accent italic" },
                { t: "exploring an idea I hadn’t considered before, and " },
                { t: "turning a simple thought into something real.", className: "text-accent italic" },
              ]}
              stagger={0.035}
              className="m-0 font-display text-[24px] leading-[1.4] tracking-[-0.01em] text-ink md:text-[30px]"
            />
            <RevealText
              parts={[
                { t: "I don’t just enjoy writing code. I enjoy " },
                { t: "the process behind it: ", className: "text-ink" },
                { t: "asking questions, making mistakes, learning from experiences, and discovering what happens when " },
                { t: "curiosity meets persistence.", className: "text-ink italic" },
              ]}
              delay={0.2}
              stagger={0.03}
              className="m-0 font-display text-[19px] leading-[1.75] text-body md:text-[20px]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Scene 03: life outside the screen. */
function Beyond() {
  const small = [
    {
      id: "bike" as const,
      tag: "02 / Bike rides",
      title: "Freedom on two wheels.",
      text: "Sometimes the best way to clear your mind is to take the road, with no destination required and the open road ahead.",
    },
    {
      id: "nature" as const,
      tag: "03 / Nature",
      title: "Finding the undiscovered.",
      text: "There’s something beautiful about getting away from the noise and finding a place I haven’t seen before.",
    },
  ];
  return (
    <section data-chapter="2" className={`${SECTION} py-16 md:py-28`}>
      <Reveal className="mb-12 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end">
        <div>
          <Scene n="03" label="Beyond the code" />
          <h2 className="m-0 mt-3 font-display text-[34px] leading-[1.1] font-medium tracking-[-0.02em] text-ink md:text-[44px]">
            Beyond the code, there’s a life.
          </h2>
        </div>
        <p className="m-0 max-w-md text-base leading-[1.7] text-body">
          Workouts, cricket, swimming, treks, bike rides and quiet time in
          nature. They sharpen the mind and keep the creative spirit grounded.
        </p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <Reveal className="rounded-card bg-band p-4 md:p-5 lg:col-span-5">
          <Photo
            id="workout"
            sizes="(min-width:1024px) 500px, 100vw"
            className="mb-5 aspect-square"
          />
          <div className="font-mono text-label tracking-[0.14em] text-muted-2 uppercase">
            01 / Gym days — discipline in progress
          </div>
          <h3 className="m-0 mt-1 mb-2 font-display text-[30px] leading-[1.15] font-semibold tracking-[-0.01em] text-ink">
            Building strength.
          </h3>
          <p className="m-0 max-w-lg text-base leading-[1.7] text-body">
            It isn’t just about the body. It’s about showing up, day after day, and pushing a little past yesterday’s
            limit.
          </p>
        </Reveal>

        <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-8">
          {small.map((s, i) => (
            <Reveal
              key={s.id}
              delay={0.1 * (i + 1)}
              className="rounded-card bg-band p-4 md:p-5 lg:flex-1"
            >
              <div className="grid h-full items-center gap-4 sm:grid-cols-12">
                <Photo
                  id={s.id}
                  sizes="(min-width:640px) 260px, 100vw"
                  className="aspect-[4/3] sm:col-span-5 sm:aspect-auto sm:h-full sm:min-h-[150px]"
                />
                <div className="sm:col-span-7">
                  <div className="mb-1 font-mono text-label tracking-[0.14em] text-muted-2 uppercase">
                    {s.tag}
                  </div>
                  <h3 className="m-0 mb-1.5 font-display text-[24px] leading-[1.15] font-semibold tracking-[-0.01em] text-ink">
                    {s.title}
                  </h3>
                  <p className="m-0 text-small leading-[1.65] text-body">
                    {s.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Scene 04: the mindset, with the dark conviction banner. */
function Mindset() {
  return (
    <section data-chapter="3" className="bg-band py-16 md:py-28">
      <div className={SECTION}>
        <Reveal className="mb-12 max-w-3xl md:mb-16">
          <Scene n="04" label="The process" />
          <h2 className="m-0 mt-3 mb-5 font-display text-[44px] leading-[1.05] font-medium tracking-[-0.03em] text-ink md:text-[64px]">
            Fail. Learn.
            <br />
            Rebuild. Repeat.
          </h2>
          <p className="m-0 font-display text-[19px] leading-[1.7] text-body md:text-[21px]">
            I’m chasing a version of myself I’ve only imagined. The framework is
            simple, unsparing, and continuously running.
          </p>
        </Reveal>

        <div className="mb-14">
          {PRINCIPLES.map((p, i) => (
            // Each stage follows the one before it: a short, even delay so they cascade when they enter together.
            <Reveal
              key={p.word}
              delay={0.12 * i}
              className="grid items-baseline gap-4 border-t border-line-5 py-8 lg:grid-cols-12 lg:gap-6"
            >
              <div className="font-mono text-label font-bold tracking-[0.14em] text-accent uppercase lg:col-span-2">
                {["I", "II", "III", "IV"][i]} {"//"} Stage
              </div>
              <h3
                className={`m-0 font-display text-[40px] leading-none tracking-[-0.02em] md:text-[48px] lg:col-span-4 ${i === 1 || i === 3 ? "text-accent italic" : "text-ink"} ${i === 2 ? "font-bold" : "font-normal"}`}
              >
                {p.word}
              </h3>
              <div className="lg:col-span-6">
                <p className="m-0 mb-2 font-display text-[24px] leading-[1.25] text-ink md:text-[28px]">
                  “{p.quote}”
                </p>
                <p className="m-0 text-base leading-[1.7] text-body">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal data-dark-box className="about-grain flex flex-col justify-between gap-8 rounded-[20px] bg-btn p-8 text-bg md:flex-row md:items-center md:p-14">
          <div className="max-w-2xl">
            <div className="mb-4 font-mono text-label tracking-[0.2em] text-accent-soft uppercase">
              Core conviction
            </div>
            <p className="m-0 mb-3 font-display text-[30px] leading-[1.2] font-light tracking-[-0.01em] md:text-[44px]">
              “I fail. I learn. I rebuild. I repeat.{" "}
              <em className="text-accent-soft">That’s how I grow.”</em>
            </p>
            <p className="m-0 text-base text-bg/60">
              I’m chasing a version of myself I’ve only imagined.
            </p>
          </div>
          <div className="font-mono text-label tracking-[0.16em] uppercase md:text-right">
            <div className="text-accent-soft">Iteration index</div>
            <div className="mt-1 text-bg">N + 1 commits</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Scene 05: a letter to my future self, on old paper, written in ink. */
function Letter() {
  return (
    <section data-chapter="4" className={`${SECTION} py-16 md:py-28`}>
      <Reveal className="mb-12 flex flex-col items-center text-center">
        <Scene n="05" label="The future" />
        <h2 className="m-0 mt-3 font-display text-[34px] leading-[1.1] font-medium tracking-[-0.02em] text-ink md:text-[44px]">
          A note to the person I’m becoming.
        </h2>
      </Reveal>
      <Reveal
        className={`${letterHand.variable} ${letterScript.variable} mx-auto max-w-6xl`}
      >
        {/* the filters that tear the paper's edge and crumple its surface (used by the sheet layers below) */}
        <svg width="0" height="0" aria-hidden="true" className="absolute">
          <defs>
            <filter id="letter-parchment" x="-6%" y="-6%" width="112%" height="112%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="3" result="edge" />
              <feDisplacementMap in="SourceGraphic" in2="edge" scale="30" xChannelSelector="R" yChannelSelector="G" result="torn" />
              <feTurbulence type="fractalNoise" baseFrequency="0.013 0.02" numOctaves="5" seed="8" result="crumple" />
              <feDiffuseLighting in="crumple" lightingColor="#ffffff" surfaceScale="3" result="light">
                <feDistantLight azimuth="225" elevation="62" />
              </feDiffuseLighting>
              <feComposite in="light" in2="torn" operator="in" result="lit" />
              <feBlend in="torn" in2="lit" mode="multiply" />
            </filter>
            <filter id="letter-parchment-back" x="-6%" y="-6%" width="112%" height="112%">
              <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="4" seed="11" result="edge" />
              <feDisplacementMap in="SourceGraphic" in2="edge" scale="38" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* the torn sheets, a quill and an ink pot: all fixed colours, a picture in either site theme */}
        <div className="relative px-0 py-10 max-md:overflow-hidden md:px-6 md:py-12">
          <div className="relative mx-auto max-w-5xl">
            <div aria-hidden="true" className="letter-drop absolute inset-0 translate-x-2 translate-y-2 rotate-[1.2deg]">
              <div className="letter-sheet-back absolute inset-0" />
            </div>
            <div aria-hidden="true" className="letter-drop absolute inset-0">
              <div className="letter-sheet absolute inset-0" />
            </div>

            <div className="relative z-10 px-7 py-10 text-[#2a1d12] md:px-20 md:py-10">
              {/* a pressed typewriter-style header, faded like old print */}
              <div className="mb-6 flex flex-col justify-between gap-2 border-b border-dashed border-[#8a6a3c]/50 pb-4 font-mono text-[11px] tracking-[0.16em] text-[#6b4f2c] uppercase sm:flex-row">
                <span>Dispatch to · Future Omkar</span>
                <span>Ref #004 · Year undisclosed</span>
              </div>

              <LetterWriting />
            </div>

            {/* the quill, resting across the top corner */}
            <svg
              aria-hidden="true"
              viewBox="0 0 300 150"
              className="pointer-events-none absolute -top-14 -right-4 z-20 w-[190px] drop-shadow-[0_10px_8px_rgba(0,0,0,0.45)] md:-top-16 md:-right-24 md:w-[300px]"
            >
              <defs>
                <linearGradient id="quill-vane" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#2a2a2f" />
                  <stop offset="0.5" stopColor="#101013" />
                  <stop offset="1" stopColor="#050506" />
                </linearGradient>
              </defs>
              <path
                d="M6 14 C 54 -4 138 14 214 82 C 160 60 96 44 48 52 C 60 40 36 28 6 14 Z"
                fill="url(#quill-vane)"
              />
              <path
                d="M6 14 C 52 30 110 56 214 84"
                fill="none"
                stroke="#6b6b73"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <g stroke="#3a3a42" strokeWidth="0.8" strokeLinecap="round">
                <path d="M30 18 L18 30" />
                <path d="M56 24 L40 40" />
                <path d="M84 33 L66 50" />
                <path d="M112 43 L92 58" />
                <path d="M140 54 L118 66" />
                <path d="M168 66 L146 75" />
              </g>
              <path
                d="M214 82 L262 120 L270 124 L266 116 L222 76 Z"
                fill="#b9a98a"
                stroke="#8a7650"
                strokeWidth="0.8"
              />
              <path d="M262 120 L276 134 L268 126 Z" fill="#2a2118" />
            </svg>

            {/* the ink pot */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="pointer-events-none absolute -bottom-9 -left-3 z-20 w-[84px] drop-shadow-[0_8px_6px_rgba(0,0,0,0.5)] md:-bottom-10 md:-left-20 md:w-[112px]"
            >
              <circle cx="50" cy="50" r="46" fill="#d4b878" />
              <circle cx="50" cy="50" r="46" fill="none" stroke="#a88a4e" strokeWidth="2" />
              <circle cx="50" cy="50" r="34" fill="#c4a45e" />
              <circle cx="50" cy="50" r="27" fill="#08070a" />
              <ellipse cx="42" cy="41" rx="9" ry="5" fill="#ffffff" opacity="0.28" transform="rotate(-25 42 41)" />
              <circle cx="60" cy="58" r="3" fill="#ffffff" opacity="0.12" />
            </svg>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Scene 06: the final frame, as a black rounded box like the conviction banner above it. */
function Finale() {
  return (
    <section data-chapter="5" className={`${SECTION} py-10 md:py-20`}>
      <Reveal data-dark-box className="relative flex min-h-[460px] items-end overflow-hidden rounded-[20px] bg-btn text-bg lg:min-h-[560px]">
        {PHOTOS.road.src && (
          <>
            <div className="absolute inset-0">
              <Photo
                id="road"
                sizes="(min-width:1024px) 1240px, 100vw"
                className="size-full rounded-none bg-btn"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-btn via-btn/75 to-btn/20 lg:bg-linear-to-r lg:from-btn lg:via-btn/85 lg:to-btn/10" />
          </>
        )}
        <div className="relative z-10 w-full p-8 md:p-14">
          <div className="max-w-3xl">
            <div className="mb-4 font-mono text-label tracking-[0.22em] text-accent-soft uppercase">
              06 — Still becoming
            </div>
            <h2 className="m-0 mb-8 font-display text-[34px] leading-[1.08] font-medium tracking-[-0.02em] text-bg md:text-[52px]">
              I didn’t come this far just to stay the same.
            </h2>
            {/* the closing line: three quiet beats, then the one that stays */}
            <div className="m-0 flex flex-col font-display text-[26px] leading-[1.2] tracking-[-0.015em] md:text-[40px]">
              {["Still learning.", "Still exploring.", "Still building."].map((line, i) => (
                <Reveal key={line} y={10} delay={0.18 * (i + 1)} className="text-bg/60">
                  {line}
                </Reveal>
              ))}
              <Reveal y={10} delay={0.18 * 4 + 0.15} className="text-accent-soft italic">
                Still becoming.
              </Reveal>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-display text-title font-semibold text-bg">
                  — {SITE.name}
                </span>
                <span className="font-mono text-label text-bg/70 uppercase">
                  Engineer · Builder · Explorer
                </span>
              </div>
              <p className="m-0 font-display text-[22px] text-accent-soft italic">
                And the story continues…
              </p>
            </div>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href={`mailto:${SITE.email}`}
                className="bg-bg! text-small text-btn! [--pill:2.25rem] hover:bg-accent! hover:text-on-accent!"
              >
                Say hello
              </ButtonLink>
              <ButtonLink
                variant="ghost"
                href="/#work"
                className="min-h-12 border-white/40 text-small font-medium text-bg"
              >
                See my work
              </ButtonLink>
              <a
                href="https://www.instagram.com/omkarnikam__/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram: @omkarnikam__"
                title="@omkarnikam__ on Instagram"
                className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-bg/80 transition-[color,border-color,scale] duration-200 hover:border-accent-soft hover:text-accent-soft active:scale-[0.94]"
              >
                <InstagramIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Story() {
  return (
    <article aria-labelledby="about-title" data-chapter-root>
      <Opening />
      <Person />
      <Beyond />
      <Mindset />
      <Letter />
      <Finale />
      <ChapterIndicator />
    </article>
  );
}
