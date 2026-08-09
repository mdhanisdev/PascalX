"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(current + (current < 72 ? 4 : 2), 100));
    }, 50);
    const leaveTimer = window.setTimeout(() => {
      setProgress(100);
      setIsLeaving(true);
    }, 1700);
    const removeTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      setIsVisible(false);
    }, 2000);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearInterval(progressTimer);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`site-preloader${isLeaving ? " is-leaving" : ""}`} role="status" aria-label={`Loading PascalX ${progress}%`}>
      <div className="site-preloader-grid" aria-hidden="true" />
      <div className="site-preloader-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="site-preloader-wordmark">PASCALX</div>
      <div className="site-preloader-progress"><strong>{String(progress).padStart(3, "0")}%</strong><span><i style={{ width: `${progress}%` }} /></span></div>
      <div className="site-preloader-status">Establishing secure learning environment</div>
      <div className="site-preloader-corners" aria-hidden="true"><i /><i /><i /><i /></div>
    </div>
  );
}
