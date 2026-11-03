"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { ArrowRight, Check, Pause, Play } from "lucide-react";
import { easeOut } from "@/lib/motion";

/**
 * Hero animation: one job done end to end — a tray of seed photographed,
 * scanned, segmented and graded on-device. It illustrates the workflow from
 * the seed-grading case study; the per-tray counts are illustrative, the
 * case study holds the real results.
 */

type Grade = "A" | "B" | "R";

// Deterministic layout so server and client render the same tray.
function rand(seed: number) {
  const x = Math.sin(seed * 999.13) * 43758.5453;
  return x - Math.floor(x);
}

// Math.sin differs in the last digits between Node and browsers; rounding
// keeps the server-rendered attributes identical to the client's.
const r1 = (n: number) => Math.round(n * 10) / 10;

const REJECT = new Set([3, 9, 14, 20]);
const GRADE_B = new Set([1, 7, 12, 17, 22]);

const seeds = Array.from({ length: 24 }, (_, i) => {
  const col = i % 6;
  const row = Math.floor(i / 6);
  const grade: Grade = REJECT.has(i) ? "R" : GRADE_B.has(i) ? "B" : "A";
  const scale = grade === "R" ? 0.72 : grade === "B" ? 0.86 : 1;
  return {
    i,
    grade,
    cx: r1(30 + col * 48 + (rand(i) - 0.5) * 14),
    cy: r1(34 + row * 52 + (rand(i + 40) - 0.5) * 14),
    rx: r1((14 + rand(i + 80) * 3) * scale),
    ry: r1((8.5 + rand(i + 120) * 1.5) * scale),
    rot: Math.round((rand(i + 160) - 0.5) * 120),
  };
});

const counts = {
  A: seeds.filter((s) => s.grade === "A").length,
  B: seeds.filter((s) => s.grade === "B").length,
  R: seeds.filter((s) => s.grade === "R").length,
};

const steps = [
  "Photo captured",
  `${seeds.length} seeds segmented`,
  "Classified on size, shape, texture",
  "Grade written to audit trail",
];

// Phase timeline in ms: capture → scan → segment → graded → hold, then loop.
const timeline = [900, 1900, 1100, 3600];

export function GradingDemo() {
  const reduce = useReducedMotionSafe();
  const [phase, setPhase] = useState(reduce ? 3 : 0);
  const [inView, setInView] = useState(false);
  // WCAG 2.2.2: auto-playing motion that lasts over 5 s needs a pause control.
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) {
      setPhase(3);
      return;
    }
    if (!inView || paused) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % 4), timeline[phase]);
    return () => clearTimeout(t);
  }, [phase, inView, reduce, paused]);

  const segmented = phase >= 2;
  const graded = phase >= 3;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-lg)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        {/* div, not p (the base rule forces overflow:visible on p, which defeats
            truncate), and min-w-0 so the flex item may shrink below its text width.
            The suffix drops on small phones so the label rarely needs cutting. */}
        <div className="label-mono min-w-0 flex-1 truncate text-muted">
          seed-grading<span className="hidden sm:inline"> · on-device</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="label-mono inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-text">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3fa45b]" aria-hidden="true" />
            Offline
          </span>
          {!reduce && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label="Pause demo animation"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-text"
            >
              {paused ? (
                <Play size={13} strokeWidth={2.2} aria-hidden="true" />
              ) : (
                <Pause size={13} strokeWidth={2.2} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[1.2fr_0.8fr] sm:gap-5 sm:p-5">
        {/* tray */}
        <div className="relative overflow-hidden rounded-card bg-[#2a2420]">
          <svg
            viewBox="0 0 300 225"
            className="block h-auto w-full"
            role="img"
            aria-label={`A tray of ${seeds.length} seeds, segmented and graded: ${counts.A} grade A, ${counts.B} grade B, ${counts.R} rejected.`}
          >
            <defs>
              <radialGradient id="seed-good" cx="35%" cy="35%" r="75%">
                <stop offset="0%" stopColor="#e6c899" />
                <stop offset="100%" stopColor="#a47b48" />
              </radialGradient>
              <radialGradient id="seed-bad" cx="35%" cy="35%" r="75%">
                <stop offset="0%" stopColor="#7c6040" />
                <stop offset="100%" stopColor="#47331f" />
              </radialGradient>
            </defs>

            {seeds.map((s) => (
              <g key={s.i} transform={`rotate(${s.rot} ${s.cx} ${s.cy})`}>
                <ellipse
                  cx={s.cx}
                  cy={s.cy}
                  rx={s.rx}
                  ry={s.ry}
                  fill={s.grade === "R" ? "url(#seed-bad)" : "url(#seed-good)"}
                />
                <motion.ellipse
                  cx={s.cx}
                  cy={s.cy}
                  rx={s.rx + 3}
                  ry={s.ry + 3}
                  fill="none"
                  strokeWidth={s.grade === "R" ? 1.6 : 1}
                  stroke={
                    s.grade === "R"
                      ? "#ee6352"
                      : graded && s.grade === "B"
                        ? "rgba(246,244,242,0.45)"
                        : "rgba(127,209,139,0.75)"
                  }
                  initial={false}
                  animate={{ opacity: segmented ? 1 : 0 }}
                  transition={{
                    duration: 0.3,
                    delay: segmented && phase === 2 ? s.i * 0.025 : 0,
                    ease: easeOut,
                  }}
                />
              </g>
            ))}
          </svg>

          {/* scan line */}
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 h-16"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(238,99,82,0.16) 70%, rgba(238,99,82,0.85) 98%, transparent)",
              }}
              initial={false}
              animate={
                phase === 1
                  ? { top: ["-20%", "100%"], opacity: 1 }
                  : { top: "-20%", opacity: 0 }
              }
              transition={phase === 1 ? { duration: 1.8, ease: "linear" } : { duration: 0.2 }}
            />
          )}

          <span className="label-mono absolute bottom-2.5 left-2.5 rounded-full bg-black/45 px-2 py-0.5 text-dark-text backdrop-blur-sm">
            {phase === 0 ? "capturing" : phase === 1 ? "scanning" : phase === 2 ? "segmenting" : "graded"}
          </span>
        </div>

        {/* readout */}
        <div className="flex min-w-0 flex-col">
          <ol className="flex flex-col gap-2.5">
            {steps.map((label, i) => {
              const done = phase > i || graded;
              return (
                <li key={label} className="flex items-center gap-2.5 text-sm">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      done ? "border-transparent bg-accent text-on-accent" : "border-line-strong text-transparent"
                    }`}
                  >
                    <Check size={11} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span
                    className={`transition-colors duration-300 ${done ? "text-text" : "text-muted"}`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>

          <ul aria-label="Grade counts" className="mt-5 flex flex-col gap-3 border-t border-line pt-4">
            {(
              [
                ["Grade A", counts.A, "bg-[#3fa45b]"],
                ["Grade B", counts.B, "bg-muted/50"],
                ["Rejected", counts.R, "bg-accent"],
              ] as const
            ).map(([label, n, bar]) => (
              <li key={label}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-muted">{label}</span>
                  <span className="label-mono text-text">{graded ? n : "—"}</span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
                  <motion.div
                    className={`h-full rounded-full ${bar}`}
                    initial={false}
                    animate={{ width: graded ? `${(n / seeds.length) * 100}%` : "0%" }}
                    transition={{ duration: 0.6, ease: easeOut }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        href="/work/seed-grading-ai"
        className="group flex min-h-11 items-center justify-between gap-3 border-t border-line px-4 py-3 text-sm text-muted transition-colors hover:text-text sm:px-5"
      >
        <span>Illustration of our seed-grading system — 60%+ less grading time in the field</span>
        <ArrowRight size={14} aria-hidden="true" className="arrow-nudge shrink-0" />
      </Link>
    </div>
  );
}
