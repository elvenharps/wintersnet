import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.wintersnet.net";
  const lastModified = new Date();
  return [
    { url: `${base}/`, lastModified, changeFrequency: "yearly", priority: 1 },
    { url: `${base}/about`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/history`, lastModified, changeFrequency: "yearly", priority: 0.9 },
  ];
}
