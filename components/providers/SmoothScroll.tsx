"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
