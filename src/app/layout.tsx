import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import { SiteBehaviors } from "@/components/SiteBehaviors";
import "./globals.css";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Mintcode | Agencia de creación de sitios, tráfico pago y SEO",
    template: "%s | Mintcode",
  },
  description:
    "Agencia de creación de sitios web, tráfico pago y SEO. Diseño atractivo y tecnología de punta para que tu negocio genere más conversiones, ingresos y contactos.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Marketing Digital y Desarrollo Web",
  keywords: [
    "creación de sitios web",
    "diseño web",
    "landing page",
    "tráfico pago",
    "Google Ads",
    "Performance Max",
    "Meta Ads",
    "SEO",
    "GEO",
    "AEO",
    "agencia digital",
    "marketing digital",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
    url: site.url,
    title: "Mintcode | Agencia de creación de sitios, tráfico pago y SEO",
    description:
      "Creamos sitios web enfocados en generar más conversiones, campañas de tráfico pago en Google y Meta Ads, y posicionamiento SEO y GEO.",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mintcode — Sitios web, tráfico pago y SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mintcode | Agencia de creación de sitios, tráfico pago y SEO",
    description:
      "Creamos sitios web enfocados en generar más conversiones, tráfico pago y SEO.",
    images: ["/assets/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#06080D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = /^GTM-[A-Z0-9]+$/.test(site.analytics.gtmId)
    ? site.analytics.gtmId
    : "";

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONT_URL} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM Full Documentation" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function s(){var y=window.scrollY||document.documentElement.scrollTop||document.body.scrollTop||0;document.documentElement.classList.toggle('is-scrolled',y>20);}window.addEventListener('scroll',s,{passive:true});document.addEventListener('scroll',s,{passive:true,capture:true});s();})();`,
          }}
        />
        {gtmId ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];(function(w,d,s,l,i){w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        ) : null}
      </head>
      <body>
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="GTM"
            />
          </noscript>
        ) : null}
        {children}
        <SiteBehaviors />
      </body>
    </html>
  );
}
