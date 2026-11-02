"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { LEAF_COLORS_POSITIVE } from "./brand";

const SERVICES = ["Site", "Busca + IA", "Mídia paga", "BI"] as const;

/** "Quero meu diagnóstico" button and the lead-capture modal it opens. */
export function DiagnosticCta() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [picked, setPicked] = useState<Record<string, boolean>>({ Site: true });
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const trigger = triggerRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [open]);

  const openModal = () => {
    setSent(false);
    setOpen(true);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send the lead (name, WhatsApp, services) to the CRM / WhatsApp endpoint.
    setSent(true);
  };

  return (
    <>
      <div className="mc-cta-row">
        <button ref={triggerRef} type="button" className="mc-btn-primary" onClick={openModal}>
          Quero meu diagnóstico
          <span className="mc-btn-primary__arrow" aria-hidden="true">
            →
          </span>
        </button>
        <div className="mc-cta-note mc-mono">
          <strong>Gratuito · 20 min</strong>
          <span>Sem compromisso</span>
        </div>
      </div>

      {open && (
        <div className="mc-modal-backdrop" onClick={() => setOpen(false)}>
          <div
            className="mc-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mc-modal__stripe" aria-hidden="true">
              {LEAF_COLORS_POSITIVE.map((c) => (
                <span key={c} style={{ background: c }} />
              ))}
            </div>
            <button
              ref={closeRef}
              type="button"
              className="mc-modal__close"
              aria-label="Fechar"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <div className="mc-modal__body">
              {sent ? (
                <div className="mc-success" role="status">
                  <div className="mc-success__check" aria-hidden="true">
                    ✓
                  </div>
                  <h2 id={titleId} className="mc-modal__title">
                    Recebemos seu pedido.
                  </h2>
                  <p>Nossa equipe fala com você em até 1 dia útil, pelo WhatsApp.</p>
                  <button type="button" className="mc-btn-dark" onClick={() => setOpen(false)}>
                    Fechar
                  </button>
                </div>
              ) : (
                <form className="mc-form" onSubmit={submit}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingRight: 44 }}>
                    <span className="mc-modal__eyebrow mc-mono">Diagnóstico gratuito</span>
                    <h2 id={titleId} className="mc-modal__title">
                      Onde sua marca precisa crescer?
                    </h2>
                  </div>
                  <div className="mc-chips" role="group" aria-label="Serviços de interesse">
                    {SERVICES.map((label) => (
                      <button
                        key={label}
                        type="button"
                        className="mc-chip"
                        aria-pressed={!!picked[label]}
                        onClick={() => setPicked((p) => ({ ...p, [label]: !p[label] }))}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <label className="mc-field">
                    Nome
                    <input name="name" required autoComplete="name" placeholder="Seu nome" />
                  </label>
                  <label className="mc-field">
                    WhatsApp
                    <input
                      name="whatsapp"
                      required
                      type="tel"
                      autoComplete="tel"
                      placeholder="(77) 90000-0000"
                    />
                  </label>
                  <button type="submit" className="mc-btn-submit">
                    Enviar pedido →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
