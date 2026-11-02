"use client";

import { useEffect, useRef } from "react";

/** Counts from 0 to `target` with an ease-out curve after `delay` ms. */
export function CountUp({
  target,
  delay = 1600,
  duration = 1600,
  prefix = "+",
}: {
  target: number;
  delay?: number;
  duration?: number;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${prefix}${target}`;
      return;
    }
    const start = performance.now() + delay;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / duration));
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = `${prefix}${Math.round(target * eased)}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, delay, duration, prefix]);

  return <span ref={ref}>{`${prefix}0`}</span>;
}
