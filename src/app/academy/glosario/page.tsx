import type { Metadata } from "next";
import { PageShell } from "@/lib/pageShell";
import { glossaryPageContent } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Glosario de marketing digital de la A a la Z",
  description:
    "Glosario de marketing digital: CPC, CTR, ROAS, CPA, SEO, píxel, landing page y otros términos explicados de forma simple.",
  alternates: { canonical: "/academy/glosario" },
};

export default function GlossaryPage() {
  const content = glossaryPageContent();
  return <PageShell {...content} />;
}
