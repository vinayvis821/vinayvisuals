"use client";

import { useEffect } from "react";
import styles from "./Lightbox.module.scss";

interface LightboxProps {
  aspectRatio: string;
  onClose: () => void;
}

export function Lightbox({ aspectRatio, onClose }: LightboxProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.image}
        style={{ aspectRatio }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
