import type { Metadata } from "next";
import { PageShell } from "@/lib/pageShell";
import { blogIndexContent } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Blog de marketing digital",
  description:
    "Novedades, noticias y análisis de marketing digital: Google Ads, Meta Ads, SEO y búsquedas con IA, explicados con claridad para tu empresa.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const content = blogIndexContent();
  return <PageShell {...content} />;
}
