"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 850);
    const removeTimer = window.setTimeout(() => setIsVisible(false), 1350);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`site-preloader${isLeaving ? " is-leaving" : ""}`} role="status" aria-label="Loading PascalX">
      <div className="site-preloader-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="site-preloader-wordmark">PASCALX</div>
      <div className="site-preloader-status">Initializing secure learning environment</div>
    </div>
  );
}
