import type { Metadata } from "next";
import type { SeoFields } from "./schema";

const BASE = "https://www.wintersnet.net";

export function seoMetadata(
  seo: SeoFields,
  options: {
    path: string;
    absoluteTitle?: boolean;
    type?: "website" | "article" | "profile";
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    keywords?: string[];
  },
): Metadata {
  const path = options.path;
  const url = path === "/" ? BASE : `${BASE}${path}`;
  const ogDescription = seo.ogDescription || seo.description;
  return {
    title: options.absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    keywords: options.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: seo.title,
      description: ogDescription,
      url,
      siteName: "WintersNet",
      type: options.type ?? "website",
      ...(options.publishedTime
        ? {
            publishedTime: options.publishedTime,
            modifiedTime: options.modifiedTime,
            authors: options.authors,
          }
        : {}),
    },
    ...(options.type === "article"
      ? {
          twitter: {
            card: "summary_large_image",
            title: seo.title,
            description: ogDescription,
          },
        }
      : {}),
  };
}
