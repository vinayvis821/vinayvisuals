"use client";

import { NavItem } from "./NavItem";
import styles from "./Sidebar.module.scss";

const NAV_ITEMS = ["Moments", "Portraits", "Landscape", "Videography"] as const;

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <header className={styles.header}>
          <button
            type="button"
            className={styles.nameButton}
            onClick={() => onTabChange("About")}
          >
            <h1 className={`${styles.name} ${activeTab === "About" ? styles.nameActive : ""}`}>Vinay Viswanathan</h1>
          </button>
        </header>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item}
                label={item}
                isActive={activeTab === item}
                onClick={() => onTabChange(item)}
              />
            ))}
          </ul>
        </nav>

        <footer className={styles.footer}>
          <div className={styles.contact}>
            <a
              href="https://instagram.com/vinayxvisuals"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagram}
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="mailto:vinayviswanathan821@gmail.com"
              className={styles.contactEmail}
            >
              vinayviswanathan821@gmail.com
            </a>
            <span className={styles.businessName}>VinayVisuals LLC</span>
          </div>

          <div className={styles.copyright}>
            <span>&copy; all rights reserved.</span>
          </div>

          <div className={styles.madeWith}>
            Made with <span className={styles.heart}>&hearts;</span> by vinay 2026
          </div>
        </footer>
      </aside>
    </>
  );
}
