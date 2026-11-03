import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { Rise } from "@/components/ui/rise";
import { CompanyEmailLink } from "@/components/company-email-link";
import { BackToTop, NoidaTime } from "@/components/footer-extras";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/work";
import { site } from "@/lib/site";

/**
 * Case studies grouped by sector (the part of `sector` before " · "), in
 * their original order. A sector with several studies lists them beneath it.
 */
function workBySector() {
  const groups = new Map<string, typeof caseStudies>();
  for (const c of caseStudies) {
    const sector = c.sector.split(" · ")[0];
    groups.set(sector, [...(groups.get(sector) ?? []), c]);
  }
  return [...groups].map(([sector, studies]) => ({ sector, studies }));
}

const heading = "text-xs font-semibold uppercase tracking-[0.2em] text-dark-muted";
const link =
  // overflow-wrap:anywhere only kicks in when a single word cannot fit (very large text on narrow phones).
  "footer-link inline-flex min-h-9 items-center py-1 leading-snug text-base text-dark-text/85 [overflow-wrap:anywhere] hover:text-dark-text";

export function Footer() {
  return (
    <footer id="site-footer" className="relative overflow-hidden bg-dark">
      {/* A soft orange glow rising from the giant wordmark. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 100%, rgba(238,99,82,0.16), transparent 70%)",
        }}
      />

      <div className="shell relative pt-16 md:pt-20">
        <Rise from="soft">
          {/* Phones: brand and contact full width, Services and Work side by side. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
            <div className="col-span-2 flex flex-col items-start gap-6 lg:col-span-1">
              <Wordmark tone="dark" />
              <p className="max-w-xs text-base text-dark-muted">
                We build AI-native systems that declutter operations, unite disconnected systems, and
                turn data into decisive action.
              </p>
              <NoidaTime />
            </div>

            <nav aria-label="Services" className="min-w-0">
              <h2 className={heading}>Services</h2>
              <ul className="mt-5 space-y-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={link}>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Case studies" className="min-w-0">
              <h2 className={heading}>Work</h2>
              <ul className="mt-5 space-y-1">
                {workBySector().map(({ sector, studies }) =>
                  studies.length === 1 ? (
                    <li key={sector}>
                      <Link href={`/work/${studies[0].slug}`} className={link}>
                        {sector}
                      </Link>
                    </li>
                  ) : (
                    <li key={sector}>
                      <span className="inline-flex min-h-9 items-center text-base text-dark-text/85">{sector}</span>
                      <ul className="mb-1 border-l border-dark-line pl-3.5">
                        {studies.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/work/${c.slug}`}
                              className="footer-link inline-flex min-h-8 items-center text-sm text-dark-muted [overflow-wrap:anywhere] hover:text-dark-text"
                            >
                              {c.shortName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ),
                )}
                <li>
                  <Link
                    href="/work"
                    className="group inline-flex min-h-9 items-center gap-1 text-base font-medium text-accent"
                  >
                    All work
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="col-span-2 lg:col-span-1">
              <h2 className={heading}>Contact</h2>
              <ul className="mt-5 space-y-3 text-base">
                <li>
                  <CompanyEmailLink className="flex min-h-9 items-center gap-3 text-dark-text/85 transition-colors hover:text-dark-text">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dark-line text-accent">
                      <Mail size={14} aria-hidden="true" />
                    </span>
                    <span className="break-all">{site.email}</span>
                  </CompanyEmailLink>
                </li>
                <li>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="flex min-h-9 items-center gap-3 text-dark-text/85 transition-colors hover:text-dark-text"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dark-line text-accent">
                      <Phone size={14} aria-hidden="true" />
                    </span>
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-dark-muted">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dark-line text-accent">
                    <MapPin size={14} aria-hidden="true" />
                  </span>
                  <span className="pt-1">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Rise>

        <div className="mt-14 flex flex-col gap-4 border-t border-dark-line py-6 text-sm text-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>© {new Date().getFullYear()} GARV AI LABS</p>
            <Link href="/privacy" className="inline-flex min-h-9 items-center text-dark-text/85 hover:text-dark-text hover:underline">
              Privacy Policy
            </Link>
          </div>
          <BackToTop />
        </div>
      </div>

      {/* Signature: the name, full-bleed, cropped by the page edge. Decorative. */}
      <p aria-hidden="true" className="footer-mark relative">
        GARV AI LABS
      </p>
    </footer>
  );
}
