import React from 'react';
import styles from './Logo.module.css';
import logoImg from '../assets/logos/eb_logo_header.png';

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img className={styles.logoImage} src={logoImg} alt="Eleonora Bonucci Logo" />
    </div>
  );
}
