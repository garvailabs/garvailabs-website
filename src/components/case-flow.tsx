import { ArrowDown, ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import type { FlowStep } from "@/lib/case-flows";

/**
 * "How it works" diagram for a case study: numbered steps joined by arrows
 * (across on desktop, down on phones), optionally ending in a result strip.
 * The case page omits `result` because its results sit directly above.
 * Drawn in markup, so it is readable text for search engines and screen
 * readers, not a picture of text.
 */
export function CaseFlow({
  steps,
  result,
}: {
  steps: FlowStep[];
  result?: { value: string; label: string };
}) {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface p-5 shadow-[var(--shadow-md)] sm:p-8">
      {/* Brand dot field, top-right — decorative. */}
      <div aria-hidden="true" className="dot-field pointer-events-none absolute -right-4 -top-4 h-40 w-64" />

      <div className="relative flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="eyebrow">How it works</h2>
        <p className="text-sm text-muted">{steps.length} steps, from input to result</p>
      </div>

      <ol className="relative mt-6 grid gap-3 lg:grid-cols-4 lg:gap-5">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <Rise as="li" key={s.title} delay={i * 0.08} from="soft" className="relative">
              <div className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-soft p-5 lg:h-full">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-second/25 bg-surface text-second">
                    <s.icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="num text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-4 text-base">{s.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-muted">{s.detail}</p>
                {s.tag && (
                  <span className="mt-4 inline-flex w-fit rounded-full border border-second/20 bg-surface px-2.5 py-1 text-xs font-semibold text-second">
                    {s.tag}
                  </span>
                )}
              </div>

              {/* Connector to the next step: down on phones, across on lg (sits in the grid gap). */}
              {!last && (
                <>
                  <span aria-hidden="true" className="flex justify-center py-2 text-second lg:hidden">
                    <ArrowDown size={18} strokeWidth={2} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -right-[1.5rem] top-1/2 z-[1] hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-muted shadow-[var(--shadow-xs)] lg:flex"
                  >
                    <ArrowRight size={14} strokeWidth={2.2} />
                  </span>
                </>
              )}
            </Rise>
          );
        })}
      </ol>

      {result && (
      <Rise delay={0.35} from="soft">
        <div className="relative mt-5 flex flex-col gap-1 rounded-[var(--radius-lg)] border border-accent/25 bg-accent-soft px-5 py-4 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">Result</span>
          <span className="num text-2xl text-accent-text">{result.value}</span>
          <span className="text-sm text-text">{result.label}</span>
        </div>
      </Rise>
      )}
    </div>
  );
}
