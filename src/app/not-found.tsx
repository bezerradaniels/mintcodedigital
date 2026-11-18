import type { Metadata } from "next";
import { PageShell } from "@/lib/pageShell";
import { notFoundPageContent } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o cambió de dirección.",
  robots: { index: false },
};

export default function NotFound() {
  const content = notFoundPageContent();
  return <PageShell {...content} />;
}
