import styles from "./Sidebar.module.scss";

interface NavItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function NavItem({ label, isActive, onClick }: NavItemProps) {
  return (
    <li>
      <button
        className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
        onClick={onClick}
        type="button"
      >
        {label}
      </button>
    </li>
  );
}
