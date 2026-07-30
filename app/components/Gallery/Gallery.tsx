"use client";

import { useState } from "react";
import { GalleryImage } from "../GalleryImage";
import { GalleryVideo } from "../GalleryVideo";
import { Lightbox } from "../Lightbox";
import styles from "./Gallery.module.scss";

type LayoutItem =
  | { type: "full" }
  | { type: "tall" }
  | { type: "pair" };

const GALLERY_LAYOUTS: Record<string, LayoutItem[]> = {
  Moments: [
    { type: "pair" },
    { type: "full" },
    { type: "tall" },
    { type: "pair" },
    { type: "full" },
    { type: "pair" },
  ],
  Portraits: [
    { type: "tall" },
    { type: "pair" },
    { type: "pair" },
    { type: "full" },
    { type: "tall" },
    { type: "pair" },
  ],
  Landscape: [
    { type: "full" },
    { type: "pair" },
    { type: "full" },
    { type: "pair" },
    { type: "tall" },
    { type: "full" },
  ],
};

const LANDSCAPE_LOCATIONS = [
  "Reykjavik, Iceland",
  "Kyoto, Japan",
  "Queenstown, New Zealand",
  "Banff, Canada",
  "Tromsø, Norway",
  "Patagonia, Argentina",
  "Hallstatt, Austria",
  "Santorini, Greece",
  "Cape Town, South Africa",
  "Lofoten, Norway",
  "Amalfi, Italy",
  "Bali, Indonesia",
];

const PLACEHOLDER_VIDEOS = [
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
];

interface GalleryProps {
  activeTab: string;
}

export function Gallery({ activeTab }: GalleryProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const isLandscape = activeTab === "Landscape";
  const isVideo = activeTab === "Videography";

  if (isVideo) {
    return (
      <div className={styles.gallery}>
        {PLACEHOLDER_VIDEOS.map((url, i) => (
          <div key={i} className={styles.rowFull}>
            <GalleryVideo url={url} />
          </div>
        ))}
      </div>
    );
  }

  const layout = GALLERY_LAYOUTS[activeTab] ?? GALLERY_LAYOUTS.Moments;
  let locIdx = 0;

  const getLocation = (): string | undefined => {
    if (!isLandscape) return undefined;
    const loc = LANDSCAPE_LOCATIONS[locIdx % LANDSCAPE_LOCATIONS.length];
    locIdx++;
    return loc;
  };

  return (
    <div className={styles.gallery}>
      {layout.map((item, i) => {
        if (item.type === "full") {
          return (
            <div key={i} className={styles.rowFull}>
              <GalleryImage
                aspectRatio="16 / 9"
                location={getLocation()}
                onClick={() => setLightbox("16 / 9")}
              />
            </div>
          );
        }
        if (item.type === "tall") {
          return (
            <div key={i} className={styles.rowTall}>
              <GalleryImage
                aspectRatio="3 / 5"
                location={getLocation()}
                onClick={() => setLightbox("3 / 5")}
              />
              <div className={styles.tallSide}>
                <GalleryImage
                  aspectRatio="1 / 1"
                  location={getLocation()}
                  onClick={() => setLightbox("1 / 1")}
                />
                <GalleryImage
                  aspectRatio="1 / 1"
                  location={getLocation()}
                  onClick={() => setLightbox("1 / 1")}
                />
              </div>
            </div>
          );
        }
        return (
          <div key={i} className={styles.rowPair}>
            <GalleryImage
              aspectRatio="1 / 1"
              location={getLocation()}
              onClick={() => setLightbox("1 / 1")}
            />
            <GalleryImage
              aspectRatio="1 / 1"
              location={getLocation()}
              onClick={() => setLightbox("1 / 1")}
            />
          </div>
        );
      })}

      {lightbox && (
        <Lightbox aspectRatio={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
