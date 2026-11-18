import { site } from "../content/site";
import { btn } from "./components";
import { esc } from "./util";

const ENDPOINT = site.forms.contactEndpoint;

const serviceChips = (labels: string[]): string =>
  `<fieldset class="field field--chips"><legend>¿Cómo podemos ayudarte?</legend><p class="field-hint">Selecciona uno o más servicios.</p><div class="chips">${labels
    .map(
      (l) =>
        `<label class="chip-toggle"><input type="checkbox" name="servicos" value="${esc(l)}"><span>${esc(l)}</span></label>`,
    )
    .join("")}</div></fieldset>`;

// Servicios del formulario siguiendo el estándar del anexo (ninguno viene marcado por defecto).
const SERVICES = [
  "Creación de sitio web",
  "Anuncios en Google",
  "Anuncios en Instagram",
  "Gestión de redes sociales",
  "SEO (aparecer en Google)",
];

// Campo trampa anti-spam: invisible para personas, los bots suelen rellenarlo.
const honeypot = `<div class="hp" aria-hidden="true" style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden"><label>No completes este campo<input name="website" tabindex="-1" autocomplete="off"></label></div>`;

const waField = `<label class="field">WhatsApp
  <span class="input-prefix"><b>+</b><input name="whatsapp" type="tel" inputmode="numeric" autocomplete="tel" maxlength="18" required placeholder="00 (00) 00000-0000" data-mask="phone"></span>
</label>`;

const success = (): string => `<div class="form-success" hidden tabindex="-1">
  <span class="check-big" aria-hidden="true">✓</span>
  <h3 data-ok>Pedido recibido.</h3>
  <h3 data-wa hidden>Falta solo enviar.</h3>
  <p data-ok>Muy pronto nos pondremos en contacto por el WhatsApp o e-mail informado.</p>
  <p data-wa hidden>Abrimos WhatsApp con tu mensaje listo. Solo toca en enviar para hablar con nosotros.</p>
  <button type="button" class="btn-ghost" data-reset>Enviar otro pedido</button>
</div>`;

const attrs = `data-form="contact" data-endpoint="${esc(ENDPOINT)}" data-wa="${esc(site.contact.whatsappNumber)}"`;

/** Formulario de la sección de contacto de la Home y del modal móvil (sigue el estándar del anexo). */
export const homeForm = (): string => `<div class="form-card" data-form-wrap>
<form class="form" ${attrs} novalidate>
  ${honeypot}
  <label class="field">Nombre<input name="nome" required autocomplete="name" placeholder="Tu nombre"></label>
  <label class="field">E-mail<input name="email" type="email" required autocomplete="email" placeholder="tu@empresa.com"></label>
  ${waField}
  ${serviceChips(SERVICES)}
  ${btn({ type: "submit", block: true })}
  <p class="form-note">Te respondemos en hasta 1 día hábil.</p>
  <p class="form-error" role="alert" hidden></p>
</form>
${success()}
</div>`;

/** Formulario completo de la página /contacto. */
export const contactForm = (): string => `<div class="form-card" data-form-wrap>
<form class="form" ${attrs} novalidate>
  <h2>Cuéntanos sobre tu proyecto</h2>
  ${honeypot}
  <label class="field">Nombre<input name="nome" required autocomplete="name" placeholder="Tu nombre"></label>
  <label class="field">Empresa<input name="empresa" autocomplete="organization" placeholder="Nombre de tu empresa"></label>
  <div class="field-row">
    <label class="field">E-mail<input name="email" type="email" required autocomplete="email" placeholder="tu@empresa.com"></label>
    ${waField}
  </div>
  ${serviceChips(SERVICES)}
  <label class="field">Mensaje<textarea name="mensagem" rows="4" placeholder="Cuéntanos un poco sobre tu negocio"></textarea></label>
  ${btn({ type: "submit", block: true })}
  <p class="form-note">Te respondemos en hasta 1 día hábil.</p>
  <p class="form-error" role="alert" hidden></p>
</form>
${success()}
</div>`;

/** Modal de contacto: en el celular, los botones "Tengo interés" abren este formulario en lugar de navegar. */
export const contactModal = (): string => `<dialog class="modal" id="contact-modal" aria-labelledby="modal-title">
  <div class="modal-in">
    <button class="modal-close" type="button" data-modal-close aria-label="Cerrar">&times;</button>
    <h2 id="modal-title">Tengo interés</h2>
    <p class="modal-sub">Cuéntanos qué necesitas y te respondemos en hasta 1 día hábil.</p>
    ${homeForm()}
  </div>
</dialog>`;

/** Newsletter del blog. Solo se muestra si `forms.newsletterEndpoint` está configurado. */
export const newsletter = (): string =>
  site.forms.newsletterEndpoint
    ? `<section class="newsletter" aria-labelledby="nl-title">
  <div><h2 id="nl-title">Recibe los análisis por e-mail.</h2><p>Un resumen por semana, sin spam.</p></div>
  <form class="nl-form" data-form="newsletter" data-endpoint="${esc(site.forms.newsletterEndpoint)}" novalidate>
    <label class="sr-only" for="nl-email">Tu e-mail</label>
    <input id="nl-email" name="email" type="email" required autocomplete="email" placeholder="tu@email.com">
    ${btn({ type: "submit", label: "Suscribirme" })}
    <p class="form-note" role="status" hidden></p>
  </form>
</section>`
    : "";
