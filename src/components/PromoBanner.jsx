import React from 'react';
import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  return (
    <div className={styles.promoContainer}>
      <span className={styles.checkText}>DIRECTLY AT CHECKOUT<br /></span>
      <span className={styles.offText}>EXTRA 20% OFF SALE</span>
    </div>
  );
}
