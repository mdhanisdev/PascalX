"use client";

import { CSSProperties, useEffect, useRef } from "react";

type Effect = "blur-up" | "glide" | "sharpen";

export function ScrollRevealText({ words, breakAfter = [], accentFrom = -1, effect = "blur-up" }: { words: string[]; breakAfter?: number[]; accentFrom?: number; effect?: Effect }) {
  const revealRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const target = revealRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { target.classList.add("is-visible"); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return <span ref={revealRef} className={`scroll-reveal-text effect-${effect}`}>{words.map((word, index) => <span key={`${word}-${index}`} className={index >= accentFrom ? "accent" : ""} style={{ "--word-index": index } as CSSProperties}>{word}{breakAfter.includes(index) && <br />}</span>)}</span>;
}
