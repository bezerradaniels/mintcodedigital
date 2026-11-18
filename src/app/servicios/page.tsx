import type { Metadata } from "next";
import { PageShell } from "@/lib/pageShell";
import { servicesPageContent } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Servicios de sitios web, tráfico pago y SEO",
  description:
    "Creación de sitios web, tráfico pago y SEO para empresas que buscan crecer. Sitio, anuncios y búsqueda trabajando juntos, con reporte de resultados.",
  alternates: { canonical: "/servicios" },
};

export default function ServicesPage() {
  const content = servicesPageContent();
  return <PageShell {...content} />;
}
