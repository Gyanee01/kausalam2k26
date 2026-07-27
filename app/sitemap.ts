import { MetadataRoute } from "next";
import { EVENTS } from "@/constants";

const baseUrl = "https://kaushalam2k26.vercel.app";


   * IMPORTANT:
   * Only include event routes IF they are real, server-addressable URLs.
   * If events are client-side state only, DO NOT include them yet.
   */

  // Uncomment ONLY after /events/[id]/page.tsx exists
  /*
  const eventRoutes: MetadataRoute.Sitemap = EVENTS.map((event) => ({
    url: `${baseUrl}/events/${event.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));
  */

  return [
    ...staticRoutes,
    // ...eventRoutes,
  ];
}
