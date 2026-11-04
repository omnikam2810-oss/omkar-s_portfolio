import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1360px] flex-col justify-center gap-6 px-4 py-24 md:px-8">
      <Eyebrow>404</Eyebrow>
      <h1 className="font-display text-[44px] leading-[1.06] font-medium tracking-[-0.022em] text-ink md:text-display">
        Nothing here <em className="text-accent">yet.</em>
      </h1>
      <p className="max-w-[560px] text-base leading-[1.7] text-body md:text-copy md:leading-[1.8]">
        That page doesn&apos;t exist, or it has moved. The portfolio and the
        case studies are a click away.
      </p>
      <div>
        <ButtonLink href="/" className="text-copy [--pill:2.5rem]">
          Back to the portfolio
        </ButtonLink>
      </div>
    </section>
  );
}
