"use client";

import Image from "next/image";
import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";

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

const faqs = [
  ["Are the classes live or recorded?", "PascalX programmes are live and tutor-led. You learn through guided practice, ask questions in the moment, and work through real security scenarios with your cohort."],
  ["Do I need prior cybersecurity experience?", "No. Each programme lists its starting level clearly, and the curriculum moves from foundations into practical workflows at a steady pace."],
  ["How do the labs work?", "You receive safe, guided environments to practise reconnaissance, testing, investigation, and reporting without touching systems you do not own."],
  ["What happens after I enrol?", "After the demo checkout is completed, the tutor contacts you on WhatsApp with onboarding details, class timing, and the Google Meet link."],
  ["Can I ask questions before choosing a programme?", "Yes. Use the contact form below and share what you want to learn. We can point you toward the most suitable programme."],
] as const;

const testimonials = [
  ["I stopped watching tutorials and started making decisions.", "Aarav M.", "PX/01 · Foundations"],
  ["The tutor made the difficult parts feel workable. I always knew what to try next.", "Nisha R.", "PX/02 · Web Security"],
  ["The reports I built gave me something concrete to talk about in interviews.", "Daniel K.", "PX/03 · SOC Launchpad"],
] as const;

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function TextLoop({ items }: { items: string[] }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % items.length), 2600);
    return () => window.clearInterval(timer);
  }, [items.length]);
  return <span className="text-loop" aria-live="polite"><span key={items[active]}>{items[active]}</span></span>;
}

function ScrollRevealText({ words, breakAfter = [], accentFrom = -1, effect = "blur-up" }: { words: string[]; breakAfter?: number[]; accentFrom?: number; effect?: "blur-up" | "glide" | "sharpen" }) {
  const revealRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const target = revealRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        target.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return <span ref={revealRef} className={`scroll-reveal-text effect-${effect}`}>{words.map((word, index) => <span key={`${word}-${index}`} className={index >= accentFrom ? "accent" : ""} style={{ "--word-index": index } as CSSProperties}>{word}{breakAfter.includes(index) && <br />}</span>)}</span>;
}

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [paymentState, setPaymentState] = useState<"form" | "processing" | "success">("form");
  const [authMode, setAuthMode] = useState<"signin" | "signup" | null>(null);
  const [authSubmitted, setAuthSubmitted] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navHidden, setNavHidden] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const scrollExpandRef = useRef<HTMLElement>(null);
  const strandsCanvasRef = useRef<HTMLCanvasElement>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCourse(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!authMode) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [authMode]);

  useEffect(() => {
    const section = scrollExpandRef.current;
    if (!section) return;
    let frame = 0;
    const updateExpand = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      section.style.setProperty("--expand-progress", progress.toFixed(4));
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateExpand); };
    updateExpand();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollYRef.current;
      if (current < 20) setNavHidden(false);
      else if (Math.abs(delta) > 4) setNavHidden(delta > 0);
      lastScrollYRef.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const canvas = strandsCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let width = 0;
    let height = 0;
    let tick = 0;
    let frame = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let strand = 0; strand < 20; strand += 1) {
        const center = height * (0.16 + strand * 0.036);
        context.beginPath();
        for (let x = -20; x <= width + 20; x += 12) {
          const wave = Math.sin(x * 0.008 + strand * 0.48 + tick * (0.7 + strand * 0.018)) * height * 0.1;
          const ripple = Math.sin(x * 0.019 + strand * 0.7 + tick * 0.45) * height * 0.025;
          const y = center + wave + ripple;
          if (x === -20) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.strokeStyle = strand % 4 === 0 ? "rgba(216,255,66,.56)" : "rgba(131,169,255,.28)";
        context.lineWidth = strand % 4 === 0 ? 1.2 : 0.7;
        context.stroke();
        const nodeX = width * (0.18 + ((strand * 0.17) % 0.68));
        const nodeY = center + Math.sin(nodeX * 0.008 + strand * 0.48 + tick * (0.7 + strand * 0.018)) * height * 0.1;
        context.fillStyle = strand % 4 === 0 ? "#d8ff42" : "#83a9ff";
        context.beginPath();
        context.arc(nodeX, nodeY, strand % 4 === 0 ? 2.5 : 1.5, 0, Math.PI * 2);
        context.fill();
      }
    };
    const animate = () => { tick += 0.016; draw(); frame = window.requestAnimationFrame(animate); };
    resize();
    draw();
    if (!reduceMotion) frame = window.requestAnimationFrame(animate);
    window.addEventListener("resize", resize);
    return () => { window.removeEventListener("resize", resize); if (frame) window.cancelAnimationFrame(frame); };
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
      <nav className={`nav${navHidden ? " nav-hidden" : ""}`}>
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
            <h1>Learn to think<br /><em><TextLoop items={["like the threat.", "through evidence.", "under pressure.", "one step ahead."]} /></em></h1>
            <p className="hero-description">Live, practical cybersecurity training for people who want more than passive lessons.</p>
          </div>
          <div className="hero-bottom"><span>SCROLL TO ENTER</span><span className="scroll-mark">↓</span><span>01—04</span></div>
        </div>
      </section>

      <section className="manifesto" id="method" data-reveal>
        <p className="eyebrow dark"><i /> The PascalX method</p>
        <div className="manifesto-grid" data-reveal-item>
          <h2><ScrollRevealText words={["Security", "is", "not", "a", "chapter.", "It", "is", "a", "way", "of", "seeing."]} breakAfter={[4]} accentFrom={8} /></h2>
          <div className="manifesto-copy"><p>We turn curious learners into methodical defenders through guided labs, live instruction, and the habits real security work requires.</p><a href="#programs" className="text-link">See the programmes <Arrow /></a></div>
        </div>
        <div className="signal-row" data-reveal-item><span>LIVE INSTRUCTION</span><span>REAL-WORLD LABS</span><span>SMALL COHORTS</span><span>MENTOR DELIVERY</span></div>
      </section>

      <section className="video-break" aria-label="Students learning cybersecurity">
        <video autoPlay muted loop playsInline preload="metadata"><source src="/media/classroom.mp4" type="video/mp4" /></video>
        <div className="video-break-copy"><span>THE LAB IS OPEN</span><strong>Observe. Test. Defend.</strong></div>
      </section>

      <section className="scroll-expand-section" ref={scrollExpandRef} aria-label="PascalX learning environment">
        <div className="scroll-expand-sticky">
          <div className="scroll-expand-media"><Image src="/media/cybersecurity-tips-1200-627.webp" alt="Cybersecurity learning tips" fill sizes="(max-width: 720px) 88vw, 76vw" priority /><div className="scroll-expand-scrim" /><div className="scroll-expand-frame" /></div>
          <div className="scroll-expand-copy"><span>FIELD NOTE / 02</span><strong>Go deeper<br /><em>on purpose.</em></strong><p>Every concept becomes a scenario, a decision, and a piece of defensible work.</p></div>
          <div className="scroll-expand-meta"><span>SCROLL TO EXPAND</span><span>PX / 02—04</span></div>
        </div>
      </section>

      <section className="gradual-blur-section" data-reveal aria-label="PascalX field notes">
        <div className="gradual-blur-heading"><div><p className="eyebrow"><i /> Gradual signal</p><h2>Clarity is<br /><em>a practice.</em></h2></div><span>FIELD NOTES / 03</span></div>
        <div className="gradual-blur-window" tabIndex={0} aria-label="Scrollable cybersecurity field notes">
          <div className="gradual-blur-content">
            <article><span>01 / OBSERVE</span><h3>Slow down the first read.</h3><p>Good defenders notice what is missing before they chase what is loud.</p></article>
            <article><span>02 / QUESTION</span><h3>Make the useful question unavoidable.</h3><p>Every investigation gets sharper when the next decision is clear.</p></article>
            <article><span>03 / PROVE</span><h3>Leave a trail someone else can trust.</h3><p>Notes, evidence, and a calm handoff turn a technical win into durable work.</p></article>
            <article><span>04 / REPEAT</span><h3>Build the habit, not the highlight.</h3><p>Practice is where intuition becomes a dependable operating rhythm.</p></article>
          </div>
          <div className="gradual-blur-mask" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </div>
      </section>

      <section className="strands-section" data-reveal aria-label="Cybersecurity signal strands">
        <canvas ref={strandsCanvasRef} aria-hidden="true" />
        <div className="strands-overlay" />
        <div className="strands-copy"><p className="eyebrow"><i /> Signal / network / response</p><h2>See the<br /><em>connections.</em></h2><p>Security work is rarely one alert. It is the pattern between signals, decisions, and people.</p></div>
        <div className="strands-meta"><span>LIVE SIGNAL FIELD</span><span>PX / 04—04</span></div>
      </section>

      <section className="field-notes" data-reveal>
        <div className="field-heading" data-reveal-item><div><p className="eyebrow"><i /> Intelligence, applied</p><span className="field-caption">A LIVE LEARNING CONTROL ROOM</span></div><div className="field-index">FIELD NOTE 001<br /><b>THREE WAYS TO TRAIN</b></div></div>
        <div className="field-layout" data-reveal-item>
          <aside className="field-brief"><div className="brief-number">03</div><p className="brief-kicker">WAYS OF WORKING</p><p>Learn through the same habits that make a calm defender useful: observe closely, ask better questions, and leave evidence behind.</p><div className="brief-rule"><span>COHORT SIGNAL</span><b>ON / 24—7</b></div><div className="brief-rail" aria-hidden="true"><i /><i /><i /><i /><i /></div></aside>
          <div className="field-board">
            <article className="note-row live-card"><div className="note-row-index">01</div><div className="note-row-copy"><div className="note-top"><span>LIVE / ACTIVE</span><span>GUIDED LABS</span></div><h3>Live practice</h3><p>See how a tutor approaches a problem, then attempt it in a safe lab of your own.</p></div><span className="note-row-arrow">↗</span></article>
            <article className="note-row cohort-card"><div className="note-row-index">02</div><div className="note-row-copy"><div className="note-top"><span>DIRECT / ACCESS</span><span>DIRECT ACCESS</span></div><h3>Small cohorts</h3><p>Ask the question. Share your screen. Get an answer while the learning is still happening.</p></div><span className="note-row-arrow">↗</span></article>
            <article className="note-row work-card"><div className="note-row-index">03</div><div className="note-row-copy"><div className="note-top"><span>BUILD / PROVE</span><span>PROOF OF PRACTICE</span></div><h3>Defensible work</h3><p>Build a portfolio of reports, notes, and workflows that show how you think under pressure.</p></div><span className="note-row-arrow">↗</span></article>
          </div>
        </div>
      </section>

      <section className="programs" id="programs" data-reveal>
        <div className="section-top" data-reveal-item><p className="eyebrow"><i /> Select your discipline</p><span>03 PRACTICAL PROGRAMS</span></div>
        <h2 data-reveal-item><ScrollRevealText words={["Find", "your", "attack", "surface."]} breakAfter={[1]} accentFrom={2} effect="glide" /></h2>
        <div className="reflective-card" data-reveal-item tabIndex={0} onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--reflect-x", `${((event.clientX - rect.left) / rect.width) * 100}%`); event.currentTarget.style.setProperty("--reflect-y", `${((event.clientY - rect.top) / rect.height) * 100}%`); }} onMouseLeave={(event) => { event.currentTarget.style.setProperty("--reflect-x", "50%"); event.currentTarget.style.setProperty("--reflect-y", "50%"); }}>
          <div className="reflective-card-glare" aria-hidden="true" />
          <div className="reflective-card-top"><span>FEATURED LAB / PX—01</span><span>LIVE / 08 WEEKS</span></div>
          <h3>Ethical Hacking<br /><em>Foundations.</em></h3>
          <p>Build the attacker mindset safely through reconnaissance, web security, Linux, networking, and useful vulnerability reports.</p>
          <div className="reflective-card-bottom"><span>BEGINNER → INTERMEDIATE</span><button type="button" onClick={() => { setPaymentState("form"); setSelectedCourse(courses[0]); }}>View programme <Arrow /></button></div>
        </div>
        <div className="course-list" data-reveal-item>
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
        <div className="protocol-grid" data-reveal-item><h2><ScrollRevealText words={["Your", "seat", "is", "personally", "confirmed."]} breakAfter={[2]} accentFrom={3} effect="sharpen" /></h2><p>Once your payment is successful, your tutor contacts you directly on WhatsApp with onboarding details and your daily Google Meet link. No portal maze. No automated handoff.</p></div>
        <div className="steps" data-reveal-item><div><b>01</b><h3>Choose a programme</h3><p>Open any course for its curriculum and seat details.</p></div><div><b>02</b><h3>Secure your seat</h3><p>Complete payment through the course checkout.</p></div><div><b>03</b><h3>Meet your tutor</h3><p>Receive your Google Meet schedule directly on WhatsApp.</p></div></div>
      </section>

      <section className="faq-section" data-reveal aria-labelledby="faq-heading">
        <div className="faq-heading"><p className="eyebrow"><i /> Common questions</p><h2 id="faq-heading">Know before<br /><em>you begin.</em></h2></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item${openFaq === index ? " is-open" : ""}`} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><i aria-hidden="true">+</i></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div>
      </section>

      <section className="testimonials-section" data-reveal aria-labelledby="testimonials-heading">
        <div className="testimonials-heading"><p className="eyebrow"><i /> The learner experience</p><h2 id="testimonials-heading">Built for the<br /><em>moment it clicks.</em></h2><p>Sample learner notes for this frontend preview. Replace them with verified cohort feedback when the programme goes live.</p></div>
        <div className="testimonials-grid">{testimonials.map(([quote, name, programme], index) => <figure className="testimonial-card" key={name}><div className="testimonial-mark">0{index + 1}</div><blockquote>“{quote}”</blockquote><figcaption><strong>{name}</strong><span>{programme}</span></figcaption></figure>)}</div>
      </section>

      <footer id="contact">
        <div className="footer-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="footer-top"><p className="eyebrow"><i /> NEXT COHORT · LIVE ONLINE</p><span className="footer-signal">● SEATS OPEN</span></div>
        <div className="footer-cta"><h2>Make your<br /><em>next move.</em></h2><div><p>Choose a programme and reserve your live learning seat. Your tutor confirms the next steps personally on WhatsApp.</p><a href="#programs" className="footer-button">Explore programmes <Arrow /></a></div></div>
        <div className="footer-contact"><div><p className="eyebrow"><i /> Contact PascalX</p><h3>Talk to a real tutor<br />before you start.</h3><p className="footer-contact-note">No chatbot, no maze of forms. Tell us what you are trying to learn and we will point you in the right direction.</p></div>{contactSent ? <div className="footer-contact-success"><span>âœ“</span><strong>Message received.</strong><p>This demo form is ready to connect to your contact workflow.</p><button type="button" onClick={() => setContactSent(false)}>Send another message</button></div> : <form className="footer-contact-form" onSubmit={(event) => { event.preventDefault(); setContactSent(true); }}><label>Full name<input required name="name" placeholder="Your name" /></label><label>Email address<input required type="email" name="email" placeholder="you@email.com" /></label><label>Message<textarea required name="message" rows={3} placeholder="How can we help?" /></label><button type="submit">Send message <Arrow /></button></form>}</div>
        <div className="footer-bottom"><div className="footer-brand">PASCAL<span>X</span></div><div className="footer-links"><a href="#programs">Programmes</a><a href="#method">Learning method</a><a href="#top">Back to top ↑</a></div><div className="footer-meta">© 2026 PASCALX<br />CYBERSECURITY LEARNING<br /><br />LEARN WITH PERMISSION.<br />PRACTISE WITH PURPOSE.</div></div>
      </footer>

      {authMode && <div className="modal-backdrop" role="presentation" onMouseDown={() => setAuthMode(null)}>
        <section className={`auth-modal auth-modal-${authMode}`} role="dialog" aria-modal="true" aria-labelledby="auth-title" onMouseDown={(event) => event.stopPropagation()}>
          <button className="close" onClick={() => setAuthMode(null)} aria-label="Close authentication dialog">×</button>
          {authSubmitted ? <div className="auth-complete"><div className="auth-identity-mark"><span>✓</span><i>ACCESS REQUESTED</i></div><p className="eyebrow"><i /> Demo account ready</p><h2>You&apos;re on<br /><em>the list.</em></h2><p>This is a frontend preview. Connect Auth.js later to make account creation and sign-in live.</p><button className="solid-button" onClick={() => setAuthMode(null)}>Continue exploring <Arrow /></button></div> : <><p className="eyebrow"><i /> PascalX learner access</p><h2 id="auth-title">{authMode === "signin" ? <>Welcome<br /><em>back.</em></> : <>Start your<br /><em>practice.</em></>}</h2><form className="auth-form" onSubmit={(event) => { event.preventDefault(); setAuthLoading(true); window.setTimeout(() => { setAuthLoading(false); setAuthSubmitted(true); }, 1100); }}><label>Email address<input required type="email" placeholder="you@email.com" /></label>{authMode === "signup" && <label>Your name<input required placeholder="Full name" /></label>}<label>Password<input required type="password" placeholder="••••••••" /></label><button className="solid-button" type="submit" disabled={authLoading}>{authLoading ? <><span className="auth-spinner" /> Securing your access…</> : <>{authMode === "signin" ? "Sign in" : "Create account"} <Arrow /></>}</button></form><p className="auth-switch">{authMode === "signin" ? "New to PascalX?" : "Already learning with us?"} <button onClick={() => { setAuthMode(authMode === "signin" ? "signup" : "signin"); setAuthSubmitted(false); setAuthLoading(false); }}>{authMode === "signin" ? "Create an account" : "Sign in"}</button></p></>}
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
