import { ImageResponse } from "next/og";

export const alt =
  "Furvana — the smart grooming arch that pampers your cat or small dog automatically";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          color: "#2B2620",
          background:
            "radial-gradient(900px 600px at 92% -10%, rgba(199,154,95,0.55), rgba(199,154,95,0) 60%)," +
            "radial-gradient(700px 520px at -10% 30%, rgba(184,137,90,0.38), rgba(184,137,90,0) 60%)," +
            "radial-gradient(900px 600px at 50% 115%, rgba(199,154,95,0.42), rgba(199,154,95,0) 60%)," +
            "linear-gradient(135deg, #FBF7EF 0%, #F8F2E7 45%, #EFE5D3 100%)",
        }}
      >
        {/* Top bar: wordmark + eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.01em",
              color: "#2B2620",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: 18,
                background: "linear-gradient(135deg,#C79A5F,#A8763E)",
                color: "#fff",
                fontSize: 36,
                fontWeight: 900,
                fontStyle: "italic",
                letterSpacing: "-0.04em",
                boxShadow: "0 10px 24px -10px rgba(154,107,58,0.7)",
              }}
            >
              F
            </span>
            Furvana
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 20px",
              border: "1.5px solid rgba(154,107,58,0.45)",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 600,
              color: "#9A6B3A",
              background: "rgba(255,255,255,0.55)",
            }}
          >
            Now accepting early access
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              color: "#2B2620",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>The smart grooming arch</span>
            <span style={{ display: "flex", flexWrap: "wrap" }}>
              that&nbsp;
              <span style={{ fontStyle: "italic", color: "#9A6B3A" }}>
                pampers
              </span>
              &nbsp;your pet.
            </span>
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "#5C544A",
              maxWidth: 940,
              fontWeight: 500,
            }}
          >
            Live HD camera. Two-way audio. A gentle reciprocating massage —
            tuned for cats and small dogs.
          </div>
        </div>

        {/* Footer: feature pills + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {[
              "Motion activated",
              "1080p HD",
              "Whisper quiet",
              "USB-C",
            ].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 18px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid #E4D8C4",
                  color: "#2B2620",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.005em",
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px 28px",
              borderRadius: 999,
              background: "linear-gradient(135deg,#C79A5F,#A8763E)",
              color: "#fff",
              fontSize: 24,
              fontWeight: 800,
              boxShadow: "0 16px 30px -10px rgba(154,107,58,0.7)",
            }}
          >
            Join the waitlist →
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
