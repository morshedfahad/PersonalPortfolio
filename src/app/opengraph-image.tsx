import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Fahad Morshed — Software Engineer & AI Researcher";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "#faf9f6",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#4f46e5",
            fontFamily: "sans-serif",
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 98,
            fontWeight: 500,
            color: "#16161a",
            letterSpacing: -2,
          }}
        >
          Fahad Morshed
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 38,
            fontWeight: 600,
            color: "#4f46e5",
            fontFamily: "sans-serif",
          }}
        >
          Software Engineer · AI Researcher · DevOps
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 26,
            color: "#5b5b66",
            maxWidth: 900,
            fontFamily: "sans-serif",
          }}
        >
          Springer-published researcher building production-grade AI & enterprise
          systems — LangChain, Oracle APEX, Docker, Kubernetes.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
          }}
        />
      </div>
    ),
    size
  );
}
