export type Course = {
  code: string;
  slug: string;
  title: string;
  level: string;
  duration: string;
  price: string;
  overview: string;
  modules: string[];
  outcomes: string[];
  format: string[];
  image: string;
  brochureHref: string;
};

export const courses: Course[] = [
  {
    code: "PX/01",
    slug: "ethical-hacking-foundations",
    title: "Ethical Hacking Foundations",
    level: "Beginner to Intermediate",
    duration: "8 weeks · Live",
    price: "₹4,999",
    overview: "Build the attacker mindset safely through reconnaissance, web security, Linux, networking, and useful vulnerability reporting.",
    modules: ["Linux and network essentials", "Reconnaissance and OSINT", "Web application testing", "Reporting and responsible disclosure"],
    outcomes: ["Read a target surface methodically", "Test common web weaknesses in a safe lab", "Document evidence for a clear handoff"],
    format: ["Live online sessions", "Guided practical labs", "Direct tutor support"],
    image: "/course-images/ethical-hacking.jpg",
    brochureHref: "/brochures/soc-analyst-reference.pdf",
  },
  {
    code: "PX/02",
    slug: "web-application-security",
    title: "Web Application Security",
    level: "Intermediate",
    duration: "6 weeks · Live",
    price: "₹6,499",
    overview: "Learn a practical, repeatable workflow for finding, validating, and explaining web application weaknesses before they reach production.",
    modules: ["OWASP Top 10", "Burp Suite workflows", "API security testing", "Secure remediation reviews"],
    outcomes: ["Map and test a web attack surface", "Use Burp Suite with a clear testing process", "Translate findings into practical fixes"],
    format: ["Live online sessions", "Scenario-led testing labs", "Feedback on reports and remediation"],
    image: "/course-images/web-application-security.avif",
    brochureHref: "/brochures/soc-analyst-reference.pdf",
  },
  {
    code: "PX/03",
    slug: "soc-analyst-launchpad",
    title: "SOC Analyst Launchpad",
    level: "Beginner to Job-Ready",
    duration: "10 weeks · Live",
    price: "₹7,999",
    overview: "Learn the operating rhythm of a security operations centre: alerts, triage, investigations, escalation, and incident-response thinking.",
    modules: ["SIEM fundamentals", "Alert triage", "Threat hunting", "Incident response playbooks"],
    outcomes: ["Prioritise security alerts with context", "Build an evidence-led investigation trail", "Escalate incidents with a calm, useful handoff"],
    format: ["Live online sessions", "SOC-style investigation labs", "Tutor feedback on analyst notes"],
    image: "/course-images/soc-analyst.png",
    brochureHref: "/brochures/soc-analyst-reference.pdf",
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}
