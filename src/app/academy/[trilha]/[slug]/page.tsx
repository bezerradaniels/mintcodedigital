import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/content/academy";
import { PageShell } from "@/lib/pageShell";
import { articlePageContent } from "@/lib/pages";

export function generateStaticParams() {
  return articles.map((a) => ({ trilha: a.trilha, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trilha: string; slug: string }>;
}): Promise<Metadata> {
  const { trilha, slug } = await params;
  const a = articles.find((item) => item.trilha === trilha && item.slug === slug);
  if (!a) return {};
  return {
    title: `${a.title} | Academy`,
    description: a.lead,
    alternates: { canonical: `/academy/${a.trilha}/${a.slug}` },
    openGraph: { type: "article" },
  };
}

export default async function AcademyArticlePage({
  params,
}: {
  params: Promise<{ trilha: string; slug: string }>;
}) {
  const { trilha, slug } = await params;
  const a = articles.find((item) => item.trilha === trilha && item.slug === slug);
  if (!a) notFound();
  const content = articlePageContent(a);
  return <PageShell {...content} />;
}
