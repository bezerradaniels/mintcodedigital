import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/content/blog";
import { PageShell } from "@/lib/pageShell";
import { postPageContent } from "@/lib/pages";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((item) => item.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article" },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = posts.find((item) => item.slug === slug);
  if (!p) notFound();
  const content = postPageContent(p);
  return <PageShell {...content} />;
}
