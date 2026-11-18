import type { Metadata } from "next";
import { PageShell } from "@/lib/pageShell";
import { thanksPageContent } from "@/lib/pages";

export const metadata: Metadata = {
  title: "¡Gracias! Recibimos tu solicitud",
  description:
    "Recibimos tu solicitud de contacto. Muy pronto nos pondremos en contacto contigo.",
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  const content = thanksPageContent();
  return <PageShell {...content} />;
}
