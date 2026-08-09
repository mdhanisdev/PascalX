"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Course = {
  code: string;
  title: string;
  level: string;
  duration: string;
  price: string;
  overview: string;
  modules: string[];
};

const courses: Course[] = [
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
];

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [paymentState, setPaymentState] = useState<"form" | "processing" | "success">("form");
  const [authMode, setAuthMode] = useState<"signin" | "signup" | null>(null);
  const [authSubmitted, setAuthSubmitted] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCourse(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

  function beginCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPaymentState("processing");
    window.setTimeout(() => setPaymentState("success"), 1250);
  }

  function closeModal() {
    setSelectedCourse(null);
    setPaymentState("form");
  }

  return (
    <main>
      <nav className="nav">
        <div className="nav-inner"><a className="brand" href="#top" aria-label="PascalX home">PASCAL<span>X</span></a><div className="nav-links"><a href="#programs">Programs</a><a href="#method">Method</a><a href="#contact">Contact</a></div><div className="nav-right"><div className="nav-auth"><button className="nav-login" onClick={() => { setAuthMode("signin"); setAuthSubmitted(false); setAuthLoading(false); }}>Sign in</button><button className="nav-signup" onClick={() => { setAuthMode("signup"); setAuthSubmitted(false); setAuthLoading(false); }}>Sign up <Arrow /></button></div></div></div>
      </nav>

      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-sticky">
          <video className="hero-video" autoPlay muted loop playsInline preload="metadata">
            <source src="/media/signal-grid.mp4" type="video/mp4" />
          </video>
          <div className="scanlines" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow"><i /> Live cyber education · cohort 01</p>
            <h1>Learn to think<br /><em>like the threat.</em></h1>
            <p className="hero-description">Live, practical cybersecurity training for people who want more than passive lessons.</p>
          </div>
          <div className="hero-bottom"><span>SCROLL TO ENTER</span><span className="scroll-mark">↓</span><span>01—04</span></div>
        </div>
      </section>

      <section className="manifesto" id="method" data-reveal>
        <p className="eyebrow dark"><i /> The PascalX method</p>
        <div className="manifesto-grid">
          <h2>Security is not a chapter.<br />It is a <em>way of seeing.</em></h2>
          <div className="manifesto-copy"><p>We turn curious learners into methodical defenders through guided labs, live instruction, and the habits real security work requires.</p><a href="#programs" className="text-link">See the programmes <Arrow /></a></div>
        </div>
        <div className="signal-row"><span>LIVE INSTRUCTION</span><span>REAL-WORLD LABS</span><span>SMALL COHORTS</span><span>MENTOR DELIVERY</span></div>
      </section>

      <section className="video-break" aria-label="Students learning cybersecurity">
        <video autoPlay muted loop playsInline preload="metadata"><source src="/media/classroom.mp4" type="video/mp4" /></video>
        <div className="video-break-copy"><span>THE LAB IS OPEN</span><strong>Observe. Test. Defend.</strong></div>
      </section>

      <section className="field-notes" data-reveal>
        <div className="field-heading"><div><p className="eyebrow"><i /> Intelligence, applied</p><span className="field-caption">A LIVE LEARNING CONTROL ROOM</span></div><h2>Built around<br /><em>the work itself.</em></h2></div>
        <div className="field-board">
          <article className="note-card live-card"><div className="note-top"><span className="board-marker">[01]</span><span>LIVE / ACTIVE</span></div><div className="note-visual" aria-hidden="true"><i /><i /><i /></div><h3>Live practice</h3><p>See how a tutor approaches a problem, then attempt it in a safe lab of your own.</p><b>GUIDED LABS <Arrow /></b></article>
          <article className="note-card cohort-card"><div className="note-top"><span className="board-marker">[02]</span><span>DIRECT / ACCESS</span></div><div className="note-visual" aria-hidden="true"><i /><i /><i /></div><h3>Small cohorts</h3><p>Ask the question. Share your screen. Get an answer while the learning is still happening.</p><b>DIRECT ACCESS <Arrow /></b></article>
          <article className="note-card work-card"><div className="note-top"><span className="board-marker">[03]</span><span>BUILD / PROVE</span></div><div className="note-visual" aria-hidden="true"><i /><i /><i /></div><h3>Defensible work</h3><p>Build a portfolio of reports, notes, and workflows that show how you think under pressure.</p><b>PROOF OF PRACTICE <Arrow /></b></article>
        </div>
      </section>

      <section className="programs" id="programs" data-reveal>
        <div className="section-top"><p className="eyebrow"><i /> Select your discipline</p><span>03 PRACTICAL PROGRAMS</span></div>
        <h2>Find your <em>attack surface.</em></h2>
        <div className="course-list">
          {courses.map((course, index) => (
            <button className="course" key={course.code} onClick={() => { setPaymentState("form"); setSelectedCourse(course); }}>
              <span className="course-index">0{index + 1}</span>
              <span className="course-title"><small>{course.code}</small>{course.title}</span>
              <span className="course-meta">{course.level}<br />{course.duration}</span>
              <span className="course-price">{course.price}<Arrow /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="protocol" data-reveal>
        <p className="eyebrow"><i /> After enrolment</p>
        <div className="protocol-grid"><h2>Your seat is<br /><em>personally confirmed.</em></h2><p>Once your payment is successful, your tutor contacts you directly on WhatsApp with onboarding details and your daily Google Meet link. No portal maze. No automated handoff.</p></div>
        <div className="steps"><div><b>01</b><h3>Choose a programme</h3><p>Open any course for its curriculum and seat details.</p></div><div><b>02</b><h3>Secure your seat</h3><p>Complete payment through the course checkout.</p></div><div><b>03</b><h3>Meet your tutor</h3><p>Receive your Google Meet schedule directly on WhatsApp.</p></div></div>
      </section>

      <footer id="contact">
        <div className="footer-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="footer-top"><p className="eyebrow"><i /> NEXT COHORT · LIVE ONLINE</p><span className="footer-signal">● SEATS OPEN</span></div>
        <div className="footer-cta"><h2>Make your<br /><em>next move.</em></h2><div><p>Choose a programme and reserve your live learning seat. Your tutor confirms the next steps personally on WhatsApp.</p><a href="#programs" className="footer-button">Explore programmes <Arrow /></a></div></div>
        <div className="footer-bottom"><div className="footer-brand">PASCAL<span>X</span></div><div className="footer-links"><a href="#programs">Programmes</a><a href="#method">Learning method</a><a href="#top">Back to top ↑</a></div><div className="footer-meta">© 2026 PASCALX<br />CYBERSECURITY LEARNING<br /><br />LEARN WITH PERMISSION.<br />PRACTISE WITH PURPOSE.</div></div>
      </footer>

      {authMode && <div className="modal-backdrop" role="presentation" onMouseDown={() => setAuthMode(null)}>
        <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" onMouseDown={(event) => event.stopPropagation()}>
          <button className="close" onClick={() => setAuthMode(null)} aria-label="Close authentication dialog">×</button>
          {authSubmitted ? <div className="auth-complete"><div className="auth-identity-mark"><span>✓</span><i>ACCESS REQUESTED</i></div><p className="eyebrow"><i /> Demo account ready</p><h2>You&apos;re on<br /><em>the list.</em></h2><p>This is a frontend preview. Connect Auth.js later to make account creation and sign-in live.</p><button className="solid-button" onClick={() => setAuthMode(null)}>Continue exploring <Arrow /></button></div> : <><div className="auth-identity-mark"><span>PX</span><i>SECURE LEARNING NODE / 01</i></div><p className="eyebrow"><i /> PascalX learner access</p><h2 id="auth-title">{authMode === "signin" ? <>Welcome<br /><em>back.</em></> : <>Start your<br /><em>practice.</em></>}</h2><form className="auth-form" onSubmit={(event) => { event.preventDefault(); setAuthLoading(true); window.setTimeout(() => { setAuthLoading(false); setAuthSubmitted(true); }, 1100); }}><label>Email address<input required type="email" placeholder="you@email.com" /></label>{authMode === "signup" && <label>Your name<input required placeholder="Full name" /></label>}<label>Password<input required type="password" placeholder="••••••••" /></label><button className="solid-button" type="submit" disabled={authLoading}>{authLoading ? <><span className="auth-spinner" /> Securing your access…</> : <>{authMode === "signin" ? "Sign in" : "Create account"} <Arrow /></>}</button></form><p className="auth-switch">{authMode === "signin" ? "New to PascalX?" : "Already learning with us?"} <button onClick={() => { setAuthMode(authMode === "signin" ? "signup" : "signin"); setAuthSubmitted(false); setAuthLoading(false); }}>{authMode === "signin" ? "Create an account" : "Sign in"}</button></p></>}
        </section>
      </div>}

      {selectedCourse && <div className="modal-backdrop" role="presentation" onMouseDown={closeModal}>
        <section className="modal" role="dialog" aria-modal="true" aria-labelledby="course-title" onMouseDown={(event) => event.stopPropagation()}>
          <button className="close" onClick={closeModal} aria-label="Close course details">×</button>
          {paymentState === "success" ? <div className="success"><span>✓</span><p className="eyebrow"><i /> Payment received</p><h2>Welcome to<br /><em>{selectedCourse.title}.</em></h2><p>Your tutor will contact you on WhatsApp with onboarding and your live Google Meet schedule.</p><button className="solid-button" onClick={closeModal}>Done <Arrow /></button></div> : <><div className="modal-course"><p className="eyebrow"><i /> {selectedCourse.code} · {selectedCourse.duration}</p><h2 id="course-title">{selectedCourse.title}</h2><p>{selectedCourse.overview}</p><div className="module-list">{selectedCourse.modules.map((module, index) => <span key={module}><b>0{index + 1}</b>{module}</span>)}</div></div><form className="checkout" onSubmit={beginCheckout}><p>Reserve your live seat</p><strong>{selectedCourse.price}</strong><label>Full name<input required placeholder="Your name" /></label><label>WhatsApp number<input required type="tel" placeholder="+91 00000 00000" /></label><label>Email address<input required type="email" placeholder="you@email.com" /></label><button className="solid-button" type="submit" disabled={paymentState === "processing"}>{paymentState === "processing" ? "Processing secure payment…" : <>Continue to payment <Arrow /></>}</button><small>Demo checkout — connect Razorpay or Stripe before accepting live payments.</small></form></>}
        </section>
      </div>}
    </main>
  );
}
