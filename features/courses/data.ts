export type Course = {
  code: string;
  slug: string;
  title: string;
  headline: string;
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
    slug: "security-operations-center-soc",
    title: "Security Operations Center (SOC)",
    headline: "Master Enterprise Cyber Defense & Real-Time Incident Investigation",
    level: "Beginner to Job-Ready",
    duration: "Live program",
    price: "Contact for fees",
    overview: "Master enterprise cyber defense and real-time incident investigation. Train as a frontline Blue Team defender, monitoring telemetry, inspecting network traffic, and containing active threats.",
    modules: ["SIEM monitoring with Splunk Enterprise", "Wazuh and ELK Stack detection workflows", "Packet analysis with Wireshark", "Sysmon telemetry and Nmap investigation", "Incident triage and detection rules"],
    outcomes: ["Monitor real-time network traffic and identify intrusion attempts", "Investigate enterprise security alerts and create incident analysis reports", "Complete a capstone breach investigation with technical mock-interview preparation"],
    format: ["Live instructor-led sessions", "Cloud cyber range labs", "Career grooming and technical mock interviews"],
    image: "/course-images/soc-analyst.png",
    brochureHref: "/brochures/soc-analyst-reference.pdf",
  },
  {
    code: "PX/02",
    slug: "vulnerability-assessment-penetration-testing-vapt",
    title: "Vulnerability Assessment and Penetration Testing (VAPT)",
    headline: "The Offensive Red Team Transformation Program",
    level: "Advanced",
    duration: "Live program",
    price: "Contact for fees",
    overview: "The Offensive Red Team Transformation Program. Learn to find, verify, and safely exploit security flaws before malicious attackers do.",
    modules: ["Active reconnaissance and the five stages of hacking", "Network and Active Directory assessment", "Web application testing with Burp Suite and OWASP ZAP", "Vulnerability scanning with Nessus Essentials", "Exploitation with Metasploit Framework"],
    outcomes: ["Run professional assessments in isolated penetration-testing environments", "Perform automated scanning, manual web interception, and OS or service exploitation", "Prepare for Junior Penetration Tester, Vulnerability Analyst, and Application Security roles"],
    format: ["Live instructor-led sessions", "Oracle VirtualBox or VMware Player labs", "DVWA, OWASP Juice Shop, and Metasploitable practice targets"],
    image: "/course-images/web-application-security.jpg",
    brochureHref: "/brochures/soc-analyst-reference.pdf",
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}
