import type { MetadataRoute } from "next";

const siteUrl = "https://www.pasconx.com";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl };
}
