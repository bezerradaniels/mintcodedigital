import { site, services } from "@/content/site";
import { header, footer, sprite } from "./components";
import { contactModal } from "./forms";
import { absUrl } from "./util";

export interface PageShellProps {
  active?: string;
  variant?: "light" | "dark";
  main: string;
  footerHtml?: string;
  schema?: Record<string, unknown>[];
}

const base = site.url.replace(/\/$/, "");

const globalGraph: Record<string, unknown>[] = [
  {
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${base}/#organization`,
    name: site.name,
    url: base,
    description: site.tagline,
    logo: {
      "@type": "ImageObject",
      "@id": `${base}/#logo`,
      url: absUrl(site.url, "/assets/brand/logo-horizontal-positivo.svg"),
      contentUrl: absUrl(site.url, "/assets/brand/logo-horizontal-positivo.svg"),
      caption: site.name,
    },
    image: absUrl(site.url, "/assets/og-image.jpg"),
    email: site.contact.email,
    telephone: `+${site.contact.whatsappNumber}`,
    sameAs: [site.contact.instagramUrl],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+${site.contact.whatsappNumber}`,
        email: site.contact.email,
        contactType: "sales",
        availableLanguage: ["es", "pt"],
      },
    ],
    knowsAbout: [
      "Creación de sitios web",
      "Diseño y desarrollo web",
      "Landing pages",
      "Tiendas virtuales",
      "Tráfico pago",
      "Google Ads",
      "Performance Max",
      "Meta Ads",
      "SEO",
      "SEO Técnico",
      "AEO (Answer Engine Optimization)",
      "GEO (Generative Engine Optimization)",
      "Marketing Digital",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Marketing Digital y Desarrollo Web",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.long,
          url: absUrl(site.url, `/servicios/${s.slug}`),
        },
      })),
    },
  },
  {
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: site.name,
    description: site.tagline,
    inLanguage: "es",
    publisher: { "@id": `${base}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base}/academy/glosario?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
];

export function PageShell({
  active = "",
  variant = "light",
  main,
  footerHtml,
  schema = [],
}: PageShellProps) {
  const html = [
    sprite,
    `<a class="skip-link" href="#conteudo">Saltar al contenido</a>`,
    header({ active, variant }),
    `<main id="conteudo">${main}</main>`,
    footerHtml ?? footer(),
    contactModal(),
  ].join("\n");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [...globalGraph, ...schema],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
