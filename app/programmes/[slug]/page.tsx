import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseEnquiry } from "@/components/courses/CourseEnquiry";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CourseMobileMenu } from "@/components/layout/CourseMobileMenu";
import { CourseBackLink } from "@/components/layout/CourseBackLink";
import { DirectionalTransition } from "@/components/ui/DirectionalTransition";
import { courses, getCourseBySlug } from "@/features/courses/data";
import { ViewTransition } from "react";

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <DirectionalTransition>
    <main className="course-page" id="course-top">
      <nav className="course-nav"><Link href="/" className="brand" transitionTypes={["nav-back"]}>PASCAL<span>X</span></Link><CourseBackLink /><CourseMobileMenu /></nav>
      <section className="course-hero">
        <div className="course-hero-media"><ViewTransition name={`programme-image-${course.slug}`} share="morph" default="none"><Image src={course.image} alt="" fill priority sizes="100vw" /></ViewTransition></div>
        <div className="course-hero-scrim" />
        <div className="course-hero-content"><h1>{course.title}</h1><p>{course.overview}</p></div>
      </section>
      <section className="course-detail-grid">
        <div className="course-detail-content">
          <div className="course-detail-intro"><p className="eyebrow"><i /> Programme overview</p><h2>Learn the process.<br /><em>Prove the work.</em></h2><p>This live programme is designed around practical decisions: what to investigate, how to validate it safely, and how to communicate what matters.</p></div>
          <div className="course-detail-block"><p className="eyebrow"><i /> Curriculum</p><ol className="course-module-list">{course.modules.map((module, index) => <li key={module}><b>{String(index + 1).padStart(2, "0")}</b><span>{module}</span></li>)}</ol></div>
          <div className="course-detail-columns"><div><p className="eyebrow"><i /> You will practise</p><ul>{course.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div><div><p className="eyebrow"><i /> Delivery</p><ul>{course.format.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
          <a className="course-brochure" href={course.brochureHref} target="_blank" rel="noreferrer">View brochure <span aria-hidden="true">↗</span></a>
        </div>
        <CourseEnquiry course={course} />
      </section>
    </main>
    <SiteFooter backToTopHref="#course-top" />
    </DirectionalTransition>
  );
}
