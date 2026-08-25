"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type SiteFooterProps = {
  backToTopHref?: string;
};

const admissionsWhatsApp = "https://wa.me/918150983477?text=Hello%20PascalX%2C%20I%20would%20like%20help%20choosing%20a%20programme.";

export function SiteFooter({ backToTopHref = "#top" }: SiteFooterProps) {
  const pathname = usePathname();

  function smoothNavigate(event: MouseEvent<HTMLAnchorElement>, target: string, offset = -80) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const section = document.getElementById(target);
    if (!section) return;

    event.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    const lenis = window.__pascalxLenis;
    if (lenis) {
      lenis.scrollTo(section, { offset, duration: 1.15 });
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const isHome = pathname === "/";
  const homeLink = () => "/";
  const onHomeNavigate = (target: string, offset?: number) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      smoothNavigate(event, target, offset);
      return;
    }
    window.sessionStorage.setItem("pascalx-scroll-target", target);
  };

  return (
    <footer className="site-footer">
      <div className="footer-orbit" aria-hidden="true"><span /><span /><span /></div>
      <div className="footer-top"><p className="eyebrow"><i /> PascalX / Live cybersecurity training</p><span className="footer-signal">● COHORT ENQUIRIES OPEN</span></div>
      <div className="footer-cta"><h2>Make your<br /><em>next move.</em></h2><div><p>PascalX delivers live, tutor-led cybersecurity programmes for learners who want a practical method—not just a list of tools. Explore the curriculum, ask the right questions, and choose a cohort with confidence.</p><Link href={homeLink()} className="footer-button" scroll={false} onClick={onHomeNavigate("programs")}>Explore programmes <span className="arrow" aria-hidden="true">↗</span></Link></div></div>
      <section className="footer-contact" id="contact" aria-labelledby="footer-contact-heading"><div><p className="eyebrow"><i /> Admissions & programme guidance</p><h3 id="footer-contact-heading">Choose your next<br />learning move.</h3><p className="footer-contact-copy">Tell us where you are in your cybersecurity journey. We will help you compare the curriculum, learning format, and next available cohort.</p></div><div className="footer-contact-links"><a href={admissionsWhatsApp} target="_blank" rel="noreferrer"><span className="footer-enquiry-label"><i aria-hidden="true" /> DIRECT TUTOR ACCESS</span><strong>Talk to a tutor.</strong><small>Get availability, format, and next-cohort details directly.</small><span className="footer-whatsapp-button">Contact us <WhatsAppIcon /></span></a></div></section>
      <div className="footer-bottom"><div><div className="footer-brand">PASCAL<span>X</span></div><p className="footer-statement">Practical cybersecurity learning for thoughtful, responsible professionals.</p></div><nav className="footer-links" aria-label="Footer navigation"><Link href={homeLink()} scroll={false} onClick={onHomeNavigate("programs")}>Programmes</Link><Link href={homeLink()} scroll={false} onClick={onHomeNavigate("method")}>Learning method</Link><Link href={homeLink()} scroll={false} onClick={onHomeNavigate("faq")}>Questions & answers</Link></nav><address className="footer-contact-details"><a href="tel:+918150983477"><span>Phone</span><strong>+91 81509 83477</strong></a><a href="mailto:xplore@pascalx.in"><span>Email</span><strong>xplore@pascalx.in</strong></a></address><div className="footer-meta">LIVE ONLINE PROGRAMMES<br />GUIDED PRACTICAL LABS<br />DIRECT TUTOR SUPPORT</div><div className="footer-top-column"><a className="footer-top-link" href={isHome ? "/" : backToTopHref} onClick={isHome ? onHomeNavigate("top", 0) : undefined}>Back to top ↑</a><p className="footer-location"><svg className="india-flag" viewBox="0 0 30 20" role="img" aria-label="India"><path fill="#ff9933" d="M0 0h30v6.67H0z" /><path fill="#fff" d="M0 6.67h30v6.66H0z" /><path fill="#138808" d="M0 13.33h30V20H0z" /><circle cx="15" cy="10" r="2.55" fill="none" stroke="#1a4d9b" strokeWidth=".7" /><circle cx="15" cy="10" r=".45" fill="#1a4d9b" /><path d="M15 7.45v5.1M12.45 10h5.1M13.2 8.2l3.6 3.6M16.8 8.2l-3.6 3.6" stroke="#1a4d9b" strokeWidth=".45" /></svg> Bengaluru, India</p></div></div>
    </footer>
  );
}
