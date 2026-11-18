import type { MetadataRoute } from "next";
import { site, services } from "@/content/site";
import { posts } from "@/content/blog";
import { trilhas, articles } from "@/content/academy";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastMod = "2026-11-18";

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/servicios`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...services.map((s) => ({
      url: `${base}/servicios/${s.slug}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${base}/contacto`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/blog`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${base}/academy`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/academy/glosario`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...trilhas.map((t) => ({
      url: `${base}/academy/${t.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${base}/academy/${a.trilha}/${a.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return entries;
}
