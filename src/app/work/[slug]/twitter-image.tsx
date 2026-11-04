import { caseStudyOgImage, OG_SIZE } from "@/lib/og";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Omkar Nikam — case study";

export async function generateStaticParams() {
  return (await getCaseStudySlugs()).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  const { caseNumber, title, tagline } = study?.frontmatter ?? { caseNumber: "", title: "Case study", tagline: "" };
  return caseStudyOgImage({ caseNumber, title, tagline });
}
