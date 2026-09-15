import type { Metadata } from "next";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "PasconX",
  url: "https://www.pasconx.com",
  logo: "https://www.pasconx.com/icon.png",
  description: "Live, practical cybersecurity training programmes for learners building real security skills.",
  sameAs: ["https://www.instagram.com/pasconx_academy"],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pasconx.com"),
  title: { default: "PasconX | Live Cybersecurity Training", template: "%s | PasconX" },
  description: "Live, practical cybersecurity training programmes for learners building real security skills.",
  applicationName: "PasconX",
  keywords: ["cybersecurity training", "SOC analyst training", "VAPT training", "ethical hacking", "live cybersecurity courses"],
  authors: [{ name: "PasconX" }],
  creator: "PasconX",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "PasconX",
    title: "PasconX | Live Cybersecurity Training",
    description: "Live, practical cybersecurity training programmes for learners building real security skills.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PasconX | Live Cybersecurity Training",
    description: "Live, practical cybersecurity training programmes for learners building real security skills.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <StructuredData data={organizationSchema} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
