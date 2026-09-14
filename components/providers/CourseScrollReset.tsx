"use client";

import { useLayoutEffect } from "react";

/** Keeps client-side course navigation at the start of the newly opened programme. */
export function CourseScrollReset() {
  useLayoutEffect(() => {
    const lenis = window.__pascalxLenis;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
