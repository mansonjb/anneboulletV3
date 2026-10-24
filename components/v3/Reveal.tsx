"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { calme, EASE, gsap, SplitText } from "./gsap";

// Texte qui remonte ligne par ligne (« lignes ») ou mot par mot (« mots ») à l'entrée dans l'écran
export default function Reveal({ children, mode = "lignes", className, as: Tag = "p" }: { children: React.ReactNode; mode?: "lignes" | "mots"; className?: string; as?: "p" | "blockquote" | "div" }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (calme()) return;
      const el = ref.current!;
      if (mode === "lignes") {
        const sp = SplitText.create(el, { type: "lines", mask: "lines" });
        gsap.from(sp.lines, { yPercent: 105, duration: 1.3, ease: EASE, stagger: 0.1, scrollTrigger: { trigger: el, start: "top 80%" } });
      } else {
        const sp = SplitText.create(el, { type: "words", mask: "words" });
        gsap.from(sp.words, { yPercent: 100, opacity: 0, duration: 1.2, ease: EASE, stagger: 0.025, scrollTrigger: { trigger: el, start: "top 78%" } });
      }
    },
    { scope: ref },
  );
  const T = Tag as React.ElementType;
  return (
    <T ref={ref} className={className}>
      {children}
    </T>
  );
}
