import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hellig Ord",
    short_name: "Hellig Ord",
    description: "Vakre kristne produkter som inspirerer troen din",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EF",
    theme_color: "#51304A",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}
