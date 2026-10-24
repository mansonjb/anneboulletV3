"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { calme, gsap, ScrollTrigger } from "./gsap";

// Défilement amorti sur tout le site, synchronisé avec ScrollTrigger
export default function SmoothScroll() {
  useEffect(() => {
    if (calme()) return;
    const lenis = new Lenis({ lerp: 0.085 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
