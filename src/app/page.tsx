import type { Metadata } from "next";
import ReactDOM from "react-dom";
import { PageShell } from "@/lib/pageShell";
import { homePageContent } from "@/lib/pages";

export const metadata: Metadata = {
  title: {
    absolute: "Mintcode | Agencia de creación de sitios, tráfico pago y SEO",
  },
  description:
    "Creamos sitios web enfocados en generar más conversiones, ingresos y contactos. Diseño atractivo, tráfico pago en Google y Meta Ads, y SEO / GEO.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  ReactDOM.preload("/assets/hero-mintcode.webp", {
    as: "image",
    imageSrcSet:
      "/assets/hero-mintcode-sm.webp 900w, /assets/hero-mintcode.webp 1600w",
    imageSizes: "100vw",
    fetchPriority: "high",
  });
  const content = homePageContent();
  return <PageShell {...content} />;
}
