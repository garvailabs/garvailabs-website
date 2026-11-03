import type { LucideIcon } from "lucide-react";
import { Rise } from "@/components/ui/rise";

export type Step = { n: string; title: string; body: string; icon?: LucideIcon };

/**
 * A real sequence, drawn as one: numbered nodes joined by a line — across on
 * desktop, down the left on phones. Each step draws the segment to the next
 * node, so the line starts and ends on a node and never overshoots.
 */
export function StepsTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <Rise as="li" key={s.n} delay={i * 0.08} from="soft" className="relative flex gap-5 lg:flex-col lg:gap-0">
            {!last && (
              <span
                aria-hidden="true"
                // Phones: from under this node down to the next (gap-10 = 2.5rem).
                // lg: from this node's right edge across the column gap (gap-8 = 2rem) to the next.
                className="absolute left-6 top-12 -bottom-10 w-px bg-line-strong lg:-right-8 lg:bottom-auto lg:left-12 lg:top-6 lg:h-px lg:w-auto"
              />
            )}
            <span className="relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-second/30 bg-surface text-second shadow-[var(--shadow-xs)]">
              {s.icon ? (
                <s.icon size={20} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <span className="num text-base">{s.n}</span>
              )}
            </span>
            <div className="lg:mt-6">
              {s.icon && <p className="text-xs font-semibold tracking-[0.18em] text-accent-text">STEP {s.n}</p>}
              <h3 className={`text-lg ${s.icon ? "mt-1.5" : ""}`}>{s.title}</h3>
              <p className="mt-2 max-w-[38ch] text-base text-muted">{s.body}</p>
            </div>
          </Rise>
        );
      })}
    </ol>
  );
}
