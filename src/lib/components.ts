import { site, nav, gradientCta, services } from "../content/site";
import { blogCategories, type BlogPost } from "../content/blog";
import { esc, fmtDate, readTime } from "./util";

// ------------------------------------------------------------------ Logo
const LEAVES = [
  "M0 100A100 100 0 0 1 21.25 38.37V97.72A100 100 0 0 1 0 100Z",
  "M26.25 32.47A100 100 0 0 1 47.5 14.89V88A100 100 0 0 1 26.25 96.49Z",
  "M52.5 12A100 100 0 0 1 73.75 3.51V67.53A100 100 0 0 1 52.5 85.11Z",
  "M78.75 2.28A100 100 0 0 1 100 0A100 100 0 0 1 78.75 61.63Z",
];

const TONES = {
  dark: ["#2890c4", "#00adb8", "#00c89d", "#7ed957"], // sobre fondo oscuro
  light: ["#0c4a6e", "#007a85", "#00ad8a", "#7ed957"], // sobre fondo claro
};

export const logo = ({
  tone = "light",
  size = 32,
}: {
  tone?: "light" | "dark";
  size?: number;
} = {}): string =>
  `<span class="brand" style="--s:${size}px"><svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${LEAVES.map(
    (d, i) => `<path fill="${TONES[tone][i]}" d="${d}"/>`,
  ).join("")}</svg><span class="brand-word">Mintcode</span></span>`;

// Sprite con el símbolo en currentColor (usado como marca de agua en las portadas).
export const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><symbol id="mc-mark" viewBox="0 0 100 100">${LEAVES.map(
  (d, i) => `<path fill="currentColor" fill-opacity="${[0.35, 0.5, 0.72, 1][i]}" d="${d}"/>`,
).join("")}</symbol></svg>`;

// ---------------------------------------------------------------- Botones
export const btn = ({
  href = "/contacto",
  label = gradientCta,
  arrow = "→",
  size,
  block,
  external,
  type,
}: {
  href?: string;
  label?: string;
  arrow?: string;
  size?: "sm";
  block?: boolean;
  external?: boolean;
  type?: "submit" | "button";
} = {}): string => {
  const cls = `btn${size === "sm" ? " btn--sm" : ""}${block ? " btn--block" : ""}`;
  const inner = `<span class="btn-in">${esc(label)}${arrow ? `<span class="btn-arrow" aria-hidden="true">${arrow}</span>` : ""}</span>`;
  if (type) return `<button class="${cls}" type="${type}">${inner}</button>`;
  return `<a class="${cls}" href="${esc(href)}"${external ? ' target="_blank" rel="noopener"' : ""}>${inner}</a>`;
};

export const ghostBtn = ({
  href,
  label,
  dark,
  cls = "",
}: {
  href: string;
  label: string;
  dark?: boolean;
  cls?: string;
}): string =>
  `<a class="btn-ghost${dark ? " btn-ghost--dark" : ""} ${cls}" href="${esc(href)}">${esc(label)}</a>`;

// ---------------------------------------------------------------- Header
const homeNav = [
  { label: "Servicios", href: "#servicios" },
  { label: "Método", href: "#metodo" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Blog", href: "/blog" },
  { label: "Academy", href: "/academy" },
];

export const header = ({
  active = "",
  variant = "light",
}: {
  active?: string;
  variant?: "light" | "dark";
} = {}): string => {
  const isHome = variant === "dark";
  const items = isHome ? homeNav : nav;
  const links = items
    .map((n) => {
      const cur = !isHome && "key" in n && n.key === active ? ' aria-current="page"' : "";
      return `<a href="${n.href}"${cur}>${n.label}</a>`;
    })
    .join("");
  const cta = isHome
    ? `<a class="nav-glass" href="#contacto">${esc(gradientCta)}</a>`
    : btn({ href: "/contacto", size: "sm" });
  return `<header class="site-header site-header--${variant}">
  <a class="brand-link" href="/" aria-label="Mintcode, página de inicio">${logo({ tone: isHome ? "dark" : "light", size: isHome ? 36 : 32 })}</a>
  <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Abrir menú"><span></span><span></span><span></span></button>
  <nav class="site-nav" id="site-nav" aria-label="Principal">${links}${cta}</nav>
  <div class="nav-scrim" data-nav-scrim aria-hidden="true"></div>
</header>`;
};

// ---------------------------------------------------------------- Footer
export const waLink = (text = ""): string =>
  `https://wa.me/${site.contact.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const footer = (): string => `<footer class="site-footer">
  <div class="footer-in">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand-link" href="/" aria-label="Mintcode, página de inicio">${logo({ tone: "dark", size: 32 })}</a>
        <p>${esc(site.tagline)}</p>
      </div>
      <div class="footer-col"><h3>Servicios</h3>${services.map((s) => `<a href="/servicios/${s.slug}">${s.name}</a>`).join("")}</div>
      <div class="footer-col"><h3>Contenido</h3><a href="/blog">Blog</a><a href="/academy">Academy</a><a href="/#portafolio">Portafolio</a></div>
      <div class="footer-col"><h3>Contacto</h3>
        <a href="${waLink()}" target="_blank" rel="noopener">WhatsApp</a>
        <a href="mailto:${esc(site.contact.email)}">E-mail</a>
        <a href="${esc(site.contact.instagramUrl)}" target="_blank" rel="noopener">Instagram</a>
      </div>
    </div>
    <div class="footer-rule" aria-hidden="true"></div>
    <div class="footer-bottom"><span>© ${site.year} Mintcode</span><span>Sitios web · Tráfico pago · SEO</span></div>
  </div>
</footer>`;

export const footerSimple = (): string => `<footer class="footer-simple">
  <div class="footer-simple-in">
    <a class="brand-link" href="/" aria-label="Mintcode, página de inicio">${logo({ tone: "light", size: 30 })}</a>
    <span>Sitios web · Tráfico pago · SEO</span>
    <nav aria-label="Pie de página"><a href="#servicios">Servicios</a><a href="#metodo">Método</a><a href="#portafolio">Portafolio</a><a href="/blog">Blog</a><a href="/academy">Academy</a><a href="/contacto">Contacto</a></nav>
    <span>© ${site.year} Mintcode</span>
  </div>
</footer>`;

// ------------------------------------------------------------- Piezas comunes
export const eyebrow = (t: string): string => `<span class="eyebrow">${esc(t)}</span>`;

export const ctaBand = ({
  title = "¿Listo para vender más?",
  text = "Solicita una reunión y recibe un diagnóstico de tu sitio, tus anuncios y tus búsquedas.",
}: {
  title?: string;
  text?: string;
} = {}): string => `<section class="cta-wrap" aria-labelledby="cta-title">
  <div class="cta-band aurora aurora--dark">
    <div class="cta-copy"><h2 id="cta-title">${esc(title)}</h2><p>${esc(text)}</p></div>
    ${btn({ href: "/contacto" })}
  </div>
</section>`;

export const breadcrumb = (items: { label: string; href?: string }[]): string =>
  `<nav class="breadcrumb" aria-label="Ruta de navegación">${items
    .map((it) =>
      it.href
        ? `<a href="${it.href}">${esc(it.label)}</a><span aria-hidden="true">/</span>`
        : `<span aria-current="page">${esc(it.label)}</span>`,
    )
    .join("")}</nav>`;

export const faq = (items: [string, string][]): string =>
  `<div class="faq">${items
    .map(
      ([q, a], i) => `<details class="faq-item" name="faq"${i === 0 ? " open" : ""}>
  <summary><span>${esc(q)}</span><i class="faq-icon" aria-hidden="true"></i></summary>
  <p>${esc(a)}</p>
</details>`,
    )
    .join("")}</div>`;

// ----------------------------------------------------------- Tarjetas de artículo
export const cover = (variant: string = "a", cls = ""): string =>
  `<div class="cover cover--${variant} ${cls}" aria-hidden="true"><svg class="cover-mark"><use href="#mc-mark"/></svg></div>`;

export const categoryOf = (key: string) =>
  blogCategories.find((c) => c.key === key) ?? blogCategories[0];

export const postCard = (p: BlogPost): string => `<article class="post-card" data-category="${p.category}">
  <a href="/blog/${p.slug}" class="post-card-link">
    ${cover(p.cover)}
    <span class="tag">${esc(categoryOf(p.category).singular)}</span>
    <h3>${esc(p.title)}</h3>
    <span class="meta">${fmtDate(p.date)} · ${readTime(p.minutes)}</span>
  </a>
</article>`;

// Círculo ink con ✓ verde
export const checkDot = `<span class="check-dot" aria-hidden="true">✓</span>`;
