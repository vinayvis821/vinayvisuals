"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./Lightbox.module.scss";

interface LightboxProps {
  aspectRatio: string;
  src?: string;
  onClose: () => void;
}

export function Lightbox({ aspectRatio, src, onClose }: LightboxProps) {
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
        className={styles.imageWrapper}
        style={{ aspectRatio }}
        onClick={(e) => e.stopPropagation()}
      >
        {src ? (
          <Image
            src={src}
            alt=""
            fill
            unoptimized
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
    </div>
  );
}
