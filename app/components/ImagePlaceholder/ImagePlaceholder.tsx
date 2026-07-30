import styles from "./ImagePlaceholder.module.scss";

interface ImagePlaceholderProps {
  aspectRatio?: string;
}

export function ImagePlaceholder({ aspectRatio = "4 / 5" }: ImagePlaceholderProps) {
  return (
    <div className={styles.placeholder} style={{ aspectRatio }} />
  );
}
