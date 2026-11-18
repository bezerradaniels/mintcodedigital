"use client";

import { useEffect, useState } from "react";

const WORDS = ["conversiones.", "ingresos.", "contactos.", "impacto."] as const;
const INTERVAL_MS = 2500;

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => {
        setPrevIndex(current);
        return (current + 1) % WORDS.length;
      });
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="topo">
      <img
        className="hero-img"
        src="/assets/hero-mintcode.webp"
        srcSet="/assets/hero-mintcode-sm.webp 900w, /assets/hero-mintcode.webp 1600w"
        sizes="100vw"
        width={1600}
        height={900}
        alt=""
        fetchPriority="high"
      />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-body">
        <span className="hero-pill">Creación de Sitios</span>

        <h1>
          Creamos sitios web enfocados en generar más{" "}
          <span className="hero-rotator" aria-live="polite">
            {WORDS.map((word, i) => {
              const isActive = i === index;
              const isExiting = i === prevIndex && i !== index;
              const stateClass = isActive
                ? "is-active"
                : isExiting
                  ? "is-exiting"
                  : "";
              return (
                <span
                  key={word}
                  className={`hero-rotator__word grad-brand ${stateClass}`}
                  aria-hidden={!isActive}
                >
                  {word}
                </span>
              );
            })}
          </span>
        </h1>

        <p>
          Diseño atractivo y tecnología de punta para que tu negocio crezca sin
          límites las 24 horas.
        </p>

        <div className="hero-actions">
          <a className="btn" href="#contacto">
            <span className="btn-in">
              Quiero un presupuesto
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
