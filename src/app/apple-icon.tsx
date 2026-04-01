import { ImageResponse } from "next/og"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#51304A",
          borderRadius: 36,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 76,
            fontWeight: 700,
            color: "#F7F4EF",
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          HO
        </span>
      </div>
    ),
    { ...size }
  )
}
