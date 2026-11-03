"use client";

import { useState } from "react";
import { Clock, Video } from "lucide-react";
import { CAL_EVENTS, CAL_URL, calEmbedUrl } from "@/lib/cal";

/**
 * Event switcher + iframe embed. The iframe (not embed.js) is deliberate:
 * it stays reliable in Brave/Chrome where the JS embed is often blocked and
 * fails silently to a blank page.
 */
export function CalInlineEmbed() {
  const [active, setActive] = useState<string>(CAL_EVENTS[0].slug);
  const event = CAL_EVENTS.find((e) => e.slug === active) ?? CAL_EVENTS[0];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Call length"
          className="inline-flex w-fit rounded-full border border-line bg-surface p-1 shadow-[var(--shadow-xs)]"
        >
          {CAL_EVENTS.map((e) => (
            <button
              key={e.slug}
              type="button"
              aria-pressed={e.slug === active}
              onClick={() => setActive(e.slug)}
              className={`min-h-10 rounded-full px-5 text-sm font-semibold transition-colors ${
                e.slug === active ? "bg-text text-bg" : "text-muted hover:text-text"
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-second" aria-hidden="true" />
            {event.note}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Video size={14} className="text-second" aria-hidden="true" />
            Video call
          </span>
        </p>
      </div>

      <iframe
        key={event.slug}
        src={calEmbedUrl(event.slug)}
        title={`Book a ${event.label} with GARV AI LABS`}
        className="mt-5 min-h-[min(85vh,820px)] w-full rounded-[var(--radius-xl)] border border-line bg-surface shadow-[var(--shadow-sm)]"
        loading="lazy"
        allow="clipboard-read; clipboard-write"
      />
      <p className="mt-4 text-center text-sm text-muted">
        Calendar not loading?{" "}
        <a
          href={`${CAL_URL}/${event.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent-text underline underline-offset-4"
        >
          Open it on Cal.com
        </a>
      </p>
    </div>
  );
}
