import { ImageResponse } from "next/og";

export const alt = "Siksha Tantra school ERP, learning and DigiBoard campus signage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#263e34", color: "#ffffff", padding: "70px 80px", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 30, color: "#efd080" }}>SIKSHA TANTRA</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700 }}>School life, connected.</div>
          <div style={{ fontSize: 34, marginTop: 28, color: "#dce9dc" }}>School ERP. Learning. DigiBoard campus signage.</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#efd080" }}>Explore workflows and request a school walkthrough</div>
      </div>
    ),
    size
  );
}