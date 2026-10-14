/**
 * Apple touch icon (W0): the icon.svg monogram as a full-bleed 180x180 PNG
 * (iOS applies its own corner rounding).
 */
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#263E34" }}>
        <svg width="132" height="132" viewBox="2 4 28 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 6.5 29 13l-13 6.5L3 13z" fill="#EFD080" />
          <path d="M8.5 16.4v5.1c0 2 3.4 3.8 7.5 3.8s7.5-1.8 7.5-3.8v-5.1L16 20.2z" fill="#E2B85A" />
          <path d="M26.2 14.4v6.4" stroke="#EFD080" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="26.2" cy="21.6" r="1.5" fill="#EFD080" />
        </svg>
      </div>
    ),
    size
  );
}
