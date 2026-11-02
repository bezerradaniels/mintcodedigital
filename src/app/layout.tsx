import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Mintcode · Crecimiento que se mide. Y se celebra.",
  description:
    "Sitios web, SEO, AEO, GEO, medios pagos y BI para empresas de toda América Latina.",
};

export const viewport: Viewport = {
  themeColor: "#FFF4E4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${jakarta.variable} ${jetbrains.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
