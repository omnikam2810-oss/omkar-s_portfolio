import { SITE } from "@/lib/site";

// Structured data that tells search engines who this site is about. Everything here is already
// public on the site itself: no new claims.
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: `${SITE.name} — Portfolio`,
      inLanguage: "en",
      publisher: { "@id": `${SITE.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.name,
      url: SITE.url,
      jobTitle: "Software Engineer",
      description: SITE.description,
      image: `${SITE.url}/opengraph-image`,
      address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
      worksFor: { "@type": "Organization", name: "WargsTech" },
      knowsAbout: ["React", "Node.js", "Express", "MongoDB", "MySQL", "REST APIs", ".NET", "JavaScript", "Full stack development"],
      sameAs: [SITE.github, SITE.linkedin.startsWith("http") ? SITE.linkedin : `https://${SITE.linkedin}`],
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so no value can close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\u003c") }}
    />
  );
}
