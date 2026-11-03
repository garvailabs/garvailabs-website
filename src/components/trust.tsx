import Image from "next/image";
import { Mail, MessageCircleQuestion, Phone } from "lucide-react";
import { CompanyEmailLink } from "@/components/company-email-link";
import { site } from "@/lib/site";
import { FaqAccordion } from "@/components/faq-accordion";
import { Rise } from "@/components/ui/rise";
import { SectionHeading } from "@/components/ui/section-heading";
import { faq, team, testimonials } from "@/lib/trust";

function StillCurious() {
  return (
    <div className="card mt-8 p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-second-soft text-second">
        <MessageCircleQuestion size={20} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <p className="mt-4 text-lg font-semibold">Still have a question?</p>
      <p className="mt-1 text-sm text-muted">Write or call — a person replies, not a bot.</p>
      {/* Email and phone only: the page's booking CTAs live in the hero and the closing section. */}
      <div className="mt-5 flex flex-col gap-1">
        <CompanyEmailLink className="inline-flex min-h-11 items-center gap-2.5 text-sm font-semibold text-text underline-offset-4 hover:underline">
          <Mail size={15} className="text-second" aria-hidden="true" />
          {site.email}
        </CompanyEmailLink>
        <a
          href={`tel:${site.phoneHref}`}
          className="inline-flex min-h-11 items-center gap-2.5 text-sm font-semibold text-text underline-offset-4 hover:underline"
        >
          <Phone size={15} className="text-second" aria-hidden="true" />
          {site.phone}
        </a>
      </div>
    </div>
  );
}

/** Team and testimonials (each only once real entries exist), then the FAQ. */
export function Trust() {
  return (
    <section className="band border-t border-line bg-soft">
      <div className="shell">
        {team.length > 0 && (
          <div className="mb-24">
            <SectionHeading eyebrow="Team" title="You work with the builders." />
            <ul className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
              {team.map((m, i) => (
                <Rise as="li" key={m.name} delay={i * 0.06} from="soft" className="text-center">
                  <div className="relative mx-auto aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-soft">
                    <Image src={m.photo} alt={m.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                  </div>
                  <p className="mt-4 text-base font-semibold">{m.name}</p>
                  <p className="text-sm text-muted">{m.role}</p>
                </Rise>
              ))}
            </ul>
          </div>
        )}

        {testimonials.length > 0 && (
          <div className="mb-24">
            <SectionHeading eyebrow="Clients" title="In their words." />
            <ul className="mt-12 grid gap-5 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <Rise as="li" key={t.name} delay={i * 0.06} from="soft">
                  <figure className="card flex h-full flex-col p-8">
                    <blockquote className="flex-1 text-lg">“{t.quote}”</blockquote>
                    <figcaption className="mt-6 text-sm text-muted">
                      <span className="font-semibold text-text">{t.name}</span> · {t.role}, {t.company}
                    </figcaption>
                  </figure>
                </Rise>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left: heading and a way out for questions not on the list. Sticks while the list scrolls. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Questions before the first call."
              body="The things people usually ask us first."
            />
            <Rise delay={0.12} from="soft" className="hidden lg:block">
              <StillCurious />
            </Rise>
          </div>

          <Rise delay={0.08} from="soft">
            <FaqAccordion items={faq} />
            {/* Phones: the way out comes after the questions, not before. */}
            <div className="lg:hidden">
              <StillCurious />
            </div>
          </Rise>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}
