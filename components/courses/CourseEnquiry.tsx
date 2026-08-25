"use client";

import { FormEvent, useState } from "react";
import type { Course } from "@/features/courses/data";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const tutorWhatsAppNumber = "918150983477";

export function CourseEnquiry({ course }: { course: Course }) {
  const [sent, setSent] = useState(false);

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const learnerName = String(formData.get("name") ?? "");
    const message = [
      "*PASCALX | COURSE ENQUIRY*",
      "",
      "*Programme*",
      `${course.title} (${course.code})`,
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

    window.open(`https://wa.me/${tutorWhatsAppNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <aside className="course-enquiry" aria-labelledby="course-enquiry-heading">
      {sent ? <div className="course-enquiry-success" role="status"><div className="course-enquiry-status"><span aria-hidden="true">✓</span><div><small>WhatsApp opened</small><strong>Message prefilled</strong></div></div><p className="eyebrow"><i /> Ready to send</p><h2>Your enquiry<br />is ready.</h2><p>Review the details in WhatsApp, then tap Send. Your tutor will reply directly with availability and next steps.</p><div className="course-enquiry-next"><span><b>01</b> Send your message</span><span><b>02</b> Tutor follows up</span></div></div> : <form onSubmit={submitEnquiry}>
        <p className="eyebrow"><i /> Tutor follow-up</p>
        <h2 id="course-enquiry-heading">Enquire about<br />this programme</h2>
        <p className="course-enquiry-note">Share your details and a tutor will guide you through the next step.</p>
        <label>Full name<input required name="name" placeholder="Your name" /></label>
        <label>WhatsApp number<input required name="whatsapp" type="tel" placeholder="+91 00000 00000" /></label>
        <label>Email address<input required name="email" type="email" placeholder="you@email.com" /></label>
        <button type="submit">Continue on WhatsApp <WhatsAppIcon /></button>
        <small>No payment is taken here. Your tutor will confirm the next steps on WhatsApp.</small>
      </form>}
    </aside>
  );
}
