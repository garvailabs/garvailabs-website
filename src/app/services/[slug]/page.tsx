import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { Cta } from "@/components/ui/button";
import { CardIcon, SectionHeading } from "@/components/ui/section-heading";
import { StepsTimeline } from "@/components/steps-timeline";
import { WorkCard } from "@/components/selected-work";
import { services, getService } from "@/lib/services";
import { caseStudies } from "@/lib/work";
import { BookCallCta } from "@/components/cal/book-call-button";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = caseStudies.filter((c) => service.relatedWork.includes(c.slug));
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      {/* hero */}
      <section className="page-top border-b border-line">
        <div className="shell pb-16 md:pb-20">
          <Rise>
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-text"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              All services
            </Link>
          </Rise>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
            <div>
              <Rise delay={0.06}>
                <div className="flex items-center gap-3">
                  <CardIcon icon={service.icon} />
                  <p className="eyebrow">{service.name}</p>
                </div>
              </Rise>
              <Rise delay={0.1}>
                <h1 className="tight mt-5 max-w-[20ch] text-4xl sm:text-5xl">{service.headline}</h1>
              </Rise>
              <Rise delay={0.14}>
                <p className="mt-5 max-w-[58ch] text-lg text-muted">{service.intro}</p>
              </Rise>
              <Rise delay={0.18}>
                <div className="mt-8">
                  <Cta href="/contact" arrow>
                    Discuss this
                  </Cta>
                </div>
              </Rise>
            </div>

            <Rise delay={0.16}>
              <div className="card p-7">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  What we work with
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.stack.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line bg-soft px-3 py-1.5 text-sm font-medium text-text"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* what's included */}
      <section className="band">
        <div className="shell">
          <SectionHeading eyebrow="Scope" title="What this includes" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {service.offerings.map((o, i) => (
              <Rise key={o.title} delay={(i % 2) * 0.07} from="soft" className="h-full">
                <div className="card card-tint flex h-full flex-col p-7 md:p-8">
                  <span className="text-sm font-semibold text-second">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl">{o.title}</h3>
                  <p className="mt-2 text-base text-muted">{o.body}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* process */}
      <section className="band border-t border-line bg-soft">
        <div className="shell">
          <SectionHeading eyebrow="Process" title="How we run it" />
          <div className="mt-14">
            <StepsTimeline steps={service.process.map((p) => ({ n: p.step, title: p.title, body: p.body }))} />
          </div>
        </div>
      </section>

      {/* related work */}
      {related.length > 0 && (
        <section className="band border-t border-line">
          <div className="shell">
            <SectionHeading eyebrow="Proof" title="Where we have done this" />
            <div
              className={`mt-12 grid gap-5 md:grid-cols-2 ${related.length > 2 ? "lg:grid-cols-3" : ""}`}
            >
              {related.map((c, i) => (
                <Rise as="article" key={c.slug} delay={i * 0.07} from="soft" className="h-full">
                  <WorkCard c={c} variant="compact" />
                </Rise>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* other services */}
      <section className="band border-t border-line bg-soft">
        <div className="shell">
          <SectionHeading eyebrow="More" title="Other services" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => (
              <Rise key={s.slug} delay={i * 0.06} from="soft" className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="card card-lift group flex h-full flex-col p-6"
                >
                  <CardIcon icon={s.icon} />
                  <span className="mt-4 block text-lg font-semibold">{s.name}</span>
                  <span className="mt-1 block flex-1 text-sm text-muted">{s.short}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text">
                    Learn more
                    <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" className="arrow-nudge" />
                  </span>
                </Link>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* cta — light, not dark: a dark band here would run straight into the dark footer. */}
      <section className="band border-t border-line">
        <div className="shell">
          <Rise from="soft" className="card mx-auto flex max-w-3xl flex-col items-center p-10 text-center">
            <h2 className="tight text-3xl sm:text-4xl">
              Tell us the workflow. We will tell you what it needs.
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] text-md text-muted">
              A short call about one real process, and a clear answer on what it would take.
            </p>
            <div className="mt-8 flex justify-center">
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
