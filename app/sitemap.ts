import type { MetadataRoute } from "next";
import { courses } from "@/features/courses/data";

const siteUrl = "https://www.pasconx.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    ...courses.map((course) => ({ url: `${siteUrl}/programmes/${course.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
