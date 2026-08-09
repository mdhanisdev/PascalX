import type { Metadata } from "next";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "PascalX — Cybersecurity Learning",
  description: "Live, practical cybersecurity learning cohorts.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
