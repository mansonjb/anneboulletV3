"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { calme, EASE, gsap } from "./gsap";

export type Tuile = { src: string; x: number; y: number; w: number; d: number; ratio: string };

// La planche d'ambiance : les éléments flottent autour du titre, glissent selon leur profondeur,
// puis se rassemblent au scroll derrière l'image principale, qui s'ouvre en plein écran.
export default function Planche({ tuiles, principale, alt }: { tuiles: Tuile[]; principale: string; alt: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (calme()) return;
      const el = root.current!;
      const tiles = gsap.utils.toArray<HTMLElement>(".t", el);
      const main = el.querySelector<HTMLElement>(".t-main")!;
      const r0 = main.getBoundingClientRect();
      const cx = r0.left + r0.width / 2, cy = r0.top + r0.height / 2;
      const rects = tiles.map((t) => t.getBoundingClientRect());

      gsap.from(tiles, { y: () => innerHeight * 0.6, opacity: 0, duration: 1.6, ease: EASE, stagger: { each: 0.06, from: "random" } });
      gsap.from(".h-w", { yPercent: 100, opacity: 0, duration: 1.4, ease: EASE, stagger: 0.08, delay: 0.35 });

      const qx = tiles.map((t) => gsap.quickTo(t, "xPercent", { duration: 1.2, ease: "power3" }));
      const qy = tiles.map((t) => gsap.quickTo(t, "yPercent", { duration: 1.2, ease: "power3" }));
      const move = (e: MouseEvent) => {
        const off = scrollY > 10;
        const dx = e.clientX / innerWidth - 0.5, dy = e.clientY / innerHeight - 0.5;
        tiles.forEach((t, i) => {
          qx[i](off ? 0 : -dx * 18 * Number(t.dataset.d));
          qy[i](off ? 0 : -dy * 18 * Number(t.dataset.d));
        });
      };
      addEventListener("mousemove", move);

      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=170%", pin: true, scrub: 1 } });
      tl.to(tiles, { xPercent: 0, yPercent: 0, duration: 0.3, overwrite: "auto" }, 0);
      tiles.forEach((t, i) => {
        if (t === main) return;
        const r = rects[i];
        tl.to(t, { x: cx - (r.left + r.width / 2), y: cy - (r.top + r.height / 2), scale: (r0.width / r.width) * 0.9, ease: "power2.inOut", duration: 1 }, Math.random() * 0.25);
      });
      tl.to(".h-txt", { yPercent: -40, opacity: 0, ease: "power2.in", duration: 0.6 }, 0)
        .to(".h-sub", { opacity: 0, duration: 0.3 }, 0)
        .to(main, { left: 0, top: 0, width: "100vw", height: "100vh", aspectRatio: "auto", ease: "power2.inOut", duration: 1 }, 0.75)
        .to(tiles.filter((t) => t !== main), { opacity: 0, duration: 0.2 }, 1.1);

      return () => removeEventListener("mousemove", move);
    },
    { scope: root },
  );

  return (
    <section className="planche" ref={root}>
      {tuiles.map((t, k) => (
        <figure key={t.src + k} className="t" style={{ left: `${t.x}%`, top: `${t.y}%`, width: `${t.w}vw`, aspectRatio: t.ratio }} data-d={t.d}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.src} alt="" />
        </figure>
      ))}
      <figure className="t t-main" data-d="0.4" style={{ left: "41%", top: "62%", width: "18vw" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={principale} alt={alt} fetchPriority="high" />
      </figure>
      <div className="h-txt">
        <h1>
          <span className="h-w">Décoratrice</span> <span className="h-w">d&apos;intérieur</span>
          <br />
          <span className="h-w it">à La Rochelle</span>
        </h1>
      </div>
      <div className="h-sub">
        <span className="mono">Conseil · Conception · Décoration</span>
        <span className="mono">Faites défiler</span>
        <span className="mono">Île de Ré · Oléron · La Rochelle</span>
      </div>
    </section>
  );
}
