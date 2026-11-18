import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { trilhas, articles } from "@/content/academy";
import { PageShell } from "@/lib/pageShell";
import { trilhaPageContent } from "@/lib/pages";

export function generateStaticParams() {
  return trilhas.map((t) => ({ trilha: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trilha: string }>;
}): Promise<Metadata> {
  const { trilha } = await params;
  const t = trilhas.find((item) => item.slug === trilha);
  if (!t) return {};
  const count = articles.filter((a) => a.trilha === t.slug).length;
  return {
    title: `Ruta ${t.name} | Academy`,
    description: `${t.desc} Ruta ${t.name} de Mintcode Academy con ${count} ${count === 1 ? "artículo" : "artículos"}.`,
    alternates: { canonical: `/academy/${t.slug}` },
  };
}

export default async function TrilhaPage({
  params,
}: {
  params: Promise<{ trilha: string }>;
}) {
  const { trilha } = await params;
  const t = trilhas.find((item) => item.slug === trilha);
  if (!t) notFound();
  const content = trilhaPageContent(t);
  return <PageShell {...content} />;
}
