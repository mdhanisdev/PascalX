import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PasconX | Live Cybersecurity Training",
    short_name: "PasconX",
    description: "Live, practical cybersecurity training programmes for learners building real security skills.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d10",
    theme_color: "#0b0d10",
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
      { src: "/apple-icon.png", sizes: "any", type: "image/png", purpose: "any" },
    ],
  };
}
