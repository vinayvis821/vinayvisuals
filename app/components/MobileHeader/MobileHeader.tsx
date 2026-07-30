"use client";

import styles from "./MobileHeader.module.scss";

interface MobileHeaderProps {
  onMenuToggle: () => void;
  isOpen: boolean;
}

export function MobileHeader({ onMenuToggle, isOpen }: MobileHeaderProps) {
  return (
    <header className={styles.mobileHeader}>
      <button
        className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ""}`}
        onClick={onMenuToggle}
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>
    </header>
  );
}
