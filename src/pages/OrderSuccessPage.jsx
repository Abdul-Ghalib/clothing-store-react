import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import styles from './OrderSuccessPage.module.css';

export default function OrderSuccessPage() {
  return (
    <div className={styles.successWrapper}>
      <Navbar />
      <Logo />
      
      <div className={styles.content}>
        <div className={styles.checkmark}>✓</div>
        <h1 className={styles.heading}>ORDER PLACED SUCCESSFULLY</h1>
        <p className={styles.subtext}>
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
        <Link to="/" className={styles.continueBtn}>
          CONTINUE SHOPPING
        </Link>
      </div>

      <Footer />
    </div>
  );
}
