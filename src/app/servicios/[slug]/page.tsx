import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/content/site";
import { PageShell } from "@/lib/pageShell";
import { servicePageContent } from "@/lib/pages";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((item) => item.slug === slug);
  if (!s) return {};
  return {
    title: s.seoTitle,
    description: s.seoDescription,
    alternates: { canonical: `/servicios/${s.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((item) => item.slug === slug);
  if (!s) notFound();
  const content = servicePageContent(s);
  return <PageShell {...content} />;
}
