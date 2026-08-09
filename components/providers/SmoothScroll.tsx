"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __pascalxLenis?: Lenis;
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      allowNestedScroll: true,
    });
    window.__pascalxLenis = lenis;

    return () => {
      delete window.__pascalxLenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
