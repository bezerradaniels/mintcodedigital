import { NextRequest, NextResponse } from "next/server";

const DEFAULT_TO = "daniel.ddsb@gmail.com";
const DEFAULT_FROM = "Mintcode <hola@mintcode.digital>";
const MIN_SECONDS = 3;
const IP_INTERVAL_MS = 20_000;
const IP_PER_HOUR = 10;

const ipLog = new Map<string, number[]>();

function text(val: unknown, max: number): string {
  const s = typeof val === "string" ? val.trim() : "";
  return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "").slice(0, max);
}

function oneLine(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function h(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] ?? c,
  );
}

function ipAllowed(ip: string): boolean {
  const now = Date.now();
  const prev = (ipLog.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  const ok =
    prev.length < IP_PER_HOUR &&
    (prev.length === 0 || now - Math.max(...prev) >= IP_INTERVAL_MS);
  if (ok) {
    prev.push(now);
    ipLog.set(ip, prev);
  }
  return ok;
}

function renderEmailHtml(vars: {
  preheader: string;
  nome: string;
  empresa: string;
  when: string;
  mensagem: string;
  waLink: string;
  mailto: string;
  pageUrl: string;
  utm: string;
  rows: [string, string][];
}): string {
  const rowsHtml = vars.rows
    .map(
      ([label, value]) => `<tr>
      <td valign="top" width="110" style="padding:10px 12px 10px 0;border-bottom:1px solid #ECEEF2;font-size:12px;line-height:1.5;font-weight:500;color:#6B7280;">${h(label)}</td>
      <td valign="top" style="padding:10px 0;border-bottom:1px solid #ECEEF2;font-size:14px;line-height:1.5;color:#111827;word-break:break-word;">${value}</td>
    </tr>`,
    )
    .join("");

  const font =
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

  return `<!doctype html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Nuevo lead</title>
</head>
<body style="margin:0;padding:0;background-color:#F8F9FB;-webkit-text-size-adjust:100%;font-family:${font};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${h(vars.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F8F9FB" style="background-color:#F8F9FB;">
<tr><td align="center" style="padding:36px 16px;">
  <table role="presentation" width="540" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:540px;">
    <tr><td style="padding:0 4px 16px;font-family:${font};font-size:14px;font-weight:600;letter-spacing:-0.01em;color:#111827;">
      Mintcode <span style="color:#9CA3AF;font-weight:400;">&middot; Nuevo lead</span>
    </td></tr>
    <tr><td bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:1px solid #E5E7EB;border-radius:12px;padding:28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:${font};">
        <tr><td style="padding-bottom:18px;">
          <div style="font-size:22px;line-height:1.25;font-weight:600;letter-spacing:-0.02em;color:#111827;">${h(vars.nome)}</div>
          ${vars.empresa ? `<div style="padding-top:4px;font-size:14px;line-height:1.4;color:#6B7280;">${h(vars.empresa)}</div>` : ""}
        </td></tr>
        <tr><td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #ECEEF2;font-family:${font};">
            ${rowsHtml}
          </table>
        </td></tr>
        ${
          vars.mensagem
            ? `<tr><td style="padding-top:18px;">
          <div style="font-size:12px;line-height:1.5;font-weight:500;color:#6B7280;padding-bottom:6px;">Mensaje</div>
          <div style="border-left:2px solid #D1D5DB;padding:2px 0 2px 12px;font-size:14px;line-height:1.6;color:#374151;word-break:break-word;">${h(vars.mensagem).replace(/\n/g, "<br>")}</div>
        </td></tr>`
            : ""
        }
        <tr><td style="padding-top:24px;">
          ${
            vars.waLink
              ? `<a href="${h(vars.waLink)}" style="display:inline-block;margin:0 8px 8px 0;background-color:#111827;color:#FFFFFF;text-decoration:none;font-size:13px;line-height:1;font-weight:500;padding:11px 18px;border-radius:8px;white-space:nowrap;">WhatsApp &rarr;</a>`
              : ""
          }
          <a href="${h(vars.mailto)}" style="display:inline-block;margin:0 8px 8px 0;background-color:#FFFFFF;color:#111827;border:1px solid #D1D5DB;text-decoration:none;font-size:13px;line-height:1;font-weight:500;padding:10px 16px;border-radius:8px;white-space:nowrap;">Responder por e-mail</a>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:16px 4px 0;font-family:${font};font-size:12px;line-height:1.6;color:#9CA3AF;">
      ${h(vars.when)}${vars.pageUrl ? ` &middot; ${h(vars.pageUrl)}` : ""}${vars.utm ? `<br>${h(vars.utm)}` : ""}
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  let input: Record<string, unknown>;
  try {
    input = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Datos inválidos." },
      { status: 400 },
    );
  }

  const nome = text(input.nome, 100);
  const empresa = text(input.empresa, 120);
  const email = text(input.email, 160);
  const whatsapp = text(input.whatsapp, 30);
  const mensagem = text(input.mensagem, 2000);
  const servicosIn = Array.isArray(input.servicos) ? input.servicos : [];
  const servicos = servicosIn
    .slice(0, 6)
    .map((s) => oneLine(text(s, 60)))
    .filter(Boolean)
    .join(", ");
  const digits = whatsapp.replace(/\D+/g, "");

  const validPhone =
    digits.length >= 8 && digits.length <= 15 && !/^(\d)\1+$/.test(digits);
  const validEmail = /^\S+@\S+\.\S+$/.test(email);

  if (nome.length < 2 || !validEmail || !validPhone || !servicos) {
    return NextResponse.json(
      { ok: false, message: "Revisa los datos ingresados." },
      { status: 422 },
    );
  }

  // Anti-spam: campo trampa rellenado o envío demasiado rápido recibe éxito silencioso.
  const elapsed = Number(input.elapsed ?? 0);
  if (text(input.website, 10) !== "" || elapsed < MIN_SECONDS) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY || "";
  if (!apiKey.startsWith("re_")) {
    return NextResponse.json(
      { ok: false, message: "Servicio de e-mail no configurado." },
      { status: 503 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!ipAllowed(ip)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Recibimos varios envíos seguidos. Espera unos minutos e inténtalo de nuevo.",
      },
      { status: 429 },
    );
  }

  const pageUrl = text(input.page_url, 300);
  const utmParts: string[] = [];
  for (const k of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ]) {
    const v = text(input[k], 120);
    if (v) utmParts.push(`${k}=${v}`);
  }
  const utm = utmParts.join(" · ");
  const when = new Intl.DateTimeFormat("es-419", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  const firstName = oneLine(nome).split(" ")[0];
  const waLink = digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(`¡Hola, ${firstName}! Te escribimos de Mintcode. Recibimos tu solicitud por el sitio.`)}`
    : "";
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Tu reunión con Mintcode")}`;

  const link = (href: string, label: string) =>
    `<a href="${h(href)}" style="color:#0B0D12;text-decoration:underline">${h(label)}</a>`;

  const html = renderEmailHtml({
    preheader: `${empresa ? `${nome} · ${empresa}` : nome} · ${servicos}`,
    nome,
    empresa,
    when,
    mensagem,
    waLink,
    mailto,
    pageUrl,
    utm,
    rows: [
      ["E-mail", link(`mailto:${email}`, email)],
      ["WhatsApp", waLink ? link(waLink, `+${whatsapp.replace(/^\+/, "")}`) : h(whatsapp)],
      ["Interés", h(servicos)],
    ],
  });

  const plainLines = [
    "Nuevo pedido de contacto",
    "",
    `Nombre: ${nome}`,
    empresa ? `Empresa: ${empresa}` : "",
    `E-mail: ${email}`,
    `WhatsApp: +${whatsapp.replace(/^\+/, "")}`,
    `Interés: ${servicos}`,
    mensagem ? `Mensaje: ${mensagem}` : "",
    pageUrl ? `Página: ${pageUrl}` : "",
    utm ? `Origen (UTM): ${utm}` : "",
    `Recibido el: ${when}`,
  ].filter(Boolean);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || DEFAULT_FROM,
        to: [process.env.LEAD_TO_EMAIL || DEFAULT_TO],
        reply_to: email,
        subject: `Nuevo pedido: ${oneLine(nome)}${empresa ? ` (${oneLine(empresa)})` : ""}`,
        html,
        text: plainLines.join("\n"),
      }),
    });
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, message: "No fue posible enviar ahora." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, message: "No fue posible enviar ahora." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
