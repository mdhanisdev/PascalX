export type Course = { id: string; code: string; title: string; level: string; duration: string; price: string; amountInr: number; overview: string; modules: string[] };

export const courses: Course[] = [
  { id: "ethical-hacking-foundations", code: "PX/01", title: "Ethical Hacking Foundations", level: "Beginner → Intermediate", duration: "8 weeks · Live", price: "₹4,999", amountInr: 499900, overview: "Build the attacker mindset safely. Learn reconnaissance, web security, Linux, networking, and how to write a useful vulnerability report.", modules: ["Linux & network essentials", "Reconnaissance and OSINT", "Web application testing", "Reporting & responsible disclosure"] },
  { id: "web-application-security", code: "PX/02", title: "Web Application Security", level: "Intermediate", duration: "6 weeks · Live", price: "₹6,499", amountInr: 649900, overview: "A practical lab-led programme for finding and fixing common web application weaknesses before they reach production.", modules: ["OWASP Top 10", "Burp Suite workflows", "API security testing", "Secure remediation reviews"] },
  { id: "soc-analyst-launchpad", code: "PX/03", title: "SOC Analyst Launchpad", level: "Beginner → Job ready", duration: "10 weeks · Live", price: "₹7,999", amountInr: 799900, overview: "Learn the daily operating rhythm of a security operations centre: alerts, triage, investigation, escalation, and incident thinking.", modules: ["SIEM fundamentals", "Alert triage", "Threat hunting", "Incident response playbooks"] },
];

export const getCourse = (id: string) => courses.find((course) => course.id === id);
