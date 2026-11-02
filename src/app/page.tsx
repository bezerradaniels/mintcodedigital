import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { DiagnosticModal } from "@/components/DiagnosticModal";
import { RevealSteps } from "@/components/RevealSteps";
import { COLORS, FIESTA, LeafClipDefs, Logo, Sol } from "@/components/brand";
import heroImage from "../../public/images/hero.webp";

const NAV = [
  { href: "#servicios", label: "Servicios" },
  { href: "#metodo", label: "Método" },
  { href: "#casos", label: "Casos" },
];

const HERO_PILLS = [
  { label: "Sitios web", color: COLORS.buganvilla },
  { label: "Búsqueda + IA", color: COLORS.mango },
  { label: "Medios pagos", color: COLORS.turquesa },
  { label: "BI", color: COLORS.menta },
];

const MARQUEE = [
  { label: "Sitios web", star: COLORS.buganvilla },
  { label: "SEO · AEO · GEO · AXO", star: COLORS.mango },
  { label: "Google Ads y Meta Ads", star: COLORS.turquesa },
  { label: "Dashboards de BI", star: COLORS.menta },
  { label: "Crecimiento que se celebra", star: COLORS.jacaranda },
];

const SERVICES = [
  {
    num: "01",
    title: "Construir",
    text: "Sitios web y blogs rápidos, accesibles y listos para convertir.",
    tags: ["Sitios", "Blogs", "Landing pages"],
    art: "tejido",
    color: COLORS.buganvilla,
  },
  {
    num: "02",
    title: "Ser encontrado",
    text: "Visibilidad en Google, en las respuestas de IA y para agentes.",
    tags: ["SEO", "AEO", "GEO", "AXO"],
    art: "greca",
    color: COLORS.mango,
  },
  {
    num: "03",
    title: "Acelerar",
    text: "Medios pagos en Google y Meta optimizados por costo por lead.",
    tags: ["Google Ads", "Meta Ads"],
    art: "cordillera",
    color: COLORS.turquesa,
  },
  {
    num: "04",
    title: "Medir",
    text: "Dashboards que conectan cada dólar invertido con cada venta.",
    tags: ["Business Intelligence"],
    art: "sol",
    color: COLORS.menta,
  },
] as const;

const STEPS = [
  {
    num: "01",
    title: "Diagnóstico",
    text: "Auditamos sitio, búsqueda, pauta y datos. Definimos una meta con número.",
    color: COLORS.buganvilla,
    rise: "0px",
  },
  {
    num: "02",
    title: "Construcción",
    text: "Sitio rápido, medición instalada y contenido listo para buscadores e IA.",
    color: COLORS.mango,
    rise: "clamp(48px,6vw,90px)",
  },
  {
    num: "03",
    title: "Aceleración",
    text: "Campañas en Google y Meta con presupuesto que sigue al costo por lead.",
    color: COLORS.turquesa,
    rise: "clamp(96px,12vw,180px)",
  },
  {
    num: "04",
    title: "Celebración",
    text: "Dashboard semanal. Cuando el número llega a la meta, lo celebramos juntos.",
    color: COLORS.menta,
    rise: "clamp(144px,18vw,270px)",
  },
];

const COUNTRIES = [
  { name: "México", color: COLORS.buganvilla },
  { name: "Colombia", color: COLORS.mango },
  { name: "Perú", color: COLORS.turquesa },
  { name: "Chile", color: COLORS.jacaranda },
  { name: "Argentina", color: COLORS.menta },
  { name: "Brasil", color: COLORS.oceano },
];

const css = (vars: Record<string, string>) => vars as CSSProperties;

function Arrow() {
  return (
    <span className="mc-cta__arrow" aria-hidden="true">
      →
    </span>
  );
}

export default function Home() {
  return (
    <>
      <LeafClipDefs />
      <main className="mc-main">
        {/* 1. Hero */}
        <section className="mc-hero">
          <div className="mc-hero__sun">
            <Sol
              radii={[100, 83, 66, 49, 32, 15]}
              colors={[...FIESTA, COLORS.jacaranda, COLORS.arena]}
            />
          </div>

          <header className="mc-header">
            <Link href="/" aria-label="Mintcode">
              <Logo />
            </Link>
            <nav className="mc-nav" aria-label="Principal">
              {NAV.map((n) => (
                <a key={n.href} href={n.href}>
                  {n.label}
                </a>
              ))}
              <button type="button" className="mc-nav__btn" data-open-modal>
                Agenda tu diagnóstico
              </button>
            </nav>
          </header>

          <div className="mc-hero__grid">
            <div className="mc-hero__copy">
              <ul className="mc-pills mc-mono" aria-label="Servicios">
                {HERO_PILLS.map((p) => (
                  <li key={p.label} style={{ background: p.color }}>
                    {p.label}
                  </li>
                ))}
              </ul>

              <h1 className="mc-h1">
                <span style={{ animationDelay: "0.2s" }}>Crecimiento</span>
                <span style={{ animationDelay: "0.3s" }}>que se mide.</span>
                <span style={{ animationDelay: "0.4s" }}>
                  <span className="mc-mark">Y se celebra.</span>
                </span>
              </h1>

              <p className="mc-lead">
                Construimos tu sitio, ponemos tu marca en los buscadores y en las respuestas de IA,
                invertimos en medios pagos y medimos cada dólar con BI. Para empresas de toda América
                Latina.
              </p>

              <div className="mc-hero__cta">
                <button type="button" className="mc-cta" data-open-modal>
                  Quiero mi diagnóstico
                  <Arrow />
                </button>
              </div>
            </div>

            <div className="mc-visual">
              <div className="mc-visual__frame">
                <div className="mc-leaf">
                  <Image
                    src={heroImage}
                    alt="Equipo de Mintcode"
                    fill
                    priority
                    sizes="(max-width: 760px) 100vw, 540px"
                    className="mc-leaf__img"
                    placeholder="blur"
                  />
                  {FIESTA.map((color, i) => (
                    <div
                      key={color}
                      className="mc-leaf__curtain"
                      style={{
                        left: `${i * 26.25}%`,
                        background: color,
                        animationDelay: `${0.5 + i * 0.12}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="mc-float mc-float--stats">
                  <div className="mc-card-stats">
                    <div className="mc-card-stats__head mc-mono">
                      <span>Tráfico orgánico</span>
                      <span style={{ color: COLORS.menta }}>30 d</span>
                    </div>
                    <div className="mc-card-stats__value">
                      <CountUp target={48} /> %
                    </div>
                    <svg viewBox="0 0 200 48" aria-hidden="true">
                      <path
                        d="M2 42 L30 36 L56 38 L82 28 L108 30 L134 18 L160 20 L198 4"
                        fill="none"
                        stroke={COLORS.menta}
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        pathLength={1}
                        style={{
                          strokeDasharray: 1,
                          strokeDashoffset: 1,
                          animation: "mc-draw 1.6s 1.6s ease-out forwards",
                        }}
                      />
                      <circle
                        cx="198"
                        cy="4"
                        r="5"
                        fill={COLORS.mango}
                        style={{ animation: "mc-fade .3s 3s both" }}
                      />
                    </svg>
                  </div>
                </div>

                <div className="mc-float mc-float--ai">
                  <div className="mc-card-ai">
                    <div className="mc-card-ai__badge mc-mono">IA</div>
                    <div className="mc-card-ai__text">
                      <strong>Citada en ChatGPT</strong>
                      <span className="mc-mono">y en Google AI Overviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mc-greca mc-hero__greca" aria-hidden="true" />
        </section>

        {/* 2. Marquee */}
        <div className="mc-marquee" aria-hidden="true">
          <div className="mc-marquee__track mc-mono">
            {Array.from({ length: 4 }).flatMap((_, r) =>
              MARQUEE.flatMap((m) => [
                <span key={`${r}-${m.label}`}>{m.label}</span>,
                <span key={`${r}-${m.label}-s`} style={{ color: m.star }}>
                  ✦
                </span>,
              ]),
            )}
          </div>
        </div>

        {/* 3. Servicios */}
        <section id="servicios" className="mc-services">
          <div className="mc-services__head">
            <div className="mc-services__title">
              <div className="mc-kicker mc-mono" style={css({ "--kicker": COLORS.buganvilla })}>
                Servicios
              </div>
              <h2 className="mc-h2">Cuatro disciplinas. Un solo ciclo.</h2>
            </div>
            <p className="mc-services__intro">
              Cada columna del símbolo es una disciplina. Los espacios entre ellas son las
              integraciones: datos que pasan de una a la siguiente.
            </p>
          </div>

          <div className="mc-services__grid">
            {SERVICES.map((s) => (
              <article key={s.num} className="mc-service">
                <div className={`mc-service__art mc-service__art--${s.art}`}>
                  {s.art === "sol" && (
                    <div>
                      <Sol
                        radii={[150, 124, 98, 72, 46]}
                        colors={[...FIESTA, COLORS.jacaranda]}
                      />
                    </div>
                  )}
                  <span className="mc-service__num mc-mono" style={{ background: s.color }}>
                    {s.num}
                  </span>
                </div>
                <div className="mc-service__body">
                  <h3 className="mc-h3">{s.title}</h3>
                  <p>{s.text}</p>
                  <ul className="mc-tags mc-mono">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. Método */}
        <section id="metodo" className="mc-method">
          <div className="mc-method__head">
            <div className="mc-kicker mc-mono" style={css({ "--kicker": COLORS.mango })}>
              Método
            </div>
            <h2 className="mc-h2">Paso a paso, como una escalera.</h2>
            <p>
              Cuatro escalones, del primer diagnóstico a la primera celebración. Cada uno con una
              entrega y un número.
            </p>
          </div>
          <RevealSteps>
            {STEPS.map((s, i) => (
              <li
                key={s.num}
                className="mc-step"
                style={{
                  background: s.color,
                  paddingTop: `calc(24px + ${s.rise})`,
                  animationDelay: `${0.2 + i * 0.12}s`,
                }}
              >
                <span className="mc-step__num mc-mono">{s.num}</span>
                <h3 className="mc-h3">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </RevealSteps>
        </section>

        {/* 5. Casos */}
        <section id="casos" className="mc-case">
          <div className="mc-case__photo">
            {/* TODO: replace with the real client photo (4:5). */}
            <div className="mc-photo-placeholder mc-mono" role="img" aria-label="Foto del cliente">
              Foto del cliente
            </div>
            <div className="mc-greca mc-greca--mango" aria-hidden="true" />
          </div>
          <div className="mc-case__body">
            <div className="mc-kicker mc-mono">Caso de ejemplo</div>
            <blockquote>
              “Por primera vez sabemos cuánto nos cuesta cada cliente. Y cada mes, cuesta menos.”
            </blockquote>
            <div className="mc-case__author">
              <strong>Nombre Apellido</strong>
              <span>Directora comercial · Empresa, Bogotá</span>
            </div>
            <div className="mc-metrics">
              <div className="mc-metric mc-metric--dark">
                <strong>+182 %</strong>
                <span>leads orgánicos en 6 meses</span>
              </div>
              <div className="mc-metric">
                <strong>−41 %</strong>
                <span>costo por lead en Meta Ads</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CTA final */}
        <section className="mc-final">
          <div className="mc-kicker mc-mono" style={css({ "--kicker": COLORS.menta })}>
            De México a la Patagonia
          </div>
          <h2>¿Hablamos? Te mostramos el plan en 30 minutos.</h2>
          <ul className="mc-countries">
            {COUNTRIES.map((c) => (
              <li key={c.name} style={css({ "--dot": c.color })}>
                {c.name}
              </li>
            ))}
          </ul>
          <button type="button" className="mc-cta mc-cta--light" data-open-modal>
            Agenda tu diagnóstico
            <Arrow />
          </button>
        </section>

        {/* 7. Footer */}
        <footer className="mc-footer">
          <Logo small />
          <span className="mc-footer__note mc-mono">Hecho en Brasil · Para toda América Latina</span>
          <nav className="mc-footer__links" aria-label="Pie de página">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <span className="mc-footer__note mc-mono">© 2026 Mintcode</span>
        </footer>
      </main>

      {/* 8. Modal */}
      <DiagnosticModal />
    </>
  );
}
