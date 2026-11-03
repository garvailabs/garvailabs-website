import { Hero } from "@/components/hero";
import { ProofStrip } from "@/components/proof-strip";
import { ServicesGrid } from "@/components/services-grid";
import { SelectedWork } from "@/components/selected-work";
import { WhyUs } from "@/components/why-us";
import { Trust } from "@/components/trust";
import { FinalCta } from "@/components/final-cta";
import { Rise } from "@/components/ui/rise";
import { SectionHeading } from "@/components/ui/section-heading";
import { Cta } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * All-light page; bands alternate white and near-white (bg-soft) so each
 * section reads as its own block. Navy appears only in the footer.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />

      <section id="services" className="band scroll-mt-20 border-t border-line">
        <div className="shell">
          <SectionHeading
            eyebrow="What we deliver"
            title="Six ways we take work off your team."
            body="From AI agents that finish a case end to end, to the software, apps and search visibility around them."
          />
          <div className="mt-12">
            <ServicesGrid />
          </div>
          <Rise delay={0.1} from="soft" className="mt-10 flex justify-center">
            <Cta href="/services" variant="outline" arrow>
              All services
            </Cta>
          </Rise>
        </div>
      </section>

      <section className="band border-t border-line bg-soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Case studies"
            title="Systems running in the field."
            body="Real projects, real numbers — from rural procurement centres to dental clinics and US permitting offices."
          />
          <div className="mt-12">
            <SelectedWork />
          </div>
          <Rise delay={0.1} from="soft" className="mt-10 flex justify-center">
            <Cta href="/work" variant="outline" arrow>
              All case studies
            </Cta>
          </Rise>
        </div>
      </section>

      <WhyUs withSteps band="plain" />
      <Trust />
      <FinalCta />
    </>
  );
}
