"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import styles from "./SmoothScroll.module.scss";

interface SmoothScrollProps {
  children: React.ReactNode;
}

function getIsTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

function subscribe(cb: () => void) {
  const mql = window.matchMedia("(pointer: coarse)");
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentScroll = useRef(0);
  const targetScroll = useRef(0);
  const rafId = useRef<number>(0);
  const isTouchDevice = useSyncExternalStore(subscribe, getIsTouchDevice, () => false);

  useEffect(() => {
    if (isTouchDevice) return;

    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (el.dataset.scrollLocked === "true") return;
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
      if (el.dataset.scrollLocked !== "true") {
        currentScroll.current = lerp(currentScroll.current, targetScroll.current, 0.08);

        if (Math.abs(currentScroll.current - targetScroll.current) > 0.5) {
          el.scrollTop = currentScroll.current;
        } else {
          currentScroll.current = targetScroll.current;
          el.scrollTop = targetScroll.current;
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(rafId.current);
    };
  }, [isTouchDevice]);

  return (
    <div
      ref={scrollRef}
      data-smooth-scroll
      className={`${styles.scrollContainer} ${isTouchDevice ? styles.touchScroll : ""}`}
    >
      {children}
    </div>
  );
}
