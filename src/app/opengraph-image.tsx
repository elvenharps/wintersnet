import { ImageResponse } from "next/og";

export const alt = "WintersNet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(160deg, #0a1413 0%, #15211f 100%)",
          color: "#e6efe9",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#7fb8a4",
          }}
        >
          Pacific Northwest · Est. 2003
        </div>
        <div style={{ fontSize: 96, fontWeight: 600, marginTop: 24 }}>
          WintersNet
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#8aa39a",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          A quiet corner of the internet — home to a fact-checked history of MSN
          Chat.
        </div>
      </div>
    ),
    { ...size },
  );
}
