"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin);

export const calme = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const large = () => typeof window !== "undefined" && matchMedia("(min-width: 901px)").matches;
export const EASE = "expo.out";
export { gsap, ScrollTrigger, SplitText, Draggable };
