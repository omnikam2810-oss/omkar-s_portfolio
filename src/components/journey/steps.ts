export type JourneyStep = {
  /** "01 · EDUCATION": the chapter's number and name. */
  kind: string;
  /** The chapter's headline. */
  tagline: string;
  period: string;
  /** The plain-language fact behind the headline, shown in teal. */
  role: string;
  desc: string;
  tools: string[];
  /** Internships get a small "PROFESSIONAL EXPERIENCE" marker. */
  professional?: boolean;
  /** A closing line after the chips, for the last chapter. */
  closing?: string;
  /** Phones get the shorter copy from the mobile design. */
  phone: { tagline: string; desc: string; tools: string[] };
};

/**
 * The journey as five chapters: curiosity, knowledge, capability, reliability, impact.
 * Project names stay in the Projects section; this tells how the engineer took shape.
 */
export const STEPS: JourneyStep[] = [
  {
    kind: "01 · EDUCATION",
    tagline: "Where it started.",
    period: "2023",
    role: "B.E. Computer Engineering begins",
    desc: "Started my B.E. in Computer Engineering at Ajeenkya DY Patil School of Engineering, where curiosity turned into a passion for understanding how software works.",
    tools: ["Java", "Python", "HTML / CSS", "JavaScript"],
    phone: {
      tagline: "Where it started.",
      desc: "Started my B.E. in Computer Engineering at Ajeenkya DY Patil School of Engineering, where curiosity turned into a passion for understanding how software works.",
      tools: ["Java", "Python", "HTML / CSS", "JavaScript"],
    },
  },
  {
    kind: "02 · FOUNDATIONS",
    tagline: "Understanding the fundamentals.",
    period: "2024",
    role: "Computer fundamentals",
    desc: "Moved beyond writing code to understanding how software works. Explored object-oriented programming, database management, SQL and the MVC architecture that shaped how I approach application development.",
    tools: ["OOP", "DBMS", "SQL", "MVC", "Problem Solving"],
    phone: {
      tagline: "Understanding the fundamentals.",
      desc: "Moved beyond writing code to understanding how software works: OOP, databases, SQL and the MVC architecture behind how I build applications.",
      tools: ["OOP", "DBMS", "SQL", "MVC"],
    },
  },
  {
    kind: "03 · SKILLS",
    tagline: "From learning to building.",
    period: "2024 – 25",
    role: "Full Stack Development & DSA",
    desc: "Moved from fundamentals to full-stack development. Built applications using React, Node.js, Express and MongoDB, developed REST APIs, and strengthened my problem-solving skills through Data Structures and Algorithms.",
    tools: ["DSA", "React", "Node.js", "Express", "MongoDB", "REST APIs"],
    phone: {
      tagline: "From learning to building.",
      desc: "Moved from fundamentals to full-stack development with React, Node.js, Express, MongoDB and REST APIs, backed by Data Structures and Algorithms.",
      tools: ["DSA", "React", "Node.js", "MongoDB"],
    },
  },
  {
    kind: "04 · DRDO",
    tagline: "Engineering for reliability.",
    period: "JAN – OCT 2026",
    role: "Software Developer Intern at DRDO",
    professional: true,
    desc: "Stepped into enterprise engineering, contributing to secure, offline intranet systems. Developed an IIS Log Analyzer for server traffic monitoring and worked on modernizing legacy .NET modules through migration to Node.js.",
    tools: [".NET", ".NET → Node.js", "IIS Log Analytics", "React Dashboards", "Async Processing"],
    phone: {
      tagline: "Engineering for reliability.",
      desc: "Enterprise engineering on secure, offline intranet systems: an IIS Log Analyzer for server traffic monitoring, and legacy .NET modules migrated to Node.js.",
      tools: [".NET", "Node.js", "IIS Log Analytics", "React Dashboards"],
    },
  },
  {
    kind: "05 · WARGSTECH",
    tagline: "Building for real-world impact.",
    period: "OCT 2026 · NOW",
    role: "Software Developer Intern at WargsTech",
    professional: true,
    desc: "Working as a Software Developer Intern at WargsTech, contributing to government healthcare platforms, including MCH 2.0, DigiKYD and MahaCPD. Building and improving real-world features that support registrations, verification and digital healthcare workflows.",
    tools: ["MCH 2.0", "DigiKYD", "MahaCPD", "Government Portals"],
    closing: "And the journey is still unfolding.",
    phone: {
      tagline: "Building for real-world impact.",
      desc: "Contributing to government healthcare platforms, MCH 2.0, DigiKYD and MahaCPD, building and improving features for registrations, verification and digital healthcare workflows.",
      tools: ["MCH 2.0", "DigiKYD", "MahaCPD"],
    },
  },
];

/** The line under the finished timeline: the first part in soft grey, the last in teal. */
export const CLOSING_CAPTION = ["Still learning. Still building.", "Still becoming."] as const;
