"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type PurchaseState = "loading" | "pending" | "paid" | "error";

export default function PaymentSuccessClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState<PurchaseState>(sessionId ? "loading" : "error");
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    let attempts = 0;
    const check = async () => {
      try {
        const response = await fetch(`/api/purchases/status?session_id=${encodeURIComponent(sessionId)}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Could not confirm payment");
        const result = await response.json() as { status: "pending" | "paid"; courseName?: string };
        if (cancelled) return;
        if (result.status === "paid") { setCourseName(result.courseName ?? "your programme"); setState("paid"); return; }
        attempts += 1;
        setState("pending");
        if (attempts < 12) window.setTimeout(check, 2500);
      } catch { if (!cancelled) setState("error"); }
    };
    check();
    return () => { cancelled = true; };
  }, [sessionId]);

  return <main className="payment-page"><section className="payment-card">
    {state === "paid" ? <><span className="payment-check">✓</span><p className="eyebrow"><i /> Payment confirmed</p><h1>You&apos;re enrolled in<br /><em>{courseName}.</em></h1><p>Your tutor will contact you through WhatsApp with your onboarding information, Google Meet link, and future class schedule.</p><Link className="solid-button" href="/">Back to PascalX <span className="arrow">↗</span></Link></> : <><span className="payment-check">{state === "error" ? "!" : "…"}</span><p className="eyebrow"><i /> {state === "error" ? "Confirmation required" : "Verifying payment"}</p><h1>{state === "error" ? <>We could not confirm this payment yet.</> : <>Securing your<br /><em>enrolment.</em></>}</h1><p>{state === "error" ? "If payment was completed, contact support with your Stripe receipt. Do not make another payment." : "Stripe has returned you safely. We are waiting for the verified payment confirmation before enrolling you."}</p></>}
  </section></main>;
}
