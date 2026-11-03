import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { CardIcon, SectionHeading } from "@/components/ui/section-heading";
import { WhyUs } from "@/components/why-us";
import { BookCallCta } from "@/components/cal/book-call-button";
import { CompanyEmailLink } from "@/components/company-email-link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { sectors } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "GARV AI LABS builds AI-native systems for businesses in India and beyond — from Noida, Uttar Pradesh.",
  alternates: { canonical: "/about" },
};

const contactRow = "flex min-h-11 items-center gap-3 text-base text-text transition-colors hover:text-accent-text";
const contactIcon = "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-second-soft text-second";

export default function AboutPage() {
  return (
    <>
      <section className="page-top pb-14 md:pb-20">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <Rise from="soft">
              <p className="eyebrow">About</p>
            </Rise>
            <Rise delay={0.07} from="up">
              <h1 className="tight mx-auto mt-4 max-w-[20ch] text-5xl sm:text-6xl">
                We build AI&#8209;native systems that do the work.
              </h1>
            </Rise>
            <Rise delay={0.14} from="soft">
              <p className="mx-auto mt-6 max-w-[60ch] text-lg text-muted">
                GARV AI LABS declutters operations, unites disconnected systems, and turns data into
                decisive action. We work from Noida, Uttar Pradesh, with clients across India and
                abroad — in agriculture, healthcare, government and maritime.
              </p>
            </Rise>
          </div>
        </div>
      </section>

      {/* what we do */}
      <section className="band border-t border-line">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading align="left" eyebrow="What we do" title="Somebody is doing it by hand." />
            <Rise delay={0.12} from="soft">
              <div className="mt-6 flex flex-col gap-5 text-md text-muted">
                <p>
                  Most of our projects start the same way: somebody is doing something by hand,
                  repeatedly, and the cost of that is no longer invisible. A field officer grading
                  seed by eye. A team matching ledger entries every morning. An applicant
                  resubmitting the same drawings for the fourth time.
                </p>
                <p>
                  We build the system that takes that job on — sometimes an AI agent, sometimes a
                  mobile app that works without a signal, sometimes a vision model reading a live
                  camera feed. What the technology is matters less than whether the work actually
                  gets finished afterwards.
                </p>
                <p>
                  From the first scope through go-live, you talk to the people building it — not a
                  handoff chain between sales and delivery.
                </p>
              </div>
            </Rise>
          </div>

          <Rise delay={0.1} from="soft" className="lg:pt-10">
            <div className="card p-7 md:p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Sectors we work in
              </h2>
              <ul className="mt-5 flex flex-col">
                {sectors.map((s) => (
                  <li key={s.name} className="flex items-center gap-3.5 border-b border-line py-3.5 text-base font-medium last:border-b-0">
                    <s.icon size={20} strokeWidth={1.7} className="shrink-0 text-second" aria-hidden="true" />
                    {s.name}
                  </li>
                ))}
              </ul>
              <Link
                href="/work"
                className="group mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-text"
              >
                See the case studies
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" className="arrow-nudge" />
              </Link>
            </div>
          </Rise>
        </div>
      </section>

      <WhyUs withAboutLink={false} />

      {/* services + contact */}
      <section className="band border-t border-line">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <SectionHeading align="left" eyebrow="Services" title="What we offer" />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map((s, i) => (
                <Rise as="li" key={s.slug} delay={(i % 2) * 0.06} from="soft" className="h-full">
                  <Link
                    href={`/services/${s.slug}`}
                    className="card card-lift flex h-full items-center gap-4 p-5"
                  >
                    <CardIcon icon={s.icon} />
                    <span className="text-base font-semibold">{s.name}</span>
                  </Link>
                </Rise>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading align="left" eyebrow="Contact" title="Where to find us" />
            <Rise delay={0.1} from="soft">
              <ul className="mt-8 flex flex-col gap-3">
                <li>
                  <CompanyEmailLink className={contactRow}>
                    <span className={contactIcon}>
                      <Mail size={16} aria-hidden="true" />
                    </span>
                    <span className="break-all">{site.email}</span>
                  </CompanyEmailLink>
                </li>
                <li>
                  <a href={`tel:${site.phoneHref}`} className={contactRow}>
                    <span className={contactIcon}>
                      <Phone size={16} aria-hidden="true" />
                    </span>
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-base text-muted">
                  <span className={contactIcon}>
                    <MapPin size={16} aria-hidden="true" />
                  </span>
                  <span className="pt-1.5">
                    {site.address.line1}, {site.address.line2}
                    <br />
                    {site.address.country}
                  </span>
                </li>
              </ul>
              <div className="mt-9">
                <BookCallCta arrow>Book a call</BookCallCta>
              </div>
            </Rise>
          </div>
        </div>
      </section>
    </>
  );
}
