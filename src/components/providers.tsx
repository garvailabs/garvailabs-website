"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Framer defaults. Honors prefers-reduced-motion.
 *
 * The old first-visit logo intro was removed: it mounted after the page had
 * already painted, then covered it and locked scrolling for ~4 s.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
