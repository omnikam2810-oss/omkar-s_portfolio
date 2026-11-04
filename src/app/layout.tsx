import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Mono, Inter, Inter_Tight } from "next/font/google";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { THEME_INIT_SCRIPT } from "@/components/layout/theme-toggle";
import { Grain } from "@/components/layout/grain";
import { ProgressLine } from "@/components/layout/progress-line";
import { CommandMenu } from "@/components/command-menu/command-menu";
import { SITE } from "@/lib/site";
import "./globals.css";

// Headlines are set in Inter Tight and text in Inter.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// The Open Graph / Twitter images and the icons come from opengraph-image.tsx, twitter-image.tsx,
// icon.tsx and apple-icon.tsx in this folder.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.github }],
  keywords: ["Omkar Nikam", "software engineer", "full stack developer", "React", "Node.js", "MongoDB", "DRDO", "WargsTech", "Pune"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
};

// Browser chrome matches the page colour.
export const viewport: Viewport = {
  themeColor: "#f6f6f6",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plexMono.variable} ${interTight.variable} ${inter.variable}`}
      // the saved theme is applied before paint, so the attribute can differ from the server HTML
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen">
        <JsonLd />
        {/* Without JS, scroll reveals would stay at their hidden start state. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}[data-letter] .letter-word{opacity:1!important;filter:none!important}[data-letter] .letter-wipe{clip-path:none!important}`}</style>
        </noscript>
        <Providers>
          {/* First stop for keyboard and screen-reader users: jump past the navigation */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:rounded-full focus:bg-btn focus:px-5 focus:py-3 focus:text-small focus:font-semibold focus:text-bg focus:no-underline"
          >
            Skip to content
          </a>
          <ProgressLine />
          <Grain />
          <Nav />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <CommandMenu />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
