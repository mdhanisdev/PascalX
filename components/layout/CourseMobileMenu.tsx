"use client";

import Link from "next/link";
import { useState } from "react";

export function CourseMobileMenu() {
  const [open, setOpen] = useState(false);
  const goHome = (target: string) => {
    window.sessionStorage.setItem("pascalx-scroll-target", target);
    setOpen(false);
  };

  const scrollToContact = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    const section = document.getElementById("contact");
    if (!section) return;
    window.__pascalxLenis?.scrollTo(section, { offset: -80, duration: 1.15 });
  };

  return (
    <div className="course-mobile-menu">
      <button className={`mobile-nav-toggle${open ? " is-open" : ""}`} type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="course-mobile-navigation" onClick={() => setOpen((current) => !current)}><span /><span /><span /></button>
      <div className={`mobile-nav-panel${open ? " is-open" : ""}`} id="course-mobile-navigation"><Link href="/" onClick={() => goHome("programs")}>All programmes</Link><Link href="/" onClick={() => goHome("method")}>Learning method</Link><Link href="/" onClick={() => goHome("faq")}>Questions & answers</Link><a className="mobile-nav-primary" href="/" onClick={scrollToContact}>Contact PascalX <span className="arrow" aria-hidden="true">↗</span></a></div>
    </div>
  );
}
