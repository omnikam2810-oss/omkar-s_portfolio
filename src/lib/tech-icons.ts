import {
  siCloudinary,
  siDocker,
  siDotnet,
  siExpo,
  siExpress,
  siGithub,
  siGooglegemini,
  siJsonwebtokens,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siRedis,
  siRender,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  type SimpleIcon,
} from "simple-icons";

type Tech = { match: RegExp; icon: SimpleIcon; name: string; role: string };

/**
 * Tech logos (from the CC0 Simple Icons set) for the tags, each with a name and a one-line role for the
 * tooltip. A rule matches a word in a tag; the first rule that matches a part of the tag wins, so
 * "React Native" is checked before "React".
 */
const TECH: Tech[] = [
  {
    match: /react native/i,
    icon: siReact,
    name: "React Native",
    role: "Native mobile apps with React",
  },
  {
    match: /expo/i,
    icon: siExpo,
    name: "Expo",
    role: "Toolchain for React Native apps",
  },
  {
    match: /next\.?js/i,
    icon: siNextdotjs,
    name: "Next.js",
    role: "React framework for the web",
  },
  {
    match: /react/i,
    icon: siReact,
    name: "React",
    role: "UI library for building interfaces",
  },
  {
    match: /typescript/i,
    icon: siTypescript,
    name: "TypeScript",
    role: "JavaScript with types",
  },
  {
    match: /node/i,
    icon: siNodedotjs,
    name: "Node.js",
    role: "JavaScript runtime for servers",
  },
  {
    match: /express/i,
    icon: siExpress,
    name: "Express",
    role: "Web framework for Node.js",
  },
  {
    match: /mongo/i,
    icon: siMongodb,
    name: "MongoDB",
    role: "Document database",
  },
  {
    match: /postgres/i,
    icon: siPostgresql,
    name: "PostgreSQL",
    role: "Relational database",
  },
  {
    match: /prisma/i,
    icon: siPrisma,
    name: "Prisma",
    role: "Type-safe database toolkit",
  },
  {
    match: /redis/i,
    icon: siRedis,
    name: "Redis",
    role: "In-memory store, used for queues",
  },
  {
    match: /socket/i,
    icon: siSocketdotio,
    name: "Socket.IO",
    role: "Real-time, two-way messaging",
  },
  {
    match: /jwt/i,
    icon: siJsonwebtokens,
    name: "JWT",
    role: "Token-based sign-in",
  },
  {
    match: /tailwind/i,
    icon: siTailwindcss,
    name: "Tailwind CSS",
    role: "Utility-first styling",
  },
  {
    match: /docker/i,
    icon: siDocker,
    name: "Docker",
    role: "Runs apps in containers",
  },
  {
    match: /cloudinary/i,
    icon: siCloudinary,
    name: "Cloudinary",
    role: "Image storage and delivery",
  },
  {
    match: /gemini/i,
    icon: siGooglegemini,
    name: "Gemini",
    role: "Google's AI model",
  },
  {
    match: /github/i,
    icon: siGithub,
    name: "GitHub",
    role: "Code hosting, and its API",
  },
  {
    match: /vite/i,
    icon: siVite,
    name: "Vite",
    role: "Fast front-end build tool",
  },
  {
    match: /\.net|dotnet/i,
    icon: siDotnet,
    name: ".NET",
    role: "Microsoft's app framework",
  },
  {
    match: /vercel/i,
    icon: siVercel,
    name: "Vercel",
    role: "Hosting for web apps",
  },
  {
    match: /render/i,
    icon: siRender,
    name: "Render",
    role: "Hosting for servers",
  },
];

export type TagTech = Pick<Tech, "icon" | "name" | "role">;

/**
 * Tags that name an idea, not one product ("MERN", "Prompt engineering"). They get a tooltip too, and
 * can borrow some logos for the tag itself.
 */
const CONCEPTS: {
  match: RegExp;
  name: string;
  role: string;
  icons?: SimpleIcon[];
}[] = [
  {
    match: /^mern$/i,
    name: "MERN stack",
    role: "MongoDB, Express, React and Node.js working together",
    icons: [siMongodb, siExpress, siReact, siNodedotjs],
  },
  {
    match: /llm/i,
    name: "LLM API",
    role: "Calling a large language model (an AI model) over an API",
  },
  {
    match: /prompt/i,
    name: "Prompt engineering",
    role: "Designing the instructions an AI model is given",
  },
  {
    match: /async/i,
    name: "Async processing",
    role: "Work done in the background, off the request",
  },
  {
    match: /iis/i,
    name: "IIS log analytics",
    role: "Reading web-server logs to spot traffic patterns",
  },
  {
    match: /web & mobile/i,
    name: "Web and mobile apps",
    role: "Custom websites and apps built for clients",
  },
  {
    match: /government/i,
    name: "Government portals",
    role: "Public-service platforms for citizens and officials",
  },
  {
    match: /qr/i,
    name: "QR verification",
    role: "Checking a doctor's licence by scanning a code",
  },
  {
    match: /cpd/i,
    name: "CPD credits",
    role: "Continuing-education points doctors must earn",
  },
];

/** What a tag shows: logos to put before its text, and the lines of its tooltip. */
export type TagInfo = {
  icons: SimpleIcon[];
  lines: { name: string; role: string }[];
};

/** Tags can name several things ("Node · Express", "PostgreSQL · Prisma"): one entry per part, at most two. */
function techsForTag(label: string): TagTech[] {
  const found: TagTech[] = [];
  for (const part of label.split(/[·+&/→]/)) {
    const hit = TECH.find((t) => t.match.test(part));
    if (hit && !found.some((f) => f.icon === hit.icon))
      found.push({ icon: hit.icon, name: hit.name, role: hit.role });
  }
  return found.slice(0, 2);
}

export function tagInfo(label: string): TagInfo {
  const techs = techsForTag(label);
  if (techs.length > 0)
    return {
      icons: techs.map((t) => t.icon),
      lines: techs.map((t) => ({ name: t.name, role: t.role })),
    };
  const concept = CONCEPTS.find((c) => c.match.test(label));
  if (concept)
    return {
      icons: concept.icons ?? [],
      lines: [{ name: concept.name, role: concept.role }],
    };
  return { icons: [], lines: [] };
}
