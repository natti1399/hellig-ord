import { ImageResponse } from "next/og"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        {/* Cross: vertical bar */}
        <div
          style={{
            position: "absolute",
            width: 5,
            height: 20,
            background: "#F7F4EF",
            borderRadius: 2,
          }}
        />
        {/* Cross: horizontal bar */}
        <div
          style={{
            position: "absolute",
            width: 14,
            height: 5,
            background: "#F7F4EF",
            borderRadius: 2,
            marginTop: -6,
          }}
        />
      </div>
    ),
    { ...size }
  )
}
