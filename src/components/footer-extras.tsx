"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const timeFmt = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * Current time in Noida. Renders a placeholder on the server and first client
 * render (the clock differs between the two), then ticks once a minute.
 */
export function NoidaTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(timeFmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-dark-line px-3.5 py-1.5 text-sm text-dark-muted">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5fd3a6] opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5fd3a6]" />
      </span>
      <span>
        Noida · <span className="tabular-nums text-dark-text">{now ?? "--:--"}</span> IST
      </span>
    </p>
  );
}

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-dark-line px-4 text-sm text-dark-text transition-colors hover:border-dark-line-strong hover:bg-dark-soft"
    >
      Back to top
      <ArrowUp
        size={15}
        strokeWidth={2}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
