"use client";

import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { MobileHeader } from "./components/MobileHeader";
import { Bio } from "./components/Bio";
import { ImagePlaceholder } from "./components/ImagePlaceholder";
import { Gallery } from "./components/Gallery";
import { CustomCursor } from "./components/CustomCursor";
import { SmoothScroll } from "./components/SmoothScroll";
import styles from "./page.module.scss";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Moments");
  const [menuOpen, setMenuOpen] = useState(false);

  const isGalleryView = activeTab !== "About";

  return (
    <SmoothScroll>
      <div className={styles.layout}>
        <CustomCursor />
        <MobileHeader
          onMenuToggle={() => setMenuOpen((prev) => !prev)}
          isOpen={menuOpen}
        />

        <main className={styles.main}>
          {isGalleryView ? (
            <Gallery activeTab={activeTab} />
          ) : (
            <div className={styles.content}>
              <Bio />
              <div className={styles.heroImage}>
                <ImagePlaceholder aspectRatio="3 / 4" />
              </div>
            </div>
          )}
        </main>

        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setMenuOpen(false);
          }}
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </div>
    </SmoothScroll>
  );
}
