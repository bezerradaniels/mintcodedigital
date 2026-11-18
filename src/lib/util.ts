const ESC: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export const esc = (s: unknown): string =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ESC[c] ?? c);

export const slugify = (s: unknown): string =>
  String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const MONTHS = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

export const fmtDate = (iso: string): string => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[(m || 1) - 1]} ${y}`;
};

export const readTime = (min: number): string => `${min} min de lectura`;

// Texto con la parte final en degradado: ['Sitios que ', 'convierten.'] -> HTML
export const gradTitle = ([a, b]: readonly [string, string]): string =>
  `${esc(a)}<span class="grad-text">${esc(b)}</span>`;

// Extrae los <h2 id="..."> del cuerpo para armar el índice lateral.
export const headingsOf = (html: string): { id: string; text: string }[] =>
  [...html.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2],
  }));

export const absUrl = (base: string, path: string): string =>
  base.replace(/\/$/, "") + path;
