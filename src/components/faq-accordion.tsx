"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

/**
 * Numbered FAQ accordion. One answer open at a time; the first starts open so
 * it reads as interactive at a glance. Closed answers stay in the HTML (so
 * crawlers see them; the FAQPage JSON-LD in trust.tsx carries them too) but are
 * `inert`, so assistive tech and Tab skip them until opened.
 */
export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ol className="flex flex-col">
      {items.map((f, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <li
            key={f.q}
            className={`relative rounded-[var(--radius-lg)] border transition-[background-color,border-color,box-shadow] duration-300 ${
              isOpen
                ? "my-2 border-line bg-surface shadow-[var(--shadow-md)]"
                : "border-transparent border-b-line [&:not(:last-child)]:rounded-none"
            }`}
          >
            {/* Teal edge marks the open question. */}
            <span
              aria-hidden="true"
              className={`absolute bottom-5 left-0 top-5 w-[3px] rounded-full bg-second transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-5 px-5 py-5 text-left sm:px-7"
              >
                <span
                  className={`num shrink-0 tabular-nums transition-[color,font-size] duration-300 ${
                    isOpen ? "text-2xl text-second" : "text-base text-muted"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-base font-semibold sm:text-lg">{f.q}</span>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 ${
                    isOpen
                      ? "rotate-45 border-transparent bg-accent text-on-accent"
                      : "border-line-strong text-text group-hover:border-accent group-hover:text-accent-text"
                  }`}
                >
                  <Plus size={16} strokeWidth={2.2} aria-hidden="true" />
                </span>
              </button>
            </h3>
            {/* `inert` when closed: squeezing to 0 height alone still leaves the
                answer readable by screen readers and reachable by Tab. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[60ch] pb-6 pl-[4.5rem] pr-5 text-base text-muted sm:pl-[5.25rem] sm:pr-7">
                  {f.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
