"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login-page">
      <Link href="/" className="brand">PASCAL<b>X</b></Link>
      <section className="login-card">
        <p className="eyebrow"><i /> Learner access</p>
        <h1>Sign in before<br /><em>you enrol.</em></h1>
        <p>Use your Google account to secure your course purchase and keep it linked to your learning record.</p>
        <button className="solid-button" onClick={() => signIn("google", { redirectTo: window.location.href })}>Continue with Google <span className="arrow">↗</span></button>
        <small>Purchases and tutor handoff are attached to your signed-in account.</small>
      </section>
    </main>
  );
}
