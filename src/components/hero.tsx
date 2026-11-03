import type { CSSProperties } from "react";
import { Landmark, Ship, Sprout, Stethoscope, type LucideIcon } from "lucide-react";
import { GradingDemo } from "@/components/grading-demo";
import { BookCallCta } from "@/components/cal/book-call-button";
import { Cta } from "@/components/ui/button";

/** Stagger for the CSS entrance (.hero-in): visible without JavaScript, unlike a framer `initial`. */
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** The four sectors with shipped case studies (see lib/work.ts). */
const sectors: { icon: LucideIcon; label: string }[] = [
  { icon: Sprout, label: "Agriculture" },
  { icon: Stethoscope, label: "HealthTech" },
  { icon: Landmark, label: "Government" },
  { icon: Ship, label: "Maritime" },
];

/**
 * Split hero: the claim on the left, the proof — a live seed-grading run — on
 * the right, both in the first screen. The dot-matrix field behind the demo
 * echoes the dotted "g" in the GARV logo; it is the site's one signature mark.
 */
export function Hero() {
  return (
    <section className="page-top relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px]"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 15% 0%, rgba(238,99,82,0.08), transparent 70%), radial-gradient(ellipse 45% 60% at 85% 20%, rgba(15,118,110,0.08), transparent 70%)",
        }}
      />

      <div className="band-b shell grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="min-w-0">
          <p className="hero-in label-mono text-second" style={delay(0)}>
            AI agents · Software · Apps — built in Noida
          </p>

          <h1 className="hero-in display mt-6 text-6xl lg:text-7xl" style={delay(0.08)}>
            Intelligence that{" "}
            <span className="relative inline-block whitespace-nowrap">
              finishes
              {/* Hand-drawn underline — decorative. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="hero-underline absolute -bottom-[0.06em] left-0 h-[0.16em] w-full overflow-visible text-accent"
              >
                <path
                  d="M2 9 C 40 3, 80 3, 118 7 S 178 11, 198 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength={1}
                />
              </svg>
            </span>{" "}
            the work.
          </h1>

          <p className="hero-in mt-7 max-w-[50ch] text-lg text-muted" style={delay(0.16)}>
            We build AI-native systems that take a real job off your team — agents, automation, and
            the apps and platforms around them. Scoped in writing, built to run in the field.
          </p>

          <div className="hero-in cta-stack mt-9" style={delay(0.24)}>
            <BookCallCta arrow className="max-[480px]:w-full">
              Book a call
            </BookCallCta>
            <Cta href="/work" variant="outline">
              See our work
            </Cta>
          </div>

          <div className="hero-in mt-10 border-t border-line pt-6" style={delay(0.32)}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Systems running in
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {sectors.map((s) => (
                <li key={s.label} className="inline-flex items-center gap-2 text-sm font-medium text-text">
                  <s.icon size={16} strokeWidth={1.8} className="text-second" aria-hidden="true" />
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero-in relative min-w-0" style={delay(0.2)}>
          {/* Dot-matrix field, offset up-right so it frames the card's corner. */}
          <div aria-hidden="true" className="dot-field pointer-events-none absolute -top-6 right-0 h-[70%] w-[75%] sm:-right-10 sm:-top-10" />
          <div className="relative">
            <GradingDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
