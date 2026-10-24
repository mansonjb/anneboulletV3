"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Draggable, EASE, gsap } from "./gsap";

type Mat = { nom: string; ligne: string; img: string; lieu: string };

// Les matières se lancent : on attrape le ruban, il glisse avec de l'inertie
export default function Matieres({ matieres }: { matieres: Mat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const strip = ref.current!;
      Draggable.create(strip, {
        type: "x",
        inertia: true,
        edgeResistance: 0.85,
        bounds: { minX: -(strip.scrollWidth - innerWidth), maxX: 0 },
        onPress() {
          gsap.to(strip.children, { scale: 0.96, duration: 0.4, ease: "power3" });
        },
        onRelease() {
          gsap.to(strip.children, { scale: 1, duration: 0.8, ease: EASE });
        },
      });
    },
    { scope: ref },
  );
  return (
    <div className="drag">
      <div className="strip" ref={ref}>
        {matieres.map((m) => (
          <figure key={m.nom}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/matieres/${m.img}.jpg`} alt={`${m.nom.replace(/^L[ea]s? |^L'/, "")} : ${m.lieu}`} draggable={false} loading="lazy" />
            <figcaption>
              <b>{m.nom}</b>
              <span>{m.ligne}</span>
              <span className="mono soft">{m.lieu}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
