import type { Metadata } from "next";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

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
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
