import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f7f4f1",
          color: "#1d1517",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              border: "2px solid #e5dcda",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 19,
              fontWeight: 600,
            }}
          >
            YSS
          </div>
          <div style={{ fontSize: 26, color: "#685a5d" }}>{site.location}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            {site.name}
          </div>
          <div style={{ marginTop: 28, fontSize: 40, color: "#7d1523" }}>{site.title}</div>
        </div>
      </div>
    ),
    size,
  );
}
