"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Starts the Método steps' grow animation once they scroll into view. */
export function RevealSteps({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.querySelectorAll(".mc-step").forEach((s) => s.classList.add("is-visible"));
    if (!("IntersectionObserver" in window)) return reveal();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} className="mc-steps">
      {children}
    </ol>
  );
}
