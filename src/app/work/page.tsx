import type { Metadata } from "next";
import { Rise } from "@/components/ui/rise";
import { Cta } from "@/components/ui/button";
import { WorkGrid } from "@/components/selected-work";
import { caseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from GARV AI LABS across agriculture, healthtech, government and maritime — the problem, what we built, and the measured result.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <>
      <section className="page-top pb-14 md:pb-20">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
          <Rise from="soft">
            <p className="eyebrow">Case studies</p>
          </Rise>
          <Rise delay={0.07} from="up">
            <h1 className="tight mx-auto mt-4 max-w-[18ch] text-5xl sm:text-6xl">
              Systems running in the field.
            </h1>
          </Rise>
          <Rise delay={0.14} from="soft">
            <p className="mx-auto mt-6 max-w-[58ch] text-lg text-muted">
              {caseStudies.length} projects across agriculture, healthtech, government and maritime.
              Each one names the problem it started from, what we built, and what changed afterwards.
            </p>
          </Rise>
          </div>
        </div>
      </section>

      <section className="band !pt-0">
        <div className="shell">
          <h2 className="sr-only">All case studies</h2>
          <WorkGrid items={caseStudies} columns={2} />

          <Rise delay={0.12} from="soft">
            <div className="card mx-auto mt-16 flex max-w-3xl flex-col items-center gap-6 p-10 text-center">
              <p className="tight text-2xl font-bold">
                Every one of these started as a single workflow somebody was doing by hand.
              </p>
              <Cta href="/contact" arrow>
                Start with yours
              </Cta>
            </div>
          </Rise>
        </div>
      </section>
    </>
  );
}
