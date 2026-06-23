import { ImageResponse } from "next/og";

export const alt = "History of MSN Chat — WintersNet";
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
          Long-form · Archival
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 600,
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          History of MSN Chat
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#8aa39a",
            marginTop: 28,
            maxWidth: 980,
          }}
        >
          From its 1996 Comic Chat origins, through Web Chat and the GateKeeper
          era, to its 2008 shutdown.
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#7fb8a4",
            marginTop: 48,
          }}
        >
          wintersnet.net
        </div>
      </div>
    ),
    { ...size },
  );
}
