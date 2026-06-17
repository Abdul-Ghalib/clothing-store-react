import React, { useState } from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter({ onSubscribe }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (val) => {
    if (!val) {
      return 'Email is required';
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (onSubscribe) {
      onSubscribe(email);
    }
    setSuccess('Thank you! You have successfully subscribed to our newsletter.');
    setEmail('');
  };

  return (
    <div className={styles.newsletterContainer}>
      <div className={styles.shippingSection}>
        <p className={styles.shippingText}>Express Shipping + Free Return</p>
      </div>
      
      <div className={styles.subscribeSection}>
        <p className={styles.mailText}>
          Sign up for the newsletter and discover the latest arrivals and promotions.
        </p>
        
        <form onSubmit={handleSubmit} className={styles.subscribeForm}>
          <input
            className={styles.emailInput}
            type="text"
            placeholder="add your e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className={styles.subscribeButton}>
            subscribe
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}
      </div>
    </div>
  );
}
