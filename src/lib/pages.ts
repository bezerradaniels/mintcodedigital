import {
  site,
  services,
  method,
  clients,
  portfolio,
  cases,
  type ServiceItem,
} from "../content/site";
import { posts, blogCategories, type BlogPost } from "../content/blog";
import {
  trilhas,
  articles,
  glossary,
  startHere,
  popularSearches,
  popularGlossary,
  type Trilha,
  type AcademyArticle,
} from "../content/academy";
import {
  btn,
  ghostBtn,
  footerSimple,
  eyebrow,
  ctaBand,
  breadcrumb,
  faq,
  checkDot,
  cover,
  postCard,
  categoryOf,
  waLink,
} from "./components";
import {
  esc,
  slugify,
  fmtDate,
  readTime,
  gradTitle,
  headingsOf,
  absUrl,
} from "./util";
import { homeForm, contactForm, newsletter } from "./forms";

const base = site.url.replace(/\/$/, "");

const cardG = (inner: string, extra = ""): string =>
  `<div class="card-g ${extra}"><div class="card-g-in">${inner}</div></div>`;

const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: it.name,
    item: absUrl(site.url, it.path),
  })),
});

// ===================================================================== HOME
const HERO_WORDS = ["conversiones.", "ingresos.", "contactos.", "impacto."];

const hero = (): string => `<section class="hero" id="topo">
  <img class="hero-img" src="/assets/hero-mintcode.webp" srcset="/assets/hero-mintcode-sm.webp 900w, /assets/hero-mintcode.webp 1600w" sizes="100vw" width="1600" height="900" alt="" fetchpriority="high" decoding="async">
  <div class="hero-overlay" aria-hidden="true"></div>
  <div class="hero-body">
    <span class="hero-pill">Creación de Sitios</span>
    <h1>Creamos sitios web enfocados en generar más <span class="hero-rotator" data-word-rotator data-words="${HERO_WORDS.join("|")}"><span class="hero-rotator__word grad-brand is-active">${esc(HERO_WORDS[0])}</span></span></h1>
    <p>Diseño atractivo y tecnología de punta para que tu negocio crezca sin límites las 24 horas.</p>
    <div class="hero-actions">${btn({ href: "#contacto", label: "Quiero un presupuesto" })}</div>
  </div>
</section>`;

const clientsSection = (): string => {
  const renderGroup = (hidden: boolean) =>
    `<ul class="logos-group"${hidden ? ' aria-hidden="true"' : ""}>${clients
      .map((c) => {
        return `<li class="logos-item"><img src="${c.src}" alt="${hidden ? "" : esc(c.name)}" width="${c.w}" height="${c.h}" loading="lazy" decoding="async"${hidden ? ' fetchpriority="low"' : ""}${c.scale ? ` style="transform:scale(${c.scale})"` : ""}></li>`;
      })
      .join("")}</ul>`;

  return `<section class="clients" id="clientes" aria-labelledby="clientes-title">
  <div class="wrap clients-in">
    <h2 id="clientes-title" class="h2-md">Quienes buscan <span class="grad-text">crecer online</span> ya trabajan con nosotros.</h2>
    <div class="logos-marquee" role="region" aria-label="Clientes de Mintcode">
      <div class="logos-track">
        ${renderGroup(false)}
        ${renderGroup(true)}
      </div>
    </div>
  </div>
</section>`;
};

const servicesSection = (): string => `<section class="section aurora" id="servicios" aria-labelledby="servicios-title">
  <div class="wrap stack-lg">
    <div class="head">${eyebrow("Servicios")}<h2 id="servicios-title" class="h2">Tres frentes, <span class="grad-text">una regla de resultado.</span></h2><p class="lead">Sitio web, anuncios y búsquedas trabajan juntos. Sigues todo en un solo reporte.</p></div>
    <div class="grid-auto grid-auto--290">${services
      .map((s) =>
        cardG(
          `<span class="eyebrow">${s.n}</span><h3 class="h3">${s.name}</h3><p class="muted">${s.short}</p>
<ul class="bullets">${s.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
<a class="card-link" href="/servicios/${s.slug}">${s.homeLink}</a>`,
          "card-g--service",
        ),
      )
      .join("")}</div>
  </div>
</section>`;

const methodSection = (): string => `<section class="section section--soft" id="metodo" aria-labelledby="metodo-title">
  <div class="wrap stack-lg">
    <div class="head">${eyebrow("Método")}<h2 id="metodo-title" class="h2">Cuatro pasos, del diagnóstico a la venta.</h2></div>
    <ol class="steps">${method
      .map(
        ([t, d], i) =>
          `<li><span class="step-bar" style="width:${(i + 1) * 25}%"></span><span class="eyebrow">0${i + 1}</span><h3 class="h3">${t}</h3><p class="muted">${d}</p></li>`,
      )
      .join("")}</ol>
  </div>
</section>`;

const projectLink = (p: (typeof portfolio)[number]): string =>
  `<a class="btn btn--sm" href="https://${p.url}" target="_blank" rel="noopener"><span class="btn-in">Visitar ${p.url}<span class="btn-arrow" aria-hidden="true">↗</span></span></a>`;

const shot = (p: (typeof portfolio)[number]): string =>
  `<div class="shot" style="background:${p.bg}"><img src="${p.img}" alt="${esc(p.alt)}" width="1080" height="600" loading="lazy" decoding="async"></div>`;

const chips = (tags: string[]): string =>
  `<div class="chips-static">${tags.map((t) => `<span class="chip-static">${t}</span>`).join("")}</div>`;

const portfolioSection = (): string => {
  const [first, ...rest] = portfolio;
  return `<section class="section aurora aurora--alt" id="portafolio" aria-labelledby="portfolio-title">
  <div class="wrap stack-lg">
    <div class="head head--row"><div class="stack-md">${eyebrow("Portafolio")}<h2 id="portfolio-title" class="h2">Sitios que ya están <span class="grad-text">en línea.</span></h2></div><p class="lead lead--narrow">Proyectos recientes pensados primero para el celular y listos para convertir.</p></div>
    <div class="stack-cards">
      ${cardG(
        `<div class="project project--feature"><div class="project-shot">${shot(first)}</div><div class="project-info">${eyebrow(first.segment)}<h3 class="h3-xl">${first.name}</h3><p class="muted lead-sm">${first.desc}</p>${chips(first.tags)}${projectLink(first)}</div></div>`,
        "card-g--project",
      )}
      <div class="grid-auto grid-auto--400">${rest
        .map((p) =>
          cardG(
            `<div class="project project--col">${shot(p)}<div class="project-info">${eyebrow(p.segment)}<h3 class="h3-lg">${p.name}</h3><p class="muted">${p.desc}</p>${chips(p.tags)}${projectLink(p)}</div></div>`,
            "card-g--project",
          ),
        )
        .join("")}</div>
    </div>
  </div>
</section>`;
};

const casesSection = (): string =>
  !cases.enabled
    ? ""
    : `<section class="section section--night aurora aurora--dark" id="casos" aria-label="Caso de éxito">
  <div class="wrap cases">
    <div class="case-big"><span class="eyebrow eyebrow--dark">${esc(cases.label)}</span><span class="case-num grad-brand">${esc(cases.big)}</span><span class="case-caption">${esc(cases.bigCaption)}</span></div>
    <div class="case-side"><p class="case-quote">“${esc(cases.quote)}”</p><span class="case-author">${esc(cases.author)}</span><div class="rule-grad"></div>
      <div class="case-metrics">${cases.metrics.map(([n, l]) => `<div><span class="case-metric">${esc(n)}</span><span class="case-author">${esc(l)}</span></div>`).join("")}</div></div>
  </div>
</section>`;

const contactSection = (): string => `<section class="section aurora" id="contacto" aria-labelledby="contato-title">
  <div class="wrap contact-grid">
    <div class="stack-md">${eyebrow("Contacto")}<h2 id="contato-title" class="h2">¿Vamos a medir tu <span class="grad-text">crecimiento?</span></h2><p class="lead">Cuéntanos qué necesitas. Volvemos con un diagnóstico de tu sitio, tus anuncios y tus búsquedas.</p></div>
    ${homeForm()}
  </div>
</section>`;

export const homePageContent = () => ({
  variant: "dark" as const,
  main: [
    hero(),
    clientsSection(),
    servicesSection(),
    methodSection(),
    portfolioSection(),
    casesSection(),
    contactSection(),
  ].join("\n"),
  footerHtml: footerSimple(),
  schema: [
    {
      "@type": "WebPage",
      "@id": `${base}/#webpage`,
      url: `${base}/`,
      name: "Mintcode | Agencia de creación de sitios, tráfico pago y SEO",
      description:
        "Creamos sitios web enfocados en generar más conversiones, tráfico pago en Google y Meta Ads, y posicionamiento SEO y GEO para motores de búsqueda e IA.",
      isPartOf: { "@id": `${base}/#website` },
      about: { "@id": `${base}/#organization` },
      inLanguage: "es",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".hero h1", ".hero p", "#servicios-title", "#metodo-title"],
      },
    },
    {
      "@type": "HowTo",
      name: "Cómo trabajamos en Mintcode: del diagnóstico a la venta",
      description:
        "Metodología en 4 pasos para transformar tu sitio web, campañas de anuncios y posicionamiento en ventas reales.",
      step: method.map(([t, d], i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: t,
        text: d,
      })),
    },
    {
      "@type": "ItemList",
      name: "Portafolio de sitios web creados por Mintcode",
      itemListElement: portfolio.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "CreativeWork",
          name: p.name,
          description: p.desc,
          url: `https://${p.url}`,
          image: absUrl(site.url, p.img),
        },
      })),
    },
  ],
});

// ================================================================ SERVICIOS
const liCheck = (t: string): string => `<li>${checkDot}<span>${esc(t)}</span></li>`;

export const servicesPageContent = () => {
  const main = `
<section class="page-hero aurora">
  <div class="wrap stack-md">
    ${eyebrow("Servicios")}
    <h1 class="h1">Todo lo que tu empresa necesita para <span class="grad-text">vender más online.</span></h1>
    <p class="lead lead--wide">Sitio web, anuncios y búsquedas trabajando juntos, con un reporte que muestra de dónde viene cada cliente.</p>
    <div>${btn()}</div>
  </div>
</section>
<section class="section section--tight" aria-label="Lista de servicios">
  <div class="wrap">
    <ul class="service-rows">${services
      .map(
        (s) => `<li class="service-row">
      <span class="service-n">${s.n}</span>
      <div class="service-main"><h2>${s.name}</h2><p class="muted">${s.long}</p></div>
      <ul class="checks">${s.checks.map(liCheck).join("")}</ul>
      <a class="card-link service-go" href="/servicios/${s.slug}" aria-label="Ver servicio: ${s.name}">Ver servicio →</a>
    </li>`,
      )
      .join("")}</ul>
  </div>
</section>
<section class="section section--soft" aria-labelledby="como-title">
  <div class="wrap stack-lg">
    <div class="head">${eyebrow("Cómo trabajamos")}<h2 id="como-title" class="h2-md">Cuatro pasos, del diagnóstico a la venta.</h2></div>
    <ol class="steps">${method
      .map(
        ([t, , short], i) =>
          `<li><span class="step-bar" style="width:${(i + 1) * 25}%"></span><span class="eyebrow">0${i + 1}</span><h3 class="h3">${t}</h3><p class="muted">${short}</p></li>`,
      )
      .join("")}</ol>
  </div>
</section>
${ctaBand()}`;

  return {
    active: "servicios",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Servicios", path: "/servicios" },
      ]),
      {
        "@type": "CollectionPage",
        name: "Servicios de sitios web, tráfico pago y SEO",
        url: absUrl(site.url, "/servicios"),
        inLanguage: "es",
        isPartOf: { "@id": `${base}/#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: services.map((s, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: absUrl(site.url, `/servicios/${s.slug}`),
            name: s.name,
            description: s.long,
          })),
        },
      },
    ],
  };
};

const typesSection = (s: ServiceItem): string => `<section class="section section--tight" aria-labelledby="tipos-title">
  <div class="wrap stack-lg">
    <div class="head">${eyebrow(s.typesTitle)}<h2 id="tipos-title" class="h2-md">${esc(s.typesH2)}</h2></div>
    <div class="grid-auto grid-auto--290">${s.types
      .map(
        ([t, d], i) =>
          `<div class="card-g card-g--service"><div class="card-g-in"><span class="eyebrow">0${i + 1}</span><h3 class="h3">${esc(t)}</h3><p class="muted">${esc(d)}</p></div></div>`,
      )
      .join("")}</div>
  </div>
</section>`;

const portfolioStrip = (): string => `<section class="section section--soft" aria-labelledby="pf-title">
  <div class="wrap stack-lg">
    <div class="head head--row"><div class="stack-md">${eyebrow("Portafolio")}<h2 id="pf-title" class="h2-md">Sitios que ya están en línea.</h2></div><a class="card-link" href="/#portafolio">Ver todos →</a></div>
    <ul class="mockups">${portfolio
      .map(
        (p) =>
          `<li><a href="https://${p.url}" target="_blank" rel="noopener" aria-label="Visitar ${p.url} (abre en una nueva pestaña)"><div class="shot shot--sm" style="background:${p.bg}"><img src="${p.img}" alt="${esc(p.alt)}" width="1080" height="600" loading="lazy" decoding="async"></div><h3>${p.name}</h3><span class="eyebrow">${p.segment}</span></a></li>`,
      )
      .join("")}</ul>
  </div>
</section>`;

const processSection = (s: ServiceItem): string => `<section class="section section--soft" aria-labelledby="proc-title">
  <div class="wrap stack-lg">
    <div class="head">${eyebrow("Cómo funciona")}<h2 id="proc-title" class="h2-md">Del primer contacto al resultado.</h2></div>
    <ol class="steps">${(s.process ?? [])
      .map(
        ([t, d], i) =>
          `<li><span class="step-bar" style="width:${(i + 1) * 25}%"></span><span class="eyebrow">0${i + 1}</span><h3 class="h3">${esc(t)}</h3><p class="muted">${esc(d)}</p></li>`,
      )
      .join("")}</ol>
  </div>
</section>`;

export const servicePageContent = (s: ServiceItem) => {
  const main = `
<section class="page-hero aurora">
  <div class="wrap hero-split">
    <div class="stack-md">
      ${breadcrumb([{ label: "Servicios", href: "/servicios" }, { label: s.name }])}
      <h1 class="h1">${gradTitle(s.h1)}</h1>
      <p class="lead">${esc(s.sub)}</p>
      <div class="btn-row">${btn()}${ghostBtn({ href: "/#portafolio", label: "Ver portafolio", cls: "hide-sm" })}</div>
    </div>
    <div class="card-g card-g--include"><div class="card-g-in"><h2 class="h3">Qué está incluido</h2><ul class="checks checks--lg">${s.included.map(liCheck).join("")}</ul></div></div>
  </div>
</section>
${typesSection(s)}
${s.showPortfolio ? portfolioStrip() : processSection(s)}
<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq-grid">
    <div class="head">${eyebrow("Preguntas frecuentes")}<h2 id="faq-title" class="h2-md">Antes de empezar.</h2></div>
    ${faq(s.faq)}
  </div>
</section>
${ctaBand({ title: s.cta[0], text: s.cta[1] })}`;

  const url = absUrl(site.url, `/servicios/${s.slug}`);
  return {
    active: "servicios",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Servicios", path: "/servicios" },
        { name: s.name, path: `/servicios/${s.slug}` },
      ]),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: s.name,
        serviceType: s.name,
        description: s.seoDescription,
        url,
        provider: { "@id": `${base}/#organization` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Modalidades de ${s.name}`,
          itemListElement: s.types.map(([t, d]) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: t,
              description: d,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: s.faq.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "WebPage",
        url,
        name: s.seoTitle,
        description: s.seoDescription,
        inLanguage: "es",
        isPartOf: { "@id": `${base}/#website` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".h1", ".page-hero .lead", ".faq-item"],
        },
      },
    ],
  };
};

// ===================================================================== BLOG
const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
const featuredPost = sortedPosts.find((p) => p.featured) ?? sortedPosts[0];
const otherPosts = sortedPosts.filter((p) => p !== featuredPost);

export const blogIndexContent = () => {
  const main = `
<section class="page-hero aurora">
  <div class="wrap stack-md">
    ${eyebrow("Blog Mintcode")}
    <h1 class="h1">Novedades, noticias y <span class="grad-text">análisis</span> de marketing digital.</h1>
    <p class="lead lead--wide">Lo que está cambiando en Google, Meta y los buscadores, y lo que eso significa para tu empresa.</p>
  </div>
</section>
<section class="section section--tight" aria-label="Artículos">
  <div class="wrap stack-lg">
    <div class="filters" role="group" aria-label="Filtrar por categoría">
      <button class="chip is-active" type="button" data-filter="all" aria-pressed="true">Todos</button>
      ${blogCategories.map((c) => `<button class="chip" type="button" data-filter="${c.key}" aria-pressed="false">${c.label}</button>`).join("")}
    </div>
    <article class="featured">
      <a href="/blog/${featuredPost.slug}" class="featured-cover" aria-hidden="true" tabindex="-1">${cover(featuredPost.cover, "cover--wide")}</a>
      <div class="featured-body">
        <span class="tag">Destacado · ${esc(categoryOf(featuredPost.category).singular)}</span>
        <h2><a href="/blog/${featuredPost.slug}">${esc(featuredPost.title)}</a></h2>
        <p class="muted">${esc(featuredPost.excerpt)}</p>
        <span class="meta">${fmtDate(featuredPost.date)} · ${readTime(featuredPost.minutes)}</span>
        <a class="card-link" href="/blog/${featuredPost.slug}">Leer ${esc(categoryOf(featuredPost.category).singular.toLowerCase())} →</a>
      </div>
    </article>
    <hr class="divider">
    <div class="post-grid" data-post-grid data-page-size="6">${otherPosts.map(postCard).join("")}</div>
    <p class="empty" data-empty hidden>Aún no hay artículos en esta categoría.</p>
    <div class="center"><button class="btn-ghost" type="button" data-more hidden>Cargar más artículos</button></div>
    ${newsletter()}
  </div>
</section>`;

  return {
    active: "blog",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
      {
        "@type": "Blog",
        name: "Blog Mintcode",
        url: absUrl(site.url, "/blog"),
        inLanguage: "es",
        publisher: { "@id": `${base}/#organization` },
        blogPost: sortedPosts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          url: absUrl(site.url, `/blog/${p.slug}`),
        })),
      },
    ],
  };
};

export const sidebarShare = (title: string, url: string): string => `<div class="side-block"><h2 class="side-title">Compartir</h2>
  <div class="share">
    <a href="https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}" target="_blank" rel="noopener">WhatsApp</a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" target="_blank" rel="noopener">LinkedIn</a>
    <button type="button" data-copy="${esc(url)}">Enlace</button>
  </div></div>`;

export const toc = (body: string, title = "En este artículo"): string => {
  const hs = headingsOf(body);
  return hs.length
    ? `<div class="side-block"><h2 class="side-title">${title}</h2><ol class="toc">${hs.map((h) => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join("")}</ol></div>`
    : "";
};

export const postPageContent = (p: BlogPost) => {
  const cat = categoryOf(p.category);
  const url = absUrl(site.url, `/blog/${p.slug}`);
  const more = [...otherPosts, featuredPost]
    .filter((x) => x !== p)
    .sort(
      (a, b) =>
        Number(b.category === p.category) - Number(a.category === p.category) ||
        b.date.localeCompare(a.date),
    )
    .slice(0, 3);

  const main = `
<article>
<header class="article-head aurora">
  <div class="wrap-narrow stack-md center-text">
    ${breadcrumb([{ label: "Blog", href: "/blog" }, { label: cat.label }])}
    <span class="tag tag--solo">${esc(cat.singular)}</span>
    <h1 class="h1-article">${esc(p.title)}</h1>
    <p class="lead">${esc(p.excerpt)}</p>
    <div class="byline"><span class="avatar" aria-hidden="true"></span><span><b>Equipo Mintcode</b><br><span class="meta">${fmtDate(p.date)} · ${readTime(p.minutes)}</span></span></div>
  </div>
</header>
<div class="wrap-article">
  ${cover(p.cover, "cover--hero")}
  <div class="article-layout">
    <aside class="article-side" aria-label="En este artículo">
      <div class="side-sticky">${toc(p.body)}${sidebarShare(p.title, url)}</div>
    </aside>
    <div class="prose">
      ${p.body}
      <ul class="tags" aria-label="Etiquetas">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    </div>
  </div>
</div>
</article>
<section class="section section--soft" aria-labelledby="more-title">
  <div class="wrap stack-lg">
    <div class="head head--row"><h2 id="more-title" class="h2-md">Sigue leyendo</h2><a class="card-link" href="/blog">Ver blog →</a></div>
    <div class="post-grid post-grid--3">${more.map(postCard).join("")}</div>
  </div>
</section>
${ctaBand()}`;

  return {
    active: "blog",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: p.title, path: `/blog/${p.slug}` },
      ]),
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: p.title,
        description: p.excerpt,
        articleSection: cat.label,
        datePublished: p.date,
        dateModified: p.date,
        timeRequired: `PT${p.minutes}M`,
        inLanguage: "es",
        mainEntityOfPage: url,
        keywords: p.tags.join(", "),
        author: { "@type": "Organization", name: "Equipo Mintcode", url: base },
        publisher: { "@id": `${base}/#organization` },
        image: absUrl(site.url, "/assets/og-image.jpg"),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".h1-article", ".article-head .lead", ".prose h2"],
        },
      },
    ],
  };
};

// ================================================================== ACADEMY
const artKey = (a: AcademyArticle): string => `${a.trilha}/${a.slug}`;
const artUrl = (a: AcademyArticle): string => `/academy/${a.trilha}/${a.slug}`;
const byKey = Object.fromEntries(articles.map((a) => [artKey(a), a]));
const trilhaOf = (slug: string) => trilhas.find((t) => t.slug === slug);
const inTrilha = (slug: string) => articles.filter((a) => a.trilha === slug);
const countArt = (n: number): string => `${n} ${n === 1 ? "artículo" : "artículos"}`;
const glossHref = (term: string): string => `/academy/glosario#${slugify(term)}`;

export const academyIndexContent = () => {
  const searchData = [
    ...articles.map((a) => ({ t: a.title, k: "Artículo", u: artUrl(a), d: a.lead })),
    ...glossary.map((g) => ({
      t: g.term,
      k: "Glosario",
      u: g.article ? `/academy/${g.article}` : glossHref(g.term),
      d: g.def,
    })),
  ];

  const main = `
<section class="academy-hero aurora aurora--dark">
  <div class="wrap stack-md">
    <span class="eyebrow eyebrow--dark">Mintcode Academy</span>
    <h1 class="h1 h1--dark">Aprende marketing digital <span class="grad-brand">desde cero.</span></h1>
    <p class="lead lead--dark lead--wide">Términos, canales y métricas explicados de forma simple, para que entiendas qué sucede en tu negocio online.</p>
    <div class="search" data-search>
      <form class="search-form" role="search" action="/academy/glosario" autocomplete="off">
        <label class="sr-only" for="academy-q">Buscar un término</label>
        <input id="academy-q" name="q" type="search" placeholder="Buscar un término, como “ROAS”" autocomplete="off" aria-controls="academy-results" aria-expanded="false">
        <button type="submit" class="search-btn">Buscar</button>
      </form>
      <ul class="search-results" id="academy-results" role="listbox" hidden></ul>
      <script type="application/json" id="academy-index">${JSON.stringify(searchData).replace(/</g, "\\u003c")}</script>
    </div>
    <div class="popular"><span class="sr-only">Búsquedas populares:</span>${popularSearches.map((t) => `<button type="button" class="chip chip--dark" data-term="${esc(t)}">${esc(t)}</button>`).join("")}</div>
  </div>
</section>

<section class="section" aria-labelledby="trilhas-title">
  <div class="wrap stack-lg">
    <div class="head">${eyebrow("Rutas de aprendizaje")}<h2 id="trilhas-title" class="h2-md">Elige por dónde empezar.</h2></div>
    <div class="grid-3">${trilhas
      .map((t) =>
        cardG(
          `<div class="trilha-top"><span class="eyebrow">${t.n}</span><span class="eyebrow">${countArt(inTrilha(t.slug).length)}</span></div><h3 class="h3">${t.name}</h3><p class="muted">${t.desc}</p><a class="card-link" href="/academy/${t.slug}">Ver ruta →</a>`,
          "card-g--trilha",
        ),
      )
      .join("")}
      <div class="trilha-dark aurora aurora--dark"><h3 class="h3">¿No sabes por dónde empezar?</h3><p>Comienza por Fundamentos. Son ${inTrilha("fundamentos").length} artículos cortos.</p><a class="card-link card-link--dark" href="/academy/fundamentos">Empezar ahora →</a></div>
    </div>
  </div>
</section>

<section class="section section--soft" aria-labelledby="start-title">
  <div class="wrap start-grid">
    <div class="head">${eyebrow("Empieza por aquí")}<h2 id="start-title" class="h2-md">Primeros pasos en marketing digital.</h2><p class="lead">Cinco lecturas rápidas que explican la base de todo.</p></div>
    <ol class="start-list">${startHere
      .map((k, i) => {
        const a = byKey[k];
        return `<li><a href="${artUrl(a)}"><span class="start-n">${i + 1}</span><span class="start-t">${esc(a.title)}</span><span class="muted">${a.minutes} min</span></a></li>`;
      })
      .join("")}</ol>
  </div>
</section>

<section class="section" aria-labelledby="gloss-title">
  <div class="wrap stack-lg">
    <div class="head head--row"><div class="stack-md">${eyebrow("Glosario")}<h2 id="gloss-title" class="h2-md">Términos más buscados.</h2></div><a class="card-link" href="/academy/glosario">Ver glosario A–Z →</a></div>
    <ul class="gloss-grid">${popularGlossary
      .map((term) => glossary.find((g) => g.term === term))
      .filter((g): g is NonNullable<typeof g> => Boolean(g))
      .map(
        (g) =>
          `<li><a class="gloss-card" href="${g.article ? `/academy/${g.article}` : glossHref(g.term)}"><b>${esc(g.term)}</b><span>${esc(g.def)}</span></a></li>`,
      )
      .join("")}</ul>
  </div>
</section>
${ctaBand({ title: "¿Prefieres que lo hagamos por ti?", text: "Nuestro equipo se encarga de tu sitio web, tus anuncios y tu SEO." })}`;

  return {
    active: "academy",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Academy", path: "/academy" },
      ]),
      {
        "@type": "CollectionPage",
        name: "Mintcode Academy: Aprende marketing digital desde cero",
        url: absUrl(site.url, "/academy"),
        inLanguage: "es",
        isPartOf: { "@id": `${base}/#website` },
        hasPart: trilhas.map((t) => ({
          "@type": "Course",
          name: `Ruta ${t.name}`,
          description: t.desc,
          url: absUrl(site.url, `/academy/${t.slug}`),
          provider: { "@id": `${base}/#organization` },
        })),
      },
    ],
  };
};

export const trilhaPageContent = (t: Trilha) => {
  const list = inTrilha(t.slug);
  const main = `
<section class="page-hero aurora">
  <div class="wrap stack-md">
    ${breadcrumb([{ label: "Academy", href: "/academy" }, { label: t.name }])}
    <h1 class="h1">${esc(t.name)} <span class="grad-text">en la práctica.</span></h1>
    <p class="lead lead--wide">${esc(t.desc)} ${countArt(list.length)} para leer a tu propio ritmo.</p>
  </div>
</section>
<section class="section section--tight" aria-label="Artículos de la ruta">
  <div class="wrap">
    <ol class="trilha-list">${list
      .map(
        (a, i) =>
          `<li><a href="${artUrl(a)}"><span class="start-n">${i + 1}</span><span class="trilha-item"><b>${esc(a.title)}</b><span class="muted">${esc(a.lead)}</span></span><span class="meta">${esc(a.level)} · ${a.minutes} min</span></a></li>`,
      )
      .join("")}</ol>
  </div>
</section>
${ctaBand({ title: "¿Prefieres que lo hagamos por ti?", text: "Nuestro equipo se encarga de tu sitio web, tus anuncios y tu SEO." })}`;

  return {
    active: "academy",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Academy", path: "/academy" },
        { name: t.name, path: `/academy/${t.slug}` },
      ]),
      {
        "@type": "Course",
        name: `Ruta ${t.name} | Mintcode Academy`,
        description: t.desc,
        url: absUrl(site.url, `/academy/${t.slug}`),
        inLanguage: "es",
        provider: { "@id": `${base}/#organization` },
        hasPart: list.map((a, idx) => ({
          "@type": "LearningResource",
          position: idx + 1,
          name: a.title,
          description: a.lead,
          url: absUrl(site.url, artUrl(a)),
        })),
      },
    ],
  };
};

const formulaBox = ([label, expr]: [string, string]): string =>
  `<div class="formula aurora aurora--dark"><span class="eyebrow eyebrow--dark">${esc(label)}</span><p>${esc(expr)}</p></div>`;

export const articlePageContent = (a: AcademyArticle) => {
  const t = trilhaOf(a.trilha)!;
  const list = inTrilha(a.trilha);
  const idx = list.indexOf(a);
  const prev = list[idx - 1];
  const next = list[idx + 1];
  const url = absUrl(site.url, artUrl(a));
  const body = a.body.replace("{{formula}}", a.formula ? formulaBox(a.formula) : "");
  const related = (a.related ?? []).filter((r) =>
    glossary.some((g) => g.term.toLowerCase() === r.toLowerCase()),
  );

  const trilhaBox = `<div class="side-block side-trilha" data-trilha="${a.trilha}">
    <h2 class="side-title">En esta ruta · ${esc(t.name)}</h2>
    <ol class="trilha-steps">${list
      .map(
        (x) =>
          `<li data-key="${artKey(x)}"${x === a ? ' class="is-current" aria-current="page"' : ""}><span class="dot" aria-hidden="true"></span>${x === a ? `<span>${esc(x.title)}</span>` : `<a href="${artUrl(x)}">${esc(x.title)}</a>`}</li>`,
      )
      .join("")}</ol>
    <div class="progress" role="progressbar" aria-label="Progreso en la ruta" aria-valuemin="0" aria-valuemax="${list.length}" aria-valuenow="0"><span class="progress-bar" style="width:0%"></span></div>
    <span class="meta" data-progress-label>0 de ${list.length} completados</span>
  </div>`;

  const main = `
<article>
<header class="article-head article-head--bordered aurora">
  <div class="wrap-article stack-md">
    ${breadcrumb([{ label: "Academy", href: "/academy" }, { label: t.name, href: `/academy/${t.slug}` }, { label: a.title }])}
    <div class="badges"><span class="badge">${esc(a.level)}</span><span class="badge badge--ghost">${a.minutes} min de lectura</span></div>
    <h1 class="h1-article">${gradTitle(a.h1)}</h1>
    <p class="lead">${esc(a.lead)}</p>
  </div>
</header>
<div class="wrap-article academy-layout">
  <div class="prose">
    <div class="summary"><h2>Resumen rápido</h2><ul class="checks">${a.summary.map((s) => `<li>${checkDot}<span>${esc(s)}</span></li>`).join("")}</ul></div>
    ${body}
    ${related.length ? `<div class="related"><h2>Términos relacionados</h2><ul class="chips-static">${related.map((r) => `<li><a class="chip-static" href="${glossHref(r)}">${esc(r.charAt(0).toUpperCase() + r.slice(1))}</a></li>`).join("")}</ul></div>` : ""}
    <div class="done-row"><button type="button" class="btn-ghost" data-done="${artKey(a)}" aria-pressed="false">Marcar como completado</button></div>
    <nav class="pager" aria-label="Navegación de la ruta">
      ${prev ? `<a class="pager-prev" href="${artUrl(prev)}"><span class="meta">← Anterior</span><b>${esc(prev.title)}</b></a>` : "<span></span>"}
      ${next ? `<a class="pager-next" href="${artUrl(next)}"><span class="meta">Siguiente →</span><b>${esc(next.title)}</b></a>` : `<a class="pager-next" href="/academy"><span class="meta">Fin de la ruta</span><b>Volver a Academy</b></a>`}
    </nav>
  </div>
  <aside class="academy-side" aria-label="Ruta y sumario">
    <div class="side-sticky">${trilhaBox}${toc(body)}${sidebarShare(a.title, url)}</div>
  </aside>
</div>
</article>
${ctaBand({ title: a.trilha === "metricas" ? "¿Quieres mejores números en tus campañas?" : "¿Quieres ayuda para poner esto en práctica?", text: "Nuestro equipo analiza tu sitio web, tus campañas y tus búsquedas y te muestra dónde puede rendir más tu inversión." })}`;

  return {
    active: "academy",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Academy", path: "/academy" },
        { name: t.name, path: `/academy/${t.slug}` },
        { name: a.title, path: artUrl(a) },
      ]),
      {
        "@type": ["TechArticle", "LearningResource"],
        "@id": `${url}#article`,
        headline: a.title,
        name: a.title,
        description: a.lead,
        educationalLevel: a.level,
        timeRequired: `PT${a.minutes}M`,
        teaches: a.summary,
        inLanguage: "es",
        mainEntityOfPage: url,
        isPartOf: {
          "@type": "Course",
          name: `Ruta ${t.name}`,
          url: absUrl(site.url, `/academy/${t.slug}`),
        },
        author: { "@id": `${base}/#organization` },
        publisher: { "@id": `${base}/#organization` },
        image: absUrl(site.url, "/assets/og-image.jpg"),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".h1-article", ".article-head .lead", ".summary"],
        },
      },
    ],
  };
};

export const glossaryPageContent = () => {
  const sortedTerms = [...glossary].sort((x, y) => x.term.localeCompare(y.term, "es"));
  const letters = [...new Set(sortedTerms.map((g) => g.term[0].toUpperCase()))];
  const glossUrl = absUrl(site.url, "/academy/glosario");
  const main = `
<section class="page-hero aurora">
  <div class="wrap stack-md">
    ${breadcrumb([{ label: "Academy", href: "/academy" }, { label: "Glosario" }])}
    <h1 class="h1">Glosario de <span class="grad-text">marketing digital.</span></h1>
    <p class="lead lead--wide">Los términos más usados en sitios web, anuncios y SEO, de la A a la Z, en lenguaje simple.</p>
    <nav class="az" aria-label="Letras">${letters.map((l) => `<a href="#letra-${l}">${l}</a>`).join("")}</nav>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap stack-lg">${letters
    .map(
      (l) => `<div class="az-group" id="letra-${l}"><h2 class="az-letter">${l}</h2><dl>${sortedTerms
        .filter((g) => g.term[0].toUpperCase() === l)
        .map(
          (g) =>
            `<div class="az-term" id="${slugify(g.term)}"><dt>${esc(g.term)}</dt><dd>${esc(g.def)}${g.article ? ` <a href="/academy/${g.article}">Leer el artículo →</a>` : ""}</dd></div>`,
        )
        .join("")}</dl></div>`,
    )
    .join("")}</div>
</section>
${ctaBand({ title: "¿Prefieres que lo hagamos por ti?", text: "Nuestro equipo se encarga de tu sitio web, tus anuncios y tu SEO." })}`;

  return {
    active: "academy",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Academy", path: "/academy" },
        { name: "Glosario", path: "/academy/glosario" },
      ]),
      {
        "@type": "DefinedTermSet",
        "@id": `${glossUrl}#glossary`,
        name: "Glosario de Marketing Digital A–Z | Mintcode Academy",
        description:
          "Definiciones claras de los principales conceptos y métricas de marketing digital, sitios web, tráfico pago y SEO.",
        url: glossUrl,
        inLanguage: "es",
        hasDefinedTerm: sortedTerms.map((g) => ({
          "@type": "DefinedTerm",
          name: g.term,
          description: g.def,
          url: `${glossUrl}#${slugify(g.term)}`,
          inDefinedTermSet: `${glossUrl}#glossary`,
        })),
      },
    ],
  };
};

// ================================================================= CONTACTO
export const contactPageContent = () => {
  const c = site.contact;
  const channels = [
    {
      label: "WhatsApp",
      value: c.whatsappDisplay,
      sub: "Respuesta en horario comercial",
      href: waLink("¡Hola! Vengo del sitio de Mintcode y tengo interés en conversar sobre mi proyecto."),
      ext: true,
    },
    { label: "E-mail", value: c.email, sub: "", href: `mailto:${c.email}`, ext: false },
    { label: "Instagram", value: c.instagramHandle, sub: "", href: c.instagramUrl, ext: true },
    { label: "Horario de atención", value: c.hours, sub: "Atención online y por videollamada", href: "", ext: false },
  ];

  const main = `
<section class="page-hero aurora">
  <div class="wrap contact-grid contact-grid--page">
    <div class="stack-md">
      ${eyebrow("Contacto")}
      <h1 class="h1">¿Conversamos sobre tu <span class="grad-text">proyecto?</span></h1>
      <p class="lead">Responde algunas preguntas y coordinamos una reunión para analizar tu sitio, tus campañas y tus búsquedas.</p>
      <ul class="channels">${channels
        .map((ch) => {
          const inner = `<span class="eyebrow">${ch.label}</span><span class="channel-value">${esc(ch.value)}</span>${ch.sub ? `<span class="muted small">${esc(ch.sub)}</span>` : ""}`;
          return ch.href
            ? `<li><a class="channel" href="${esc(ch.href)}"${ch.ext ? ' target="_blank" rel="noopener"' : ""}><span class="channel-text">${inner}</span><span class="channel-go" aria-hidden="true">→</span></a></li>`
            : `<li><div class="channel"><span class="channel-text">${inner}</span></div></li>`;
        })
        .join("")}</ul>
    </div>
    ${contactForm()}
  </div>
</section>`;

  return {
    active: "contacto",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Contacto", path: "/contacto" },
      ]),
      {
        "@type": "ContactPage",
        name: "Contacto Mintcode",
        url: absUrl(site.url, "/contacto"),
        inLanguage: "es",
        isPartOf: { "@id": `${base}/#website` },
        mainEntity: { "@id": `${base}/#organization` },
      },
    ],
  };
};

export const notFoundPageContent = () => ({
  active: "",
  main: `<section class="page-hero aurora">
  <div class="wrap stack-md">
    ${eyebrow("Error 404")}
    <h1 class="h1">Esta página <span class="grad-text">no existe.</span></h1>
    <p class="lead">La dirección puede haber cambiado o haberse escrito con algún error. Vuelve al inicio o habla con nosotros.</p>
    <div class="btn-row">${btn({ href: "/", label: "Volver al inicio" })}<a class="btn-ghost" href="/contacto">Hablar con Mintcode</a></div>
  </div>
</section>`,
  schema: [],
});
