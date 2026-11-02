import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { CursorGlow } from "@/components/CursorGlow";
import { DiagnosticCta } from "@/components/DiagnosticCta";
import { LEAF_COLORS_NEGATIVE, LeafClipDefs, MintcodeSymbol } from "@/components/brand";
import heroImage from "../../public/images/hero.webp";

const BAR_HEIGHTS = [18, 26, 22, 34, 30, 44, 40, 56, 52, 68, 64, 82, 100];
const CURTAIN_LEFTS = [0, 26.25, 52.5, 78.75];
const MARQUEE_ITEMS = [
  "Criação de sites",
  "SEO & AEO",
  "Google Ads & Meta Ads",
  "Dashboards de BI",
  "Crescimento que se mede",
];

export default function Home() {
  return (
    <>
      <LeafClipDefs />
      <main className="mc-landing">
        <div className="mc-grid-bg" aria-hidden="true" />
        <div className="mc-orb mc-orb--navy" aria-hidden="true" />
        <div className="mc-orb mc-orb--emerald" aria-hidden="true" />
        <CursorGlow />
        <div className="mc-bars" aria-hidden="true">
          {BAR_HEIGHTS.map((h, i) => (
            <span key={i} style={{ height: `${h}%`, animationDelay: `${0.2 + i * 0.06}s` }} />
          ))}
        </div>

        <header className="mc-header">
          <Link href="/" className="mc-wordmark" aria-label="Mintcode — início">
            <MintcodeSymbol />
            <span>Mintcode</span>
          </Link>
          <div className="mc-status mc-mono">
            <span className="mc-status__dot" aria-hidden="true" />
            Agenda aberta · Bahia
          </div>
        </header>

        <section className="mc-hero">
          <div className="mc-hero__copy">
            <ul className="mc-tags mc-mono" aria-label="Serviços">
              <li className="mc-tag--blue">Sites</li>
              <li className="mc-tag--teal">Busca + IA</li>
              <li className="mc-tag--mint">Mídia paga</li>
              <li className="mc-tag--green">BI</li>
            </ul>

            <h1 className="mc-title">
              <span style={{ animationDelay: "0.2s" }}>Crescimento</span>
              <span style={{ animationDelay: "0.32s" }}>
                que se{" "}
                <span className="mc-title__accent">
                  mede.
                  <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d="M4 18 C 70 4, 160 2, 296 10"
                      fill="none"
                      stroke="#7ed957"
                      strokeWidth="7"
                      strokeLinecap="round"
                      pathLength={1}
                      style={{
                        strokeDasharray: 1,
                        strokeDashoffset: 1,
                        animation: "mc-draw .9s 1.1s cubic-bezier(.6,0,.2,1) forwards",
                      }}
                    />
                  </svg>
                </span>
              </span>
            </h1>

            <p className="mc-lead">
              Construímos seu site, colocamos sua marca nas buscas e nas respostas de IA, investimos
              em tráfego pago — e medimos cada real com BI.
            </p>

            <DiagnosticCta />
          </div>

          <div className="mc-visual">
            <div className="mc-visual__frame">
              <div className="mc-ring-dashed" aria-hidden="true" />
              <div className="mc-ring" aria-hidden="true" />
              <div className="mc-leaf">
                <Image
                  src={heroImage}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 720px) 80vw, 40vw"
                  className="mc-leaf__img"
                  placeholder="blur"
                />
                <div className="mc-leaf__tint" />
                {CURTAIN_LEFTS.map((left, i) => (
                  <div
                    key={left}
                    className="mc-leaf__curtain"
                    style={{
                      left: `${left}%`,
                      background: LEAF_COLORS_NEGATIVE[i],
                      animationDelay: `${0.5 + i * 0.12}s`,
                    }}
                  />
                ))}
              </div>

              <div className="mc-float mc-float--stats">
                <div className="mc-card-stats">
                  <div className="mc-card-stats__head mc-mono">
                    <span>Tráfego orgânico</span>
                    <span style={{ color: "var(--mc-green)" }}>30d</span>
                  </div>
                  <div className="mc-card-stats__value">
                    <CountUp target={48} />%
                  </div>
                  <svg
                    viewBox="0 0 200 48"
                    style={{ width: "100%", height: 44, display: "block", overflow: "visible" }}
                    aria-hidden="true"
                  >
                    <path
                      d="M2 42 L30 36 L56 38 L82 28 L108 30 L134 18 L160 20 L198 4"
                      fill="none"
                      stroke="#7ed957"
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
                      fill="#7ed957"
                      style={{ animation: "mc-fade .3s 3s both" }}
                    />
                  </svg>
                </div>
              </div>

              <div className="mc-float mc-float--ai">
                <div className="mc-card-ai">
                  <div className="mc-card-ai__badge mc-mono">AI</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 800 }}>Citada no ChatGPT</span>
                    <span className="mc-mono" style={{ fontSize: 12, color: "var(--mc-slate-600)" }}>
                      e no Google AI Overviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mc-marquee" aria-hidden="true">
          <div className="mc-marquee__track mc-mono">
            {Array.from({ length: 4 }).flatMap((_, r) =>
              MARQUEE_ITEMS.flatMap((item) => [
                <span key={`${r}-${item}`}>{item}</span>,
                <span key={`${r}-${item}-star`} className="mc-marquee__star">
                  ✦
                </span>,
              ]),
            )}
          </div>
        </div>
      </main>
    </>
  );
}
