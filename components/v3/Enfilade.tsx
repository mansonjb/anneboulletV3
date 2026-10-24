"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { calme, gsap, large } from "./gsap";

export type Piece = { slug: string; titre: string; lieu: string; meta: string; src: string; alt: string };

// Les projets se visitent en enfilade : défilement horizontal, image qui glisse dans son cadre,
// et un petit plan de sept pièces qui suit la visite.
export default function Enfilade({ pieces }: { pieces: Piece[] }) {
  const root = useRef<HTMLElement>(null);
  const [k, setK] = useState(0);

  useGSAP(
    () => {
      if (calme() || !large()) return;
      const track = root.current!.querySelector<HTMLElement>(".track")!;
      const dist = () => track.scrollWidth - innerWidth;
      const move = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (s) => setK(Math.min(pieces.length - 1, Math.floor(s.progress * pieces.length))),
        },
      });
      gsap.utils.toArray<HTMLElement>(".room", root.current).forEach((r) => {
        gsap.fromTo(r.querySelector("img"), { xPercent: -18 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: r, containerAnimation: move, start: "left right", end: "right left", scrub: true } });
        gsap.from(r.querySelector(".room-f"), { clipPath: "inset(0 0 0 100%)", ease: "power2.out", scrollTrigger: { trigger: r, containerAnimation: move, start: "left 95%", end: "left 45%", scrub: true } });
      });
    },
    { scope: root },
  );

  return (
    <section className="enf" id="realisations" ref={root} aria-label="Réalisations">
      <div className="enf-h">
        <h2>
          Sept pièces <span className="it">en enfilade</span>
        </h2>
        <span className="mono" aria-hidden="true">
          {String(k + 1).padStart(2, "0")} / {String(pieces.length).padStart(2, "0")}
        </span>
      </div>
      <div className="track">
        {pieces.map((p, i) => (
          <article className="room" key={p.slug}>
            <a href={`/realisations/${p.slug}`} className="room-f" aria-label={`${p.titre}, ${p.lieu}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt} loading="lazy" />
            </a>
            <div className="room-c">
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <h3>
                <a href={`/realisations/${p.slug}`}>{p.titre}</a>
              </h3>
              <p className="it">{p.lieu}</p>
              <p className="mono soft">{p.meta}</p>
            </div>
          </article>
        ))}
      </div>
      <span className="planlet-l mono soft">Plan de la visite</span>
      <div className="planlet" aria-hidden="true">
        {pieces.map((p, i) => (
          <i key={p.slug} className={i <= k ? "on" : ""} style={{ flex: i === 0 || i === 5 ? 1.6 : 1 }}>
            <b>{String(i + 1).padStart(2, "0")}</b>
          </i>
        ))}
      </div>
    </section>
  );
}
