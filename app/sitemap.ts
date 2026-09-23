import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/soucampus`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/tech-stack`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
