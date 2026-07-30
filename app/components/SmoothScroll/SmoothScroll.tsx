"use client";

import { useEffect, useRef } from "react";
import styles from "./SmoothScroll.module.scss";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentScroll = useRef(0);
  const targetScroll = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScroll.current += e.deltaY;
      targetScroll.current = Math.max(
        0,
        Math.min(targetScroll.current, el.scrollHeight - el.clientHeight)
      );
    };

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      currentScroll.current = lerp(currentScroll.current, targetScroll.current, 0.08);

      if (Math.abs(currentScroll.current - targetScroll.current) > 0.5) {
        el.scrollTop = currentScroll.current;
      } else {
        currentScroll.current = targetScroll.current;
        el.scrollTop = targetScroll.current;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div ref={scrollRef} className={styles.scrollContainer}>
      {children}
    </div>
  );
}
