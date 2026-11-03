import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { SectionHeading } from "@/components/ui/section-heading";
import { StepsTimeline } from "@/components/steps-timeline";
import { principles, steps } from "@/lib/content";

/**
 * Split layout, deliberately not another card row: the statement holds the
 * left column while the four rules sit on the right as a ruled list.
 * `withSteps` (homepage) appends the four-step process in the same section,
 * so "why us" and "how we work" read as one argument instead of two sections.
 */
export function WhyUs({
  withAboutLink = true,
  withSteps = false,
  band = "soft",
}: {
  withAboutLink?: boolean;
  withSteps?: boolean;
  /** Band colour, so the section keeps the page's white/sand alternation. */
  band?: "soft" | "plain";
}) {
  return (
    <section className={`band border-t border-line ${band === "soft" ? "bg-soft" : ""}`}>
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Why GARV AI LABS"
            title="Built to be trusted with real work."
            body="Four rules every engagement runs on, whatever the technology underneath. They are why clients hand us the processes that actually matter."
          />
          {withAboutLink && (
            <Rise delay={0.16} from="soft">
              <Link
                href="/about"
                className="group mt-8 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-text underline-offset-4 hover:underline"
              >
                More about how we work
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" className="arrow-nudge" />
              </Link>
            </Rise>
          )}

          {/* PLACEHOLDER PHOTOS — generic stock images standing in until real
              office/team photos exist. Alt text stays neutral on purpose: they
              are not GARV AI LABS' office or people, so nothing claims they are.
              Both are low-resolution (626×417, 284×234), so the meeting shot is
              kept small as an inset; replace with ≥1600px-wide originals. */}
          <Rise delay={0.2} from="soft">
            <div className="relative mt-10 mb-8 max-w-[480px] pr-6 sm:pr-10">
              <div className="overflow-hidden rounded-[var(--radius-xl)] border border-line shadow-[var(--shadow-md)]">
                <Image
                  src="/images/office.png"
                  alt="A bright open-plan office workspace"
                  width={626}
                  height={417}
                  sizes="(max-width: 1023px) 90vw, 480px"
                  className="block h-auto w-full"
                />
              </div>
              <div className="absolute -bottom-8 right-0 w-[44%] max-w-[210px] overflow-hidden rounded-[var(--radius-lg)] border-4 border-surface shadow-[var(--shadow-lg)]">
                <Image
                  src="/images/team-meeting.png"
                  alt="A team meeting around a table"
                  width={284}
                  height={234}
                  sizes="210px"
                  className="block h-auto w-full"
                />
              </div>
            </div>
          </Rise>
        </div>

        <ul className="grid gap-x-10 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Rise as="li" key={p.title} delay={(i % 2) * 0.08} from="soft" className="border-t border-line-strong py-7">
              <h3 className="text-lg">{p.title}</h3>
              <p className="mt-2 text-base text-muted">{p.body}</p>
            </Rise>
          ))}
        </ul>
      </div>

      {withSteps && (
        <div id="how" className="shell mt-20 scroll-mt-24 border-t border-line-strong pt-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Rise from="soft">
                <p className="eyebrow">How we work</p>
              </Rise>
              <Rise delay={0.06} from="up">
                <h2 className="tight mt-4 text-3xl sm:text-4xl">Four steps, in this order, every time.</h2>
              </Rise>
            </div>
            <Rise delay={0.1} from="soft">
              <p className="max-w-[40ch] text-base text-muted md:text-right">
                Skipping the scoping step is how projects quietly go wrong in month two.
              </p>
            </Rise>
          </div>
          <div className="mt-12">
            <StepsTimeline steps={steps} />
          </div>
        </div>
      )}
    </section>
  );
}
