import React from 'react';
import styles from './StyleRow.module.css';

export default function StyleRow({ styles: stylesArray }) {
  if (!stylesArray || stylesArray.length === 0) return null;

  return (
    <div className={styles.styleRowContainer}>
      {stylesArray.map((item) => (
        <div key={item.id} className={styles.styleCard}>
          <div className={styles.imageWrapper}>
            <img className={styles.styleImage} src={item.image} alt={item.title} />
          </div>
          <div className={styles.styleInfo}>
            <span className={styles.brandText}>{item.brand}<br /></span>
            <span className={styles.titleText}>{item.title}<br /></span>
            <span className={styles.ctaText}>{item.cta}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
