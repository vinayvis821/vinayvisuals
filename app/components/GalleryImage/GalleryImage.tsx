"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./GalleryImage.module.scss";

interface GalleryImageProps {
  aspectRatio: string;
  src?: string;
  location?: string;
  onClick?: () => void;
}

export function GalleryImage({ aspectRatio, src, location, onClick }: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.wrapper} onClick={onClick} style={{ aspectRatio }}>
      {!loaded && <div className={styles.skeleton} />}
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`${styles.image} ${loaded ? styles.imageLoaded : ""}`}
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <div className={`${styles.placeholder} ${styles.imageLoaded}`} />
      )}
      {location && (
        <div className={styles.overlay}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className={styles.locationText}>{location}</span>
        </div>
      )}
    </div>
  );
}
