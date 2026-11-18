/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    agentUpgrade: "security",
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/servicos", destination: "/servicios", permanent: true },
      { source: "/servicos/criacao-de-sites", destination: "/servicios/creacion-de-sitios-web", permanent: true },
      { source: "/servicos/trafego-pago", destination: "/servicios/trafico-pago", permanent: true },
      { source: "/servicos/seo", destination: "/servicios/seo", permanent: true },
      { source: "/contato", destination: "/contacto", permanent: true },
      { source: "/academy/glossario", destination: "/academy/glosario", permanent: true },
    ];
  },
};

export default nextConfig;
