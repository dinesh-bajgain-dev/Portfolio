"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let rafId: number;

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        glow.style.setProperty("--x", `${e.clientX}px`);
        glow.style.setProperty("--y", `${e.clientY}px`);
        glow.style.opacity = "1";
      });
    };

    const hide = () => {
      glow.style.opacity = "0";
    };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", hide);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      aria-hidden="true"
    />
  );
}
