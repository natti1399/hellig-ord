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
    // Icons are served via the app-router icon conventions
    // (src/app/icon.tsx + apple-icon.tsx). No manifest icons until
    // dedicated PNG assets exist in /public/icons/.
    icons: [],
  }
}
