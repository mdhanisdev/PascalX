"use client";

import Image from "next/image";
import { MouseEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { DirectionalTransition } from "@/components/ui/DirectionalTransition";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { TextLoop } from "@/components/ui/TextLoop";
import { Preloader } from "@/components/ui/Preloader";
import { ProgrammeCarousel } from "@/components/courses/ProgrammeCarousel";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { courses as featureCourses } from "@/features/courses/data";

/* const legacyCourses: Course[] = [
  {
    code: "PX/01",
    title: "Ethical Hacking Foundations",
    level: "Beginner → Intermediate",
    duration: "8 weeks · Live",
    price: "₹4,999",
    overview: "Build the attacker mindset safely. Learn reconnaissance, web security, Linux, networking, and how to write a useful vulnerability report.",
    modules: ["Linux & network essentials", "Reconnaissance and OSINT", "Web application testing", "Reporting & responsible disclosure"],
  },
  {
    code: "PX/02",
    title: "Web Application Security",
    level: "Intermediate",
    duration: "6 weeks · Live",
    price: "₹6,499",
    overview: "A practical lab-led programme for finding and fixing common web application weaknesses before they reach production.",
    modules: ["OWASP Top 10", "Burp Suite workflows", "API security testing", "Secure remediation reviews"],
  },
  {
    code: "PX/03",
    title: "SOC Analyst Launchpad",
    level: "Beginner → Job ready",
    duration: "10 weeks · Live",
    price: "₹7,999",
    overview: "Learn the daily operating rhythm of a security operations centre: alerts, triage, investigation, escalation, and incident thinking.",
    modules: ["SIEM fundamentals", "Alert triage", "Threat hunting", "Incident response playbooks"],
  },
]; */

import { faqs } from "@/features/faq/data";

const courses = featureCourses;
const upcomingProgrammes = [
  { code: "PX/04", title: "Cloud Security Essentials", detail: "Identity, cloud posture, and practical hardening workflows.", image: "/course-images/cloud-security.webp" },
  { code: "PX/05", title: "Threat Intelligence Lab", detail: "Turn open-source signals into useful defensive decisions.", image: "/course-images/threat-landscape.png" },
  { code: "PX/06", title: "Incident Response Practice", detail: "Contain, investigate, and communicate through realistic scenarios.", image: "/course-images/ethical-hacking.jpg" },
];

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export default function Home() {
  const [contactSent, setContactSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [skipPreloader] = useState(() => typeof window !== "undefined" && window.sessionStorage.getItem("pascalx-skip-preloader") === "true");
  const [pageReady, setPageReady] = useState(skipPreloader);
  const handlePreloaderComplete = useCallback(() => setPageReady(true), []);
  const heroRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollYRef.current;
      if (!window.matchMedia("(max-width: 720px)").matches) {
        setNavHidden(false);
      } else if (current < 20) {
        setNavHidden(false);
      } else if (Math.abs(delta) > 6) {
        setNavHidden(delta > 0);
      }
      lastScrollYRef.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    if (!skipPreloader) return;

    const target = window.sessionStorage.getItem("pascalx-scroll-target") ?? window.location.hash.slice(1);
    if (!target) return;

    const section = document.getElementById(target);
    if (!section) return;

    window.sessionStorage.removeItem("pascalx-scroll-target");
    const lenis = window.__pascalxLenis;
    if (lenis) {
      lenis.scrollTo(section, { offset: -80, immediate: true, force: true });
      return;
    }

    window.scrollTo({ top: Math.max(section.getBoundingClientRect().top + window.scrollY - 80, 0), behavior: "instant" });
  }, [skipPreloader]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    window.sessionStorage.removeItem("pascalx-skip-preloader");

    const target = window.sessionStorage.getItem("pascalx-scroll-target") ?? window.location.hash.slice(1);
    if (!target || skipPreloader) return;

    window.sessionStorage.removeItem("pascalx-scroll-target");
    const section = document.getElementById(target);
    if (!section) return;

    const frame = window.requestAnimationFrame(() => {
      const lenis = window.__pascalxLenis;
      if (lenis) {
        lenis.scrollTo(section, { offset: target === "top" ? 0 : -80, duration: 1.15 });
        return;
      }
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [skipPreloader]);

  useEffect(() => {
    const updateHero = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const travel = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      hero.style.setProperty("--hero-progress", progress.toFixed(4));
    };
    updateHero();
    window.addEventListener("scroll", updateHero, { passive: true });
    window.addEventListener("resize", updateHero);
    return () => {
      window.removeEventListener("scroll", updateHero);
      window.removeEventListener("resize", updateHero);
    };
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  /* function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedCourse) return;

    const formData = new FormData(event.currentTarget);
    const learnerName = String(formData.get("name") ?? "");
    const message = [
      "*PASCALX | COURSE ENQUIRY*",
      "",
      "*Programme*",
      `${selectedCourse.title} (${selectedCourse.code})`,
      "",
      "*Learner details*",
      `Name: ${learnerName}`,
      `WhatsApp: ${formData.get("whatsapp")}`,
      `Email: ${formData.get("email")}`,
      "",
      "Hello, I am interested in this programme. Please share the next steps, including availability, onboarding information, and the learning schedule.",
      "",
      `Thank you,\n${learnerName}`,
    ].join("\n");

    window.open(`https://wa.me/918150983477?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setEnquiryState("success");
  }

  function closeModal() {
    setSelectedCourse(null);
    setEnquiryState("form");
  } */

  function smoothNavigate(event: MouseEvent<HTMLAnchorElement>, target: string) {
    event.preventDefault();
    setMobileNavOpen(false);
    const section = document.getElementById(target.slice(1));
    if (!section) return;

    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    const lenis = window.__pascalxLenis;
    if (lenis) {
      lenis.scrollTo(section, { offset: -80, duration: 1.15 });
      return;
    }
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const programsSection = (
    <section className="programs" id="programs" data-reveal>
      <div className="section-top" data-reveal-item><p className="eyebrow"><i /> Select your discipline</p></div>
      <h2 data-reveal-item><ScrollRevealText words={["Find", "your", "attack", "surface."]} breakAfter={[1]} accentFrom={2} effect="sharpen" /></h2>
      <div data-reveal-item><ProgrammeCarousel courses={courses} /></div>
    </section>
  );

  return (
    <>
      {!skipPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <DirectionalTransition><main className={`min-h-screen page-transition${pageReady ? " is-ready" : ""}`}>
      <nav className={`nav${navHidden && !mobileNavOpen ? " nav-hidden" : ""}`}>
        <div className="nav-inner"><a className="brand" href="/" onClick={(event) => smoothNavigate(event, "#top")} aria-label="PascalX home">PASCAL<span>X</span></a><div className="nav-links"><a href="/" onClick={(event) => smoothNavigate(event, "#method")}>Approach</a><a href="/" onClick={(event) => smoothNavigate(event, "#learning")}>Learning model</a><a href="/" onClick={(event) => smoothNavigate(event, "#upcoming")}>Upcoming</a><a href="/" onClick={(event) => smoothNavigate(event, "#contact")}>Contact</a></div><a className="nav-cta" href="/" onClick={(event) => smoothNavigate(event, "#programs")}>Explore programmes <Arrow /></a><button className={`mobile-nav-toggle${mobileNavOpen ? " is-open" : ""}`} type="button" aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileNavOpen} aria-controls="mobile-navigation" onClick={() => setMobileNavOpen((open) => !open)}><span /><span /><span /></button></div>
        <div className={`mobile-nav-panel${mobileNavOpen ? " is-open" : ""}`} id="mobile-navigation"><a href="/" onClick={(event) => smoothNavigate(event, "#method")}>Approach</a><a href="/" onClick={(event) => smoothNavigate(event, "#learning")}>Learning model</a><a href="/" onClick={(event) => smoothNavigate(event, "#upcoming")}>Upcoming programmes</a><a href="/" onClick={(event) => smoothNavigate(event, "#contact")}>Contact PascalX</a><a className="mobile-nav-primary" href="/" onClick={(event) => smoothNavigate(event, "#programs")}>Explore programmes <Arrow /></a></div>
      </nav>

      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-sticky">
          <video className="hero-video" autoPlay muted loop playsInline preload="metadata">
            <source src="/media/signal-grid.mp4" type="video/mp4" />
          </video>
          <div className="scanlines" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow"><i /> Live cyber education · cohort</p>
            <h1><span className="hero-title-leading">Learn to think</span><em><TextLoop items={["like the threat.", "through evidence.", "under pressure.", "one step ahead."]} /></em></h1>
            <p className="hero-description">Live, practical cybersecurity training for people who want more than passive lessons.</p>
          </div>
          <div className="hero-bottom"><span className="scroll-mark">↓</span></div>
        </div>
      </section>

      <section className="manifesto" id="method" data-reveal>
        <p className="eyebrow dark"><i /> The PascalX method</p>
        <div className="manifesto-grid" data-reveal-item>
          <h2><ScrollRevealText words={["Security", "is", "not", "a", "chapter.", "It", "is", "a", "way", "of", "seeing."]} breakAfter={[4]} accentFrom={8} /></h2>
          <div className="manifesto-copy"><p>We turn curious learners into methodical defenders through guided labs, live instruction, and the habits real security work requires.</p><a href="#programs" className="text-link" onClick={(event) => smoothNavigate(event, "#programs")}>See the programmes <Arrow /></a></div>
        </div>
        <div className="signal-row" data-reveal-item><span>LIVE INSTRUCTION</span><span>REAL-WORLD LABS</span><span>SMALL COHORTS</span><span>MENTOR DELIVERY</span></div>
      </section>

      <section className="video-break" aria-label="Students learning cybersecurity">
        <video autoPlay muted loop playsInline preload="metadata"><source src="/media/classroom.mp4" type="video/mp4" /></video>
        <div className="video-break-copy"><span>THE LAB IS OPEN</span><strong>Observe. Test. Defend.</strong></div>
      </section>

      {programsSection}

      <section className="training-bridge" data-reveal aria-labelledby="training-bridge-heading">
        <p className="eyebrow" data-reveal-item><i /> Beyond the lesson</p>
        <div className="training-bridge-grid" data-reveal-item>
          <h2 id="training-bridge-heading">Learn the method.<br /><em>Make it yours.</em></h2>
          <div className="training-bridge-copy"><p>Good security work is a sequence of calm decisions. Each programme gives you a repeatable way to investigate a problem, validate what matters, and explain the next action clearly.</p><p className="training-bridge-note">You leave with more than notes: you leave with a workflow you can use again.</p></div>
        </div>
        <ol className="practice-path" data-reveal-item aria-label="The PascalX practice loop">
          <li><span className="practice-step">01 / RECOGNISE</span><h3>Read the surface.</h3><p>Break down a target, alert, or system into the signals worth investigating. Learn to separate useful evidence from background noise.</p></li>
          <li><span className="practice-step">02 / TEST</span><h3>Follow the evidence.</h3><p>Use guided labs to form a hypothesis, test it safely, and document each decision so someone else can reproduce your work.</p></li>
          <li><span className="practice-step">03 / REPORT</span><h3>Make the finding useful.</h3><p>Turn technical observations into a clear handoff: what happened, why it matters, and what should happen next.</p></li>
        </ol>
        <div className="training-bridge-status" data-reveal-item><span>THE PRACTICE LOOP</span><i aria-hidden="true" /><span>OBSERVE</span><span>VALIDATE</span><span>COMMUNICATE</span></div>
      </section>

      <section className="field-notes" id="learning" data-reveal>
        <div className="field-heading" data-reveal-item><div><p className="eyebrow"><i /> Intelligence, applied</p><span className="field-caption">A LIVE LEARNING CONTROL ROOM</span></div><div className="field-index">FIELD NOTE<br /><b>THREE WAYS TO TRAIN</b></div></div>
        <div className="field-layout" data-reveal-item>
          <aside className="field-brief"><div className="brief-number">03</div><p className="brief-kicker">WAYS OF WORKING</p><p>Learn through the same habits that make a calm defender useful: observe closely, ask better questions, and leave evidence behind.</p><div className="brief-rule"><span>COHORT SIGNAL</span><b>ON / 24—7</b></div><div className="brief-rail" aria-hidden="true"><i /><i /><i /><i /><i /></div></aside>
          <div className="field-board">
            <article className="note-row live-card"><div className="note-row-index">01</div><div className="note-row-copy"><div className="note-top"><span>LIVE / ACTIVE</span><span>GUIDED LABS</span></div><h3>Live practice</h3><p>See how a tutor approaches a problem, then attempt it in a safe lab of your own.</p></div></article>
            <article className="note-row cohort-card"><div className="note-row-index">02</div><div className="note-row-copy"><div className="note-top"><span>DIRECT / ACCESS</span><span>DIRECT ACCESS</span></div><h3>Small cohorts</h3><p>Ask the question. Share your screen. Get an answer while the learning is still happening.</p></div></article>
            <article className="note-row work-card"><div className="note-row-index">03</div><div className="note-row-copy"><div className="note-top"><span>BUILD / PROVE</span><span>PROOF OF PRACTICE</span></div><h3>Defensible work</h3><p>Build a portfolio of reports, notes, and workflows that show how you think under pressure.</p></div></article>
          </div>
        </div>
      </section>

      <section className="protocol" data-reveal>
        <p className="eyebrow"><i /> After your enquiry</p>
        <div className="protocol-grid" data-reveal-item><h2><ScrollRevealText words={["Your", "next", "step", "is", "personal."]} breakAfter={[2]} accentFrom={3} effect="sharpen" /></h2><p>Send your course enquiry on WhatsApp, and your tutor will follow up directly with availability, onboarding details, and your Google Meet schedule. No portal maze. No automated handoff.</p></div>
        <div className="steps" data-reveal-item><div><b>01</b><h3>Choose a programme</h3><p>Open either course to review its curriculum and fee.</p></div><div><b>02</b><h3>Send your enquiry</h3><p>Share your name, WhatsApp number, and email in the prefilled WhatsApp message.</p></div><div><b>03</b><h3>Hear from your tutor</h3><p>Receive the next steps and your schedule directly on WhatsApp.</p></div></div>
      </section>

      <section className="upcoming-programmes" id="upcoming" data-reveal aria-labelledby="upcoming-programmes-heading">
        <div className="upcoming-programmes-heading" data-reveal-item><p className="eyebrow"><i /> On the horizon</p><h2 id="upcoming-programmes-heading">Upcoming<br /><em>programmes.</em></h2></div>
        <div className="upcoming-programmes-grid" data-reveal-item>
          {upcomingProgrammes.map((programme) => <article className="upcoming-programme-card" key={programme.code}>
            <div className="upcoming-programme-image"><Image src={programme.image} alt="" fill sizes="(max-width: 720px) 88vw, 30vw" /></div>
            <div className="upcoming-programme-copy"><span>{programme.code} / UPCOMING</span><h3>{programme.title}</h3><p>{programme.detail}</p><b>Coming soon</b></div>
          </article>)}
        </div>
      </section>

      <section className="faq-section" id="faq" data-reveal aria-labelledby="faq-heading">
        <div className="faq-heading"><p className="eyebrow"><i /> Common questions</p><h2 id="faq-heading">Know before<br /><em>you begin.</em></h2></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item${openFaq === index ? " is-open" : ""}`} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><i aria-hidden="true">+</i></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div>
      </section>

      <SiteFooter />
      <footer id="legacy-contact" hidden>
        <div className="footer-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="footer-top"><p className="eyebrow"><i /> NEXT COHORT · LIVE ONLINE</p><span className="footer-signal">● SEATS OPEN</span></div>
        <div className="footer-cta"><h2>Make your<br /><em>next move.</em></h2><div><p>Choose a programme and reserve your live learning seat. Your tutor confirms the next steps personally on WhatsApp.</p><a href="#programs" className="footer-button">Explore programmes <Arrow /></a></div></div>
        <div className="footer-contact"><div><p className="eyebrow"><i /> Contact PascalX</p><h3>Have a question<br />before you start?</h3></div>{contactSent ? <div className="footer-contact-success"><span>âœ“</span><strong>Message received.</strong><p>This demo form is ready to connect to your contact workflow.</p><button type="button" onClick={() => setContactSent(false)}>Send another message</button></div> : <form className="footer-contact-form" onSubmit={(event) => { event.preventDefault(); setContactSent(true); }}><label>Full name<input required name="name" placeholder="Your name" /></label><label>Email address<input required type="email" name="email" placeholder="you@email.com" /></label><label>Message<textarea required name="message" rows={3} placeholder="How can we help?" /></label><button type="submit">Send message <Arrow /></button></form>}</div>
        <div className="footer-bottom"><div className="footer-brand">PASCAL<span>X</span></div><div className="footer-links"><a href="#programs">Programmes</a><a href="#method">Learning method</a><a href="#top">Back to top ↑</a></div><div className="footer-meta">© 2026 PASCALX<br />CYBERSECURITY LEARNING<br /><br />LEARN WITH PERMISSION.<br />PRACTISE WITH PURPOSE.</div></div>
      </footer>

      {/*
        <section className="modal" role="dialog" aria-modal="true" aria-labelledby="course-title" onMouseDown={(event) => event.stopPropagation()}>
          <button className="close" onClick={closeModal} aria-label="Close course details">×</button>
          {enquiryState === "success" ? <div className="success"><span>✓</span><p className="eyebrow"><i /> Enquiry ready</p><h2>Your message is<br /><em>ready to send.</em></h2><p>A prefilled WhatsApp message has opened. Send it to share your details with the tutor, who will contact you with the next steps.</p><button className="solid-button" onClick={closeModal}>Continue exploring <Arrow /></button></div> : <><div className="modal-course"><p className="eyebrow"><i /> {selectedCourse.code} · {selectedCourse.duration}</p><h2 id="course-title">{selectedCourse.title}</h2><p>{selectedCourse.overview}</p><div className="module-list">{selectedCourse.modules.map((module, index) => <span key={module}><b>0{index + 1}</b>{module}</span>)}</div></div><form className="checkout" onSubmit={submitEnquiry}><p>Enquire about this programme</p><strong>{selectedCourse.price}</strong><label>Full name<input required name="name" placeholder="Your name" /></label><label>WhatsApp number<input required name="whatsapp" type="tel" placeholder="+91 00000 00000" /></label><label>Email address<input required name="email" type="email" placeholder="you@email.com" /></label><button className="solid-button" type="submit">Continue on WhatsApp <Arrow /></button><small>No payment is taken here. Your tutor will confirm the next steps on WhatsApp.</small></form></>}
        </section>
      */}
      </main></DirectionalTransition>
    </>
  );
}
