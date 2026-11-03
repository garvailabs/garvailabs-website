import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/site";
import { BookCallCta } from "@/components/cal/book-call-button";
import { CompanyEmailLink } from "@/components/company-email-link";

const tile = "rounded-[var(--radius-card)] border border-line bg-soft p-6 shadow-[var(--shadow-xs)]";
const kicker = "flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-text";

export function FinalCta() {
  return (
    <section id="final-cta" className="band border-t border-line">
      <div className="shell">
        <SectionHeading
          eyebrow="Start here"
          title="Bring the process you keep doing by hand."
          body="One workflow and a short call. You leave with a clear answer on what it would take to automate it."
        />

        <Rise delay={0.1} from="soft">
          <div className="mx-auto mt-12 max-w-4xl rounded-[var(--radius-xl)] border border-line bg-surface p-5 shadow-[var(--shadow-sm)] sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <CompanyEmailLink className={`${tile} group block transition-colors hover:border-line-strong`}>
                <span className={kicker}>
                  <Mail size={14} aria-hidden="true" /> Email us
                </span>
                <span className="mt-2 block break-all text-lg font-semibold text-text">{site.email}</span>
              </CompanyEmailLink>
              <a href={`tel:${site.phoneHref}`} className={`${tile} block transition-colors hover:border-line-strong`}>
                <span className={kicker}>
                  <Phone size={14} aria-hidden="true" /> Call us
                </span>
                <span className="mt-2 block text-lg font-semibold text-text">{site.phone}</span>
              </a>
              <div className={tile}>
                <span className={kicker}>
                  <MapPin size={14} aria-hidden="true" /> Office
                </span>
                <span className="mt-2 block text-base font-semibold text-text">{site.address.line1}</span>
                <span className="block text-sm text-muted">{site.address.line2}</span>
              </div>
              <div className={tile}>
                <span className={kicker}>
                  <Clock size={14} aria-hidden="true" /> Hours
                </span>
                <span className="mt-2 block text-base font-semibold text-text">{site.hours}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <BookCallCta arrow className="max-[480px]:w-full">
                Book a call
              </BookCallCta>
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}
