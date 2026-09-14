import Link from "next/link";

export default function NotFound() {
  return <main className="fallback-page"><p className="eyebrow"><i /> Error 404</p><h1>Page not found.</h1><p>The page you requested is unavailable or may have moved.</p><Link href="/" className="fallback-link">Return to PasconX</Link></main>;
}
