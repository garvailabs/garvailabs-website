import type { Metadata } from "next";
import { Rise } from "@/components/ui/rise";
import { ServicesGrid } from "@/components/services-grid";
import { StepsTimeline } from "@/components/steps-timeline";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookCallCta } from "@/components/cal/book-call-button";
import { steps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI automation and agents, software development, mobile apps, websites, SEO and GEO — built and run by GARV AI LABS.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  return (
    <>
      <section className="page-top pb-14 md:pb-20">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <Rise from="soft">
              <p className="eyebrow">Services</p>
            </Rise>
            <Rise delay={0.07} from="up">
              <h1 className="tight mx-auto mt-4 max-w-[18ch] text-5xl sm:text-6xl">
                Six ways we take work off your team.
              </h1>
            </Rise>
            <Rise delay={0.14} from="soft">
              <p className="mx-auto mt-6 max-w-[58ch] text-lg text-muted">
                From AI agents that finish a case end to end, to the software, apps and search
                visibility that surround them. Every engagement starts with one workflow and a
                written scope.
              </p>
            </Rise>
          </div>
        </div>
      </section>

      <section className="band !pt-0">
        <div className="shell">
          <h2 className="sr-only">All services</h2>
          <ServicesGrid />
        </div>
      </section>

      <section className="band border-t border-line bg-soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Whichever you pick"
            title="Every engagement follows the same arc."
          />
          <div className="mt-14">
            <StepsTimeline steps={steps} />
          </div>
        </div>
      </section>

      <section className="band border-t border-line">
        <div className="shell">
          <Rise from="soft">
            <div className="card mx-auto flex max-w-3xl flex-col items-center gap-6 p-10 text-center">
              <p className="tight text-2xl font-bold">
                Not sure which of these your problem needs? Describe the workflow and we will point
                you to the right one.
              </p>
              <BookCallCta arrow className="w-auto">
                Book a call
              </BookCallCta>
            </div>
          </Rise>
        </div>
      </section>
    </>
  );
}
