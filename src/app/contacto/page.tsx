import type { Metadata } from "next";
import { PageShell } from "@/lib/pageShell";
import { contactPageContent } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Contacto y solicitud de diagnóstico",
  description:
    "Habla con Mintcode: solicita una reunión por videollamada o WhatsApp y cuéntanos sobre tu proyecto de sitio web, tráfico pago o SEO.",
  alternates: { canonical: "/contacto" },
};

export default function ContactPage() {
  const content = contactPageContent();
  return <PageShell {...content} />;
}
