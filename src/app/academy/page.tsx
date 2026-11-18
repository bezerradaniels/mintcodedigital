import type { Metadata } from "next";
import { PageShell } from "@/lib/pageShell";
import { academyIndexContent } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Academy: aprende marketing digital desde cero",
  description:
    "Términos, canales y métricas de marketing digital explicados de forma simple: rutas de aprendizaje, glosario de la A a la Z y artículos prácticos.",
  alternates: { canonical: "/academy" },
};

export default function AcademyIndexPage() {
  const content = academyIndexContent();
  return <PageShell {...content} />;
}
