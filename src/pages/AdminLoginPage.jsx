import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLoginPage.module.css';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace hardcoded credentials with POST /api/auth/admin-login
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      setError('');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h1 className={styles.logoTitle}>Eleonora Bonucci</h1>
        <p className={styles.subtitle}>Admin Portal</p>
        
        <form onSubmit={handleSubmit}>
          {error && <p className={styles.errorMsg}>{error}</p>}
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              required
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              required
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
