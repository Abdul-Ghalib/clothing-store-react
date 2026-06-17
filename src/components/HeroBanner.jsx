import React from 'react';
import styles from './HeroBanner.module.css';

export default function HeroBanner({ src, alt }) {
  return (
    <div className={styles.heroContainer}>
      <img className={styles.heroImage} src={src} alt={alt || "Hero Banner"} />
    </div>
  );
}
