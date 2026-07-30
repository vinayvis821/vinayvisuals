"use client";

import { useState } from "react";
import styles from "./GalleryVideo.module.scss";

interface GalleryVideoProps {
  url: string;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function GalleryVideo({ url }: GalleryVideoProps) {
  const [loaded, setLoaded] = useState(false);
  const videoId = extractYouTubeId(url);

  if (!videoId) return null;

  return (
    <div className={styles.wrapper}>
      {!loaded && <div className={styles.skeleton} />}
      <iframe
        className={`${styles.iframe} ${loaded ? styles.iframeLoaded : ""}`}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
