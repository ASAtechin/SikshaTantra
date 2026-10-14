/**
 * Default Open Graph image (W0): forest card with the gold monogram, wordmark and positioning line.
 * Plus Jakarta Sans is fetched from Google Fonts (subset to the glyphs used) when the image is
 * generated; if that fails the bundled default font is used and the layout still holds.
 */
import { ImageResponse } from "next/og";
import { siteName, siteStatus, siteUrl } from "@/lib/site";

export const alt = "Shiksha Tantra: school ERP, campus screens and a learning library for Indian schools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const headline = "School ERP, campus screens and a learning library for Indian schools";
const footnote = `${siteStatus.label} · ${siteStatus.short.replace(/\.$/, "")}`;
const host = new URL(siteUrl).host;

async function loadGoogleFont(weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(cssUrl)).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const font = await fetch(src);
    return font.ok ? await font.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const glyphs = `${siteName}${headline}${footnote}${host}`;
  const [bold, medium] = await Promise.all([loadGoogleFont(700, glyphs), loadGoogleFont(500, glyphs)]);
  const fonts = [
    ...(bold ? [{ name: "Plus Jakarta Sans", data: bold, weight: 700 as const, style: "normal" as const }] : []),
    ...(medium ? [{ name: "Plus Jakarta Sans", data: medium, weight: 500 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#263E34",
          color: "#F7F5EE",
          padding: "64px 80px",
          fontFamily: fonts.length ? "Plus Jakarta Sans" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 76, height: 76, borderRadius: 18, background: "#1E3329" }}>
            <svg width="56" height="56" viewBox="2 4 28 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 6.5 29 13l-13 6.5L3 13z" fill="#EFD080" />
              <path d="M8.5 16.4v5.1c0 2 3.4 3.8 7.5 3.8s7.5-1.8 7.5-3.8v-5.1L16 20.2z" fill="#E2B85A" />
              <path d="M26.2 14.4v6.4" stroke="#EFD080" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="26.2" cy="21.6" r="1.5" fill="#EFD080" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: "-0.01em" }}>
            Shiksha <span style={{ color: "#EFD080", marginLeft: 12 }}>Tantra</span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.02em", maxWidth: 1000 }}>
          {headline}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px solid rgba(239, 208, 128, 0.45)", paddingTop: 28, fontSize: 28, fontWeight: 500 }}>
          <div style={{ display: "flex", color: "#EFD080" }}>{footnote}</div>
          <div style={{ display: "flex", color: "#DCE6DF" }}>{host}</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
