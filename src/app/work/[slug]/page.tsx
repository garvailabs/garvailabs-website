import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { CardIcon } from "@/components/ui/section-heading";
import { StoryNav } from "@/components/story-nav";
import { CaseFlow } from "@/components/case-flow";
import { caseFlows } from "@/lib/case-flows";
import { WorkGrid, sectorIcon } from "@/components/selected-work";
import { caseStudies, getCaseStudy } from "@/lib/work";
import { BookCallCta } from "@/components/cal/book-call-button";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

const chapters = [
  { id: "problem", label: "The problem" },
  { id: "solution", label: "What we built" },
  { id: "results", label: "Results" },
  { id: "technology", label: "Technology" },
];

function Chapter({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-12 first:border-t-0 first:pt-0">
      <Rise from="soft">
        <h2 className="tight text-2xl sm:text-3xl">{title}</h2>
      </Rise>
      <Rise delay={0.06} from="soft">
        <div className="mt-6">{children}</div>
      </Rise>
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2);
  const flow = caseFlows[study.slug];

  return (
    <>
      <section className="page-top border-b border-line">
        <div className="shell pb-16 md:pb-20">
          <Rise>
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-text"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              All case studies
            </Link>
          </Rise>

          <Rise delay={0.06}>
            <div className="mt-8 flex items-center gap-3">
              <CardIcon icon={sectorIcon(study)} />
              <p className="eyebrow">{study.sector}</p>
            </div>
          </Rise>
          <Rise delay={0.1}>
            <h1 className="tight mt-5 max-w-[22ch] text-4xl sm:text-5xl">{study.title}</h1>
          </Rise>
          <Rise delay={0.14}>
            <p className="mt-5 max-w-[60ch] text-lg text-muted">{study.summary}</p>
          </Rise>

          <Rise delay={0.18}>
            <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {study.results.map((r) => (
                <div key={r.label} className="card p-6">
                  <dt className="num text-3xl text-accent-text sm:text-4xl">{r.value}</dt>
                  <dd className="mt-2 text-sm text-muted">{r.label}</dd>
                </div>
              ))}
            </dl>
          </Rise>

          {flow && (
            <Rise delay={0.2} className="mt-10">
              <CaseFlow steps={flow} />
            </Rise>
          )}

          {study.image && (
            <Rise delay={0.2}>
              <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)] border border-line bg-soft">
                <Image src={study.image.src} alt={study.image.alt} fill priority sizes="(max-width: 1120px) 100vw, 1120px" className="object-cover" />
              </div>
            </Rise>
          )}
        </div>
      </section>

      <div className="band">
        <div className="shell grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <StoryNav chapters={chapters} />
          </aside>

          <div className="min-w-0 max-w-3xl">
            <Chapter id="problem" title="The problem">
              <ul className="flex flex-col gap-4">
                {study.problem.map((p) => (
                  <li key={p} className="flex gap-3.5 text-md text-muted">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </Chapter>

            <Chapter id="solution" title="What we built">
              <ul className="flex flex-col gap-4">
                {study.solution.map((s) => (
                  <li key={s} className="flex gap-3.5 text-md text-muted">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-second-soft">
                      <Check size={11} strokeWidth={3} className="text-second" aria-hidden="true" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </Chapter>

            <Chapter id="results" title="Results">
              <ul className="flex flex-col gap-3">
                {study.results.map((r) => (
                  <li key={r.label} className="flex gap-3 text-md text-muted">
                    <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-second" aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-text">{r.value}</span> {r.label}
                    </span>
                  </li>
                ))}
              </ul>
            </Chapter>

            <Chapter id="technology" title="Technology">
              <ul className="flex flex-wrap gap-2.5">
                {study.tech.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-soft px-4 py-2 text-sm font-medium text-text">
                    {t}
                  </li>
                ))}
              </ul>
            </Chapter>
          </div>
        </div>
      </div>

      <section className="band border-t border-line bg-soft">
        <div className="shell">
          <Rise from="soft">
            <p className="eyebrow text-center">More case studies</p>
          </Rise>
          <div className="mt-8">
            <WorkGrid items={others} columns={2} />
          </div>

          <Rise from="soft">
            <div className="card mx-auto mt-16 flex max-w-3xl flex-col items-center gap-5 p-10 text-center">
              <h2 className="tight text-3xl">Have a problem shaped like this?</h2>
              <p className="max-w-[46ch] text-md text-muted">
                Tell us the workflow and the constraints it runs under. We will tell you whether it is
                worth building.
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
