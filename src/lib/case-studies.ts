import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "work");

export type CaseStudyFrontmatter = {
  title: string;
  slug: string;
  caseNumber: string;
  tagline: string;
  role: string;
  stack: string;
  /** Optional: empty hides the Timeline fact. */
  timeline: string;
  /** "Live" shows a green pulsing dot, "In progress" an amber one. */
  status: string;
  /** Empty hides the "Visit the live app" button. */
  liveUrl: string;
  repoUrl: string;
  heroCaption: string;
  /** The case study to link to at the bottom of the page. */
  next: { title: string; slug: string; blurb: string };
};

export type CaseStudy = { frontmatter: CaseStudyFrontmatter; body: string };

/**
 * Every case study is a file in content/work/, named after its slug.
 *
 * These read the files synchronously on purpose: with Cache Components, sync file reads are
 * "predictable values" that prerender at build time, while an awaited async read counts as
 * uncached runtime data and would block the static page.
 */
export async function getCaseStudySlugs(): Promise<string[]> {
  const files = readdirSync(CONTENT_DIR);
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  // The slug becomes a file name, so only plain slugs are allowed.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  let raw: string;
  try {
    raw = readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  } catch {
    return null;
  }
  const { data, content } = matter(raw);
  const frontmatter = data as CaseStudyFrontmatter;

  return { frontmatter, body: content };
}
