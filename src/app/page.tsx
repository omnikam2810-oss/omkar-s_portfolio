import { Hero } from "@/components/hero/hero";
import { TechStrip } from "@/components/hero/tech-strip";
import { HighlightsStrip } from "@/components/highlights/highlights";
import { Experience } from "@/components/experience/experience";
import { Work } from "@/components/work/work";
import { Journey } from "@/components/journey/journey";
import { AboutTeaser } from "@/components/about/about-teaser";
import { Process } from "@/components/process/process";
import { Contact } from "@/components/contact/contact";
import { SITE } from "@/lib/site";

// Structured data for search engines: who the page is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: "Software Engineer",
  description: SITE.description,
  address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Ajeenkya DY Patil School of Engineering" },
  knowsAbout: ["React", "Node.js", "MongoDB", "TypeScript", "Next.js", "Full stack development"],
  sameAs: [SITE.github, SITE.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so the JSON can never close the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />

      <Hero />
      <TechStrip />
      <HighlightsStrip />
      <Work />
      <Experience />
      <Journey />
      <AboutTeaser />
      <Process />
      <Contact />
    </>
  );
}
