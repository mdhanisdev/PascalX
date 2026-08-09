import { Suspense } from "react";
import PaymentSuccessClient from "./payment-success-client";

export default function PaymentSuccessPage() {
  return <Suspense fallback={<main className="payment-page"><section className="payment-card"><p className="eyebrow"><i /> Verifying payment</p><h1>Securing your<br /><em>enrolment.</em></h1></section></main>}><PaymentSuccessClient /></Suspense>;
}
