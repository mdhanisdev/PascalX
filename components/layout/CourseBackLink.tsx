"use client";

import Link from "next/link";

export function CourseBackLink() {
  return (
    <Link
      href="/"
      scroll={false}
      className="course-back"
      aria-label="Back to all programmes"
      transitionTypes={["nav-back"]}
      onClick={() => {
        window.sessionStorage.setItem("pascalx-scroll-target", "programs");
        window.sessionStorage.setItem("pascalx-skip-preloader", "true");
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 12H5M11 18l-6-6 6-6" />
      </svg>
    </Link>
  );
}
