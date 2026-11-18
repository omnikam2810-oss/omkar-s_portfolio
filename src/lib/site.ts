/**
 * The site's public origin, used for canonical, Open Graph and sitemap URLs.
 * Set NEXT_PUBLIC_SITE_URL to the real domain; on Vercel it falls back to the production URL.
 */
const origin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3001");

export const SITE = {
  url: origin.replace(/\/$/, ""),
  title: "Omkar Nikam — Software Engineer",
  description:
    "Computer Engineering student in Pune, Full Stack Intern at WargsTech and former Full Stack Developer Intern at DRDO, building software for the real world with React, Node and MongoDB. Open to SDE roles, class of 2027.",
  name: "Omkar Nikam",
  email: "omnikam2810@gmail.com",
  github: "https://github.com/omnikam2810-oss",
  linkedin: "https://linkedin.com/in/omkar-nikam-a2aba9372",
  // The PDF lives at public/OMKAR-NIKAM-RESUME.pdf (case matters on the live server).
  resume: "/OMKAR-NIKAM-RESUME.pdf",
} as const;

/** Section ids, shared by the nav, the mobile menu and the ⌘K menu. */
export const SECTION = {
  top: "top",
  journey: "journey",
  experience: "experience",
  work: "work",
  process: "process",
  contact: "contact",
} as const;

/** A link in the nav: a section of the home page (`#id`) or a page of its own (`/path`). */
export type NavLink = {
  label: string;
  href: string;
  /** For a page link: the home-page section it stands for, so the nav still lights up while that section is read. */
  section?: string;
};

/** The page "How I build" now lives on; the home page keeps a short band under the same id. */
export const HOW_I_BUILD_HREF = "/how-i-build";

/** In the order the sections appear on the page. */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Projects", href: `#${SECTION.work}` },
  { label: "Experience", href: `#${SECTION.experience}` },
  { label: "Journey", href: `#${SECTION.journey}` },
  { label: "How I build", href: HOW_I_BUILD_HREF, section: SECTION.process },
  { label: "Contact", href: `#${SECTION.contact}` },
];

/** The phone menu leads with the work, as in the mobile design. */
export const MOBILE_NAV_LINKS: readonly NavLink[] = [
  { label: "Work", href: `#${SECTION.work}` },
  { label: "Experience", href: `#${SECTION.experience}` },
  { label: "Journey", href: `#${SECTION.journey}` },
  { label: "How I build", href: HOW_I_BUILD_HREF, section: SECTION.process },
  { label: "Contact", href: `#${SECTION.contact}` },
];

/** Space the sticky nav takes, so anchor jumps don't land under it. */
export const NAV_OFFSET = 96;
