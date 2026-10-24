"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { calme, gsap, ScrollTrigger } from "./gsap";

// Le nom défile en pied de page, plus vite quand on scrolle vite
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (calme()) return;
    const mq = ref.current!;
    let x = 0, v = 0;
    ScrollTrigger.create({ onUpdate: (s) => (v = Math.min(12, Math.abs(s.getVelocity()) / 300)) });
    const tick = () => {
      x -= 0.6 + v;
      v *= 0.92;
      const w = (mq.children[0] as HTMLElement).offsetWidth;
      if (-x > w) x += w;
      mq.style.transform = `translateX(${x}px)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  });
  return (
    <div className="mq" ref={ref} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i}>
          Anne Boullet <span className="it">studio</span>
        </span>
      ))}
    </div>
  );
}
