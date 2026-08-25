"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Course } from "@/features/courses/data";
import { ViewTransition } from "react";

type ProgrammeCarouselProps = {
  courses: Course[];
};

const slideIntervalMs = 3500;

export function ProgrammeCarousel({ courses }: ProgrammeCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (courses.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % courses.length);
    }, slideIntervalMs);

    return () => window.clearInterval(interval);
  }, [courses.length]);

  const goTo = (index: number) => setActiveIndex((index + courses.length) % courses.length);

  function resetScrollForProgramme() {
    window.__pascalxLenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }

  return (
    <div
      className="programme-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="PascalX live programmes"
    >
      <div className="programme-carousel-window">
        <div className="programme-carousel-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {courses.map((course, index) => (
            <Link className="programme-slide" href={`/programmes/${course.slug}`} key={course.code} aria-hidden={activeIndex !== index} tabIndex={activeIndex === index ? 0 : -1} onNavigate={resetScrollForProgramme} transitionTypes={["nav-forward"]}>
              <ViewTransition name={`programme-image-${course.slug}`} share="morph" default="none"><Image className="programme-slide-image" src={course.image} alt="" fill sizes="(max-width: 720px) 100vw, 85vw" /></ViewTransition>
              <div className="programme-slide-shade" aria-hidden="true" />
              <div className="programme-slide-content">
                <div className="programme-slide-meta"><span>LIVE PROGRAMME</span><span><i className="live-status-dot" aria-hidden="true" />LIVE</span></div>
                <div className="programme-slide-copy">
                  <h3>{course.title}.</h3>
                  <p>{course.overview}</p>
                </div>
                <div className="programme-slide-bottom"><span className="programme-slide-link">View programme <i aria-hidden="true">↗</i></span></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="programme-carousel-controls">
        <div className="programme-carousel-dots" role="tablist" aria-label="Choose a programme">
          {courses.map((course, index) => <button key={course.code} type="button" role="tab" aria-selected={activeIndex === index} aria-label={`Show ${course.title}`} className={activeIndex === index ? "is-active" : ""} onClick={() => goTo(index)}><span /></button>)}
        </div>
        <div className="programme-carousel-arrows"><button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Previous programme">←</button><span>{String(activeIndex + 1).padStart(2, "0")} / {String(courses.length).padStart(2, "0")}</span><button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Next programme">→</button></div>
      </div>
    </div>
  );
}
