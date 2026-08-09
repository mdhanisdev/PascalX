"use client";

import { useEffect, useState } from "react";

export function TextLoop({ items }: { items: string[] }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % items.length), 2600);
    return () => window.clearInterval(timer);
  }, [items.length]);
  return <span className="text-loop" aria-live="polite"><span key={items[active]}>{items[active]}</span></span>;
}
