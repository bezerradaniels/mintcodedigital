"use client";

import { useEffect, useRef } from "react";

/** Soft green glow that follows the pointer across the hero. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const host = el.parentElement?.getBoundingClientRect();
      const x = e.clientX - (host?.left ?? 0);
      const y = e.clientY - (host?.top ?? 0);
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ref} className="mc-cursor-glow" aria-hidden="true" />;
}
