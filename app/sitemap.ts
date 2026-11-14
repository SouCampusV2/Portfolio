import type { MetadataRoute } from "next";
import { site, siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/soucampus`, changeFrequency: "monthly", priority: 0.7 },
    ...Object.keys(site.cases).map((slug) => ({
      url: `${siteUrl}/projects/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${siteUrl}/tech-stack`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
