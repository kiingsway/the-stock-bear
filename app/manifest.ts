import type { MetadataRoute } from "next";
import { APP_ICONS, APP_NAME } from "./config/app";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: "Stock Bear",
    description: "List to check items to stock and tasks to do",
    start_url: "/",
    display: "standalone",
    background_color: "#111827",
    theme_color: "#111827",
    icons: [
      {
        src: APP_ICONS.icon192,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: APP_ICONS.icon512,
        sizes: "512x512",
        type: "image/png",
      }
    ],
  };
}