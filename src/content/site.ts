// Contenido y configuración global del sitio (Español Latino, sin mención de localidades).

export const site = {
  name: "Mintcode",
  url: "https://mintcode.digital",
  locale: "es_419",
  lang: "es",
  tagline: "Sitios web, tráfico pago y SEO para empresas que buscan crecer.",
  year: 2026,

  contact: {
    whatsappDisplay: "+55 (77) 9 9211-6008",
    whatsappNumber: "5577992116008",
    email: "contato@mintcode.com.br",
    instagramHandle: "@mintcode.devs",
    instagramUrl: "https://instagram.com/mintcode.devs",
    hours: "Lun. a vie., 8h a 18h",
  },

  analytics: {
    // ID del contenedor de Google Tag Manager.
    gtmId: "GTM-TDFVMKJH",
    // ID de medición de GA4.
    ga4Id: "G-97RQ2P9J91",
  },

  forms: {
    contactEndpoint: "/api/send-lead",
    newsletterEndpoint: "",
  },
};

export const nav = [
  { label: "Servicios", href: "/servicios", key: "servicios" },
  { label: "Portafolio", href: "/#portafolio", key: "portafolio" },
  { label: "Blog", href: "/blog", key: "blog" },
  { label: "Academy", href: "/academy", key: "academy" },
  { label: "Contacto", href: "/contacto", key: "contacto" },
];

export const gradientCta = "Tengo interés";

export interface ServiceItem {
  slug: string;
  n: string;
  name: string;
  short: string;
  long: string;
  bullets: string[];
  checks: string[];
  homeLink: string;
  seoTitle: string;
  seoDescription: string;
  heroEyebrow: string;
  h1: [string, string];
  sub: string;
  included: string[];
  typesTitle: string;
  typesH2: string;
  types: [string, string][];
  showPortfolio: boolean;
  process?: [string, string][];
  faq: [string, string][];
  cta: [string, string];
}

// ---------------------------------------------------------------- Servicios
export const services: ServiceItem[] = [
  {
    slug: "creacion-de-sitios-web",
    n: "01",
    name: "Creación de sitios web",
    short: "Páginas rápidas, claras y listas para convertir en cualquier pantalla.",
    long: "Sitios institucionales, landing pages y tiendas virtuales rápidos, claros y pensados para convertir desde el celular.",
    bullets: [
      "Landing pages y sitios institucionales",
      "Tiendas virtuales",
      "Sitios rápidos y optimizados para celular",
    ],
    checks: [
      "Diseño exclusivo para tu marca",
      "WhatsApp y formularios integrados",
      "SEO técnico desde el primer día",
    ],
    homeLink: "Quiero un sitio →",
    seoTitle: "Creación de sitios web profesionales",
    seoDescription:
      "Creación de sitios institucionales, landing pages y tiendas virtuales. Rápidos, pensados primero para el celular y con WhatsApp a un toque.",
    heroEyebrow: "Creación de sitios web",
    h1: ["Sitios que transforman visitas en ", "clientes."],
    sub: "Creamos sitios rápidos y atractivos, pensados primero para el celular y con WhatsApp a un toque.",
    included: [
      "Diseño exclusivo para tu marca",
      "Versión completa para celular",
      "WhatsApp y formularios integrados",
      "SEO técnico y velocidad optimizada",
      "Dominio y hosting configurados",
      "Panel de métricas de visitas y contactos",
    ],
    typesTitle: "Tipos de sitio",
    typesH2: "El formato adecuado para cada objetivo.",
    types: [
      [
        "Sitio institucional",
        "Presenta tu empresa, tus servicios y transmite confianza a quien investiga antes de comprar.",
      ],
      [
        "Landing page",
        "Una página enfocada en una sola oferta, ideal para campañas de tráfico pago.",
      ],
      [
        "Tienda virtual",
        "Catálogo, carrito y pagos en línea para vender todos los días.",
      ],
    ],
    showPortfolio: true,
    faq: [
      [
        "¿Cuánto tiempo tarda en estar listo el sitio?",
        "Depende del tamaño del proyecto. En la reunión inicial definimos el cronograma y acompañas cada etapa.",
      ],
      [
        "¿Voy a poder editar el sitio después?",
        "Sí. Acordamos en la reunión cómo prefieres actualizar textos e imágenes: con un panel simple o pidiéndolo a nuestro equipo.",
      ],
      [
        "¿Se encargan del dominio y el hosting?",
        "Sí. Configuramos dominio, hosting y certificado de seguridad, y dejamos todo a tu nombre.",
      ],
      [
        "¿El sitio ya viene preparado para Google?",
        "Sí. Estructura de títulos, velocidad, versión móvil y datos estructurados se incluyen en cada proyecto para que el sitio nazca listo para ser encontrado.",
      ],
    ],
    cta: [
      "¿Creamos tu nuevo sitio web?",
      "Solicita una reunión y recibe un diagnóstico de tu sitio, tus anuncios y tus búsquedas.",
    ],
  },
  {
    slug: "trafico-pago",
    n: "02",
    name: "Tráfico pago",
    short: "Campañas de performance medidas por ingresos, no por clics.",
    long: "Campañas en Google y Meta medidas por ventas y contactos reales, no solo por clics.",
    bullets: [
      "Google Ads y Performance Max",
      "Meta Ads",
      "Reporte de performance",
    ],
    checks: [
      "Google Ads y Performance Max",
      "Meta Ads (Instagram y Facebook)",
      "Reporte mensual de resultados",
    ],
    homeLink: "Quiero anunciar →",
    seoTitle: "Tráfico pago, Google Ads y Meta Ads",
    seoDescription:
      "Gestión de tráfico pago: Google Ads, Performance Max y Meta Ads con campañas medidas por ventas y contactos, no por clics.",
    heroEyebrow: "Tráfico pago",
    h1: ["Anuncios que traen ", "clientes, no solo clics."],
    sub: "Campañas en Google y Meta configuradas para medir lo que importa: contactos, citas y ventas.",
    included: [
      "Google Ads y Performance Max",
      "Meta Ads en Instagram y Facebook",
      "Metas de conversión: WhatsApp, llamadas y formularios",
      "Segmentación precisa para tu público ideal",
      "Creatividades y textos de los anuncios",
      "Reporte mensual de resultados",
    ],
    typesTitle: "Canales",
    typesH2: "Cada canal con un rol claro.",
    types: [
      [
        "Google Ads",
        "Aparece ante quien ya está buscando lo que vendes, en el momento exacto en que lo busca.",
      ],
      [
        "Meta Ads",
        "Presenta tu empresa a quienes aún no te conocen, con imagen y video en Instagram y Facebook.",
      ],
      [
        "Remarketing",
        "Trae de vuelta a quienes visitaron tu sitio y todavía no se pusieron en contacto.",
      ],
    ],
    showPortfolio: false,
    process: [
      [
        "Cuenta y medición",
        "Organizamos la cuenta, el píxel y las metas de conversión antes de invertir el primer dólar.",
      ],
      [
        "Campañas al aire",
        "Lanzamos campañas por objetivo, con presupuesto de prueba y segmentación enfocada en tu público.",
      ],
      [
        "Optimización semanal",
        "Ajustamos términos, públicos y creatividades según lo que genera contactos reales.",
      ],
      [
        "Reporte mensual",
        "Recibes un resumen claro: cuánto invertiste, cuántos contactos llegaron y cuánto costó cada uno.",
      ],
    ],
    faq: [
      [
        "¿Cuánto necesito invertir en anuncios?",
        "Depende de tu mercado y de tu meta. En la reunión inicial estimamos un presupuesto de prueba y te mostramos cómo medir el retorno.",
      ],
      [
        "¿El valor de los anuncios está incluido en el servicio?",
        "No. El monto invertido en las plataformas se paga directamente a Google y Meta desde tu propia cuenta. La gestión es un servicio independiente.",
      ],
      [
        "¿En cuánto tiempo veo resultados?",
        "Los primeros contactos suelen llegar en las primeras semanas, pero las campañas ganan estabilidad tras un período de pruebas y ajustes.",
      ],
      [
        "¿Necesito tener un sitio web para anunciar?",
        "Lo ideal es contar con un sitio o landing page rápida y preparada para recibir al visitante. Si aún no tienes, podemos crearlo junto con las campañas.",
      ],
    ],
    cta: [
      "¿Ponemos tu empresa frente a quienes compran?",
      "Solicita una reunión y recibe un diagnóstico de tu sitio, tus anuncios y tus búsquedas.",
    ],
  },
  {
    slug: "seo",
    n: "03",
    name: "SEO",
    short: "Tu marca encontrada en las búsquedas y en las respuestas de IA.",
    long: "Tu empresa encontrada cuando alguien busca en Google o en asistentes de IA lo que tú vendes.",
    bullets: [
      "SEO técnico y contenido",
      "Posicionamiento y Perfil de Negocio en Google",
      "Optimización para respuestas de IA",
    ],
    checks: [
      "SEO y Perfil de Negocio en Google",
      "Contenido optimizado",
      "Optimización para respuestas de IA",
    ],
    homeLink: "Quiero aparecer →",
    seoTitle: "SEO y posicionamiento en buscadores e IA",
    seoDescription:
      "SEO técnico, contenido estratégico y optimización para respuestas de IA. Haz que tu empresa sea encontrada cuando buscan lo que vendes.",
    heroEyebrow: "SEO",
    h1: ["Sé encontrado cuando alguien ", "busca lo que ofreces."],
    sub: "SEO técnico, contenido y optimización para respuestas de IA, para que tu empresa aparezca sin depender solo de anuncios.",
    included: [
      "Auditoría técnica del sitio",
      "Optimización del Perfil de Negocio en Google",
      "Investigación de palabras clave de tu sector",
      "Contenido optimizado para buscadores y respuestas de IA",
      "Datos estructurados (schema) y velocidad",
      "Reporte mensual de posiciones y visitas",
    ],
    typesTitle: "Frentes de SEO",
    typesH2: "Tres frentes que se suman.",
    types: [
      [
        "Presencia en Google y Maps",
        "Perfil de Negocio en Google, reseñas y páginas pensadas para captar clientes con alta intención de compra.",
      ],
      [
        "SEO técnico",
        "Velocidad, estructura e indexación para que Google entienda y muestre bien tu sitio.",
      ],
      [
        "Contenido e IA",
        "Textos que responden a las preguntas de tus clientes y son citados en las respuestas de IA.",
      ],
    ],
    showPortfolio: false,
    process: [
      [
        "Auditoría",
        "Verificamos qué impide que el sitio aparezca: aspectos técnicos, contenido y autoridad.",
      ],
      [
        "Plan de palabras clave",
        "Listamos los términos que tus clientes realmente buscan y priorizamos por oportunidad de negocio.",
      ],
      [
        "Ajustes y contenido",
        "Corregimos el sitio, optimizamos tu presencia en Google y publicamos contenido útil.",
      ],
      [
        "Seguimiento",
        "Medimos posiciones, visitas y contactos provenientes de las búsquedas, mes a mes.",
      ],
    ],
    faq: [
      [
        "¿En cuánto tiempo da resultados el SEO?",
        "El SEO es un trabajo de construcción. Las mejoras técnicas pueden notarse en semanas, pero el crecimiento constante suele tomar algunos meses.",
      ],
      [
        "¿SEO o anuncios: cuál es mejor?",
        "Uno no reemplaza al otro. Los anuncios traen resultados rápidos mientras inviertes; el SEO construye una presencia que sigue atrayendo visitas con el tiempo.",
      ],
      [
        "¿Qué significa optimizar para respuestas de IA?",
        "Es organizar el contenido del sitio con respuestas claras, datos confiables y estructura que herramientas como Google y los asistentes de IA puedan entender y citar.",
      ],
      [
        "¿Garantizan la primera posición en Google?",
        "Nadie puede garantizar una posición fija. Trabajamos con las mejores prácticas y medimos la evolución en visitas, contactos y posiciones con total transparencia.",
      ],
    ],
    cta: [
      "¿Quieres ser encontrado en las búsquedas?",
      "Solicita una reunión y recibe un diagnóstico de tu sitio, tus anuncios y tus búsquedas.",
    ],
  },
];

export const method: [string, string, string][] = [
  [
    "Diagnóstico",
    "Auditamos sitio web, anuncios y búsquedas para encontrar dónde se escapa la facturación.",
    "Auditamos sitio, anuncios y búsquedas.",
  ],
  [
    "Estrategia",
    "Definimos metas, canales y presupuesto enfocados en tu mercado y tus objetivos.",
    "Metas, canales y presupuesto definidos.",
  ],
  [
    "Execución",
    "Sitio web, campañas y contenido al aire, en ciclos cortos.",
    "Todo al aire en ciclos cortos.",
  ],
  [
    "Medición",
    "Un panel claro muestra de dónde viene cada venta.",
    "Un panel muestra cada venta.",
  ],
];

// Corregimos "Execución" -> "Ejecución":
method[2][0] = "Ejecución";

// --------------------------------------------------------------- Portafolio
export const clients = [
  { name: "Hazak Fit", src: "/assets/clients/hazak-fit.svg", scale: 1.8, w: 120, h: 72 },
  { name: "Clínica SIM", src: "/assets/clients/clinica-sim.webp", w: 86, h: 112 },
  { name: "Dra. Ane Elise", src: "/assets/clients/dra-ane-elise.webp", w: 188, h: 112 },
  { name: "Bora pra Lapa", src: "/assets/clients/bora-pra-lapa.svg", w: 160, h: 72 },
  { name: "Flip Soluções em Design", src: "/assets/clients/flip.webp", w: 360, h: 360 },
  { name: "BR Cleaning Services", src: "/assets/clients/br-cleaning.png", w: 133, h: 64 },
  { name: "InovaPrint", src: "/assets/clients/inovaprint.png", w: 133, h: 64 },
  { name: "HVB · Hospital Veterinário Brasília", src: "/assets/clients/hvb.png", w: 133, h: 64 },
  { name: "Bike Registrada", src: "/assets/clients/bike-registrada.png", w: 133, h: 64 },
  { name: "Cabeed", src: "/assets/clients/cabeed.png", w: 133, h: 64 },
  { name: "Juninho Personal Trainer", src: "/assets/clients/juninho-personal.png", w: 133, h: 64 },
  { name: "Amenities na Web", src: "/assets/clients/amenities-na-web.png", w: 133, h: 64 },
];

export const portfolio = [
  {
    n: "01",
    name: "Hazak Fit",
    segment: "Gimnasio",
    desc: "Diseño oscuro y energético, con inscripción y planes a un toque en el celular.",
    tags: ["Sitio institucional", "Planes e inscripción"],
    url: "hazakfit.com.br",
    img: "/assets/portfolio/hazak-fit.webp",
    alt: "Sitio Hazak Fit en laptop y celular",
    bg: "radial-gradient(70% 80% at 70% 30%,rgba(255,214,0,.28),transparent 70%),#0B0D12",
  },
  {
    n: "02",
    name: "Clínica SIM",
    segment: "Clínica médica",
    desc: "Especialidades organizadas y agendamiento directo por WhatsApp.",
    tags: ["Sitio institucional", "Citas por WhatsApp"],
    url: "simbjl.com.br",
    img: "/assets/portfolio/clinica-sim.webp",
    alt: "Sitio Clínica SIM en laptop y celular",
    bg: "radial-gradient(70% 80% at 70% 20%,rgba(15,150,130,.22),transparent 70%),#EEF6F5",
  },
  {
    n: "03",
    name: "Dra. Ane Elise",
    segment: "Odontología",
    desc: "Diseño cálido que presenta a la doctora y convierte visitas en consultas.",
    tags: ["Sitio profesional", "Captación de pacientes"],
    url: "draaneelise.com.br",
    img: "/assets/portfolio/dra-ane-elise.webp",
    alt: "Sitio Dra. Ane Elise en laptop y celular",
    bg: "radial-gradient(70% 80% at 70% 20%,rgba(120,40,60,.18),transparent 70%),#F8F1F2",
  },
];

export const cases = {
  enabled: false,
  label: "Caso · Retail",
  big: "+48%",
  bigCaption: "de tráfico orgánico en seis meses",
  quote: "Por primera vez sabemos de dónde viene cada venta.",
  author: "Nombre Apellido · Cargo, Empresa",
  metrics: [
    ["+38%", "leads calificados"],
    ["5,2×", "retorno sobre inversión publicitaria"],
  ] as [string, string][],
};
