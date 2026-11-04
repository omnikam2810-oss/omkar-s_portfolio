import type { Metadata } from "next";
import { Story } from "@/components/about/story";
import { ABOUT_META } from "@/lib/about-story";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT_META.excerpt,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "article",
    url: "/about",
    title: `${ABOUT_META.title} — Omkar Nikam`,
    description: ABOUT_META.excerpt,
    authors: [SITE.name],
  },
};

export default function AboutPage() {
  // Structured data: an article, written by me.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ABOUT_META.title,
    description: ABOUT_META.excerpt,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/about`,
  };
  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so the JSON can never close the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Story />
    </>
  );
}
