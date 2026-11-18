import { NextResponse } from "next/server";
import { site, services, method, portfolio } from "@/content/site";
import { posts } from "@/content/blog";
import { trilhas, articles, glossary } from "@/content/academy";

export const dynamic = "force-static";

function stripHtml(html: string): string {
  return html
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "\n### $1\n")
    .replace(/<li>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<blockquote>(.*?)<\/blockquote>/gi, "\n> $1\n")
    .replace(/<p>(.*?)<\/p>/gi, "$1\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function GET() {
  const base = site.url.replace(/\/$/, "");

  const sections: string[] = [
    `# ${site.name} — Documentación Completa (LLMs & AI Agents)`,
    "",
    `> ${site.tagline}`,
    "",
    "## 1. Sobre Mintcode",
    "Mintcode es una agencia digital enfocada en resultados medibles: creación de sitios web rápidos y orientados a la conversión, campañas de tráfico pago en Google Ads y Meta Ads optimizadas por ventas/contactos reales, y posicionamiento en motores de búsqueda y asistentes de IA (SEO, AEO y GEO).",
    "",
    "### Canales oficiales",
    `- Web: ${base}`,
    `- Solicitar diagnóstico / presupuesto: ${base}/contacto`,
    `- WhatsApp: https://wa.me/${site.contact.whatsappNumber} (${site.contact.whatsappDisplay})`,
    `- E-mail: ${site.contact.email}`,
    `- Instagram: ${site.contact.instagramUrl}`,
    "",
    "## 2. Servicios en detalle",
    ...services.flatMap((s) => [
      `### ${s.n}. ${s.name} (${base}/servicios/${s.slug})`,
      s.long,
      "",
      "**Qué incluye:**",
      ...s.included.map((item) => `- ${item}`),
      "",
      `**${s.typesTitle}:**`,
      ...s.types.map(([t, d]) => `- **${t}**: ${d}`),
      "",
      "**Preguntas frecuentes (FAQ):**",
      ...s.faq.map(([q, a]) => `- **${q}**\n  ${a}`),
      "",
    ]),
    "## 3. Método de trabajo en 4 pasos",
    ...method.map(([t, d], i) => `${i + 1}. **${t}**: ${d}`),
    "",
    "## 4. Portafolio de sitios publicados",
    ...portfolio.map(
      (p) =>
        `- **${p.name}** (${p.segment}) — https://${p.url}\n  ${p.desc} (${p.tags.join(", ")})`,
    ),
    "",
    "## 5. Artículos del Blog",
    ...posts.flatMap((p) => [
      `### ${p.title}`,
      `URL: ${base}/blog/${p.slug} | Fecha: ${p.date} | Lectura: ${p.minutes} min`,
      `Resumen: ${p.excerpt}`,
      "",
      stripHtml(p.body),
      "",
    ]),
    "## 6. Mintcode Academy (Guías y Fórmulas)",
    ...trilhas.map((t) => `- **Ruta ${t.name}** (${base}/academy/${t.slug}): ${t.desc}`),
    "",
    ...articles.flatMap((a) => [
      `### ${a.title} (${base}/academy/${a.trilha}/${a.slug})`,
      `Nivel: ${a.level} | Lectura: ${a.minutes} min`,
      `Resumen: ${a.summary.join(" ")}`,
      a.formula ? `Fórmula: ${a.formula[1]}` : "",
      "",
      stripHtml(a.body.replace("{{formula}}", "")),
      "",
    ]),
    "## 7. Glosario de Marketing Digital A–Z",
    ...glossary.map((g) => `- **${g.term}**: ${g.def}`),
    "",
  ];

  return new NextResponse(sections.filter((line) => line !== undefined).join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
