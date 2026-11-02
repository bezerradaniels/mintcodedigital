"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { COLORS } from "./brand";

const SERVICES = [
  { label: "Sitio web", color: COLORS.buganvilla },
  { label: "Búsqueda + IA", color: COLORS.mango },
  { label: "Medios pagos", color: COLORS.turquesa },
  { label: "BI", color: COLORS.menta },
] as const;

const COUNTRIES = [
  { name: "México", code: "+52", ph: "55 1234 5678" },
  { name: "Colombia", code: "+57", ph: "300 123 4567" },
  { name: "Perú", code: "+51", ph: "912 345 678" },
  { name: "Chile", code: "+56", ph: "9 1234 5678" },
  { name: "Argentina", code: "+54", ph: "9 11 1234 5678" },
  { name: "Brasil", code: "+55", ph: "(77) 90000-0000" },
  { name: "Otro", code: "+", ph: "Número con código" },
] as const;

const FLAG_COLORS = [
  COLORS.buganvilla,
  COLORS.mango,
  COLORS.turquesa,
  COLORS.menta,
  COLORS.jacaranda,
  COLORS.buganvilla,
  COLORS.mango,
  COLORS.turquesa,
  COLORS.menta,
];
const FLAG_Y = [18.2, 25.9, 27.4, 22.8, 12, 22.8, 27.4, 25.9, 18.2];

export type Lead = {
  nombre: string;
  pais: string;
  whatsapp: string;
  servicios: string[];
};

/** Normalise a phone number to E.164 using the selected country's code. */
function toE164(raw: string, code: string): string | null {
  const trimmed = raw.trim();
  let digits = trimmed.replace(/\D/g, "");
  if (!trimmed.startsWith("+") && code !== "+") {
    const cc = code.replace(/\D/g, "");
    if (!digits.startsWith(cc)) digits = cc + digits;
  }
  return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
}

/**
 * The "Diagnóstico gratis" modal. Any element with `data-open-modal`
 * anywhere on the page opens it (header, hero and final CTA buttons).
 */
export function DiagnosticModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [servicios, setServicios] = useState<Set<string>>(() => new Set(["Sitio web"]));
  const [pais, setPais] = useState<(typeof COUNTRIES)[number]["name"]>("México");
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  // Open from any [data-open-modal] trigger.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement | null)?.closest("[data-open-modal]");
      if (!trigger) return;
      e.preventDefault();
      lastFocus.current = trigger as HTMLElement;
      setSent(false);
      setError(null);
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // While open: lock scroll, focus first field, trap focus, close on Esc.
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.querySelector<HTMLElement>("input, button:not(.mc-modal__close)")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocus.current?.focus();
    };
  }, [open]);

  const country = COUNTRIES.find((c) => c.name === pais) ?? COUNTRIES[0];

  const toggle = (label: string) =>
    setServicios((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nombre = String(data.get("nombre") ?? "").trim();
    const whatsapp = toE164(String(data.get("whatsapp") ?? ""), country.code);

    if (nombre.length < 2) return setError("Escribe tu nombre.");
    if (!whatsapp) return setError("Revisa tu WhatsApp: debe tener entre 8 y 15 dígitos.");
    if (servicios.size === 0) return setError("Elige al menos un servicio.");

    const lead: Lead = { nombre, pais, whatsapp, servicios: [...servicios] };
    setError(null);
    setSubmitting(true);
    try {
      // TODO: integrate with the CRM / API endpoint.
      console.log("Lead (integrar com CRM/API):", lead);
      setSent(true);
    } catch {
      setError("No pudimos enviar. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="mc-modal-backdrop" onClick={close}>
      <div
        ref={dialogRef}
        className="mc-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mc-modal__greca" aria-hidden="true" />
        <button type="button" className="mc-modal__close" aria-label="Cerrar" onClick={close}>
          ×
        </button>
        <div className="mc-modal__body">
          {sent ? (
            <div className="mc-sent" role="status">
              <div className="mc-sent__flags" aria-hidden="true">
                <svg viewBox="0 0 440 72" preserveAspectRatio="none">
                  <path
                    d="M0 12 Q110 43.2 220 12 M220 12 Q330 43.2 440 12"
                    fill="none"
                    stroke={COLORS.arena}
                    strokeWidth="2"
                  />
                  {FLAG_Y.map((y, i) => {
                    const x = 12.4 + i * 48.9;
                    return (
                      <polygon
                        key={i}
                        points={`${x},${y} ${x + 24},${y} ${x + 12},${y + 30}`}
                        fill={FLAG_COLORS[i]}
                      />
                    );
                  })}
                </svg>
              </div>
              <h2 id={titleId} className="mc-modal__title">
                ¡Listo! Recibimos tu pedido.
              </h2>
              <p>Te escribimos por WhatsApp en menos de 1 día hábil, en tu horario.</p>
              <button type="button" className="mc-sent__close" onClick={close}>
                Cerrar
              </button>
            </div>
          ) : (
            <form className="mc-form" onSubmit={submit} noValidate>
              <div className="mc-modal__head">
                <span className="mc-modal__eyebrow mc-mono">Diagnóstico gratis</span>
                <h2 id={titleId} className="mc-modal__title">
                  ¿Dónde necesita crecer tu marca?
                </h2>
              </div>
              <div className="mc-chips" role="group" aria-label="Servicios de interés">
                {SERVICES.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="mc-chip"
                    aria-pressed={servicios.has(s.label)}
                    style={{ ["--chip" as string]: s.color }}
                    onClick={() => toggle(s.label)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <label className="mc-field">
                Nombre
                <input name="nombre" required autoComplete="name" placeholder="Tu nombre" />
              </label>
              <div className="mc-form__row">
                <label className="mc-field">
                  País
                  <select
                    name="pais"
                    value={pais}
                    onChange={(e) => setPais(e.target.value as typeof pais)}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} {c.code}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="mc-field">
                  WhatsApp
                  <input
                    name="whatsapp"
                    required
                    type="tel"
                    autoComplete="tel"
                    placeholder={`${country.code} ${country.ph}`}
                  />
                </label>
              </div>
              {error && (
                <p className="mc-form__error" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="mc-submit" disabled={submitting}>
                {submitting ? "Enviando…" : "Enviar pedido →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
