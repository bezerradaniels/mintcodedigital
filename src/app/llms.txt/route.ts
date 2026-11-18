import { NextResponse } from "next/server";
import { site, services, method, portfolio } from "@/content/site";
import { posts } from "@/content/blog";
import { trilhas, articles, glossary } from "@/content/academy";

export const dynamic = "force-static";

export function GET() {
  const base = site.url.replace(/\/$/, "");

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.tagline} Agencia digital especializada en creación de sitios web de alta conversión, gestión de tráfico pago (Google Ads, Performance Max, Meta Ads) y posicionamiento orgánico en buscadores e inteligencia artificial (SEO, AEO, GEO).`,
    "",
    "## Información de contacto y contratación",
    `- Sitio web oficial: ${base}`,
    `- Página de contacto y presupuesto: ${base}/contacto`,
    `- WhatsApp comercial: https://wa.me/${site.contact.whatsappNumber} (${site.contact.whatsappDisplay})`,
    `- Correo electrónico: ${site.contact.email}`,
    `- Instagram: ${site.contact.instagramUrl}`,
    `- Horario de atención: ${site.contact.hours}`,
    `- Contexto completo para LLMs: ${base}/llms-full.txt`,
    "",
    "## Servicios principales",
    ...services.map(
      (s) =>
        `- [${s.name}](${base}/servicios/${s.slug}): ${s.long} Incluye: ${s.included.join(", ")}.`,
    ),
    "",
    "## Metodología de trabajo",
    ...method.map(([title, desc], i) => `${i + 1}. **${title}**: ${desc}`),
    "",
    "## Casos de portafolio en línea",
    ...portfolio.map(
      (p) => `- **${p.name}** (${p.segment}) — https://${p.url}: ${p.desc}`,
    ),
    "",
    "## Artículos del Blog",
    ...posts.map(
      (p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.excerpt}`,
    ),
    "",
    "## Mintcode Academy (Guías educativas de marketing digital)",
    ...trilhas.map(
      (t) => `- [Ruta ${t.name}](${base}/academy/${t.slug}): ${t.desc}`,
    ),
    ...articles.map(
      (a) =>
        `- [${a.title}](${base}/academy/${a.trilha}/${a.slug}): ${a.lead}`,
    ),
    "",
    "## Glosario de Marketing Digital",
    `- [Glosario A–Z completo](${base}/academy/glosario)`,
    ...glossary.map((g) => `- **${g.term}**: ${g.def}`),
    "",
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
