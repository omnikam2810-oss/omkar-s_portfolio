import type { MetadataRoute } from "next";
import { getCaseStudySlugs } from "@/lib/case-studies";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getCaseStudySlugs();
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/how-i-build`, changeFrequency: "monthly", priority: 0.6 },
    ...slugs.map((slug) => ({ url: `${SITE.url}/work/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
