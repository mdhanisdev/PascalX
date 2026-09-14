import { ImageResponse } from "next/og";

export const alt = "PasconX — Live Cybersecurity Training";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ alignItems: "center", background: "#080b0e", color: "#f6f8fa", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", padding: "72px", width: "100%" }}>
      <div style={{ color: "#8ab5ff", display: "flex", fontSize: 28, letterSpacing: 8, marginBottom: 32 }}>LIVE CYBERSECURITY TRAINING</div>
      <div style={{ display: "flex", fontSize: 104, fontWeight: 800, letterSpacing: -6 }}>PASCON<span style={{ color: "#146cff" }}>X</span></div>
      <div style={{ color: "#c4ced8", display: "flex", fontSize: 42, marginTop: 34 }}>Learn the method. Make it yours.</div>
    </div>,
  );
}
