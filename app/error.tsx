"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="fallback-page"><p className="eyebrow"><i /> Temporary issue</p><h1>Something went wrong.</h1><p>Please try again. If the problem continues, contact PasconX directly on WhatsApp.</p><button type="button" className="fallback-link" onClick={reset}>Try again</button></main>;
}
