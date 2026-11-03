"use client";

import { useEffect, useState } from "react";

/**
 * prefers-reduced-motion, safe for SSR.
 *
 * Framer's useReducedMotion reads the media query during the first client
 * render, so for reduced-motion visitors the client's first render differs
 * from the server HTML and hydration fails. This returns false on the first
 * render (matching the server) and the real preference from the first
 * effect on. MotionConfig reducedMotion="user" in providers.tsx already
 * strips transform animations in between, so nothing visibly moves.
 */
export function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduce;
}
