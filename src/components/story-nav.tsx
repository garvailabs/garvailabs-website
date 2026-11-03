"use client";

import { useEffect, useState } from "react";

/** Sticky in-page menu for a case study; highlights the chapter in view. */
export function StoryNav({ chapters }: { chapters: { id: string; label: string }[] }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [chapters]);

  return (
    <nav aria-label="Case study sections" className="sticky top-32">
      <ol className="flex flex-col">
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              aria-current={active === c.id ? "location" : undefined}
              className={`flex min-h-11 items-center gap-4 border-l-2 pl-5 text-base transition-colors duration-200 ${
                active === c.id
                  ? "border-accent text-text"
                  : "border-line text-muted hover:text-text"
              }`}
            >
              <span className="text-xs font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {c.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
